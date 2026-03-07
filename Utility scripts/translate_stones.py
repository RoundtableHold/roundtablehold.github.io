import yaml
import sys
import os

def process_file(filepath, translations, title_it_name):
    with open(filepath, 'r') as f:
        d = yaml.safe_load(f)

    d['title_it'] = title_it_name

    def apply_translations(node):
        if isinstance(node, dict):
            new_node = {}
            keys = list(node.keys())
            for k in keys:
                if k.endswith('_it'):
                    continue
                new_node[k] = node[k]
                
                if k == 'title':
                    old_val = node[k]
                    new_node['title_it'] = translations.get(old_val, old_val + "_IT_MISSING")
                elif k == 'table':
                    # Only whetstones uses tables here
                    new_node['table_it'] = ["Effetto", "Luogo", "Note"]
                elif k == 'data':
                    # data array parsing
                    old_data = node[k]
                    new_data = []
                    for val in old_data:
                        new_data.append(translations.get(val, val + "_IT_MISSING"))
                    new_node['data_it'] = new_data
                elif k == 'map_title':
                    old_val = node[k]
                    new_node['map_title_it'] = translations.get(old_val, old_val + "_IT_MISSING")
                    
            for k in ["items", "sections", "subitems"]:
                if k in node:
                    new_node[k] = apply_translations(node[k])
            return new_node
        elif isinstance(node, list):
            return [apply_translations(item) for item in node]
        else:
            return node

    d['sections'] = apply_translations(d['sections'])

    class MyDumper(yaml.Dumper):
        def increase_indent(self, flow=False, indentless=False):
            return super(MyDumper, self).increase_indent(flow, False)

    out_path = filepath.replace('.yaml', '_it.yaml')
    with open(out_path, 'w') as f:
        yaml.dump(d, f, Dumper=MyDumper, default_flow_style=False, sort_keys=False, allow_unicode=True)
    
    os.rename(out_path, filepath)
    print(f"Processed {filepath}")


memory_translations = {
    # Headings
    "Memory Stones": "Pietre della memoria",
    "Talisman Pouches": "Borse per talismano",
    
    # Map Titles
    "Memory Stone": "Pietra della memoria",
    "Talisman Pouch": "Borsa per talismano",
    
    # Memory Stones Descriptions
    "Found in Oridys' Rise, on the plateau to the east side of the Weeping Peninsula.": "Nella Guglia di Oridys, sull'altopiano nella parte orientale della Penisola del Pianto.",
    "Purchasable from Twin Maiden Husks at the Roundtable Hold for 3,000 Runes.": "Acquistabile dai Resti della Leggidita Gemelle alla Tavola Rotonda per 3.000 Rune.",
    "Found in the Converted Tower, in the southwest of Liurnia of the Lakes.": "Nella Torre convertita, a sud-ovest di Liurnia lacustre.",
    "Reward for defeating Red Wolf of Radagon in Raya Lucaria Academy.": "Ricompensa per aver sconfitto il Lupo Rosso di Radagon nell'Accademia di Raya Lucaria.",
    "Found in Testu's Rise, north of Raya Lucaria Academy.": "Nella Guglia di Testu, a nord dell'Accademia di Raya Lucaria.",
    "Found in Seluvis's Rise behind Caria Manor in Liurnia of the Lakes.": "Nella Guglia di Seluvis, dietro il Maniero Cariano a Liurnia lacustre.",
    "Found in Lenne's Rise in eastern Caelid.": "Nella Guglia di Lenne, nella zona est di Caelid.",
    "Reward for defeating Demi-Human Queen Maggie, northeast of Hermit Village in Mt. Gelmir.": "Ricompensa per aver sconfitto Maggie, la regina semiumana, a nord-est del Villaggio dell'eremita sul Monte Gelmir.",
    
    # Talisman Pouches Descriptions
    "Reward for defeating Margit, the Fell Omen in Stormveil Castle.": "Ricompensa per aver sconfitto Margit, il Presagio Implacabile nel Castello di Gran Tempesta.",
    "Speak to Finger Reader Enia after acquiring two Great Runes. Will appear in Twin Maiden Husks' shop if you progress too far.": "Parla con la Leggidita Enia dopo aver ottenuto due Rune Maggiori. Apparirà nel negozio dei Resti della Leggidita Gemelle se avanzi troppo nel gioco.",
    "Reward for defeating Godfrey, First Elden Lord (Golden Shade) in Leydell, Royal Capital.": "Ricompensa per aver sconfitto Godfrey, Primo Lord Ancestrale (Spettro dorato) a Leyndell, Capitale Reale."
}

