
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
        var all_ids = new Set(["talismans_17_1", "incantations_3_11", "armor_41", "ancient_dragon_smithing_stones_4", "bosses_16_2", "armor_451", "quest_order_tldr_190", "pots_bottles_1_8", "npc_quests_10_7", "quest_order_tldr_225", "bosses_18_4", "armor_154", "npc_quests_5_1", "dragon_hearts_death_roots_0_12", "weapons_14_9", "talismans_3_4", "weapons_3_13", "armor_210", "armor_574", "quest_order_tldr_210", "ashesofwar_8_10", "gestures_6_1", "spirit_ashes_9_1", "pots_bottles_2_1", "incantations_11_4", "spirit_ashes_12_2", "bosses_5_25", "sorceries_11_1", "crystal_tears_6_2", "bell_bearings_2_4", "talismans_2_8", "incantations_12_1", "quest_order_tldr_55", "armor_321", "armor_50", "playthrough_10_6", "armor_374", "sorceries_4_17", "bosses_8_5", "armor_362", "weapons_23_7", "sorceries_7_2", "quest_order_tldr_92", "incantations_6_4", "armor_113", "quest_order_tldr_30", "quest_order_tldr_36", "sorceries_4_13", "quest_order_tldr_111", "legendaries_2_2", "quest_order_tldr_165", "quest_order_tldr_117", "playthrough_10_2", "talismans_8_8", "weapons_23_4", "armor_130", "flasks_2_12", "legendaries_2_3", "bosses_1_10", "weapons_8_4", "armor_37", "armor_577", "npc_quests_33_4", "armor_192", "gestures_1_12", "armor_272", "weapons_3_8", "armor_88", "armor_402", "armor_560", "sorceries_5_2", "weapons_14_21", "sorceries_12_1", "armor_85", "armor_320", "armor_96", "weapons_15_1", "quest_order_tldr_68", "quest_order_tldr_221", "weapons_1_13", "weapons_18_1", "armor_397", "bosses_6_7", "armor_573", "quest_order_tldr_198", "weapons_23_14", "armor_550", "bosses_4_24", "bosses_8_15", "npc_quests_26_7", "playthrough_14_9", "scrolls_prayerbooks_1_4", "armor_118", "npc_quests_26_3", "flasks_1_23", "achievements_3_1", "quest_order_tldr_127", "incantations_1_4", "achievements_2_8", "quest_order_tldr_32", "quest_order_tldr_181", "armor_167", "quest_order_tldr_220", "talismans_10_3", "armor_7", "talismans_18_1", "quest_order_tldr_59", "armor_267", "weapons_22_5", "weapons_14_19", "flasks_1_7", "weapons_30_2", "npc_quests_19_3_2", "caves_5_5", "weapons_32_1", "armor_62", "playthrough_18_2", "flasks_1_34", "flasks_1_41", "sorceries_6_7", "legacy_1_2", "npc_quests_10_5", "armor_350", "weapons_3_11", "weapons_6_15", "incantations_7_9", "incantations_10_4", "armor_360", "gestures_3_1", "quest_order_tldr_164", "bosses_8_11", "paintings_2_1", "flasks_1_3", "npc_quests_6_4", "armor_227", "bosses_4_18", "npc_quests_32_1", "weapons_34_3", "weapons_29_1", "talismans_11_5", "caves_1_1", "remembrances_mausoleums_1_15_2", "incantations_12_4", "flasks_1_2", "ashesofwar_13_2", "armor_164", "weapons_24_6", "talismans_4_5", "playthrough_14_7", "crystal_tears_3_2", "quest_order_tldr_183", "quest_order_tldr_249", "cookbooks_5_8", "weapons_3_14", "armor_527", "weapons_21_2", "incantations_5_11", "armor_266", "spirit_ashes_8_1", "weapons_17_3", "sorceries_9_4", "quest_order_tldr_162", "evergaols_5_1", "weapons_29_17", "bosses_11_5", "remembrances_mausoleums_1_1_2", "bosses_10_3", "npc_quests_2_5", "armor_414", "npc_quests_33_5", "playthrough_8_7", "bosses_1_9", "weapons_5_10", "bosses_4_12", "quest_order_tldr_12", "flasks_1_38", "bosses_5_5", "sorceries_12_2", "armor_135", "weapons_14_5", "talismans_9_5", "armor_220", "weapons_25_6", "weapons_33_11", "quest_order_tldr_200", "npc_quests_32_6", "caves_7_2", "weapons_34_18", "playthrough_4_5", "memory_stones_talisman_pouches_0_6", "quest_order_tldr_118", "crystal_tears_1_2", "bosses_5_7", "weapons_28_1", "armor_237", "talismans_11_3", "flasks_2_1", "npc_quests_7_9", "armor_211", "armor_234", "caves_2_5", "quest_order_tldr_199", "npc_quests_20_1", "flasks_1_12", "bell_bearings_4_3", "quest_order_tldr_234", "weapons_8_8", "armor_529", "npc_quests_24_1", "incantations_12_6", "achievements_2_14", "bosses_10_13", "bosses_4_16", "incantations_12_13", "bosses_4_2", "quest_order_tldr_31", "ashesofwar_13_8", "quest_order_tldr_19", "weapons_10_4", "armor_117", "bosses_8_16", "weapons_19_10", "incantations_3_3", "quest_order_tldr_141", "npc_quests_22_5", "armor_435", "armor_531", "playthrough_4_6", "armor_490", "bosses_13_2", "weapons_22_15", "crystal_tears_0_2", "flasks_1_31", "npc_quests_20_7", "pots_bottles_1_16", "spirit_ashes_11_1", "caves_8_2", "pots_bottles_1_14", "quest_order_tldr_179", "armor_430", "quest_order_tldr_122", "bosses_7_18", "bosses_9_7", "playthrough_14_4", "armor_137", "talismans_10_5", "quest_order_tldr_201", "weapons_26_3", "quest_order_tldr_209", "spirit_ashes_3_18", "npc_quests_12_5", "bosses_2_28", "cookbooks_3_1", "npc_quests_32_4", "weapons_8_3", "weapons_34_23", "npc_quests_31_3", "armor_307", "legacy_1_15", "illusory_walls_1_10", "playthrough_14_5", "cookbooks_4_3", "great_runes_1_4", "sorceries_4_28_0", "ancient_dragon_smithing_stones_16", "crystal_tears_0_3", "armor_36", "quest_order_tldr_195", "cookbooks_8_4", "npc_quests_17_4_2", "armor_411", "talismans_2_2", "remembrances_mausoleums_1_9", "legacy_1_3", "armor_426", "gestures_0_11", "quest_order_tldr_139", "spirit_ashes_10_1", "paintings_4", "bosses_2_29", "dragon_hearts_death_roots_0_5", "weapons_6_14", "armor_75", "achievements_2_4", "weapons_8_9", "weapons_25_5", "quest_order_tldr_257", "npc_quests_21_1", "weapons_19_7", "weapons_20_6", "armor_326", "playthrough_8_3", "playthrough_4_10", "ashesofwar_3_2", "talismans_10_9", "crystal_tears_8_3", "armor_191", "talismans_2_11", "npc_quests_23_4", "illusory_walls_6_1", "talismans_2_12", "bosses_5_22", "npc_quests_15_5", "playthrough_12_1", "bosses_8_8", "legacy_1_6", "weapons_13_2", "npc_quests_30_1", "weapons_13_19", "memory_stones_talisman_pouches_0_2", "npc_quests_28_5", "talismans_6_11", "playthrough_16_3", "weapons_3_4", "quest_order_tldr_121", "remembrances_mausoleums_1_14", "armor_304", "talismans_8_5", "quest_order_tldr_212", "quest_order_tldr_153", "npc_quests_11_4", "bosses_14_3", "npc_quests_8_6", "npc_quests_31_14", "armor_522", "whetstones_0_5", "bosses_12_1", "pots_bottles_1_5", "armor_98", "armor_405", "weapons_30_3", "weapons_5_4", "bosses_10_7", "armor_323", "talismans_10_7", "armor_241", "bosses_7_6", "playthrough_4_8", "armor_48", "talismans_4_3", "npc_quests_17_4", "playthrough_1_1", "npc_quests_27_4", "weapons_16_1", "quest_order_tldr_244", "weapons_13_8", "quest_order_tldr_135", "weapons_34_8", "armor_363", "memory_stones_talisman_pouches_0_8", "playthrough_4_4", "armor_84", "achievements_2_19", "cookbooks_5_2", "ashesofwar_5_8", "bosses_5_4", "armor_235", "npc_quests_31_10_1", "armor_568", "armor_375", "npc_quests_33_2", "armor_342", "incantations_4_1", "legendaries_2_6", "npc_quests_20_5", "spirit_ashes_5_2", "caves_3_4", "legendaries_1_4", "quest_order_tldr_202", "pots_bottles_3_4", "flasks_1_16", "playthrough_1_7", "quest_order_tldr_197", "great_runes_2_1", "quest_order_tldr_239", "talismans_8_3", "armor_156", "talismans_1_2", "playthrough_14_10", "incantations_5_5", "weapons_25_15", "bosses_5_27", "armor_139", "quest_order_tldr_192", "quest_order_tldr_254", "npc_quests_17_7", "cookbooks_7_1", "armor_15", "weapons_8_1", "armor_487", "quest_order_tldr_38", "armor_203", "crystal_tears_4_1", "playthrough_4_13", "bosses_5_14", "armor_431", "npc_quests_7_4", "quest_order_tldr_6", "playthrough_10_4", "spirit_ashes_6_2", "bosses_7_19", "bosses_4_23", "armor_390", "armor_80", "quest_order_tldr_163", "ashesofwar_5_11", "armor_86", "quest_order_tldr_218", "playthrough_13_3", "bosses_15_1", "quest_order_tldr_152", "armor_465", "incantations_5_7", "flasks_1_40", "playthrough_9_8", "armor_132", "npc_quests_20_6", "crystal_tears_2_7", "weapons_34_7", "bosses_12_2", "armor_250", "ashesofwar_13_3", "bosses_4_17", "bosses_4_15", "flasks_1_39", "weapons_32_4", "playthrough_7_5", "bosses_4_22", "armor_99", "quest_order_tldr_154", "cookbooks_8_2", "weapons_5_9", "cookbooks_1_2", "quest_order_tldr_233", "ancient_dragon_smithing_stones_8", "npc_quests_13_1", "dragon_hearts_death_roots_1_7", "quest_order_tldr_242", "npc_quests_20_10", "remembrances_mausoleums_1_15_1", "quest_order_tldr_62", "armor_198", "bosses_6_1", "npc_quests_6_5", "npc_quests_31_6", "cookbooks_7_4", "playthrough_1_12", "npc_quests_3_7_1", "weapons_10_1", "playthrough_9_6", "flasks_1_20", "weapons_8_6", "playthrough_2_2", "dragon_hearts_death_roots_1_9", "talismans_5_2", "weapons_28_7", "weapons_17_5", "legendaries_3_6", "playthrough_5_7", "npc_quests_29_3", "cookbooks_1_12", "armor_421", "quest_order_tldr_151", "npc_quests_10_6", "weapons_28_4", "quest_order_tldr_39", "quest_order_tldr_100", "quest_order_tldr_109", "incantations_3_5", "armor_565", "armor_570", "weapons_6_6", "quest_order_tldr_21", "ashesofwar_6_1", "armor_112", "quest_order_tldr_178", "armor_186", "quest_order_tldr_168", "bosses_8_12", "evergaols_0_1", "achievements_2_6", "talismans_10_1", "npc_quests_29_8", "flasks_1_33", "playthrough_4_2", "remembrances_mausoleums_1_4_1", "gestures_6_4", "talismans_7_1", "armor_223", "armor_77", "sorceries_7_1", "pots_bottles_2_5", "npc_quests_14_3", "incantations_12_15", "achievements_3_2", "weapons_24_5", "talismans_4_11", "armor_384", "illusory_walls_3_3", "remembrances_mausoleums_1_8", "cookbooks_6_1", "armor_9", "weapons_33_12", "talismans_4_8", "achievements_2_2", "weapons_5_3", "talismans_6_5", "remembrances_mausoleums_1_13", "armor_110", "ashesofwar_3_3", "weapons_27_3", "spirit_ashes_3_15", "gestures_1_8", "weapons_6_8", "bosses_9_8", "playthrough_13_4", "gestures_0_9", "armor_19", "weapons_16_4", "incantations_9_5", "sorceries_4_16", "cookbooks_2_2", "pots_bottles_1_1", "sorceries_4_18", "quest_order_tldr_166", "talismans_4_16", "bosses_9_12", "ashesofwar_14_1", "cookbooks_2_6", "armor_332", "npc_quests_22_3", "armor_134", "weapons_18_5", "quest_order_tldr_101", "armor_468", "ashesofwar_13_11", "weapons_23_16", "npc_quests_16_3", "armor_385", "ashesofwar_1_4", "ashesofwar_6_4", "legendaries_4_1", "weapons_32_3", "armor_406", "npc_quests_12_5_2", "weapons_13_1", "sorceries_4_28_1", "crystal_tears_8_1", "armor_158", "armor_429", "flasks_1_5", "incantations_5_12", "armor_5", "armor_292", "playthrough_14_3", "illusory_walls_1_3", "weapons_1_11", "sorceries_9_1", "gestures_1_3", "quest_order_tldr_99", "quest_order_tldr_214", "spirit_ashes_3_6", "weapons_33_24", "quest_order_tldr_37", "npc_quests_26_6", "quest_order_tldr_116", "npc_quests_19_9", "quest_order_tldr_213", "achievements_3_6", "caves_3_8", "armor_501", "bosses_12_4", "talismans_5_1", "ashesofwar_6_3", "weapons_34_20", "armor_454", "weapons_32_10", "remembrances_mausoleums_1_11_1", "weapons_2_2", "weapons_1_1", "ancient_dragon_smithing_stones_18", "playthrough_1_2", "paintings_6", "armor_333", "talismans_3_2", "weapons_4_4", "talismans_3_1", "ashesofwar_5_3", "armor_71", "armor_249", "talismans_6_10", "quest_order_tldr_237", "gestures_6_3", "caves_0_5", "bosses_7_3", "bosses_7_14", "caves_5_6", "armor_524", "sorceries_4_28", "cookbooks_4_2", "armor_66", "armor_138", "ashesofwar_13_4", "achievements_2_5", "achievements_1_5", "incantations_4_10", "quest_order_tldr_174", "weapons_3_10", "bosses_4_40", "legendaries_1_2", "flasks_1_42", "bosses_17_2", "armor_248", "quest_order_tldr_228", "playthrough_7_1", "weapons_9_6", "talismans_4_13", "armor_153", "armor_0", "ashesofwar_1_3", "crystal_tears_7_1", "playthrough_8_5", "quest_order_tldr_256", "bosses_8_10", "sorceries_1_3", "spirit_ashes_4_9", "caves_0_2", "bosses_10_12", "bosses_1_5", "weapons_29_15", "ashesofwar_8_1", "whetstones_0_2", "pots_bottles_1_9", "playthrough_4_9", "weapons_34_4", "npc_quests_14_1", "illusory_walls_7_2", "talismans_2_5", "npc_quests_21_7", "quest_order_tldr_215", "weapons_18_4", "sorceries_6_3", "armor_301", "sorceries_9_5", "npc_quests_20_5_3", "armor_265", "quest_order_tldr_47", "armor_259", "incantations_5_4", "playthrough_7_6", "caves_4_3", "cookbooks_4_1", "weapons_31_3", "crystal_tears_3_5", "incantations_5_3", "bosses_4_19", "armor_283", "talismans_2_18", "incantations_12_16", "quest_order_tldr_102", "talismans_2_13", "gestures_3_4", "sorceries_2_1", "armor_52", "weapons_17_4", "bosses_2_2", "armor_108", "spirit_ashes_4_3", "armor_416", "gestures_1_4", "playthrough_3_4", "sorceries_1_9", "caves_6_3", "gestures_0_6", "quest_order_tldr_1", "great_runes_2_2", "weapons_14_8", "quest_order_tldr_89", "armor_348", "spirit_ashes_2_3", "bosses_5_2", "bosses_2_8", "spirit_ashes_6_1", "armor_256", "incantations_3_7", "ashesofwar_8_2", "armor_354", "bosses_5_19", "bosses_5_29", "incantations_4_4", "weapons_9_10", "ancient_dragon_smithing_stones_21", "achievements_2_7", "quest_order_tldr_104", "quest_order_tldr_119", "spirit_ashes_1_3", "armor_51", "cookbooks_3_3", "sorceries_12_4", "npc_quests_18_3", "npc_quests_19_1", "armor_109", "incantations_3_6", "achievements_4_1", "illusory_walls_3_4", "weapons_6_2", "whetstones_0_4", "bosses_7_8", "bosses_6_5", "sorceries_4_19", "playthrough_8_4", "illusory_walls_4_2", "weapons_11_2", "weapons_34_11", "achievements_3_8", "armor_404", "quest_order_tldr_240", "weapons_6_13", "dragon_hearts_death_roots_1_2", "bosses_9_3", "weapons_13_13", "weapons_9_1", "sorceries_8_4", "armor_473", "spirit_ashes_4_8", "achievements_2_10", "quest_order_tldr_73", "crystal_tears_2_5", "npc_quests_34_6", "illusory_walls_1_8", "playthrough_5_2", "illusory_walls_1_6", "npc_quests_15_4", "incantations_2_1", "weapons_21_4", "armor_478", "sorceries_8_1", "remembrances_mausoleums_1_8_2", "quest_order_tldr_170", "armor_254", "npc_quests_21_4", "playthrough_12_3", "weapons_27_6", "incantations_3_1", "armor_159", "npc_quests_32_8", "npc_quests_33_3", "quest_order_tldr_259", "armor_327", "armor_300", "quest_order_tldr_176", "bosses_8_6", "weapons_21_3", "weapons_31_6", "armor_298", "bosses_1_2", "pots_bottles_2_4", "quest_order_tldr_123", "armor_457", "great_runes_1_3", "npc_quests_19_6", "armor_494", "memory_stones_talisman_pouches_1_2", "playthrough_5_5", "armor_318", "pots_bottles_1_10", "quest_order_tldr_49", "gestures_6_2", "bosses_7_10", "bosses_6_17", "armor_16", "caves_5_2", "bosses_11_4", "armor_506", "cookbooks_3_2", "npc_quests_34_7", "spirit_ashes_3_8", "weapons_34_13", "bosses_2_15", "gestures_2_1", "quest_order_tldr_60", "npc_quests_19_5", "weapons_20_11", "remembrances_mausoleums_1_6", "spirit_ashes_4_1", "bosses_2_4", "armor_190", "gestures_1_7", "quest_order_tldr_226", "weapons_13_6", "pots_bottles_2_6", "spirit_ashes_2_4", "quest_order_tldr_80", "quest_order_tldr_57", "weapons_33_3", "bosses_7_13", "armor_31", "talismans_7_4", "weapons_23_9", "weapons_29_7", "weapons_32_9", "quest_order_tldr_76", "npc_quests_17_10", "illusory_walls_5_1", "playthrough_1_14", "talismans_11_1", "weapons_23_6", "talismans_15_1", "armor_578", "remembrances_mausoleums_1_9_2", "armor_61", "pots_bottles_1_3", "weapons_7_1", "npc_quests_15_6", "quest_order_tldr_120", "bosses_4_26", "armor_14", "crystal_tears_2_3", "weapons_29_11", "quest_order_tldr_232", "weapons_34_25", "legacy_1_5", "incantations_3_12", "quest_order_tldr_98", "caves_1_2", "crystal_tears_6_3", "incantations_1_2", "armor_30", "armor_231", "quest_order_tldr_33", "weapons_5_8", "talismans_6_7", "gestures_3_2", "bosses_5_28", "armor_558", "flasks_2_10", "remembrances_mausoleums_2_6", "armor_103", "armor_456", "weapons_30_8", "armor_339", "achievements_3_4", "weapons_32_15", "npc_quests_14_2", "armor_262", "quest_order_tldr_227", "paintings_7", "quest_order_tldr_235", "remembrances_mausoleums_1_12_2", "bosses_5_24", "ashesofwar_6_11", "bell_bearings_2_1", "npc_quests_31_19", "npc_quests_17_1", "quest_order_tldr_146", "npc_quests_22_7", "armor_495", "npc_quests_22_6", "armor_528", "quest_order_tldr_150", "armor_382", "illusory_walls_1_2", "flasks_1_15", "weapons_34_9", "playthrough_17_3", "bosses_9_13", "armor_452", "armor_55", "bell_bearings_3_3", "playthrough_14_8", "weapons_33_1", "crystal_tears_6_1", "flasks_1_6", "playthrough_12_7", "playthrough_5_10", "talismans_2_10", "cookbooks_7_3", "armor_260", "weapons_34_17", "bosses_5_18", "weapons_9_11", "ashesofwar_6_10", "quest_order_tldr_7", "scrolls_prayerbooks_0_1", "weapons_25_2", "ashesofwar_11_4", "bosses_4_27", "flasks_1_1", "caves_1_10", "armor_244", "npc_quests_19_10", "weapons_31_5", "weapons_33_14", "armor_466", "weapons_32_8", "talismans_10_2", "bosses_2_24", "playthrough_1_9", "scrolls_prayerbooks_0_2", "incantations_8_3", "playthrough_3_3", "armor_79", "talismans_1_7", "bosses_6_6", "npc_quests_19_7", "talismans_6_4", "quest_order_tldr_142", "quest_order_tldr_4", "bosses_4_35", "bosses_2_27", "npc_quests_22_8", "armor_460", "bosses_11_6", "talismans_12_1", "sorceries_4_26", "quest_order_tldr_112", "quest_order_tldr_208", "sorceries_9_3", "weapons_19_1", "armor_424", "talismans_9_4", "legacy_1_11", "bosses_7_17", "talismans_19_1", "weapons_22_12", "quest_order_tldr_236", "incantations_3_10", "ashesofwar_13_10", "incantations_7_6", "gestures_0_1", "npc_quests_24_2", "armor_538", "ashesofwar_13_12", "npc_quests_9_3", "talismans_2_19", "bell_bearings_2_5", "armor_104", "armor_341", "cookbooks_7_2", "armor_305", "legendaries_2_8", "armor_559", "flasks_1_21", "pots_bottles_1_12", "playthrough_2_5", "sorceries_1_8", "bosses_2_13", "weapons_5_5", "quest_order_tldr_3", "flasks_1_28", "quest_order_tldr_263", "caves_3_6", "armor_562", "talismans_4_20", "flasks_1_17", "weapons_23_11", "quest_order_tldr_207", "npc_quests_5_3", "quest_order_tldr_155", "talismans_14_3", "bosses_1_4", "weapons_8_7", "weapons_32_14", "illusory_walls_3_6", "spirit_ashes_6_4", "scrolls_prayerbooks_1_1", "flasks_1_9", "pots_bottles_1_15", "great_runes_1_1", "ancient_dragon_smithing_stones_1", "quest_order_tldr_230", "quest_order_tldr_157", "talismans_1_3", "spirit_ashes_3_1", "bosses_4_30", "paintings_3", "dragon_hearts_death_roots_0_1", "armor_325", "bosses_6_16", "sorceries_5_1", "spirit_ashes_3_10", "armor_575", "quest_order_tldr_58", "armor_434", "bosses_2_21", "spirit_ashes_3_12", "quest_order_tldr_16", "armor_68", "quest_order_tldr_14", "weapons_13_3", "npc_quests_20_5_1", "weapons_22_13", "ashesofwar_5_4", "armor_2", "incantations_2_4", "evergaols_2_3", "incantations_4_6", "incantations_12_11", "npc_quests_31_5", "remembrances_mausoleums_1_1_1", "bosses_2_25", "armor_376", "armor_282", "armor_401", "pots_bottles_1_17", "sorceries_5_3", "weapons_23_1", "bosses_6_12", "weapons_30_7", "quest_order_tldr_160", "armor_204", "flasks_1_10", "bosses_6_15", "bosses_5_23", "caves_0_1", "armor_128", "npc_quests_21_3_1", "quest_order_tldr_206", "caves_1_5", "armor_215", "armor_35", "weapons_18_6", "weapons_33_6", "armor_400", "memory_stones_talisman_pouches_0_7", "armor_581", "npc_quests_16_2", "npc_quests_19_4", "gestures_1_11", "flasks_1_29", "weapons_3_7", "bosses_2_17", "armor_379", "gestures_1_9", "weapons_3_15", "playthrough_13_2", "crystal_tears_2_2", "bosses_8_18", "npc_quests_17_6", "bosses_8_13", "quest_order_tldr_222", "npc_quests_24_2_2", "weapons_9_9", "talismans_9_3", "bosses_3_2", "caves_1_6", "ancient_dragon_smithing_stones_5", "sorceries_4_21", "armor_483", "gestures_0_10", "npc_quests_12_4", "bosses_7_11", "npc_quests_27_3", "weapons_14_2", "weapons_4_3", "talismans_2_1", "npc_quests_19_3_3", "quest_order_tldr_243", "incantations_10_9", "weapons_3_3", "ancient_dragon_smithing_stones_9", "weapons_9_5", "illusory_walls_1_4", "remembrances_mausoleums_1_5", "playthrough_17_8", "pots_bottles_2_3", "remembrances_mausoleums_2_5", "ashesofwar_2_3", "quest_order_tldr_105", "quest_order_tldr_107", "weapons_1_12", "legendaries_2_1", "weapons_25_14", "talismans_7_9", "spirit_ashes_3_7", "armor_12", "weapons_14_7", "weapons_30_5", "ashesofwar_8_7", "armor_571", "weapons_6_5", "armor_63", "armor_57", "quest_order_tldr_131", "weapons_13_12", "quest_order_tldr_77", "npc_quests_31_8", "quest_order_tldr_53", "ashesofwar_13_6", "incantations_12_14", "legendaries_1_9", "bosses_9_11", "flasks_1_27", "flasks_1_30", "talismans_4_6", "spirit_ashes_5_1", "armor_10", "ancient_dragon_smithing_stones_15", "quest_order_tldr_247", "armor_381", "weapons_28_8", "ashesofwar_2_1", "npc_quests_3_2", "quest_order_tldr_167", "armor_545", "incantations_4_5", "weapons_25_11", "bosses_6_14", "weapons_29_10", "sorceries_4_20", "npc_quests_27_1", "npc_quests_18_2", "armor_552", "memory_stones_talisman_pouches_1_1", "caves_2_6", "spirit_ashes_9_2", "npc_quests_19_2", "weapons_13_5", "legacy_1_12", "armor_184", "armor_148", "weapons_33_4", "bosses_5_16", "quest_order_tldr_196", "remembrances_mausoleums_1_15", "npc_quests_6_2", "dragon_hearts_death_roots_0_7", "illusory_walls_6_2", "ashesofwar_11_12", "playthrough_4_14", "weapons_3_12", "talismans_4_19", "remembrances_mausoleums_1_7_2", "quest_order_tldr_18", "ashesofwar_8_5", "playthrough_16_1", "playthrough_9_4", "npc_quests_32_2", "weapons_7_2", "armor_358", "great_runes_1_7", "armor_502", "quest_order_tldr_132", "weapons_1_10", "quest_order_tldr_13", "npc_quests_10_3", "ashesofwar_7_1", "quest_order_tldr_27", "weapons_7_7", "bell_bearings_1_4", "caves_5_1", "armor_93", "armor_511", "npc_quests_31_11", "incantations_9_4", "npc_quests_34_1", "sorceries_8_5", "great_runes_1_6", "incantations_12_5", "achievements_2_18", "remembrances_mausoleums_1_2", "paintings_1_2", "playthrough_17_7", "npc_quests_31_1", "armor_338", "quest_order_tldr_136", "cookbooks_1_3", "playthrough_5_8", "armor_576", "armor_100", "incantations_7_1", "weapons_16_3", "armor_448", "armor_532", "armor_149", "caves_4_4", "npc_quests_25_2", "incantations_7_2", "armor_391", "quest_order_tldr_71", "npc_quests_6_3", "armor_291", "armor_329", "paintings_2", "memory_stones_talisman_pouches_0_1", "weapons_34_21", "cookbooks_8_1", "pots_bottles_1_4", "npc_quests_28_4", "playthrough_3_1", "npc_quests_34_4", "quest_order_tldr_262", "weapons_9_8", "weapons_32_12", "quest_order_tldr_231", "achievements_2_20", "armor_40", "armor_92", "remembrances_mausoleums_2_1", "armor_233", "crystal_tears_2_1", "armor_163", "quest_order_tldr_106", "weapons_33_5", "playthrough_1_11", "armor_44", "playthrough_9_7", "quest_order_tldr_114", "armor_415", "weapons_33_17", "bosses_8_17", "armor_136", "quest_order_tldr_61", "quest_order_tldr_258", "legacy_1_13", "quest_order_tldr_90", "armor_459", "weapons_28_9", "gestures_1_10", "bosses_4_25", "caves_2_1", "npc_quests_20_9", "armor_380", "weapons_23_13", "weapons_33_22", "armor_419", "ashesofwar_7_2", "quest_order_tldr_41", "ashesofwar_8_8", "achievements_3_3", "armor_174", "quest_order_tldr_52", "weapons_5_2", "playthrough_15_1", "incantations_9_3", "ashesofwar_13_9", "bosses_9_4", "crystal_tears_5_1", "quest_order_tldr_50", "quest_order_tldr_161", "spirit_ashes_1_1", "npc_quests_32_3", "armor_439", "memory_stones_talisman_pouches_0_3", "armor_197", "armor_395", "spirit_ashes_7_4", "cookbooks_1_8", "quest_order_tldr_66_2", "achievements_1_1", "weapons_23_10", "gestures_0_8", "armor_91", "ancient_dragon_smithing_stones_3", "playthrough_10_8", "quest_order_tldr_159", "weapons_6_12", "npc_quests_31_16", "bosses_5_20", "weapons_24_4", "armor_349", "npc_quests_11_1", "weapons_19_6", "incantations_10_1", "gestures_2_2", "quest_order_tldr_125", "talismans_5_11", "npc_quests_23_2", "npc_quests_30_4", "bosses_2_7", "cookbooks_2_5", "legendaries_3_1", "armor_582", "incantations_4_8", "armor_143", "ancient_dragon_smithing_stones_13", "playthrough_5_4", "armor_567", "legacy_1_8", "remembrances_mausoleums_1_7", "armor_366", "armor_74", "npc_quests_21_5", "achievements_2_15", "cookbooks_1_19", "quest_order_tldr_185", "pots_bottles_2_8", "cookbooks_5_3", "armor_296", "playthrough_4_7", "crystal_tears_3_4", "npc_quests_31_20_1", "playthrough_9_5", "talismans_8_2", "incantations_4_7", "sorceries_6_4", "talismans_4_12", "weapons_15_5", "ashesofwar_7_3", "legacy_1_4", "spirit_ashes_4_4", "weapons_34_16", "quest_order_tldr_70", "armor_38", "gestures_7_2", "ashesofwar_11_1", "playthrough_14_1", "quest_order_tldr_82", "weapons_11_1", "bosses_7_24", "armor_39", "evergaols_4_1", "bosses_5_11", "armor_185", "npc_quests_31_13", "incantations_12_9", "cookbooks_2_3", "weapons_22_4", "talismans_5_13", "incantations_7_3", "playthrough_10_5", "npc_quests_3_5", "armor_521", "talismans_11_2", "npc_quests_27_7", "armor_294", "talismans_6_9", "achievements_1_6", "quest_order_tldr_147", "armor_251", "legacy_1_14", "ashesofwar_5_13", "armor_162", "pots_bottles_1_13", "dragon_hearts_death_roots_0_3", "npc_quests_31_20_2", "weapons_13_9", "bosses_7_22", "playthrough_4_3", "weapons_29_13", "quest_order_tldr_88", "achievements_2_16", "armor_106", "armor_484", "remembrances_mausoleums_1_10_1", "ancient_dragon_smithing_stones_12", "quest_order_tldr_145", "caves_1_9", "quest_order_tldr_69", "weapons_22_3", "playthrough_15_2", "quest_order_tldr_110", "caves_7_1", "incantations_12_2", "talismans_4_7", "achievements_3_9", "sorceries_3_1", "weapons_29_12", "talismans_8_4", "gestures_4_3", "quest_order_tldr_184", "armor_152", "weapons_7_5", "armor_225", "armor_541", "armor_433", "flasks_1_37", "bosses_9_9", "armor_422", "remembrances_mausoleums_1_3", "legendaries_1_7", "crystal_tears_3_3", "remembrances_mausoleums_1_14_2", "playthrough_4_12", "bell_bearings_1_2", "weapons_3_5", "quest_order_tldr_51", "armor_372", "armor_556", "bosses_7_21", "bosses_4_1", "armor_23", "armor_312", "playthrough_1_4", "armor_535", "cookbooks_2_7", "weapons_13_14", "npc_quests_1_6", "armor_65", "weapons_32_5", "playthrough_12_5", "quest_order_tldr_124", "npc_quests_15_3", "achievements_3_5", "playthrough_10_7", "bosses_10_11", "achievements_4_3", "achievements_4_2", "armor_24", "remembrances_mausoleums_1_3_2", "armor_4", "armor_42", "armor_548", "evergaols_2_4", "bosses_2_1", "weapons_32_17", "talismans_2_7", "armor_157", "great_runes_2_3", "weapons_14_10", "weapons_5_11", "npc_quests_30_3", "weapons_12_3", "armor_67", "incantations_3_4", "bosses_2_9", "sorceries_8_3", "armor_188", "npc_quests_19_3", "weapons_14_11", "spirit_ashes_9_3", "armor_150", "evergaols_2_2", "ashesofwar_5_10", "incantations_4_9", "quest_order_tldr_238", "bosses_1_6", "ancient_dragon_smithing_stones_11", "armor_247", "ashesofwar_9_3", "spirit_ashes_4_6", "quest_order_tldr_67", "incantations_8_4", "pots_bottles_3_7", "achievements_2_21", "weapons_14_20", "pots_bottles_1_20", "armor_49", "bosses_4_7", "talismans_13_2", "bosses_4_11", "quest_order_tldr_245", "bosses_10_1", "armor_289", "ashesofwar_10_1", "weapons_20_2", "armor_183", "ancient_dragon_smithing_stones_6", "weapons_34_1", "pots_bottles_1_11", "weapons_14_1", "sorceries_4_12", "evergaols_2_1", "weapons_29_6", "weapons_2_1", "ashesofwar_6_7", "achievements_2_23", "caves_4_2", "incantations_4_12", "weapons_4_2", "talismans_6_8", "weapons_24_2", "spirit_ashes_5_3", "remembrances_mausoleums_1_11_2", "caves_2_7", "talismans_14_2", "memory_stones_talisman_pouches_1_4", "flasks_1_32", "quest_order_tldr_8", "sorceries_6_5", "talismans_4_1", "gestures_1_1", "achievements_1_2", "weapons_6_11", "armor_367", "quest_order_tldr_11", "armor_127", "weapons_25_3", "weapons_30_6", "armor_290", "incantations_6_1", "spirit_ashes_4_2", "quest_order_tldr_194", "armor_280", "talismans_5_3", "quest_order_tldr_241", "playthrough_11_1", "weapons_9_4", "great_runes_1_5", "armor_173", "weapons_23_5", "bosses_8_3", "flasks_2_11", "caves_3_1", "armor_11", "bosses_7_2", "bosses_18_2", "pots_bottles_3_8", "remembrances_mausoleums_1_5_2", "talismans_1_4", "playthrough_16_4", "weapons_6_7", "armor_95", "cookbooks_1_11", "weapons_23_3", "cookbooks_1_20", "armor_455", "armor_257", "illusory_walls_1_5", "armor_386", "quest_order_tldr_193", "talismans_7_6", "ashesofwar_9_4", "quest_order_tldr_29", "legendaries_5_3", "quest_order_tldr_10", "caves_0_4", "weapons_28_3", "quest_order_tldr_17", "ashesofwar_6_5", "npc_quests_21_2", "illusory_walls_7_1", "armor_285", "sorceries_12_5", "whetstones_0_1", "weapons_6_3", "armor_64", "flasks_2_3", "bosses_6_10", "npc_quests_34_3", "crystal_tears_3_1", "weapons_23_8", "armor_274", "bosses_5_12", "sorceries_8_7", "talismans_2_14", "weapons_24_1", "weapons_1_5", "sorceries_13_1", "weapons_10_6", "quest_order_tldr_169", "weapons_7_3", "armor_461", "achievements_1_4", "bosses_1_8", "armor_500", "gestures_2_5", "playthrough_13_8", "bosses_4_4", "npc_quests_7_3", "npc_quests_31_10", "armor_316", "armor_328", "armor_472", "npc_quests_24_2_1", "armor_1", "legendaries_5_1", "sorceries_1_6", "weapons_23_2", "flasks_1_4", "armor_258", "pots_bottles_3_1", "weapons_1_4", "armor_314", "armor_166", "armor_169", "weapons_14_15", "armor_20", "playthrough_13_1", "armor_352", "playthrough_8_8", "bosses_8_4", "gestures_2_4", "quest_order_tldr_255", "achievements_2_12", "achievements_2_24", "weapons_32_11", "weapons_1_9", "quest_order_tldr_158", "weapons_25_7", "npc_quests_6_1", "armor_284", "armor_407", "armor_278", "incantations_5_13", "armor_176", "npc_quests_3_1", "armor_219", "remembrances_mausoleums_1_6_2", "weapons_20_8", "npc_quests_28_1", "bosses_2_16", "ashesofwar_9_1", "armor_355", "cookbooks_1_15", "sorceries_4_9", "armor_409", "incantations_2_3", "flasks_1_26", "pots_bottles_2_2", "remembrances_mausoleums_2_4", "caves_6_1", "armor_417", "incantations_5_2", "quest_order_tldr_23", "sorceries_4_24", "npc_quests_8_4", "bosses_7_27", "weapons_33_27", "quest_order_tldr_261", "ashesofwar_5_1", "remembrances_mausoleums_1_6_1", "npc_quests_21_6", "armor_27", "armor_331", "ashesofwar_6_2", "quest_order_tldr_260", "bosses_2_11", "npc_quests_17_2", "npc_quests_1_3", "playthrough_17_2", "npc_quests_27_2", "armor_489", "ashesofwar_6_9", "npc_quests_9_5", "caves_7_3", "armor_371", "sorceries_8_10", "npc_quests_29_7", "talismans_8_1", "flasks_1_36", "weapons_32_13", "npc_quests_18_1", "armor_438", "npc_quests_19_8", "armor_187", "incantations_10_6", "spirit_ashes_4_5", "ashesofwar_4_2", "quest_order_tldr_246", "bosses_6_13", "armor_486", "bosses_8_7", "weapons_5_7", "playthrough_2_3", "playthrough_17_5", "quest_order_tldr_84", "legendaries_3_3", "armor_482", "ashesofwar_11_10", "legacy_1_7", "incantations_3_13", "weapons_7_6", "cookbooks_1_24", "bosses_9_15", "bosses_2_3", "npc_quests_20_8", "weapons_20_14", "legacy_1_1", "weapons_10_5", "weapons_22_14", "quest_order_tldr_78", "armor_344", "remembrances_mausoleums_1_14_1", "bosses_4_36", "incantations_5_6", "weapons_6_4", "spirit_ashes_3_14", "armor_121", "weapons_3_1", "bosses_1_1", "cookbooks_3_6", "armor_551", "npc_quests_20_2", "flasks_2_2", "armor_410", "armor_236", "sorceries_4_1", "ashesofwar_11_2", "ashesofwar_12_2", "bosses_2_5", "sorceries_8_8", "quest_order_tldr_252", "pots_bottles_1_6", "bosses_4_37", "weapons_29_9", "weapons_14_18", "armor_218", "weapons_34_10", "achievements_2_3", "talismans_11_4", "npc_quests_9_1", "weapons_15_7", "weapons_29_4", "pots_bottles_1_19", "flasks_2_6", "weapons_15_6", "npc_quests_34_5", "ashesofwar_13_7", "spirit_ashes_3_16", "weapons_33_25", "quest_order_tldr_5", "armor_243", "playthrough_10_3", "armor_564", "quest_order_tldr_175", "npc_quests_31_9", "gestures_3_6", "armor_537", "npc_quests_19_3_1", "armor_427", "armor_261", "flasks_1_13", "gestures_3_5", "playthrough_1_10", "gestures_0_12", "armor_255", "weapons_20_5", "npc_quests_4_1", "caves_5_3", "talismans_5_12", "sorceries_9_2", "armor_297", "remembrances_mausoleums_1_12", "quest_order_tldr_95", "talismans_7_8", "npc_quests_1_2", "npc_quests_17_8", "weapons_9_14", "bosses_8_2", "armor_368", "playthrough_8_6", "talismans_4_14", "dragon_hearts_death_roots_0_8", "quest_order_tldr_2", "armor_114", "bosses_2_14", "flasks_1_19", "armor_269", "spirit_ashes_2_6", "ashesofwar_6_6", "spirit_ashes_3_9", "bosses_10_5", "bosses_1_11", "remembrances_mausoleums_1_1", "weapons_25_4", "incantations_4_2", "weapons_34_15", "bosses_5_3", "npc_quests_1_8", "paintings_3_1", "incantations_1_3", "gestures_7_1", "sorceries_4_27", "ancient_dragon_smithing_stones_14", "remembrances_mausoleums_1_4_2", "playthrough_5_6", "weapons_14_3", "bosses_2_6", "incantations_9_6", "npc_quests_3_7_2", "spirit_ashes_4_7", "armor_425", "talismans_1_6", "talismans_13_1", "weapons_34_12", "weapons_13_17", "armor_580", "quest_order_tldr_133", "quest_order_tldr_229", "armor_34", "armor_306", "paintings_1", "caves_6_2", "bosses_7_7", "weapons_33_20", "spirit_ashes_3_4", "armor_309", "legendaries_1_1_1", "dragon_hearts_death_roots_0_6", "armor_450", "quest_order_tldr_103", "armor_168", "bosses_14_1", "ashesofwar_12_1", "paintings_4_1", "ashesofwar_13_5", "incantations_11_2", "remembrances_mausoleums_1_5_1", "legacy_1_16", "playthrough_8_10", "npc_quests_32_7", "armor_519", "armor_199", "armor_540", "ashesofwar_11_8", "ashesofwar_11_11", "remembrances_mausoleums_1_9_1", "spirit_ashes_3_13", "sorceries_4_22", "npc_quests_29_2", "armor_359", "crystal_tears_1_3", "weapons_15_3", "dragon_hearts_death_roots_0_10", "evergaols_1_2", "weapons_28_2", "playthrough_12_10", "quest_order_tldr_48", "playthrough_3_5", "caves_2_4", "cookbooks_5_1", "legendaries_2_4", "armor_205", "npc_quests_29_5", "caves_1_4", "remembrances_mausoleums_1_13_1", "armor_315", "playthrough_1_5", "gestures_0_4", "npc_quests_22_4", "cookbooks_2_4", "great_runes_2_4", "weapons_20_4", "armor_172", "armor_120", "playthrough_9_3", "dragon_hearts_death_roots_0_11", "armor_22", "ashesofwar_5_2", "spirit_ashes_14_2", "weapons_20_15", "npc_quests_29_4", "armor_201", "flasks_2_4", "weapons_1_3", "scrolls_prayerbooks_1_8", "weapons_32_6", "legacy_1_10", "quest_order_tldr_149", "weapons_33_23", "armor_319", "playthrough_4_15", "quest_order_tldr_140", "armor_76", "talismans_7_5", "incantations_2_2", "bosses_4_14", "caves_8_3", "npc_quests_21_3", "armor_140", "bosses_11_3", "armor_213", "playthrough_7_2", "armor_43", "crystal_tears_4_3", "weapons_33_15", "weapons_33_2", "npc_quests_27_6", "incantations_10_5", "sorceries_8_2", "weapons_32_7", "ashesofwar_5_9", "bosses_4_13", "ashesofwar_8_4", "npc_quests_20_3", "quest_order_tldr_63", "quest_order_tldr_24", "quest_order_tldr_180", "npc_quests_20_4", "weapons_17_7", "playthrough_9_1", "armor_26", "armor_145", "armor_200", "armor_509", "armor_513", "spirit_ashes_2_7", "spirit_ashes_3_2", "armor_365", "bosses_8_14", "armor_102", "quest_order_tldr_34", "quest_order_tldr_172", "achievements_2_17", "sorceries_8_9", "memory_stones_talisman_pouches_0_4", "npc_quests_22_1", "remembrances_mausoleums_1_11", "npc_quests_33_1", "gestures_4_4", "weapons_9_12", "ancient_dragon_smithing_stones_19", "armor_393", "weapons_33_7", "npc_quests_9_2", "armor_54", "scrolls_prayerbooks_0_3", "cookbooks_5_7", "dragon_hearts_death_roots_1_5", "npc_quests_4_2", "bosses_5_9", "cookbooks_3_4", "weapons_9_2", "pots_bottles_3_10", "spirit_ashes_12_1", "bell_bearings_4_1", "npc_quests_31_18", "armor_399", "talismans_7_2", "incantations_5_10", "playthrough_12_6", "talismans_2_16", "bosses_5_6", "dragon_hearts_death_roots_1_1", "ancient_dragon_smithing_stones_20", "weapons_13_7", "weapons_32_2", "armor_394", "weapons_19_4", "armor_206", "sorceries_4_6", "weapons_29_18", "armor_178", "quest_order_tldr_85", "cookbooks_1_13", "ashesofwar_12_4", "armor_436", "dragon_hearts_death_roots_1_4", "sorceries_1_5", "ashesofwar_12_6", "cookbooks_3_7", "illusory_walls_3_2", "quest_order_tldr_189", "flasks_2_5", "armor_182", "cookbooks_1_7", "npc_quests_26_7_1", "playthrough_13_5", "crystal_tears_8_4", "quest_order_tldr_54", "playthrough_17_6", "cookbooks_1_6", "playthrough_7_4", "quest_order_tldr_191", "quest_order_tldr_45", "weapons_19_8", "quest_order_tldr_205", "armor_32", "npc_quests_10_10", "crystal_tears_1_4", "weapons_30_4", "weapons_22_10", "weapons_13_16", "npc_quests_10_1", "caves_3_2", "talismans_10_6", "legendaries_1_8", "quest_order_tldr_56", "playthrough_8_1", "ancient_dragon_smithing_stones_2", "ashesofwar_8_6", "armor_217", "ashesofwar_11_6", "armor_467", "caves_5_4", "sorceries_4_23", "cookbooks_1_23", "scrolls_prayerbooks_1_6", "armor_270", "remembrances_mausoleums_1_13_2", "armor_214", "armor_142", "armor_449", "armor_579", "quest_order_tldr_97", "npc_quests_8_1", "weapons_34_6", "armor_512", "crystal_tears_2_4", "armor_122", "playthrough_6_1", "bosses_2_30", "weapons_14_4", "ashesofwar_5_14", "weapons_15_2", "armor_310", "quest_order_tldr_130", "npc_quests_25_3", "npc_quests_26_5", "npc_quests_11_3", "armor_155", "dragon_hearts_death_roots_0_13", "ashesofwar_13_1", "bosses_6_11", "ashesofwar_12_5", "scrolls_prayerbooks_1_7", "armor_160", "spirit_ashes_2_1", "weapons_11_4", "playthrough_18_1", "npc_quests_10_9", "armor_389", "illusory_walls_1_9", "armor_18", "achievements_2_13", "memory_stones_talisman_pouches_1_3", "armor_29", "armor_133", "sorceries_10_2", "ashesofwar_12_10", "quest_order_tldr_187", "npc_quests_7_8", "weapons_19_11", "dragon_hearts_death_roots_1_8", "weapons_6_9", "flasks_1_14", "armor_471", "armor_346", "weapons_4_1", "quest_order_tldr_182", "npc_quests_2_3", "remembrances_mausoleums_1_4", "ashesofwar_11_7", "whetstones_0_3", "quest_order_tldr_148", "quest_order_tldr_79", "armor_60", "flasks_2_7", "armor_345", "quest_order_tldr_44", "armor_275", "incantations_12_3", "npc_quests_34_2", "caves_3_7", "quest_order_tldr_94", "quest_order_tldr_66", "quest_order_tldr_253", "weapons_14_16", "npc_quests_31_12", "quest_order_tldr_224", "crystal_tears_4_2", "armor_252", "armor_566", "talismans_10_4", "armor_147", "talismans_5_6", "playthrough_13_6", "weapons_25_16", "weapons_27_4", "quest_order_tldr_72", "pots_bottles_2_7", "weapons_20_13", "quest_order_tldr_250", "weapons_32_16", "quest_order_tldr_186", "bosses_2_12", "armor_179", "weapons_22_1", "quest_order_tldr_223", "bosses_7_26", "armor_107", "spirit_ashes_6_3", "playthrough_11_3", "npc_quests_26_7_2", "bell_bearings_3_1", "talismans_4_2", "bosses_10_6", "npc_quests_17_3", "playthrough_1_8", "npc_quests_31_15", "legendaries_1_6", "weapons_20_1", "bosses_9_1", "weapons_20_9", "armor_209", "playthrough_5_3", "bosses_5_8", "sorceries_1_7", "bosses_9_10", "weapons_6_1", "armor_73", "armor_370", "bosses_4_32", "caves_3_5", "talismans_2_17", "weapons_14_13", "armor_470", "armor_90", "dragon_hearts_death_roots_0_9", "armor_70", "pots_bottles_3_2", "bosses_4_8", "playthrough_4_11", "quest_order_tldr_20", "quest_order_tldr_15", "armor_364", "legendaries_3_5", "npc_quests_10_4", "npc_quests_17_4_1", "weapons_29_2", "playthrough_1_13", "incantations_1_6", "bosses_5_15", "weapons_17_8", "armor_526", "quest_order_tldr_86", "bosses_4_20", "illusory_walls_4_1", "quest_order_tldr_219", "weapons_30_9", "weapons_1_8", "armor_238", "weapons_30_1", "armor_229", "playthrough_12_4", "legendaries_4_4", "armor_239", "armor_295", "flasks_1_35", "remembrances_mausoleums_2_2", "incantations_1_5", "incantations_12_12", "flasks_2_8", "weapons_26_2", "quest_order_tldr_42", "talismans_2_4", "weapons_10_3", "weapons_29_3", "armor_446", "flasks_1_8", "cookbooks_8_3", "talismans_4_17", "bosses_7_1", "npc_quests_8_3", "armor_180", "achievements_2_11", "sorceries_1_10", "gestures_3_3", "quest_order_tldr_43", "cookbooks_1_9", "pots_bottles_3_3", "ashesofwar_12_9", "flasks_1_22", "talismans_5_8", "sorceries_6_6", "quest_order_tldr_188", "bosses_6_8", "talismans_5_5", "quest_order_tldr_93", "npc_quests_1_7", "npc_quests_17_9", "armor_546", "sorceries_6_1", "spirit_ashes_15_1", "armor_171", "pots_bottles_1_2", "weapons_19_5", "armor_337", "paintings_1_1", "weapons_19_2", "npc_quests_29_10", "ancient_dragon_smithing_stones_17", "bosses_8_1", "armor_557", "weapons_7_4", "weapons_11_5", "weapons_25_8", "bosses_5_17", "playthrough_8_2", "cookbooks_5_4", "talismans_1_1", "spirit_ashes_1_2", "quest_order_tldr_217", "quest_order_tldr_216", "bosses_2_23", "armor_555", "pots_bottles_1_18", "talismans_9_1", "playthrough_2_4", "playthrough_17_4", "armor_536", "armor_59", "bosses_7_5", "spirit_ashes_9_4", "cookbooks_5_5", "bosses_2_10", "bosses_7_15", "weapons_33_10", "incantations_5_9", "weapons_1_6", "flasks_2_9", "quest_order_tldr_26", "bosses_2_20", "scrolls_prayerbooks_1_5", "quest_order_tldr_64", "gestures_0_2", "armor_543", "flasks_1_25", "quest_order_tldr_9", "scrolls_prayerbooks_1_3", "cookbooks_1_16", "quest_order_tldr_143", "weapons_22_8", "armor_387", "armor_441", "npc_quests_3_3", "bosses_5_1", "weapons_8_5", "spirit_ashes_7_1", "quest_order_tldr_115", "playthrough_11_2", "talismans_4_9", "weapons_22_7", "cookbooks_1_22", "ashesofwar_4_1", "armor_208", "weapons_13_10", "gestures_4_2", "npc_quests_11_2", "armor_491", "weapons_13_4", "gestures_5_1", "npc_quests_7_7", "npc_quests_28_6", "flasks_1_11", "npc_quests_23_5", "talismans_2_3", "gestures_1_5", "armor_330", "weapons_24_3", "quest_order_tldr_55_1", "weapons_34_14", "armor_177", "npc_quests_3_4", "bosses_10_9", "weapons_12_1", "armor_246", "armor_313", "playthrough_4_1", "remembrances_mausoleums_1_3_1", "npc_quests_7_1", "weapons_31_1", "playthrough_12_2", "armor_317", "armor_13", "weapons_9_7", "ashesofwar_11_3", "npc_quests_9_4", "npc_quests_16_1", "npc_quests_29_6", "armor_335", "ashesofwar_1_2", "quest_order_tldr_248", "bosses_4_29", "npc_quests_12_5_1", "armor_377", "spirit_ashes_13_1", "weapons_19_9", "talismans_8_7", "playthrough_2_1", "incantations_10_3", "bosses_17_1", "armor_503", "weapons_23_12", "npc_quests_31_2", "quest_order_tldr_28", "quest_order_tldr_91", "weapons_29_16", "ashesofwar_6_8", "weapons_13_18", "bosses_6_3", "bosses_18_3", "ashesofwar_8_3", "weapons_21_1", "armor_499", "achievements_2_9", "quest_order_tldr_22", "playthrough_12_9", "dragon_hearts_death_roots_1_6", "spirit_ashes_3_3", "bell_bearings_1_1", "npc_quests_12_1", "bosses_5_21", "caves_1_3", "bosses_2_26", "armor_324", "illusory_walls_3_1", "weapons_25_1", "talismans_2_15", "sorceries_2_2", "armor_253", "gestures_1_6", "npc_quests_31_17", "npc_quests_3_6", "talismans_16_1", "talismans_5_10", "incantations_9_1", "bosses_11_1", "incantations_5_8", "incantations_7_4", "sorceries_4_29", "weapons_29_5", "weapons_31_4", "bosses_7_23", "ashesofwar_12_7", "cookbooks_6_2", "npc_quests_22_2", "bosses_5_13", "armor_477", "quest_order_tldr_74", "npc_quests_26_2", "quest_order_tldr_83", "bosses_12_3", "weapons_18_2", "bosses_10_4", "npc_quests_8_2", "armor_123", "npc_quests_27_5", "bosses_4_21", "illusory_walls_6_3", "quest_order_tldr_203", "armor_212", "npc_quests_23_1", "weapons_33_8", "npc_quests_7_2", "achievements_2_1", "bosses_4_31", "quest_order_tldr_129", "bosses_18_1", "npc_quests_12_3", "armor_308", "sorceries_10_3", "quest_order_tldr_87", "spirit_ashes_2_2", "cookbooks_1_10", "bosses_4_39", "quest_order_tldr_46", "armor_170", "bosses_4_5", "weapons_17_6", "npc_quests_1_5", "incantations_10_7", "talismans_2_9", "weapons_28_6", "armor_420", "incantations_12_8", "armor_193", "armor_475", "weapons_34_24", "quest_order_tldr_144", "weapons_16_2", "dragon_hearts_death_roots_0_4", "gestures_4_1", "crystal_tears_2_6", "quest_order_tldr_40", "bosses_4_33", "incantations_9_2", "bell_bearings_3_2", "illusory_walls_2_1", "bosses_5_26", "quest_order_tldr_211", "armor_286", "armor_336", "spirit_ashes_3_5", "quest_order_tldr_177", "npc_quests_11_5", "weapons_12_4", "armor_72", "incantations_7_8", "incantations_4_11", "armor_412", "legendaries_2_7", "armor_523", "crystal_tears_5_2", "incantations_12_7", "bosses_15_3", "remembrances_mausoleums_1_10", "bell_bearings_2_2", "armor_443", "armor_361", "crystal_tears_8_2", "playthrough_14_2", "bosses_1_3", "armor_196", "dragon_hearts_death_roots_0_2", "bosses_5_10", "ashesofwar_11_9", "sorceries_4_5", "weapons_22_2", "weapons_11_3", "bell_bearings_1_3", "legendaries_3_4", "armor_563", "bosses_4_28", "weapons_20_3", "quest_order_tldr_156", "incantations_3_9", "talismans_4_4", "scrolls_prayerbooks_1_2", "bosses_4_3", "npc_quests_1_1", "remembrances_mausoleums_1_7_1", "weapons_3_16", "armor_226", "pots_bottles_1_7", "weapons_14_14", "spirit_ashes_3_17", "ashesofwar_11_5", "caves_8_1", "armor_81", "weapons_27_2", "playthrough_3_6", "incantations_8_5", "npc_quests_7_6", "weapons_33_9", "quest_order_tldr_35", "evergaols_1_1", "bosses_2_18", "bosses_7_25", "npc_quests_31_4", "armor_302", "cookbooks_1_4", "caves_2_3", "weapons_20_7", "bosses_2_19", "npc_quests_29_1", "weapons_8_2", "npc_quests_1_4", "weapons_31_2", "achievements_1_3", "caves_2_2", "armor_534", "spirit_ashes_7_3", "bosses_7_28", "cookbooks_1_14", "armor_245", "weapons_17_1", "remembrances_mausoleums_1_12_1", "quest_order_tldr_75", "playthrough_5_9", "weapons_26_4", "armor_288", "armor_299", "sorceries_4_25", "npc_quests_3_8", "caves_4_1", "armor_518", "weapons_3_2", "armor_17", "talismans_5_7", "pots_bottles_2_10", "ashesofwar_12_8", "bosses_15_2", "armor_281", "quest_order_tldr_204", "illusory_walls_1_7", "armor_569", "armor_194", "npc_quests_28_3", "cookbooks_1_17", "remembrances_mausoleums_2_3", "quest_order_tldr_25", "armor_47", "weapons_28_5", "npc_quests_10_8", "incantations_8_1", "armor_3", "talismans_2_6", "armor_97", "talismans_1_5", "armor_207", "npc_quests_23_3", "npc_quests_15_1", "incantations_8_2", "playthrough_17_1", "sorceries_9_6", "armor_351", "weapons_33_18", "talismans_6_3", "sorceries_4_8", "talismans_5_4", "npc_quests_3_7", "armor_101", "playthrough_1_6", "quest_order_tldr_134", "caves_1_8", "armor_388", "armor_131", "quest_order_tldr_81", "armor_485", "spirit_ashes_2_8", "bosses_10_10", "weapons_25_13", "crystal_tears_0_1", "npc_quests_30_6", "npc_quests_4_4", "bosses_4_38", "armor_222", "bosses_6_4", "spirit_ashes_3_11", "weapons_10_2", "bell_bearings_4_2", "incantations_6_2", "weapons_25_10", "quest_order_tldr_65", "ashesofwar_9_2", "playthrough_12_8", "pots_bottles_3_5", "weapons_15_4", "armor_240", "armor_492", "weapons_27_5", "weapons_34_19", "sorceries_4_4", "weapons_6_10", "ashesofwar_3_1", "armor_322", "armor_232", "armor_440", "cookbooks_1_18", "legendaries_4_3", "armor_125", "weapons_33_13", "incantations_10_8", "weapons_14_12", "weapons_14_17", "npc_quests_31_7", "armor_480", "bosses_6_9", "whetstones_0_6", "flasks_1_18", "armor_481", "weapons_17_2", "weapons_5_1", "weapons_26_1", "bosses_10_2", "bosses_3_1", "playthrough_5_1", "armor_504", "caves_1_7", "weapons_9_3", "ashesofwar_10_2", "weapons_29_8", "npc_quests_7_5", "weapons_20_10", "incantations_7_5", "incantations_5_1", "memory_stones_talisman_pouches_0_5", "bosses_8_9", "playthrough_9_2", "caves_2_8", "incantations_4_3", "armor_505", "remembrances_mausoleums_1_8_1", "sorceries_12_3", "armor_547", "bosses_7_20", "bosses_14_2", "talismans_10_8", "armor_514", "cookbooks_1_5", "playthrough_6_2", "npc_quests_12_2", "npc_quests_30_5", "weapons_14_6", "npc_quests_2_4", "npc_quests_26_4", "weapons_19_3", "cookbooks_3_5", "bosses_7_4", "legendaries_1_5", "npc_quests_4_3", "spirit_ashes_7_2", "weapons_3_9", "armor_144", "weapons_12_2", "illusory_walls_2_2", "weapons_34_5", "playthrough_3_2", "talismans_6_6", "spirit_ashes_7_5", "weapons_13_15", "illusory_walls_1_1", "bosses_2_22", "npc_quests_31_20", "legendaries_1_3", "pots_bottles_3_6", "weapons_9_13", "armor_533", "caves_0_3", "quest_order_tldr_128", "bosses_13_1", "sorceries_1_4", "incantations_11_3", "armor_496", "flasks_1_24", "gestures_0_3", "bosses_16_1", "cookbooks_5_6", "illusory_walls_3_5", "armor_293", "quest_order_tldr_126", "armor_126", "armor_357", "ancient_dragon_smithing_stones_7", "npc_quests_26_1", "quest_order_tldr_251", "npc_quests_20_5_2", "evergaols_3_1", "pots_bottles_3_9", "legacy_1_9", "bosses_9_6", "armor_542", "talismans_3_3", "armor_476", "gestures_1_2", "weapons_22_11", "bell_bearings_2_3", "weapons_10_7", "armor_105", "spirit_ashes_14_1", "bosses_9_2", "bosses_10_8", "talismans_4_15", "armor_263", "paintings_6_1", "weapons_27_1", "quest_order_tldr_108", "incantations_7_7", "remembrances_mausoleums_1_10_2", "npc_quests_10_2", "ashesofwar_8_9", "caves_3_3", "weapons_3_6", "bosses_4_6", "npc_quests_32_5", "spirit_ashes_2_5", "bosses_4_34", "quest_order_tldr_138", "weapons_33_16", "armor_69", "armor_561", "talismans_4_10", "legendaries_4_2", "weapons_33_21", "flasks_1_43", "npc_quests_28_2", "achievements_3_7", "weapons_9_15", "legendaries_3_2", "ashesofwar_5_5", "quest_order_tldr_173", "npc_quests_15_2", "armor_46", "gestures_0_5", "armor_340", "weapons_21_5", "pots_bottles_2_9", "armor_165", "armor_287", "armor_497", "talismans_8_6", "armor_242", "gestures_0_7", "armor_507", "playthrough_16_2", "talismans_7_7", "ancient_dragon_smithing_stones_10", "quest_order_tldr_137", "legendaries_1_1_0", "armor_45", "weapons_18_3", "weapons_33_19", "armor_161", "armor_445", "ashesofwar_12_3", "armor_116", "weapons_5_6", "ashesofwar_1_1", "incantations_3_2", "cookbooks_1_21", "remembrances_mausoleums_1_2_2", "playthrough_13_7", "ashesofwar_5_7", "playthrough_14_6", "armor_202", "sorceries_4_11", "weapons_34_22", "legendaries_5_2", "weapons_29_14", "legendaries_2_5", "armor_516", "legendaries_1_1", "sorceries_4_7", "ashesofwar_2_2", "incantations_11_1", "armor_276", "armor_463", "armor_444", "armor_517", "incantations_10_2", "gestures_2_3", "armor_82", "armor_195", "talismans_14_1", "cookbooks_1_1", "weapons_20_12", "ashesofwar_12_11", "weapons_23_15", "dragon_hearts_death_roots_1_3", "weapons_33_26", "playthrough_10_1", "achievements_2_22", "ashesofwar_5_12", "playthrough_1_3", "ashesofwar_5_6", "bosses_4_10", "bosses_6_2", "bosses_1_7", "crystal_tears_1_1", "weapons_1_7", "weapons_13_11", "talismans_4_18", "npc_quests_30_2", "armor_553", "weapons_1_2", "armor_369", "paintings_5_1", "playthrough_7_3", "gestures_8_1", "npc_quests_29_9", "npc_quests_2_1", "weapons_22_6", "armor_53", "weapons_34_2", "bosses_4_9", "cookbooks_2_1", "armor_224", "talismans_9_2", "quest_order_tldr_113", "armor_303", "talismans_5_9", "paintings_5", "weapons_25_12", "spirit_ashes_2_9", "playthrough_8_9", "npc_quests_29_3_1", "armor_189", "incantations_6_3", "quest_order_tldr_96", "armor_353", "npc_quests_12_6", "talismans_6_2", "bosses_11_2", "weapons_25_9", "talismans_12_2", "incantations_3_14", "bosses_7_12", "quest_order_tldr_171", "armor_28", "incantations_1_1", "talismans_6_1", "armor_175", "armor_396", "npc_quests_25_1", "incantations_3_8", "armor_58", "bosses_9_5", "remembrances_mausoleums_1_2_1", "armor_311", "great_runes_1_2", ]);
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
const gestures_total = 47;
var gestures_checked = 0;
for (var id in profiles[profilesKey][profiles.current].checklistData) {
if (profiles[profilesKey][profiles.current].checklistData[id] === true && all_ids.has(id)) {
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
if (playthrough_checked >= playthrough_total){
$("#playthrough_progress_total").html("DONE");
} else {
$("#playthrough_progress_total").html(playthrough_checked + "/" + playthrough_total);
}
if (quest_order_tldr_checked >= quest_order_tldr_total){
$("#quest_order_tldr_progress_total").html("DONE");
} else {
$("#quest_order_tldr_progress_total").html(quest_order_tldr_checked + "/" + quest_order_tldr_total);
}
if (npc_quests_checked >= npc_quests_total){
$("#npc_quests_progress_total").html("DONE");
} else {
$("#npc_quests_progress_total").html(npc_quests_checked + "/" + npc_quests_total);
}
if (achievements_checked >= achievements_total){
$("#achievements_progress_total").html("DONE");
} else {
$("#achievements_progress_total").html(achievements_checked + "/" + achievements_total);
}
if (legendaries_checked >= legendaries_total){
$("#legendaries_progress_total").html("DONE");
} else {
$("#legendaries_progress_total").html(legendaries_checked + "/" + legendaries_total);
}
if (bosses_checked >= bosses_total){
$("#bosses_progress_total").html("DONE");
} else {
$("#bosses_progress_total").html(bosses_checked + "/" + bosses_total);
}
if (legacy_checked >= legacy_total){
$("#legacy_progress_total").html("DONE");
} else {
$("#legacy_progress_total").html(legacy_checked + "/" + legacy_total);
}
if (caves_checked >= caves_total){
$("#caves_progress_total").html("DONE");
} else {
$("#caves_progress_total").html(caves_checked + "/" + caves_total);
}
if (evergaols_checked >= evergaols_total){
$("#evergaols_progress_total").html("DONE");
} else {
$("#evergaols_progress_total").html(evergaols_checked + "/" + evergaols_total);
}
if (illusory_walls_checked >= illusory_walls_total){
$("#illusory_walls_progress_total").html("DONE");
} else {
$("#illusory_walls_progress_total").html(illusory_walls_checked + "/" + illusory_walls_total);
}
if (weapons_checked >= weapons_total){
$("#weapons_progress_total").html("DONE");
} else {
$("#weapons_progress_total").html(weapons_checked + "/" + weapons_total);
}
if (armor_checked >= armor_total){
$("#armor_progress_total").html("DONE");
} else {
$("#armor_progress_total").html(armor_checked + "/" + armor_total);
}
if (talismans_checked >= talismans_total){
$("#talismans_progress_total").html("DONE");
} else {
$("#talismans_progress_total").html(talismans_checked + "/" + talismans_total);
}
if (incantations_checked >= incantations_total){
$("#incantations_progress_total").html("DONE");
} else {
$("#incantations_progress_total").html(incantations_checked + "/" + incantations_total);
}
if (sorceries_checked >= sorceries_total){
$("#sorceries_progress_total").html("DONE");
} else {
$("#sorceries_progress_total").html(sorceries_checked + "/" + sorceries_total);
}
if (ashesofwar_checked >= ashesofwar_total){
$("#ashesofwar_progress_total").html("DONE");
} else {
$("#ashesofwar_progress_total").html(ashesofwar_checked + "/" + ashesofwar_total);
}
if (spirit_ashes_checked >= spirit_ashes_total){
$("#spirit_ashes_progress_total").html("DONE");
} else {
$("#spirit_ashes_progress_total").html(spirit_ashes_checked + "/" + spirit_ashes_total);
}
if (flasks_checked >= flasks_total){
$("#flasks_progress_total").html("DONE");
} else {
$("#flasks_progress_total").html(flasks_checked + "/" + flasks_total);
}
if (crystal_tears_checked >= crystal_tears_total){
$("#crystal_tears_progress_total").html("DONE");
} else {
$("#crystal_tears_progress_total").html(crystal_tears_checked + "/" + crystal_tears_total);
}
if (memory_stones_talisman_pouches_checked >= memory_stones_talisman_pouches_total){
$("#memory_stones_talisman_pouches_progress_total").html("DONE");
} else {
$("#memory_stones_talisman_pouches_progress_total").html(memory_stones_talisman_pouches_checked + "/" + memory_stones_talisman_pouches_total);
}
if (scrolls_prayerbooks_checked >= scrolls_prayerbooks_total){
$("#scrolls_prayerbooks_progress_total").html("DONE");
} else {
$("#scrolls_prayerbooks_progress_total").html(scrolls_prayerbooks_checked + "/" + scrolls_prayerbooks_total);
}
if (whetstones_checked >= whetstones_total){
$("#whetstones_progress_total").html("DONE");
} else {
$("#whetstones_progress_total").html(whetstones_checked + "/" + whetstones_total);
}
if (bell_bearings_checked >= bell_bearings_total){
$("#bell_bearings_progress_total").html("DONE");
} else {
$("#bell_bearings_progress_total").html(bell_bearings_checked + "/" + bell_bearings_total);
}
if (cookbooks_checked >= cookbooks_total){
$("#cookbooks_progress_total").html("DONE");
} else {
$("#cookbooks_progress_total").html(cookbooks_checked + "/" + cookbooks_total);
}
if (ancient_dragon_smithing_stones_checked >= ancient_dragon_smithing_stones_total){
$("#ancient_dragon_smithing_stones_progress_total").html("DONE");
} else {
$("#ancient_dragon_smithing_stones_progress_total").html(ancient_dragon_smithing_stones_checked + "/" + ancient_dragon_smithing_stones_total);
}
if (remembrances_mausoleums_checked >= remembrances_mausoleums_total){
$("#remembrances_mausoleums_progress_total").html("DONE");
} else {
$("#remembrances_mausoleums_progress_total").html(remembrances_mausoleums_checked + "/" + remembrances_mausoleums_total);
}
if (great_runes_checked >= great_runes_total){
$("#great_runes_progress_total").html("DONE");
} else {
$("#great_runes_progress_total").html(great_runes_checked + "/" + great_runes_total);
}
if (dragon_hearts_death_roots_checked >= dragon_hearts_death_roots_total){
$("#dragon_hearts_death_roots_progress_total").html("DONE");
} else {
$("#dragon_hearts_death_roots_progress_total").html(dragon_hearts_death_roots_checked + "/" + dragon_hearts_death_roots_total);
}
if (paintings_checked >= paintings_total){
$("#paintings_progress_total").html("DONE");
} else {
$("#paintings_progress_total").html(paintings_checked + "/" + paintings_total);
}
if (pots_bottles_checked >= pots_bottles_total){
$("#pots_bottles_progress_total").html("DONE");
} else {
$("#pots_bottles_progress_total").html(pots_bottles_checked + "/" + pots_bottles_total);
}
if (gestures_checked >= gestures_total){
$("#gestures_progress_total").html("DONE");
} else {
$("#gestures_progress_total").html(gestures_checked + "/" + gestures_total);
}
}
calculateProgress();
  });
})( jQuery );
