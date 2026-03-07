import json
import os
import re
from math import floor

from PIL import Image
import dominate
import yaml
from dominate.tags import *
from dominate.util import raw
from more_itertools import peekable

# Supported display languages. Add new entries here to support more languages.
# The key is the 2-3 letter code used in YAML fields (title_it, data_it, etc.)
UK_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3CclipPath id='t'%3E%3Cpath d='M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z'/%3E%3C/clipPath%3E%3Cpath d='M0,0 v30 h60 v-30 z' fill='%23012169'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' clip-path='url(%23t)' stroke='%23C8102E' stroke-width='4'/%3E%3Cpath d='M30,0 v30 M0,15 h60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30,0 v30 M0,15 h60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"
IT_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='1' height='2' fill='%23009246'/%3E%3Crect width='1' height='2' x='1' fill='%23fff'/%3E%3Crect width='1' height='2' x='2' fill='%23ce2b37'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"
ES_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23c60b1e'/%3E%3Crect width='3' height='1' y='0.5' fill='%23ffc400'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"
FR_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='1' height='2' fill='%23002395'/%3E%3Crect width='1' height='2' x='1' fill='%23fff'/%3E%3Crect width='1' height='2' x='2' fill='%23ed2939'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"
DE_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23000'/%3E%3Crect width='3' height='1.333' y='0.666' fill='%23d00'/%3E%3Crect width='3' height='0.666' y='1.333' fill='%23ffce00'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"
PT_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 3'%3E%3Cpath fill='%23060' d='M0 0h2v3H0z'/%3E%3Cpath fill='%23f00' d='M2 0h3v3H2z'/%3E%3Ccircle fill='%23ff0' cx='2' cy='1.5' r='0.6'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"
JA_FLAG = "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%23fff'/%3E%3Ccircle cx='1.5' cy='1' r='0.6' fill='%23bc002d'/%3E%3C/svg%3E\" style=\"height: 1.1em; border-radius: 2px; margin-bottom: 2px; border: 1px solid rgba(128, 128, 128, 0.3);\">"

LANGUAGE_META = {
    'en': {'flag': UK_FLAG, 'name': 'EN'},
    'it': {'flag': IT_FLAG, 'name': 'IT'},
    'es': {'flag': ES_FLAG, 'name': 'ES'},
    'fr': {'flag': FR_FLAG, 'name': 'FR'},
    'de': {'flag': DE_FLAG, 'name': 'DE'},
    'pt': {'flag': PT_FLAG, 'name': 'PT'},
    'ja': {'flag': JA_FLAG, 'name': 'JA'},
}


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
nav_static = {}
with open(os.path.join('data', 'pages.yaml'), 'r', encoding='utf_8') as pages_yaml:
    yml = yaml.safe_load(pages_yaml)
    item_links = yml.get('item_links', [])
    
    # Load static nav translations
    if 'nav_static' in yml:
        # Default English
        for idx, val in enumerate(yml['nav_static']):
            if idx not in nav_static:
                nav_static[idx] = {'en': val}
            else:
                nav_static[idx]['en'] = val
                
        # Load other languages
        for lang_code in LANGUAGE_META.keys():
            if lang_code == 'en': continue
            key = f'nav_static_{lang_code}'
            if key in yml:
                for idx, val in enumerate(yml[key]):
                    if idx in nav_static:
                        nav_static[idx][lang_code] = val

    for dropdown in yml['dropdowns']:
        dropdown_urls = []
        for page in dropdown['pages']:
            with open(os.path.join('data', 'checklists', page), 'r', encoding='utf_8') as data:
                page_yml = yaml.safe_load(data)
                pages.append(page_yml)
                
                # Extract translated titles for the page
                page_titles = {'en': page_yml['title']}
                for lang in LANGUAGE_META.keys():
                    if lang == 'en': continue
                    if f'title_{lang}' in page_yml:
                        page_titles[lang] = page_yml[f'title_{lang}']
                        
                dropdown_urls.append((page_titles, page_yml['id'], page_yml.get('map_icon', page_yml.get('icon', None))))
        
        # Extract translated names for the dropdown
        dropdown_names = {'en': dropdown['name']}
        for lang in LANGUAGE_META.keys():
            if lang == 'en': continue
            if f'name_{lang}' in dropdown:
                dropdown_names[lang] = dropdown[f'name_{lang}']
                
        dropdowns.append((dropdown_names, dropdown_urls))

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
                if 'id' not in item:
                    return
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

def detect_languages():
    """Scan all pages to find non-English language codes present in YAML data."""
    lang_pattern = re.compile(r'^(title|data|name)_([a-z]{2,3})$')
    langs = set()
    for page in pages:
        for key in page:
            if not isinstance(key, str):
                continue
            m = lang_pattern.match(key)
            if m:
                langs.add(m.group(2))
        for section in page.get('sections', []):
            for key in section:
                if not isinstance(key, str):
                    continue
                m = lang_pattern.match(key)
                if m:
                    langs.add(m.group(2))
            for item in section.get('items', []):
                if isinstance(item, str):
                    continue
                for key in item:
                    if not isinstance(key, str):
                        continue
                    m = lang_pattern.match(key)
                    if m:
                        langs.add(m.group(2))
    return langs

available_languages = detect_languages()

def get_theme_colors():
    def extract_colors(filepath):
        with open(filepath, "r") as f:
            content = f.read()
            bg_match = re.search(r'--bs-body-bg:(.*?);', content)
            color_match = re.search(r'--bs-body-color:(.*?);', content)
            if not bg_match:
                bg_match = re.search(r'body\{[^\}]*background-color:(.*?)[;\}]', content)
            if not color_match:
                color_match = re.search(r'body\{[^\}]*color:(.*?)[;\}]', content)
            bg = bg_match.group(1).split('}')[0] if bg_match else "#ffffff"
            color = color_match.group(1).split('}')[0] if color_match else "#212529"
            return bg, color

    theme_dir = "docs/css/themes"
    themes = {}
    for root, _, files in os.walk(theme_dir):
        for file in files:
            if file == "bootstrap.min.css":
                theme_name = os.path.basename(root)
                filepath = os.path.join(root, file)
                bg, color = extract_colors(filepath)
                
                key = theme_name.capitalize()
                if key == "Lightmode": key = "LightMode"
                themes[key] = {"bg": bg, "color": color}
                
    standard_path = "docs/css/bootstrap.min.css"
    if os.path.exists(standard_path):
        bg, color = extract_colors(standard_path)
        themes["Standard"] = {"bg": bg, "color": color}
    else:
        themes["Standard"] = {"bg": "#ffffff", "color": "#212529"}
        
    return themes

