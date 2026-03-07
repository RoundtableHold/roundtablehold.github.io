import yaml
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(REPO_ROOT, 'data', 'checklists')

# Comprehensive Italian translations for descriptions and titles
stones_translations = {
    "title_main": "Pietre da forgiatura del drago antico",
    "title_regular": "Pietre da forgiatura del drago antico",
    "title_somber": "Pietre da forgiatura del drago funeree (antiche)",
    "table": ["Nome", "Luogo", "Ricompense", "Note"],
    "categories": {
        "<a href=\"https://eldenring.wiki.fextralife.com/Limgrave\">Limgrave</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Limgrave\">Sepolcride</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Caelid\">Caelid</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Caelid\">Caelid</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Mountaintops+of+the+Giants\">Mountaintops of the Giants</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Mountaintops+of+the+Giants\">Vette dei Giganti</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Consecrated+Snowfield\">Consecrated Snowfield</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Consecrated+Snowfield\">Terre sacre</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Miquella's+Haligtree\">Miquella's Haligtree</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Miquella's+Haligtree\">Sacro Albero di Miquella</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Elphael+Brace+of+the+Haligtree\">Elphael, Brace of the Haligtree</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Elphael+Brace+of+the+Haligtree\">Elphael, sostegno del Sacro Albero</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Crumbling+Farum+Azula\">Crumbling Farum Azula</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Crumbling+Farum+Azula\">Farum Azula in frantumi</a>",
        "Quests": "Missioni",
        "Realm of Shadow": "Regno dell'Ombra",
        "<a href=\"https://eldenring.wiki.fextralife.com/Leyndell,+Ashen+Capital\">Leyndell, Ashen Capital</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Leyndell,+Ashen+Capital\">Leyndell, Capitale delle Ceneri</a>",
        "<a href=\"https://eldenring.wiki.fextralife.com/Mohgwyn+Palace\">Mohgwyn Palace</a>": "<a href=\"https://eldenring.wiki.fextralife.com/Mohgwyn+Palace\">Palazzo di Mohgwyn</a>",
    },
    "descriptions": {
        # Regular Stones
        "Rewarded by <a href=\"https://eldenring.wiki.fextralife.com/Gurranq+Beast+Clergyman\">Gurranq, Beast Clergyman</a>, after feeding him 9 <a href=\"https://eldenring.wiki.fextralife.com/Deathroot\">Deathroot</a>. Alternatively, he will drop this stone when killed.": 
            "Ricompensa di <a href=\"https://eldenring.wiki.fextralife.com/Gurranq+Beast+Clergyman\">Gurranq, chierico bestiale</a> dopo avergli consegnato 9 <a href=\"https://eldenring.wiki.fextralife.com/Deathroot\">Radici mortali</a>. In alternativa, la lascia cadere se ucciso.",
        "Found on a corpse inside the mouth of a giant skull, just south-east of <a href=\"https://eldenring.wiki.fextralife.com/Church+of+Repose\">Church of Repose</a>.":
            "Su un cadavere all'interno della bocca di un teschio gigante, poco a sud-est della <a href=\"https://eldenring.wiki.fextralife.com/Church+of+Repose\">Chiesa del riposo</a>.",
        "Dropped from the two <a href=\"https://eldenring.wiki.fextralife.com/Night's+Cavalry\">Night's Cavalry</a> (Only spawn at night) escorting a troll-drawn carriage just south-west of the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4578&lat=-73.563&lng=141.781&zoom=8&code=mapA\">Inner Consecrated Snowfield</a> grace site.":
            "Lasciata dai due <a href=\"https://eldenring.wiki.fextralife.com/Night's+Cavalry\">Cavalieri notturni</a> (appaiono solo di notte) che scortano il carro trainato dai troll a sud-ovest della grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4578&lat=-73.563&lng=141.781&zoom=8&code=mapA\">Terre sacre interne</a>.",
        "Found at the east end of the frozen river on a ledge at bottom of the frozen waterfall, just past <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4656&lat=-69.554687&lng=150.321074&zoom=8&code=mapA\">Great Wyrm Theodorix</a>.":
            "All'estremità orientale del fiume ghiacciato, su una sporgenza ai piedi della cascata ghiacciata, poco oltre <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4656&lat=-69.554687&lng=150.321074&zoom=8&code=mapA\">Theodorix, il Grande Drago</a>.",
        "<a href=\"https://eldenring.wiki.fextralife.com/Yelough+Anix+Tunnel\">Yelough Anix Tunnel</a>: While making your way through the dungeon, you will find a corpse sitting on an iceshard bridge, go down the ladder just to the right; the smithing stone can be found on a corpse just past the non-boss <a href=\"https://eldenring.wiki.fextralife.com/Alabaster+Lord\">Alabaster Lord</a>.":
            "<a href=\"https://eldenring.wiki.fextralife.com/Yelough+Anix+Tunnel\">Galleria di Yelough Anix</a>: esplorando il dungeon troverai un cadavere seduto su un ponte di ghiaccio; scendi la scala a destra e troverai la pietra su un cadavere subito dopo il <a href=\"https://eldenring.wiki.fextralife.com/Alabaster+Lord\">Signore d'alabastro</a> (non boss).",
        "Looted from a corpse just below a hugging statue, north of the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4454&lat=-42.99&lng=147.24&zoom=8&code=mapA\">Haligtree Town Plaza</a> grace site. The stone is guarded by two winged and one red-maned <a href=\"https://eldenring.wiki.fextralife.com/Misbegotten\">Misbegotten</a>.":
            "Su un cadavere sotto una statua, a nord della grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4454&lat=-42.99&lng=147.24&zoom=8&code=mapA\">Piazza della città del Sacro Albero</a>. La pietra è sorvegliata da due <a href=\"https://eldenring.wiki.fextralife.com/Misbegotten\">Creature scagliose</a> alate e una dalla criniera rossa.",
        "After defeating <a href=\"https://eldenring.wiki.fextralife.com/Loretta,+Knight+of+the+Haligtree\">Loretta</a>, make your way down a long ladder and past (not down) the lift to find this stone in a chest.":
            "Dopo aver sconfitto <a href=\"https://eldenring.wiki.fextralife.com/Loretta,+Knight+of+the+Haligtree\">Loretta</a>, scendi la lunga scala e prosegui oltre l'ascensore (senza prenderlo) per trovare la pietra in un forziere.",
        "Dropped from the <a href=\"https://eldenring.wiki.fextralife.com/Farum+Azula+Dragon\">Farum Azula Dragon</a> that swoops down as you make your way along the curved platform, near the beginning of the area between the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=5855&lat=-129.96875&lng=218.876914&zoom=8&code=mapA\">Crumbling Beast Grave</a> and <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=5855&lat=-129.96875&lng=218.876914&zoom=8&code=mapA\">Crumbling Beast Grave Depths</a> grace sites.":
            "Lasciata dal <a href=\"https://eldenring.wiki.fextralife.com/Farum+Azula+Dragon\">Drago di Farum Azula</a> che plana mentre percorri la piattaforma curva, vicino all'inizio dell'area tra le grazie <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=5855&lat=-129.96875&lng=218.876914&zoom=8&code=mapA\">Cimitero della bestia in frantumi</a> e <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=5855&lat=-129.96875&lng=218.876914&zoom=8&code=mapA\">Profondità del cimitero della bestia</a>.",
        "Starting from the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4501&lat=-123.840626&lng=216.455498&zoom=8&code=mapA\">Dragon Temple Altar</a> grace site, head north through the door way and make your way past the assorted <a href=\"https://eldenring.wiki.fextralife.com/Azula+Beastman\">Azula Beastman</a> and dog enemies until you find yourself on a narrow platform lined with dragon statues. Head straight and near the end will be a spiral staircase you will climb up on your right. At the top of the staircase, turn left and jump across to the floating stone pillar. Carefully walk along the pillar and jump up to the platform. You can collect the stone near the ledge, guarded by a large beastman and dog.":
            "Dalla grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4501&lat=-123.840626&lng=216.455498&zoom=8&code=mapA\">Altare del Tempio del drago</a>, vai a nord e prosegui oltre gli <a href=\"https://eldenring.wiki.fextralife.com/Azula+Beastman\">Uomini bestia di Farum Azula</a> e i cani fino a una stretta piattaforma fiancheggiata da statue di draghi. Prosegui dritto e sali la scala a chiocciola sulla destra. In cima, gira a sinistra e salta sul pilastro fluttuante. Percorrilo con cura e salta sulla piattaforma. La pietra è vicino alla sporgenza, sorvegliata da un uomo bestia e un cane.",
        "Dropped from the stationary <a href=\"https://eldenring.wiki.fextralife.com/Farum+Azula+Dragon\">Farum Azula Dragon</a> sitting at the back of the plaza, south of the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4355&lat=-119.546875&lng=218.221505&zoom=8&code=mapA\">Dragon Temple Rooftop</a> grace site. The dragon will constantly rain down red lightning while the path is riddled with <a href=\"https://eldenring.wiki.fextralife.com/Warhawk\">Warhawks</a>.":
            "Lasciata dal <a href=\"https://eldenring.wiki.fextralife.com/Farum+Azula+Dragon\">Drago di Farum Azula</a> stazionario in fondo alla piazza, a sud della grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4355&lat=-119.546875&lng=218.221505&zoom=8&code=mapA\">Tetti del Tempio del drago</a>. Il drago evoca costantemente fulmini rossi mentre il percorso è infestato da <a href=\"https://eldenring.wiki.fextralife.com/Warhawk\">Falchi di guerra</a>.",
        "Rewarded by <a href=\"https://eldenring.wiki.fextralife.com/Witch-Hunter+Jerren\">Witch-Hunter Jerren</a> for siding with him at the end of <a href=\"https://eldenring.wiki.fextralife.com/Sorceress+Sellen\">Sorceress Sellen's</a> questline just outside the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=5846&lat=-134&lng=55&zoom=8&code=mapA\">Raya Lucaria Grand Library</a>.":
            "Ricompensa di <a href=\"https://eldenring.wiki.fextralife.com/Witch-Hunter+Jerren\">Jerren il cacciatore di streghe</a> per esserti schierato con lui alla fine della missione di <a href=\"https://eldenring.wiki.fextralife.com/Sorceress+Sellen\">Sellen</a>, fuori dalla <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=5846&lat=-134&lng=55&zoom=8&code=mapA\">Grande biblioteca di Raya Lucaria</a>.",
        "Rewarded by <a href=\"https://eldenring.wiki.fextralife.com/Nepheli+Loux\">Nepheli Loux</a> in Godrick's Throneroom (just past the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=1129&lat=-173.910938&lng=85.500353&zoom=8&code=mapA\">Godrick the Grafted</a> grace site) after completing <a href=\"https://eldenring.wiki.fextralife.com/Kenneth+Haight\">Kenneth Haight's</a> Lord of Limgrave questline. Unobtainable if <a href=\"https://eldenring.wiki.fextralife.com/Seluvis's+Potion\">Seluvis's Potion</a> was given to Nepheli.":
            "Ricompensa di <a href=\"https://eldenring.wiki.fextralife.com/Nepheli+Loux\">Nepheli Loux</a> nella sala del trono di Godrick (oltre la grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=1129&lat=-173.910938&lng=85.500353&zoom=8&code=mapA\">Godrick l'Innestato</a>) dopo aver completato la missione di <a href=\"https://eldenring.wiki.fextralife.com/Kenneth+Haight\">Kenneth Haight</a>. Non ottenibile se hai dato la <a href=\"https://eldenring.wiki.fextralife.com/Seluvis's+Potion\">pozione di Seluvis</a> a Nepheli.",
        "Purchased from <a href=\"https://eldenring.wiki.fextralife.com/Gatekeeper+Gostoc\">Gatekeeper Gostoc</a> in Godrick's Throneroom (just past the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=1129&lat=-173.910938&lng=85.500353&zoom=8&code=mapA\">Godrick the Grafted</a> grace site) after completing <a href=\"https://eldenring.wiki.fextralife.com/Kenneth+Haight\">Kenneth Haight's</a> Lord of Limgrave questline. Unobtainable if <a href=\"https://eldenring.wiki.fextralife.com/Seluvis's+Potion\">Seluvis's Potion</a> was given to Nepheli.":
            "Venduta da <a href=\"https://eldenring.wiki.fextralife.com/Gatekeeper+Gostoc\">Gostoc il guardiano del cancello</a> nella sala del trono di Godrick dopo aver completato la missione di <a href=\"https://eldenring.wiki.fextralife.com/Kenneth+Haight\">Kenneth Haight</a>. Non ottenibile se hai dato la pozione a Nepheli o se Gostoc è morto.",
        "Gravesite Plain - Ruined Forge Lava Intake: Interact with the furnace to obtain this item and the Anvil Hammer.":
            "Piana dei sepolcri - Forgia in rovina dell'afflusso lavico: interagisci con la fornace per ottenere questo oggetto e il Martello a incudine.",
        "Gravesite Plain - Dropped by the Magma Wyrm found inside the Dragon's Pit.":
            "Piana dei sepolcri - Lasciata dal Drago di magma all'interno della Fossa del drago.",
        "Gravesite Plain - At the top of the Suppressing Pillar, inside a chest.":
            "Piana dei sepolcri - In cima al Pilastro della repressione, in un forziere.",
        "Scadu Altus - Ruined Forge of Starfall Past: Interact with the furnace to obtain this item and the Ancient Meteoric Ore Greatsword.":
            "Altus dell'Ombra - Forgia in rovina di Starfall Past: interagisci con la fornace per ottenere questo oggetto e lo Spadone di minerale meteoritico antico.",
        "Jagged Peak - Dropped by Ancient Dragon Senessax, west of the Jagged Peak Summit Site of Grace.":
            "Picco dente di sega - Lasciata dal Drago antico Senessax, a ovest della grazia Cima del Picco dente di sega.",
        "Jagged Peak - Found next to 3 Skeletal Slimes on the way to Jagged Peak Summit Site of Grace, just before the last spiritspring before the site of grace.":
            "Picco dente di sega - Vicino a 3 Melme scheletriche sulla strada per la Cima del Picco dente di sega, poco prima dell'ultimo soffio spirituale prima della grazia.",
        "Rauh Base - Taylew's Ruined Forge: Can be looted on a balcony just next the central platform, in a room with 2 Smithing Golems.":
            "Base di Rauh - Forgia in rovina di Taylew: su un balcone vicino alla piattaforma centrale, in una stanza con 2 Golem forgiatori.",
        "Rauh Base - Taylew's Ruined Forge: Interacting with the furnace at the end of the dungeon. Also rewards the Taylew the Golem Smith Spirit Ashes.":
            "Base di Rauh - Forgia in rovina di Taylew: interagendo con la fornace alla fine del dungeon. Fornisce anche le Ceneri di Taylew, il Golem forgiatore.",

        # Somber Stones
        "Found in a chest just past the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4585&lat=-181.82&lng=148.195&zoom=8&code=mapB\">Dynasty Mausoleum Midpoint</a> grace site. The player should be careful as the chest is surrounded by a <a href=\"https://eldenring.wiki.fextralife.com/Sanguine+Noble\">Sanguine Noble</a> and seven 2nd generation <a href=\"https://eldenring.wiki.fextralife.com/Albinauric\">Albinaurics</a>.":
            "In un baule poco oltre la grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4585&lat=-181.82&lng=148.195&zoom=8&code=mapB\">Punto centrale del mausoleo</a>. Fai attenzione: il baule è circondato da un <a href=\"https://eldenring.wiki.fextralife.com/Sanguine+Noble\">Nobile sanguinario</a> e sette <a href=\"https://eldenring.wiki.fextralife.com/Albinauric\">Albinauri</a>.",
        "Dropped from the invading phantom <a href=\"https://eldenring.wiki.fextralife.com/Anastasia+Tarnished-Eater\">Anastasia, Tarnished-Eater</a>, on the frozen river near the scarab-chasing wolf pack, south of <a href=\"https://eldenring.wiki.fextralife.com/Ordina+Liturgical+Town\">Ordina, Liturgical Town</a>.":
            "Lasciata dal fantasma invasore <a href=\"https://eldenring.wiki.fextralife.com/Anastasia+Tarnished-Eater\">Anastasia, divoratrice di Senzaluce</a> sul fiume ghiacciato vicino al branco di lupi, a sud di <a href=\"https://eldenring.wiki.fextralife.com/Ordina+Liturgical+Town\">Ordina, città liturgica</a>.",
        "Start from the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4456&lat=-39.76&lng=148.97&zoom=8&code=mapA\">Prayer Room</a> grace site and head north along the walkway. Cross the second stone pillar on your right, falling down to the lower ledge of the tower and finally jumping down to the long walkway with the <a href=\"https://eldenring.wiki.fextralife.com/Erdtree+Avatar\">Erdtree Avatar</a>. At the southern end of the path will be a corpse with the stone on it.":
            "Dalla grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4456&lat=-39.76&lng=148.97&zoom=8&code=mapA\">Stanza della preghiera</a>, vai a nord. Attraversa il secondo pilastro a destra scendendo sulla sporgenza inferiore e poi sulla passerella dove si trova l' <a href=\"https://eldenring.wiki.fextralife.com/Erdtree+Avatar\">Incarnazione dell'Albero Madre</a>. All'estremità sud troverai la pietra su un corpo.",
        "Start from the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4456&lat=-39.76&lng=148.97&zoom=8&code=mapA\">Prayer Room</a> grace site and head north to the end of the walkway. Jump off the edge to your right, down to a stone beam that is adjacent to a platform with a gazebo and health scarab. Run past and go up another stone beam and at the top, there will be an opening with a chest; the stone can be found inside.":
            "Dalla grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4456&lat=-39.76&lng=148.97&zoom=8&code=mapA\">Stanza della preghiera</a>, vai a nord fino alla fine. Salta a destra su un pilastro vicino a un chiosco con uno scarabeo. Prosegui e sali su un altro pilastro: in cima troverai una stanza con un forziere contenente la pietra.",
        "Found in a gazebo behind the stationary <a href=\"https://eldenring.wiki.fextralife.com/Farum+Azula+Dragon\">Farum Azula Dragon</a> sitting at the back of the plaza, south of the <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4355&lat=-119.546875&lng=218.221505&zoom=8&code=mapA\">Dragon Temple Rooftop</a> grace site. The dragon will constantly rain down red lightning while the path is riddled with <a href=\"https://eldenring.wiki.fextralife.com/Warhawk\">Warhawks</a>.":
            "In un chiosco dietro al <a href=\"https://eldenring.wiki.fextralife.com/Farum+Azula+Dragon\">Drago di Farum Azula</a> stazionario in fondo alla piazza, a sud della grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=4355&lat=-119.546875&lng=218.221505&zoom=8&code=mapA\">Tetti del Tempio del drago</a>. Il drago evoca fulmini rossi mentre il percorso è pieno di <a href=\"https://eldenring.wiki.fextralife.com/Warhawk\">Falchi di guerra</a>.",
        "From the main <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=7251&lat=-100.476562&lng=116.70626&zoom=8&code=mapC\">Leyndell, Capital of Ash</a> grace site, head west and then up a sunken dragon wing. Jump to the crumbling wall where you will find a ladder to climb and then continue up the staircases. At the top of the rampart you will see a wandering gargoyle to your right, jump over the railing onto the soft sand below and you will find a corpse with the stone sitting in front of an eerily familiar building.":
            "Dalla grazia <a href=\"https://eldenring.wiki.fextralife.com/Interactive+Map?id=7251&lat=-100.476562&lng=116.70626&zoom=8&code=mapC\">Leyndell, capitale delle ceneri</a>, vai a ovest e sali sull'al'ala del drago sepolto. Salta sul muro rotto, sali la scala e poi le scale di pietra. In cima al baluardo vedrai un gargoyle a destra: scavalca la ringhiera sulla sabbia e troverai la pietra su un corpo davanti a un edificio familiare.",
        "Rewarded by <a href=\"https://eldenring.wiki.fextralife.com/Latenna\">Latenna</a> after completing her questline at the <a href=\"https://eldenring.wiki.fextralife.com/Apostate+Derelict\">Apostate Derelict</a> in the <a href=\"https://eldenring.wiki.fextralife.com/Consecrated+Snowfield\">Consecrated Snowfield</a>.":
            "Donata da <a href=\"https://eldenring.wiki.fextralife.com/Latenna\">Latenna</a> dopo aver completato la sua missione ai <a href=\"https://eldenring.wiki.fextralife.com/Apostate+Derelict\">Ruderi del reietto</a> nelle <a href=\"https://eldenring.wiki.fextralife.com/Consecrated+Snowfield\">Terre sacre</a>.",
        "<a href=\"https://eldenring.wiki.fextralife.com/Elphael+Brace+of+the+Haligtree\">Elphael, Brace of the Haligtree</a>: After completing <a href=\"https://eldenring.wiki.fextralife.com/Millicent\">Millicent's</a> questline and defeating <a href=\"https://eldenring.wiki.fextralife.com/Malenia+Blade+of+Miquella\">Malenia, Blade of Miquella</a>, insert the gold needle into Malenia's scarlet flower to receive the stone as well as <a href=\"https://eldenring.wiki.fextralife.com/Miquella's+Needle\">Miquella's Needle</a>.":
            "<a href=\"https://eldenring.wiki.fextralife.com/Elphael+Brace+of+the+Haligtree\">Elphael, sostegno del Sacro Albero</a>: dopo aver completato la missione di <a href=\"https://eldenring.wiki.fextralife.com/Millicent\">Millicent</a> e sconfitto <a href=\"https://eldenring.wiki.fextralife.com/Malenia+Blade+of+Miquella\">Malenia</a>, inserisci l'ago d'oro nel fiore scarlatto di Malenia per ricevere la pietra e l' <a href=\"https://eldenring.wiki.fextralife.com/Miquella's+Needle\">Ago di Miquella</a>.",
        "Gravesite Plain - Dropped by the Ghostflame Dragon found in the lake west of the Greatbridge, North Site of Grace.":
            "Piana dei sepolcri - Lasciata dal Drago di fiammapetrea nel lago a ovest della grazia Nord del granponte.",
        "Scadu Altus - Dropped by the Ghostflame Dragon found North of Fort Reprimand.":
            "Altus dell'Ombra - Lasciata dal Drago di fiammapetrea a nord di Forte Reprimenda.",
        "Cerulean Coast - Ghostflame Dragon found South of the Cerulean Coast Site of Grace.":
            "Costa cerulea - Drago di fiammapetrea a sud della grazia Costa cerulea.",
        "Jagged Peak - Dropped by Ancient Dragon Senessax, west from the Jagged Peak Summit Site of Grace.":
            "Picco dente di sega - Lasciata dal Drago antico Senessax, a ovest della grazia Cima del Picco dente di sega.",
        "Jagged Peak - From the Jagged Peak Mountainside Site of Grace, follow the path southwest and use the 2 spiritsprings to get to the elevated areas. Once you make it through the second spiritspring, turn around and drop down the area just below you, follow the path northeast and you'll find this material on a corpse.":
            "Picco dente di sega - Dalla grazia Pendici del Picco dente di sega, segui il sentiero a sud-ovest e usa i 2 soffi spirituali. Dopo il secondo, girati e scendi nell'area sottostante, segui il sentiero a nord-est per trovare l'oggetto su un cadavere.",
        "Enir-Ilim - From the altar with an elevator, head outside and go down. Be wary of an enemy lurking in the area. Get past the enemy and you'll find this material on a corpse at the edge of a broken stairs.":
            "Enir-Ilim - Dall'altare con l'ascensore, esci e scendi. Fai attenzione al nemico in zona. Oltrepassalo e troverai l'oggetto su un corpo alla fine di una scala interrotta.",
    }
}

