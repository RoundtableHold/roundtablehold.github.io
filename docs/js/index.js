
var profilesKey = 'darksouls3_profiles';

(function($) {
    'use strict';
    $(function() {
        var profiles = $.jStorage.get(profilesKey, {});
    
    var themes = {
        "Standard" : "/css/bootstrap.min.css",
        "Ceruleon" : "/css/themes/cerulean/bootstrap.min.css",
        "Cosmo" : "/css/themes/cosmo/bootstrap.min.css",
        "Cyborg" : "/css/themes/cyborg/bootstrap.min.css",
        "Darkly" : "/css/themes/darkly/bootstrap.min.css",
        "Flatly" : "/css/themes/flatly/bootstrap.min.css",
        "Journal" : "/css/themes/journal/bootstrap.min.css",
        "Litera" : "/css/themes/litera/bootstrap.min.css",
        "Lumen" : "/css/themes/lumen/bootstrap.min.css",
        "Lux" : "/css/themes/lux/bootstrap.min.css",
        "Materia" : "/css/themes/materia/bootstrap.min.css",
        "Minty" : "/css/themes/minty/bootstrap.min.css",
        "Morph" : "/css/themes/Morph/bootstrap.min.css",
        "Pulse" : "/css/themes/pulse/bootstrap.min.css",
        "Quartz" : "/css/themes/quartz/bootstrap.min.css",
        "Regent" : "/css/themes/regent/bootstrap.min.css",
        "Sandstone" : "/css/themes/sandstone/bootstrap.min.css",
        "Simplex" : "/css/themes/simplex/bootstrap.min.css",
        "Sketchy" : "/css/themes/sketchy/bootstrap.min.css",
        "Slate" : "/css/themes/slate/bootstrap.min.css",
        "Solar" : "/css/themes/solar/bootstrap.min.css",
        "Spacelab" : "/css/themes/spacelab/bootstrap.min.css",
        "Superhero" : "/css/themes/superhero/bootstrap.min.css",
        "United" : "/css/themes/united/bootstrap.min.css",
        "Vapor" : "/css/themes/vapor/bootstrap.min.css",
        "Yeti" : "/css/themes/yeti/bootstrap.min.css",
        "Zephyr" : "/css/themes/zephyr/bootstrap.min.css",
    };

        /// assure default values are set
        /// necessary 'cause we're abusing local storage to store JSON data
        /// done in a more verbose way to be easier to understand
        if (!('current' in profiles)) profiles.current = 'Default Profile';
        if (!(profilesKey in profiles)) profiles[profilesKey] = {};
        initializeProfile(profiles.current);
        function initializeProfile(profile_name) {
            if (!(profile_name in profiles[profilesKey])) profiles[profilesKey][profile_name] = {};
            if (!('checklistData' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].checklistData = {};
            if (!('collapsed' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].collapsed = {};
            if (!('hide_completed' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].hide_completed = false;
            if (!('journey' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].journey = 1;
            if (!('style' in profiles[profilesKey][profile_name]))
                profiles[profilesKey][profile_name].style = 'Standard';
        }
        
    function themeSetup(stylesheet) {
        if(stylesheet === null || stylesheet === undefined) { // if we didn't get a param, then
            stylesheet = profiles[profilesKey][profiles.current].style; // fall back on "light" if cookie not set
        }
        $("#bootstrap").attr("href", themes[stylesheet]);
    }
        themeSetup(profiles[profilesKey][profiles.current].style);

        function calculateProgress() {
        const playthrough_total = 131;
var playthrough_checked = 0;
const quest_order_tldr_total = 265;
var quest_order_tldr_checked = 0;
const npc_quests_total = 238;
var npc_quests_checked = 0;
const achievements_total = 42;
var achievements_checked = 0;
const legendaries_total = 32;
var legendaries_checked = 0;
const bosses_total = 226;
var bosses_checked = 0;
const legacy_total = 16;
var legacy_checked = 0;
const caves_total = 50;
var caves_checked = 0;
const evergaols_total = 10;
var evergaols_checked = 0;
const illusory_walls_total = 26;
var illusory_walls_checked = 0;
const weapons_total = 377;
var weapons_checked = 0;
const armor_total = 513;
var armor_checked = 0;
const talismans_total = 121;
var talismans_checked = 0;
const incantations_total = 101;
var incantations_checked = 0;
const sorceries_total = 72;
var sorceries_checked = 0;
const ashesofwar_total = 92;
var ashesofwar_checked = 0;
const spirit_ashes_total = 64;
var spirit_ashes_checked = 0;
const flasks_total = 55;
var flasks_checked = 0;
const crystal_tears_total = 32;
var crystal_tears_checked = 0;
const memory_stones_talisman_pouches_total = 12;
var memory_stones_talisman_pouches_checked = 0;
const scrolls_prayerbooks_total = 11;
var scrolls_prayerbooks_checked = 0;
const whetstones_total = 6;
var whetstones_checked = 0;
const bell_bearings_total = 15;
var bell_bearings_checked = 0;
const cookbooks_total = 59;
var cookbooks_checked = 0;
const ancient_dragon_smithing_stones_total = 21;
var ancient_dragon_smithing_stones_checked = 0;
const remembrances_mausoleums_total = 51;
var remembrances_mausoleums_checked = 0;
const great_runes_total = 11;
var great_runes_checked = 0;
const dragon_hearts_death_roots_total = 22;
var dragon_hearts_death_roots_checked = 0;
const paintings_total = 14;
var paintings_checked = 0;
const pots_bottles_total = 40;
var pots_bottles_checked = 0;
const gestures_total = 48;
var gestures_checked = 0;
for (var id in profiles[profilesKey][profiles.current].checklistData) {
if (profiles[profilesKey][profiles.current].checklistData[id] === true) {
if (id.startsWith("playthrough")) {
playthrough_checked += 1;
}
if (id.startsWith("quest_order_tldr")) {
quest_order_tldr_checked += 1;
}
if (id.startsWith("npc_quests")) {
npc_quests_checked += 1;
}
if (id.startsWith("achievements")) {
achievements_checked += 1;
}
if (id.startsWith("legendaries")) {
legendaries_checked += 1;
}
if (id.startsWith("bosses")) {
bosses_checked += 1;
}
if (id.startsWith("legacy")) {
legacy_checked += 1;
}
if (id.startsWith("caves")) {
caves_checked += 1;
}
if (id.startsWith("evergaols")) {
evergaols_checked += 1;
}
if (id.startsWith("illusory_walls")) {
illusory_walls_checked += 1;
}
if (id.startsWith("weapons")) {
weapons_checked += 1;
}
if (id.startsWith("armor")) {
armor_checked += 1;
}
if (id.startsWith("talismans")) {
talismans_checked += 1;
}
if (id.startsWith("incantations")) {
incantations_checked += 1;
}
if (id.startsWith("sorceries")) {
sorceries_checked += 1;
}
if (id.startsWith("ashesofwar")) {
ashesofwar_checked += 1;
}
if (id.startsWith("spirit_ashes")) {
spirit_ashes_checked += 1;
}
if (id.startsWith("flasks")) {
flasks_checked += 1;
}
if (id.startsWith("crystal_tears")) {
crystal_tears_checked += 1;
}
if (id.startsWith("memory_stones_talisman_pouches")) {
memory_stones_talisman_pouches_checked += 1;
}
if (id.startsWith("scrolls_prayerbooks")) {
scrolls_prayerbooks_checked += 1;
}
if (id.startsWith("whetstones")) {
whetstones_checked += 1;
}
if (id.startsWith("bell_bearings")) {
bell_bearings_checked += 1;
}
if (id.startsWith("cookbooks")) {
cookbooks_checked += 1;
}
if (id.startsWith("ancient_dragon_smithing_stones")) {
ancient_dragon_smithing_stones_checked += 1;
}
if (id.startsWith("remembrances_mausoleums")) {
remembrances_mausoleums_checked += 1;
}
if (id.startsWith("great_runes")) {
great_runes_checked += 1;
}
if (id.startsWith("dragon_hearts_death_roots")) {
dragon_hearts_death_roots_checked += 1;
}
if (id.startsWith("paintings")) {
paintings_checked += 1;
}
if (id.startsWith("pots_bottles")) {
pots_bottles_checked += 1;
}
if (id.startsWith("gestures")) {
gestures_checked += 1;
}
}
}
if (playthrough_checked === playthrough_total){
$("#playthrough_progress_total").html("DONE");
} else {
$("#playthrough_progress_total").html(playthrough_checked + "/" + playthrough_total);
}
if (quest_order_tldr_checked === quest_order_tldr_total){
$("#quest_order_tldr_progress_total").html("DONE");
} else {
$("#quest_order_tldr_progress_total").html(quest_order_tldr_checked + "/" + quest_order_tldr_total);
}
if (npc_quests_checked === npc_quests_total){
$("#npc_quests_progress_total").html("DONE");
} else {
$("#npc_quests_progress_total").html(npc_quests_checked + "/" + npc_quests_total);
}
if (achievements_checked === achievements_total){
$("#achievements_progress_total").html("DONE");
} else {
$("#achievements_progress_total").html(achievements_checked + "/" + achievements_total);
}
if (legendaries_checked === legendaries_total){
$("#legendaries_progress_total").html("DONE");
} else {
$("#legendaries_progress_total").html(legendaries_checked + "/" + legendaries_total);
}
if (bosses_checked === bosses_total){
$("#bosses_progress_total").html("DONE");
} else {
$("#bosses_progress_total").html(bosses_checked + "/" + bosses_total);
}
if (legacy_checked === legacy_total){
$("#legacy_progress_total").html("DONE");
} else {
$("#legacy_progress_total").html(legacy_checked + "/" + legacy_total);
}
if (caves_checked === caves_total){
$("#caves_progress_total").html("DONE");
} else {
$("#caves_progress_total").html(caves_checked + "/" + caves_total);
}
if (evergaols_checked === evergaols_total){
$("#evergaols_progress_total").html("DONE");
} else {
$("#evergaols_progress_total").html(evergaols_checked + "/" + evergaols_total);
}
if (illusory_walls_checked === illusory_walls_total){
$("#illusory_walls_progress_total").html("DONE");
} else {
$("#illusory_walls_progress_total").html(illusory_walls_checked + "/" + illusory_walls_total);
}
if (weapons_checked === weapons_total){
$("#weapons_progress_total").html("DONE");
} else {
$("#weapons_progress_total").html(weapons_checked + "/" + weapons_total);
}
if (armor_checked === armor_total){
$("#armor_progress_total").html("DONE");
} else {
$("#armor_progress_total").html(armor_checked + "/" + armor_total);
}
if (talismans_checked === talismans_total){
$("#talismans_progress_total").html("DONE");
} else {
$("#talismans_progress_total").html(talismans_checked + "/" + talismans_total);
}
if (incantations_checked === incantations_total){
$("#incantations_progress_total").html("DONE");
} else {
$("#incantations_progress_total").html(incantations_checked + "/" + incantations_total);
}
if (sorceries_checked === sorceries_total){
$("#sorceries_progress_total").html("DONE");
} else {
$("#sorceries_progress_total").html(sorceries_checked + "/" + sorceries_total);
}
if (ashesofwar_checked === ashesofwar_total){
$("#ashesofwar_progress_total").html("DONE");
} else {
$("#ashesofwar_progress_total").html(ashesofwar_checked + "/" + ashesofwar_total);
}
if (spirit_ashes_checked === spirit_ashes_total){
$("#spirit_ashes_progress_total").html("DONE");
} else {
$("#spirit_ashes_progress_total").html(spirit_ashes_checked + "/" + spirit_ashes_total);
}
if (flasks_checked === flasks_total){
$("#flasks_progress_total").html("DONE");
} else {
$("#flasks_progress_total").html(flasks_checked + "/" + flasks_total);
}
if (crystal_tears_checked === crystal_tears_total){
$("#crystal_tears_progress_total").html("DONE");
} else {
$("#crystal_tears_progress_total").html(crystal_tears_checked + "/" + crystal_tears_total);
}
if (memory_stones_talisman_pouches_checked === memory_stones_talisman_pouches_total){
$("#memory_stones_talisman_pouches_progress_total").html("DONE");
} else {
$("#memory_stones_talisman_pouches_progress_total").html(memory_stones_talisman_pouches_checked + "/" + memory_stones_talisman_pouches_total);
}
if (scrolls_prayerbooks_checked === scrolls_prayerbooks_total){
$("#scrolls_prayerbooks_progress_total").html("DONE");
} else {
$("#scrolls_prayerbooks_progress_total").html(scrolls_prayerbooks_checked + "/" + scrolls_prayerbooks_total);
}
if (whetstones_checked === whetstones_total){
$("#whetstones_progress_total").html("DONE");
} else {
$("#whetstones_progress_total").html(whetstones_checked + "/" + whetstones_total);
}
if (bell_bearings_checked === bell_bearings_total){
$("#bell_bearings_progress_total").html("DONE");
} else {
$("#bell_bearings_progress_total").html(bell_bearings_checked + "/" + bell_bearings_total);
}
if (cookbooks_checked === cookbooks_total){
$("#cookbooks_progress_total").html("DONE");
} else {
$("#cookbooks_progress_total").html(cookbooks_checked + "/" + cookbooks_total);
}
if (ancient_dragon_smithing_stones_checked === ancient_dragon_smithing_stones_total){
$("#ancient_dragon_smithing_stones_progress_total").html("DONE");
} else {
$("#ancient_dragon_smithing_stones_progress_total").html(ancient_dragon_smithing_stones_checked + "/" + ancient_dragon_smithing_stones_total);
}
if (remembrances_mausoleums_checked === remembrances_mausoleums_total){
$("#remembrances_mausoleums_progress_total").html("DONE");
} else {
$("#remembrances_mausoleums_progress_total").html(remembrances_mausoleums_checked + "/" + remembrances_mausoleums_total);
}
if (great_runes_checked === great_runes_total){
$("#great_runes_progress_total").html("DONE");
} else {
$("#great_runes_progress_total").html(great_runes_checked + "/" + great_runes_total);
}
if (dragon_hearts_death_roots_checked === dragon_hearts_death_roots_total){
$("#dragon_hearts_death_roots_progress_total").html("DONE");
} else {
$("#dragon_hearts_death_roots_progress_total").html(dragon_hearts_death_roots_checked + "/" + dragon_hearts_death_roots_total);
}
if (paintings_checked === paintings_total){
$("#paintings_progress_total").html("DONE");
} else {
$("#paintings_progress_total").html(paintings_checked + "/" + paintings_total);
}
if (pots_bottles_checked === pots_bottles_total){
$("#pots_bottles_progress_total").html("DONE");
} else {
$("#pots_bottles_progress_total").html(pots_bottles_checked + "/" + pots_bottles_total);
}
if (gestures_checked === gestures_total){
$("#gestures_progress_total").html("DONE");
} else {
$("#gestures_progress_total").html(gestures_checked + "/" + gestures_total);
}
}
calculateProgress();
  });
})( jQuery );
