import json
import os
import re
from math import floor

import dominate
import yaml
from dominate.tags import *
from dominate.util import raw
from more_itertools import peekable


def to_snake_case(name):
    name = "".join(name.split())
    name = re.sub(r'\W+', '', name)
    name = re.sub(r'(.)([A-Z][a-z]+)', r'\1_\2', name)
    name = re.sub(r'__([A-Z])', r'_\1', name)
    name = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', name)
    return name.lower()

def strip_a_tags(s):
    return re.sub(r'(?i)</?a[^>]*>', '', s)

dropdowns = []
pages = []
item_links = []
with open(os.path.join('data', 'pages.yaml'), 'r', encoding='utf_8') as pages_yaml:
    yml = yaml.safe_load(pages_yaml)
    item_links = yml['item_links']
    for dropdown in yml['dropdowns']:
        dropdown_urls = []
        for page in dropdown['pages']:
            with open(os.path.join('data', 'checklists', page), 'r', encoding='utf_8') as data:
                yml = yaml.safe_load(data)
                pages.append(yml)
                dropdown_urls.append((yml['title'], yml['id'], yml.get('map_icon', None)))
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
            def f(item):
                if not isinstance(item['id'], str):
                    print("Please make item id " + str(item['id']) + ' a string by wrapping it in quotes. Found on page ' + page['id'] + ' in section "' + section['title'] + '"')
                    quit(1)
                if (page['id'] + '_' + item['id']) in all_ids:
                    print("Duplicate item id '" + str(item['id']) + "' in section '" + str(section['title']) + "' found in page '" + page['id'] + "'. All item ids must be unique within each page.")
                    quit(1)
                all_ids.add(page['id'] + '_' + item['id'])
            f(item)
            if isinstance(items.peek(0), list):
                item = next(items)
                for subitem in item:
                    f(subitem)

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

