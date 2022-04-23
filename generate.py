from logging import PlaceHolder
from math import ceil, floor
from itertools import permutations
import os
from time import sleep
from turtle import onclick
import yaml
import re
import dominate
from dominate.tags import *
from dominate.util import raw
from more_itertools import peekable
import urllib.parse
from atomicwrites import atomic_write

def to_snake_case(name):
    name = "".join(name.split())
    name = re.sub(r'\W+', '', name)
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    name = re.sub('__([A-Z])', r'_\1', name)
    name = re.sub('([a-z0-9])([A-Z])', r'\1_\2', name)
    return name.lower()

dropdowns = []
pages = []
item_links = []
with open('pages.yaml', 'r', encoding='utf_8') as pages_yaml:
    yml = yaml.safe_load(pages_yaml)
    item_links = yml['item_links']
    for dropdown in yml['dropdowns']:
        dropdown_urls = []
        for page in dropdown['pages']:
            with open(os.path.join('data', page), 'r', encoding='utf_8') as data:
                yml = yaml.safe_load(data)
                pages.append(yml)
                dropdown_urls.append((yml['title'], yml['id']))
        dropdowns.append((dropdown['name'], dropdown_urls))

page_ids = set()
all_ids = set()
for page in pages:
    if page['id'] in page_ids:
        print("Duplicate page id '" + page['id'] + "' found. All page ids must be unique.")
        quit(1)
    else:
        page_ids.add(page['id'])

    if 'table_widths' in page:
        t_w = page['table_widths']
        if sum(t_w) != 12:
            print("table_widths on page " + page['id'] + ' does not add up to 12')

    item_nums = set()
    for section in page['sections']:
        items = peekable(section['items'])
        for item in items:
            if isinstance(item, str):
                continue
            if not isinstance(item['id'], str):
                print("Please make item id " + str(item['id']) + ' a string by wrapping it in quotes. Found on page ' + page['id'] + ' in section "' + section['title'] + '"')
                quit(1)
            if (page['id'] + '_' + item['id']) in all_ids:
                print("Duplicate item num '" + str(item['id']) + "' in section '" + str(section['title']) + "' found in page '" + page['id'] + "'. All item ids must be unique within each page.")
                quit(1)
            all_ids.add(page['id'] + '_' + item['id'])
            if isinstance(items.peek(0), list):
                sub_item_nums = set()
                item_id = item['id']
                item = next(items)
                for subitem in item:
                    if not isinstance(subitem['id'], str):
                        print("Please make item id " + str(subitem['id']) + ' a string by wrapping it in quotes. Found on page ' + page['id'] + ' in section "' + section['title'] + '"')
                        quit(1)
                    if (page['id'] + '_' + item_id + '_' + subitem['id']) in all_ids:
                        print("Duplicate sub-item num '" + str(subitem['id']) + "' in section '" + page['id'] + '_' + str(section['title']) + "' found in page '" + page['id'] + "'. All item nums must be unique within it's section.")
                        quit(1)
                    else:
                        all_ids.add(page['id'] + '_' + item_id + '_' + subitem['id'])

def make_doc(title, description):
    doc = dominate.document(title=title)
    doc.set_attribute('lang', 'en')
    with doc.head:
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        link(rel="apple-touch-icon", sizes="180x180", href="/img/apple-touch-icon.png")
        link(rel="icon", type="image/png", sizes="32x32", href="/img/favicon-32x32.png")
        link(rel="icon", type="image/png", sizes="16x16", href="/img/favicon-16x16.png")
        link(rel="manifest", href="/img/site.webmanifest")
        meta(name="theme-color", content="#ffffff")
        meta(name="apple-mobile-web-app-capable", content="yes")
        meta(name="mobile-web-app-capable", content="yes")
        meta(name="description", content="Cheat sheet for Elden Ring. Checklist of things to do, items to get etc.")
        meta(name="author", content="Ben Lambeth")
        meta(name="mobile-web-app-capable", content="yes")
        link(href="/css/bootstrap.min.css", rel="stylesheet", id="bootstrap")
        link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css")
        link(href="/css/main.css", rel="stylesheet")
    return doc

def title_row():
    with div(cls="row"):
        with div(cls="col-md-12 text-center"):
            h1("Roundtable Hold", cls="mt-3")
            text = p(cls="lead d-print-none")
            text += "Contribute at the "
            text += a("Github Page",
                      href="https://github.com/RoundtableHold/roundtablehold.github.io")