whetstone_translations = {
    # Headings
    "Whetstones": "Coltelli per affilatura",
    
    # Regions
    "Limgrave": "Sepolcride",
    "Liurnia of the Lakes": "Liurnia lacustre",
    "Caelid": "Caelid",
    "Nokron": "Nokron",
    "Leyndell, Royal Capital": "Leyndell, Capitale Reale",
    
    # Whetstones
    "Whetstone Knife": "Coltello per affilatura",
    "Iron Whetblade": "Coltello da affilatura di ferro",
    "Glintstone Whetblade": "Coltello da affilatura di scintipietra",
    "Red-Hot Whetblade": "Coltello da affilatura rovente",
    "Black Whetblade": "Coltello da affilatura nero",
    "Sanctified Whetblade": "Coltello da affilatura consacrato",
    
    # Locations
    "Found in a treasure chest underground in the Gatefront Ruins": "In un forziere sotterraneo nelle Rovine del Cancello.",
    "In Stormveil Castle. Found on a corpse in an armory room accessible from the kitchen area. Requires a Stonesword key.": "Nel Castello di Gran Tempesta. Su un cadavere in un'armeria accessibile dalla zona cucina. Richiede una Chiave della Spada di Pietra.",
    "In Raya Lucaria Academy. Found on a corpse hanging over a balcony overlooking the courtyard near the Debate Parlor.": "Nell'Accademia di Raya Lucaria. Su un cadavere che pende da un balcone con vista sul cortile, vicino al Salone del dibattito.",
    "Found on a corpse in the northwest of Redmane Castle, near an Iron Virgin. Unavailable during the festival.": "Su un cadavere nella zona nord-ovest del Castello di Mantorosso, vicino a una Vergine di Ferro. Non disponibile durante il festival.",
    "Found on a corpse slumped in front of an altar in Night's Sacred Ground": "Su un cadavere accasciato davanti a un altare a Terreno Consacrato alla Notte.",
    "Found in the Fortified Manor on the second floor next to an anvil, accessible from the Avenue Balcony Grace": "Nel Maniero fortificato, al secondo piano accanto a un'incudine. Accessibile dalla Grazia Terrazza sul viale.",
    
    # Effects
    "Can add new battle arts and affinities to weapons": "Permette di aggiungere nuove abilità e affinità alle armi.",
    "Grants Quality, Keen, or Heavy affinity upgrade to weapon": "Conferisce l'affinità Qualità, Acuminata o Pesante all'arma.",
    "Grants Magic or Cold affinity upgrade to weapon": "Conferisce l'affinità Magica o Fredda all'arma.",
    "Grants Fire and Flame Art affinity upgrade to weapon": "Conferisce l'affinità Fuoco e Arte della Fiamma all'arma.",
    "Grants Poison, Blood, or Occult affinity upgrade to weapon": "Conferisce l'affinità Veleno, Sangue o Occulta all'arma.",
    "Grants Lightning or Sacred affinity upgrade to weapon": "Conferisce l'affinità Fulmine o Sacra all'arma."
}

process_file('data/checklists/memory_stones_talisman_pouches.yaml', memory_translations, "Pietre della memoria e Borse per talismano")
process_file('data/checklists/whetstones.yaml', whetstone_translations, "Coltelli per affilatura")