def make_nav(page, is_map = False):
    with nav(cls="navbar navbar-expand-xl bg-dark navbar-dark d-print-none" + (' sticky-top' if not is_map else ''), id="top_nav"):
        with div(cls="container-fluid"):
            # with div(cls='order-sm-last d-none d-sm-block ms-auto'):
            with button(type="button", cls="navbar-toggler", data_bs_toggle="collapse", data_bs_target="#nav-collapse", aria_expanded="false", aria_controls="nav-collapse", aria_label="Toggle navigation"):
                span(cls="navbar-toggler-icon")
            a('Roundtable Guides', cls="navbar-brand me-auto ms-2" + (' active' if page == 'index' else ''), href="/index.html")
            with form(cls="d-none d-sm-flex order-2 order-xl-3"):
                input_(cls='form-control me-2', type='search', placeholder='Search', aria_label='search', name='search')
                button(type='submit', cls='btn', formaction='/search.html', formmethod='get', formnovalidate='true').add(i(cls='bi bi-search'))
            with div(cls='d-sm-none order-2'):
                a(href='/search.html', cls='nav-link me-0').add(i(cls='bi bi-search sb-icon-search'))
            with div(cls="collapse navbar-collapse order-3 order-xl-2", id="nav-collapse"):
                with ul(cls="nav navbar-nav navbar-nav-scroll mr-auto"):
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
                        a(href="/map.html", cls="nav-link hide-buttons" + (' active' if page == 'map' else '')).add(i(cls="bi bi-map"), " Map")
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
    script(src="/js/jstorage.min.js")
    script(src='/js/item_links.js')
    script(src='/js/common.js')
    script(src="/js/bootstrap.bundle.min.js")
    script(src="/js/jets.min.js")
    script(src="/js/jquery.highlight.js")
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
                            with div(cls='col'):
                                with div(cls='card shadow h-100'):
                                    with div(cls='card-body'):
                                        h5('Get the Apps!', cls='card-title text-center')
                                        with div(style='width: 180px;', cls='badge'):
                                            with a(href='https://apps.apple.com/us/app/elden-ring-guides/id1620436088?itsct=apps_box_badge&amp;itscg=30200'):
                                                img(src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1650585600&h=3eb10370b9c49cf5b5dde5ca0352f23a", alt="Download on the App Store", style='margin: 6%; width: 88%;')
                                        with div(style='width: 180px;', cls='badge'):
                                            with a(href='https://play.google.com/store/apps/details?id=com.roundtablehold.eldenringguides&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1', style='width: 100%;'):
                                                img(src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png', style='width: 100%;')
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5('Our other resources', cls='card-title text-center')
                                        p('Join the Roundtable Hold ', cls='card-text').add(a('Discord community', href='https://discord.gg/FBBtZnESrb'))
                                        p('More guides are over on ', cls='card-text').add(a('/r/Roundtable_Guides', href='https://www.reddit.com/r/Roundtable_Guides/'))
                                        p('Video guides on the ', cls='card-text').add(a('YouTube channel', href='https://www.youtube.com/channel/UCE-I15Z8HQBNCFHq2V0bbsA'))
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
                    with div(cls='row'):
                        div(id='alert-div')
                    with div(cls='row'):
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
            with div(id='importTextModal', cls='modal fade', tabindex='-1', role='dialog'):
                with div(cls='modal-dialog', role='document'):
                    with div(cls='modal-content'):
                        with div(cls='modal-header'):
                            h3('Import profile?', cls='modal-title')
                            button(type='button', cls='btn-close', data_bs_dismiss='modal', aria_label='Close')
                        div('If you import this profile all of your current progress will be lost.', cls='modal-body')
                        with div(cls='modal-footer'):
                            a('No', href='#', cls='btn btn-primary', data_bs_dismiss='modal')
                            a('Yes', href='#', cls='btn btn-danger', id='importTextYes')
            with div(id='importFileModal', cls='modal fade', tabindex='-1', role='dialog'):
                with div(cls='modal-dialog', role='document'):
                    with div(cls='modal-content'):
                        with div(cls='modal-header'):
                            h3('Import profile?', cls='modal-title')
                            button(type='button', cls='btn-close', data_bs_dismiss='modal', aria_label='Close')
                        div('If you import this profile all of your current progress will be lost.')
                        with div(cls='modal-footer'):
                            a('No', href='#', cls='btn btn-primary', data_bs_dismiss='modal')
                            a('Yes', href='#', cls='btn btn-danger', id='importFileYes')
            with div(id='deleteModal', cls='modal fade', tabindex='-1', role='dialog'):
                with div(cls='modal-dialog', role='document'):
                    with div(cls='modal-content'):
                        with div(cls='modal-header'):
                            h3('Are you sure?', cls='modal-title')
                            button(type='button', cls='btn-close', data_bs_dismiss='modal', aria_label='Close')
                        div('You will lose all progress in this profile. Please back it up first.')
                        with div(cls='modal-footer'):
                            a('No', href='#', cls='btn btn-primary', data_bs_dismiss='modal')
                            a('Yes', href='#', cls='btn btn-danger', id='deleteYes')

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
                                table_widths = section['table_widths'] if 'table_widths' in section else page['table_widths']
                                items = peekable(section['items'])
                                if isinstance(items.peek(), str):
                                    item = next(items)
                                    h5(item)
                                with ul(cls='list-group list-group-flush mb-0'):
                                    if isinstance(section['table'], list):
                                        with li(cls="list-group-item d-md-block d-none").add(div(cls="row form-check checkbox d-flex")):
                                            with div(cls="col-auto d-flex align-items-center"):
                                                input_(cls="form-check-input invisible pe-0 me-0", type='checkbox')
                                            with div(cls='col-auto d-flex align-items-center order-last'):
                                                a(href='#', cls='invisible').add(i(cls='bi bi-geo-alt'))
                                            with div(cls="col d-flex align-items-center d-md-block").add(div(cls="row")):
                                                for idx, header in enumerate(section['table']):
                                                    col_size = str(table_widths[idx])
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
                                                with div(cls='col-auto d-flex align-items-center order-last'):
                                                    a(href='/map.html?id={}'.format(page['id'] + '_' + id), cls=('invisible' if 'cords' not in item else '')).add(i(cls='bi bi-geo-alt'))
                                                with div(cls="col d-flex align-items-center d-md-block d-none").add(div(cls="row")):
                                                    for pos in range(table_cols):
                                                        col_size = str(table_widths[pos])
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
                                                            col_size = str(table_widths[pos])
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
                                    def f(item):
                                        id = str(item['id'])
                                        with li(data_id=page['id'] + "_" + id, cls="list-group-item searchable ps-0", id='item_' + id):
                                            with div(cls="form-check checkbox d-flex align-items-center"):
                                                input_(cls="form-check-input", type="checkbox", value="", id=page['id'] + '_' + id)
                                                with label(cls="form-check-label item_content", _for=page['id'] + '_' + id):
                                                    if 'icon' in item:
                                                        img(data_src=item['icon'], loading='lazy', width=img_size, height=img_size, cls='float-md-none float-end me-md-1')
                                                    raw(item['data'][0])
                                                if 'cords' in item:
                                                    a(href='/map.html?id={}'.format(page['id'] + '_' + id)).add(i(cls='bi bi-geo-alt'))
                                                page['num_ids'] += 1
                                    with u:
                                        f(item)
                                    if isinstance(items.peek(0), list):
                                        item = next(items)
                                        with u.add(ul(cls='list-group-flush')):
                                            for subitem in item:
                                                f(subitem)

        a(cls="btn btn-primary btn-sm fadingbutton back-to-top d-print-none").add(raw("Back to Top&thinsp;"), span(cls="bi bi-arrow-up"))

        make_footer(page)
        script(src="/js/checklists.js")
    with open(os.path.join('docs', 'checklists', to_snake_case(page['title']) + '.html'), 'w', encoding='utf_8') as index:
        index.write(doc.render())

def make_search():
    doc = make_doc("Search | Roundtable Guides", 'Elden Ring Guides and Progress Tracker')
    with doc:
        make_nav('search')
        # whole page
        with div(cls="container uncolor-links"):
            with div(cls='row text-center'):
                h3('Search', cls='mt-4')
            with div(cls='row mt-4'):
                with form(cls="d-flex"):
                    input_(cls='form-control me-2', type='search', placeholder='Search', aria_label='search', id='page_search', name='search')
                    button(id='search_submit', cls='btn').add(i(cls='bi bi-search'))
            with div(cls='row mt-4 d-flex justify-content-center d-none', id='spinner'):
                with div(cls='spinner-border text-primary', role='status'):
                    span('Loading...', cls='visually-hidden')
            with div(cls='row mt-4').add(div(cls='col')):
                with div(cls='list-group list-group-flush mb-0'):
                    for page in pages:
                        for s_idx, section in enumerate(page['sections']):
                            items = peekable(section['items'])
                            if 'table' in section:
                                if isinstance(section['table'], list):
                                    table_cols = len(section['table'])
                                    size = floor(12 / table_cols)
                                else:
                                    table_cols = section['table']
                                    size = floor(12 / table_cols)
                                table_widths = section['table_widths'] if 'table_widths' in section else page['table_widths']
                                for item in items:
                                    with a(cls='d-none list-group-item list-group-item-action searchable', href='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id']), id='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id'])):
                                        if isinstance(item,str):
                                            continue
                                        with div(cls='row d-md-flex d-none'):
                                            for pos in range(table_cols):
                                                col_size = str(table_widths[pos])
                                                with div(cls='d-flex align-items-center col-md-' + col_size):
                                                    if pos == 0 and 'icon' in item:
                                                        img(data_src=item['icon'], loading='lazy', height=img_size, width=img_size, cls='me-1')
                                                    if item['data'][pos]:
                                                        raw(strip_a_tags(item['data'][pos]))
                                        with div(cls='row d-md-none').add(div(cls='col')):
                                            if 'icon' in item:
                                                img(data_src=item['icon'], loading='lazy', width=img_size, height=img_size, cls='float-end')
                                            for pos in range(table_cols):
                                                col_size = str(table_widths[pos])
                                                if isinstance(section['table'], list) and item['data'][pos]:
                                                    strong(strip_a_tags(section['table'][pos]) + ': ', cls='me-1')
                                                if item['data'][pos]:
                                                    raw(strip_a_tags(item['data'][pos]))
                                                    br()
                            else:
                                for item in items:
                                    if isinstance(item, str):
                                        continue
                                    def f(item):
                                        with a(cls='d-none list-group-item list-group-item-action searchable', href='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id']), id='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id'])):
                                            with div(cls='d-flex align-items-center'):
                                                if 'icon' in item:
                                                    img(data_src=item['icon'], loading='lazy', width=img_size, height=img_size, cls='float-md-none float-end me-md-1')
                                                raw(strip_a_tags(item['data'][0]))
                                    f(item)
                                    if isinstance(items.peek(0), list):
                                        item_id = str(item['id'])
                                        item = next(items)
                                        for subitem in item:
                                            f(subitem)
        make_footer()
        script(src='/js/lunr.js')
        script(src='/js/search.js')
    with open(os.path.join('docs', 'search.html'), 'w', encoding='utf_8') as out:
        out.write(doc.render())