scadutree_translations = {
    "title_main": "Frammenti dell'Albero Ombra & Ceneri di spirito venerato",
    "sections": {
        "Scadutree Fragments": "Frammenti dell'Albero Ombra",
        "Revered Spirit Ashes": "Ceneri di spirito venerato"
    },
    "categories": {
        "Gravesite Plain": "Piana dei sepolcri",
        "Belurat, Tower Settlement": "Belurat, insediamento della torre",
        "Belurat Tower Settlement": "Belurat, insediamento della torre",
        "Scadu Altus": "Altus dell'Ombra",
        "Ancient Ruins Base": "Base delle antiche rovine",
        "Shadow Keep": "Rocca delle Ombre",
        "Cerulean Coast": "Costa cerulea",
        "Stone Coffin Fissure": "Faglia con bara di pietra",
        "Charo's Hidden Grave": "Tomba nascosta di Charo",
        "Abyssal Woods": "Boschi abissali",
        "Scadutree Base": "Base dell'Albero Ombra",
        "Rauh Ruins": "Rovine di Rauh",
        "Enir-Ilim": "Enir-Ilim",
        "Scaduview": "Scaduview",
        "Jagged Peak": "Picco dente di sega",
        "Rauh Ancient Ruins": "Antiche rovine di Rauh",
        "Abandoned Ailing Village": "Villaggio malato abbandonato",
        "Temple Town Ruins": "Rovine della città del tempio",
        "Bonny Village": "Villaggio di Bonny",
        "Moorth Ruins": "Rovine di Moorth",
        "Village of Flies": "Villaggio delle mosche",
        "Ancient Ruins of Rauh, West": "Antiche rovine di Rauh ovest",
        "Ancient Ruins of Rauh, East": "Antiche rovine di Rauh est",
        "Ruins of Unte": "Rovine di Unte",
        "Ellac River cave": "Grotta del fiume Ellac",
        "Midra's Manse": "Villa di Midra"
    },
    "descriptions": {
        "(x1) Can be found by the Miquella's Cross of the Three-Path Cross Site of Grace.": "(x1) Si trova presso la Croce di Miquella della grazia del Valico dei tre sentieri.",
        "(x1) Can be found next to the statue of Marika, located at a Messmer Soldier encampment.": "(x1) Si trova accanto alla statua di Marika in un accampamento di soldati di Messmer.",
        "(x2) Can be found at the Church of Consolation's by the statue of Marika.": "(x2) Si trovano alla Chiesa della Consolazione, presso la statua di Marika.",
        "(x1) Can be found by Miquella's Cross of the Main Gate Cross Site of Grace near NPCs Sir Ansbach and Moore.": "(x1) Si trova presso la Croce di Miquella della grazia dell'Ingresso principale, vicino ai PNG Sir Ansbach e Moore.",
        "(x1) Dropped by a pot-bearing Shadow enemy in a gravesite that sparkles and runs away. Kill it quickly to get the drop.": "(x1) Lasciato da un'ombra con vaso in un cimitero; brilla e scappa via. Uccidila rapidamente per ottenere l'oggetto.",
        "(x1) Item drops from a pot-bearing Shadow enemy. Grants 707 Runes upon defeat. Drops 1 Scadutree Fragment and 1 Silver Horn Tender. In a gravesite area, southwest of Cliffroad Terminus Site of Grace. Surrounded by other shadow enemies and a dog.": "(x1) Lasciato da un'ombra con vaso. Fornisce 707 rune. Rilascia 1 frammento dell'Albero Ombra e 1 lingua di corno d'argento. In un'area cimiteriale, a sud-ovest della grazia Fine della via sulla scarpata. Circondata da altre ombre e un cane.",
        "(x1) Can be found beside Miquella's Cross of the Castle Ensis Checkpoint Site of Grace.": "(x1) Si trova accanto alla Croce di Miquella della grazia del Posto di blocco di Castel Ensis.",
        "(x1) Can be looted from the ground beside Miquella's Cross of the Pillar Path Cross Site of Grace.": "(x1) Si trova a terra accanto alla Croce di Miquella della grazia della Croce della via dei pilastri.",
        "(x1) Upon reaching a large room on the northwest side with the 2 large Spider Scorpions in it and the Bone Bow, jump over the rubble on the right side just before the doorway to this room. There's another doorway just behind the rubble, and following the path beyond will lead to a small room with the fragment, next to a Miquella's Cross.": "(x1) Una volta raggiunta una grande stanza sul lato nord-ovest con 2 grandi scorpioni ragno e l'Arco d'osso, salta le macerie sul lato destro subito prima dell'ingresso. C'è un'altra porta dietro le macerie; segui il sentiero per arrivare a una piccola stanza con il frammento, accanto a una Croce di Miquella.",
        "(x1) Can be found by Miquella's Cross of the Highroad Cross Site of Grace and NPCs Hornsent and Needle Knight Leda.": "(x1) Si trova presso la Croce di Miquella della grazia della Croce della via maestra, vicino ai PNG Cornuto e Leda, Cavaliere dell'Ago.",
        "(x1) Can be looted by the statue of Marika located at the Messmer Soldiers encampment situated along the main entrance of the Shadow Keep. If you aggroed the Furnace Golem in this area, chances are the creature can destroy the statue. But you can still find the Scadutree Fragment there.": "(x1) Presso la statua di Marika nell'accampamento di soldati di Messmer all'ingresso principale della Rocca delle Ombre. Se hai attirato il Golem della fornace in quest'area, potrebbe distruggere la statua, ma il frammento sarà comunque lì.",
        "(x1) Northwest of the Moorth Ruins Site of Grace, there is a Messmer Soldiers encampment. 1 Scadutree Fragment can looted by the statue of Marika.": "(x1) A nord-ovest della grazia Rovine di Moorth c'è un accampamento di soldati di Messmer. Si trova presso la statua di Marika.",
        "(x2) Can looted off the ground. The item is found inside the Church of the Crusade, just by the foot of the statue of Marika.": "(x2) A terra all'interno della Chiesa della Crociata, ai piedi della statua di Marika.",
        "(x1) Head north from Moorth Ruins to find an area with a pond and a cave entrance that leads to Rauh Ruins. Cross the pond, and just before the entrance to the cave, you'll find 1 Scadutree Fragment that can be looted by the statue of Marika.": "(x1) Vai a nord dalle Rovine di Moorth fino a uno stagno e l'ingresso di una grotta che conduce alla Base di Rauh. Attraversa lo stagno: troverai il frammento presso la statua di Marika proprio prima dell'ingresso della grotta.",
        "(x1) Can be looted from the ground by Miquella's Cross of the Moorth Ruins Site of Grace.": "(x1) A terra presso la Croce di Miquella della grazia Rovine di Moorth.",
        "(x1) South of Moorth Ruins, you'll find a pot-bearing Shadow towards the giant fissure at the center of the location. Instead of dropping down, wrap around the south side of the fissure to find the enemy. Kill the pot-bearing Shadow enemy to acquire 1 Scadutree Fragment.": "(x1) A sud delle Rovine di Moorth troverai un'ombra con vaso verso la grande faglia al centro dell'area. Invece di scendere, aggira il lato sud della faglia per trovare il nemico. Uccidilo per ottenere il frammento.",
        "(x1) Found in a coffin at the bottom of the waterfall. To reach this area, you must follow the cliffs along the top and then find a place to drop by a graveyard with gravebirds, then explore upriver.": "(x1) In una bara ai piedi della cascata. Per raggiungere quest'area segui le scogliere in alto, scendi presso un cimitero con uccelli sepolcrali e risali il fiume.",
        "(x2) There are two Lesser Lesser Golden Hippopotamus enemies found in this area, drop a Scadutree Fragment each. A Scadutree Fragment drops from the Hippopotamus enemies in the area. This area can only be accessed by using the ladder in Shadow Keep to get down to a special teleport coffin. This will take you to Ruins of Unte and you must follow the cliffs downstream, and then carefully drop down to the bottom level to reach it.": "(x2) Ci sono due Ippopotami dorati minori in quest'area, ognuno rilascia un frammento. Vi si accede tramite la scala nella Rocca delle Ombre che porta a una bara di teletrasporto. Questa ti porterà alle Rovine di Unte; segui le scogliere a valle e scendi con attenzione al livello inferiore.",
        "(x1) From the entrance through the gap in the wall, take the stairs on the right and climb up until you reach the cloth-like part of the structure at the top. Before heading down, check on the right side to see a small opening that will lead to the middle platform. Fall there and defeat the two enemies, In the middle of the bridge you will find a body that has 1 Scadutree Fragment.": "(x1) Dall'ingresso nella breccia del muro, prendi le scale a destra e sali fino alla parte in tessuto della struttura in cima. Prima di scendere, controlla il lato destro per una piccola apertura che conduce alla piattaforma centrale. Scendi lì, sconfiggi i due nemici e troverai il frammento su un corpo al centro del ponte.",
        "(x2) Obtained after defeating the Golden Hippopotamus boss found at the Main Plaza of the Shadow Keep.": "(x2) Ottenuti sconfiggendo il boss Ippopotamo dorato nella piazza principale della Rocca delle Ombre.",
        "(x1) Can be looted by Miquella's Cross of the Storehouse, Fourth Floor Site of Grace in the Specimen Storehouse section of the Shadow Keep.": "(x1) Presso la Croce di Miquella della grazia Magazzino, quarto piano nella sezione del Magazzino dei campioni della Rocca delle Ombre.",
        "(x1) Located at the Church District of the Shadow Keep. 1 Scadutree Fragment can be looted on the hand of the statue of Marika. Time your jump to grab it. This is easily done after draining the water, or if you are feeling brave you can actually jump onto the hand before draining the water. and jump back.": "(x1) Nel Distretto della chiesa della Rocca delle Ombre. Si trova sulla mano della statua di Marika. Calcola bene il salto per prenderlo (più facile dopo aver drenato l'acqua, ma possibile anche prima).",
        "(x1) Can be looted in front of a small statue of Marika, located in the Dark Chamber entrance of the Shadow Keep's Specimen Storehouse.": "(x1) Davanti a una piccola statua di Marika, all'ingresso della Camera oscura nel Magazzino dei campioni della Rocca delle Ombre.",
        "(x1) From the Back Gate Site of Grace of the Shadow Keep, enter the room to your right to find 1 Scadutree Fragment that can be looted on the ground, by the foot of the statue of Marika.": "(x1) Dalla grazia Ingresso posteriore della Rocca delle Ombre, entra nella stanza a destra: il frammento è a terra ai piedi della statua di Marika.",
        "(x5) Can be looted by the roots in front of the Scadutree chalice. Have to be grabbed one by one.": "(x5) Presso le radici davanti al calice dell'Albero Ombra. Vanno raccolti uno ad uno.",
        "(x1) Can be looted from the ground by Miquella's Cross of the Scaduview Cross Site of Grace.": "(x1) A terra presso la Croce di Miquella della grazia della Croce di Scaduview.",
        "(x1) Located in a cave guarded by a Demi-Human Chief. 1 Scadutree Fragment is looted from a dead body inside the cave.": "(x1) In una grotta sorvegliata da un Capo dei seminumani. Su un cadavere all'interno della grotta.",
        "(x1) Can be looted from the ground by Miquella's Cross of the Cerulean Coast Cross Site of Grace.": "(x1) A terra presso la Croce di Miquella della grazia della Croce della costa cerulea.",
        "(x1) Can looted from the ground by Miquella's Cross of the Fissure Cross Site of Grace.": "(x1) A terra presso la Croce di Miquella della grazia della Croce della faglia.",
        "(x1) After getting past the two Spiritsprings, take the path on your right, and be careful of falling boulders. You'll find 1 Scadutree Fragment on a dead body.": "(x1) Dopo i due soffi spirituali prendi il sentiero a destra, facendo attenzione ai massi che cadono. Su un cadavere.",
        "(x1) Dropped by the Lesser Golden Hippopotamus enemy found in this area of Charo's Hidden Grave.": "(x1) Lasciato dall'Ippopotamo dorato minore nella Tomba nascosta di Charo.",
        "(x2) Can be looted in front of the altar inside the Abandoned Church located within the Abyssal Woods.": "(x2) Davanti all'altare della Chiesa abbandonata nei Boschi abissali.",
        "(x1) From the Abyssal Woods Site of Grace, head north and then west to find a corpse sitting against a tree. Loot the dead body to obtain 1 Scadutree Fragment..": "(x1) Dalla grazia Boschi abissali vai a nord e poi a ovest: troverai un cadavere appoggiato a un albero.",
        "(x1) From the Rauh Ancient Ruins, West Site of Grace, head towards the building and climb up the stairs. Beware of the enemies in this room. Reach the end to find 1 Scadutree Fragment in front of the large altar.": "(x1) Dalla grazia Rovine di Rauh ovest, vai verso l'edificio e sali le scale. Attenzione ai nemici: troverai il frammento davanti al grande altare in fondo.",
        "(x1) Can be looted by Miquella's Cross of the Rauh Ancient Ruins, East Site of Grace.": "(x1) Presso la Croce di Miquella della grazia Rovine di Rauh est.",
        "(x1) Past the Spider-Scorpions after entering the tunnel, move forward, and turn right. Locate the Shadowpot Enemy and kill it to obtain 1 Scadutree Fragment.": "(x1) Dopo gli scorpioni ragno nel tunnel, prosegui e gira a destra. Trova l'ombra con vaso e uccidila per ottenere il frammento.",
        "(x1) Defeat the Lesser Golden Hippopotamus to obtain the fragment. The enemy drops 11960 Runes and 1 Scadutree Fragment.": "(x1) Sconfiggi l'Ippopotamo dorato minore per ottenere il frammento.",
        "(x1) From the First Rise Site of Grace of Enir-Ilim, progress the area until you're about to reach the Spiral Rise Site of Grace. Near the checkpoint, you'll find a stairway that leads down to a room where you can loot the Inquisitor Ashes. Outside of this room, jump down onto a broken staircase that might look like a dead-end. Check the east side of this staircase to drop onto the narrow edge of the wall. Wrap along the side of it until you reach a platform that has a body holding 10 Golem's Great Arrow. Look south and do a running jump to jump across the pit and towards a window. Drop down to formally arrive in a secret section of Belurat Tower Settlement. Continue forward from here until you find a covered statue where you'll find 1 Scadutree Fragment by the foot of the statue.": "(x1) Dalla grazia Primo piano di Enir-Ilim, prosegui fino alla grazia della Salita a spirale. Lì vicino scendi la scala fino alla stanza con le Ceneri dell'inquisitore. Esci e salta sulla scala spezzata che sembra un vicolo cieco. Dal lato est scendi sul cornicione del muro e percorrilo fino a una piattaforma con un corpo (10 Frecce grandi del golem). Salta verso la finestra a sud per arrivare in una sezione segreta di Belurat: troverai il frammento ai piedi di una statua coperta.",
        "(x1) Outer Tower of Enir-Ilim. After picking up the previous Revered Spirit Ash, continue heading up the stairs and you'll find a room with an altar where 1 Scadutree Fragment can be picked up.": "(x1) Torre esterna di Enir-Ilim. Dopo le Ceneri di spirito venerato precedenti prosegui sulle scale fino a una stanza con un altare.",
        "(x1) Can be found on the altar near the Cleansing Chamber Anteroom Site of Grace.": "(x1) Sull'altare vicino alla grazia Anticamera della sala della purificazione.",
        "(x1) Can be looted by Miquella's Cross of the Spiral Rise Site of Grace.": "(x1) Presso la Croce di Miquella della grazia Salita a spirale.",
        "(x1) On a small altar. North-east of the Gravesite plain site of grace. Past the white tree filled with hanging bodies.": "(x1) Su un piccolo altare a nord-est della grazia della Piana dei sepolcri. Oltre l'albero bianco con i corpi appesi.",
        "(x1) Found at an altar located to the east of the Cliffroad Terminus Site of Grace. In the vicinity of the pond inhabited by small turtles.": "(x1) Su un altare a est della grazia Fine della via sulla scarpata, vicino allo stagno con le tartarughe.",
        "(x1) Can be looted on a broken Revered Statue at the Abandoned Ailing Village. The statue is guarded by Man-Fly enemies.": "(x1) Su una statua rotta nel Villaggio malato abbandonato, sorvegliata da uomini-mosca.",
        "(x1) South of Temple Town Ruins, you will see the altar near the edge.": "(x1) A sud delle Rovine della città del tempio, su un altare vicino al bordo.",
        "(x2) Can be found on the altar in the middle of the room infested by Spider-Scorpions.": "(x2) Sull'altare al centro della stanza infestata dagli scorpioni ragno.",
        "(x1) After defeating the Divine Beast Dancing Lion, head to the right side of the arena to find a lift. Take the lift up and proceed forward to open a large door. Once through, you will find the altar nearby that has a Revered Spirit Ash.": "(x1) Dopo aver sconfitto la Belva divina danzante, vai a destra nell'arena e prendi l'ascensore. Prosegui e apri la grande porta: troverai l'altare lì vicino.",
        "(x1) Climb up after defeating the two Gravebirds and you will spot a Shadow Pothead enemy. Grants 735 Runes upon defeat. Drops 1 Revered Spirit Ash and 1 Golden Horn Tender.": "(x1) Sali dopo aver sconfitto i due uccelli sepolcrali per trovare un'ombra con vaso. Rilascia 1 cenere di spirito venerato e 1 lingua di corno dorato.",
        "(x1) After crossing the bridge with the Horned Warrior, turn left to enter an open area with a tree in the center and numerous enemies in prayer. You'll find the Revered Spirit Ash on an altar across from the tree.": "(x1) Dopo il ponte con il Guerriero cornuto gira a sinistra in un'area aperta con un albero centrale e molti nemici in preghiera. La cenere è sull'altare di fronte all'albero.",
        "(x1) Fall down from the broken bridge, and follow the path north, past the dog, you will find a statue containing the revered spirit ash at the end of the road.": "(x1) Scendi dal ponte interrotto e vai a nord oltre il cane: troverai una statua in fondo alla strada.",
        "(x1) Go east of the ruins, and find a little shack, wherein the revered spirit ash resides.": "(x1) A est delle rovine, all'interno di una piccola capanna.",
        "(x1) Once you enter the Village of Flies, continue down the path, it can be found on a body laid on a pedestal.": "(x1) Una volta nel Villaggio delle mosche prosegui lungo il sentiero: si trova su un corpo sopra un piedistallo.",
        "(x1) Dropped by the Shadow Pothead in the area, along with 1 Silver Horn Tender, 1 Dewgem, and 1 Rauh Burrow.": "(x1) Lasciata dall'ombra con vaso nell'area.",
        "(x1) Found on the statue in the middle. Beware of enemies in the area.": "(x1) Sulla statua al centro. Attenzione ai nemici.",
        "(x1) Outside the First Rise Site of Grace, take the stairs up and cross the bridge to a large enemy. Defeat the enemy to acquire a Revered Spirit Ash.": "(x1) Fuori dalla grazia Primo piano, sali le scale e attraversa il ponte fino a un nemico gigante. Sconfiggilo per ottenere la cenere.",
        "(x2) At the base of the statue in an indoor Altar like room with Man-Fly(s) praying to an idol sculpture.": "(x2) Alla base della statua in una stanza con altare dove degli uomini-mosca pregano una scultura.",
        "(x1) Can be found within a small room on an altar. Be wary of Gravebird enemies in the area.": "(x1) In una piccola stanza su un altare. Attenzione agli uccelli sepolcrali.",
        "(x1) Found on the altar by the stone wall southeast from Ruins of Unte.": "(x1) Sull'altare presso il muro di pietra a sud-est delle Rovine di Unte.",
        "(x1) Can be found on an altar in the Ellac River Cave near the Site of Grace.": "(x1) Sull'altare nella Grotta del fiume Ellac, vicino alla grazia.",
        "(x1) When you reach the Library, jump on the bookshelves and make your way to the other side where you see a large enemy. Defeat it to acquire a Revered Spirit Ash.": "(x1) Una volta nella biblioteca salta sugli scaffali fino all'altro lato dove si trova un nemico gigante. Sconfiggilo per ottenere la cenere.",
        "(x1) Can be found on a body hanging on the chandelier next to the Site of Grace.": "(x1) Su un corpo appeso al lampadario accanto alla grazia.",
        "(x1) Climb up the statue's feet and carefully drop down the beast statue below, where you'll find a Revered Spirit Ash.": "(x1) Sali sui piedi della statua e scendi con cura sulla statua della bestia sottostante per trovare la cenere.",
        "(x1) From the Seventh Floor Site of Grace, head to the opposite side, and jump on the railings on the left side and you will find this item on the hanging statue.": "(x1) Dalla grazia Settimo piano vai sul lato opposto, salta sulla ringhiera a sinistra e troverai l'oggetto sulla statua appesa.",
        "(x1) Dropped by a Shadowpot Enemy west of the Viaduct Minor Tower Site of Grace.": "(x1) Lasciata da un'ombra con vaso a ovest della grazia Torre minore del viadotto."
    }
}

