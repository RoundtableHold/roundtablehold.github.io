#!/usr/bin/env python3
"""
Add data_it and title_it Italian translation fields to weapons.yaml.
"""
import re
import html

# ─── Section title translations ───────────────────────────────────────────────
TITLE_TRANSLATIONS = {
    "Weapons": "Armi",
    "Hand-to-Hand Arts": "Arti Corpo a Corpo",
    "Throwing Blades": "Lame da Lancio",
    "Backhand Blades": "Lame Rovesciate",
    "Perfume Bottles": "Bottiglie di Profumo",
    "Beast Claws": "Artigli della Bestia",
    "Light Greatswords": "Grandispade Leggere",
    "Great Katanas": "Grandi Katane",
    "Daggers": "Pugnali",
    "Straight Swords": "Spade Dritte",
    "Greatswords": "Grandispade",
    "Colossal Swords": "Spade Colossali",
    "Thrusting Swords": "Spade da Stocco",
    "Heavy Thrusting Swords": "Spade da Stocco Pesanti",
    "Curved Swords": "Spade Curve",
    "Curved Greatswords": "Grandispade Curve",
    "Katanas": "Katane",
    "Twinblades": "Doppie Lame",
    "Axes": "Asce",
    "Greataxes": "Grandi Asce",
    "Hammers": "Martelli",
    "Flails": "Flagelli",
    "Great Hammers": "Grandi Martelli",
    "Colossal Weapons": "Armi Colossali",
    "Spears": "Lance",
    "Great Spears": "Grandi Lance",
    "Halberds": "Alabarde",
    "Reapers": "Falci",
    "Whips": "Fruste",
    "Fists": "Pugni",
    "Claws": "Artigli",
    "Light Bows": "Archi Leggeri",
    "Bows": "Archi",
    "Greatbows": "Grandi Archi",
    "Crossbows": "Balestre",
    "Ballistas": "Baliste",
    "Glintstone Staffs": "Bastoni di Glintstone",
    "Sacred Seals": "Sigilli Sacri",
    "Torches": "Torce",
    "Small Shields": "Scudi Piccoli",
    "Medium Shields": "Scudi Medi",
    "Greatshields": "Grandiscudi",
    "Thrusting Shields": "Scudi Perforanti",
}

# ─── Load item translations ────────────────────────────────────────────────────
def load_translations(path):
    trans = {}
    with open(path) as f:
        next(f)  # skip header
        for line in f:
            line = line.rstrip('\n')
            if not line:
                continue
            parts = line.split('|||')
            if len(parts) >= 4:
                item_id = parts[0].strip()
                name_it = parts[1].strip()
                loc_it  = parts[2].strip()
                upg_it  = parts[3].strip()
                trans[item_id] = (name_it, loc_it, upg_it)
            elif len(parts) == 3:
                item_id = parts[0].strip()
                name_it = parts[1].strip()
                loc_it  = parts[2].strip()
                trans[item_id] = (name_it, loc_it, "Normale")
    return trans

def escape_for_dq_yaml(s):
    """Escape a string for use inside a double-quoted YAML scalar."""
    # In double-quoted YAML: backslash and double-quote must be escaped
    s = s.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    return s

def build_data_it_line(item_id, href_url, name_it, loc_it, upg_it, indent="        "):
    """Build the data_it: [...] inline array line."""
    link_part = f'<a href=\\"{href_url}\\">{escape_for_dq_yaml(name_it)}</a>'
    loc_escaped = escape_for_dq_yaml(loc_it)
    upg_escaped = escape_for_dq_yaml(upg_it)
    return f'{indent}data_it: ["{link_part}", "{loc_escaped}", "{upg_escaped}"]\n'

def process_weapons_yaml(input_path, output_path, trans):
    with open(input_path) as f:
        lines = f.readlines()

    out = []
    i = 0
    missing_ids = []

    while i < len(lines):
        line = lines[i]
        out.append(line)

        # ── Top-level title (line 1: "title: Weapons") ────────────────────────
        m = re.match(r'^title: (.+)$', line.rstrip('\n'))
        if m:
            title_en = m.group(1)
            title_it = TITLE_TRANSLATIONS.get(title_en)
            if title_it:
                out.append(f'title_it: {title_it}\n')
            else:
                print(f'WARNING: no title_it for top-level title: {title_en!r}')
            i += 1
            continue

        # ── Section title ("    title: Hand-to-Hand Arts") ────────────────────
        m = re.match(r'^    title: (.+)$', line.rstrip('\n'))
        if m:
            title_en = m.group(1)
            title_it = TITLE_TRANSLATIONS.get(title_en)
            if title_it:
                out.append(f'    title_it: {title_it}\n')
            else:
                print(f'WARNING: no title_it for section: {title_en!r}')
            i += 1
            continue

        # ── data: [...] line — insert data_it: right after ────────────────────
        m = re.match(r'^(        )data: \["(<a href=\\"([^"]+)\\">.*?</a>)", ".*?", ".*?"\]', line)
        if m:
            indent = m.group(1)
            href_url = m.group(3)

            # Look back to find the id: for this item
            item_id = None
            for j in range(len(out) - 1, max(len(out) - 10, -1), -1):
                id_m = re.match(r'      - id: "(.+)"', out[j])
                if id_m:
                    item_id = id_m.group(1)
                    break

            if item_id and item_id in trans:
                name_it, loc_it, upg_it = trans[item_id]
                data_it_line = build_data_it_line(item_id, href_url, name_it, loc_it, upg_it, indent)
                out.append(data_it_line)
            else:
                missing_ids.append(item_id)
                print(f'WARNING: no translation for id={item_id!r}')
            i += 1
            continue

        i += 1

    with open(output_path, 'w') as f:
        f.writelines(out)

    print(f'\nDone. {len(out)} lines written.')
    if missing_ids:
        print(f'Missing translations for {len(missing_ids)} items: {missing_ids}')
    else:
        print('All items translated successfully.')


if __name__ == '__main__':
    trans = load_translations('/tmp/weapon_translations.txt')
    print(f'Loaded {len(trans)} translations')
    process_weapons_yaml(
        '/home/user/elden-lord/data/checklists/weapons.yaml',
        '/home/user/elden-lord/data/checklists/weapons.yaml',
        trans
    )