def hide_completed_button():
    with div(id="btnHideCompleted", cls="mb-3 d-print-none"):
        with div(cls="form-check form-switch"):
            input_(cls="form-check-input", type="checkbox",
                   id='toggleHideCompleted')
            label("Hide Completed", cls="form-check-label",
                  _for='toggleHideCompleted')

def make_nav(page):
    with nav(cls="navbar sticky-top navbar-expand-md bg-dark navbar-dark d-print-none", id="top_nav"):
        with div(cls="container-fluid"):
            a('Roundtable Guides', cls="navbar-brand" + (' active' if page == 'index' else ''), href="/index.html")
            with button(type="button", cls="navbar-toggler", data_bs_toggle="collapse", data_bs_target="#nav-collapse", aria_expanded="false", aria_controls="nav-collapse", aria_label="Toggle navigation"):
                span(cls="navbar-toggler-icon")
            # with div(cls='order-md-last'):
            #     with form(cls="d-flex"):
            #         input_(cls='form-control me-2', type='search', placeholder='Search', aria_label='search', id='page_search')
            with div(cls="collapse navbar-collapse", id="nav-collapse"):
                with ul(cls="nav navbar-nav mr-auto"):
                    # with li(cls="nav-item"):
                    #     a(href="/index.html", cls="nav-link hide-buttons" + (' active' if page == 'index' else '')).add(i(cls="bi bi-house-fill"))
                    for name, l in dropdowns:
                        page_in_dropdown = page in [to_snake_case(guide[0]) for guide in l]
                        with li(cls="dropdown nav-item"):
                            a(name, cls="nav-link dropdown-toggle" + (' active' if page_in_dropdown else ''), href="#", data_bs_toggle="dropdown", aria_haspopup="true", aria_expanded="false").add(span(cls="caret"))
                            with ul(cls="dropdown-menu"):
                                for guide in l:
                                    li(cls='tab-li').add(a(guide[0], cls="dropdown-item show-buttons"  + (' active' if page == to_snake_case(guide[0]) else ''), href='/checklists/' + to_snake_case(guide[0]) + '.html'))
                    with li(cls='nav-item tab-li'):
                        a(href='/map.html', cls='nav-link hide-buttons' + (' active' if page == 'map' else '')).add(i(cls='bi bi-map'), 'Map')
                    with li(cls="nav-item tab-li"):
                        a(href="/options.html", cls="nav-link hide-buttons" + (' active' if page == 'options' else '')).add(i(cls="bi bi-gear-fill"), " Options")

# def make_sidebar_nav(page):
#     with aside(cls="bd-sidebar"):
#         with nav(cls='bd-links sidebar-nav collapse collapse-horizontal show', id='sidebar'):
#             with ul(id="sidebar_nav", cls="list-unstyled mb-0 py-3 pt-md-1"):
#                 with li(cls="mb-1"):
#                     link = a(href="/index.html", cls="dropdown-item hide-buttons" + (' show' if page == 'index' else ''))
#                     link += i(cls="bi bi-house-fill")
#                     link += " Home"
#                 for name, l in dropdowns:
#                     with li(cls="mb-1"):
#                         page_in_dropdown = page in [to_snake_case(guide[0]) for guide in l]
#                         button(name, cls="btn d-inline-flex align-items-center rounded" + (' collapsed' if not page_in_dropdown else ''), data_bs_toggle="collapse", data_bs_target='#' + to_snake_case(name) + '_dropdown', aria_expanded=('true' if page_in_dropdown else 'false'))
#                         with div(id=to_snake_case(name) + '_dropdown', cls='collapse' + (' show' if page_in_dropdown else '')):
#                             with ul(cls='list-unstyled fw-normal pb-1 small'):
#                                 for guide in l:
#                                     li().add(a(guide[0], cls="d-inline-flex align-items-center rounded" + (' active' if page == to_snake_case(guide[0]) else ''), href='/checklists/' + guide[1]))
#                 with li():
#                     link = a(href="/options.html", cls="dropdown-item hide-buttons" + (' active' if page == 'options' else ''))
#                     link += i(cls="bi bi-gear-fill")
#                     link += " Options"

