#!/usr/bin/env python3
"""
Add Italian translations (title_it and data_it fields) to incantations.yaml
using a line-by-line string approach to preserve comments and formatting.
"""

# --- Mapping: exact title line -> title_it line to insert after it ---
TITLE_TRANSLATIONS = {
    'title: Incantations': 'title_it: Incantazioni',
    '    title: "Bestial Incantations"': '    title_it: "Incantazioni Bestiali"',
    '    title: "Blood Incantations"': '    title_it: "Incantazioni del Sangue"',
    '    title: "Dragon Communion Incantations"': '    title_it: "Incantazioni della Comunione Draconica"',
    '    title: "Dragon Cult Incantations"': '    title_it: "Incantazioni del Culto del Drago"',
    '    title: "Erdtree Incantations"': '    title_it: "Incantazioni dell\'Erdtree"',
    '    title: "Fire Giant Incantations"': '    title_it: "Incantazioni del Gigante di Fuoco"',
    '    title: "Fire Monk Incantations"': '    title_it: "Incantazioni dei Monaci del Fuoco"',
    '    title: "Frenzied Flame Incantations"': '    title_it: "Incantazioni della Fiamma della Follia"',
    '    title: "Godskin Apostle Incantations"': '    title_it: "Incantazioni dell\'Apostolo Godskin"',
    '    title: "Golden Order Incantations"': '    title_it: "Incantazioni dell\'Ordine d\'Oro"',
    '    title: "Servants Of Rot Incantations"': '    title_it: "Incantazioni dei Servitori della Putrefazione"',
    '    title: "Two Fingers Incantations"': '    title_it: "Incantazioni delle Due Dita"',
    '    title: "Realm of Shadow"': '    title_it: "Regno dell\'Ombra"',
}