make_index()
make_options()
make_search()
for page in pages:
    make_checklist(page)

def to_list(x):
    if isinstance(x, list):
        return set(x)
    return set([x])

def make_item_links():
    links_json = {}
    for l in item_links:
        if 'source' in l:
            for t in to_list(l['target']):
                if (str(t)) not in all_ids:
                    print('Potential typo in item links. "' + str(t) + '" is not a valid id')
            for s in to_list(l['source']):
                if (str(s)) not in all_ids:
                    print('Potential typo in item links. "' + str(s) + '" is not a valid id')
                t = to_list(l['target'])
                t.discard(s)
                links_json.setdefault(s, {}).setdefault('targets', []).extend(list(t))
                links_json.setdefault(s, {}).setdefault('targets', []).sort()
        if 'source_or' in l:
            for t in to_list(l['target']):
                if (str(t)) not in all_ids:
                    print('Potential typo in item links. "' + str(t) + '" is not a valid id')
            for s in to_list(l['source_or']):
                if (str(s)) not in all_ids:
                    print('Potential typo in item links. "' + str(s) + '" is not a valid id')
                ss = to_list(l['source_or'])
                ss.discard(s)
                t = to_list(l['target'])
                t.discard(s)
                links_json.setdefault(s, {}).setdefault('orsources', []).extend(list(ss))
                links_json.setdefault(s, {}).setdefault('orsources', []).sort()
                links_json.setdefault(s, {}).setdefault('ortargets', []).extend(list(t))
                links_json.setdefault(s, {}).setdefault('ortargets', []).sort()
        if 'source_and' in l:
            for t in to_list(l['target']):
                if (str(t)) not in all_ids:
                    print('Potential typo in item links. "' + str(t) + '" is not a valid id')
            for s in to_list(l['source_and']):
                if (str(s)) not in all_ids:
                    print('Potential typo in item links. "' + str(s) + '" is not a valid id')
                ss = to_list(l['source_and'])
                ss.discard(s)
                t = to_list(l['target'])
                t.discard(s)
                links_json.setdefault(s, {}).setdefault('andsources', []).extend(list(ss))
                links_json.setdefault(s, {}).setdefault('andsources', []).sort()
                links_json.setdefault(s, {}).setdefault('andtargets', []).extend(list(t))
                links_json.setdefault(s, {}).setdefault('andtargets', []).sort()
        if 'link_all' in l:
            for s in to_list(l['link_all']):
                if (str(s)) not in all_ids:
                    print('Potential typo in item links. "' + str(s) + '" is not a valid id')
                t = to_list(l['link_all'])
                t.discard(s)
                links_json.setdefault(s, {}).setdefault('targets', []).extend(list(t))
                links_json.setdefault(s, {}).setdefault('targets', []).sort()
    with open(os.path.join('docs', 'js', 'item_links.js'), 'w', encoding='UTF-8') as links_f:
        links_f.write('const item_links = ')
        json.dump(links_json, links_f, indent=2, sort_keys=True)

