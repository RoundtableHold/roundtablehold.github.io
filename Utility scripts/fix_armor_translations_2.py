#!/usr/bin/env python3
"""Second pass: fix remaining untranslated/incorrect items in data_it sections."""
import re

with open('data/checklists/armor.yaml', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Mapping of link display text that still needs fixing in data_it sections
LINK_TEXT_FIXES = {
    # Iron Rivet set — fix missing "di"
    'Armatura Iron Rivet': 'Armatura di Iron Rivet',
    'Guantoni Iron Rivet': 'Guantoni di Iron Rivet',
    'Gambali Iron Rivet': 'Gambali di Iron Rivet',
    # Black Dumpling
    'Black Dumpling': 'Gnocco Nero',
    # Juvenile Scholar
    'Juvenile Scholar Cap': 'Cappello del Giovane Studioso',
    # Glintstone Crowns (proper names, keep "Glintstone", translate "Crown")
    'Karolos Glintstone Crown': 'Corona di Glintstone di Karolos',
    'Olivinus Glintstone Crown': 'Corona di Glintstone di Olivinus',
    'Twinsage Glintstone Crown': 'Corona di Glintstone di Twinsage',
    'Haima Glintstone Crown': 'Corona di Glintstone di Haima',
    'Hierodas Glintstone Crown': 'Corona di Glintstone di Hierodas',
    # Tear Scarabs
    'Crimson Tear Scarab': 'Scarabeo della Lacrima Cremisi',
    'Cerulean Tear Scarab': 'Scarabeo della Lacrima Cerulea',
    # Lord of Blood (official Italian: Signore del Sangue)
    'Veste del Lord del Sangue': 'Veste del Signore del Sangue',
    # Blue Cloth
    'Blue Cloth Cowl': 'Cappuccio di Panno Blu',
    'Blue Cloth Vest': 'Veste di Panno Blu',
    # Foot Soldier
    'Foot Soldier Tabard': 'Tabard del Fante',
    'Gilded Foot Soldier Cap': 'Cappello Dorato del Fante',
    # Bloodsoaked
    'Bloodsoaked Tabard': 'Tabard Insanguinato',
    # Nox / Night
    'Nox Swordstress Crown': 'Corona della Spadaccina Nox',
    'Night Maiden Twin Crown': 'Corona Gemella della Fanciulla della Notte',
    # Haligtree Crest
    'Haligtree Crest Surcoat': 'Surcoat con Stemma dell\'Albero Santo',
    # Iron Kasa (keep "Kasa" as Japanese term, translate "Iron")
    'Iron Kasa': 'Kasa di Ferro',
    # Marionette Soldier
    'Marionette Soldier Birdhelm': 'Elmo-Corvo del Soldato Marionetta',
    # Blue Silver set — only Bracelets and Skirt are missing (Hood/Armor already done)
    'Blue Silver Bracelets': 'Bracciali di Maglia Blu-Argento',
    'Blue Silver Mail Skirt': 'Gonna di Maglia Blu-Argento',
    # Elden Lord
    'Elden Lord Crown': 'Corona di Elden Lord',
    'Elden Lord Bracers': 'Bracciali di Elden Lord',
    # St. Trina's Blossom
    "St. Trina's Blossom": 'Fiore di St. Trina',
    # Greatjar
    'Greatjar': 'Gran Vaso',
}

# Description text fixes (applied in data_it sections, not link text)
DESCRIPTION_FIXES = {
    '"Touch Memory"': '"Tocca il ricordo"',
    "Malenia''s</a>": "Malenia</a>",
}

new_lines = []
in_data_it = False

for i, line in enumerate(lines):
    stripped = line.strip()

    # Track data_it sections
    if stripped == 'data_it:':
        in_data_it = True
        new_lines.append(line)
        continue

    # Reset when we hit a new section marker
    if stripped in ('data:', '- id:') or stripped.startswith('- id:') or stripped.startswith('- title:') or stripped.startswith('sections:'):
        in_data_it = False

    if in_data_it:
        modified = line

        # Fix link display text
        if '<a href=' in line:
            def replace_link_text(m):
                url = m.group(1)
                text = m.group(2)
                new_text = LINK_TEXT_FIXES.get(text, text)
                return f'<a href="{url}">{new_text}</a>'
            modified = re.sub(r'<a href="([^"]+)">([^<]+)</a>', replace_link_text, modified)
        
        # Fix description text
        for old, new in DESCRIPTION_FIXES.items():
            modified = modified.replace(old, new)

        new_lines.append(modified)
    else:
        new_lines.append(line)

with open('data/checklists/armor.yaml', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Done.")