# --- Mapping: item id -> data_it line to insert after that item's data: line ---
DATA_TRANSLATIONS = {
    # Bestial
    "1_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Beast+Claw\\">Artiglio Bestiale</a>", "Crea artigli che squarciano il terreno.", "Santuario Bestiale: Premio da Gurranq, Chierico delle Bestie dopo avergli donato la quinta Radice della Morte."]',
    "1_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Bestial+Constitution\\">Costituzione Bestiale</a>", "Riempie il corpo di vigore bestiale, alleviando l\'accumulo di gelo e perdita di sangue.", "Rilasciata da uno Scarabeo Lacrimagemma lungo la scogliera a nordest del Piccolo Erdtree nel Barrow dei Draghi."]',
    "1_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Bestial+Sling\\">Fionda Bestiale</a>", "Scaglia rapidamente schegge di roccia affilate. Può essere lanciata senza ritardo dopo un\'altra azione.", "Santuario Bestiale: Premio da Gurranq, Chierico delle Bestie dopo avergli donato due Radici della Morte."]',
    "1_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Bestial+Vitality\\">Vitalità Bestiale</a>", "Riempie il corpo di vigore bestiale, ripristinando i PV nel tempo.", "Santuario Bestiale: Premio da Gurranq, Chierico delle Bestie dopo avergli donato la terza Radice della Morte."]',
    "1_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Gurranq\'s+Beast+Claw\\">Artiglio Bestiale di Gurranq</a>", "Crea artigli bestiali che dilacerano i dintorni con onde d\'urto.", "Santuario Bestiale: Premio da Gurranq, Chierico delle Bestie dopo avergli donato l\'ottava Radice della Morte."]',
    "1_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Stone+of+Gurranq\\">Pietra di Gurranq</a>", "Scaglia un masso davanti al lanciatore. Può essere lanciata ripetutamente.", "Santuario Bestiale: Premio da Gurranq, Chierico delle Bestie dopo avergli donato la sesta Radice della Morte."]',
    # Blood
    "2_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Bloodboon\\">Grazia del Sangue</a>", "Sparge fiamma sanguinosa davanti al lanciatore per incendiare l\'area.", "Scambia il Ricordo del Signore del Sangue con Enia alla Tavola Rotonda."]',
    "2_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Bloodflame+Blade\\">Lama Fiamma Sanguinosa</a>", "Incanta l\'armamento nella mano destra con la fiamma sanguinosa.", "Liurnia dei Laghi: Rilasciata da uno Scarabeo Lacrimagemma nelle paludi a nordovest della Chiesa delle Rose."]',
    "2_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Bloodflame+Talons\\">Artigli Fiamma Sanguinosa</a>", "Crea lacerazioni di fiamma sanguinosa che poi esplodono.", "Rilasciata da Mohg l\'Omen nei Profondi Abbandonati, Grotte Sotterranee Sigillate, sotto Leyndell."]',
    "2_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Swarm+of+Flies\\">Sciame di Mosche</a>", "Rilascia uno sciame di mosche sanguinarie davanti al lanciatore.", "Trovata su un cadavere lungo la parete est della palude di sangue del Palazzo Mohgwyn."]',
    # Dragon Communion
    "3_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Agheel\'s+Flame\\">Fiamma di Agheel</a>", "Sputa fiamme di Agheel dall\'alto.", "Acquistabile all\'Altare della Comunione Draconica nella Cattedrale della Comunione Draconica a Caelid per 2 Cuori di Drago."]',
    "3_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Borealis\'s+Mist\\">Nebbia di Borealis</a>", "Sputa gelido alito di Borealis dall\'alto.", "Acquistabile all\'Altare della Comunione Draconica dopo aver sconfitto Borealis, la Nebbia Ghiacciante."]',
    "3_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Dragonclaw\\">Artiglio Draconico</a>", "Incanalando il drago, dilacera i nemici con artigli draconici.", "Trovata sull\'isola con la Chiesa della Comunione Draconica. Serve 1 Cuore di Drago."]',
    "3_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Dragonfire\\">Fuoco Draconico</a>", "Incanalando il drago, sputa fiamme.", "Trovata sull\'isola con la Chiesa della Comunione Draconica. Serve 1 Cuore di Drago."]',
    "3_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Dragonice\\">Ghiaccio Draconico</a>", "Incanalando il drago, sputa gelido alito.", "Acquistabile all\'Altare della Comunione Draconica per 1 Cuore di Drago."]',
    "3_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Dragonmaw\\">Fauci Draconie</a>", "Incanalando il drago, morde i nemici davanti al lanciatore.", "Trovata sull\'isola con la Chiesa della Comunione Draconica. Serve 1 Cuore di Drago."]',
    "3_7": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Ekzykes\'s+Decay\\">Decomposizione di Ekzykes</a>", "Sputa alito di putrefazione scarlatta di Ekzykes dall\'alto.", "Acquistabile dalla Cattedrale della Comunione Draconica a Caelid dopo aver sconfitto Ekzykes in Decomposizione."]',
    "3_8": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Glintstone+Breath\\">Soffio di Splendopietra</a>", "Incanalando il drago, sputa alito magico.", "Acquistabile all\'Altare della Comunione Draconica per 1 Cuore di Drago."]',
    "3_9": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Greyoll\'s+Roar\\">Ruggito di Greyoll</a>", "Emette il ruggito del Drago Anziano Greyoll.", "Acquistabile all\'Altare della Comunione Draconica per un Cuore di Drago, dopo aver sconfitto Greyoll."]',
    "3_10": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Magma+Breath\\">Soffio di Magma</a>", "Incanalando il wyrm, sputa alito di magma.", "Acquistabile all\'Altare della Comunione Draconica per 1 Cuore di Drago dopo aver ucciso il Magma Wyrm."]',
    "3_11": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Placidusax\'s+Ruin\\">Rovina di Placidusax</a>", "Sputa alito dorato del Signore Drago Placidusax.", "Scambia il Ricordo del Signore Drago con Enia alla Tavola Rotonda."]',
    "3_12": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Rotten+Breath\\">Soffio Marcio</a>", "Incanalando il drago, sputa alito di putrefazione scarlatta.", "Acquistabile all\'Altare della Comunione Draconica per 1 Cuore di Drago."]',
    "3_13": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Smarag\'s+Glintstone+Breath\\">Soffio di Splendopietra di Smarag</a>", "Sputa alito magico del Drago Splendopietra Smarag dall\'alto.", "Acquistabile all\'Altare della Comunione Draconica a Caelid per 2 Cuori di Drago."]',
    "3_14": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Theodorix\'s+Magma\\">Magma di Theodorix</a>", "Sputa alito di magma di Theodorix dall\'alto.", "Acquistabile dalla Cattedrale della Comunione Draconica per 2 Cuori di Drago, dopo aver sconfitto il Grande Wyrm Theodorix."]',
    # Dragon Cult
    "4_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Ancient+Dragons\'+Lightning+Spear\\">Lancia Fulminea dei Draghi Antichi</a>", "Trafigge dall\'alto con una lancia di fulmine rosso.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere del Drago Antico."]',
    "4_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Ancient+Dragons\'+Lightning+Strike\\">Colpo di Fulmine dei Draghi Antichi</a>", "Evoca fulmine rosso che si diffonde dall\'impatto.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere del Drago Antico."]',
    "4_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Death+Lightning\\">Fulmine della Morte</a>", "Colpisce i dintorni con una tempesta di fulmine della morte.", "Scambia il Ricordo del Lichedrago con Enia alla Tavola Rotonda."]',
    "4_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Dragonbolt+Blessing\\">Benedizione del Dracobolto</a>", "Potenzia il corpo del lanciatore con il fulmine.", "Trovata alla Chiesa dello Stormcaller, dentro un forziere contro una parete."]',
    "4_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Electrify+Armament\\">Elettrificare l\'Armamento</a>", "Incanta l\'armamento nella mano destra con danno da fulmine.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere del Culto del Drago."]',
    "4_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Fortissax\'s+Lightning+Spear\\">Lancia Fulminea di Fortissax</a>", "Trafigge dall\'alto con due lance di fulmine rosso in tandem.", "Scambia il Ricordo del Lichedrago con Enia alla Tavola Rotonda."]',
    "4_7": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Honed+Bolt\\">Fulmine Affilato</a>", "Colpisce il nemico con un fulmine dall\'alto.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere del Culto del Drago."]',
    "4_8": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lansseax\'s+Glaive\\">Glaive di Lansseax</a>", "Falcia dall\'alto con un glaive di fulmine rosso.", "Rilasciata dal Drago Antico Lansseax."]',
    "4_9": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lightning+Spear\\">Lancia Fulminea</a>", "Scaglia una lancia fulminea davanti al lanciatore.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere del Culto del Drago."]',
    "4_10": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lightning+Strike\\">Colpo di Fulmine</a>", "Evoca un fulmine che si diffonde dall\'impatto.", "Penisola del Pianto: Rilasciato da uno Scarabeo Lacrimagemma in una spaccatura che separa il terreno con il Piccolo Erdtree."]',
    "4_11": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Vyke\'s+Dragonbolt\\">Dracobolto di Vyke</a>", "Incanta l\'armamento nella mano destra con danno da fulmine.", "Ottenuta sconfiggendo il Cavaliere della Tavola Rotonda Vyke all\'Evergaol del Contendente del Signore."]',
    "4_12": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Frozen+Lightning+Spear\\">Lancia di Fulmine Congelato</a>", "Trafigge dall\'alto con una lancia di fulmine ghiacciato.", "Rilasciata dal Soldato Dragonide di Nokstella."]',
    # Erdtree
    "5_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Aspects+of+the+Crucible:+Breath\\">Aspetto del Crogiolo: Soffio</a>", "Crea una sacca gutturale per sputare fuoco camminando.", "Arena del boss Rykard, Signore della Bestemmia. Uccidi Tanith mentre è seduta a mangiare il cadavere di Rykard."]',
    "5_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Aspects+of+the+Crucible:+Horns\\">Aspetto del Crogiolo: Corna</a>", "Crea un corno sulla spalla per incornare i nemici da bassa posizione.", "Rilasciata dal Cavaliere del Crogiolo in Castel Tempesta."]',
    "5_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Aspects+of+the+Crucible:+Tail\\">Aspetto del Crogiolo: Coda</a>", "Crea una coda flessibile per spazzare l\'area davanti al lanciatore.", "Rilasciata dal boss Cavaliere del Crogiolo all\'Evergaol di Stormhill."]',
    "5_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Barrier+of+Gold\\">Barriera d\'Oro</a>", "Aumenta notevolmente la negazione del danno magico per sé e per gli alleati.", "Leyndell, Capitale Reale: Rilasciata da uno Scarabeo Lacrimagemma invisibile dopo la battaglia con Godfrey (Ombra Dorata)."]',
    "5_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Black+Blade\\">Lama Nera</a>", "Fendente rotante con lama nera che emette un\'onda di luce.", "Scambia il Ricordo della Lama Nera con Enia alla Tavola Rotonda."]',
    "5_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Blessing+of+the+Erdtree\\">Benedizione dell\'Erdtree</a>", "Concede una grande benedizione a sé e agli alleati vicini.", "Trovata nella Camera della Regina a Leyndell, Capitale Reale."]',
    "5_7": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Blessing\'s+Boon\\">Grazia della Benedizione</a>", "Concede una benedizione a sé e agli alleati vicini.", "Acquistabile da Miriel, Pastore dei Voti alla Chiesa dei Voti per 4.000 rune."]',
    "5_8": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Elden+Stars\\">Stelle dell\'Elden</a>", "Crea una pioggia di stelle dorate che assalgono l\'area.", "Nelle Profondità delle Radici, dirigiti a ovest dalla grazia della Cresta della Grande Cascata fino alle radici."]',
    "5_9": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Erdtree+Heal\\">Cura dell\'Erdtree</a>", "Ripristina vastamente i PV per sé e per gli alleati vicini.", "Trovata nella Camera della Regina a Leyndell, Capitale di Cenere."]',
    "5_10": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Golden+Lightning+Fortification\\">Fortezza del Fulmine Dorato</a>", "Aumenta notevolmente la resistenza al fulmine per sé e per gli alleati.", "Farum Azula in Rovina: Rilasciata da uno Scarabeo Lacrimagemma a sud della piazza della fontana."]',
    "5_11": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Golden+Vow+(Spell)\\">Voto d\'Oro</a>", "Aumenta l\'attacco e la difesa per sé e per gli alleati.", "Baracca Fetida di Cadaveri, nel Monte Gelmir."]',
    "5_12": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Protection+of+the+Erdtree\\">Protezione dell\'Erdtree</a>", "Aumenta la negazione del danno da affinità per sé e per gli alleati.", "Rilasciata da uno scarabeo d\'incantazione su una piattaforma di pietra ad est della prima posizione di Goldmask."]',
    "5_13": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Wrath+of+Gold\\">Ira d\'Oro</a>", "Produce un\'onda d\'urto dorata che respinge i nemici.", "Trovata alle Rovine di Woodfolk, in un forziere in fondo a una scala."]',
    # Fire Giant
    "6_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Burn+O+Flame!\\">Brucia, o Fiamma!</a>", "Solleva una serie di pilastri di fiamma attorno al lanciatore.", "Scambia il Ricordo del Gigante di Fuoco con Enia alla Tavola Rotonda."]',
    "6_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+of+the+Fell+God\\">Fiamma del Dio Crudele</a>", "Evoca una palla di fuoco impetuosa che esplode e incendia l\'area.", "Liurnia dei Laghi: Rilasciata da Adan, Ladro del Fuoco alla sua sconfitta."]',
    "6_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+Fall+Upon+Them\\">Fiamma, Cala su di Loro</a>", "Scaglia più palle di fuoco contemporaneamente.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere dei Giganti."]',
    "6_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Giantsflame+Take+Thee\\">Fiamma dei Giganti, Prenditi!</a>", "Scaglia un\'enorme palla di fuoco impetuoso.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere dei Giganti."]',
    # Fire Monk
    "7_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+Sling\\">Fionda Infuocata</a>", "Lancia palle di fuoco impetuoso.", "Venduta da Fratello Corhyn alla Tavola Rotonda per 800 rune."]',
    "7_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+Cleanse+Me\\">Fiamma, Purificami</a>", "Allevia l\'accumulo e cura il veleno e la putrefazione scarlatta.", "Tenuta da uno dei cadaveri nel campo dei Monaci del Fuoco, a sudest della Chiesa dei Voti."]',
    "7_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+Grant+Me+Strength\\">Fiamma, Donami Forza</a>", "Aumenta la potenza di attacco fisico e con affinità al fuoco.", "Trovata dietro Fort Gael, su un corpo tra due Lanciafiamme Manovrabili."]',
    "7_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+Protect+Me\\">Fiamma, Proteggimi</a>", "Aumenta notevolmente la negazione del danno da fuoco.", "Tomba dell\'Eroe Conquistatore dei Giganti: Trovata su un cadavere in una stanza sigillata vicino all\'inizio, di fronte al Sito di Grazia."]',
    "7_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/O+Flame!\\">O, Fiamma!</a>", "Scintilla momentaneamente fiamme ruggenti dalla mano.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere dei Monaci del Fuoco."]',
    "7_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Surge+O+Flame!\\">Scaturisci, o Fiamma!</a>", "Incenerisce l\'area davanti al lanciatore con un getto di fuoco.", "Acquistabile da Fratello Corhyn o Miriel, Pastore dei Voti dopo aver donato il Libro di Preghiere dei Monaci del Fuoco."]',
    "7_7": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Whirl+O+Flame!\\">Vortica, o Fiamma!</a>", "Spazza l\'area davanti al lanciatore con un getto di fuoco.", "Rilasciata da uno Scarabeo Lacrimagemma sulla strada tra il Balcone di Rotview e le Rovine Caelem."]',
    "7_8": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Fire\'s+Deadly+Sin\\">Peccato Mortale del Fuoco</a>", "Incendia l\'area e sé stesso con fiamme impetuose.", "Acquisire il Dipinto dell\'Uccello Senza Volo da Leyndell. Poi recarsi al belvedere di Windmill Heights."]',
    "7_9": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Catch+Flame\\">Cattura la Fiamma</a>", "Scintilla momentaneamente la fiamma dalla mano.", "Equipaggiamento iniziale del Profeta. Venduta da Fratello Corhyn alla Tavola Rotonda per 600 rune."]',
    # Frenzied Flame
    "8_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Frenzied+Burst\\">Esplosione Frenetica</a>", "Emette un esplosione concentrata di fiamma frenetica gialla dagli occhi.", "Rilasciata da uno Scarabeo Lacrimagemma a Liurnia dei Laghi, a sud della Chiesa dell\'Inibizione."]',
    "8_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Howl+of+Shabriri\\">Urlo di Shabriri</a>", "Urla, accumulando follia nei nemici vicini.", "Trovata in un forziere al secondo livello della Torre della Fiamma Frenetica."]',
    "8_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Inescapable+Frenzy\\">Frenesia Inesorabile</a>", "Si aggrappa ai nemici per diffondere la follia.", "Dopo le Grotte Sotterranee Sigillate e aver sconfitto Mohg l\'Omen, attacca l\'altare nella stanza del boss per rivelare una nuova area."]',
    "8_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/The+Flame+of+Frenzy\\">La Fiamma della Frenesia</a>", "Emette un\'esplosione di fiamma frenetica gialla dagli occhi.", "Chiesa Battesimale di Callu nella Penisola del Pianto. Trovata su un cadavere accanto a un pilastro sul lato sinistro."]',
    "8_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Unendurable+Frenzy\\">Frenesia Insopportabile</a>", "Emette una violenta esplosione di fiamma frenetica gialla dagli occhi.", "Rovine di Yelough Anix: Trovata in un forziere in una stanza del tesoro sotterranea."]',
    # Godskin Apostle
    "9_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Black+Flame\\">Fiamma Nera</a>", "Lancia una palla di fuoco nero impetuoso.", "Sbloccata per l\'acquisto dopo aver dato un Libro di Preghiere Godskin a Fratello Corhyn."]',
    "9_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Black+Flame+Blade\\">Lama di Fiamma Nera</a>", "Incanta l\'armamento nella mano destra con la fiamma nera.", "Sbloccata per l\'acquisto dopo aver dato un Libro di Preghiere Godskin a Fratello Corhyn."]',
    "9_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Black+Flame+Ritual\\">Rituale della Fiamma Nera</a>", "Evoca un cerchio di pilastri di fiamma nera attorno al lanciatore.", "Grotta dello Spirito Chiamante: Rilasciata dall\'Apostolo Godskin e dal Nobile Godskin in un incontro consecutivo."]',
    "9_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Black+Flame\'s+Protection\\">Protezione della Fiamma Nera</a>", "Aumenta la negazione del danno fisico.", "Ricevuta da Gideon Ofnir, dopo aver selezionato il dialogo \'del medaglione segreto\'. Richiede entrambe le metà del Medaglione Segreto dell\'Haligtree."]',
    "9_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Noble+Presence\\">Presenza Nobile</a>", "Spinge la pancia in avanti con vigore per liberare un\'onda d\'urto repulsiva.", "Acquisita sconfiggendo il Nobile Godskin al Maniero Vulcanico."]',
    "9_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Scouring+Black+Flame\\">Fiamma Nera Purificatrice</a>", "Spazza l\'area davanti al lanciatore con la fiamma nera.", "Rilasciata dall\'Apostolo Godskin."]',
    # Golden Order
    "10_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Discus+of+Light\\">Disco di Luce</a>", "Spara un anello di luce davanti al lanciatore.", "Acquistabile da Fratello Corhyn per 11.000 rune dopo essersi spostato vicino a Goldmask sull\'Altopiano Altus."]',
    "10_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Immutable+Shield\\">Scudo Immutabile</a>", "Aumenta la resistenza alle affinità e alle afflizioni dello scudo nella mano sinistra.", "Acquistabile da Fratello Corhyn come parte della sua missione, a ovest del Santuario dell\'Erdtree."]',
    "10_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Law+of+Causality\\">Legge della Causalità</a>", "Contrattacca dopo aver ricevuto un certo numero di colpi.", "Donata da Gideon Ofnir dopo aver sconfitto Mohg, Signore del Sangue e aver chiesto del bozzolo nell\'arena."]',
    "10_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Law+of+Regression\\">Legge della Regressione</a>", "Cura tutte le afflizioni e dispella tutti gli effetti speciali.", "Libro di Preghiere del Principato dell\'Ordine d\'Oro."]',
    "10_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Litany+of+Proper+Death\\">Litania della Morte Giusta</a>", "Crea un\'immagine dell\'Ordine per infliggere danno sacro.", "Acquistabile da D, Cacciatore di Morti per 2.500 rune O da Giovani Megine delle Dita alla Tavola Rotonda dopo aver dato loro il Portatore di D."]',
    "10_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Order+Healing\\">Guarigione dell\'Ordine</a>", "Allevia l\'accumulo di morte.", "Rilasciata da uno Scarabeo Lacrimagemma nella sezione circolare dell\'Acquedotto di Siofra."]',
    "10_7": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Order\'s+Blade\\">Lama dell\'Ordine</a>", "Incanta l\'armamento nella mano destra con danno sacro.", "Acquistabile da D, Cacciatore di Morti per 3.000 rune O da Giovani Megine delle Dita alla Tavola Rotonda dopo aver dato loro il Portatore di D."]',
    "10_8": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Radagon\'s+Rings+of+Light\\">Anelli di Luce di Radagon</a>", "Crea un anello dorato di luce per attaccare un\'ampia area.", "Libro di Preghiere del Principato dell\'Ordine d\'Oro."]',
    "10_9": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Triple+Rings+of+Light\\">Tre Anelli di Luce</a>", "Spara tre anelli di luce davanti al lanciatore.", "Elphael, Sostegno dell\'Haligtree: Dalla grazia della Stanza della Preghiera, dirigiti verso il camminamento orientale e scendi di un livello. C\'è una stanza del tesoro sigillata che richiede 2 Chiavi Spada di Pietra."]',
    # Servants of Rot
    "11_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Pest+Threads\\">Fili del Parassita</a>", "Lancia innumerevoli fili appiccicosi davanti al lanciatore.", "Venduta da Gowry per 7.500 rune dopo aver avanzato nella quest di Millicent e averle dato la Protesi della Valchiria."]',
    "11_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Poison+Armament\\">Armamento Avvelenato</a>", "Incanta l\'armamento tenuto nella mano destra con il veleno.", "Rilasciata da uno Scarabeo Lacrimagemma invisibile nella sezione nordest della Palude di Aeonia a est di Caelid."]',
    "11_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Poison+Mist\\">Nebbia Velenosa</a>", "Rilascia nebbia velenosa davanti al lanciatore.", "Penisola del Pianto: Rilasciata da uno Scarabeo Lacrimagemma in una zona boschiva a sudest del Sito di Grazia Bastione di Morne."]',
    "11_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Scarlet+Aeonia\\">Aeonia Scarlatta</a>", "Crea un gigantesco fiore che esplode con putrefazione scarlatta.", "Scambia il Ricordo della Dea della Putrefazione con Enia alla Tavola Rotonda."]',
    # Two Fingers
    "12_1": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Assassin\'s+Approach\\">Avvicinamento dell\'Assassino</a>", "Silenzia i passi, riduce i danni da caduta e i suoni.", "Incantazione iniziale del Confessore O acquistabile da Fratello Corhyn o Miriel dopo aver donato il Libro di Preghiere dell\'Assassino."]',
    "12_2": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Darkness\\">Oscurità</a>", "Crea un\'area di oscurità che nasconde il lanciatore.", "Acquistabile da Fratello Corhyn o Miriel dopo aver donato il Libro di Preghiere dell\'Assassino."]',
    "12_3": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Divine+Fortification\\">Fortezza Divina</a>", "Aumenta la negazione del danno sacro.", "Penisola del Pianto: Rilasciata da uno Scarabeo Lacrimagemma sopra una struttura di pietra crollata ricoperta di muschio giallo a sudovest delle Rovine di Tombsward."]',
    "12_4": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Flame+Fortification\\">Fortezza del Fuoco</a>", "Aumenta la negazione del danno da fuoco.", "Venduta da Fratello Corhyn alla Tavola Rotonda per 3.000 rune."]',
    "12_5": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Great+Heal\\">Grande Cura</a>", "Ripristina notevolmente i PV per sé e per gli alleati vicini.", "Venduta da Fratello Corhyn per 9.000 rune dopo essersi spostato sull\'Altopiano Altus."]',
    "12_6": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Heal\\">Cura</a>", "Ripristina i PV per te e per gli alleati vicini.", "Equipaggiamento iniziale del Profeta. Venduta da Fratello Corhyn alla Tavola Rotonda per 1.500 rune."]',
    "12_7": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lightning+Fortification\\">Fortezza del Fulmine</a>", "Aumenta la negazione del danno da fulmine.", "Venduta da Fratello Corhyn per 7.500 rune dopo essersi spostato sull\'Altopiano Altus."]',
    "12_8": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lord\'s+Aid\\">Aiuto del Signore</a>", "Allevia l\'accumulo di veleno, perdita di sangue e sonno per sé e per gli alleati.", "Acquistabile da Fratello Corhyn o Miriel dopo aver donato il Libro di Preghiere delle Due Dita."]',
    "12_9": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lord\'s+Divine+Fortification\\">Fortezza Divina del Signore</a>", "Aumenta notevolmente la negazione del danno sacro inclusi gli alleati.", "Dopo aver sconfitto Malenia, Lama di Miquella, parla con Gideon Ofnir delle radici dell\'Haligtree. Acquistabile da Giovani Megine dopo aver sconfitto Maliketh."]',
    "12_11": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Lord\'s+Heal\\">Cura del Signore</a>", "Ripristina massivamente i PV per sé e per gli alleati vicini.", "Acquistabile da Fratello Corhyn o Miriel dopo aver donato il Libro di Preghiere delle Due Dita."]',
    "12_12": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Magic+Fortification\\">Fortezza Magica</a>", "Aumenta la negazione del danno magico.", "Venduta da Fratello Corhyn alla Tavola Rotonda per 3.500 rune."]',
    "12_13": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Rejection\\">Rifiuto</a>", "Produce un\'onda d\'urto che respinge i nemici.", "Venduta da Fratello Corhyn alla Tavola Rotonda per 1.500 rune."]',
    "12_14": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Shadow+Bait\\">Esca dell\'Ombra</a>", "Crea un\'ombra che attira l\'aggressività dei nemici di corporatura umana.", "Trovata su un cadavere nelle Grotte Sotterranee Sigillate, in una stanza con il cadavere seduto al centro."]',
    "12_15": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Urgent+Heal\\">Cura d\'Urgenza</a>", "Ripristina una piccola quantità di PV.", "Equipaggiamento iniziale del Confessore. Venduta da Fratello Corhyn alla Tavola Rotonda per 1.000 rune."]',
    "12_16": '        data_it: ["<a href=\\"https://eldenring.wiki.fextralife.com/Cure+Poison\\">Cura del Veleno</a>", "Cura l\'afflizione del Veleno e riduce l\'accumulo di veleno.", "Venduta da Fratello Corhyn alla Tavola Rotonda per 1.000 rune."]',
    # Realm of Shadow DLC
    "20_1": '        data_it: ["Lama Furiosa di Ansbach", "Falcia i nemici con una lama di fiamma sanguinosa evocata dal lato della mano.", "Completa la questline di Sir Ansbach fino alla fine, schierandoti con lui contro Leda, poi combatti il Consort Radahn. Dopo la battaglia, il corpo di Sir Ansbach sarà vicino al Sito di Grazia con il suo equipaggiamento e questa Incantazione."]',
    "20_2": '        data_it: ["Cura a Distanza", "Ripristina notevolmente i PV per gli alleati lontani che l\'incantesimo raggiunge.", "Trovata a terra vicino alla base di un albero dorato sotterraneo, in un percorso di una grotta alla base delle Rovine Rauh."]',
    "20_3": '        data_it: ["Aspetti del Crogiolo: Spine", "Crea una massa di spine pungenti sulla schiena per spazzare l\'area.", "Rilasciata dall\'Ippopotamo Dorato prendendo l\'ascensore nel Cancello Principale di Shadow Keep."]',
    "20_4": '        data_it: ["Aspetti del Crogiolo: Fioritura", "Crea un fiore di Miranda sul petto per evocare una pioggia di luce.", "Trovata su un cadavere vicino al Grande Germoglio di Miranda nelle sezioni superiori delle Rovine Rauh."]',
    "20_5": '        data_it: ["Piccolo Erdtree", "Cura continuamente gli alleati nell\'area.", "Villaggio degli Sciamani: Trovato nel mezzo del campo luminoso di fiori."]',
    "20_6": '        data_it: ["Terra dell\'Ombra", "Spara una grandine di proiettili dorati verso i nemici.", "Può essere selezionata come ricompensa scambiando il Ricordo del Girasole dell\'Ombra con Enia alla Tavola Rotonda."]',
    "20_7": '        data_it: ["Ira a Distanza", "Spara un\'onda d\'urto dorata che respinge i nemici.", "Prendi l\'ascensore al Sito di Grazia Magazzino, Loft in Shadow Keep. Una volta al livello superiore, gira a sinistra poi di nuovo a sinistra, poi a destra."]',
    "20_8": '        data_it: ["Luce di Miquella", "Annichilisce i nemici con un pilastro di luce.", "Scambia il Ricordo di un Dio e un Signore con Enia alla Tavola Rotonda."]',
    "20_9": '        data_it: ["Anello di Luce Multistrato", "Spara un anello dorato multistrato di luce che infligge danni continuamente.", "Ottenuta sconfiggendo lo spirito Crociato Reietto nella Fessura del Sarcofago di Pietra."]',
    "20_10": '        data_it: ["Ruggito di Rugalea", "Incanalando il grande orso rosso, emette un ruggito furioso.", "Rilasciato da Rugalea il Grande Orso Rosso, situato a nordovest del Sito di Grazia Burrone Nord."]',
    "20_11": '        data_it: ["Lancia Fulminea del Cavaliere", "Scaglia una lancia fulminea sparando lance aggiuntive dalle creste del drago antico.", "Catacombe del Fiume Scorpione."]',
    "20_12": '        data_it: ["Dracobolto di Florissax", "Chiama un fulmine rosso per potenziare sé e gli alleati vicini.", "Ricevuta dalla Sacerdotessa della Comunione Draconica dopo averle dato la Miscela di Thiollier."]',
    "20_13": '        data_it: ["Elettrocarica", "Chiama un fulmine per caricare il corpo di elettricità.", "Catacombe della Nebbia Rift, dopo il secondo ascensore verso il basso."]',
    "20_14": '        data_it: ["Tirannia di Bayle", "Incanalando il drago terribile, ruggisce con un\'esplosione d\'onda di calore.", "Il Cuore di Bayle può essere usato al Grande Altare della Comunione Draconica per scambiarlo con il Fulmine di Fiamma di Bayle o la Tirannia di Bayle."]',
    "20_15": '        data_it: ["Fulmine di Fiamma di Bayle", "Incanalando il drago terribile, colpisce con un osso d\'artiglio infuso di fiamma-fulmine.", "Il Cuore di Bayle può essere usato al Grande Altare della Comunione Draconica per scambiarlo."]',
    "20_16": '        data_it: ["Soffio di Fiamma Fantasma", "Sputa alito di fiamma fantasma dall\'alto.", "3 Cuori di Drago possono essere usati al Grande Altare della Comunione Draconica per scambiare questo incantesimo."]',
    "20_17": '        data_it: ["Farfalle Marcescenti", "Evoca innumerevoli farfalle per spargere putrefazione.", "Scambia il Ricordo della Santa del Bocciolo con Enia alla Tavola Rotonda."]',
    "20_18": '        data_it: ["Lance del Filo del Parassita", "Secerne fili appiccicosi e li trasforma in due lance volanti verso il basso.", "Dalla grazia Ingresso Principale della Chiesa del Bocciolo, vai a nord nella grotta e scendi le scale, poi gira a destra o sinistra e vai dietro le scale."]',
    "20_19": '        data_it: ["Fiamma della Frenesia di Midra", "Evoca la testa del Signore della Fiamma Frenetica per sputare fiamma frenetica.", "Può essere selezionata come ricompensa scambiando il Ricordo del Signore della Fiamma Frenetica con Enia alla Tavola Rotonda."]',
    "20_20": '        data_it: ["Spirito Vigile", "Evoca uno spirito guardiano sopra la testa del lanciatore.", "Donata dalla Nonna Cornuta dopo aver sconfitto la Bestia Divina Leone Danzante."]',
    "20_21": '        data_it: ["Archi Dorati", "Rilascia una processione di archi dorati con un movimento del braccio.", "Dirigiti a sudest delle Rovine Moorth."]',
    "20_22": '        data_it: ["Grande Arco Dorato", "Rilascia un grande arco dorato con un movimento del braccio.", "Ottenuto saccheggiando un forziere nelle Rovine di Unte."]',
    "20_23": '        data_it: ["Spira", "Evoca una spirale di luce che esplode ai piedi del nemico.", "Enir-Ilim: Dalla grazia Prima Salita su una piattaforma rialzata accessibile tramite i rami degli alberi."]',
    "20_24": '        data_it: ["Tornado della Bestia Divina", "Evoca una tempesta che lancia un tornado in avanti.", "Rovine Antiche di Rauh: Questa incantazione cade dalla Bestia Divina Leone Danzante a nordest del Sito di Grazia Rovine della Città del Tempio."]',
    "20_25": '        data_it: ["Piume dell\'Uccello Divino", "Allarga le braccia come ali e rilascia una raffica di piume.", "Rovine Antiche di Rauh. Trovate sul cadavere nel mezzo del lago."]',
    "20_26": '        data_it: ["Serpente di Fuoco", "Lancia una fiamma con un\'avvolgimento serpentino.", "Shadow Keep: Dal Sito di Grazia Retro del Magazzino, sali la scala molto lunga."]',
    "20_27": '        data_it: ["Pioggia di Fuoco", "Bombarda il nemico con una pioggia di fuoco dall\'alto.", "Dal Sito di Grazia Bastione Ovest, attraversa tutto il ponte. Sconfiggi il Cavaliere del Fuoco alla fine per ottenerla."]',
    "20_28": '        data_it: ["Sfera di Messmer", "Trasforma la fiamma di Messmer in una sfera gigante che si scaglia verso il nemico.", "Può essere selezionata come ricompensa scambiando il Ricordo dell\'Impalatore con Enia alla Tavola Rotonda."]',
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
    process_file('/home/user/elden-lord/data/checklists/incantations.yaml')