theme_colors_map = get_theme_colors()

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
        script(raw("""
(function() {
    var style = "Standard";
    try {
        var jStorageStr = localStorage.getItem('jStorage');
        if (jStorageStr) {
            var jStorage = JSON.parse(jStorageStr);
            var profiles = jStorage['darksouls3_profiles'];
            if (typeof profiles === 'string') {
                profiles = JSON.parse(profiles);
            }
            if (profiles) {
                var current = profiles['current'] || 'Default Profile';
                if (profiles['darksouls3_profiles'] && profiles['darksouls3_profiles'][current] && profiles['darksouls3_profiles'][current]['style']) {
                    style = profiles['darksouls3_profiles'][current]['style'];
                }
            }
        }
    } catch (e) {}
    
    var themes = {
        "Standard": "/css/bootstrap.min.css",
        "LightMode": "/css/themes/lightmode/bootstrap.min.css",
        "Ceruleon": "/css/themes/cerulean/bootstrap.min.css",
        "Cosmo": "/css/themes/cosmo/bootstrap.min.css",
        "Cyborg": "/css/themes/cyborg/bootstrap.min.css",
        "Darkly": "/css/themes/darkly/bootstrap.min.css",
        "Flatly": "/css/themes/flatly/bootstrap.min.css",
        "Journal": "/css/themes/journal/bootstrap.min.css",
        "Litera": "/css/themes/litera/bootstrap.min.css",
        "Lumen": "/css/themes/lumen/bootstrap.min.css",
        "Lux": "/css/themes/lux/bootstrap.min.css",
        "Materia": "/css/themes/materia/bootstrap.min.css",
        "Minty": "/css/themes/minty/bootstrap.min.css",
        "Morph": "/css/themes/Morph/bootstrap.min.css",
        "Pulse": "/css/themes/pulse/bootstrap.min.css",
        "Quartz": "/css/themes/quartz/bootstrap.min.css",
        "Regent": "/css/themes/regent/bootstrap.min.css",
        "Sandstone": "/css/themes/sandstone/bootstrap.min.css",
        "Simplex": "/css/themes/simplex/bootstrap.min.css",
        "Sketchy": "/css/themes/sketchy/bootstrap.min.css",
        "Slate": "/css/themes/slate/bootstrap.min.css",
        "Solar": "/css/themes/solar/bootstrap.min.css",
        "Spacelab": "/css/themes/spacelab/bootstrap.min.css",
        "Superhero": "/css/themes/superhero/bootstrap.min.css",
        "United": "/css/themes/united/bootstrap.min.css",
        "Vapor": "/css/themes/vapor/bootstrap.min.css",
        "Yeti": "/css/themes/yeti/bootstrap.min.css",
        "Zephyr": "/css/themes/zephyr/bootstrap.min.css"
    };

    var themeUrl = themes[style] ? themes[style] : "/css/bootstrap.min.css";
    document.write('<link href="' + themeUrl + '" rel="stylesheet" id="bootstrap">');

    var lang = localStorage.getItem('selectedLanguage') || 'en';
    document.write('<style id="language-fouc-fix">.lang-text { display: none !important; } .lang-text.lang-' + lang + ' { display: inline !important; } .lang-pair:not(:has(.lang-' + lang + ')) .lang-text.lang-en { display: inline !important; } .d-none-regex { display: none !important; }</style>');
    
    // Localize placeholders
    window.addEventListener('DOMContentLoaded', function() {
        var updatePlaceholders = function(l) {
            document.querySelectorAll('input[placeholder]').forEach(function(input) {
                var localized = input.getAttribute('data-placeholder-' + l);
                if (localized) {
                    input.placeholder = localized;
                } else if (l === 'en') {
                    // Restore original if available? For now just handle it or it stays as is
                }
            });
        };
        updatePlaceholders(lang);
        
        window.addEventListener('languageChanged', function(e) {
            updatePlaceholders(e.detail.lang);
        });
    });
})();
"""))
        link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css")
        link(href="/css/main.css", rel="stylesheet")
    return doc

def title_row():
    with div(cls="row"):
        with div(cls="col-md-12 text-center"):
            h1(localized_span({'en': 'Roundtable Hold', 'it': 'Tavola Rotonda'}), cls="mt-3")
            text = p(cls="lead d-print-none")
            text += localized_span({'en': 'Contribute at the ', 'it': 'Contribuisci alla '})
            text += a(localized_span({'en': 'Github Page', 'it': 'Pagina GitHub'}),
                      href="https://github.com/RoundtableHold/roundtablehold.github.io")

def hide_completed_button():
    with div(id="btnHideCompleted", cls="mb-3 d-print-none"):
        with div(cls="form-check form-switch"):
            input_(cls="form-check-input", type="checkbox",
                   id='toggleHideCompleted')
            with label(cls="form-check-label", _for='toggleHideCompleted'):
                t = nav_static.get(5, {'en': 'Hide Completed'})
                localized_span(t)

def localized_span(translations_dict):
    """Returns a span with lang-pair and lang-text spans for each language in the dict."""
    with span(cls="lang-pair") as s:
        for lang, text in translations_dict.items():
            span(text, cls=f"lang-text lang-{lang}")
    return s

