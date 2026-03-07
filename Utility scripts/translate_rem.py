import yaml
import sys

with open('data/checklists/remembrances.yaml', 'r') as f:
    d = yaml.safe_load(f)

d['title_it'] = 'Rimembranze e Mausolei'
d['description_it'] = "Le Rimembranze vengono rilasciate dai boss più significativi di <i>Elden Ring</i>. Hanno una funzione di base come oggetti runici consumabili ma, cosa più importante, ciascuna può essere ceduta a Enia in cambio del suo potere per ricevere una ricompensa, a tua scelta tra uno di due equipaggiamenti associati al boss.<br><br>I Mausolei Erranti sono cripte sul dorso di imponenti tartarughe di pietra che spesso vagano lungo un breve percorso. Sono coperti, o sul tetto o sulle zampe, da un oscuro residuo magico simile a numerosi teschi. Per interagire con il Mausoleo, devi eliminare gran parte di questo residuo attaccandolo, finché non crolla e diventa inerte, permettendoti di entrarvi. Lì puoi duplicare una delle tue Rimembranze, anche se l'hai già usata prima, potendo così riscattare entrambe le ricompense. È concessa solo una duplicazione per Mausoleo per ogni partita. I Mausolei senza grandi campane attaccate sotto di essi possono duplicare esclusivamente particolari Rimembranze non-Araldi."

