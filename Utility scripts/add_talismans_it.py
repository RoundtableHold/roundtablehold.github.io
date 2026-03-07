#!/usr/bin/env python3
"""
Add Italian translations (title_it and data_it fields) to talismans.yaml
using a line-by-line string approach to preserve comments and formatting.
"""

# --- Mapping: exact title line -> title_it line to insert after it ---
TITLE_TRANSLATIONS = {
    'title: Talismans': 'title_it: Talismani',
    '    title: "Limgrave"': '    title_it: "Limgrave"',
    '    title: "Weeping Peninsula"': '    title_it: "Penisola del Pianto"',
    '    title: "Roundtable Hold"': '    title_it: "Tavola Rotonda"',
    '    title: "Liurnia of the Lakes"': '    title_it: "Liurnia dei Laghi"',
    '    title: "Caelid"': '    title_it: "Caelid"',
    '    title: "Altus Plateau"': '    title_it: "Altopiano di Altus"',
    '    title: "Mt. Gelmir"': '    title_it: "Monte Gelmir"',
    '    title: "Leyndell, Royal City"': '    title_it: "Leyndell, Capitale Reale"',
    '    title: "Mountaintops of the Giants"': '    title_it: "Vette dei Giganti"',
    '    title: "Consecrated Snowfield"': '    title_it: "Campo Innevato Consacrato"',
    '    title: "Crumbling Farum Azula"': '    title_it: "Farum Azula in Rovina"',
    '    title: "Leyndell, Capital of Ash"': '    title_it: "Leyndell, Capitale di Cenere"',
    '    title: "Siofra River"': '    title_it: "Fiume Siofra"',
    '    title: "Nokron, Eternal City"': '    title_it: "Nokron, Città Eterna"',
    '    title: "Mohgwyn Palace"': '    title_it: "Palazzo Mohgwyn"',
    '    title: "Ainsel River"': '    title_it: "Fiume Ainsel"',
    '    title: "Nokstella, Eternal City"': '    title_it: "Nokstella, Città Eterna"',
    '    title: "Lake of Rot"': '    title_it: "Lago della Putrefazione"',
    '    title: "Deeproot Depths"': '    title_it: "Profondità delle Radici"',
    '  - title: "Realm of Shadow"': '    title_it: "Regno dell\'Ombra"',
}