def make_nav(page, is_map = False):
    with nav(cls="navbar navbar-expand-xl bg-dark navbar-dark d-print-none" + (' sticky-top' if not is_map else ''), id="top_nav"):
        with div(cls="container-fluid"):
            # with div(cls='order-sm-last d-none d-sm-block ms-auto'):
            with button(type="button", cls="navbar-toggler", data_bs_toggle="collapse", data_bs_target="#nav-collapse", aria_expanded="false", aria_controls="nav-collapse", aria_label="Toggle navigation"):
                span(cls="navbar-toggler-icon")
            
            rt_guides_text = nav_static.get(0, {'en': 'Roundtable Guides'})
            a(localized_span(rt_guides_text), cls="navbar-brand me-auto ms-2" + (' active' if page == 'index' else ''), href="/index.html")
            
            if available_languages:
                all_lang_codes = ['en'] + sorted(available_languages)
                with ul(cls="navbar-nav flex-row order-2 order-xl-3 align-items-center me-2"):
                    with li(cls="nav-item dropdown"):
                        with a(href="#", cls="nav-link dropdown-toggle", id="langDropdown",
                               data_bs_toggle="dropdown", aria_haspopup="true", aria_expanded="false"):
                            span(id="lang-display")
                        with ul(cls="dropdown-menu dropdown-menu-end position-absolute", id="lang-menu"):
                            for lang_code in all_lang_codes:
                                meta = LANGUAGE_META.get(lang_code, {'flag': '🌐', 'name': lang_code.upper()})
                                with li():
                                    a(raw(meta['flag']), ' ', meta['name'], href="#", cls="dropdown-item lang-option", data_lang=lang_code)

            with form(cls="d-none d-sm-flex order-2 order-xl-3", action="/search.html", method="get"):
                search_text_dict = nav_static.get(12, {'en': 'Search'})
                search_text_en = search_text_dict.get('en', 'Search')
                search_text_it = search_text_dict.get('it', 'Cerca')
                input_(cls='form-control me-2', type='search', placeholder=search_text_en, aria_label='search', name='search', data_placeholder_it=search_text_it)
                with button(type='submit', cls='btn', formaction='/search.html', formmethod='get', formnovalidate='true'):
                    i(cls='bi bi-search')
            with div(cls='d-sm-none order-2'):
                with a(href='/search.html', cls='nav-link me-0'):
                    i(cls='bi bi-search sb-icon-search')
            with div(cls="collapse navbar-collapse order-3 order-xl-2 ms-xl-2", id="nav-collapse"):
                with ul(cls="nav navbar-nav navbar-nav-scroll mr-auto"):
                    # with li(cls="nav-item"):
                    #     a(href="/index.html", cls="nav-link hide-buttons" + (' active' if page == 'index' else '')).add(i(cls="bi bi-house-fill"))
                    for names_dict, l in dropdowns:
                        page_in_dropdown = page in [to_snake_case(guide[0]['en']) for guide in l]
                        with li(cls="dropdown nav-item"):
                            with a(cls="nav-link dropdown-toggle" + (' active' if page_in_dropdown else ''), href="#", data_bs_toggle="dropdown", aria_haspopup="true", aria_expanded="false"):
                                localized_span(names_dict)
                                span(cls="caret")
                            with ul(cls="dropdown-menu"):
                                for guide in l:
                                    li(cls='tab-li').add(a(localized_span(guide[0]), cls="dropdown-item show-buttons"  + (' active' if page == to_snake_case(guide[0]['en']) else ''), href='/checklists/' + to_snake_case(guide[0]['en']) + '.html'))
                    
                    map_text = nav_static.get(1, {'en': 'Map'})
                    with li(cls='nav-item tab-li'):
                        with a(href="/map.html", cls="nav-link hide-buttons" + (' active' if page == 'map' else '')):
                            i(cls="bi bi-map")
                            span(" ")
                            localized_span(map_text)
                            
                    options_text = nav_static.get(2, {'en': 'Options'})
                    with li(cls="nav-item tab-li"):
                        with a(href="/options.html", cls="nav-link hide-buttons" + (' active' if page == 'options' else '')):
                            i(cls="bi bi-gear-fill")
                            span(" ")
                            localized_span(options_text)

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
    script(src='/js/progress.js')
    script(src='/js/item_links.js')
    script(src='/js/common.js?v=1.1')
    script(src='/js/sync.js')
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
                        searchSelector: '*and',
                        manualContentHandling: function(node) {{
                            if ($('#{page_id}_name_only').is(':checked')) {{
                                return node.getAttribute('data-name-jets') || '';
                            }}
                            var $clone = $(node).clone();
                            $clone.find('.no-highlight').remove();
                            return $clone.text();
                        }},
                        didSearch: function(search_phrase) {{
                            // Only handled by Jets if Regex off.
                            if ($('#{page_id}_regex').is(':checked')) return;
                            
                            // Un-hide all sections to accurately measure visibility
                            $(".card").removeClass('d-none');
                            $("#{page_id}_list h5").removeClass('d-none');
                            $("#{page_id}_list h5").nextUntil('h5').removeClass('d-none');
                            $(".toc_link").closest('li').removeClass('d-none');
                            
                            if (!search_phrase) {{
                                var dlcFilter = $('#dlc_filter');
                                if (dlcFilter.length) {{ dlcFilter.trigger('change'); }}
                                return;
                            }}
                            
                            var clean_phrase = search_phrase.trim().toLowerCase().replace(/\\s\\s+/g, ' ').replace(/\\\\/g, '\\\\\\\\');
                            var words = clean_phrase.split(' ');
                            var searchAtt = $('#{page_id}_name_only').is(':checked') ? 'data-name-jets' : 'data-jets';
                            
                            var filterFunc = function() {{
                                var text = ($(this).attr(searchAtt) || '').toLowerCase();
                                for (var i = 0; i < words.length; i++) {{
                                    if (text.indexOf(words[i]) === -1) return false;
                                }}
                                return true;
                            }};
                            
                            $(".card").each(function(index, el) {{
                                var sectionId = $(el).attr('id');
                                var $tocLi = null;
                                if (sectionId) {{
                                    $tocLi = $('a.toc_link[href="#' + sectionId + '"]').closest('li');
                                }}

                                var hasResults = $(el).find('.searchable:not(.d-none)').filter(filterFunc).length;
                                if (!hasResults) {{
                                    $(el).addClass('d-none');
                                    if ($tocLi) $tocLi.addClass('d-none');
                                }}
                            }});
                            
                            $("#{page_id}_list h5").each(function() {{
                                var $h5 = $(this);
                                var $subsection = $h5.nextUntil('h5');
                                var hasResults = $subsection.find('.searchable:not(.d-none)').filter(filterFunc).length;
                                if (!hasResults) {{
                                    $h5.addClass('d-none');
                                    $subsection.addClass('d-none');
                                }}
                            }});
                        }},
                    }});
                    function updateSearch() {{
                        var search_phrase = $("#{page_id}_search").val().trim();
                        var isRegex = $('#{page_id}_regex').is(':checked');

                        if (isRegex) {{
                            var regex = null;
                            if (search_phrase.length > 0) {{
                                try {{
                                    regex = new RegExp(search_phrase, 'i');
                                }} catch (e) {{
                                    return; // Invalid regex, ignore
                                }}
                            }}
                            
                            // Disable jets css injection manually
                            if (jet.styleTag) {{
                                jet.styleTag.innerHTML = '';
                            }}
                            
                            $(".searchable").each(function() {{
                                var text = '';
                                if ($('#{page_id}_name_only').is(':checked')) {{
                                    text = $(this).attr('data-name-jets') || '';
                                }} else {{
                                    var $clone = $(this).clone();
                                    $clone.find('.no-highlight').remove();
                                    text = $clone.attr('data-jets') || $clone.text() || '';
                                }}
                                
                                if (!search_phrase || search_phrase.length === 0) {{
                                    $(this).removeClass('d-none-regex');
                                }} else if (regex && text.match(regex)) {{
                                    $(this).removeClass('d-none-regex');
                                }} else {{
                                    $(this).addClass('d-none-regex');
                                }}
                            }});
                            
                            // Manage empty cards/sections like Jets did
                            $(".card").each(function(index, el) {{
                                var sectionId = $(el).attr('id');
                                var $tocLi = null;
                                if (sectionId) {{
                                    $tocLi = $('a.toc_link[href="#' + sectionId + '"]').closest('li');
                                }}

                                if (!search_phrase) {{
                                    $(el).removeClass('d-none');
                                    if ($tocLi) $tocLi.removeClass('d-none');
                                    return;
                                }}
                                var hasResults = $(el).find('.searchable:not(.d-none):not(.d-none-regex)').length;
                                if (!hasResults) {{
                                    $(el).addClass('d-none');
                                    if ($tocLi) $tocLi.addClass('d-none');
                                }} else {{
                                    $(el).removeClass('d-none');
                                    if ($tocLi) $tocLi.removeClass('d-none');
                                }}
                            }});
                            $("#{page_id}_list h5").each(function() {{
                                var $h5 = $(this);
                                var $subsection = $h5.nextUntil('h5');
                                if (!search_phrase) {{
                                    $h5.removeClass('d-none');
                                    $subsection.removeClass('d-none');
                                    return;
                                }}
                                var hasResults = $subsection.find('.searchable:not(.d-none):not(.d-none-regex)').length;
                                $h5.toggleClass('d-none', !hasResults);
                                $subsection.toggleClass('d-none', !hasResults);
                            }});
                            
                            if (!search_phrase) {{
                                var dlcFilter = $('#dlc_filter');
                                if (dlcFilter.length) {{ dlcFilter.trigger('change'); }}
                            }}
                            
                            // Highlighting for regex
                            $("#{page_id}_list").unhighlight();
                            if (search_phrase.length > 0 && regex) {{
                                try {{
                                    if ($('#{page_id}_name_only').is(':checked')) {{
                                        $("#{page_id}_list .item-name").highlight(regex);
                                    }} else {{
                                        $("#{page_id}_list").highlight(regex);
                                    }}
                                }} catch(e) {{}}
                            }}
                            
                        }} else {{
                            // Non-regex mode: Let Jets handle normal search filtering
                            $(".searchable").removeClass('d-none-regex');
                            if (jet._applyCSS) {{
                                jet._applyCSS();
                            }}
                            jet.options.didSearch(search_phrase);
                            
                            // Highlighting for normal text
                            $("#{page_id}_list").unhighlight();
                            if (search_phrase && search_phrase.length > 0) {{
                                if ($('#{page_id}_name_only').is(':checked')) {{
                                    $("#{page_id}_list .item-name").highlight(search_phrase);
                                }} else {{
                                    $("#{page_id}_list").highlight(search_phrase);
                                }}
                            }}
                        }}
                    }}

                    $("#{page_id}_search").keyup(function(e) {{
                        updateSearch();
                    }});
                    
                    $('#{page_id}_regex').on('change', function() {{
                        updateSearch();
                    }});
                    
                    $('#{page_id}_name_only').on('change', function() {{
                        if (jet.options) {{
                            jet.options.manualContentHandling = function(node) {{
                                if ($('#{page_id}_name_only').is(':checked')) {{
                                    return node.getAttribute('data-name-jets') || '';
                                }}
                                var $clone = $(node).clone();
                                $clone.find('.no-highlight').remove();
                                return $clone.text();
                            }};
                        }}
                        if (jet._setJets) {{
                            jet._setJets('', true);
                        }}
                        
                        if ($('#{page_id}_regex').is(':checked')) {{
                            updateSearch();
                        }} else {{
                            // Trigger Jets' internal search and our didSearch callback
                            $('#{page_id}_search').trigger('input');
                        }}
                    }});
                    updateSearch();
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
                    h1(localized_span(nav_static.get(0, {'en': 'Roundtable Guides'})), cls="mt-4")
                with div(cls="row gy-3"):
                    with div(cls='col-md-8 col-12'):
                        with div(cls='row row-cols-1 row-cols-md-2 gy-3'):
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5(localized_span({'en': 'Welcome to Roundtable Guides', 'it': 'Benvenuti nelle Guide della Tavola Rotonda'}), cls='card-title text-center')
                                        p(localized_span({'en': 'Guides, Walkthroughs, and Progress Tracking for Elden Ring. Written and maintained by the players. This site is still a work in-progress. We are working on it every day.', 'it': 'Guide, Soluzioni e monitoraggio dei progressi per Elden Ring. Scritto e mantenuto dai giocatori. Questo sito è ancora in fase di sviluppo. Ci lavoriamo ogni giorno.'}), cls='card-text')
                            with div(cls='col'):
                                with div(cls='card shadow h-100'):
                                    with div(cls='card-body'):
                                        h5(localized_span({'en': 'Get the Apps!', 'it': 'Scarica le App!'}), cls='card-title text-center')
                                        with div(style='width: 180px;', cls='badge'):
                                            with a(href='https://apps.apple.com/us/app/elden-ring-guides/id1620436088?itsct=apps_box_badge&amp;itscg=30200'):
                                                img(src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1650585600&h=3eb10370b9c49cf5b5dde5ca0352f23a", alt="Download on the App Store", style='margin: 6%; width: 88%;')
                                        with div(style='width: 180px;', cls='badge'):
                                            with a(href='https://play.google.com/store/apps/details?id=com.roundtablehold.eldenringguides&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1', style='width: 100%;'):
                                                img(src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png', style='width: 100%;')
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5(localized_span({'en': 'Our other resources', 'it': 'Altre risorse'}), cls='card-title text-center')
                                        p(cls='card-text').add(localized_span({'en': 'Join the Roundtable Hold ', 'it': 'Unisciti alla comunità della '})).add(a(localized_span({'en': 'Discord community', 'it': 'Tavola Rotonda su Discord'}), href='https://discord.gg/BzJzFeBjHr'))
                                        p(cls='card-text').add(localized_span({'en': 'More guides are over on ', 'it': 'Altre guide sono disponibili su '})).add(a('/r/Roundtable_Guides', href='https://www.reddit.com/r/Roundtable_Guides/'))
                                        p(cls='card-text').add(localized_span({'en': 'Video guides on the ', 'it': 'Video guide sul '})).add(a(localized_span({'en': 'YouTube channel', 'it': 'canale YouTube'}), href='https://www.youtube.com/channel/UCE-I15Z8HQBNCFHq2V0bbsA'))
                            with div(cls="col"):
                                with div(cls='card shadow h-100'):
                                    with div(cls="card-body"):
                                        h5(localized_span({'en': 'I have feedback, how can I contribute?', 'it': 'Ho un feedback, come posso contribuire?'}), cls='card-title text-center')
                                        text = p(cls='card-text')
                                        text += localized_span({'en': 'Contributing is easy! And does not require you to know how to code. You can find instructions on the', 'it': 'Contribuire è facile! E non richiede di saper programmare. Puoi trovare istruzioni sulla'})
                                        text += a(localized_span({'en': 'Github repository', 'it': 'repository GitHub'}), href='https://github.com/RoundtableHold/roundtablehold.github.io')
                                        text += localized_span({'en': ' You can also simply ', 'it': ' Puoi anche semplicemente '})
                                        text += a(localized_span({'en': 'report issues', 'it': 'segnalare problemi'}), href='https://github.com/RoundtableHold/roundtablehold.github.io/issues')
                                        text += localized_span({'en': " and we'll fix them.", 'it': ' e noi li risolveremo.'})
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5(localized_span({'en': 'Can I use this for multiple characters?', 'it': 'Posso usarlo per più personaggi?'}), cls='card-title text-center')
                                        p(localized_span({'en': 'Yes! Use the profile selector and buttons in the options tab at the top of the page to setup multiple profiles.', 'it': 'Sì! Usa il selettore di profili e i pulsanti nella scheda delle opzioni nella parte superiore della pagina per impostare più profili.'}), cls='card-text')
                            with div(cls="col"):
                                with div(cls="card shadow h-100"):
                                    with div(cls="card-body"):
                                        h5(localized_span({'en': 'How does the checklist status get saved?', 'it': 'Come viene salvato lo stato della checklist?'}), cls='card-title text-center')
                                        p(localized_span({'en': "The checklists are saved to your browser's local storage. Be careful when clearing your browser's cache as it will also destroy your saved progress.", 'it': 'Le checklist vengono salvate nella memoria locale del browser. Fai attenzione quando svuoti la cache del browser poiché distruggerà anche i tuoi progressi salvati.'}), cls='card-text')
                    with div(cls="col-md-4 col-12"):
                        with div(cls='card shadow'):
                            with div(cls="card-body uncolor-links"):
                                h5(localized_span({'en': 'Progress', 'it': 'Progressi'}), cls='card-title text-center')
                                with ul(id='progress_list', cls='nav flex-column'):
                                    hr()
                                    for name, l in dropdowns:
                                        for guide in l:
                                            li(cls='tab-li').add(a(localized_span(guide[0]), href="/checklists/" + to_snake_case(guide[0]['en']) + '.html')).add(span(id=guide[1] + "_progress_total", cls='d-print-none'))
                                        hr()
            make_footer()
            script(src="/js/index.js?v=1.1")
    with open(os.path.join('docs', 'index.html'), 'w', encoding='utf_8') as index:
        index.write(doc.render())

def make_options():
    doc = make_doc('Options | Roundtable Guides', 'Elden Ring Guides and Progress Tracker')
    with doc:
        make_nav('options')
        with div(cls="container"):
            with div(cls="row"):
                with div(cls="col-md-12 text-center"):
                    h1(localized_span(nav_static.get(0, {'en': 'Roundtable Guides'})), cls="mt-4")
            with div(cls="row"):
                h2(localized_span(nav_static.get(2, {'en': 'Options'})))
                with div(cls="row"):
                    div(cls="col col-12 col-md-6").add(h4(localized_span({'en': 'Theme selection:', 'it': 'Selezione del tema:'})))
                    div(cls="col col-12 col-md-6").add(select(cls="form-select", id="themes"))
                with div(cls="row"):
                    div(cls="col col-12 col-md-4").add(h4(localized_span({'en': 'Profile management:', 'it': 'Gestione dei profili:'})))
                    with form(cls="form-inline input-group pull-right gap-1"):
                        with div(cls="col col-12 col-md-4"):
                            select(cls="form-select", id="profiles")
                        with div(cls="col col-12 col-md-4"):
                            with div(cls="btn-group"):
                                button(localized_span({'en': 'Add', 'it': 'Aggiungi'}), cls="btn btn-primary", type="button", id="profileAdd")
                            with div(cls="btn-group"):
                                button(localized_span({'en': 'Edit', 'it': 'Modifica'}), cls="btn btn-primary", type="button", id="profileEdit")
                            with div(cls="btn-group"):
                                button("NG+", cls="btn btn-primary", type="button", id="profileNG+")
                with div(cls="row"):
                    div(cls="col col-12 col-md-4").add(h4(localized_span({'en': 'Data import/export:', 'it': 'Importazione/esportazione dati:'})))
                    with div(cls="col col-12 col-md-8"):
                        with form(cls="form-inline gap-1 m-1"):
                            with div(cls="btn-group pull-left"):
                                button(localized_span({'en': 'Import file', 'it': 'Importa file'}), cls="btn btn-primary", type="button", id="profileImport")
                            with div(cls="btn-group pull-left"):
                                button(localized_span({'en': 'Export file', 'it': 'Esporta file'}), cls="btn btn-primary", type="button", id="profileExport")
                            with div(cls="btn-group pull-right"):
                                button(localized_span({'en': 'Import textbox', 'it': 'Importa casella di testo'}), cls="btn btn-primary", type="button", id="profileImportText")
                            with div(cls="btn-group pull-right mt-1 mt-md-0"):
                                button(localized_span({'en': 'Export clipboard', 'it': 'Esporta negli appunti'}), cls="btn btn-primary", type="button", id="profileExportText")
                    with div(cls='row'):
                        div(id='alert-div')
                    with div(cls='row'):
                        with div(cls="col col-12"):
                            with a(href="#detailedConfig", data_bs_toggle="collapse",
                                   cls="text-muted small d-inline-flex align-items-center gap-1 mb-1",
                                   aria_expanded="false"):
                                i(cls="bi bi-chevron-down")
                                span(localized_span({'en': 'Detailed configuration', 'it': 'Configurazione dettagliata'}))
                            with div(id="detailedConfig", cls="collapse"):
                                textarea(id="profileText", cls="form-control")
            with div(cls="row mt-4", id="cloudSync"):
                h2(localized_span({'en': 'Cloud Sync & Backup', 'it': 'Sincronizzazione Cloud e Backup'}))
                div(id="syncAlertDiv")
                with div(id="syncInactive"):
                    p(localized_span({'en': 'Back up and sync your progress across browsers and devices. Your data is stored in your own cloud account.', 'it': 'Esegui il backup e sincronizza i tuoi progressi su browser e dispositivi diversi. I tuoi dati sono archiviati nel tuo account cloud.'}), cls="text-muted mb-3")
                    button(cls="btn btn-primary", id="btnActivateSync").add(
                        i(cls="bi bi-cloud-upload"), localized_span({'en': ' Activate Cloud Sync', 'it': ' Attiva Sincronizzazione Cloud'}))
                with div(id="syncActive", cls="d-none"):
                    with div(cls="d-flex align-items-center gap-2 mb-2"):
                        span(id="syncStatusBadge", cls="badge bg-success").add(
                            i(cls="bi bi-check-circle-fill"), localized_span({'en': ' Synced', 'it': ' Sincronizzato'}))
                    p(id="syncProviderInfo", cls="mb-1")
                    p(id="syncLastSyncTime", cls="text-muted small mb-3")
                    with div(cls="d-flex gap-2 flex-wrap"):
                        button(cls="btn btn-sm btn-primary", id="btnSyncNow").add(
                            i(cls="bi bi-arrow-repeat"), localized_span({'en': ' Sync Now', 'it': ' Sincronizza Ora'}))
                        button(cls="btn btn-sm btn-outline-secondary", id="btnViewHistory").add(
                            i(cls="bi bi-clock-history"), localized_span({'en': ' View History', 'it': ' Visualizza Cronologia'}))
                        button(cls="btn btn-sm btn-outline-danger", id="btnDeactivateSync").add(
                            i(cls="bi bi-cloud-slash"), localized_span({'en': ' Deactivate', 'it': ' Disattiva'}))
                    with div(id="syncVersionPanel", cls="mt-3 d-none"):
                        h5(localized_span({'en': 'Version History', 'it': 'Cronologia Versioni'}), cls="mb-2")
                        p(cls="text-muted small mb-2", id="syncVersionDesc")
                        div(cls="list-group", id="syncVersionList")
            with div(id="profileModal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3(localized_span({'en': 'Profile', 'it': 'Profilo'}), id="profileModalTitle", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        with div(cls="modal-body"):
                            with form(cls="form-horizontal"):
                                with div(cls="control-group"):
                                    label(localized_span({'en': 'Name', 'it': 'Nome'}), cls="control-label", _for="profileModalName")
                                    div(cls="controls").add(input_(type="text", cls="form-control", id="profileModalName", placeholder="Enter Profile name"))
                        with div(cls="modal-footer"):
                            button(localized_span({'en': 'Close', 'it': 'Chiudi'}), id="profileModalClose", cls="btn btn-secondary", data_bs_dismiss="modal")
                            a(localized_span({'en': 'Add', 'it': 'Aggiungi'}), href="#", id="profileModalAdd", cls="btn btn-primary", data_bs_dismiss="modal")
                            a(localized_span({'en': 'Update', 'it': 'Aggiorna'}), href="#", id="profileModalUpdate", cls="btn btn-primary")
                            a(localized_span({'en': 'Delete', 'it': 'Elimina'}), href="#", id="profileModalDelete", cls="btn btn-primary")
            with div(id="NG+Modal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3(localized_span({'en': 'Begin next journey?', 'it': 'Iniziare il prossimo viaggio?'}), id="profileModalTitleNG", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        div(localized_span({'en': 'If you begin the next journey, all progress on the "Playthrough" and "Misc" tabs of this profile will be reset, while achievement and collection checklists will be kept.', 'it': 'Se inizi il prossimo viaggio, tutti i progressi nelle schede "Walkthrough" e "Varie" di questo profilo verranno ripristinati, mentre le checklist degli obiettivi e dei collezionabili verranno mantenute.'}), cls="modal-body")
                        with div(cls="modal-footer"):
                            a(localized_span({'en': 'No', 'it': 'No'}), href="#", cls="btn btn-primary", data_bs_dismiss="modal")
                            a(localized_span({'en': 'Yes', 'it': 'Sì'}), href="#", cls="btn btn-danger", id="NG+ModalYes")
            with div(id='importTextModal', cls='modal fade', tabindex='-1', role='dialog'):
                with div(cls='modal-dialog', role='document'):
                    with div(cls='modal-content'):
                        with div(cls='modal-header'):
                            h3(localized_span({'en': 'Import profile?', 'it': 'Importare profilo?'}), cls='modal-title')
                            button(type='button', cls='btn-close', data_bs_dismiss='modal', aria_label='Close')
                        div(localized_span({'en': 'If you import this profile all of your current progress will be lost.', 'it': 'Se importi questo profilo, tutti i tuoi progressi attuali andranno persi.'}), cls='modal-body')
                        with div(cls='modal-footer'):
                            a(localized_span({'en': 'No', 'it': 'No'}), href='#', cls='btn btn-primary', data_bs_dismiss='modal')
                            a(localized_span({'en': 'Yes', 'it': 'Sì'}), href='#', cls='btn btn-danger', id='importTextYes')
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
            with div(id="syncProviderModal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3("Choose a sync provider", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        with div(cls="modal-body"):
                            p("Your data is stored in your own account \u2014 the site never sees your files.",
                              cls="text-muted small mb-3")
                            with div(cls="list-group"):
                                with button(cls="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 d-none",
                                            id="btnConnectGoogle", type="button"):
                                    i(cls="bi bi-google fs-4")
                                    with div(cls="text-start"):
                                        div("Google Drive", cls="fw-semibold")
                                        div("Uses your Google account \u2014 15 GB free", cls="text-muted small")
                                with button(cls="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3",
                                            id="btnConnectGitHub", type="button"):
                                    i(cls="bi bi-github fs-4")
                                    with div(cls="text-start"):
                                        div("GitHub Gist", cls="fw-semibold")
                                        div("Uses a Personal Access Token \u2014 no OAuth required", cls="text-muted small")
                        with div(cls="modal-footer"):
                            button("Cancel", type="button", cls="btn btn-secondary", data_bs_dismiss="modal")
            with div(id="syncGithubPATModal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3(i(cls="bi bi-github"), " Connect GitHub Gist", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        with div(cls="modal-body"):
                            p("A Personal Access Token lets this app read and write a private Gist in your GitHub account. The token is stored only in this browser and never sent to this site.",
                              cls="text-muted small mb-3")
                            with ol(cls="small mb-3"):
                                li(raw('Go to <a href="https://github.com/settings/tokens/new?scopes=gist&description=Elden+Lord+sync" target="_blank" rel="noopener">GitHub \u2192 New Personal Access Token</a>'))
                                li(raw('Confirm the <code>gist</code> scope is checked, then click <strong>Generate token</strong>'))
                                li("Copy the generated token and paste it below")
                            input_(cls="form-control font-monospace", id="githubPATInput", placeholder="ghp_\u2026",
                                   type="text", autocomplete="off", spellcheck="false")
                        with div(cls="modal-footer"):
                            button("Cancel", type="button", cls="btn btn-secondary", data_bs_dismiss="modal")
                            button(i(cls="bi bi-github"), " Connect", type="button", cls="btn btn-dark", id="btnConnectGitHubConfirm")
            with div(id="syncDeactivateModal", cls="modal fade", tabindex="-1", role="dialog"):
                with div(cls="modal-dialog", role="document"):
                    with div(cls="modal-content"):
                        with div(cls="modal-header"):
                            h3("Deactivate cloud sync?", cls="modal-title")
                            button(type="button", cls="btn-close", data_bs_dismiss="modal", aria_label="Close")
                        div("Your local progress will not be affected. The backup file in your cloud "
                            "account will remain there until you delete it manually.", cls="modal-body")
                        with div(cls="modal-footer"):
                            button("Cancel", type="button", cls="btn btn-secondary", data_bs_dismiss="modal")
                            button("Deactivate", type="button", cls="btn btn-danger", id="btnDeactivateConfirm")

        div(cls="hiddenfile").add(input_(name="upload", type="file", id="fileInput"))
        make_footer()
        script(src="/js/options.js")
    with open(os.path.join('docs', 'options.html'), 'w', encoding='utf_8') as index:
        index.write(doc.render())

img_size = '70'

def add_icon(icon, classes):
    p = os.path.join('docs', icon[1:])
    im = Image.open(p)
    width, height = im.size
    if width > height:
        img(data_src=icon, loading='lazy', cls=classes, style="width: 70px; height: {}px".format(int(height * (70 / width))))
    else:
        img(data_src=icon, loading='lazy', cls=classes, style="height: 70px; width: {}px".format(int(width * (70 / height))))

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
                with h1(cls='mt-4'):
                    with span(cls='lang-pair'):
                        span(page['title'], cls='lang-text lang-en')
                        for lang in sorted(available_languages):
                            title_key = 'title_' + lang
                            if title_key in page:
                                span(page[title_key], cls='lang-text lang-' + lang + ' d-none')
                    span(id=page['id'] + "_overall_total", cls='badge rounded-pill bg-success progress-val d-print-none ms-2')
            
            hide_completed_button()

            if 'description' in page:
                with p():
                    with span(cls='lang-pair'):
                        span(raw(page['description']), cls='lang-text lang-en')
                        for lang in sorted(available_languages):
                            desc_key = 'description_' + lang
                            if desc_key in page:
                                span(raw(page[desc_key]), cls='lang-text lang-' + lang + ' d-none')

            with nav(cls="text-muted toc d-print-none"):
                with strong(cls="d-block h5").add(a(data_bs_toggle="collapse", role="button", href="#toc_" + page['id'], cls="toc-button")):
                    i(cls='bi bi-plus-lg')
                    toc_text = nav_static.get(3, {'en': ' Table Of Contents'})
                    if 'en' in toc_text and not toc_text['en'].startswith(' '):
                        # Ensure space before text
                        toc_text_spaced = {k: (' ' + v if not str(v).startswith(' ') else v) for k, v in toc_text.items()}
                        localized_span(toc_text_spaced)
                    else:
                        localized_span(toc_text)
                with ul(id="toc_" + page['id'], cls="toc_page collapse"):
                    for s_idx, section in enumerate(page['sections']):
                        with li():
                            with a(href="#" + page['id'] + '_section_'  + str(s_idx), cls="toc_link"):
                                with span(cls='lang-pair'):
                                    span(section['title'], cls='lang-text lang-en')
                                    for lang in sorted(available_languages):
                                        t_key = 'title_' + lang
                                        if t_key in section:
                                            span(section[t_key], cls='lang-text lang-' + lang + ' d-none')
                            span(id=page['id']  + "_nav_totals_" + str(s_idx))

            with div(cls="input-group my-3 d-print-none"):
                input_(type="search", id=page['id'] + "_search", cls="form-control", placeholder="Start typing to filter results...")
                with div(cls="input-group-text"):
                    input_(cls="form-check-input mt-0 me-2", type="checkbox", id=page['id'] + "_regex", aria_label="Use Regex for Search")
                    label_text = nav_static.get(4, {'en': 'Use Regex'})
                    localized_span(label_text)
                with div(cls="input-group-text"):
                    input_(cls="form-check-input mt-0 me-2", type="checkbox", id=page['id'] + "_name_only", aria_label="Name Only Search")
                    name_only_text = nav_static.get(10, {'en': 'Name Only'})
                    localized_span(name_only_text)

            if page['id'] in {'weapons', 'armor', 'incantations', 'ashesofwar', 'cookbooks', 'talismans', 'sorceries', 'spirit_ashes', 'bosses', 'crystal_tears', 'bell_bearings', 'ancient_dragon_smithing_stones', 'graces', 'caves'}:
                with div(cls='row d-print-none mb-3'):
                    with div(cls='col-auto d-flex align-items-center gap-2'):
                        with label(_for='dlc_filter', cls='mb-0'):
                            localized_span(nav_static.get(6, {'en': 'Show:'}))
                        with select(id='dlc_filter', cls='form-select form-select-sm', style='min-width: 140px;'):
                            both_opts = {'value': 'both', 'selected': 'selected'}
                            for l in available_languages | {'en'}:
                                both_opts[f'data_lang_{l}'] = nav_static.get(7, {'en': 'Both'}).get(l, 'Both')
                            option(nav_static.get(7, {'en': 'Both'})['en'], **both_opts)

                            base_opts = {'value': 'base'}
                            for l in available_languages | {'en'}:
                                base_opts[f'data_lang_{l}'] = nav_static.get(8, {'en': 'Base Game'}).get(l, 'Base Game')
                            option(nav_static.get(8, {'en': 'Base Game'})['en'], **base_opts)

                            dlc_opts = {'value': 'dlc'}
                            for l in available_languages | {'en'}:
                                dlc_opts[f'data_lang_{l}'] = nav_static.get(9, {'en': 'DLC'}).get(l, 'DLC')
                            option(nav_static.get(9, {'en': 'DLC'})['en'], **dlc_opts)

            with div(id=page['id']+"_list"):
                for s_idx, section in enumerate(page['sections']):
                    section['num_ids'] = 0
                    with div(cls='card shadow-sm mb-3', id=page['id'] + '_section_' + str(s_idx)).add(div(cls='card-body')):
                        with h4(cls="mt-1"):
                            with button(href="#" + page['id'] + '_' + str(s_idx) + "Col", data_bs_toggle="collapse", data_bs_target="#" + page['id'] + '_' + str(s_idx) + "Col", cls="btn btn-primary btn-sm me-2 collapse-button d-print-none", role="button"):
                                i(cls='bi bi-chevron-up d-print-none')
                            if 'icon' in section:
                                add_icon(section['icon'], 'me-1')
                            if 'link' in section:
                                with a(href=section['link'], cls='d-print-inline'):
                                    with span(cls='lang-pair'):
                                        span(section['title'], cls='lang-text lang-en')
                                        for lang in sorted(available_languages):
                                            t_key = 'title_' + lang
                                            if t_key in section:
                                                span(section[t_key], cls='lang-text lang-' + lang + ' d-none')
                            else:
                                with span(cls='d-print-inline'):
                                    with span(cls='lang-pair'):
                                        span(section['title'], cls='lang-text lang-en')
                                        for lang in sorted(available_languages):
                                            t_key = 'title_' + lang
                                            if t_key in section:
                                                span(section[t_key], cls='lang-text lang-' + lang + ' d-none')
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
                                                    with div(cls="ms-0 ps-0 d-flex align-items-center col-md-" + col_size):
                                                        with label(cls='ms-0 ps-0'):
                                                            with strong(cls="no-highlight lang-pair"):
                                                                span(header, cls='lang-text lang-en')
                                                                for lang in sorted(available_languages):
                                                                    t_key = 'table_' + lang
                                                                    if t_key in section and len(section[t_key]) > idx:
                                                                        span(section[t_key][idx], cls='lang-text lang-' + lang + ' d-none')
                                    for item in items:
                                        if isinstance(item, str):
                                            with li(cls="list-group-item bg-light"):
                                                h5(item, cls="mb-0")
                                            continue
                                        id = str(item['id'])
                                        
                                        d_name_jets = strip_a_tags(item['data'][0])
                                        for lang in available_languages:
                                            d_key = 'data_' + lang
                                            if d_key in item and item[d_key]:
                                                d_name_jets += ' ' + strip_a_tags(item[d_key][0])
                                                
                                        li_kwargs = {
                                            'cls': "list-group-item searchable",
                                            'data_id': page['id'] + '_' + id,
                                            'id': 'item_' + id,
                                            'data_name_jets': d_name_jets.lower() if hasattr(d_name_jets, 'lower') else str(d_name_jets).lower(),
                                        }
                                        if page['id'] in {'weapons', 'armor', 'incantations', 'ashesofwar', 'cookbooks', 'talismans', 'sorceries', 'spirit_ashes', 'bosses', 'crystal_tears', 'bell_bearings', 'ancient_dragon_smithing_stones'}:
                                            is_dlc = item.get('dlc', section.get('dlc', page.get('dlc', False)))
                                            li_kwargs['data_dlc'] = str(bool(is_dlc)).lower()
                                        with li(**li_kwargs):
                                            if isinstance(item, str):
                                                h5(item)
                                                continue
                                            with div(cls="row form-check checkbox d-flex"):
                                                with div(cls="col-auto d-flex align-items-center"):
                                                    input_(cls="form-check-input pe-0 me-0", type="checkbox", value="",
                                                            id=page['id'] + '_' + id, data_section_idx=str(s_idx))
                                                    page['num_ids'] += 1
                                                    section['num_ids'] += 1
                                                with div(cls='col-auto d-flex align-items-center order-last'):
                                                    href = '/map.html?'
                                                    if 'map_link' in item:
                                                        href += 'x={}&y={}'.format(item['map_link'][0], item['map_link'][1])
                                                    else:
                                                        href += 'target={}_{}'.format(page['id'], item['id'])
                                                    href += '&id={}&link={}&title={}'.format(page['id'] + '_' + id, '/checklists/' + to_snake_case(page['title']) + '.html%23item_' + id, item['map_title'] if 'map_title' in item else item['data'][0])
                                                    a(href=href, cls=('invisible' if (('cords' not in item) and ('map_link' not in item)) else '')).add(i(cls='bi bi-geo-alt'))
                                                with div(cls="col d-flex align-items-center d-md-block d-none").add(div(cls="row")):
                                                    for pos in range(table_cols):
                                                        col_size = str(table_widths[pos])
                                                        with div(cls="ms-0 ps-0 d-flex align-items-center col-md-" + col_size):
                                                            with label(cls="form-check-label item_content ms-0 ps-0 d-flex align-items-center", _for=page['id'] + '_' + id):
                                                                if pos == 0 and 'icon' in item:
                                                                    add_icon(item['icon'], 'me-2 flex-shrink-0')
                                                                with span(cls='lang-pair item-name' if pos == 0 else 'lang-pair'):
                                                                    with span(cls='lang-text lang-en'):
                                                                        if item['data'][pos]:
                                                                            raw(item['data'][pos])
                                                                    for lang in sorted(available_languages):
                                                                        d_key = 'data_' + lang
                                                                        if d_key in item:
                                                                            lang_data = item[d_key]
                                                                            val = lang_data[pos] if pos < len(lang_data) else item['data'][pos]
                                                                            with span(cls='lang-text lang-' + lang + ' d-none'):
                                                                                if val:
                                                                                    raw(val)
                                                with div(cls='col d-md-none'):
                                                    with label(cls="form-check-label item_content ms-0 ps-0", _for=page['id'] + '_' + id):
                                                        if 'icon' in item:
                                                            add_icon(item['icon'], 'float-end')
                                                        for pos in range(table_cols):
                                                            col_size = str(table_widths[pos])
                                                            if isinstance(section['table'], list) and item['data'][pos]:
                                                                with strong(cls="me-1 no-highlight lang-pair"):
                                                                    span(section['table'][pos] + ': ', cls='lang-text lang-en')
                                                                    for lang in sorted(available_languages):
                                                                        t_key = 'table_' + lang
                                                                        if t_key in section and len(section[t_key]) > pos:
                                                                            span(section[t_key][pos] + ': ', cls='lang-text lang-' + lang + ' d-none')
                                                            with span(cls='lang-pair item-name' if pos == 0 else 'lang-pair'):
                                                                with span(cls='lang-text lang-en'):
                                                                    if item['data'][pos]:
                                                                        raw(item['data'][pos])
                                                                for lang in sorted(available_languages):
                                                                    d_key = 'data_' + lang
                                                                    if d_key in item:
                                                                        lang_data = item[d_key]
                                                                        val = lang_data[pos] if pos < len(lang_data) else item['data'][pos]
                                                                        with span(cls='lang-text lang-' + lang + ' d-none'):
                                                                            if val:
                                                                                raw(val)
                                                            if item['data'][pos]:
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
                                    if isinstance(item, dict) and 'name' in item and 'id' not in item:
                                        with h5(cls="lang-pair"):
                                            span(raw(item['name']), cls='lang-text lang-en')
                                            for lang in sorted(available_languages):
                                                n_key = 'name_' + lang
                                                if n_key in item:
                                                    span(raw(item[n_key]), cls='lang-text lang-' + lang + ' d-none')
                                        u = ul(cls="list-group-flush mb-0")
                                        continue
                                    def f(item):
                                        id = str(item['id'])
                                        
                                        d_name_jets = strip_a_tags(item['data'][0])
                                        for lang in available_languages:
                                            d_key = 'data_' + lang
                                            if d_key in item and item[d_key]:
                                                d_name_jets += ' ' + strip_a_tags(item[d_key][0])
                                                
                                        li_kwargs = {
                                            'data_id': page['id'] + "_" + id,
                                            'cls': "list-group-item searchable ps-0",
                                            'id': 'item_' + id,
                                            'data_name_jets': d_name_jets.lower() if hasattr(d_name_jets, 'lower') else str(d_name_jets).lower(),
                                        }
                                        if page['id'] in {'weapons', 'armor', 'incantations', 'ashesofwar', 'cookbooks', 'talismans', 'sorceries', 'spirit_ashes', 'bosses', 'crystal_tears', 'bell_bearings', 'ancient_dragon_smithing_stones', 'graces'}:
                                            is_dlc = item.get('dlc', section.get('dlc', page.get('dlc', False)))
                                            li_kwargs['data_dlc'] = str(bool(is_dlc)).lower()
                                        with li(**li_kwargs):
                                            with div(cls="form-check checkbox d-flex align-items-center"):
                                                input_(cls="form-check-input", type="checkbox", value="", id=page['id'] + '_' + id, data_section_idx=str(s_idx))
                                                with label(cls="form-check-label item_content d-md-flex align-items-center w-100", _for=page['id'] + '_' + id):
                                                    if 'icon' in item:
                                                        add_icon(item['icon'], 'float-md-none float-end me-md-2 flex-shrink-0')
                                                    with span(cls='lang-pair item-name'):
                                                        with span(cls='lang-text lang-en'):
                                                            raw(item['data'][0])
                                                        for lang in sorted(available_languages):
                                                            d_key = 'data_' + lang
                                                            if d_key in item:
                                                                lang_val = item[d_key][0] if item[d_key] else item['data'][0]
                                                                with span(cls='lang-text lang-' + lang + ' d-none'):
                                                                    raw(lang_val)
                                                if 'cords' in item or 'map_link' in item:
                                                    href = '/map.html?'
                                                    if 'map_link' in item:
                                                        href += 'x={}&y={}'.format(item['map_link'][0], item['map_link'][1])
                                                    else:
                                                        href += 'target={}_{}'.format(page['id'], id)
                                                    href += '&id={}&link={}&title={}'.format(page['id'] + '_' + id, '/checklists/' + to_snake_case(page['title']) + '.html%23item_' + id, item['map_title'] if 'map_title' in item else item['data'][0])
                                                    a(href=href, cls='ms-2').add(i(cls='bi bi-geo-alt'))
                                                page['num_ids'] += 1
                                                section['num_ids'] += 1
                                    with u:
                                        f(item)
                                    if isinstance(items.peek(0), list):
                                        item = next(items)
                                        with u.add(ul(cls='list-group-flush')):
                                            for subitem in item:
                                                f(subitem)

        a(cls="btn btn-primary btn-sm fadingbutton back-to-top d-print-none").add(raw("Back to Top&thinsp;"), span(cls="bi bi-arrow-up"))
        script(raw("window.current_page_id = \"{}\";\n".format(page['id'])))
        script(raw(f"window.DONE_HTML = '{get_done_html()}';\n"))
        make_footer(page)
        script(src="/js/checklists.js?v=1.1")
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
                                    if isinstance(item, str):
                                        continue
                                    with a(cls='d-none list-group-item list-group-item-action searchable', href='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id']), id='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id'])):
                                        with div(cls='row d-md-flex d-none'):
                                            for pos in range(table_cols):
                                                col_size = str(table_widths[pos])
                                                with div(cls='d-flex align-items-center col-md-' + col_size):
                                                    if pos == 0 and 'icon' in item:
                                                        add_icon(item['icon'], 'me-1')
                                                    if item['data'][pos]:
                                                        raw(strip_a_tags(item['data'][pos]))
                                        with div(cls='row d-md-none').add(div(cls='col')):
                                            if 'icon' in item:
                                                add_icon(item['icon'], 'float-end')
                                            for pos in range(table_cols):
                                                col_size = str(table_widths[pos])
                                                if isinstance(section['table'], list) and item['data'][pos]:
                                                    with strong(cls="me-1 no-highlight lang-pair"):
                                                        span(strip_a_tags(section['table'][pos]) + ': ', cls='lang-text lang-en')
                                                        for lang in sorted(available_languages):
                                                            t_key = 'table_' + lang
                                                            if t_key in section and len(section[t_key]) > pos:
                                                                span(strip_a_tags(section[t_key][pos]) + ': ', cls='lang-text lang-' + lang + ' d-none')
                                                if item['data'][pos]:
                                                    raw(strip_a_tags(item['data'][pos]))
                                                    br()
                            else:
                                for item in items:
                                    if isinstance(item, str):
                                        continue
                                    def f(item):
                                        if 'id' not in item:
                                            return
                                        with a(cls='d-none list-group-item list-group-item-action searchable', href='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id']), id='/checklists/' + to_snake_case(page['title']) + '.html#item_' + str(item['id'])):
                                            with div(cls='d-flex align-items-center'):
                                                if 'icon' in item:
                                                    add_icon(item['icon'], 'float-md-none float-end me-md-1')
                                                raw(strip_a_tags(item['data'][0]))
                                    if isinstance(item, dict):
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
    
