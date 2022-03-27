import os
import yaml
import re
import dominate
from dominate.tags import *
from dominate.util import raw
from more_itertools import peekable


doc = dominate.document(title="Roundtable Tracker")

def to_snake_case(name):
    name = "".join(name.split())
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    name = re.sub('__([A-Z])', r'_\1', name)
    name = re.sub('([a-z0-9])([A-Z])', r'\1_\2', name)
    return name.lower()

yaml_files_guides = ['walkthrough.yaml', 'quests.yaml']
yaml_files_checklists = ['bosses.yaml', 'flasks.yaml', 'legendaries.yaml', 'weapons.yaml', 'sorceries.yaml', 'bell_bearings.yaml', 'cookbooks.yaml']
guides = []
checklists = []
pages = []
for yaml_file in yaml_files_guides:
    with open(os.path.join('data', yaml_file), 'r') as data:
        yml = yaml.safe_load(data)
        pages.append(yml)
        guides.append((yml['title'], yml['id']))
for yaml_file in yaml_files_checklists:
    with open(os.path.join('data', yaml_file), 'r') as data:
        yml = yaml.safe_load(data)
        pages.append(yml)
        checklists.append((yml['title'], yml['id']))

page_ids = set()
section_ids = set()
for page in pages:
    if page['id'] in page_ids:
        print("Duplicate page id '" + page['id'] + "' found. All page ids must be unique.")
        quit()
    else:
        page_ids.add(page['id'])

    section_nums = set()
    for section in page['sections']:
        if section['id'] in section_ids:
            print("Duplicate section id '" + section['id'] + "' found in page '" + page['id'] + "'. All section ids must be unique.")
            quit()
        else:
            section_ids.add(section['id'])
        if section['num'] in section_nums:
            print("Duplicate section num '" + str(section['num']) + "' found in page '" + page['id'] + "'. All section nums must be unique.")
            quit()
        else:
            section_nums.add(section['num'])
        item_nums = set()
        items = peekable(section['items'])
        for item in items:
            if not isinstance(item, list):
                continue
            if item[0] in item_nums:
                print("Duplicate item num '" + str(item[0]) + "' in section '" + section['id'] + "' found in page '" + page['id'] + "'. All item nums must be unique within it's section.")
                quit()
            else:
                item_nums.add(item[0])
            if isinstance(items.peek([0])[0], list):
                sub_item_nums = set()
                item = next(items)
                for subitem in item:
                    if subitem[0] in sub_item_nums:
                        print("Duplicate sub-item num '" + str(subitem[0]) + "' in section '" + section['id'] + "' found in page '" + page['id'] + "'. All item nums must be unique within it's section.")
                        quit()
                    else:
                        sub_item_nums.add(subitem[0])