def make_footer(page=None):
    script(src="/js/jquery.min.js")
    script(src='/js/scroll.js')
    script(src="/js/jstorage.min.js")
    script(src="/js/bootstrap.bundle.min.js")
    script(src="/js/jets.min.js")
    script(src="/js/jquery.highlight.js")
    script(src="/js/jstorage.min.js")
    raw("""
        <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-B7FMWDCTF5"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-B7FMWDCTF5');
    </script>
    """)
    if page:
        script(type="text/javascript").add_raw_string("""
            (function($) {{
                'use strict';
                $(function() {{
                    var jet = new Jets({{
                        searchTag: "#{page_id}_search",
                        contentTag: "#{page_id}_list ul",
                        didSearch: function(search_phrase) {{
                            search_phrase = search_phrase.trim().toLowerCase().replace(/\s\s+/g, ' ').replace(/\\\\/g, '\\\\\\\\');
                            $(".card").each(function(index, el) {{
                                if (!search_phrase) {{
                                    $(el).removeClass('d-none');
                                    return;
                                }}
                                var hasResults = $(el).find('.searchable').filter('[data-jets *= "' + search_phrase + '"]').length;
                                if (! hasResults ) {{
                                    $(el).addClass('d-none');
                                }} else {{
                                    $(el).removeClass('d-none');
                                }}
                            }});
                        }}
                    }});
                    $("#{page_id}_search").keyup(function() {{
                        $("#{page_id}_list").unhighlight();
                        $("#{page_id}_list").highlight($(this).val());
                    }});
                }});
            }})( jQuery );
            """.format(page_id=page['id']))

def make_index():
    doc = make_doc("Roundtable Guides", "Elden Ring Guides and Progress Tracker")
    with doc:
        make_nav('index')
        with div(cls="container"):
            with div(cls="row"):
                with div(cls="col-md-12 text-center"):
                    h1("Roundtable Guides", cls="mt-4")
                with div(cls="row gy-3"):
                    with div(cls='col-md-8 col-12'):
                        with div(cls='row row-cols-1 row-cols-md-2 gy-3'):
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5('Welcome to Roundtable Guides', cls='card-title text-center')
                                        p('Guides, Walkthroughs, and Progress Tracking for Elden Ring. Written and maintained by the players. This site is still a work in-progress. We are working on it every day.', cls='card-text')
                            with div(cls="col"):
                                with div(cls='card shadow h-100'):
                                    with div(cls="card-body"):
                                        h5('I have feedback, how can I contribute?', cls='card-title text-center')
                                        text = p(cls='card-text')
                                        text += 'Contributing is easy! And does not require you to know how to code. You can find instructions on the'
                                        text += a('Github repository', href='https://github.com/RoundtableHold/roundtablehold.github.io')
                                        text += ' You can also simply '
                                        text += a('report issues', href='https://github.com/RoundtableHold/roundtablehold.github.io/issues')
                                        text += " and we'll fix them."
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5('Can I use this for multiple characters?', cls='card-title text-center')
                                        p('Yes! Use the profile selector and buttons in the options tab at the top of the page to setup multiple profiles.', cls='card-text')
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5('How does the checklist status get saved?', cls='card-title text-center')
                                        p("The checklists are saved to your browser's local storage. Be careful when clearing your browser's cache as it will also destroy your saved progress.", cls='card-text')
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5('Our other resources', cls='card-title text-center')
                                        p('Join the Roundtable Hold ', cls='card-text').add(a('Discord community', href='https://discord.gg/FBBtZnESrb'))
                                        p('More guides are over on ', cls='card-text').add(a('/r/Roundtable_Guides', href='https://www.reddit.com/r/Roundtable_Guides/'))
                                        p('Video guides on the ', cls='card-text').add(a('YouTube channel', href='https://www.youtube.com/channel/UCE-I15Z8HQBNCFHq2V0bbsA'))
                    with div(cls="col-md-4 col-12"):
                        with div(cls='card shadow'):
                            with div(cls="card-body uncolor-links"):
                                h5('Progress', cls='card-title text-center')
                                with ul(id='progress_list', cls='nav flex-column'):
                                    hr()
                                    for name, l in dropdowns:
                                        for guide in l:
                                            li(cls='tab-li').add(a(guide[0], href="/checklists/" + to_snake_case(guide[0]) + '.html')).add(span(id=guide[1] + "_progress_total", cls='d-print-none'))
                                        hr()
            make_footer()
            script(src="/js/index.js")
    with open(os.path.join('docs', 'index.html'), 'w', encoding='utf_8') as index:
        index.write(doc.render())