translations = {
    # Remembrances
    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Grafted">Remembrance of the Grafted</a> (20,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Grafted">Rimembranza del Trapiantato</a> (20.000 Rune)',
    'Weapon - Axe of Godrick': 'Arma - Ascia di Godrick',
    'Weapon - Grafted Dragon': 'Arma - Drago innestato',
    'Remembrance of the Grafted': 'Rimembranza del Trapiantato',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Full+Moon+Queen">Remembrance of the Full Moon Queen</a> (20,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Full+Moon+Queen">Rimembranza della Regina del Plenilunio</a> (20.000 Rune)',
    "Sorcery Spell - Rennala's Full Moon": 'Stregoneria - Luna piena di Rennala',
    'Weapon - Carian Regal Scepter': 'Arma - Scettro regale cariano',
    'Remembrance of the Full Moon Queen': 'Rimembranza della Regina del Plenilunio',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Starscourge">Remembrance of the Starscourge</a> (40,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Starscourge">Rimembranza del Flagello delle Stelle</a> (40.000 Rune)',
    'Weapon - Starscourge Greatsword': 'Arma - Spadone del Flagello',
    'Weapon - Lion Greatbow': 'Arma - Arco lungo del leone',
    'Remembrance of the Scarscourge': 'Rimembranza del Flagello delle Stelle',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Blasphemous">Remembrance of the Blasphemous</a> (50,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Blasphemous">Rimembranza del Blasfemo</a> (50.000 Rune)',
    "Sorcery Spell - Rykard's Rancor": 'Stregoneria - Rancore di Rykard',
    'Weapon - Blasphemous Blade': 'Arma - Lama blasfema',
    'Remembrance of the Blasphemous': 'Rimembranza del Blasfemo',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Omen+King">Remembrance of the Omen King</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Omen+King">Rimembranza del Re Presagio</a> (30.000 Rune)',
    "Weapon - Morgott's Cursed Sword": 'Arma - Spada maledetta di Morgott',
    'Reusable Tool - Regal Omen Bairn': 'Strumento riutilizzabile - Feticcio del Presagio regale',
    'Remembrance of the Omen King': 'Rimembranza del Re Presagio',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Fire+Giant">Remembrance of the Fire Giant</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Fire+Giant">Rimembranza del Gigante di Fuoco</a> (30.000 Rune)',
    "Weapon - Giant's Red Braid": 'Arma - Treccia rossa da gigante',
    'Incantation Spell - Burn, O Flame!': 'Incantesimo - Ardi, o Fiamma!',
    'Remembrance of the Fire Giant': 'Rimembranza del Gigante di Fuoco',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Rot+Goddess">Remembrance of the Rot Goddess</a> (50,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Rot+Goddess">Rimembranza della Dea della marcescenza</a> (50.000 Rune)',
    'Weapon - Hand Of Malenia': 'Arma - Mano di Malenia',
    'Incantation Spell - Scarlet Aeonia': 'Incantesimo - Eonia scarlatta',
    'Remembrance of the Rot Goddess': 'Rimembranza della Dea della marcescenza',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Dragonlord">Remembrance of the Dragonlord</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Dragonlord">Rimembranza del Lord draconico</a> (30.000 Rune)',
    "Weapon - Dragon King's Cragblade": 'Arma - Lama rocciosa del Re Drago',
    "Incantation Spell - Placidusax's Ruin": 'Incantesimo - Rovina di Placidusax',
    'Remembrance of the Dragonlord': 'Rimembranza del Lord draconico',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Black+Blade">Remembrance of the Black Blade</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Black+Blade">Rimembranza della Lama Nera</a> (30.000 Rune)',
    "Weapon - Maliketh's Black Blade": 'Arma - Lama Nera di Maliketh',
    'Incantation Spell - Black Blade': 'Incantesimo - Lama Nera',
    'Remembrance of the Black Blade': 'Rimembranza della Lama Nera',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+Hoarah+Loux">Remembrance of Hoarah Loux</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+Hoarah+Loux">Rimembranza di Hoarah Loux</a> (30.000 Rune)',
    'Weapon - Axe Of Godfrey': 'Arma - Ascia di Godfrey',
    "Ash Of War - Hoarah Loux's Earthshaker": 'Cenere di guerra - Scuotiterra di Hoarah Loux',
    'Remembrance of Hoarah Loux': 'Rimembranza di Hoarah Loux',

    '<a href="https://eldenring.wiki.fextralife.com/Elden+Remembrance">Elden Remembrance</a> (50,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Elden+Remembrance">Rimembranza ancestrale</a> (50.000 Rune)',
    "Weapon - Marika's Hammer": 'Arma - Martello di Marika',
    'Weapon - Sacred Relic Sword': 'Arma - Spada della reliquia sacra',
    'Elden Remembrance': 'Rimembranza ancestrale',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Regal+Ancestor">Remembrance of the Regal Ancestor</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Regal+Ancestor">Rimembranza dell\'Antenato regale</a> (30.000 Rune)',
    'Weapon - Winged Greathorn': 'Arma - Corno maggiore alato',
    "Talisman - Ancestral Spirit's Horn": 'Talismano - Corno dello spirito ancestrale',
    'Remembrance of the Regal Ancestor': 'Rimembranza dell\'Antenato regale',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Blood+Lord">Remembrance of the Blood Lord</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Blood+Lord">Rimembranza del Signore del Sangue</a> (30.000 Rune)',
    'Incantation Spell - Bloodboon': 'Incantesimo - Dono del sangue',
    "Weapon - Mohgwyn's Sacred Spear": 'Arma - Lancia sacra di Mohgwyn',
    'Remembrance of the Blood Lord': 'Rimembranza del Signore del Sangue',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Naturalborn">Remembrance of the Naturalborn</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Naturalborn">Rimembranza del Figlio della progenie</a> (30.000 Rune)',
    "Weapon - Bastard's Stars": 'Arma - Stelle del reietto',
    'Ash Of War - Waves Of Darkness': "Cenere di guerra - Ondate d'oscurità",
    'Remembrance of the Naturalborn': 'Rimembranza del Figlio della progenie',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Lichdragon">Remembrance of the Lichdragon</a> (30,000 Runes)': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Lichdragon">Rimembranza del Drago della Morte</a> (30.000 Rune)',
    "Incantation Spell - Fortissax's Lightning Spear": 'Incantesimo - Lancia fulminante di Fortissax',
    'Incantation Spell - Death Lightning': 'Incantesimo - Fulmine della Morte',
    'Remembrance of the Lichdragon': 'Rimembranza del Drago della Morte',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Wild+Boar+Rider">Remembrance of the Wild Boar Rider</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Wild+Boar+Rider">Rimembranza del Cavaliere del cinghiale</a>',
    'Weapon: Sword Lance': 'Arma: Spada lancia',
    'Sorcery: Blades of Stone': 'Stregoneria: Lame di pietra',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Impaler">Remembrance of the Impaler</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Impaler">Rimembranza dell\'Impalatore</a>',
    'Weapon: Spear of the Impaler': "Arma: Lancia dell'Impalatore",
    "Incantation: Messmer's Orb": 'Incantesimo: Sfera di Messmer',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Shadow+Sunflower">Remembrance of the Shadow Sunflower</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Shadow+Sunflower">Rimembranza del Girasole ombra</a>',
    'Weapon: Shadow Sunflower Blossom': 'Arma: Fiore del Girasole ombra',
    'Incantation: Land of Shadow': 'Incantesimo: Terra delle ombre',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Twin+Moon+Knight">Remembrance of the Twin Moon Knight</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Twin+Moon+Knight">Rimembranza del Cavaliere delle Lune gemelle</a>',
    "Weapon: Rellana's Twin Blades": 'Arma: Spade gemelle di Rellana',
    "Sorcery: Rellana's Twin Moons": 'Stregoneria: Lune gemelle di Rellana',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Saint+of+the+Bud">Remembrance of the Saint of the Bud</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Saint+of+the+Bud">Rimembranza della Santa del bocciolo</a>',
    'Weapon: Poleblade of the Bud': 'Arma: Lama inastata del bocciolo',
    'Incantation: Rotten Butterflies': 'Incantesimo: Farfalle marcescenti',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Dancing+Lion">Remembrance of the Dancing Lion</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Dancing+Lion">Rimembranza del Leone danzante</a>',
    'Talisman: Enraged Divine Beast': 'Talismano: Bestia divina infuriata',
    'Ash of War: Divine Beast Frost Stomp': 'Cenere di Guerra: Pestone brinoso della Bestia divina',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+a+God+and+a+Lord">Remembrance of a God and a Lord</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+a+God+and+a+Lord">Rimembranza di un dio e di un lord</a>',
    'Weapon: Greatsword of Radahn (Lord)': 'Arma: Spadone di Radahn (Lord)',
    'Weapon: Greatsword of Radahn (Light)': 'Arma: Spadone di Radahn (Luce)',
    'Incantation: Light of Miquella': 'Incantesimo: Luce di Miquella',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Lord+of+Frenzied+Flame">Remembrance of the Lord of Frenzied Flame</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Lord+of+Frenzied+Flame">Rimembranza del Signore della Fiamma della frenesia</a>',
    'Weapon: Greatsword of Damnation': 'Arma: Spadone della dannazione',
    "Incantation: Midra's Flame of Frenzy": 'Incantesimo: Fiamma della frenesia di Midra',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Mother+of+Fingers">Remembrance of the Mother of Fingers</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+the+Mother+of+Fingers">Rimembranza della Madre delle Dita</a>',
    'Weapon: Staff of the Great Beyond': 'Arma: Bastone del Grande aldilà',
    'Weapon: Gazing Finger': 'Arma: Dito scrutatore',

    '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+Putrescence">Remembrance of Putrescence</a>': '<a href="https://eldenring.wiki.fextralife.com/Remembrance+of+Putrescence">Rimembranza della putrescenza</a>',
    'Weapon: Putrescence Cleaver': 'Arma: Mannaia della putrescenza',
    'Sorcery: Vortex of Putrescence': 'Stregoneria: Vortice di putrescenza',

    '<a href="https://eldenring.wiki.fextralife.com/Heart+of+Bayle">Heart of Bayle</a>': '<a href="https://eldenring.wiki.fextralife.com/Heart+of+Bayle">Cuore di Bayle</a>',
    "Incantation: Bayle's Flame Lightning": 'Incantesimo: Fulmine fiammante di Bayle',
    "Incantation: Bayle's Tyranny": 'Incantesimo: Tirannia di Bayle',

    # Sections
    'Remembrances': 'Rimembranze',
    'Wandering Mausoleums': 'Mausolei Erranti',

    # Mausoleums (map items / string contents)
    'Wandering Mausoleum': 'Mausoleo Errante',
    'Wandering Mausoleum (no bell)': 'Mausoleo Errante (senza campana)',
    'Weeping Peninsula - In the western area past the Church of Pilgrimage. The skulls are on its feet.': "Penisola del Pianto - Nell'area occidentale oltre la Chiesa del Pellegrinaggio. I teschi si trovano sulle sue zampe.",
    'Liurnia of the Lakes - Northeast of Raya Lucaria, in the waters in front of Raya Lucaria Crystal Tunnel Grace. The skulls are on top.': 'Liurnia lacustre - A nord-est di Raya Lucaria, nelle acque di fronte alla Grazia "Galleria di cristallo di Raya Lucaria". I teschi sono sulla parte superiore del guscio.',
    'Liurnia of the Lakes - One of two found around the Mausoleum Compound Grace in Uld Palace Ruins, north of the Church of Vows. <b>IMPORTANT - These only duplicate a limited amount of Remembrances.</b> Watch out for its hops. The skulls are on its feet.': 'Liurnia lacustre - Uno di due trovati attorno alla Grazia "Recinto del mausoleo" nelle Rovine del Palazzo di Uld, a nord della Chiesa dei Voti. <b>IMPORTANTE - Questi duplicano solo una quantità limitata di Rimembranze.</b> Attenzione ai suoi letali salti in aria. I teschi sono sulle sue zampe.',
    'Mountaintop of the Giants - Just outside Castle Sol in the northern area. The skulls are on its feet.': "Vette dei Giganti - Appena fuori da Castel Sol nell'area settentrionale. I teschi sono sulle sue zampe.",
    'Consecrated Snowfield - Northwest of Ordina, next to the Apostate Derelict Grace. Watch out for its murder rain. The skulls are on its feet.': 'Campo di neve consacrato - A nord-ovest di Ordina, vicino alla Grazia "Rudere del proselito". Attenzione alla sua intensa tempesta magica assassina. I teschi sono sulle sue zampe.',
    'Deeproot Depths - Near the The Nameless Eternal City Grace. The skulls are on top.': 'Abissi fra le radici - Vicino alla Grazia "Città Eterna Senza Nome". I teschi sono sulla parte superiore del guscio.',
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

with open('data/checklists/remembrances_it.yaml', 'w') as f:
    yaml.dump(d, f, Dumper=MyDumper, default_flow_style=False, sort_keys=False, allow_unicode=True)