def make_progress_js():
    with open(os.path.join('docs', 'js', 'progress.js'), 'w', encoding='utf_8') as f:
        f.write('window.progress = {\n')
        for page in pages:
            f.write('  "{}": {{\n'.format(page['id']))
            f.write('    "total": [0, {}],\n'.format(page['num_ids']))
            f.write('    "sections": [\n')
            for section in page['sections']:
                f.write('      [0, {}],\n'.format(section['num_ids']))
            f.write('    ],\n  },\n')
        f.write('};\n')
def get_done_html():
    done_en = nav_static.get(11, {'en': 'DONE'})['en']
    html = f'<span class="lang-pair"><span class="lang-text lang-en">{done_en}</span>'
    for lang in sorted(available_languages):
        if lang == 'en': continue
        done_text = nav_static.get(11, {'en': 'DONE'}).get(lang, done_en)
        html += f'<span class="lang-text lang-{lang} d-none">{done_text}</span>'
    html += '</span>'
    return html

def make_index_js():
    with open(os.path.join('docs', 'js', 'index.js'), 'w', encoding='utf_8') as f:
        f.write("(function($) {\n")
        f.write("    'use strict';\n")
        f.write(f"    window.DONE_HTML = '{get_done_html()}';\n")
        f.write("    $(function() {\n")
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
        
        done_html = get_done_html()
        for page in pages:
            f.write('if ({page_id}_checked >= {page_id}_total){{\n'.format(page_id=page['id']))
            f.write(f'$("#{page["id"]}_progress_total").html(\'{done_html}\');\n')
            f.write(f'$("#{page["id"]}_progress_total").removeClass("bg-info").addClass("bg-success");\n')
            f.write('} else {\n')
            f.write('$("#{page_id}_progress_total").html({page_id}_checked + "/" + {page_id}_total);\n'.format(page_id=page['id']))
            f.write(f'$("#{page["id"]}_progress_total").removeClass("bg-success").addClass("bg-info");\n')
            f.write('}\n')
        f.write('if (window.applyLanguageCss) { window.applyLanguageCss(window.currentLanguage); }\n')
        f.write('}\n')
        f.write('calculateProgress();\n')
        f.write('  });\n')
        f.write('})( jQuery );\n')