def make_map():
    doc = make_doc("Roundtable Guides", "Elden Ring Guides and Progress Tracker")
    with doc.head:
        link(rel='stylesheet', href='/css/leaflet.css')
        script(src='/js/leaflet.js')
        script(src='/js/rastercoords.js')
    with doc:
        with div(cls="container-fluid vh-100 d-flex flex-column"):
            make_nav('map')
            with div(cls="row flex-grow-1"):
                div(id='map', cls='col flex-grow-1')
        make_footer()
        script(src='/js/map.js')
    with open(os.path.join('docs', 'map.html'), 'w', encoding='utf_8') as map:
        map.write(doc.render())

def make_options():
    doc = make_doc('Options | Roundtable Guides', 'Elden Ring Guides and Progress Tracker')
    with doc:
        make_nav('options')
        with div(cls="container"):
            with div(cls="row"):
                with div(cls="col-md-12 text-center"):
                    h1("Roundtable Guides", cls="mt-4")
            with div(cls="row"):
                h2("Options")
                with div(cls="row"):
                    div(cls="col col-12 col-md-6").add(h4("Theme selection:"))
                    div(cls="col col-12 col-md-6").add(select(cls="form-select", id="themes"))
                with div(cls="row"):
                    div(cls="col col-12 col-md-4").add(h4("Profile management:"))
                    with form(cls="form-inline input-group pull-right gap-1"):
                        with div(cls="col col-12 col-md-4"):
                            select(cls="form-select", id="profiles")
                        with div(cls="col col-12 col-md-4"):
                            with div(cls="btn-group"):
                                button("Add", cls="btn btn-primary", type="button", id="profileAdd")
                            with div(cls="btn-group"):
                                button("Edit", cls="btn btn-primary", type="button", id="profileEdit")
                            with div(cls="btn-group"):
                                button("NG+", cls="btn btn-primary", type="button", id="profileNG+")
                with div(cls="row"):
                    div(cls="col col-12 col-md-4").add(h4("Data import/export:"))
                    with div(cls="col col-12 col-md-8"):
                        with form(cls="form-inline gap-1 m-1"):
                            with div(cls="btn-group pull-left"):
                                button("Import file", cls="btn btn-primary", type="button", id="profileImport")
                            with div(cls="btn-group pull-left"):
                                button("Export file", cls="btn btn-primary", type="button", id="profileExport")
                            with div(cls="btn-group pull-right"):
                                button("Import textbox", cls="btn btn-primary", type="button", id="profileImportText")
                            with div(cls="btn-group pull-right mt-1 mt-md-0"):
                                button("Export clipboard", cls="btn btn-primary", type="button", id="profileExportText")
                    with div(cls="col col-12"):
                        textarea(id="profileText", cls="form-control")
            with div(id="profileModal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3("Profile", id="profileModalTitle", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        with div(cls="modal-body"):
                            with form(cls="form-horizontal"):
                                with div(cls="control-group"):
                                    label("Name", cls="control-label", _for="profileModalName")
                                    div(cls="controls").add(input_(type="text", cls="form-control", id="profileModalName", placeholder="Enter Profile name"))
                        with div(cls="modal-footer"):
                            button("Close", id="profileModalClose", cls="btn btn-secondary", data_bs_dismiss="modal")
                            a("Add", href="#", id="profileModalAdd", cls="btn btn-primary", data_bs_dismiss="modal")
                            a("Update", href="#", id="profileModalUpdate", cls="btn btn-primary")
                            a("Delete", href="#", id="profileModalDelete", cls="btn btn-primary")
            with div(id="NG+Modal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3("Begin next journey?", id="profileModalTitleNG", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        div('If you begin the next journey, all progress on the "Playthrough" and "Misc" tabs of this profile will be reset, while achievement and collection checklists will be kept.', cls="modal-body")
                        with div(cls="modal-footer"):
                            a("No", href="#", cls="btn btn-primary", data_bs_dismiss="modal")
                            a("Yes", href="#", cls="btn btn-danger", id="NG+ModalYes")

        div(cls="hiddenfile").add(input_(name="upload", type="file", id="fileInput"))
        make_footer()
        script(src="/js/options.js")
    with open(os.path.join('docs', 'options.html'), 'w', encoding='utf_8') as index:
        index.write(doc.render())

img_size = '70'

def make_checklist(page):
    page['num_ids'] = 0 
    doc = make_doc(page['title'] + " | Roundtable Guides", 'Elden Ring Guides and Progress Tracker')
    with doc:
        make_nav(to_snake_case(page['title']))
        # whole page
        with div(cls="container uncolor-links"):
            # title_row()
            # Filter buttons
            with div(cls="row text-center"):
                h = h1(cls='mt-4')
                h += page['title']
                h += span(id=page['id'] + "_overall_total", cls='d-print-none')
            
            hide_completed_button()

            if 'description' in page:
                p(raw(page['description']))

            with nav(cls="text-muted toc d-print-none"):
                with strong(cls="d-block h5").add(a(data_bs_toggle="collapse", role="button", href="#toc_" + page['id'], cls="toc-button")):
                    i(cls='bi bi-plus-lg')
                    raw('Table Of Contents')
                with ul(id="toc_" + page['id'], cls="toc_page collapse"):
                    for s_idx, section in enumerate(page['sections']):
                        with li():
                            a(section['title'], href="#" + page['id'] + '_section_'  + str(s_idx), cls="toc_link")
                            span(id=page['id']  + "_nav_totals_" + str(s_idx))

            with div(cls="input-group d-print-none"):
                input_(type="search", id=page['id'] + "_search", cls="form-control my-3", placeholder="Start typing to filter results...")

            with div(id=page['id']+"_list"):
                for s_idx, section in enumerate(page['sections']):
                    with div(cls='card shadow-sm mb-3', id=page['id'] + '_section_' + str(s_idx)).add(div(cls='card-body')):
                        with h4(cls="mt-1"):
                            with button(href="#" + page['id'] + '_' + str(s_idx) + "Col", data_bs_toggle="collapse", data_bs_target="#" + page['id'] + '_' + str(s_idx) + "Col", cls="btn btn-primary btn-sm me-2 collapse-button d-print-none", role="button"):
                                i(cls='bi bi-chevron-up d-print-none')
                            if 'icon' in section:
                                img(data_src=section['icon'], loading='lazy', height=img_size, width=img_size, cls='me-1')
                            if 'link' in section:
                                a(section['title'], href=section['link'], cls='d-print-inline')
                            else:
                                span(section['title'], cls='d-print-inline')
                            span(id=page['id'] + "_totals_" + str(s_idx), cls="mt-0 badge rounded-pill d-print-none")
                        if 'table' in section:
                            with div(id=page['id'] + '_' + str(s_idx) + "Col", cls="collapse show row", aria_expanded="true"):
                                if isinstance(section['table'], list):
                                    table_cols = len(section['table'])
                                    size = floor(12 / table_cols)
                                else:
                                    table_cols = section['table']
                                    size = floor(12 / table_cols)
                                items = peekable(section['items'])
                                if isinstance(items.peek(), str):
                                    item = next(items)
                                    h5(item)
                                with ul(cls='list-group list-group-flush mb-0'):
                                    if isinstance(section['table'], list):
                                        with li(cls="list-group-item d-md-block d-none").add(div(cls="row form-check checkbox d-flex")):
                                            with div(cls="col-auto d-flex align-items-center"):
                                                input_(cls="form-check-input invisible pe-0 me-0", type='checkbox')
                                            with div(cls="col d-flex align-items-center d-md-block").add(div(cls="row")):
                                                for idx, header in enumerate(section['table']):
                                                    if 'table_widths' in page:
                                                        col_size = str(page['table_widths'][idx])
                                                    else:
                                                        col_size = str(size)
                                                    div(cls="ms-0 ps-0 d-flex align-items-center col-md-" + col_size).add(label(strong(header), cls='ms-0 ps-0'))
                                    for item in items:
                                        id = str(item['id'])
                                        with li(cls="list-group-item searchable", data_id=page['id'] + '_' + id, id='item_' + id):
                                            if isinstance(item, str):
                                                h5(item)
                                                continue
                                            with div(cls="row form-check checkbox d-flex"):
                                                with div(cls="col-auto d-flex align-items-center"):
                                                    input_(cls="form-check-input pe-0 me-0", type="checkbox", value="",
                                                            id=page['id'] + '_' + id)
                                                    page['num_ids'] += 1
                                                with div(cls="col d-flex align-items-center d-md-block d-none").add(div(cls="row")):
                                                    for pos in range(table_cols):
                                                        if 'table_widths' in page:
                                                            col_size = str(page['table_widths'][pos])
                                                        else:
                                                            col_size = str(size)
                                                        with div(cls="ms-0 ps-0 d-flex align-items-center col-md-" + col_size):
                                                            with label(cls="form-check-label item_content ms-0 ps-0", _for=page['id'] + '_' + id):
                                                                if pos == 0 and 'icon' in item:
                                                                    img(data_src=item['icon'], loading='lazy', height=img_size, width=img_size, cls='me-1')
                                                                if item['data'][pos]:
                                                                    raw(item['data'][pos])
                                                with div(cls='col d-md-none'):
                                                    with label(cls="form-check-label item_content ms-0 ps-0", _for=page['id'] + '_' + id):
                                                        if 'icon' in item:
                                                            img(data_src=item['icon'], loading='lazy', width=img_size, height=img_size, cls='float-end')
                                                        for pos in range(table_cols):
                                                            if 'table_widths' in page:
                                                                col_size = str(page['table_widths'][pos])
                                                            else:
                                                                col_size = str(size)
                                                            if isinstance(section['table'], list) and item['data'][pos]:
                                                                strong(section['table'][pos] + ': ', cls="me-1")
                                                            if item['data'][pos]:
                                                                raw(item['data'][pos])
                                                                br()
                                                        
                        else:
                            with div(id=page['id'] + '_' + str(s_idx) + "Col", cls="collapse show", aria_expanded="true"):
                                items = peekable(section['items'])
                                if isinstance(items.peek(), str):
                                    item = next(items)
                                    h5(raw(item))
                                u = ul(cls="list-group-flush mb-0 ps-0 ps-md-4")
                                for item in items:
                                    if isinstance(item, str):
                                        h5(raw(item))
                                        u = ul(cls="list-group-flush mb-0")
                                        continue
                                    id = str(item['id'])
                                    with u.add(li(data_id=page['id'] + "_" + id, cls="list-group-item searchable ps-0", id='item_' + id)):
                                        with div(cls="form-check checkbox d-flex align-items-center"):
                                            input_(cls="form-check-input", type="checkbox", value="", id=page['id'] + '_' + id)
                                            with label(cls="form-check-label item_content", _for=page['id'] + '_' + id):
                                                if 'icon' in item:
                                                    img(data_src=item['icon'], loading='lazy', width=img_size, height=img_size, cls='float-md-none float-end me-md-1')
                                                raw(item['data'][0])
                                            page['num_ids'] += 1
                                    if isinstance(items.peek(0), list):
                                        item = next(items)
                                        with u.add(ul(cls="list-group-flush")):
                                            for subitem in item:
                                                with li(data_id=page['id'] + "_" + id + "_" + str(subitem['id']), cls="list-group-item searchable", id='item_' + id):
                                                    with div(cls="form-check checkbox d-flex align-items-center"):
                                                        input_(cls="form-check-input", type="checkbox", value="", id=page['id'] + '_' + id + '_' + str(subitem['id']))
                                                        with label(cls="form-check-label item_content", _for=page['id'] + '_' + id + '_' + str(subitem['id'])):
                                                            if 'icon' in subitem:
                                                                img(data_src=subitem['icon'], loading='lazy', width=img_size, height=img_size, cls='float-md-none float-end me-md-1')
                                                            raw(subitem['data'][0])
                                                        page['num_ids'] += 1

        a(cls="btn btn-primary btn-sm fadingbutton back-to-top d-print-none").add(raw("Back to Top&thinsp;"), span(cls="bi bi-arrow-up"))

        make_footer(page)
        script(src="/js/checklists.js")
        script(src="/js/item_links.js")
    with open(os.path.join('docs', 'checklists', to_snake_case(page['title']) + '.html'), 'w', encoding='utf_8') as index:
        index.write(doc.render())


make_index()
make_options()
make_map()
for page in pages:
    make_checklist(page)

def to_list(x):
    if isinstance(x, list):
        return x
    return [x]

def make_jquery_selector(x):
    l  = to_list(x)
    s = '$("'
    for e in l[:-1]:
        if str(e) not in all_ids:
            print('Potential typo in item links. "' + e + '" is not a valid id')
        s += '#' + str(e) + ','
    if str(l[-1]) not in all_ids:
        print('Potential typo in item links. "' + str(l[-1]) + '" is not a valid id')
    s += '#' + str(l[-1]) + '")'
    return s

with open(os.path.join('docs', 'js', 'item_links.js'), 'w', encoding='UTF-8') as links_f:
    links_f.writelines([
        '(function($) {\n',
        "  'use strict';\n",
        '  $(function() {\n',
    ])
    for link in item_links:
        if 'source' in link:
            sel = make_jquery_selector(link['source'])
            links_f.write('    ' + sel + '.click(function () {\n')
            links_f.write('      var checked = $(this).prop("checked");\n')
            for target in to_list(link['target']):
                links_f.write('      window.setCheckbox("' + target + '", checked);\n')
            links_f.write('    });\n')
            # t_sel = make_jquery_selector(link['target'])
            # links_f.write('      ' + t_sel + '.prop("checked", checked);\n')
            # links_f.write('      ' + t_sel + '.each(function(idx, el) {window.onCheckbox(el)});\n')
            # links_f.write('    });\n')
        elif 'source_or' in link:
            sel = make_jquery_selector(link['source_or'])
            links_f.write('    ' + sel + '.click(function () {\n')
            links_f.write('      var checked = (' + sel + '.filter(":checked").length !== 0);\n')
            for target in to_list(link['target']):
                links_f.write('      window.setCheckbox("' + target + '", checked);\n')
            links_f.write('    });\n')
        elif 'source_and' in link:
            sel = make_jquery_selector(link['source_and'])
            links_f.write('    ' + sel + '.click(function () {\n')
            links_f.write('      var checked = (' + sel + '.not(":checked").length === 0);\n')
            for target in to_list(link['target']):
                links_f.write('      window.setCheckbox("' + target + '", checked);\n')
            links_f.write('    });\n')
        elif 'link_all' in link:
            sel = make_jquery_selector(link['link_all'])
            links_f.write('    ' + sel + '.click(function () {\n')
            links_f.write('      var checked = $(this).prop("checked");\n')
            for target in to_list(link['link_all']):
                links_f.write('      window.setCheckbox("' + target + '", checked);\n')
            links_f.write('    });\n')
    links_f.write('  });\n')
    links_f.write('})( jQuery );\n')

with open(os.path.join('docs', 'js', 'index.js'), 'w', encoding='utf_8') as f:
    f.write(
        """
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
            registration.unregister();
        }
    })
}
var profilesKey = 'theme_profiles';\n
(function($) {
    'use strict';
    $(function() {
        var profiles = $.jStorage.get(profilesKey, {});
    
    var themes = {
        "Standard" : "/css/bootstrap.min.css",
        "LightMode" : "/css/themes/lightmode/bootstrap.min.css",
        "Ceruleon" : "/css/themes/cerulean/bootstrap.min.css",
        "Cosmo" : "/css/themes/cosmo/bootstrap.min.css",
        "Cyborg" : "/css/themes/cyborg/bootstrap.min.css",
        "Darkly" : "/css/themes/darkly/bootstrap.min.css",
        "Flatly" : "/css/themes/flatly/bootstrap.min.css",
        "Journal" : "/css/themes/journal/bootstrap.min.css",
        "Litera" : "/css/themes/litera/bootstrap.min.css",
        "Lumen" : "/css/themes/lumen/bootstrap.min.css",
        "Lux" : "/css/themes/lux/bootstrap.min.css",
        "Materia" : "/css/themes/materia/bootstrap.min.css",
        "Minty" : "/css/themes/minty/bootstrap.min.css",
        "Morph" : "/css/themes/Morph/bootstrap.min.css",
        "Pulse" : "/css/themes/pulse/bootstrap.min.css",
        "Quartz" : "/css/themes/quartz/bootstrap.min.css",
        "Regent" : "/css/themes/regent/bootstrap.min.css",
        "Sandstone" : "/css/themes/sandstone/bootstrap.min.css",
        "Simplex" : "/css/themes/simplex/bootstrap.min.css",
        "Sketchy" : "/css/themes/sketchy/bootstrap.min.css",
        "Slate" : "/css/themes/slate/bootstrap.min.css",
        "Solar" : "/css/themes/solar/bootstrap.min.css",
        "Spacelab" : "/css/themes/spacelab/bootstrap.min.css",
        "Superhero" : "/css/themes/superhero/bootstrap.min.css",
        "United" : "/css/themes/united/bootstrap.min.css",
        "Vapor" : "/css/themes/vapor/bootstrap.min.css",
        "Yeti" : "/css/themes/yeti/bootstrap.min.css",
        "Zephyr" : "/css/themes/zephyr/bootstrap.min.css",
    };

        /// assure default values are set
        /// necessary 'cause we're abusing local storage to store JSON data
        /// done in a more verbose way to be easier to understand
        if (!('current' in profiles)) profiles.current = 'Default Profile';
        if (!(profilesKey in profiles)) profiles[profilesKey] = {};
        initializeProfile(profiles.current);
        function initializeProfile(profile_name) {
            if (!(profile_name in profiles[profilesKey])) profiles[profilesKey][profile_name] = {};
            if (!('checklistData' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].checklistData = {};
            if (!('collapsed' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].collapsed = {};
            if (!('hide_completed' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].hide_completed = false;
            if (!('journey' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].journey = 1;
            if (!('style' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].style = 'Standard';
        }
        
    function themeSetup(stylesheet) {
        if(stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }
        themeSetup(profiles[profilesKey][profiles.current].style);
        """)
    f.write('var all_ids = new Set([\n')
    all_ids_list = list(all_ids)
    all_ids_list.sort()
    for id in all_ids_list:
        f.write('"' + id + '",\n')
    f.write(']);\n')
    f.write('function calculateProgress() {\n')
    for page in pages:
        f.write('const ' + page['id'] + '_total = ' + str(page['num_ids']) + ';\n')
        f.write('var ' + page['id'] + '_checked = 0;\n')
    f.write('for (var id in profiles[profilesKey][profiles.current].checklistData) {\n')
    f.write('if (profiles[profilesKey][profiles.current].checklistData[id] === true && all_ids.has(id)) {\n')
    for page in pages:
        f.write('if (id.startsWith("{page_id}")) {{\n'.format(page_id=page['id']))
        f.write(page['id'] + '_checked += 1;\n}\n')
    f.write('}\n')
    f.write('}\n')
    for page in pages:
        f.write('if ({page_id}_checked >= {page_id}_total){{\n'.format(page_id=page['id']))
        f.write('$("#{page_id}_progress_total").html("DONE");\n'.format(page_id=page['id']))
        f.write('} else {\n')
        f.write('$("#{page_id}_progress_total").html({page_id}_checked + "/" + {page_id}_total);\n'.format(page_id=page['id']))
        f.write('}\n')
    f.write('}\n')
    f.write('calculateProgress();\n')
    f.write('  });\n')
    f.write('})( jQuery );\n')

# with open(os.path.join('docs', 'sw.js'), 'w', encoding='utf_8') as f:
#     f.write(
# """
# var cache_ver = 'roundtable-store-3';

# self.addEventListener('activate', function(event) {
#   event.waitUntil(
#     caches.keys().then(function(cacheNames) {
#       return Promise.all(
#         cacheNames.filter(function(cacheName) {
#             return cacheName !== cache_ver;
#         }).map(function(cacheName) {
#           return caches.delete(cacheName);
#         })
#       );
#     })
#   );
# });

# self.addEventListener('install', (e) => {
#     e.waitUntil(
#         caches.open(cache_ver).then((cache) => cache.addAll([
#             '/',
# """)
#     for root, dirs, files in os.walk("docs"):
#         for name in files:
#             f.write("            '" + root.replace("\\", "/")[4:] + '/' + name + "',\n")
#     f.write(
# """
#         ])),
#     );
# });

# self.addEventListener('fetch', function (event) {
#     //console.log('Handling fetch event for', event.request.url);

#     event.respondWith(            
#         caches.match(event.request).then(function (response) {
#             if (response) {
#                 //console.log('Found response in cache:', response);

#                 return response;
#             }

#             //console.log('No response found in cache. About to fetch from network...');

#             return fetch(event.request).then(function (response) {
#                 //console.log('Response from network is:', response);

#                 return response;
#             }).catch(function (error) {                    
#                 //console.error('Fetching failed:', error);

#                 return caches.match(OFFLINE_URL);
#             });
#         })
#     );
# });
# """)