make_item_links()

with open(os.path.join('docs', 'js', 'index.js'), 'w', encoding='utf_8') as f:
    f.write(
        """
(function($) {
    'use strict';
    $(function() {
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

search_idx = []
for page in pages:
    for section in page['sections']:
        items = peekable(section['items'])
        for item in items:
            if isinstance(item, str):
                continue
            def f(item):
                search_idx.append({
                    'id': '/checklists/{page_href}#item_{id}'.format(page_href=to_snake_case(page['title']) + '.html', id=item['id']),
                    'text': re.sub(r'(<([^>]+)>)', '', ' '.join(item['data'])),
                })
            f(item)
            if isinstance(items.peek(0), list):
                item = next(items)
                for subitem in item:
                    f(subitem)
                    # id = item_id + '_' + str(subitem['id'])
                    # search_idx.append({
                    #     'id': '/checklists/{page_href}#item_{id}'.format(page_href=to_snake_case(page['title']) + '.html', id=id),
                    #     'text': re.sub(r'(<([^>]+)>)', '', ' '.join(subitem['data'])),
                    # })

with open(os.path.join('docs', 'search_index.json'), 'w') as s_idx:
    json.dump(search_idx, s_idx, indent=2, sort_keys=True)

def get_icon(page, section, item):
    icon = ''
    icon_size = 40
    if 'map_icon' in item:
        icon = item['map_icon']
        if 'map_icon_size' in item:
            icon_size = item['map_icon_size']
    elif 'map_icon' in section:
        icon = section['map_icon']
        if 'map_icon_size' in section:
            icon_size = section['map_icon_size']
    elif 'map_icon' in page:
        icon = page['map_icon']
        if 'map_icon_size' in page:
            icon_size = page['map_icon_size']
    elif 'icon' in item:
        icon = item['icon']
        if 'map_icon_size' in item:
            icon_size = item['map_icon_size']
    elif 'icon' in section:
        icon = section['icon'] 
        if 'map_icon_size' in section:
            icon_size = section['map_icon_size']
    elif 'icon' in page:
        icon = page['icon']
        if 'map_icon_size' in page:
            icon_size = page['map_icon_size']
    else:
        print("Missing icon for {}".format(page['id'] + '_' + item['id']))
    return (icon, icon_size)

def make_feature(page, section, item):
    icon, icon_size = get_icon(page, section, item)
    return {
        'type': 'Feature',
        'id': page['id'] + '_' + item['id'],
        'geometry': {
            'type': 'Point',
            'coordinates': item['cords'],
        },
        'properties': {
            'title': item['map_title'],
            'id': page['id'] + '_' + item['id'],
            'group': page['id'],
            'icon': icon,
            'icon_size': icon_size,
            'link': '/checklists/' + to_snake_case(page['title']) + '.html#item_' + item['id']
        }
    }

pages_in_map = set()
def make_geojson():
    layers = []
    icons = set()
    for page in pages:
        geojson = {}
        geojson['type'] = 'FeatureCollection'
        geojson['features'] = []
        has_features = False
        for section in page['sections']:
            items = peekable(section['items'])
            for item in items:
                if isinstance(item, str):
                    continue
                if 'cords' in item:
                    has_features = True
                    geojson['features'].append(make_feature(page, section, item))
                    icons.add(get_icon(page, section, item)[0])
                if isinstance(items.peek(0), list):
                    item = next(items)
                    for subitem in item:
                        if 'cords' in subitem:
                            has_features = True
                            geojson['features'].append(make_feature(page, section, subitem))
                            icons.add(get_icon(page, section, item)[0])
        if has_features:
            layers.append(geojson)
            pages_in_map.add(page['id'])
    with open(os.path.join('docs', 'map', 'src', 'js', 'features.js'), 'w') as outf:
        outf.write('const feature_data = ')
        json.dump(layers, outf, indent=2, sort_keys=True)
        outf.write(';\nconst icon_urls = ')
        l = list(icons)
        l.sort()
        json.dump(l, outf, indent=2, sort_keys=True)

def make_map():
    doc = make_doc('Map | Roundtable Guides', 'Elden Ring Guides and Progress Tracker')
    with doc.head:
        link(rel='stylesheet', href='/map/src/css/ol.css')
        link(rel='stylesheet', href='/map/src/css/map.css')
    with doc:
        with div(cls='container-fluid h-100 d-flex flex-column p-0 m-0 g-0'):
            with div(cls='row m-0 p-0 g-0'):
                make_nav('map', True)
            with div(cls='row h-100 flex-grow-1 p-0 m-0 g-0'):
                div(id='map', cls='m-0 p-0 g-0')
            with div(cls='offcanvas offcanvas-end m-0 p-0 g-0', id='layer-menu', data_bs_stroll="true", data_bs_backdrop="false", tabindex="-1"):
                with button(cls='btn btn-primary btn-sml offcanvas-btn position-absolute p-1', type='button', data_bs_toggle='offcanvas', data_bs_target='#layer-menu', style='height: 50px;'):
                    i(cls='bi bi-caret-left-fill m-0 p-0')
                    i(cls='bi bi-caret-right-fill m-0 p-0')
                    # h3('Map', cls='offcanvas-title')
                with div(cls='offcanvas-body'):
                    with div(cls='row'):
                        with div(cls='col-auto order-last'):
                            button(type='button', cls='btn-close text-reset d-lg-none', data_bs_dismiss='offcanvas')
                        with div(cls='col'):
                            with div(cls='form-check'):
                                input_(cls='form-check-input', type='checkbox', value='', id='hideCompleted')
                                label('Hide Completed', cls='form-check-label', _for='hideCompleted')
                    for name, l in dropdowns:
                        should_print_category = False
                        for guide in l:
                            if guide[1] in pages_in_map:
                                should_print_category = True
                                break
                        if should_print_category:
                            h4(name)
                            hr(cls='m-0')
                            for guide in l:
                                if guide[1] in pages_in_map:
                                    with div(cls='form-check'):
                                        l = label(cls='form-check-label', _for=guide[1])
                                        l += input_(cls='form-check-input category-filter', type='checkbox', value='', id=guide[1], hidden='')
                                        if guide[2]:
                                            l += img(data_src=guide[2], loading='lazy', height=20, width=20, cls='me-1')
                                        l += guide[0]
                        # with li(cls="dropdown nav-item"):
                        #     a(name, cls="nav-link dropdown-toggle" + (' active' if page_in_dropdown else ''), href="#", data_bs_toggle="dropdown", aria_haspopup="true", aria_expanded="false").add(span(cls="caret"))
                        #     with ul(cls="dropdown-menu"):
                        #         for guide in l:
                        #             li(cls='tab-li').add(a(guide[0], cls="dropdown-item show-buttons"  + (' active' if page == to_snake_case(guide[0]) else ''), href='/checklists/' + to_snake_case(guide[0]) + '.html'))

            with div(id='popup', cls='ol-popup'):
                a(href='#', id='popup-closer', cls='ol-popup-closer')
                with div(cls="form-check checkbox d-flex align-items-center popup-content"):
                    input_(cls="form-check-input", type="checkbox", value="", id='popup-checkbox')
                    label(cls="form-check-label item_content", _for='popup-checkbox', id='popup-title')
                    a(href="#", id='popup-link', cls='ms-3').add(i(cls='bi bi-link-45deg'))
        make_footer()
        script(src='/map/src/js/ol.js')
        script(src='/map/src/js/features.js')
        script(src='/map/src/js/map.js')
    with open(os.path.join('docs', 'map.html'), 'w', encoding='utf_8') as f:
        f.write(doc.render())

make_geojson()
make_map()