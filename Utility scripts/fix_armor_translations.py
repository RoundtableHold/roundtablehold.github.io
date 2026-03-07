#!/usr/bin/env python3
"""
Script to fix Italian translations in data/checklists/armor.yaml.
Applies corrections to data_it fields using official Elden Ring Italian naming conventions.
"""

import re
import sys

# ─────────────────────────────────────────────────────────────────────────────
# LOOKUP TABLE: wrong Italian → correct Italian (for link text inside <a> tags)
# ─────────────────────────────────────────────────────────────────────────────

ITEM_NAME_FIXES = {
    # ── DLC Sets ──────────────────────────────────────────────────────────────

    # Dane's Set
    "Cappello di Dane": "Cappello di Dane",  # OK

    # Dryleaf / Dane's Set
    "Dryleaf Veste": "Veste Dryleaf",
    "Dryleaf Fasce da braccio": "Fasce da braccio Dryleaf",
    "Dryleaf Cuissardes": "Dryleaf Cuissardes",  # no good Italian for cuissardes
    "Dryleaf Veste (Alterata)": "Veste Dryleaf (Alterata)",

    # Oathseeker Knight Set – "Oathseeker Knight" stays as proper name,
    # but the piece type goes first in Italian word order
    "Oathseeker Knight Elmo": "Elmo del Cavaliere Oathseeker",
    "Oathseeker Knight Guanti": "Guantoni del Cavaliere Oathseeker",
    "Oathseeker Knight Gambali": "Gambali del Cavaliere Oathseeker",
    "Oathseeker Knight Armatura": "Armatura del Cavaliere Oathseeker",

    # Verdigris Set (Verdigris = Verderame, but often kept as proper name)
    "Verdigris Elmo": "Elmo Verderame",
    "Verdigris Armatura": "Armatura Verderame",
    "Verdigris Guanti": "Guantoni Verderame",
    "Verdigris Gambali": "Gambali Verderame",

    # Iron Rivet Set
    "Pelt di Ralva": "Pelle di Ralva",
    "Iron Rivet Armatura": "Armatura Iron Rivet",
    "Iron Rivet Guanti": "Guantoni Iron Rivet",
    "Iron Rivet Gambali": "Gambali Iron Rivet",
    "Fang Elmo": "Elmo della Zanna",

    # Thiollier's Set
    "Abito (Alterata) di Thiollier": "Abito di Thiollier (Alterato)",

    # High Priest Set
    "High Priest Cappello": "Cappello dell'Alto Sacerdote",
    "High Priest Veste": "Veste dell'Alto Sacerdote",
    "High Priest Guanti": "Guanti dell'Alto Sacerdote",
    "High Priest Undergarments": "Indumenti dell'Alto Sacerdote",
    "Finger Veste": "Veste del Dito",

    # Hornsent Set
    "Caterpillar Maschera": "Maschera del Bruco",
    "Braided Cord Veste": "Veste con Corde Intrecciate",
    "Braided Fasce da braccio": "Fasce da braccio Intrecciate",
    "Soiled Loincloth": "Perizoma Sporco",

    # Dancer's Set
    "Cappuccio di Dancer": "Cappuccio della Danzatrice",
    "Veste di Dancer": "Veste della Danzatrice",
    "Bracer di Dancer": "Bracciale della Danzatrice",
    "Pantaloni di Dancer": "Pantaloni della Danzatrice",
    "Veste (Alterata) di Dancer": "Veste della Danzatrice (Alterata)",

    # Night Set
    "Elmo di Night": "Elmo della Notte",
    "Armatura di Night": "Armatura della Notte",
    "Guanti di Night": "Guantoni della Notte",
    "Gambali di Night": "Gambali della Notte",

    # Ansbach's Set
    "Maschera di Wise Man": "Maschera del Saggio",
    "Abito (Alterata) di Ansbach": "Abito di Ansbach (Alterato)",

    # Freyja's Set – altered gender fix
    "Armatura (Alterata) di Freyja": "Armatura di Freyja (Alterata)",

    # Solitude Set
    "Elmo di Solitude": "Elmo della Solitudine",
    "Armatura di Solitude": "Armatura della Solitudine",
    "Guanti di Solitude": "Guantoni della Solitudine",
    "Gambali di Solitude": "Gambali della Solitudine",
    "Armatura di Solitude (Alterata)": "Armatura della Solitudine (Alterata)",

    # Messmer Soldier Set
    "Messmer Soldier Elmo": "Elmo del Soldato di Messmer",
    "Messmer Soldier Armatura": "Armatura del Soldato di Messmer",
    "Messmer Soldier Guanti": "Guantoni del Soldato di Messmer",
    "Messmer Soldier Gambali": "Gambali del Soldato di Messmer",
    "Messmer Soldier Armatura (Alterata)": "Armatura del Soldato di Messmer (Alterata)",

    # Black Knight Set
    "Black Knight Elmo": "Elmo del Cavaliere Nero",
    "Black Knight Armatura": "Armatura del Cavaliere Nero",
    "Black Knight Guanti": "Guantoni del Cavaliere Nero",
    "Black Knight Gambali": "Gambali del Cavaliere Nero",

    # Rakshasa Set
    "Rakshasa Elmo": "Elmo di Rakshasa",
    "Rakshasa Armatura": "Armatura di Rakshasa",
    "Rakshasa Guanti": "Guantoni di Rakshasa",
    "Rakshasa Gambali": "Gambali di Rakshasa",

    # Fire Knight Set
    "Fire Knight Elmo": "Elmo del Cavaliere del Fuoco",
    "Fire Knight Armatura": "Armatura del Cavaliere del Fuoco",
    "Fire Knight Guanti": "Guantoni del Cavaliere del Fuoco",
    "Fire Knight Gambali": "Gambali del Cavaliere del Fuoco",
    "Fire Knight Armatura (Alterata)": "Armatura del Cavaliere del Fuoco (Alterata)",

    # Death Mask Helm
    "Death Maschera Elmo": "Elmo-Maschera della Morte",

    # Winged Serpent Helm
    "Winged Serpent Elmo": "Elmo del Serpente Alato",

    # Highland Warrior Set
    "Leather Fascia": "Fascia di Cuoio",
    "Gloried Abito": "Abito Glorioso",
    "Leather Fasce da braccio": "Fasce da braccio di Cuoio",
    "Leather Fasce per le gambe": "Fasce per le gambe di Cuoio",
    "Leather Crown": "Corona di Cuoio",
    "Highland Abito": "Abito degli Altopiani",

    # Death Knight Set
    "Death Knight Elmo": "Elmo del Cavaliere della Morte",
    "Death Knight Armatura": "Armatura del Cavaliere della Morte",
    "Death Knight Guanti": "Guantoni del Cavaliere della Morte",
    "Death Knight Gambali": "Gambali del Cavaliere della Morte",

    # Ascetic's Set
    "Curseblade Maschera": "Maschera della Lama Maledetta",
    "Loincloth di Ascetic": "Perizoma dell'Asceta",
    "Wrist Guards di Ascetic": "Polsiere dell'Asceta",
    "Ankle Guards di Ascetic": "Cavigliere dell'Asceta",

    # Messmer's Set
    "Elmo (Alterata) di Messmer": "Elmo di Messmer (Alterato)",

    # Gravebird Set
    "Gravebird Elmo": "Elmo dell'Uccello Sepolcrale",
    "Blackquill Armatura di Gravebird": "Armatura con Piume Nere dell'Uccello Sepolcrale",
    "Gravebird Bracelets": "Bracciali dell'Uccello Sepolcrale",
    "Gravebird Anklets": "Cavigliere dell'Uccello Sepolcrale",
    "Gravebird Armatura": "Armatura dell'Uccello Sepolcrale",

    # Common Soldier Set
    "Common Soldier Elmo": "Elmo del Soldato Comune",
    "Common Soldier Cloth Armatura": "Armatura di Tessuto del Soldato Comune",
    "Common Soldier Guanti": "Guantoni del Soldato Comune",
    "Common Soldier Gambali": "Gambali del Soldato Comune",

    # Horned Warrior Set
    "Horned Warrior Elmo": "Elmo del Guerriero Cornuto",
    "Horned Warrior Armatura": "Armatura del Guerriero Cornuto",
    "Horned Warrior Guanti": "Guantoni del Guerriero Cornuto",
    "Horned Warrior Gambali": "Gambali del Guerriero Cornuto",

    # Divine Beast Set
    "Divine Beast Elmo": "Elmo della Bestia Divina",
    "Divine Beast Warrior Armatura": "Armatura del Guerriero Bestia Divina",

    # Divine Bird Set
    "Divine Bird Elmo": "Elmo dell'Uccello Divino",
    "Divine Bird Warrior Armatura": "Armatura del Guerriero Uccello Divino",
    "Divine Bird Warrior Guanti": "Guantoni del Guerriero Uccello Divino",
    "Divine Bird Warrior Gambali": "Gambali del Guerriero Uccello Divino",

    # Young Lion's Set
    "Elmo di Young Lion": "Elmo del Giovane Leone",
    "Armatura di Young Lion": "Armatura del Giovane Leone",
    "Guanti di Young Lion": "Guantoni del Giovane Leone",
    "Gambali di Young Lion": "Gambali del Giovane Leone",
    "Armatura (Alterata) di Young Lion": "Armatura del Giovane Leone (Alterata)",

    # Circlet of Light
    "Circlet di Light": "Cerchietto della Luce",

    # Shadow Militiaman Set
    "Shadow Militiaman Elmo": "Elmo del Miliziano Ombra",
    "Shadow Militiaman Armatura": "Armatura del Miliziano Ombra",
    "Shadow Militiaman Guanti": "Guantoni del Miliziano Ombra",
    "Shadow Militiaman Gambali": "Gambali del Miliziano Ombra",

    # Divine Beast Head
    "Divine Beast Head": "Testa della Bestia Divina",

    # Crucible Hammer-Helm
    "Crucible Hammer-Elmo": "Elmo a Martello del Crogiolo",

    # Igon's Set – altered fix
    "Elmo (Alterata) di Igon": "Elmo di Igon (Alterato)",
    "Armatura (Alterata) di Igon": "Armatura di Igon (Alterata)",
    "Loincloth di Igon": "Perizoma di Igon",

    # ── Base Game Sets ─────────────────────────────────────────────────────────

    # Traveler's Set
    "Clothes di Traveler": "Vesti del Viandante",
    "Manchettes di Traveler": "Mancette del Viandante",
    "Stivali di Traveler": "Stivali del Viandante",

    # Commoner's Set
    "Fascia di Commoner": "Fascia del Popolano",
    "Fascia (Alterata) di Commoner": "Fascia del Popolano (Alterata)",
    "Abito di Commoner": "Abito del Popolano",
    "Simple Abito di Commoner": "Abito Semplice del Popolano",
    "Scarpe di Commoner": "Scarpe del Popolano",

    # Aristocrat Set
    "Aristocrat Fascia": "Fascia dell'Aristocratico",
    "Aristocrat Cappello": "Cappello dell'Aristocratico",
    "Aristocrat Abito": "Abito dell'Aristocratico",
    "Aristocrat Abito (Alterata)": "Abito dell'Aristocratico (Alterato)",
    "Aristocrat Coat": "Soprabito dell'Aristocratico",
    "Aristocrat Stivali": "Stivali dell'Aristocratico",

    # Old Aristocrat Set
    "Old Aristocrat Cowl": "Cappuccio del Vecchio Aristocratico",
    "Old Aristocrat Gown": "Veste del Vecchio Aristocratico",
    "Old Aristocrat Scarpe": "Scarpe del Vecchio Aristocratico",

    # Page Set
    "Page Cappuccio": "Cappuccio del Paggio",
    "Page Abito": "Abito del Paggio",
    "Page Pantaloni": "Pantaloni del Paggio",

    # High Page Set
    "High Page Cappuccio": "Cappuccio dell'Alto Paggio",
    "High Page Clothes": "Abito dell'Alto Paggio",

    # Guardian Set
    "Guardian Maschera": "Maschera del Guardiano",
    "Guardian Abito": "Abito del Guardiano",
    "Guardian Abito (Full Bloom)": "Abito del Guardiano (in Piena Fioritura)",
    "Guardian Bracers": "Bracciali del Guardiano",
    "Guardian Gambali": "Gambali del Guardiano",

    # Festive Set
    "Festive Cappuccio": "Cappuccio Festivo",
    "Festive Abito": "Abito Festivo",
    "Festive Abito (Alterata)": "Abito Festivo (Alterato)",

    # Blue Festive Set
    "Blue Festive Cappuccio": "Cappuccio Festivo Azzurro",
    "Blue Festive Abito": "Abito Festivo Azzurro",

    # Guilty Set
    "Guilty Cappuccio": "Cappuccio del Colpevole",
    "Cloth Abito": "Abito di Panno",
    "Cloth Pantaloni": "Pantaloni di Panno",

    # Prisoner Set
    "Prisoner Iron Maschera": "Maschera di Ferro del Prigioniero",
    "Prisoner Clothing": "Abito del Prigioniero",
    "Prisoner Pantaloni": "Pantaloni del Prigioniero",

    # Blackguard's Iron Mask
    "Iron Maschera di Blackguard": "Maschera di Ferro del Guardiaccia",

    # Bloodsoaked Set
    "Bloodsoaked Maschera": "Maschera Insanguinata",
    "Abito di Official": "Abito del Funzionario",
    "Bloodsoaked Manchettes": "Mancette Insanguinate",

    # Astrologer Set
    "Astrologer Cappuccio": "Cappuccio dell'Astrologo",
    "Astrologer Veste": "Veste dell'Astrologo",
    "Astrologer Guanti": "Guanti dell'Astrologo",
    "Astrologer Pantaloni": "Pantaloni dell'Astrologo",

    # Lazuli Sorcerer Set
    "Lazuli Glintstone Crown": "Corona di Glintstone di Lazuli",
    "Lazuli Veste": "Veste di Lazuli",

    # Raya Lucarian Sorcerer Set
    "Glintstone Crown di Witch": "Corona di Glintstone della Strega",
    "Raya Lucarian Veste": "Veste di Raya Lucaria",
    "Sorcerer Manchettes": "Mancette dello Stregone",
    "Sorcerer Leggings": "Gambali dello Stregone",
    "Juvenile Scholar Veste": "Veste del Giovane Studioso",

    # Battlemage Set
    "Battlemage Veste": "Veste del Mago Guerriero",
    "Battlemage Manchettes": "Mancette del Mago Guerriero",
    "Battlemage Fasce per le gambe": "Fasce per le gambe del Mago Guerriero",

    # Errant Sorcerer Set
    "Errant Sorcerer Veste": "Veste dello Stregone Errante",
    "Errant Sorcerer Manchettes": "Mancette dello Stregone Errante",
    "Errant Sorcerer Stivali": "Stivali dello Stregone Errante",

    # Spellblade Set
    "Pointed Cappello di Spellblade": "Cappello Appuntito del Lama-Incantesimo",
    "Traveling Abito di Spellblade": "Abito da Viaggio del Lama-Incantesimo",

    # Alberich's Set
    "Pointed Cappello di Alberich": "Cappello Appuntito di Alberich",
    "Bracers di Alberich": "Bracciali di Alberich",

    # Preceptor's Set
    "Big Cappello di Preceptor": "Grande Cappello del Precettore",
    "Long Gown di Preceptor": "Veste Lunga del Precettore",
    "Guanti di Preceptor": "Guanti del Precettore",
    "Pantaloni di Preceptor": "Pantaloni del Precettore",

    # Mask of Confidence
    "Maschera di Confidence": "Maschera della Fiducia",

    # Azur's / Lusat's sets
    "Glintstone Crown di Azur": "Corona di Glintstone di Azur",
    "Glintstone Veste di Azur": "Veste di Glintstone di Azur",
    "Manchettes di Azur": "Mancette di Azur",
    "Glintstone Crown di Lusat": "Corona di Glintstone di Lusat",
    "Manchettes di Lusat": "Mancette di Lusat",
    "Fasce per le gambe di Old Sorcerer": "Fasce per le gambe del Vecchio Stregone",

    # Queen of the Full Moon Set
    "Crescent Crown di Queen": "Corona a Mezzaluna della Regina",
    "Veste di Queen": "Veste della Regina",
    "Bracelets di Queen": "Bracciali della Regina",
    "Leggings di Queen": "Leggings della Regina",

    # Snow Witch Set
    "Snow Witch Cappello": "Cappello della Strega della Neve",
    "Snow Witch Veste": "Veste della Strega della Neve",
    "Snow Witch Skirt": "Gonna della Strega della Neve",

    # Deathbed Dress
    "Deathbed Veste": "Veste del Letto Funebre",

    # Prophet Set
    "Prophet Blindfold": "Benda del Profeta",
    "Prophet Veste": "Veste del Profeta",
    "Prophet Pantaloni": "Pantaloni del Profeta",

    # Traveling Maiden Set
    "Traveling Maiden Cappuccio": "Cappuccio della Fanciulla Viaggiatrice",
    "Traveling Maiden Veste": "Veste della Fanciulla Viaggiatrice",
    "Traveling Maiden Guanti": "Guanti della Fanciulla Viaggiatrice",
    "Traveling Maiden Stivali": "Stivali della Fanciulla Viaggiatrice",

    # Finger Maiden Set
    "Finger Maiden Fillet": "Nastro della Fanciulla delle Dita",
    "Finger Maiden Veste": "Veste della Fanciulla delle Dita",
    "Finger Maiden Scarpe": "Scarpe della Fanciulla delle Dita",

    # Sage Set
    "Sage Cappuccio": "Cappuccio del Saggio",
    "Sage Veste": "Veste del Saggio",
    "Sage Pantaloni": "Pantaloni del Saggio",

    # Goldmask's Set
    "Radiant Gold Maschera": "Maschera d'Oro Radiante",
    "Rags di Goldmask": "Stracci di Goldmask",
    "Gold Bracelets": "Bracciali d'Oro",
    "Gold Waistwrap": "Fascia da Vita d'Oro",

    # Perfumer Set
    "Perfumer Cappuccio": "Cappuccio del Profumiere",
    "Perfumer Veste": "Veste del Profumiere",
    "Perfumer Guanti": "Guanti del Profumiere",
    "Perfumer Sarong": "Sarong del Profumiere",

    # Perfumer Traveler's Set
    "Cappello di Traveler": "Cappello del Viandante",
    "Traveling Abito di Perfumer": "Abito da Viaggio del Profumiere",
    "Guanti di Traveler": "Guanti del Viandante",
    "Slops di Traveler": "Calzoni del Viandante",

    # Depraved Perfumer Set
    "Depraved Perfumer Headscarf": "Foulard del Profumiere Depravato",
    "Depraved Perfumer Veste": "Veste del Profumiere Depravato",
    "Depraved Perfumer Guanti": "Guanti del Profumiere Depravato",
    "Depraved Perfumer Pantaloni": "Pantaloni del Profumiere Depravato",

    # Upper-Class Robe
    "Upper-Class Veste": "Veste dell'Alta Borghesia",

    # Ruler's Set
    "Maschera di Ruler": "Maschera del Sovrano",
    "Veste di Ruler": "Veste del Sovrano",

    # Consort's Set
    "Maschera di Consort": "Maschera del Consorte",
    "Veste di Consort": "Veste del Consorte",
    "Pantaloni di Consort": "Pantaloni del Consorte",

    # House Marais Set
    "Marais Maschera": "Maschera di Marais",
    "Marais Veste": "Veste di Marais",

    # Fur Set
    "Great Horned Fascia": "Fascia con Grande Corno",
    "Fur Raiment": "Veste di Pelliccia",
    "Fur Leggings": "Gambali di Pelliccia",

    # Shaman Set
    "Shining Horned Fascia": "Fascia con Corno Luminoso",
    "Shaman Furs": "Pellicce dello Sciamano",
    "Shaman Leggings": "Gambali dello Sciamano",

    # Godskin Apostle Set
    "Godskin Apostle Cappuccio": "Cappuccio dell'Apostolo della Pelle Divina",
    "Godskin Apostle Veste": "Veste dell'Apostolo della Pelle Divina",
    "Godskin Apostle Bracelets": "Bracciali dell'Apostolo della Pelle Divina",
    "Godskin Apostle Pantaloni": "Pantaloni dell'Apostolo della Pelle Divina",

    # Godskin Noble Set
    "Godskin Noble Cappuccio": "Cappuccio del Nobile della Pelle Divina",
    "Godskin Noble Veste": "Veste del Nobile della Pelle Divina",
    "Godskin Noble Bracelets": "Bracciali del Nobile della Pelle Divina",
    "Godskin Noble Pantaloni": "Pantaloni del Nobile della Pelle Divina",

    # Fell Omen Cloak
    "Fell Omen Mantello": "Mantello del Presagio Funesto",

    # Sanguine Noble Set
    "Sanguine Noble Cappuccio": "Cappuccio del Nobile Sanguinario",
    "Sanguine Noble Veste": "Veste del Nobile Sanguinario",
    "Sanguine Noble Waistcloth": "Fascia da Vita del Nobile Sanguinario",

    # Lord of Blood's Robe
    "Veste di Lord di Blood": "Veste del Lord del Sangue",

    # Scarab Masks
    "Ash-di-War Scarab": "Scarabeo della Cenere di Guerra",

    # Silver Tear Mask
    "Silver Tear Maschera": "Maschera della Lacrima d'Argento",

    # Albinauric Set
    "Albinauric Maschera": "Maschera dell'Albinaurico",

    # Leather Set
    "Black Cappuccio": "Cappuccio Nero",
    "Leather Armatura": "Armatura di Cuoio",
    "Leather Guanti": "Guanti di Cuoio",
    "Leather Stivali": "Stivali di Cuoio",

    # Blue Cloth Set
    "Warrior Guanti": "Guantoni del Guerriero",
    "Warrior Gambali": "Gambali del Guerriero",

    # Noble's Set
    "Crimson Cappuccio": "Cappuccio Cremisi",
    "Navy Cappuccio": "Cappuccio Blu Marino",
    "Traveling Abito di Noble": "Abito da Viaggio del Nobile",
    "Guanti di Noble": "Guanti del Nobile",
    "Pantaloni di Noble": "Pantaloni del Nobile",

    # War Surgeon Set
    "White Maschera": "Maschera Bianca",
    "War Surgeon Gown": "Veste del Chirurgo di Guerra",
    "War Surgeon Guanti": "Guanti del Chirurgo di Guerra",
    "War Surgeon Pantaloni": "Pantaloni del Chirurgo di Guerra",

    # Nomadic Merchant's Set
    "Chapeau di Nomadic Merchant": "Chapeau del Mercante Nomade",
    "Finery di Nomadic Merchant": "Abito Elegante del Mercante Nomade",
    "Pantaloni di Nomadic Merchant": "Pantaloni del Mercante Nomade",

    # Bandit Set
    "Bandit Maschera": "Maschera del Bandito",
    "Bandit Abito": "Abito del Bandito",
    "Bandit Manchettes": "Mancette del Bandito",
    "Bandit Stivali": "Stivali del Bandito",

    # Confessor Set
    "Confessor Cappuccio": "Cappuccio del Confessore",
    "Confessor Armatura": "Armatura del Confessore",
    "Confessor Guanti": "Guanti del Confessore",
    "Confessor Stivali": "Stivali del Confessore",

    # Omenkiller Set
    "Omensmirk Maschera": "Maschera Smorfia dell'Omen",
    "Omenkiller Veste": "Veste dell'Uccisore di Omen",
    "Omenkiller Long Guanti": "Lunghi Guanti dell'Uccisore di Omen",
    "Omenkiller Stivali": "Stivali dell'Uccisore di Omen",

    # Raptor's Set
    "Skeletal Maschera": "Maschera Scheletrica",
    "Black Feathers di Raptor": "Piume Nere del Rapace",

    # Foot Soldier Sets
    "Foot Soldier Cap": "Cappello del Fante",
    "Foot Soldier Guanti": "Guantoni del Fante",
    "Foot Soldier Gambali": "Gambali del Fante",
    "Foot Soldier Elmo": "Elmo del Fante",

    # Highwayman Set
    "Highwayman Cappuccio": "Cappuccio del Brigante di Strada",
    "Highwayman Cloth Armatura": "Armatura di Tessuto del Brigante di Strada",
    "Highwayman Guanti": "Guantoni del Brigante di Strada",

    # Vulgar Militia Set
    "Vulgar Militia Elmo": "Elmo della Milizia Volgare",
    "Vulgar Militia Armatura": "Armatura della Milizia Volgare",
    "Vulgar Militia Guanti": "Guantoni della Milizia Volgare",
    "Vulgar Militia Gambali": "Gambali della Milizia Volgare",

    # Duelist Set
    "Duelist Elmo": "Elmo del Duellante",
    "Gravekeeper Mantello": "Mantello del Custode delle Tombe",
    "Duelist Gambali": "Gambali del Duellante",

    # Rotten Duelist Set
    "Rotten Duelist Elmo": "Elmo del Duellante Putrido",
    "Rotten Gravekeeper Mantello": "Mantello del Custode delle Tombe Putrido",
    "Rotten Duelist Gambali": "Gambali del Duellante Putrido",

    # Nox Monk Set
    "Nox Monk Cappuccio": "Cappuccio del Monaco Nox",
    "Nox Monk Armatura": "Armatura del Monaco Nox",
    "Nox Monk Bracelets": "Bracciali del Monaco Nox",
    "Nox Monk Gambali": "Gambali del Monaco Nox",

    # Nox Swordstress Set
    "Nox Swordstress Armatura": "Armatura della Spadaccina Nox",

    # Night Maiden Set
    "Night Maiden Armatura": "Armatura della Fanciulla della Notte",

    # Champion Set
    "Champion Fascia": "Fascia del Campione",
    "Champion Pauldron": "Spallaccio del Campione",
    "Champion Bracers": "Bracciali del Campione",
}

