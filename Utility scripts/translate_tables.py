import json
import re

translations = {
    "Name": "Nome",
    "Description": "Descrizione",
    "Location": "Luogo",
    "Effect": "Effetto",
    "Effect(s)": "Effetti",
    "How to get": "Come ottenerlo",
    "Unlocks": "Sblocca",
    "Version": "Versione",
    "NPC": "NPC",
    "Obtained naturally?": "Ottenibile naturalmente?",
    "Notes": "Note",
    "Merchant": "Mercante",
    "": '""'
}

def translate_array(english_headers_str):
    try:
        headers = json.loads(english_headers_str)
        translated = []
        for x in headers:
            if x == "":
                translated.append('""')
            else:
                translated.append('"' + translations.get(x, x) + '"')
        return "[" + ", ".join(translated) + "]"
    except Exception as e:
        print(f"Error parsing headers {english_headers_str}: {e}")
        return None

files_to_process = [
    'data/checklists/talismans.yaml',
]

for file_path in files_to_process:
    with open(file_path, 'r') as f:
        lines = f.readlines()
        
    new_lines = []
    count = 0
    for i, line in enumerate(lines):
        new_lines.append(line)
        
        match = re.search(r'^(\s*)table:\s*(\[.*?\])\s*$', line)
        if match:
            indent = match.group(1)
            arr_str = match.group(2)
            
            if i + 1 < len(lines) and 'table_it:' in lines[i+1]:
                continue
                
            translated_arr_str = translate_array(arr_str)
            if translated_arr_str:
                new_lines.append(f"{indent}table_it: {translated_arr_str}\n")
                count += 1
                
    with open(file_path, 'w') as f:
        f.writelines(new_lines)
    print(f"Injected table_it {count} times into {file_path}")
