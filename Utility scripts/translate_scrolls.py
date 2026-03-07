import yaml
import sys

with open('data/checklists/scrolls_prayerbooks.yaml', 'r') as f:
    d = yaml.safe_load(f)

d['title_it'] = 'Pergamene e Libri di preghiere'

translations = {
    # Sections
    'Scrolls': 'Pergamene',
    'Prayerbooks': 'Libri di preghiere',

    # Scrolls
    'Royal House Scroll': 'Pergamena della Casa Reale',
    'Academy Scroll': "Pergamena dell'Accademia",
    'Conspectus Scroll': 'Pergamena del Conspectus',
    'Royal House Scroll - East of the Agheel Lake South Site of Grace, on a ruin, next to a mage enemy.': "Pergamena della Casa reale - A est del Luogo di Grazia Sud del lago di Agheel, su una rovina, accanto a un nemico mago.",
    'Academy Scroll - West of the Lake-Facing Cliffs Site of Grace, in a graveyard.': "Pergamena dell'Accademia - A ovest del Luogo di Grazia Dirupo sul lago, in un cimitero.",
    'Conspectus Scroll - Near the Schoolhouse Classroom Site of Grace in Raya Lucaria; turn left as you leave the grace room headed into the building.': "Pergamena del Conspectus - Vicino al Luogo di Grazia Aula scolastica di Raya Lucaria; girati a sinistra appena uscito dalla stanza per entrare nell'edificio.",

    # Prayerbooks
    "Assassin's Prayerbook": "Libro di preghiere dell'assassino",
    "Godskin Prayerbook": "Libro di preghiere dei Sacriderma",
    "Fire Monks' Prayerbook": "Libro di preghiere dei monaci del fuoco",
    "Dragon Cult Prayerbook": "Libro di preghiere del Culto draconico",
    "Two Fingers' Prayerbook": "Libro di preghiere delle Due Dita",
    "Golden Order Principia": "Principi dell'Ordine Aureo",
    "Giant's Prayerbook": "Libro di preghiere del gigante",
    "Ancient Dragon Prayerbook": "Libro di preghiere dei draghi antichi",

    "Assassin's Prayerbook - Behind an Imp Statue door that's behind another Imp Statue door in Roundtable Hold. Requires 3 Stonesword Keys total.": "Libro di preghiere dell'assassino - Dietro una porta della Statua del Folletto che si trova dietro ad un'altra porta della stessa statua nella Tavola Rotonda. Richiede 3 Chiavi della Spada di Pietra in totale.",
    "Godskin Prayerbook - Behind an Imp Statue door in Stormveil Castle. From the Liftside Chamber Site of Grace, exit into the courtyard and hug the right wall until you find a set of stairs going down on the wall on the other side.": "Libro di preghiere dei Sacriderma - Dietro una porta della Statua del Folletto nel Castello di Gran Tempesta. Dal Luogo di Grazia Stanza del montacarichi, esci nel cortile e prosegui accostato al muro destro finché non trovi delle scale che scendono dall'altra parte del muro.",
    "Fire Monks' Prayerbook - In a Fire Monk camp in the southern edge of Liurnia, near the Fire Spur Me gesture.": "Libro di preghiere dei monaci del fuoco - In un accampamento di monaci del fuoco al limite sud di Liurnia, vicino al Gesto 'Incitami, o fiamma!'.",
    "Dragon Cult Prayerbook - Kill the Leyndell Knight patrolling south of the Artist's Shack Site of Grace in Liurnia.": "Libro di preghiere del Culto draconico - Uccidi il Cavaliere di Leyndell di pattuglia a sud del Luogo di Grazia Capanna dell'artista a Liurnia.",
    "Two Fingers' Prayerbook - In Leyndell, near the Fortified Manor, First Floor Site of Grace, in a room to the south, by a fireplace. Same room as the By My Sword gesture.": "Libro di preghiere delle Due Dita - A Leyndell, vicino al Luogo di Grazia Maniero fortificato - primo piano, in una stanza a sud, presso a un caminetto. Nella stessa stanza del Gesto 'Per la mia spada'.",
    "Golden Order Principia - In Leyndell, from the Erdtree Sanctuary Site of Grace, exit east and climb up to the second floor. Go through the door, jump down to the roof on the left, and go through the broken window. Climb a root to the chair hanging from the ceiling.": "Principi dell'Ordine Aureo - A Leyndell, dal Luogo di Grazia Santuario dell'Albero Madre, esci ad est e sali al secondo piano. Passa dalla porta, salta giù sul tetto a sinistra e passa dalla finestra rotta. Arrampicati su una radice fino alla sedia sospesa in aria al centro della stanza.",
    "Giant's Prayerbook - In Mountaintops of the Giants, at the top of Guardian's Garrison, up a ladder behind Chief Guardian Arghanthy.": "Libro di preghiere del gigante - Sulle Vette dei Giganti, in cima alla Guarnigione dei Guardiani, su una scala a pioli dietro al Capo dei Guardiani Arghanthy.",
    "Ancient Dragon Prayerbook - Northwest of the Crumbling Beast Site of Grace in Crumbling Farum Azula, in the middle of the main hall.": "Libro di preghiere dei draghi antichi - A ovest dal Luogo di Grazia Tomba della belva in rovina di Farum Azula in rovina, al centro del salone principale.",
}

def apply_translations(node):
    if isinstance(node, dict):
        new_node = {}
        # Ensure we maintain a consistent order and add _it right after English
        keys = list(node.keys())
        for k in keys:
            if k.endswith('_it'):
                continue
            new_node[k] = node[k]
            if k == 'title':
                old_val = node[k]
                new_node['title_it'] = translations.get(old_val, old_val + "_IT_MISSING")
            elif k == 'data':
                old_val = node[k][0]
                new_node['data_it'] = [translations.get(old_val, old_val + "_IT_MISSING")]
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

with open('data/checklists/scrolls_prayerbooks_it.yaml', 'w') as f:
    yaml.dump(d, f, Dumper=MyDumper, default_flow_style=False, sort_keys=False, allow_unicode=True)