# --- Mapping: item id -> data_it line to insert after that item's data: line ---
DATA_TRANSLATIONS = {
    # Limgrave
    "2_1": '        data_it: ["Medaglione d\'Ambra Cremisi", "Può essere scelto come Cimelio", "Aumenta i PV massimi di circa il 6%"]',
    "2_2": '        data_it: ["Medaglione del Ruggito", "Rilasciato dal Troll Scavatore di Pietre, nelle Gallerie di Limgrave", "Potenzia ruggiti e attacchi con il fiato"]',
    "2_3": '        data_it: ["Talismano Dracofiamma", "Rilasciato dalla Belva di Farum Azula nella Grotta Boschiva di Limgrave", "Aumenta la negazione del danno da fuoco del 13%"]',
    "2_4": '        data_it: ["Talismano Dracosanto", "Trovato su un cadavere nello Stradale del Naufragio, accessibile dalla spiaggia sotto la Grazia delle Rovine Costiere", "Aumenta la negazione del danno sacro del 13%"]',
    "2_5": '        data_it: ["Talismano dell\'Ascia", "Trovato in una cantina sotto le Rovine del Bosco Nebbioso", "Potenzia gli attacchi caricati del 10%"]',
    "2_6": '        data_it: ["Pustola del Principe della Morte", "Trovata nelle Cripte di Castel Tempesta, più facilmente accessibile dalla Grazia della Torre dei Bastioni", "Aumenta la Vitalità di 90"]',
    "2_7": '        data_it: ["Talismano dell\'Artiglio", "Trovato su un cadavere in una torre di guardia accessibile dalla Grazia della Torre dei Bastioni", "Potenzia gli attacchi con salto del 15%"]',
    "2_8": '        data_it: ["Talismano della Spada Ricurva", "Trovato in un forziere nella stanza dove si combatte il Cavaliere Esiliato a Castel Tempesta", "Potenzia i contrattacchi in guardia del 20%"]',
    "2_9": '        data_it: ["Talismano Dracofolgore", "Trovato su un cadavere lungo la via per la Torre Divina di Limgrave", "Aumenta la negazione del danno da fulmine del 13%"]',
    "2_10": '        data_it: ["Talismano della Tartaruga Verde", "Trovato nell\'area sotterranea ai margini del Villaggio dell\'Acqua Sommessa", "Aumenta la velocità di recupero della stamina di 8 punti al secondo (+17,7%)"]',
    "2_11": '        data_it: ["Talismano del Martello", "Rilasciato da Henricus il Recusante a nordest della Capanna di Stormhill", "Potenzia gli attacchi che riducono la stamina contro chi blocca del 20%"]',
    "2_12": '        data_it: ["Talismano della Portata dell\'Arco", "Trovato in un forziere nelle Torri del Varco della Tempesta", "Aumenta la gittata effettiva degli archi"]',
    "2_13": '        data_it: ["Amuleto della Danzatrice Blu", "Rilasciato dal Golem Guardiano nella Grotta della Via Maestra", "Aumenta la potenza d\'attacco con un carico d\'equipaggiamento basso"]',
    "2_14": '        data_it: ["Talismano della Lancia", "Trovato nel Nordest di Stormhill", "Potenzia gli attacchi a cavallo del 15%"]',
    "2_15": '        data_it: ["Ramoscello Sacrificale", "Può essere acquistato da Patches alla Grotta Murkwater dopo che apre il negozio, per 5.000 rune", "Verrà perso alla morte al posto delle rune"]',
    "2_20": '        data_it: ["Ramoscello Sacrificale", "Trovato in un cimitero, a ovest del primo incontro con Blaidd, vicino ad alcuni fiori di Miranda", "Verrà perso alla morte al posto delle rune"]',
    "2_16": '        data_it: ["Favore dell\'Erdtree", "Trovato nella Cripta dell\'Eroe al Margine del Mondo, custodito da due Scionie Innestato in un\'area segreta", "Aumenta i PV massimi (3%), la Stamina (6,75%) e il Carico d\'Equip (5%)"]',
    "2_17": '        data_it: ["Spada-Ramo Blu Piumata", "Rilasciato dall\'Uccello della Morte a est della Capanna del Maestro di Guerra", "Aumenta la difesa quando i PV sono bassi (si attiva sotto il 20% dei PV, aumenta la negazione del danno di: negazione attuale / 2 + 50)"]',
    "2_18": '        data_it: ["Pugnale Cremisi dell\'Assassino", "Rilasciato dall\'Assassino della Lama Nera nei Catacombi del Tatto Mortale", "I colpi critici ripristinano i PV (recupera il 10% dei PV massimi + 85 PV)"]',
    "2_19": '        data_it: ["Amuleto dello Scorpione Sacro", "Rilasciato da Anastasia, Divoratrice di Segnati", "Aumenta l\'attacco sacro ma riduce la negazione del danno (il danno sacro aumenta del 12% in PvE e dell\'8% in PvP; aumenta il danno fisico subito del 10% in PvE e del 15% in PvP)"]',
    # Weeping Peninsula
    "1_1": '        data_it: ["Medaglione d\'Ambra Cremisi", "Può essere acquistato dal Mercante Nomade sul lato est della Penisola del Pianto per 1.500 rune", "Aumenta i PV massimi di circa il 6%"]',
    "1_2": '        data_it: ["Ramoscello Sacrificale (x3)", "Può essere acquistato dal Mercante Isolato sul lato ovest della Penisola del Pianto per 3.000 rune", "Verrà perso alla morte al posto delle rune"]',
    "1_3": '        data_it: ["Medaglione d\'Ambra Verdeggiante", "Premio per aver sconfitto Miranda, il Fiore Contaminato nella Grotta di Tombsward", "Aumenta la stamina massima dell\'11%"]',
    "1_4": '        data_it: ["Ramoscello Sacrificale", "Donato da Edgar alla prima conversazione a Castel Morne", "Verrà perso alla morte al posto delle rune"]',
    "1_5": '        data_it: ["Talismano Dracostregone", "Premio per aver sconfitto l\'Orso del Mondo nella Grotta Terrosa della Penisola del Pianto", "Aumenta la negazione del danno magico (PvE: 13%; PvP: 4%)"]',
    "1_6": '        data_it: ["Sigillo delle Cicatrici di Radagon", "Rilasciato dall\'Antico Eroe di Zamor nell\'Evergaol del Pianto", "Aumenta gli attributi fisici di 3, aumenta il danno subito di circa il 5%"]',
    "1_7": '        data_it: ["Talismano della Doppia Lama", "Trovato in cima a una torre accessibile cadendo dalla Grazia Retro del Castello, a ovest", "Potenzia l\'ultimo colpo delle sequenze d\'attacco del 20%"]',
    # Roundtable Hold
    "3_1": '        data_it: ["Amuleto dell\'Arsenale", "Ottenuto parlando con Nepheli Loux dopo aver sconfitto Godrick il Greffe a Castel Tempesta", "Aumenta il peso massimo d\'equipaggiamento del 15%"]',
    "3_2": '        data_it: ["Specchio-Trucco del Dito Arricciato", "Può essere acquistato dalle Gemelle Custodi alla Tavola Rotonda per 5.000 rune", "Assume l\'aspetto di un Ospite delle Dita"]',
    "3_3": '        data_it: ["Specchio-Trucco dell\'Ospite", "Può essere acquistato dalle Gemelle Custodi alla Tavola Rotonda per 5.000 rune", "Assume l\'aspetto di un cooperatore"]',
    "3_4": '        data_it: ["Corno dello Spirito Ancestrale", "Ottenuto tramite il Ricordo dell\'Antenato Regale", "Ripristina il PM all\'eliminazione dei nemici (3 PM per uccisione)"]',
    # Liurnia of the Lakes
    "4_1": '        data_it: ["Pugnale Ceruleo dell\'Assassino", "Rilasciato dall\'Assassino della Lama Nera nei Catacombi della Lama Nera", "I colpi critici ripristinano 15 PM"]',
    "4_2": '        data_it: ["Ramoscello Sacrificale", "Trovato su un cadavere nella Liurnia meridionale, accessibile solo dall\'alto, a est dell\'Evergaol del Malfattore", "Verrà perso alla morte al posto delle rune"]',
    "4_3": '        data_it: ["Talismano della Scuola di Graven", "Trovato in una stanza piena di Botboys dietro un muro illusorio e una scala nell\'Accademia Raya Lucaria, vicino alla Grazia del Parlatorio delle Dispute", "Aumenta la potenza delle magie dell\'8%"]',
    "4_4": '        data_it: ["Icona di Radagon", "Trovata al secondo piano del Parlatorio delle Dispute, raggiungibile saltando una recinzione nel cortile", "Riduce il tempo di lancio degli incantesimi (concede 30 destrezza virtuale esclusivamente per il lancio degli incantesimi; la velocità di lancio è limitata a 70 di destrezza)"]',
    "4_5": '        data_it: ["Talismano del Gatto a Coda Lunga", "Trovato su un cadavere in fondo alla ruota girevole nell\'Accademia Raya Lucaria", "Rende il portatore immune al danno da caduta"]',
    "4_6": '        data_it: ["Medaglione d\'Ambra Cerulea", "Rilasciato dal Cavaliere Segugio nel Grotta del Cristallo Lacustre", "Aumenta il PM massimo del 7%"]',
    "4_7": '        data_it: ["Medaglione d\'Ambra Cerulea +2", "Trovato in un forziere in una stanza sotterranea a nordovest delle rovine della Tenuta Lunare", "Aumenta il PM massimo dell\'11%"]',
    "4_8": '        data_it: ["Retaggio dello Stargazer", "Trovato su un cadavere in cima alla Torre Divina di Liurnia", "Aumenta l\'intelligenza di 5"]',
    "4_9": '        data_it: ["Retaggio delle Due Dita", "Trovato al livello inferiore delle Rovine Purified", "Aumenta la fede di 5"]',
    "4_10": '        data_it: ["Insegna della Spada Alata", "Rilasciata dal Cavaliere Cleanrot nella Grotta dell\'Acqua Ferma", "Aumenta la potenza d\'attacco con attacchi successivi"]',
    "4_11": '        data_it: ["Amuleto del Corno Saldo", "Trovato su un cadavere nella Liurnia orientale, sulle scogliere a ovest dalla Grazia del Compound dei Mausolei", "Aumenta notevolmente la robustezza (+90)"]',
    "4_12": '        data_it: ["Amuleto dello Scorpione Magico", "Ottenuto parlando con il Precettore Seluvis dopo aver ottenuto la Lama Tagliadita ma prima di consegnarla a Ranni la Strega", "Aumenta l\'attacco magico (12%), ma riduce la negazione del danno (10%)"]',
    "4_13": '        data_it: ["Spada-Ramo Rossa Piumata", "Rilasciata dall\'Uccello della Morte a nordest dalla Grazia dell\'Isola Scenica", "Aumenta la potenza d\'attacco del 20% quando i PV sono bassi (sotto il 20%)"]',
    "4_14": '        data_it: ["Talismano della Lancia", "Trovato in un forziere nella Grotta del Cristallo Lacustre vicino a un accampamento dei Semi-umani", "Potenzia i contrattacchi tipici delle armi da punta (13%)"]',
    "4_15": '        data_it: ["Talismano Dracoperlaceo", "Trovato dietro il primo portale dei Quattro Campanili", "Aumenta la negazione del danno non fisico (5%)"]',
    "4_16": '        data_it: ["Talismano del Seme Ceruleo", "Trovato nelle travi del Carian Study Hall, accessibile dai tetti", "Potenzia il ripristino di PM dalla Fiaschetta delle Lacrime Cerulee (20%)"]',
    "4_17": '        data_it: ["Talismano del Nodo del Crogiolo", "Rilasciato dall\'Omininkiller nel Villaggio degli Albinauric", "Riduce il danno e l\'impatto dei colpi alla testa subiti"]',
    "4_18": '        data_it: ["Cresta Filigranata Carian", "Può essere acquistata dal Consigliere di Guerra Iji se si sconfigge il Cavaliere Segugio Darriwil senza l\'aiuto di Blaidd, per 1.000 rune", "Riduce il PM consumato dalle abilità del 25%"]',
    "4_19": '        data_it: ["Afflizione di Shabriri", "Trovata su un cadavere al margine del Villaggio della Fiamma Frenetica", "Attira costantemente l\'aggressività dei nemici"]',
    "4_20": '        data_it: ["Vaso Compagno", "Ricevuto da Jar Bairn dopo aver completato la sua missione", "Aumenta la potenza dei vasi da lancio (danno aumentato del 20%)"]',
    # Caelid
    "5_1": '        data_it: ["Talismano del Pungiglione della Freccia", "Trovato in un forziere in cima alla torre direttamente sopra la Grazia del Grande Ponte Impraticabile", "Aumenta la potenza d\'attacco di frecce e dardi del 10%"]',
    "5_2": '        data_it: ["Scarabeo d\'Oro", "Rilasciato dal Cavaliere Cleanrot (Falce) e dal Cavaliere Cleanrot (Lancia) nella Grotta Abbandonata", "Aumenta le rune ottenute dagli nemici sconfitti di circa il 20%"]',
    "5_3": '        data_it: ["Arsenale del Grande Vaso", "Premio per aver sconfitto i Cavalieri del Grande Vaso a Caelid, vicino al colosseo", "Aumenta notevolmente il carico massimo d\'equipaggiamento (16-19% in base alla Resistenza)"]',
    "5_4": '        data_it: ["Retaggio della Portatrice di Protesi", "Ottenuto completando la missione secondaria di Gowry a Caelid, poi tornando da Millicent per ricevere il Talismano", "Aumenta la Destrezza di 5"]',
    "5_5": '        data_it: ["Sigillo delle Piaghe di Radagon", "Trovato su un cadavere a Fort Faroth", "Aumenta gli attributi fisici di 5, aumenta il danno subito di circa il 15%"]',
    "5_6": '        data_it: ["Ramoscello Sacrificale (x3)", "Può essere acquistato dal Mercante Isolato nel Dragonbarrow per 3.000 rune", "Verrà perso alla morte al posto delle rune"]',
    "5_7": '        data_it: ["Talismano Dracofiamma +2", "Rilasciato dalla Belva di Farum Azula (x2) nella Grotta del Dragonbarrow", "Aumenta la negazione del danno da fuoco del 20%"]',
    "5_8": '        data_it: ["Talismano del Toro-Capra", "Trovato nel retro della Grotta del Dragonbarrow", "Aumenta la Poise di circa il 33,3% arrotondato all\'intero più vicino"]',
    "5_9": '        data_it: ["Retaggio di Starscourge", "Trovato a Fort Gael", "Aumenta la Forza di 5"]',
    "5_10": '        data_it: ["Talismano della Tela del Fedele", "Trovato su un cadavere nel Tunnel del Cristallo di Sellia", "Aumenta la potenza delle Incantazioni del 4%"]',
    "5_11": '        data_it: ["Talismano della Tela del Gregge", "Rilasciato da Gowry dopo aver completato la missione di Millicent se lo uccidi", "Aumenta notevolmente la potenza delle Incantazioni dell\'8%"]',
    "5_12": '        data_it: ["Talismano Dracostregone +1", "Trovato in una piccola stanza nella sezione nordovest della città, sotto il balcone contenente il Bastone del Tiro Mancino", "Aumenta la negazione del danno magico (PvE: 17%; PvP: 5%)"]',
    "5_13": '        data_it: ["Talismano dello Scudo Draconico", "Trovato su uno degli orli del Santuario Bestiale", "Aumenta notevolmente la negazione del danno fisico del 10%"]',
    # Altus Plateau
    "6_1": '        data_it: ["Amuleto dell\'Arsenale +1", "Trovato su un cadavere nel Tunnel dell\'Altus", "Aumenta il carico massimo d\'equipaggiamento del 17%"]',
    "6_2": '        data_it: ["Amuleto dello Scorpione del Fulmine", "Trovato nei Catacombi di Wyndham in una stanza sigillata da una Statua Imp", "Aumenta l\'attacco da fulmine (12%), ma riduce la negazione del danno (10%)"]',
    "6_3": '        data_it: ["Talismano della Spada Rituale", "Trovato in un forziere alle Rovine Lux", "Aumenta la potenza d\'attacco del 10% quando i PV sono al massimo"]',
    "6_4": '        data_it: ["Talismano del Profumiere", "Trovato in un forziere alle Rovine del Profumiere", "Aumenta la potenza degli oggetti profumieri"]',
    "6_5": '        data_it: ["Icona di Godfrey", "Rilasciata da Godefroy il Greffe nell\'Evergaol della Stirpe d\'Oro", "Potenzia gli incantesimi caricati e le abilità del 15%"]',
    "6_6": '        data_it: ["Talismano dello Scudo Draconico +1", "Trovato nella Cripta dell\'Eroe Santificato dietro una Statua Imp", "Aumenta la negazione del danno fisico del 13%"]',
    "6_7": '        data_it: ["Talismano Dracofolgore +1", "Trovato nel Vecchio Tunnel dell\'Altus", "Aumenta la negazione del danno da fulmine del 17%"]',
    "6_8": '        data_it: ["Talismano del Grande Scudo", "Trovato in un forziere su un Carro a est della Grazia della Collina con Vista sull\'Erdtree", "Potenzia la capacità di guardia (moltiplica il rating della Protezione Guardia per 1,1, riducendo la stamina persa bloccando gli attacchi)"]',
    "6_9": '        data_it: ["Talismano del Seme Cremisi", "Trovato nella Cripta dell\'Eroe Santificato", "Potenzia il ripristino di PV dalla Fiaschetta delle Lacrime Cremisi del 20%"]',
    "6_10": '        data_it: ["Velo Nascondente", "Rilasciato dall\'Assassino della Lama Nera nella Grotta del Saggio", "Nasconde il portatore mentre si accovaccia lontano dai nemici"]',
    "6_11": '        data_it: ["Ramoscello Sacrificale", "Trovato in un forziere in un accampamento nemico a nord della Grazia del Bivio della Via dell\'Altus", "Verrà perso alla morte al posto delle rune"]',
    "7_8": '        data_it: ["Fiala di Crepus", "Premio per aver sconfitto Rileigh il Pigro nell\'ambito della missione del Maniero del Vulcano", "Elimina tutti i suoni emessi dal portatore durante il movimento"]',
    # Mt. Gelmir
    "7_1": '        data_it: ["Medaglione d\'Ambra Cremisi +1", "Trovato su un cadavere nel Maniero del Vulcano, dietro una Statua Imp, accessibile dalla Grazia della Chiesa della Città Prigione", "Aumenta i PV massimi del 7%"]',
    "7_2": '        data_it: ["Amuleto dello Scorpione del Fuoco", "Trovato sulle mura in una piattaforma di legno a ovest in Fort Laiedd nel Monte Gelmir", "Aumenta l\'attacco da fuoco (12%), ma riduce le negazioni del danno (10%)"]',
    "7_4": '        data_it: ["Talismano del Pugnale", "Trovato dietro una Statua Imp nel Maniero del Vulcano nella stanza prima del portale di Rykard", "Potenzia i colpi critici del 17%"]',
    "7_5": '        data_it: ["Esultazione del Consanguineo della Putrefazione", "Rilasciata dal Consanguineo della Putrefazione nella Grotta dell\'Acqua Bollente", "L\'avvelenamento o la putrefazione nelle vicinanze aumenta la potenza d\'attacco (aumenta del 20% per 20 secondi quando un giocatore o nemico nelle vicinanze è colpito da Veleno o Putrefazione Scarlatta)"]',
    "7_6": '        data_it: ["Talismano Dracoperlaceo +1", "Trovato in un forziere dietro una Statua Imp nelle Rovine di Wyndham", "Aumenta la negazione del danno non fisico del 7%"]',
    "7_7": '        data_it: ["Cameo del Prenditori", "Premio da Tanith al Maniero del Vulcano per aver completato la terza parte della missione", "Ripristina i PV all\'eliminazione dei nemici (3% dei PV massimi + 30 PV)"]',
    "7_9": '        data_it: ["Afflizione di Daedicar", "Ottenuta alla fine della missione di Rya dopo la missione del Maniero del Vulcano", "Aumenta il danno subito del 100%"]',
    # Leyndell, Royal City
    "8_1": '        data_it: ["Medaglione d\'Ambra Verdeggiante +1", "Rilasciato da Margit, l\'Omen Caduto nei Dintorni della Capitale", "Aumenta la stamina massima del 13%"]',
    "8_2": '        data_it: ["Favore dell\'Erdtree +1", "Trovato nella stanza del boss dopo aver sconfitto Mohg l\'Omen", "Aumenta i PV massimi (3,5%), la stamina (8,25%) e il carico d\'equip (6,5%)"]',
    "8_3": '        data_it: ["Talismano Dracofiamma +1", "Trovato a terra contro una colonna sul ponte con i Gemelli Caduti", "Aumenta la negazione del danno da fuoco del 17%"]',
    "8_4": '        data_it: ["Talismano Dracosanto +1", "Trovato su un cadavere vicino alla Grazia dei Catacombi di Leyndell dietro due muri illusori", "Aumenta la negazione del danno sacro del 17%"]',
    "8_5": '        data_it: ["Talismano della Scaglia del Crogiolo", "Trovato su un cadavere nei Catacombi di Leyndell, accessibile salendo la colonna trappola", "Riduce il danno subito dai colpi critici"]',
    "8_6": '        data_it: ["Talismano della Piuma del Crogiolo", "Trovato in un\'area segreta nella Cripta dell\'Eroe di Auriza", "Migliora la schivata rotolante ma aumenta il danno subito del 30%"]',
    "8_7": '        data_it: ["Talismano dello Scudo Rituale", "Trovato davanti alle porte del Colosseo di Leyndell", "Aumenta la difesa del 30% quando i PV sono al massimo"]',
    "8_8": '        data_it: ["Talismano della Rugiada Benedetta", "Trovato in un forziere sul Ponte Divino, sorvegliato da un Golem", "Ripristina lentamente i PV (2 PV/sec)"]',
    # Mountaintops of the Giants
    "9_1": '        data_it: ["Medaglione d\'Ambra Cerulea +1", "Trovato su un cadavere appeso a un bordo di legno sopra le mura meridionali di Castel Sol", "Aumenta il PM massimo del 9%"]',
    "9_2": '        data_it: ["Esultazione del Signore del Sangue", "Rilasciata da Esgar, Sacerdote del Sangue nei Catacombi di Leyndell", "La perdita di sangue nelle vicinanze aumenta la potenza d\'attacco (aumenta del 20% per 20 secondi quando un giocatore o nemico nelle vicinanze subisce la perdita di sangue)"]',
    "9_3": '        data_it: ["Lama di Splendopietra Primordiale", "Trovata in un forziere nell\'area sotterranea delle Rovine dello Stargazer", "Gli incantesimi consumano meno PM (25%), ma i PV massimi sono ridotti (15%)"]',
    "9_4": '        data_it: ["Talismano Dracoperlaceo +2", "Trovato su un cadavere sopra la Grazia della Città dell\'Haligtree", "Aumenta la negazione del danno non fisico del 9%"]',
    "9_5": '        data_it: ["Panno Avvolgente della Pelle dei Dio", "Rilasciato dall\'Apostolo della Pelle del Dio e dal Nobile della Pelle del Dio nella Grotta dello Spirito Chiamante", "Gli attacchi successivi ripristinano i PV (3% dei PV massimi + 30 PV, il timer si azzera dopo circa 10 secondi)"]',
    # Consecrated Snowfield
    "10_1": '        data_it: ["Medaglione d\'Ambra Verdeggiante +2", "Trovato in un forziere accessibile dal tetto con la Chiocciola Evocatrice vicino alla Grazia della Piazza della Città dell\'Haligtree", "Aumenta la stamina massima del 15%"]',
    "10_2": '        data_it: ["Scarabeo d\'Argento", "Trovato in un forziere oltre un muro illusorio nel Sentiero Nascosto verso l\'Haligtree", "Aumenta il tasso di scoperta degli oggetti di 75"]',
    "10_3": '        data_it: ["Amuleto del Corno Saldo +1", "Trovato a ovest del Campo Innevato Consacrato, sulla strada per l\'ingresso del Tunnel Yelough Anix", "Aumenta notevolmente la robustezza di 140"]',
    "10_4": '        data_it: ["Sigillo delle Piaghe di Marika", "Trovato su un altare in una stanza che richiede una Chiave della Spada di Pietra nell\'Elphael, Abbraccio dell\'Haligtree", "Aumenta notevolmente gli attributi magici di 5, ma aumenta anche il danno subito del 15%"]',
    "10_5": '        data_it: ["Protesi di Millicent", "Ottenuta uccidendo Millicent alla fine della sua missione", "Aumenta la destrezza di 5, aumenta la potenza d\'attacco con attacchi successivi"]',
    "10_6": '        data_it: ["Insegna della Spada Alata Corrosa", "Premio per aver scelto di assistere Millicent e aver sconfitto con successo le sue sorelle", "Aumenta notevolmente la potenza d\'attacco con attacchi successivi (aumento base del 6%, incrementa in passi del 4%)"]',
    "10_7": '        data_it: ["Talismano della Massa di Graven", "Trovato in cima alla Torre di Albinauric nella parte orientale del Campo Innevato Consacrato", "Aumenta notevolmente la potenza delle magie dell\'8%"]',
    "10_8": '        data_it: ["Talismano del Grande Scudo Draconico", "Trovato in un forziere su una piattaforma sopraelevata all\'interno del grande edificio nel nordest dell\'Elphael, Abbraccio dell\'Haligtree", "Aumenta enormemente la negazione del danno fisico del 20%"]',
    "10_9": '        data_it: ["Talismano Dracostregone +2", "Trovato su un cadavere nei catacombi segreti sotto il Sentiero Nascosto verso l\'Haligtree, a destra prima del Mimo Vagabondo Lacrimoso", "Aumenta la negazione del danno magico (PvE: 20%; PvP: 6%)"]',
    # Crumbling Farum Azula
    "11_1": '        data_it: ["Frammento del Vaso Guerriero", "Ottenuto completando la missione di Alessandro, Pugno di Ferro", "Aumenta la potenza d\'attacco delle abilità del 10%"]',
    "11_2": '        data_it: ["Frammento di Alessandro", "Ottenuto completando la missione di Alessandro, Pugno di Ferro", "Aumenta notevolmente la potenza d\'attacco delle abilità del 15%"]',
    "11_3": '        data_it: ["Talismano del Vecchio Signore", "Trovato in un forziere a est della Grazia dei Tetti del Tempio del Drago", "Estende la durata degli effetti degli incantesimi del 30%"]',
    "11_4": '        data_it: ["Talismano dello Scudo Draconico +2", "Trovato su un cadavere su una piattaforma galleggiante tra l\'Ascensore del Tempio del Drago e il Tetto del Tempio del Drago", "Aumenta la negazione del danno fisico del 17%"]',
    "11_5": '        data_it: ["Talismano Dracofolgore +2", "Trovato su un cadavere accessibile cadendo da una scogliera a est di dove si trova/trovava un Drago Antico", "Aumenta la negazione del danno da fulmine del 20%"]',
    # Leyndell, Capital of Ash
    "12_1": '        data_it: ["Medaglione d\'Ambra Cremisi +2", "Trovato a Leyndell, Capitale di Cenere, appena prima di entrare nelle Grotte Sotterranee Sigillate", "Aumenta i PV massimi del 7,5%"]',
    "12_2": '        data_it: ["Favore dell\'Erdtree +2", "Trovato in cima a un ramo che emerge dal terreno in un grande cortile nel gioco finale", "Aumenta i PV massimi (4%), la stamina (9,6%) e il carico d\'equip (8%)"]',
    # Siofra River
    "13_1": '        data_it: ["Amuleto del Corno Chiarificatore", "Trovato su un cadavere sui gradini che portano all\'ascensore del Pozzo Profondo del Siofra", "Aumenta la Messa a Fuoco di 90"]',
    "13_2": '        data_it: ["Sigillo delle Cicatrici di Marika", "Trovato su un cadavere alla base della cascata al livello più alto del Fiume Siofra", "Aumenta gli attributi magici di 3, ma aumenta anche il danno subito del 10%"]',
    # Nokron, Eternal City
    "14_1": '        data_it: ["Amuleto del Corno Chiarificatore +1", "Trovato su un cadavere nel mezzo e al piano più basso di una rovina a Nokron, Città Eterna", "Aumenta la Messa a Fuoco di 140"]',
    "14_2": '        data_it: ["Collana Variegata", "Trovata su un cadavere al bordo del ponte in rovina che porta a Nokron, Città Eterna, accessibile tramite portale ai Quattro Campanili", "Aumenta la Robustezza, l\'Immunità e la Messa a Fuoco di 40"]',
    "14_3": '        data_it: ["Collana Variegata +1", "Trovata su un cadavere in cima ad alcune arcate in rovina a Nokron, Città Eterna", "Aumenta la Robustezza, l\'Immunità e la Messa a Fuoco di 60"]',
    # Mohgwyn Palace
    "15_1": '        data_it: ["Talismano Dracosanto +2", "Trovato su un cadavere nel Palazzo Mohgwyn, in un piccolo gruppo di tombe vicino a un Grande Corvo in agguato su un\'altura", "Aumenta la negazione del danno sacro del 20%"]',
    # Ainsel River
    "16_1": '        data_it: ["Amuleto del Corno Immunizzante", "Trovato su un cadavere in un nido di formiche nel Fiume Ainsel", "Aumenta l\'Immunità di 90"]',
    # Nokstella, Eternal City
    "17_1": '        data_it: ["Luna di Nokstella", "Trovata in un forziere sotto un massiccio trono a Nokstella, Città Eterna", "Aumenta le slot di memoria di 2"]',
    # Lake of Rot
    "18_1": '        data_it: ["Amuleto del Corno Immunizzante +1", "Premio per aver sconfitto un Seguace Ancestrale a sudest della Grazia della Riva del Lago della Putrefazione", "Aumenta l\'Immunità di 140"]',
    # Deeproot Depths
    "19_1": '        data_it: ["Cisti del Principe della Morte", "Rilasciata da un grande orso del mondo in una grotta dietro una cascata a nordest del Sito di Grazia delle Profondità delle Radici", "Aumenta notevolmente la vitalità di 140"]',
    # Realm of Shadow (DLC)
    "50_1": '        data_it: ["Medaglione d\'Ambra Cremisi +3", "Rilasciato come premio sconfiggendo il boss Cavaliere della Morte nei Catacombi della Fenditura della Nebbia", "Aumenta i PV massimi del 10%"]',
    "50_2": '        data_it: ["Medaglione d\'Ambra Cerulea +3", "Rilasciato come premio sconfiggendo il boss Cavaliere della Morte nei Catacombi del Fiume dello Scorpione", "Aumenta il PM massimo del 12,5%"]',
    "50_3": '        data_it: ["Medaglione d\'Ambra Verdeggiante +3", "Catacombi della Luce Oscura, subito dopo il primo imp canonico. Salta sul bordo a destra poi scendi nell\'arco sotto di esso", "Aumenta la stamina massima del 17%"]',
    "50_4": '        data_it: ["Talismano della Tartaruga a Due Teste", "All\'interno di una grotta sotto una cascata sorvegliata da nemici, appena a est della Grotta della Foce del Fiume", "Aumenta notevolmente la velocità di recupero della stamina del 22,2%"]',
    "50_5": '        data_it: ["Amuleto del Corno Saldo +2", "Prigione di Bonny: Dopo essere caduti nel buco, vai a est oltre i ratti e sali la scala. Sconfiggi il mostro del Vaso Interno e troverai il talismano nella stanza", "Aumenta vastamente la robustezza di 180"]',
    "50_6": '        data_it: ["Amuleto del Corno Immunizzante +2", "Rilasciato sconfiggendo il Minore Spirito dell\'Albero Ulcerato nelle fogne dell\'Insediamento della Torre di Belurat", "Aumenta vastamente l\'immunità di 180"]',
    "50_7": '        data_it: ["Amuleto del Corno Chiarificatore +2", "Prigione del Lamentatore: Dopo essere caduti nella piccola grotta infestata di ratti, continua lungo il percorso e vai dritto. Troverai questo talismano su un cadavere sul lato destro appena entri nell\'area", "Aumenta vastamente la messa a fuoco di 230"]',
    "50_8": '        data_it: ["Collana Variegata +2", "Nelle antiche rovine di Rauh, subito dopo aver superato il gigante della fucina sul ponte. Devi farti strada attraverso la rovina davanti a te e, arrivato in cima, prosegui oltre la grande struttura in pietra fino alla fine dell\'area e sblocca la sorgente di spirito. Poi salta giù sulla sorgente e risali sul lato opposto. La collana sarà in cima alle scale", "Aumenta vastamente l\'immunità, la robustezza e la messa a fuoco di 100"]',
    "50_9": '        data_it: ["Talismano Dracostregone +3", "Si trova su un cadavere vicino al sito di grazia del Fronte del Castello, vicino a Castel Ensis. Dal sito di grazia del Fronte del Castello, se vai direttamente a nord puoi cadere dal lato della scogliera e poi seguire il percorso a est che ti porterà al magazzino dove si trova il talismano", "Aumenta la negazione del danno magico del 22%"]',
    "50_10": '        data_it: ["Talismano Dracofiamma +3", "Si trova a Fort Reprimanda all\'interno di un forziere. Entrando dalla porta principale, scendi la scala nell\'angolo a destra sul retro. Continua attraverso l\'ingresso sul lato sinistro del corridoio e segui questo percorso finché non vedi due soldati in piedi davanti a un corpo. Scavalca le gabbie alla loro sinistra e ti porterà al forziere", "Aumenta la negazione del danno da fuoco del 22%"]',
    "50_11": '        data_it: ["Talismano Dracofolgore +3", "Si trova a Shadow Keep. Dalla grazia del Magazzino: Primo Piano, sali le scale al secondo piano e trova un vicolo cieco con vari protettori d\'ombra. Salta oltre il parapetto per raggiungere una stanza con il talismano, poi usa la leva per spostare la libreria e riemergi vicino al sito di grazia", "Aumenta la negazione del danno da fulmine del 22%"]',
    "50_12": '        data_it: ["Treccia d\'Oro", "Villaggio degli Sciamani, Scaduview: Il talismano si trova davanti a una statua in cima alla collina all\'interno del tronco di un grande albero morto (l\'unico morto lì) nel Villaggio degli Sciamani della regione dello Scaduview. Le grazie più vicine sono Hinterland e Ponte Hinterland", "Aumenta la negazione del danno sacro del 22%"]',
    "50_13": '        data_it: ["Talismano Dracoperlaceo +3", "Si trova all\'interno di Shadow Keep, Deposito dei Campioni. Devi progredire fino al settimo piano per azionare la leva che sposta le statue. Una volta fatto, torna al terzo piano e trova la testa della statua per estrarre questo oggetto dalla sua barba. Un modo è visitare la grazia del Deposito, Quarto Piano, girarsi e andare a est verso il parapetto, poi fare un grande salto dal parapetto ai piedi della statua sottostante. Dopo l\'atterraggio, corri lungo la schiena della statua finché puoi scendere e saccheggiare il talismano", "Aumenta la negazione del danno non fisico dell\'11%"]',
    "50_14": '        data_it: ["Talismano del Seme Cremisi +1", "Al centro delle Rovine delle Dita di Rhia. Vai al grande anello di dita (come mostrato dalla Mappa delle Rovine data dal Conte Ymir), poi suona la campana appesa da uno dei dita che punta verso il basso. È necessaria la Collana con Buchi data da Ymir per suonarla", "Potenzia notevolmente il ripristino di PV dalla Fiaschetta delle Lacrime Cremisi del 30%"]',
    "50_15": '        data_it: ["Talismano del Seme Ceruleo +1", "Suona la Campana Appesa nelle Rovine delle Dita di Dheo", "Potenzia notevolmente il ripristino di PM dalla Fiaschetta delle Lacrime Cerulee del 30%"]',
    "50_16": '        data_it: ["Talismano della Rugiada Blu Benedetta", "Chiesa della Benedizione. Entra nella chiesa ed esamina la statua di Marika per trovare il Talismano della Rugiada Blu Benedetta", "Ripristina gradualmente il PM (0,5 PM al secondo)"]',
    "50_17": '        data_it: ["Talismano della Piuma Fine del Crogiolo", "Antiche Rovine di Rauh: Dalla grazia delle Antiche Rovine di Rauh, Est, viaggia a nordovest attraverso la grotta finché non raggiungi una stanza con due rami, poi sali il ramo e salta sull\'altro ramo a sinistra", "Migliora i passi indietro ma aumenta il danno subito del 15%"]',
    "50_18": '        data_it: ["Retaggio del Dio Esterno", "Trovato in un forziere all\'interno di un piccolo edificio in cima alla Città di Prospect", "Aumenta l\'arcano di 5"]',
    "50_19": '        data_it: ["Talismano della Pietra Frantumata", "Rovine di Moorth. Dalla Grazia del Sito delle Rovine di Moorth vai a sudest attraverso il grande arco di pietra. Ti dirigerai direttamente verso un edificio in rovina. Puoi passare dall\'ingresso della casa, uscire sul piccolo tetto, girare a sinistra e intorno all\'angolo troverai il talismano su un cadavere", "Aumenta la potenza delle abilità di calci e calpestio del 10%"]',
    "50_20": '        data_it: ["Talismano della Spada a Due Mani", "Rovine del Tempio: Trovato all\'interno della struttura più alta. Dopo la lotta con il Guerriero Cornuto, continua semplicemente su per le scale nella stanza successiva per trovare un forziere con questo oggetto", "Potenzia gli attacchi con armi a due mani del 15%"]',
    "50_21": '        data_it: ["Insegna della Crociata", "Insediamento della Torre di Belurat: L\'Insegna della Crociata si ottiene sconfiggendo il PNJ invasore Cavaliere del Fuoco Queelign", "Aumenta la potenza d\'attacco del 15% per 20 secondi dopo aver sconfitto un nemico"]',
    "50_22": '        data_it: ["Esultazione del Vecchio", "Boschi Abissali: Rilasciato dall\'Intoccabile Invecchiante vicino alla Chiesa Abbandonata. Dopo che l\'attacco con presa del nemico viene parato, l\'Intoccabile Invecchiante entra in uno stato vulnerabile in cui può essere danneggiato", "Aumenta la potenza d\'attacco del 20% quando la follia viene scatenata nelle vicinanze"]',
    "50_23": '        data_it: ["Talismano del Pungiglione Volante della Freccia", "Trovato in cima a una torre a Fort della Fenditura della Nebbia. Dall\'interno della porta della torre dove si trovava il Cavaliere Nero Garrew, passa attraverso un varco tra la torre e la parete rocciosa a est dell\'ingresso. Scendi sul percorso di legno e seguilo finché non vedi una scala sulla tua destra. Sali, e dopo vedrai un\'altra scala alla tua sinistra. Prendila fino al livello più alto della torre. Qui trovi il forziere con il Talismano", "Aumenta la gittata effettiva degli archi del 50% e aumenta la potenza d\'attacco di frecce e dardi dell\'8%"]',
    "50_24": '        data_it: ["Talismano dello Scudo Perlaceo", "Trovato in un forziere in un piccolo accampamento di soldati di Messmer nei boschi, a sudovest della Grazia della Forgia in Rovina di Taylew", "Aumenta la negazione di tutto il danno non fisico del 20% mentre si blocca"]',
    "50_25": '        data_it: ["Bouquet Essiccato", "Trovato in una piccola stanza nascosta dietro i detriti nell\'area dove si combattono diversi nemici Mosca-Uomo. Da dove si ottiene l\'Arco d\'Osso, uscendo dall\'ingresso, gira a sinistra e vedrai un mucchio di macerie su cui puoi saltare e vedrai una stanza segreta nascosta dietro. Entra in un grande magazzino", "Aumenta la potenza d\'attacco del 15% per 20 secondi quando uno spirito evocato muore"]',
    "50_26": '        data_it: ["Talismano della Forgiatura", "Forgia in Rovina Caduta delle Stelle: Saccheggiato da un cadavere. Il corpo si trova all\'interno di una stanza piena di nemici Blob di Fuoco, al livello più alto della Forgia in Rovina Caduta delle Stelle", "Potenzia gli attacchi con lancio di armi del 10%"]',
    "50_27": '        data_it: ["Talismano del Malanno", "Può essere saccheggiato da un cadavere. Il corpo si trova al bordo di un ponte di legno incompiuto del Villaggio degli Afflitti Abbandonato", "Quando certi malanni vengono scatenati, questo talismano concede resistenza di circa 350 allo stesso malanno"]',
    "50_28": '        data_it: ["Croce Incrociata di Rappresaglia", "Devi seguire la missione di Leda e invadere Ansbach. Poi torna alla grazia dove parli con Leda e dai i tuoi addii. Ti darà questo talismano prima che il dialogo finisca", "Potenzia gli attacchi eseguiti dopo una schivata rotolante o un passo indietro del 17%"]',
    "50_29": '        data_it: ["Croce Incrociata Lacerante", "Si ottiene aiutando Needle Knight Leda nell\'invadere e sconfiggere Hornsent dopo che lei lo sceglie come bersaglio, devi tornare alla grazia del Bivio dell\'Alta Via e parlarle dopo e lei ti darà il talismano. Se inizi il combattimento con Messmer a Shadow Keep, non puoi ottenere questo oggetto, poiché i segni di invasione/assistenza di Hornsent vengono rimossi", "Potenzia gli attacchi in corsa del 15% in PvE e del 7,5% in PvP"]',
    "50_30": '        data_it: ["Talismano del Tiro Preciso", "Trovato nell\'Abitazione degli Albinauric nello Scaduview", "Aumenta la potenza d\'attacco dei tiri di precisione del 12%"]',
    "50_31": '        data_it: ["Sorriso di Santa Trina", "Ottenuto come bottino sconfiggendo il PNJ ostile Thiollier. Thiollier diventa ostile solo se si persegue la missione di Santa Trina e Thiollier", "Aumenta la potenza d\'attacco del 20% per 30 secondi quando il sonno viene scatenato nelle vicinanze"]',
    "50_32": '        data_it: ["Talismano del Timore", "Abitazione degli Anziani: Si trova su un cadavere all\'interno dell\'Abitazione degli Anziani", "Aumenta la potenza del magma del 14%"]',
    "50_33": '        data_it: ["Bestia Divina Infuriata", "Può essere selezionata come uno dei possibili premi scambiando il Ricordo del Leone Danzante con Enia alla Tavola Rotonda", "Aumenta la potenza delle tempeste del 10%"]',
    "50_34": '        data_it: ["Polvere di Stelle Amata", "Data dal Conte Ymir dopo aver completato la prima parte della sua missione", "Riduce al minimo il tempo di lancio degli incantesimi magici e delle incantazioni, ma aumenta il danno subito del 30%"]',
    "50_35": '        data_it: ["Talismano della Concessione del Signore", "Shadow Keep: Si trova accanto al grande albero dorato", "Aumenta la poise del 54% dopo aver usato una fiaschetta delle lacrime"]',
    "50_36": '        data_it: ["Disco Verderame", "A ovest della grazia del Bivio dell\'Alta Via c\'è un portale che può essere sbloccato con una Chiave della Spada Intarsiata. Attraversato il portale, sali la collina per vedere due cascate che scorrono davanti a una serie di archi di pietra. Attraverso il mezzo delle due cascate, e oltre un Guerriero Uccello Divino, c\'è una statua con questo talismano alla sua base", "Aumenta la difesa con un carico d\'equipaggiamento più alto"]',
    "50_37": '        data_it: ["Cameo di Rellana", "Situato a Castel Ensis dietro il PNJ ostile Moonrithyll, posato su un altare", "Potenzia gli attacchi del 15% dopo aver mantenuto la stessa posizione per 2 secondi"]',
    "50_38": '        data_it: ["Lama della Misericordia", "Dalla Grazia del Sito delle Rovine Bruciate, vai a sud lungo il percorso. Poco dopo aver passato sotto il ponte sopra, ci saranno 2 piccoli alberi alla tua sinistra. Gira a ovest e vedrai una piccola scalinata. Sali i quattro gradini, poi vai a sud su una leggera pendenza per trovare una scalinata a ovest. Segui questo percorso, su altre scale, a nord su un piccolo tetto di tessuto e altre scale, poi a est attraverso il tetto di tessuto del ponte. Sali le scale a nord e apri la porta. All\'interno c\'è un forziere, aprilo per trovare l\'oggetto", "Aumenta la potenza d\'attacco del 20% per 20 secondi dopo ogni colpo critico"]',
    "50_39": '        data_it: ["Talismano di Tutti i Crogioli", "Parti dalla grazia del Grande Corridoio delle Antiche Rovine, vai a sudovest verso l\'ascensore. In fondo all\'ascensore guardando a sudovest, ci sono 2 percorsi di piattaforme galleggianti, vai su quello di sinistra, segui il giro e porta a un forziere con questo talismano", "Riduce il danno subito dai colpi critici e dai colpi alla testa e migliora l\'efficacia delle schivate rotolanti e dei passi indietro, ma aumenta anche il danno subito del 45%"]',
}


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    output_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip('\n')

        # --- Handle title lines ---
        if stripped in TITLE_TRANSLATIONS:
            output_lines.append(line)
            it_value = TITLE_TRANSLATIONS[stripped]
            output_lines.append(it_value + '\n')
            i += 1
            continue

        # --- Handle id: line followed eventually by data: line ---
        # Check if this is an id line like:        - id: "1_1"
        stripped_s = stripped.strip()
        if stripped_s.startswith('- id:') or stripped_s.startswith('id:'):
            # Extract the id value
            # Typical form: "      - id: \"1_1\""  or  "        id: \"1_1\""
            id_val = None
            if '- id:' in stripped_s:
                id_part = stripped_s.split('- id:')[1].strip().strip('"').strip("'")
                id_val = id_part
            elif stripped_s.startswith('id:'):
                id_part = stripped_s.split('id:')[1].strip().strip('"').strip("'")
                id_val = id_part

            if id_val and id_val in DATA_TRANSLATIONS:
                # Emit the id line
                output_lines.append(line)
                i += 1
                # Now scan forward for the data: line for this item
                # (there may be icon:, dlc:, etc. lines in between)
                while i < len(lines):
                    cur = lines[i]
                    cur_stripped = cur.rstrip('\n').strip()
                    if cur_stripped.startswith('data:'):
                        # Emit the data: line
                        output_lines.append(cur)
                        output_lines.append(DATA_TRANSLATIONS[id_val] + '\n')
                        i += 1
                        break
                    else:
                        output_lines.append(cur)
                        i += 1
                continue
            else:
                output_lines.append(line)
                i += 1
                continue

        output_lines.append(line)
        i += 1

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(output_lines)

    print(f"Done. Processed {len(lines)} input lines -> {len(output_lines)} output lines.")
    print(f"Inserted {len(output_lines) - len(lines)} new lines.")


if __name__ == '__main__':
    process_file('/home/user/elden-lord/data/checklists/talismans.yaml')