def make_search_index():
    search_idx = []
    for page in pages:
        for section in page['sections']:
            items = peekable(section['items'])
            for item in items:
                if isinstance(item, str):
                    continue
                def f(item):
                    if 'id' not in item:
                        return
                    search_idx.append({
                        'id': '/checklists/{page_href}#item_{id}'.format(page_href=to_snake_case(page['title']) + '.html', id=item['id']),
                        'text': re.sub(r'(<([^>]+)>)', '', ' '.join(item['data'])),
                    })
                if isinstance(item, dict):
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
    icon_size = 35
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

def get_localized_map_title(item, available_languages):
    en_title = item.get('map_title', strip_a_tags(item['data'][0]))
    has_other_langs = False
    for lang in sorted(available_languages):
        if lang == 'en': continue
        if f'map_title_{lang}' in item or f'data_{lang}' in item:
            has_other_langs = True
            break
            
    if not has_other_langs:
        return en_title

    html = f'<span class="lang-pair"><span class="lang-text lang-en">{en_title}</span>'
    for lang in sorted(available_languages):
        if lang == 'en': continue
        
        if f'map_title_{lang}' in item:
            loc_title = item[f'map_title_{lang}']
        elif f'data_{lang}' in item:
            loc_title = strip_a_tags(item[f'data_{lang}'][0])
        else:
            loc_title = en_title
            
        html += f'<span class="lang-text lang-{lang} d-none">{loc_title}</span>'
        
    html += '</span>'
    return html

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
            'title': get_localized_map_title(item, available_languages),
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
        geojson['id'] = page['id']
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
            with div(cls='offcanvas offcanvas-end m-0 p-0 g-0 w-auto show d-none d-lg-block', id='layer-menu', data_bs_stroll="true", data_bs_backdrop="false", tabindex="-1"):
                with button(cls='btn btn-primary btn-sml offcanvas-btn position-absolute p-1', type='button', data_bs_toggle='offcanvas', data_bs_target='#layer-menu', style='height: 50px;'):
                    i(cls='bi bi-caret-left-fill m-0 p-0')
                    i(cls='bi bi-caret-right-fill m-0 p-0')
                    # h3('Map', cls='offcanvas-title')
                with div(cls='offcanvas-body overflow-auto h-100'):
                    with div(cls='d-flex align-items-center justify-content-between'):
                        h3('Layers', cls='offcanvas-title')
                        button(type='button', cls='btn-close text-reset', data_bs_dismiss='offcanvas')
                    hr()
                    # with div(cls='row mb-2'):
                    #     with div(cls='col-auto order-last'):
                    #         button(type='button', cls='btn-close text-reset d-lg-none', data_bs_dismiss='offcanvas')
                    #     with div(cls='col text-center'):
                    #         h3('Layers')
                    with div(cls='mb-2 d-flex justify-content-evenly'):
                        button('Show All', type='button', cls='btn btn-secondary btn-sm', id='show-all')
                        button('Hide All', type='button', cls='btn btn-secondary btn-sm', id='hide-all')
                    for name, l in dropdowns:
                        should_print_category = False
                        for guide in l:
                            if guide[1] in pages_in_map:
                                should_print_category = True
                                break
                        if should_print_category:
                            h4(name)
                            for guide in l:
                                if guide[1] in pages_in_map:
                                    with div(cls='form-check ps-0'):
                                        input_(type='checkbox', cls='btn-check category-filter', id=guide[1], autocomplete='off')
                                        b = label(cls='btn btn-sm btn-secondary w-100 text-start', _for=guide[1])
                                        if guide[2]:
                                            b += img(data_src=guide[2], loading='lazy', height=25, width=25, cls='me-1')
                                        b += guide[0]
                                        b += span(id=guide[1] + '_progress_total')
                    hr()
                    with div(cls='form-check'):
                        input_(cls='form-check-input', type='checkbox', value='', id='hideCompleted')
                        label('Hide Completed', cls='form-check-label', _for='hideCompleted')
                                        # l = label(cls='form-check-label layer-button', _for=guide[1])
                                        # l += input_(cls='form-check-input category-filter', type='checkbox', value='', id=guide[1], hidden='')
                                        # if guide[2]:
                                        #     l += img(data_src=guide[2], loading='lazy', height=20, width=20, cls='me-1')
                                        # l += guide[0]
                                        # l += span(id=guide[1] + "_progress_total")
                        # with li(cls="dropdown nav-item"):
                        #     a(name, cls="nav-link dropdown-toggle" + (' active' if page_in_dropdown else ''), href="#", data_bs_toggle="dropdown", aria_haspopup="true", aria_expanded="false").add(span(cls="caret"))
                        #     with ul(cls="dropdown-menu"):
                        #         for guide in l:
                        #             li(cls='tab-li').add(a(guide[0], cls="dropdown-item show-buttons"  + (' active' if page == to_snake_case(guide[0]) else ''), href='/checklists/' + to_snake_case(guide[0]) + '.html'))

            with div(id='popup', cls='card shadow'):
                # a(href='#', id='popup-closer', cls='ol-popup-closer')
                with div(cls="card-body form-check checkbox d-flex align-items-center popup-content"):
                    input_(cls="form-check-input", type="checkbox", value="", id='popup-checkbox')
                    label(cls="form-check-label item_content ms-2", _for='popup-checkbox', id='popup-title')
                    a(href="#", id='popup-link', cls='ms-3').add(i(cls='bi bi-link-45deg'))
                    with div(cls='d-none', id='dev-mode-copy'):
                        a('map_link', type='button', cls='btn btn-primary btn-sm', id='dev-mode-copy-button')
        make_footer()
        with script():
            raw(f"window.DONE_HTML = '{get_done_html()}';")
        script(src='/map/src/js/ol.js')
        script(src='/map/src/js/features.js')
        script(src='/map/src/js/map.js?v=1.1')
    with open(os.path.join('docs', 'map.html'), 'w', encoding='utf_8') as f:
        f.write(doc.render())

make_index()
make_options()
for page in pages:
    make_checklist(page)
make_search()
make_search_index()
make_progress_js()
make_index_js()
make_item_links()
make_geojson()
make_map()