def load_yaml(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_yaml(data, filepath):
    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, allow_unicode=True, width=1000, sort_keys=False)

def translate_stones_file():
    filepath = os.path.join(DATA_DIR, 'ancient_dragon_smithing_stones.yaml')
    data = load_yaml(filepath)
    
    data['title_it'] = stones_translations['title_main']
    
    for section in data.get('sections', []):
        if section['title'] == "Ancient Dragon Smithing Stones":
            section['title_it'] = stones_translations['title_regular']
        elif section['title'] == "Somber Ancient Dragon Smithing Stones":
            section['title_it'] = "Pietre da forgiatura del drago funeree (antiche)"
                
        if 'table' in section:
            section['table_it'] = stones_translations['table']
            
        items = section.get('items', [])
        for i, item in enumerate(items):
            if isinstance(item, str):
                items[i] = {
                    "name": item,
                    "name_it": stones_translations['categories'].get(item, item)
                }
            elif isinstance(item, dict) and "name" in item:
                item['name_it'] = stones_translations['categories'].get(item['name'], item['name'])
            elif isinstance(item, dict) and 'id' in item:
                if 'data' in item:
                    translated_data = []
                    for val in item['data']:
                        t = stones_translations['descriptions'].get(val, val)
                        translated_data.append(t)
                    item['data_it'] = translated_data

    save_yaml(data, filepath)

def translate_scadutree_file():
    filepath = os.path.join(DATA_DIR, 'scadutree_fragment_revered_spirit_ash.yaml')
    data = load_yaml(filepath)
    
    data['title_it'] = scadutree_translations['title_main']
    
    for section in data.get('sections', []):
        if 'title' in section:
            section['title_it'] = scadutree_translations['sections'].get(section['title'], section['title'])
            
        items = section.get('items', [])
        for i, item in enumerate(items):
            if isinstance(item, str):
                items[i] = {
                    "name": item,
                    "name_it": scadutree_translations['categories'].get(item, item)
                }
            elif isinstance(item, dict) and "name" in item:
                item['name_it'] = scadutree_translations['categories'].get(item['name'], item['name'])
            elif isinstance(item, dict) and 'id' in item:
                if 'data' in item:
                    translated_data = []
                    for val in item['data']:
                        t = scadutree_translations['descriptions'].get(val, val)
                        translated_data.append(t)
                    item['data_it'] = translated_data
                
    save_yaml(data, filepath)

if __name__ == '__main__':
    translate_stones_file()
    translate_scadutree_file()
    print("Upgrades translation script successfully generated and applied.")