with doc.head:
    meta(charset="utf-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    link(rel="shortcut icon", type="image/x-icon", href="img/favicon.ico?")
    link(rel="apple-touch-icon-precomposed", href="img/favicon-152.png")
    link(rel="mask-icon", href="img/pinned-tab-icon.svg", color="#000000")
    meta(name="description", content="Cheat sheet for Elden Ring. Checklist of things to do, items to get etc.")
    meta(name="author", content="Ben Lambeth")
    meta(name="mobile-web-app-capable", content="yes")
    link(id="bootstrap", href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css", rel="stylesheet", crossorigin="anonymous")
    link(href="css/main.css", rel="stylesheet")

with doc:
    with nav(cls="navbar navbar-default"):
        with div(cls="container-fluid"):
            with div(cls="navbar-header"):
                with button(type="button", cls="navbar-toggle collapsed", data_toggle="collapse", data_target="#nav-collapse", aria_expanded="false"):
                    span("Toggle navigation", cls="sr-only")
                    span(cls="icon-bar")
                    span(cls="icon-bar")
                    span(cls="icon-bar")
            with div(cls="collapse navbar-collapse", id="nav-collapse"):
                with ul(cls="nav navbar-nav"):
                    with li(cls="active"):
                        a(href="#tabMain", data_toggle="tab").add(span(cls="glyphicon glyphicon-home"))
                    with li(cls="dropdown"):
                        a("Guides", cls="dropdown-toggle", href="#", data_toggle="dropdown", aria_haspopup="true", aria_expanded="false").add(span(cls="caret"))
                        with ul(cls="dropdown-menu"):
                            for guide in guides:
                                li().add(a(guide[0], cls="dropdown-item", href="#tab" + guide[1], data_toggle="tab", data_target="#tab" + guide[1] + ",#btnHideCompleted"))
                    with li(cls="dropdown"):
                        a("Checklists", cls="dropdown-toggle", href="#", data_toggle="dropdown", aria_haspopup="true", aria_expanded="false").add(span(cls="caret"))
                        with ul(cls="dropdown-menu"):
                            for guide in checklists:
                                li().add(a(guide[0], cls="dropdown-item", href="#tab" + guide[1], data_toggle="tab", data_target="#tab" + guide[1] + ",#btnHideCompleted"))
                    with li():
                        a(href="#tabOptions", data_toggle="tab").add(span(cls="glyphicon glyphicon-cog"), " Options")
    with div(cls="container"):
        with div(cls="row"):
            with div(cls="col-md-12 text-center"):
                h1("Roundtable Tracker")
                text = p(cls="lead")
                text += "Contribute to the guide at the "
                text += a("Github Page", href="https://github.com/Roundtable-Hold/tracker")
        with div(cls="tab-content"):
            # Hide completed toggle
            with div(cls="tab-pane in", id="btnHideCompleted"):
                with div(cls="btn-group", role="group", data_toggle="buttons"):
                    with label(cls="btn btn-default") as l:
                        input_(type="checkbox", id="toggleHideCompleted")
                        span(cls="glyphicon glyphicon-eye-close")
                        span(cls="glyphicon glyphicon-eye-open")
                        l  += "Hide Completed"
                        with a(cls="btn btn-default btn-sm fadingbutton togglehide", onclick="$('#toggleHideCompleted').click();") as link:
                            span(cls="glyphicon glyphicon-eye-close")
                            span(cls="glyphicon glyphicon-eye-open")
                            link += "Hide Completed"
            for page in pages:
                with div(cls="tab-pane", id="tab" + page['id']):
                    # Filter buttons
                    h = h2()
                    h += page['title']
                    h += span(id=page['id'] + "_overall_total")
                    with ul(cls="table_of_contents"):
                        for section in page['sections']:
                            with li():
                                a(section['title'], href="#" + section['id'])
                                span(id=page['id']  + "_nav_totals_" + str(section['num']))
                    with div(cls="form-group"):
                        input_(type="search", id=page['id'] + "_search", cls="form-control", placeholder="Start typing to filter results...")
                    
                    with div(id=page['id']+"_list"):
                        for section in page['sections']:
                            section_title = h3(id=section['id'])
                            section_title += a(href="#" + section['id'] + "_col", data_toggle="collapse", cls="btn btn-primary btn-collapse btn-sm")
                            if 'link' in section:
                                section_title += a(section['title'], href=section['link'])
                            else:
                                section_title += section['title']
                            section_title += span(id=page['id'] + "_totals_" + str(section['num']))
                            if 'table' in section:
                                br()
                                with div(id=section['id'] + "_col", cls="collapse in", aria_expanded="true"):
                                    with table(cls="table table-striped table-sm").add(tbody()):
                                        size = 12 // section['table']
                                        items = peekable(section['items'])
                                        for item in items:
                                            id = str(item[0])
                                            with tr(cls="item_content form-check-label " + item[1], data_id=page['id'] + "_" + str(section['num']) + "_" + id):
                                                th(cls="row table-checkbox").add(input_(id=page['id'] + "_" + str(section['num']) + "_" + id, type="checkbox"))
                                                for pos in range(2, 2+section['table']):
                                                    td(cls="col-xs-" + str(size)).add(label(raw(item[pos]), _for=page['id'] + "_" + str(section['num']) + "_" + id, cls="table-label"))
                            else:
                                with div(id=section['id'] + "_col", cls="collapse in", aria_expanded="true"):
                                    items = peekable(section['items'])
                                    if not isinstance(items.peek(), list):
                                        item = next(items)
                                        h4(item)
                                    u = ul(id=section['id'] + "_col", cls="collapse in")
                                    for item in items:
                                        if not isinstance(item, list):
                                            h4(item)
                                            u = ul(id=section['id'] + "_col", cls="collapse in")
                                            continue
                                        id = str(item[0])
                                        with u.add(li(data_id=page['id'] + "_" + str(section['num']) + "_" + id, cls=item[1])):
                                            raw(item[2])
                                        if isinstance(items.peek([0])[0], list):
                                            item = next(items)
                                            with u.add(ul()):
                                                for subitem in item:
                                                    with li(data_id=page['id'] + "_" + str(section['num']) + "_" + id + "_" + str(subitem[0])):
                                                        raw(subitem[2])
            with div(cls="tab-pane active", id="tabMain"):
                raw(
"""
<h3>Welcome</h3>
<p>This is intended to be the most comprehensive progress tracker for Elden Ring. Keep track of your progress including Quests, Bosses, Items, etc.
<p>This site is still a work in-progress. We are working on it every day.</p>

<h3>I have feedback, how can I contribute?</h3>
<p>You can visit the <a href="https://github.com/Roundtable-Hold/tracker">GitHub repository</a> and <a href="https://github.com/Roundtable-Hold/tracker/issues">report Issues</a> or create a fork and submit a Pull Request.</p>
<p>You can also reach out to Azy on reddit <a href="https://www.reddit.com/user/azy2/">/u/azy2</a> or Discord Azy#9592 or reach out to Quivorian on reddit <a href="https://www.reddit.com/user/quivorian">/u/quivorian</a> or Discord: Quivorian#6564)</p>

<h3>Can I use this for multiple characters?</h3>
<p>Yup, use the profile selector and buttons in the options tab at the top of the page to setup multiple profiles.</p>

<h3>How does the checklist status get saved?</h3>
<p>The checklist is saved to your browser's local storage. Be careful when clearing your browser's cache as it will also destroy your saved progress.</p>

<h3>Thanks</h3>
<p>This sheet would not be possible without the incredible work already done by the team at Fextralife, the team behind MapGenie, fellow redditors /u/Athrek and /u/AcceptablePackMule, and the rest of the community.</p>
<p>The foundation of this website was based on <a href="https://github.com/ZKjellberg">ZKjellberg</a>'s <a href="https://github.com/ZKjellberg/dark-souls-3-cheat-sheet">Dark Soul's 3 Cheat Sheet</a> source code.</p>

<h3>DISCLAIMER</h3>
<p>This tracker is still a work in progress, and as such, we apologize for any issues that might come about as we update the checklist and iron out bugs.</p>
<p>We will do our best to ensure that such issues remain few and far between.</p>
""")
            with div(cls="tab-pane", id="tabOptions"):
                h2("Options")
                with div(cls="row"):
                    div(cls="col col-xs-12 col-sm-4 col-md-6").add(h4("Theme selection:"))
                    div(cls="col col-xs-12 col-sm-4 col-md-6").add(select(cls="form-control", id="themes"))
                with div(cls="row"):
                    div(cls="col col-xs-12 col-sm-4 col-md-6").add(h4("Profile management:"))
                    with div(cls="col col-xs-12 col-sm-4 col-md-6"):
                        with form(cls="form-inline input-group pull-right"):
                            select(cls="form-control", id="profiles")
                            with span(cls="input-group-btn"):
                                button("Add", cls="btn btn-default", type="button", id="profileAdd")
                                button("Edit", cls="btn btn-default", type="button", id="profileEdit")
                                button("NG+", cls="btn btn-default", type="button", id="profileNG+")
                with div(cls="row"):
                    div(cls="col col-xs-12 col-sm-4 col-md-6").add(h4("Data import/export:"))
                    with div(cls="col col-xs-12 col-sm-4 col-md-6"):
                        with form(cls="form-inline"):
                            with span(cls="btn-group pull-left"):
                                button("Import file", cls="btn btn-default", type="button", id="profileImport")
                                button("Export file", cls="btn btn-default", type="button", id="profileExport")
                            with span(cls="btn-group pull-right"):
                                button("Import textbox", cls="btn btn-default", type="button", id="profileImportText")
                                button("Export clipboard", cls="btn btn-default", type="button", id="profileExportText")
                    with div(cls="col col-xs-12"):
                        textarea(id="profileText", cls="form-control")
            with div(id="profileModal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            button(type="button", cls="close", data_dismiss="modal", aria_label="Close").add(span("×", aria_hidden="true"))
                            h3("Profile", id="profileModalTitle", cls="modal-title")
                        with div(cls="modal-body"):
                            with form(cls="form-horizontal"):
                                with div(cls="control-group"):
                                    label("Name", cls="control-label", for_="profileModalName")
                                    div(cls="controls").add(input_(type="text", cls="form-control", id="profileModalName", placeholder="Enter Profile name"))
                        with div(cls="modal-footer"):
                            a("Close", href="#", id="profileModalClose", cls="btn btn-default", data_dismiss="modal")
                            a("Add", href="#", id="profileModalAdd", cls="btn btn-default", data_dismiss="modal")
                            a("Update", href="#", id="profileModalUpdate", cls="btn btn-default")
                            a("Delete", href="#", id="profileModalDelete", cls="btn btn-default")
            with div(id="NG+Modal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-conttent"):
                        with div(cls="modal-header"):
                            button(type="button", cls="close", data_dismiss="modal", aria_label="Close").add(span("×", aria_hidden="true"))
                            h3("Begin next journey?", id="profileModalTitle", cls="modal-title")
                        div('If you begin the next journey, all progress on the "Playthrough" and "Misc" tabs of this profile will be reset, while achievement and collection checklists will be kept.', cls="modal-body")
                        with div(cls="modal-footer"):
                            a("No", href="#", cls="btn btn-default", data_dismiss="modal")
                            a("Yes", href="#", cls="btn btn-danger", id="NG+ModalYes")
                        
    div(cls="hiddenfile").add(input_(name="upload", type="file", id="fileInput"))

    a(cls="btn btn-default btn-sm fadingbutton back-to-top").add(raw("Back to Top&thinsp;"), span(cls="glyphicon glyphicon-arrow-up"))
            
    script(src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js")
    script(src="https://cdn.rawgit.com/andris9/jStorage/v0.4.12/jstorage.min.js")
    script(src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js", integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS", crossorigin="anonymous")
    script(src="https://cdnjs.cloudflare.com/ajax/libs/jets/0.8.0/jets.min.js")
    script(src="js/jquery.highlight.js")
    script(src="js/main.js")
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



with open('index.html', 'w') as index:
    index.write(doc.render())
