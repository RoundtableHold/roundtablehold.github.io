#!/usr/bin/env python3
"""Add title_it fields to armor.yaml with official Italian translations."""

TRANSLATIONS = {
    # Page title
    "Armor": "Armatura",
    # --- DLC: Shadow of the Erdtree ---
    "Dane's Set": "Set di Dane",
    "Gaius's Set": "Set di Gaio",
    "Oathseeker Knight Set": "Set del Cavaliere Cercagiuramento",
    "Leda's Armor": "Armatura di Leda",
    "Verdigris Set": "Set Verderame",
    "Iron Rivet Set": "Set a Rivetti di Ferro",
    "Thiollier's Set": "Set di Thiollier",
    "High Priest Set": "Set dell'Alto Sacerdote",
    "Hornsent Set": "Set di Hornsent",
    "Dancer's Set": "Set della Danzatrice",
    "Night Set": "Set della Notte",
    "Igon's Set": "Set di Igon",
    "Ansbach's Set": "Set di Ansbach",
    "Freyja's Set": "Set di Freyja",
    "Solitude Set": "Set della Solitudine",
    "Messmer Soldier Set": "Set del Soldato di Messmer",
    "Black Knight Set": "Set del Cavaliere Nero",
    "Rakshasa Set": "Set di Rakshasa",
    "Fire Knight Set": "Set del Cavaliere del Fuoco",
    "Death Mask Helm": "Elmo Maschera della Morte",
    "Winged Serpent Helm": "Elmo del Serpente Alato",
    "Salza's Hood": "Cappuccio di Salza",
    "Highland Warrior Set": "Set del Guerriero degli Altopiani",
    "Death Knight Set": "Set del Cavaliere della Morte",
    "Ascetic's Set": "Set dell'Asceta",
    "Messmer's Set": "Set di Messmer",
    "Gravebird Set": "Set dell'Uccello Sepolcrale",
    "Common Soldier Set": "Set del Soldato Comune",
    "Horned Warrior Set": "Set del Guerriero Cornuto",
    "Divine Beast Set": "Set della Bestia Divina",
    "Divine Bird Set": "Set dell'Uccello Divino",
    "Rellana's Set": "Set di Rellana",
    "Young Lion's Set": "Set del Giovane Leone",
    "Circlet of Light": "Cerchietto della Luce",
    "Shadow Militiaman Set": "Set del Miliziano Ombra",
    "Divine Beast Head": "Testa della Bestia Divina",
    "St. Trina's Blossom": "Fiore di St. Trina",
    "Crucible Hammer-Helm": "Elmo a Martello del Crogiolo",
    "Greatjar": "Gran Vaso",
    "Imp Head (Lion)": "Testa di Imp (Leone)",
    # --- Base Game ---
    "Traveler's Set (No Helmet)": "Set del Viandante (senza elmo)",
    "Commoner's Set": "Set del Popolano",
    "Aristocrat Set": "Set dell'Aristocratico",
    "Old Aristocrat Set (No Gloves)": "Set del Vecchio Aristocratico (senza guanti)",
    "Page Set (No Gloves)": "Set del Paggio (senza guanti)",
    "High Page Set (No Gloves)": "Set dell'Alto Paggio (senza guanti)",
    "Guardian Set": "Set del Guardiano",
    "Festive Set (No Gloves or Legs)": "Set Festivo (senza guanti né gambali)",
    "Blue Festive Set (No Gloves or Legs)": "Set Festivo Azzurro (senza guanti né gambali)",
    "Guilty Set (No Gloves)": "Set del Colpevole (senza guanti)",
    "Prisoner Set (No Gloves)": "Set del Prigioniero (senza guanti)",
    "Blackguard's Iron Mask (Helmet Only)": "Maschera di Ferro di Blackguard (solo elmo)",
    "Bloodsoaked Set (No Legs)": "Set Insanguinato (senza gambali)",
    "Black Dumpling (Helmet Only)": "Gnocco Nero (solo elmo)",
    "Mushroom Set": "Set del Fungo",
    "Astrologer Set": "Set dell'Astrologo",
    "Juvenile Scholar Set (No Gloves or Legs)": "Set del Giovane Studioso (senza guanti né gambali)",
    "Raya Lucarian Sorcerer Set": "Set dello Stregone di Raya Lucaria",
    "Lazuli Sorcerer Set": "Set dello Stregone Lazuli",
    "Battlemage Set": "Set del Mago Guerriero",
    "Errant Sorcerer Set": "Set dello Stregone Errante",
    "Spellblade Set": "Set di Spellblade",
    "Alberich's Set": "Set di Alberich",
    "Preceptor's Set": "Set del Precettore",
    "Mask of Confidence (Helmet Only)": "Maschera della Sicurezza (solo elmo)",
    "Azur's Glintstone Set (No Legs)": "Set di Glintstone di Azur (senza gambali)",
    "Lusat's Glintstone Set": "Set di Glintstone di Lusat",
    "Queen of the Full Moon Set": "Set della Regina della Luna Piena",
    "Snow Witch Set (No Gloves)": "Set della Strega della Neve (senza guanti)",
    "Fia's Set (No Gloves or Legs)": "Set di Fia (senza guanti né gambali)",
    "Deathbed Dress (Chest Only)": "Abito del Letto di Morte (solo busto)",
    "Prophet Set (No Gloves)": "Set del Profeta (senza guanti)",
    "Corhyn's Robe (Chest Only)": "Veste di Corhyn (solo busto)",
    "Traveling Maiden Set": "Set della Donzella Viaggiatrice",
    "Finger Maiden Set (No Gloves)": "Set della Donzella delle Dita (senza guanti)",
    "Sage Set (No Gloves)": "Set del Saggio (senza guanti)",
    "Greathood (Helmet Only)": "Gran Cappuccio (solo elmo)",
    "Goldmask's Set": "Set di Goldmask",
    "Perfumer Set": "Set del Profumiere",
    "Perfumer Traveler's Set": "Set del Profumiere Viaggiatore",
    "Depraved Perfumer Set": "Set del Profumiere Depravato",
    "Upper-Class Robe (Chest Only)": "Veste dell'Alta Classe (solo busto)",
    "Ruler's Set (No Gloves or Legs)": "Set del Sovrano (senza guanti né gambali)",
    "Consort's Set (No Gloves)": "Set del Consorte (senza guanti)",
    "House Marais Set (No Gloves or Legs)": "Set della Casa Marais (senza guanti né gambali)",
    "Fur Set (No Gloves)": "Set di Pelliccia (senza guanti)",
    "Shaman Set (No Gloves)": "Set dello Sciamano (senza guanti)",
    "Godskin Apostle Set": "Set dell'Apostolo della Pelle Divina",
    "Godskin Noble Set": "Set del Nobile della Pelle Divina",
    "Fell Omen Cloak (Chest Only)": "Mantello del Presagio Oscuro (solo busto)",
    "Sanguine Noble Set (No Gloves)": "Set del Nobile Sanguineo (senza guanti)",
    "Lord of Blood's Robes (Chest Only)": "Vesti del Signore del Sangue (solo busto)",
    "Scarab Masks": "Maschere Scarabeo",
    "Imp Heads": "Teste di Imp",
    "Nox Mirrorhelm (Helmet Only)": "Elmo Specchio Nox (solo elmo)",
    "Iji's Mirrorhelm (Helmet Only)": "Elmo Specchio di Iji (solo elmo)",
    "Silver Tear Mask (Helmet Only)": "Maschera della Lacrima d'Argento (solo elmo)",
    "Envoy Crown (Helmet Only)": "Corona dell'Ambasciatore (solo elmo)",
    "Octopus Head (Helmet Only)": "Testa di Polpo (solo elmo)",
    "Jar (Helmet Only)": "Vaso (solo elmo)",
    "Albinauric Set (No Gloves or Legs)": "Set degli Albinauric (senza guanti né gambali)",
    "Leather Set": "Set di Cuoio",
    "Blue Cloth Set": "Set di Panno Blu",
    "Noble's Set": "Set del Nobile",
    "War Surgeon Set": "Set del Chirurgo di Guerra",
    "Nomadic Merchant's Set (No Gloves)": "Set del Mercante Nomade (senza guanti)",
    "Bandit Set": "Set del Bandito",
    "Confessor Set": "Set del Confessore",
    "Omenkiller Set": "Set dell'Uccisore di Presagi",
    "Raptor's Set": "Set del Rapace",
    "Godrick Foot Soldier Set": "Set del Fante di Godrick",
    "Raya Lucarian Foot Soldier Set": "Set del Fante di Raya Lucaria",
    "Radahn Foot Soldier Set": "Set del Fante di Radahn",
    "Leyndell Foot Soldier Set": "Set del Fante di Leyndell",
    "Haligtree Foot Soldier Set": "Set del Fante dell'Albero Santo",
    "Mausoleum Foot Soldier Set": "Set del Fante del Mausoleo",
    "Highwayman Set": "Set del Brigante",
    "Vulgar Militia Set": "Set della Milizia Volgare",
    "Duelist Set (No Gloves)": "Set del Duelista (senza guanti)",
    "Rotten Duelist Set (No Gloves)": "Set del Duelista Marcio (senza guanti)",
    "Nox Monk Set": "Set del Monaco Nox",
    "Nox Swordstress Set": "Set della Spadaccina Nox",
    "Night Maiden Set": "Set della Fanciulla della Notte",
    "Champion Set": "Set del Campione",
    "Chain Set": "Set a Maglia",
    "Iron Set": "Set di Ferro",
    "Godrick Soldier Set": "Set del Soldato di Godrick",
    "Raya Lucarian Soldier Set": "Set del Soldato di Raya Lucaria",
    "Radahn Soldier Set": "Set del Soldato di Radahn",
    "Leyndell Soldier Set": "Set del Soldato di Leyndell",
    "Haligtree Set": "Set dell'Albero Santo",
    "Mausoleum Soldier Set (No Helmet)": "Set del Soldato del Mausoleo (senza elmo)",
    "Exile Set": "Set dell'Esiliato",
    "Kaiden Set": "Set di Kaiden",
    "Land of Reeds Set": "Set della Terra dei Giunchi",
    "White Reed Set": "Set del Giunco Bianco",
    "Ronin's Set": "Set del Ronin",
    "Eccentric Set": "Set dell'Eccentrico",
    "Marionette Soldier Set (No Gloves or Legs)": "Set del Soldato Marionetta (senza guanti né gambali)",
    "Blue Silver Set": "Set Blu-Argento",
    "Fire Monk Set": "Set del Monaco del Fuoco",
    "Blackflame Set": "Set della Fiamma Nera",
    "Zamor Set": "Set di Zamor",
    "Black Knife Set": "Set del Coltello Nero",
    "Malenia's Set": "Set di Malenia",
    "Elden Lord Set": "Set di Elden Lord",
    "Knight Set": "Set del Cavaliere",
    "Vagabond Knight Set": "Set del Cavaliere Vagabondo",
    "Greathelm (Helmet Only)": "Gran Elmo (solo elmo)",
    "Carian Knight Set": "Set del Cavaliere di Caria",
    "Godrick Knight Set": "Set del Cavaliere di Godrick",
    "Cuckoo Knight Set": "Set del Cavaliere del Cuculo",
    "Redmane Knight Set": "Set del Cavaliere Criniera Rossa",
    "Gelmir Knight Set": "Set del Cavaliere di Gelmir",
    "Leyndell Knight Set": "Set del Cavaliere di Leyndell",
    "Haligtree Knight Set": "Set del Cavaliere dell'Albero Santo",
    "Mausoleum Knight Set (No Helmet)": "Set del Cavaliere del Mausoleo (senza elmo)",
    "Bloodhound Knight Set": "Set del Cavaliere Segugio",
    "Cleanrot Set": "Set Cleanrot",
    "Raging Wolf Set": "Set del Lupo Furioso",
    "Hoslow's Set": "Set di Hoslow",
    "Twinned Set": "Set Gemellato",
    "Drake Knight Set": "Set del Cavaliere del Drago",
    "Blaidd's Set": "Set di Blaidd",
    "Briar Set": "Set dei Rovi",
    "Fingerprint Set": "Set dell'Impronta",
    "Royal Remains Set": "Set dei Resti Regali",
    "All-Knowing Set": "Set dell'Onnisciente",
    "Royal Knight Set": "Set del Cavaliere Reale",
    "Maliketh's Set": "Set di Maliketh",
    "Banished Knight Set": "Set del Cavaliere Bandito",
    "Night's Cavalry Set": "Set della Cavalleria Notturna",
    "Veteran's Set": "Set del Veterano",
    "Scaled Set": "Set Squamato",
    "Beast Champion Set": "Set del Campione Bestiale",
    "Tree Sentinel Set": "Set della Sentinella dell'Albero",
    "Malformed Dragon Set": "Set del Drago Deforme",
    "Crucible Axe Set": "Set dell'Ascia del Crogiolo",
    "Crucible Tree Set": "Set dell'Albero del Crogiolo",
    "General Radahn's Set": "Set del Generale Radahn",
    "Lionel's Set": "Set di Lionel",
    "Bull-Goat Set": "Set del Capro-Toro",
    "Omen Set": "Set del Presagio",
    "Fire Prelate's Set": "Set del Prelato del Fuoco",
    "Pumpkin Helm (Helmet Only)": "Elmo Zucca (solo elmo)",
}

import re

with open('data/checklists/armor.yaml', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
missing = []

for line in lines:
    new_lines.append(line)
    # Match top-level title (no leading spaces/dash)
    m = re.match(r'^(title): (.+)\n', line)
    if m:
        val = m.group(2).strip()
        it = TRANSLATIONS.get(val)
        if it:
            new_lines.append(f'title_it: {it}\n')
        elif val != 'Armor':  # Armor is already handled
            missing.append(val)
        continue
    # Match section title lines: "- title: ..."
    m = re.match(r'^(- title): (.+)\n', line)
    if m:
        val = m.group(2).strip()
        it = TRANSLATIONS.get(val)
        if it:
            new_lines.append(f'  title_it: {it}\n')
        else:
            missing.append(val)

with open('data/checklists/armor.yaml', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

if missing:
    print(f"WARNING: {len(missing)} untranslated titles:")
    for m in missing:
        print(f"  - {m}")
else:
    print(f"Done. All titles translated.")