# ─────────────────────────────────────────────────────────────────────────────
# Additional corrections applied later in the file
# (same lookup table is used, just adding more entries)
# ─────────────────────────────────────────────────────────────────────────────

ITEM_NAME_FIXES_EXTENDED = {
    # ── Iron / Chain / Leather / Scale Sets ───────────────────────────────────
    "Chain Armatura": "Armatura di Cotta di Maglia",
    "Iron Elmo": "Elmo di Ferro",
    "Iron Guanti": "Guantoni di Ferro",
    "Scale Armatura": "Armatura a Scaglie",
    "Leather Pantaloni": "Pantaloni di Cuoio",
    "Sacred Crown Elmo": "Elmo della Corona Sacra",
    "Champion Gaiters": "Ghette del Campione",

    # ── Godrick/Raya Lucarian/Radahn/Leyndell/Haligtree Soldier Sets ──────────
    "Godrick Soldier Elmo": "Elmo del Soldato di Godrick",
    "Godrick Soldier Guanti": "Guantoni del Soldato di Godrick",
    "Godrick Soldier Gambali": "Gambali del Soldato di Godrick",
    "Raya Lucarian Elmo": "Elmo di Raya Lucaria",
    "Raya Lucarian Guanti": "Guantoni di Raya Lucaria",
    "Raya Lucarian Gambali": "Gambali di Raya Lucaria",
    "Radahn Soldier Elmo": "Elmo del Soldato di Radahn",
    "Radahn Soldier Guanti": "Guantoni del Soldato di Radahn",
    "Radahn Soldier Gambali": "Gambali del Soldato di Radahn",
    "Leyndell Soldier Elmo": "Elmo del Soldato di Leyndell",
    "Leyndell Soldier Guanti": "Guantoni del Soldato di Leyndell",
    "Leyndell Soldier Gambali": "Gambali del Soldato di Leyndell",
    "Haligtree Elmo": "Elmo dell'Albero Santo",
    "Haligtree Guanti": "Guantoni dell'Albero Santo",
    "Haligtree Gambali": "Gambali dell'Albero Santo",
    "Mausoleum Guanti": "Guantoni del Mausoleo",
    "Mausoleum Gambali": "Gambali del Mausoleo",

    # ── Exile / Kaiden Sets ───────────────────────────────────────────────────
    "Exile Cappuccio": "Cappuccio dell'Esiliato",
    "Exile Armatura": "Armatura dell'Esiliato",
    "Exile Guanti": "Guantoni dell'Esiliato",
    "Exile Gambali": "Gambali dell'Esiliato",
    "Kaiden Elmo": "Elmo di Kaiden",
    "Kaiden Armatura": "Armatura di Kaiden",
    "Kaiden Guanti": "Guantoni di Kaiden",
    "Kaiden Pantaloni": "Pantaloni di Kaiden",

    # ── Land of Reeds / White Reed Sets ──────────────────────────────────────
    "Land di Reeds Elmo": "Elmo della Terra dei Giunchi",
    "Land di Reeds Armatura": "Armatura della Terra dei Giunchi",
    "Land di Reeds Guanti": "Guantoni della Terra dei Giunchi",
    "Land di Reeds Gambali": "Gambali della Terra dei Giunchi",
    "Okina Maschera": "Maschera di Okina",
    "White Reed Armatura": "Armatura del Giunco Bianco",
    "White Reed Guanti": "Guantoni del Giunco Bianco",
    "White Reed Gambali": "Gambali del Giunco Bianco",

    # ── Eccentric Set ─────────────────────────────────────────────────────────
    "Cappuccio di Eccentric": "Cappuccio dell'Eccentrico",
    "Armatura di Eccentric": "Armatura dell'Eccentrico",
    "Manchettes di Eccentric": "Mancette dell'Eccentrico",
    "Breeches di Eccentric": "Brache dell'Eccentrico",

    # ── Marionette / Blue Silver Sets ─────────────────────────────────────────
    "Marionette Soldier Elmo": "Elmo del Soldato Marionetta",
    "Marionette Soldier Armatura": "Armatura del Soldato Marionetta",
    "Blue Silver Mail Cappuccio": "Cappuccio di Maglia Blu-Argento",
    "Blue Silver Mail Armatura": "Armatura di Maglia Blu-Argento",

    # ── Fire Monk / Blackflame Monk Sets ──────────────────────────────────────
    "Fire Monk Cappuccio": "Cappuccio del Monaco del Fuoco",
    "Fire Monk Armatura": "Armatura del Monaco del Fuoco",
    "Fire Monk Guanti": "Guantoni del Monaco del Fuoco",
    "Fire Monk Gambali": "Gambali del Monaco del Fuoco",
    "Blackflame Monk Cappuccio": "Cappuccio del Monaco della Fiamma Oscura",
    "Blackflame Monk Armatura": "Armatura del Monaco della Fiamma Oscura",
    "Blackflame Monk Guanti": "Guantoni del Monaco della Fiamma Oscura",
    "Blackflame Monk Gambali": "Gambali del Monaco della Fiamma Oscura",

    # ── Zamor / Black Knife Sets ──────────────────────────────────────────────
    "Zamor Maschera": "Maschera di Zamor",
    "Zamor Armatura": "Armatura di Zamor",
    "Zamor Fasce per le gambe": "Fasce per le gambe di Zamor",
    "Black Knife Cappuccio": "Cappuccio del Coltello Nero",
    "Black Knife Armatura": "Armatura del Coltello Nero",
    "Black Knife Guanti": "Guantoni del Coltello Nero",
    "Black Knife Gambali": "Gambali del Coltello Nero",

    # ── Malenia's Set ─────────────────────────────────────────────────────────
    "Winged Elmo di Malenia": "Elmo Alato di Malenia",
    "Gauntlet di Malenia": "Guantone di Malenia",

    # ── Elden Lord Set ────────────────────────────────────────────────────────
    "Elden Lord Armatura": "Armatura di Elden Lord",
    "Elden Lord Gambali": "Gambali di Elden Lord",

    # ── Knight Set (generic) ─────────────────────────────────────────────────
    "Knight Elmo": "Elmo del Cavaliere",
    "Knight Armatura": "Armatura del Cavaliere",
    "Knight Guanti": "Guantoni del Cavaliere",
    "Knight Gambali": "Gambali del Cavaliere",

    # ── Vagabond Knight Set ───────────────────────────────────────────────────
    "Vagabond Knight Elmo": "Elmo del Cavaliere Vagabondo",
    "Vagabond Knight Armatura": "Armatura del Cavaliere Vagabondo",
    "Vagabond Knight Guanti": "Guantoni del Cavaliere Vagabondo",
    "Vagabond Knight Gambali": "Gambali del Cavaliere Vagabondo",

    # ── Carian Knight Set ─────────────────────────────────────────────────────
    "Carian Knight Elmo": "Elmo del Cavaliere di Caria",
    "Carian Knight Armatura": "Armatura del Cavaliere di Caria",
    "Carian Knight Guanti": "Guantoni del Cavaliere di Caria",
    "Carian Knight Gambali": "Gambali del Cavaliere di Caria",

    # ── Godrick Knight Set ────────────────────────────────────────────────────
    "Godrick Knight Elmo": "Elmo del Cavaliere di Godrick",
    "Godrick Knight Armatura": "Armatura del Cavaliere di Godrick",
    "Godrick Knight Guanti": "Guantoni del Cavaliere di Godrick",
    "Godrick Knight Gambali": "Gambali del Cavaliere di Godrick",

    # ── Cuckoo Knight Set ─────────────────────────────────────────────────────
    "Cuckoo Knight Elmo": "Elmo del Cavaliere Cuculo",
    "Cuckoo Knight Armatura": "Armatura del Cavaliere Cuculo",
    "Cuckoo Knight Guanti": "Guantoni del Cavaliere Cuculo",
    "Cuckoo Knight Gambali": "Gambali del Cavaliere Cuculo",

    # ── Redmane Knight Set ────────────────────────────────────────────────────
    "Redmane Knight Elmo": "Elmo del Cavaliere Criniera Rossa",
    "Redmane Knight Armatura": "Armatura del Cavaliere Criniera Rossa",
    "Redmane Knight Guanti": "Guantoni del Cavaliere Criniera Rossa",
    "Redmane Knight Gambali": "Gambali del Cavaliere Criniera Rossa",

    # ── Gelmir Knight Set ─────────────────────────────────────────────────────
    "Gelmir Knight Elmo": "Elmo del Cavaliere di Gelmir",
    "Gelmir Knight Armatura": "Armatura del Cavaliere di Gelmir",
    "Gelmir Knight Guanti": "Guantoni del Cavaliere di Gelmir",
    "Gelmir Knight Gambali": "Gambali del Cavaliere di Gelmir",

    # ── Leyndell Knight Set ───────────────────────────────────────────────────
    "Leyndell Knight Elmo": "Elmo del Cavaliere di Leyndell",
    "Leyndell Knight Armatura": "Armatura del Cavaliere di Leyndell",
    "Leyndell Knight Guanti": "Guantoni del Cavaliere di Leyndell",
    "Leyndell Knight Gambali": "Gambali del Cavaliere di Leyndell",

    # ── Haligtree Knight Set ──────────────────────────────────────────────────
    "Haligtree Knight Elmo": "Elmo del Cavaliere dell'Albero Santo",
    "Haligtree Knight Armatura": "Armatura del Cavaliere dell'Albero Santo",
    "Haligtree Knight Guanti": "Guantoni del Cavaliere dell'Albero Santo",
    "Haligtree Knight Gambali": "Gambali del Cavaliere dell'Albero Santo",

    # ── Mausoleum Knight Set ──────────────────────────────────────────────────
    "Mausoleum Knight Armatura": "Armatura del Cavaliere del Mausoleo",
    "Mausoleum Knight Guanti": "Guantoni del Cavaliere del Mausoleo",
    "Mausoleum Knight Gambali": "Gambali del Cavaliere del Mausoleo",

    # ── Bloodhound Knight Set ─────────────────────────────────────────────────
    "Bloodhound Knight Elmo": "Elmo del Cavaliere Segugio",
    "Bloodhound Knight Armatura": "Armatura del Cavaliere Segugio",
    "Bloodhound Knight Guanti": "Guantoni del Cavaliere Segugio",
    "Bloodhound Knight Gambali": "Gambali del Cavaliere Segugio",

    # ── Cleanrot Set ──────────────────────────────────────────────────────────
    "Cleanrot Elmo": "Elmo del Cleanrot",
    "Cleanrot Armatura": "Armatura del Cleanrot",
    "Cleanrot Guanti": "Guantoni del Cleanrot",
    "Cleanrot Gambali": "Gambali del Cleanrot",

    # ── Raging Wolf Set ───────────────────────────────────────────────────────
    "Raging Wolf Elmo": "Elmo del Lupo Furioso",
    "Raging Wolf Armatura": "Armatura del Lupo Furioso",
    "Raging Wolf Guanti": "Guantoni del Lupo Furioso",
    "Raging Wolf Gambali": "Gambali del Lupo Furioso",

    # ── Blaidd's Set ──────────────────────────────────────────────────────────
    "Black Wolf Maschera": "Maschera del Lupo Nero",

    # ── Twinned Set ───────────────────────────────────────────────────────────
    "Twinned Elmo": "Elmo Gemellato",
    "Twinned Armatura": "Armatura Gemellata",
    "Twinned Guanti": "Guantoni Gemellati",
    "Twinned Gambali": "Gambali Gemellati",

    # ── Drake Knight Set ──────────────────────────────────────────────────────
    "Drake Knight Elmo": "Elmo del Cavaliere del Drago",
    "Drake Knight Armatura": "Armatura del Cavaliere del Drago",
    "Drake Knight Guanti": "Guantoni del Cavaliere del Drago",
    "Drake Knight Gambali": "Gambali del Cavaliere del Drago",

    # ── Briar Set ─────────────────────────────────────────────────────────────
    "Briar Elmo": "Elmo dei Rovi",
    "Briar Armatura": "Armatura dei Rovi",
    "Briar Guanti": "Guantoni dei Rovi",
    "Briar Gambali": "Gambali dei Rovi",

    # ── Fingerprint Set ───────────────────────────────────────────────────────
    "Fingerprint Elmo": "Elmo dell'Impronta Digitale",
    "Fingerprint Armatura": "Armatura dell'Impronta Digitale",
    "Fingerprint Guanti": "Guantoni dell'Impronta Digitale",
    "Fingerprint Gambali": "Gambali dell'Impronta Digitale",

    # ── Royal Remains Set ─────────────────────────────────────────────────────
    "Royal Remains Elmo": "Elmo dei Resti Reali",
    "Royal Remains Armatura": "Armatura dei Resti Reali",
    "Royal Remains Guanti": "Guantoni dei Resti Reali",
    "Royal Remains Gambali": "Gambali dei Resti Reali",

    # ── All-Knowing Set ───────────────────────────────────────────────────────
    "All-Knowing Elmo": "Elmo dell'Onnisciente",
    "All-Knowing Armatura": "Armatura dell'Onnisciente",
    "All-Knowing Guanti": "Guantoni dell'Onnisciente",
    "All-Knowing Gambali": "Gambali dell'Onnisciente",

    # ── Royal Knight Set ──────────────────────────────────────────────────────
    "Royal Knight Elmo": "Elmo del Cavaliere Reale",
    "Royal Knight Armatura": "Armatura del Cavaliere Reale",
    "Royal Knight Guanti": "Guantoni del Cavaliere Reale",
    "Royal Knight Gambali": "Gambali del Cavaliere Reale",

    # ── Banished Knight Set (with Altered gender fix) ─────────────────────────
    "Banished Knight Elmo": "Elmo del Cavaliere Bandito",
    "Banished Knight Elmo (Alterata)": "Elmo del Cavaliere Bandito (Alterato)",
    "Banished Knight Armatura": "Armatura del Cavaliere Bandito",
    "Banished Knight Armatura (Alterata)": "Armatura del Cavaliere Bandito (Alterata)",
    "Banished Knight Guanti": "Guantoni del Cavaliere Bandito",
    "Banished Knight Gambali": "Gambali del Cavaliere Bandito",

    # ── Night's Cavalry Set ───────────────────────────────────────────────────
    "Cavalry Elmo di Night": "Elmo della Cavalleria Notturna",
    "Cavalry Armatura di Night": "Armatura della Cavalleria Notturna",
    "Cavalry Guanti di Night": "Guantoni della Cavalleria Notturna",
    "Cavalry Gambali di Night": "Gambali della Cavalleria Notturna",

    # ── Veteran's Set ─────────────────────────────────────────────────────────
    "Elmo di Veteran": "Elmo del Veterano",
    "Armatura di Veteran": "Armatura del Veterano",
    "Guanti di Veteran": "Guantoni del Veterano",
    "Gambali di Veteran": "Gambali del Veterano",

    # ── Scaled Set ────────────────────────────────────────────────────────────
    "Scaled Elmo": "Elmo a Squame",
    "Scaled Armatura": "Armatura a Squame",
    "Scaled Guanti": "Guantoni a Squame",
    "Scaled Gambali": "Gambali a Squame",

    # ── Beast Champion Set ────────────────────────────────────────────────────
    "Beast Champion Elmo": "Elmo del Campione Bestiale",
    "Beast Champion Armatura": "Armatura del Campione Bestiale",
    "Beast Champion Armatura (Alterata)": "Armatura del Campione Bestiale (Alterata)",
    "Beast Champion Guanti": "Guantoni del Campione Bestiale",
    "Beast Champion Gambali": "Gambali del Campione Bestiale",

    # ── Tree Sentinel Set ─────────────────────────────────────────────────────
    "Tree Sentinel Elmo": "Elmo della Sentinella dell'Albero",
    "Tree Sentinel Armatura": "Armatura della Sentinella dell'Albero",
    "Tree Sentinel Guanti": "Guantoni della Sentinella dell'Albero",
    "Tree Sentinel Gambali": "Gambali della Sentinella dell'Albero",

    # ── Malformed Dragon Set ──────────────────────────────────────────────────
    "Malformed Dragon Elmo": "Elmo del Drago Deforme",
    "Malformed Dragon Armatura": "Armatura del Drago Deforme",
    "Malformed Dragon Guanti": "Guantoni del Drago Deforme",
    "Malformed Dragon Gambali": "Gambali del Drago Deforme",

    # ── Crucible Sets ─────────────────────────────────────────────────────────
    "Crucible Axe Elmo": "Elmo del Crogiolo dell'Ascia",
    "Crucible Axe Armatura": "Armatura del Crogiolo dell'Ascia",
    "Crucible Tree Elmo": "Elmo del Crogiolo dell'Albero",
    "Crucible Tree Armatura": "Armatura del Crogiolo dell'Albero",
    "Crucible Guanti": "Guantoni del Crogiolo",
    "Crucible Gambali": "Gambali del Crogiolo",

    # ── General Radahn's Set ──────────────────────────────────────────────────
    "Redmane Elmo di Radahn": "Elmo Criniera Rossa di Radahn",
    "Lion Armatura di Radahn": "Armatura del Leone di Radahn",

    # ── Bull-Goat Set ─────────────────────────────────────────────────────────
    "Bull-Goat Elmo": "Elmo del Toro-Capra",
    "Bull-Goat Armatura": "Armatura del Toro-Capra",
    "Bull-Goat Guanti": "Guantoni del Toro-Capra",
    "Bull-Goat Gambali": "Gambali del Toro-Capra",

    # ── Omen Set ──────────────────────────────────────────────────────────────
    "Omen Elmo": "Elmo dell'Omen",
    "Omen Armatura": "Armatura dell'Omen",
    "Omen Guanti": "Guantoni dell'Omen",
    "Omen Gambali": "Gambali dell'Omen",

    # ── Fire Prelate's Set ────────────────────────────────────────────────────
    "Fire Prelate Elmo": "Elmo del Prelato del Fuoco",
    "Fire Prelate Armatura": "Armatura del Prelato del Fuoco",
    "Fire Prelate Armatura (Alterata)": "Armatura del Prelato del Fuoco (Alterata)",
    "Fire Prelate Guanti": "Guantoni del Prelato del Fuoco",
    "Fire Prelate Gambali": "Gambali del Prelato del Fuoco",

    # ── Pumpkin Helm ──────────────────────────────────────────────────────────
    "Pumpkin Elmo": "Elmo Zucca",

    # ── Various ───────────────────────────────────────────────────────────────
    "Nox Monk Cappuccio": "Cappuccio del Monaco Nox",
}

ITEM_NAME_FIXES.update(ITEM_NAME_FIXES_EXTENDED)

# ─────────────────────────────────────────────────────────────────────────────
# Location text fixes (inside description strings)
# Only fix specific known errors in location/description strings
# ─────────────────────────────────────────────────────────────────────────────

LOCATION_TEXT_FIXES = {
    # Elphael location
    "Elphael, Brace di the Haligtree": "Elphael, Sostegno dell'Albero Santo",
    "Haligtree Roots": "Radici dell'Albero Santo",
    # Touch Memory (keep in English or translate?)
    # "Touch Memory" → leave as is (UI term)
}


def fix_data_it_sections(content):
    """Apply all fixes exclusively to lines within data_it: sections."""

    # Sort item fixes by length descending to avoid partial replacements
    sorted_item_fixes = sorted(ITEM_NAME_FIXES.items(), key=lambda x: len(x[0]), reverse=True)

    lines = content.split('\n')
    result = []
    in_data_it = False
    data_it_indent = 0

    for line in lines:
        if not line.strip():
            result.append(line)
            continue

        indent = len(line) - len(line.lstrip())
        stripped = line.strip()

        if stripped == 'data_it:':
            in_data_it = True
            data_it_indent = indent
            result.append(line)
        elif in_data_it:
            if indent < data_it_indent:
                # Outer list item or top-level key: exit data_it section
                in_data_it = False
                result.append(line)
            elif indent == data_it_indent and not stripped.startswith('- '):
                # Sibling field (e.g. data:, id:, icon:): exit data_it section
                in_data_it = False
                result.append(line)
            else:
                # Content within data_it section: apply all fixes
                fixed_line = line
                for wrong, correct in sorted_item_fixes:
                    fixed_line = fixed_line.replace(f'>{wrong}<', f'>{correct}<')
                for wrong, correct in LOCATION_TEXT_FIXES.items():
                    fixed_line = fixed_line.replace(wrong, correct)
                result.append(fixed_line)
        else:
            result.append(line)

    return '\n'.join(result)


def process_file(input_path, output_path):
    """Process the armor.yaml file and apply corrections."""

    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = fix_data_it_sections(content)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Done. Output written to {output_path}")


def count_fixes(input_path):
    """Count how many fixes would be applied (within data_it sections only)."""
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract only data_it section content for accurate counting
    lines = content.split('\n')
    data_it_lines = []
    in_data_it = False
    data_it_indent = 0

    for line in lines:
        if not line.strip():
            continue
        indent = len(line) - len(line.lstrip())
        stripped = line.strip()
        if stripped == 'data_it:':
            in_data_it = True
            data_it_indent = indent
        elif in_data_it:
            if indent < data_it_indent:
                in_data_it = False
            elif indent == data_it_indent and not stripped.startswith('- '):
                in_data_it = False
            else:
                data_it_lines.append(line)

    data_it_content = '\n'.join(data_it_lines)

    count = 0
    applied = []
    sorted_fixes = sorted(ITEM_NAME_FIXES.items(), key=lambda x: len(x[0]), reverse=True)

    for wrong, correct in sorted_fixes:
        occurrences = data_it_content.count(f'>{wrong}<')
        if occurrences > 0:
            applied.append((occurrences, wrong, correct))
            count += occurrences

    applied.sort(reverse=True)
    print(f"\nTotal fixes to apply (in data_it sections): {count}")
    print(f"\nDetailed fixes:")
    for n, wrong, correct in applied:
        print(f"  [{n}x] '{wrong}' → '{correct}'")

    # Also check location fixes
    for wrong, correct in LOCATION_TEXT_FIXES.items():
        occurrences = data_it_content.count(wrong)
        if occurrences > 0:
            print(f"  [{occurrences}x] (location) '{wrong}' → '{correct}'")

    return count


if __name__ == '__main__':
    input_file = '/home/user/elden-lord/data/checklists/armor.yaml'
    output_file = '/home/user/elden-lord/data/checklists/armor.yaml'

    if '--dry-run' in sys.argv:
        print("DRY RUN - counting fixes only:")
        count_fixes(input_file)
    else:
        print("Counting fixes first...")
        count_fixes(input_file)
        print("\nApplying fixes...")
        process_file(input_file, output_file)
