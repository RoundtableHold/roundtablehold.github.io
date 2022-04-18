
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
        var all_ids = new Set(["npc_quests_14_2", "armor_103", "armor_340", "flasks_1_7", "gestures_8_1", "weapons_5_4", "flasks_1_23", "quest_order_tldr_251", "spirit_ashes_3_15", "npc_quests_19_3_1", "legendaries_3_1", "weapons_9_6", "npc_quests_1_4", "quest_order_tldr_218", "flasks_1_8", "playthrough_1_8", "dragon_hearts_death_roots_0_9", "playthrough_4_6", "armor_421", "armor_505", "npc_quests_24_2_1", "armor_189", "bosses_7_11", "weapons_6_14", "armor_194", "armor_431", "scrolls_prayerbooks_1_4", "weapons_9_11", "armor_579", "armor_415", "playthrough_10_6", "incantations_5_13", "weapons_18_5", "spirit_ashes_3_13", "armor_529", "npc_quests_11_2", "armor_365", "weapons_33_1", "weapons_20_14", "armor_578", "npc_quests_26_3", "pots_bottles_1_6", "npc_quests_33_1", "bosses_7_13", "flasks_1_5", "armor_222", "incantations_5_8", "armor_480", "armor_69", "flasks_2_10", "quest_order_tldr_237", "npc_quests_7_5", "npc_quests_13_1", "armor_123", "quest_order_tldr_212", "talismans_6_7", "weapons_15_7", "quest_order_tldr_211", "quest_order_tldr_192", "npc_quests_24_2_2", "talismans_6_3", "incantations_8_4", "npc_quests_1_8", "npc_quests_31_12", "armor_410", "bosses_2_7", "weapons_15_4", "npc_quests_8_6", "armor_275", "spirit_ashes_6_3", "weapons_14_15", "bosses_3_1", "weapons_34_15", "quest_order_tldr_159", "armor_348", "npc_quests_9_4", "weapons_12_1", "armor_391", "npc_quests_31_2", "npc_quests_3_7", "armor_23", "weapons_34_11", "weapons_5_2", "sorceries_4_27", "armor_361", "flasks_1_36", "weapons_34_13", "sorceries_12_2", "cookbooks_1_12", "armor_102", "illusory_walls_3_1", "remembrances_mausoleums_1_12", "flasks_1_35", "weapons_7_3", "weapons_32_2", "bosses_18_1", "armor_24", "armor_368", "quest_order_tldr_236", "bosses_5_12", "flasks_1_6", "cookbooks_3_4", "ashesofwar_6_6", "remembrances_mausoleums_1_12_1", "gestures_1_12", "quest_order_tldr_239", "weapons_3_10", "flasks_1_34", "playthrough_7_2", "achievements_3_3", "sorceries_8_3", "ashesofwar_13_10", "ashesofwar_8_9", "flasks_1_25", "armor_152", "weapons_19_7", "bosses_1_4", "playthrough_11_1", "quest_order_tldr_102", "legendaries_4_4", "npc_quests_19_8", "quest_order_tldr_203", "ashesofwar_1_2", "weapons_9_2", "npc_quests_20_6", "playthrough_4_7", "weapons_6_9", "gestures_3_3", "bosses_12_2", "weapons_4_2", "achievements_2_22", "bosses_15_1", "armor_40", "cookbooks_7_1", "playthrough_1_9", "crystal_tears_5_2", "quest_order_tldr_76", "npc_quests_30_2", "weapons_21_1", "remembrances_mausoleums_2_4", "quest_order_tldr_145", "legendaries_3_4", "talismans_10_5", "weapons_13_17", "achievements_2_4", "armor_524", "bosses_2_9", "weapons_8_8", "quest_order_tldr_174", "incantations_10_8", "quest_order_tldr_48", "weapons_1_2", "great_runes_1_2", "npc_quests_20_9", "bosses_11_5", "quest_order_tldr_17", "armor_468", "remembrances_mausoleums_1_6_1", "weapons_16_3", "weapons_29_5", "armor_319", "pots_bottles_1_10", "npc_quests_26_2", "playthrough_12_2", "npc_quests_29_5", "weapons_13_14", "remembrances_mausoleums_1_15", "legacy_1_4", "armor_349", "great_runes_2_4", "bell_bearings_2_1", "quest_order_tldr_23", "armor_99", "cookbooks_1_3", "armor_70", "quest_order_tldr_53", "playthrough_17_8", "armor_184", "armor_323", "sorceries_1_4", "bosses_4_6", "flasks_1_9", "armor_496", "talismans_1_7", "remembrances_mausoleums_1_4_1", "quest_order_tldr_82", "gestures_3_2", "cookbooks_7_3", "quest_order_tldr_44", "talismans_2_6", "legacy_1_9", "talismans_13_1", "bosses_16_1", "armor_459", "cookbooks_7_2", "gestures_1_6", "pots_bottles_1_9", "sorceries_7_1", "weapons_6_11", "quest_order_tldr_256", "pots_bottles_1_13", "legacy_1_7", "quest_order_tldr_254", "armor_321", "weapons_1_9", "ashesofwar_11_8", "cookbooks_2_6", "armor_522", "armor_563", "quest_order_tldr_248", "weapons_30_5", "remembrances_mausoleums_1_2", "illusory_walls_3_5", "ashesofwar_6_9", "quest_order_tldr_19", "quest_order_tldr_150", "armor_177", "weapons_24_5", "npc_quests_21_3", "armor_298", "evergaols_1_2", "weapons_23_11", "legendaries_2_3", "playthrough_14_5", "great_runes_1_3", "sorceries_4_20", "playthrough_18_2", "npc_quests_12_5_2", "armor_105", "bell_bearings_1_2", "armor_457", "bosses_12_4", "talismans_8_1", "remembrances_mausoleums_1_12_2", "npc_quests_7_6", "weapons_34_10", "spirit_ashes_9_1", "npc_quests_9_3", "armor_402", "quest_order_tldr_255", "caves_3_3", "npc_quests_31_8", "illusory_walls_1_1", "armor_96", "armor_167", "achievements_2_12", "weapons_30_9", "armor_106", "quest_order_tldr_106", "weapons_3_7", "armor_419", "armor_564", "bosses_14_3", "ancient_dragon_smithing_stones_6", "weapons_32_11", "incantations_1_5", "dragon_hearts_death_roots_0_3", "weapons_34_7", "gestures_3_4", "bell_bearings_4_3", "bosses_5_2", "quest_order_tldr_227", "quest_order_tldr_88", "bosses_4_39", "spirit_ashes_2_2", "ashesofwar_11_4", "npc_quests_19_6", "cookbooks_4_3", "weapons_5_10", "weapons_11_2", "ashesofwar_12_7", "armor_312", "armor_487", "incantations_5_10", "weapons_25_5", "npc_quests_21_7", "weapons_23_7", "talismans_2_3", "illusory_walls_1_3", "talismans_14_3", "illusory_walls_1_2", "spirit_ashes_2_1", "armor_495", "npc_quests_33_5", "armor_566", "pots_bottles_2_7", "bosses_7_6", "weapons_32_14", "armor_122", "armor_336", "talismans_10_9", "spirit_ashes_3_9", "talismans_5_2", "quest_order_tldr_199", "bosses_5_3", "talismans_10_3", "crystal_tears_2_4", "quest_order_tldr_118", "playthrough_13_4", "talismans_17_1", "bosses_7_20", "quest_order_tldr_177", "armor_540", "weapons_8_9", "armor_183", "bosses_5_16", "bosses_11_1", "npc_quests_21_2", "armor_342", "armor_518", "spirit_ashes_5_1", "quest_order_tldr_101", "weapons_28_4", "weapons_14_9", "ancient_dragon_smithing_stones_19", "armor_278", "flasks_1_10", "incantations_3_4", "quest_order_tldr_160", "bosses_9_2", "quest_order_tldr_13", "npc_quests_9_5", "armor_243", "armor_284", "armor_521", "sorceries_4_28_1", "playthrough_13_7", "npc_quests_22_2", "sorceries_6_3", "armor_249", "achievements_2_19", "armor_582", "ashesofwar_8_6", "weapons_6_3", "armor_449", "ashesofwar_11_11", "playthrough_9_7", "talismans_11_4", "armor_114", "weapons_34_14", "armor_490", "memory_stones_talisman_pouches_0_8", "ashesofwar_5_14", "npc_quests_27_1", "spirit_ashes_12_1", "armor_396", "armor_450", "cookbooks_7_4", "pots_bottles_1_3", "remembrances_mausoleums_1_7_1", "gestures_1_2", "flasks_1_40", "armor_113", "npc_quests_30_6", "weapons_18_1", "weapons_31_1", "armor_443", "legendaries_2_4", "gestures_1_1", "memory_stones_talisman_pouches_0_3", "memory_stones_talisman_pouches_0_4", "npc_quests_28_5", "achievements_2_18", "quest_order_tldr_11", "armor_159", "illusory_walls_7_1", "weapons_33_2", "weapons_32_1", "bosses_2_14", "spirit_ashes_2_9", "illusory_walls_2_1", "incantations_5_6", "sorceries_4_4", "crystal_tears_8_3", "weapons_19_3", "weapons_20_2", "ashesofwar_9_3", "bell_bearings_3_3", "npc_quests_26_4", "quest_order_tldr_4", "armor_371", "bosses_5_7", "armor_533", "npc_quests_3_7_2", "crystal_tears_3_2", "quest_order_tldr_258", "incantations_4_7", "quest_order_tldr_54", "quest_order_tldr_245", "talismans_8_5", "incantations_11_1", "weapons_14_4", "playthrough_3_3", "armor_41", "quest_order_tldr_95", "quest_order_tldr_112", "incantations_12_16", "playthrough_4_14", "achievements_2_21", "sorceries_4_9", "npc_quests_10_1", "spirit_ashes_9_4", "weapons_24_4", "weapons_23_5", "armor_485", "crystal_tears_8_2", "armor_357", "weapons_25_1", "quest_order_tldr_152", "illusory_walls_3_2", "quest_order_tldr_176", "npc_quests_6_5", "gestures_4_3", "armor_388", "npc_quests_31_17", "npc_quests_10_9", "talismans_1_4", "ashesofwar_11_5", "weapons_23_8", "weapons_31_5", "weapons_32_15", "talismans_4_17", "weapons_9_10", "weapons_14_12", "armor_62", "playthrough_2_1", "armor_205", "weapons_33_27", "armor_121", "weapons_23_12", "playthrough_14_1", "incantations_9_2", "spirit_ashes_3_18", "weapons_1_5", "weapons_3_11", "flasks_2_2", "legendaries_1_8", "ashesofwar_3_1", "bosses_11_4", "gestures_2_1", "armor_536", "npc_quests_1_6", "playthrough_10_3", "quest_order_tldr_108", "armor_154", "talismans_11_5", "incantations_10_1", "weapons_15_5", "armor_173", "quest_order_tldr_142", "npc_quests_23_4", "armor_7", "armor_351", "npc_quests_15_4", "npc_quests_3_2", "armor_104", "armor_36", "cookbooks_2_1", "quest_order_tldr_117", "quest_order_tldr_238", "achievements_2_8", "quest_order_tldr_89", "ancient_dragon_smithing_stones_18", "armor_30", "armor_116", "ashesofwar_6_1", "sorceries_2_2", "quest_order_tldr_24", "playthrough_1_12", "weapons_14_17", "npc_quests_10_3", "crystal_tears_2_7", "bosses_8_4", "quest_order_tldr_59", "talismans_4_19", "talismans_10_8", "npc_quests_31_14", "ashesofwar_12_1", "bell_bearings_2_2", "armor_358", "caves_8_3", "remembrances_mausoleums_1_9_2", "armor_204", "weapons_23_14", "quest_order_tldr_230", "remembrances_mausoleums_1_3_2", "armor_451", "quest_order_tldr_67", "weapons_34_8", "quest_order_tldr_31", "bell_bearings_4_2", "playthrough_14_10", "pots_bottles_2_3", "crystal_tears_5_1", "gestures_1_3", "bosses_8_12", "armor_580", "talismans_4_11", "incantations_7_3", "armor_72", "weapons_1_1", "ashesofwar_10_2", "bosses_2_8", "talismans_5_8", "ashesofwar_5_6", "npc_quests_32_6", "weapons_22_12", "armor_37", "quest_order_tldr_163", "achievements_2_13", "quest_order_tldr_18", "armor_26", "npc_quests_29_8", "weapons_34_22", "bosses_1_2", "armor_81", "weapons_32_5", "caves_0_5", "ashesofwar_13_8", "armor_90", "incantations_12_11", "great_runes_1_4", "cookbooks_1_6", "weapons_27_6", "armor_338", "weapons_19_11", "playthrough_9_4", "npc_quests_15_6", "caves_4_2", "weapons_17_2", "npc_quests_31_5", "achievements_2_11", "bosses_4_20", "legacy_1_2", "cookbooks_5_7", "quest_order_tldr_42", "quest_order_tldr_116", "armor_322", "talismans_12_1", "ashesofwar_2_2", "weapons_3_1", "talismans_5_1", "incantations_9_1", "bosses_15_2", "talismans_4_3", "bosses_8_15", "npc_quests_30_5", "armor_190", "weapons_23_13", "armor_88", "illusory_walls_1_5", "playthrough_4_3", "armor_229", "npc_quests_21_3_1", "dragon_hearts_death_roots_0_2", "crystal_tears_2_6", "weapons_22_8", "weapons_9_13", "quest_order_tldr_252", "bosses_2_12", "armor_416", "ashesofwar_6_3", "ashesofwar_13_6", "armor_300", "npc_quests_29_6", "quest_order_tldr_73", "npc_quests_3_1", "bosses_5_29", "armor_171", "paintings_4", "bosses_8_16", "quest_order_tldr_125", "armor_10", "ashesofwar_6_11", "weapons_13_1", "gestures_2_5", "armor_301", "armor_511", "talismans_7_7", "bosses_7_26", "memory_stones_talisman_pouches_1_4", "playthrough_5_10", "weapons_14_21", "quest_order_tldr_180", "playthrough_8_2", "ashesofwar_5_3", "remembrances_mausoleums_2_2", "achievements_2_2", "weapons_34_1", "armor_425", "flasks_1_15", "armor_395", "bosses_6_7", "caves_3_8", "ashesofwar_12_4", "quest_order_tldr_46", "ashesofwar_12_3", "bosses_15_3", "playthrough_4_2", "bosses_5_18", "talismans_8_8", "caves_5_1", "paintings_6_1", "pots_bottles_1_1", "quest_order_tldr_15", "armor_433", "weapons_8_3", "talismans_14_2", "gestures_0_3", "paintings_7", "armor_91", "weapons_26_1", "quest_order_tldr_85", "bosses_7_1", "weapons_34_21", "talismans_4_1", "dragon_hearts_death_roots_1_2", "talismans_6_2", "remembrances_mausoleums_1_11_1", "weapons_34_19", "remembrances_mausoleums_1_1_2", "quest_order_tldr_143", "legacy_1_16", "incantations_12_4", "remembrances_mausoleums_1_7", "npc_quests_31_6", "memory_stones_talisman_pouches_0_5", "bosses_5_14", "armor_420", "talismans_16_1", "sorceries_4_12", "flasks_2_8", "quest_order_tldr_26", "bosses_6_17", "quest_order_tldr_234", "bosses_10_10", "weapons_12_4", "bosses_2_5", "npc_quests_6_4", "weapons_5_6", "armor_65", "npc_quests_23_3", "bosses_5_10", "ashesofwar_11_3", "spirit_ashes_15_1", "quest_order_tldr_30", "armor_494", "talismans_1_3", "sorceries_8_5", "armor_63", "weapons_13_10", "armor_389", "quest_order_tldr_94", "npc_quests_32_2", "npc_quests_10_10", "incantations_1_4", "weapons_26_4", "legendaries_2_7", "weapons_25_15", "playthrough_8_10", "weapons_29_4", "ashesofwar_5_4", "npc_quests_20_5", "weapons_28_8", "illusory_walls_7_2", "armor_67", "playthrough_15_1", "armor_513", "playthrough_13_8", "playthrough_1_14", "armor_448", "talismans_6_4", "weapons_14_6", "playthrough_5_1", "bosses_4_5", "whetstones_0_2", "pots_bottles_1_17", "flasks_1_1", "talismans_2_13", "sorceries_11_1", "legacy_1_13", "legendaries_3_6", "armor_581", "cookbooks_2_3", "weapons_21_3", "armor_2", "legacy_1_11", "armor_335", "armor_528", "talismans_5_9", "ancient_dragon_smithing_stones_11", "npc_quests_20_10", "playthrough_12_7", "weapons_22_10", "armor_147", "armor_446", "armor_523", "armor_110", "armor_281", "armor_503", "flasks_1_12", "ashesofwar_12_5", "ashesofwar_11_9", "weapons_23_6", "quest_order_tldr_111", "weapons_30_3", "cookbooks_5_5", "bosses_4_8", "bosses_8_10", "armor_38", "talismans_2_15", "npc_quests_15_2", "bosses_5_19", "bosses_2_16", "playthrough_14_8", "quest_order_tldr_86", "armor_314", "bosses_5_25", "paintings_5", "npc_quests_28_2", "remembrances_mausoleums_1_10_2", "cookbooks_1_13", "sorceries_4_28_0", "weapons_22_1", "quest_order_tldr_208", "weapons_32_9", "weapons_34_16", "bosses_2_18", "bosses_9_4", "armor_285", "armor_303", "npc_quests_23_5", "cookbooks_3_5", "weapons_6_6", "bosses_6_2", "talismans_4_16", "quest_order_tldr_134", "weapons_27_5", "playthrough_2_3", "armor_17", "npc_quests_25_3", "incantations_12_14", "armor_481", "armor_309", "armor_207", "playthrough_5_4", "npc_quests_12_3", "armor_369", "npc_quests_17_2", "weapons_9_7", "armor_288", "weapons_33_21", "weapons_20_11", "quest_order_tldr_126", "caves_2_7", "armor_535", "talismans_10_4", "pots_bottles_1_16", "weapons_14_14", "gestures_0_7", "weapons_33_10", "flasks_1_29", "bosses_7_21", "quest_order_tldr_122", "weapons_33_14", "gestures_0_10", "npc_quests_4_1", "weapons_13_19", "armor_330", "armor_435", "weapons_29_15", "weapons_21_4", "weapons_25_12", "armor_43", "weapons_9_1", "weapons_20_1", "weapons_33_18", "ancient_dragon_smithing_stones_1", "great_runes_1_6", "armor_135", "flasks_1_21", "weapons_2_1", "weapons_30_6", "weapons_14_10", "ashesofwar_12_9", "cookbooks_1_1", "remembrances_mausoleums_1_2_2", "armor_218", "caves_2_3", "weapons_9_8", "armor_179", "armor_514", "weapons_13_11", "weapons_9_15", "bosses_8_1", "talismans_5_7", "dragon_hearts_death_roots_0_6", "crystal_tears_8_4", "sorceries_8_4", "weapons_33_4", "playthrough_1_5", "armor_236", "armor_128", "ancient_dragon_smithing_stones_16", "cookbooks_4_2", "incantations_3_12", "dragon_hearts_death_roots_0_11", "quest_order_tldr_29", "quest_order_tldr_104", "armor_409", "legendaries_4_2", "weapons_19_4", "playthrough_5_2", "bosses_10_12", "armor_280", "playthrough_12_6", "evergaols_5_1", "quest_order_tldr_246", "illusory_walls_1_10", "armor_274", "weapons_20_8", "ashesofwar_12_6", "flasks_1_19", "bosses_1_5", "ashesofwar_7_3", "remembrances_mausoleums_2_3", "npc_quests_7_9", "weapons_25_8", "quest_order_tldr_147", "weapons_28_6", "quest_order_tldr_172", "achievements_2_6", "quest_order_tldr_12", "playthrough_7_6", "weapons_3_4", "caves_6_1", "bosses_2_2", "remembrances_mausoleums_1_15_1", "armor_198", "spirit_ashes_7_3", "playthrough_13_1", "armor_66", "weapons_9_12", "ashesofwar_2_3", "talismans_13_2", "armor_165", "bosses_1_9", "cookbooks_5_2", "caves_7_3", "bosses_2_23", "armor_254", "armor_219", "armor_531", "quest_order_tldr_198", "playthrough_3_2", "armor_240", "armor_501", "armor_157", "bosses_7_2", "armor_567", "spirit_ashes_1_1", "dragon_hearts_death_roots_1_7", "armor_168", "armor_220", "quest_order_tldr_232", "npc_quests_6_2", "bosses_7_17", "weapons_20_7", "bosses_6_12", "spirit_ashes_5_2", "quest_order_tldr_20", "quest_order_tldr_9", "weapons_29_2", "npc_quests_5_1", "ashesofwar_13_4", "armor_516", "scrolls_prayerbooks_1_7", "npc_quests_31_20_1", "bosses_4_35", "npc_quests_19_9", "quest_order_tldr_68", "weapons_34_20", "achievements_2_14", "ashesofwar_1_4", "bosses_6_5", "npc_quests_30_3", "bosses_5_11", "gestures_1_11", "armor_197", "quest_order_tldr_225", "caves_1_3", "npc_quests_19_2", "gestures_1_9", "illusory_walls_4_1", "armor_100", "quest_order_tldr_217", "quest_order_tldr_201", "talismans_2_1", "crystal_tears_6_3", "pots_bottles_2_4", "quest_order_tldr_216", "armor_164", "remembrances_mausoleums_1_8_2", "legendaries_3_5", "weapons_20_9", "bosses_7_24", "armor_262", "quest_order_tldr_84", "talismans_9_4", "bosses_7_7", "sorceries_5_2", "incantations_3_5", "npc_quests_17_4_2", "npc_quests_28_6", "illusory_walls_6_1", "weapons_14_19", "sorceries_9_1", "armor_287", "armor_186", "armor_477", "achievements_1_4", "sorceries_4_22", "ancient_dragon_smithing_stones_5", "armor_412", "bosses_2_26", "playthrough_1_1", "talismans_7_4", "bosses_5_17", "bosses_4_34", "playthrough_2_5", "weapons_7_7", "quest_order_tldr_55", "quest_order_tldr_196", "talismans_1_6", "pots_bottles_2_5", "quest_order_tldr_49", "quest_order_tldr_222", "armor_517", "weapons_30_4", "weapons_30_7", "quest_order_tldr_244", "sorceries_8_10", "weapons_1_4", "playthrough_10_2", "illusory_walls_3_4", "playthrough_10_7", "weapons_3_15", "caves_5_4", "remembrances_mausoleums_1_6_2", "dragon_hearts_death_roots_0_1", "incantations_3_11", "spirit_ashes_4_2", "playthrough_8_7", "quest_order_tldr_262", "incantations_5_5", "armor_534", "armor_577", "weapons_25_10", "ashesofwar_14_1", "pots_bottles_1_5", "spirit_ashes_2_5", "bosses_7_14", "quest_order_tldr_39", "npc_quests_17_9", "weapons_11_1", "bosses_4_7", "quest_order_tldr_144", "bosses_7_22", "weapons_11_3", "talismans_12_2", "armor_499", "quest_order_tldr_77", "legendaries_2_2", "ashesofwar_5_5", "npc_quests_21_5", "bosses_7_28", "armor_467", "npc_quests_26_6", "armor_384", "armor_145", "armor_463", "incantations_4_5", "talismans_5_6", "npc_quests_8_4", "playthrough_7_4", "armor_252", "armor_573", "cookbooks_5_6", "bosses_4_29", "quest_order_tldr_226", "weapons_34_17", "armor_570", "armor_507", "spirit_ashes_6_2", "npc_quests_3_7_1", "playthrough_17_2", "legendaries_4_3", "scrolls_prayerbooks_1_1", "weapons_34_9", "remembrances_mausoleums_1_14_1", "armor_247", "quest_order_tldr_169", "armor_269", "caves_3_5", "armor_82", "weapons_29_3", "weapons_32_6", "evergaols_0_1", "weapons_16_1", "ashesofwar_5_7", "remembrances_mausoleums_1_13_1", "npc_quests_1_5", "flasks_2_1", "talismans_3_2", "talismans_11_1", "weapons_33_22", "cookbooks_4_1", "weapons_3_2", "npc_quests_19_1", "achievements_2_3", "npc_quests_31_16", "incantations_12_6", "playthrough_3_6", "evergaols_4_1", "caves_2_5", "incantations_10_6", "quest_order_tldr_110", "armor_316", "weapons_28_3", "bosses_5_21", "spirit_ashes_3_2", "weapons_33_16", "armor_175", "quest_order_tldr_90", "spirit_ashes_4_6", "incantations_12_13", "armor_211", "armor_28", "npc_quests_20_5_3", "quest_order_tldr_93", "armor_242", "armor_302", "scrolls_prayerbooks_1_2", "armor_253", "bosses_6_1", "weapons_20_12", "npc_quests_2_5", "achievements_3_2", "talismans_4_12", "npc_quests_31_3", "illusory_walls_3_6", "bell_bearings_1_3", "armor_79", "weapons_33_25", "quest_order_tldr_191", "caves_3_1", "armor_571", "caves_1_6", "sorceries_6_4", "npc_quests_10_5", "npc_quests_7_3", "quest_order_tldr_27", "sorceries_9_5", "npc_quests_8_1", "weapons_23_4", "armor_461", "spirit_ashes_3_6", "gestures_2_2", "weapons_6_2", "armor_235", "quest_order_tldr_64", "playthrough_1_2", "pots_bottles_2_9", "gestures_0_9", "quest_order_tldr_63", "quest_order_tldr_233", "bosses_4_28", "caves_1_4", "bosses_8_8", "weapons_19_6", "whetstones_0_3", "incantations_8_2", "bosses_4_33", "playthrough_6_2", "bosses_5_27", "caves_5_3", "quest_order_tldr_119", "armor_363", "spirit_ashes_4_9", "bosses_2_28", "sorceries_4_25", "memory_stones_talisman_pouches_1_2", "armor_399", "quest_order_tldr_137", "armor_397", "weapons_17_1", "talismans_2_16", "talismans_4_13", "playthrough_8_1", "spirit_ashes_2_7", "armor_250", "flasks_1_26", "gestures_0_12", "quest_order_tldr_165", "armor_339", "crystal_tears_3_5", "incantations_12_1", "quest_order_tldr_124", "talismans_5_12", "armor_345", "armor_374", "playthrough_9_3", "talismans_8_3", "armor_385", "bosses_7_18", "paintings_1_1", "armor_471", "weapons_19_1", "pots_bottles_1_8", "incantations_5_7", "armor_34", "ancient_dragon_smithing_stones_2", "pots_bottles_2_1", "quest_order_tldr_154", "bosses_2_27", "playthrough_9_2", "weapons_33_5", "bosses_10_8", "incantations_9_6", "spirit_ashes_4_1", "armor_430", "incantations_9_3", "ashesofwar_5_8", "crystal_tears_2_1", "npc_quests_10_8", "talismans_2_4", "bosses_8_6", "bosses_9_9", "armor_283", "npc_quests_3_5", "weapons_23_2", "spirit_ashes_3_10", "talismans_7_8", "legendaries_1_1_0", "armor_557", "spirit_ashes_2_8", "quest_order_tldr_81", "weapons_13_3", "weapons_28_9", "armor_380", "npc_quests_12_1", "playthrough_4_15", "weapons_33_12", "legendaries_2_6", "weapons_29_16", "armor_259", "weapons_34_12", "weapons_32_4", "cookbooks_8_2", "weapons_20_3", "quest_order_tldr_123", "armor_245", "ashesofwar_5_13", "quest_order_tldr_132", "armor_476", "ancient_dragon_smithing_stones_14", "weapons_33_24", "memory_stones_talisman_pouches_0_1", "weapons_34_6", "npc_quests_9_2", "bosses_7_27", "weapons_34_25", "legacy_1_6", "bosses_9_6", "armor_140", "talismans_10_1", "weapons_17_7", "ashesofwar_6_2", "incantations_4_2", "quest_order_tldr_202", "armor_226", "bosses_8_5", "legacy_1_14", "cookbooks_1_14", "weapons_33_9", "sorceries_6_1", "caves_1_7", "playthrough_2_2", "legendaries_1_6", "weapons_29_8", "incantations_5_12", "playthrough_3_1", "bell_bearings_2_3", "sorceries_8_1", "weapons_13_2", "weapons_11_4", "cookbooks_1_8", "armor_15", "remembrances_mausoleums_1_1_1", "crystal_tears_2_3", "weapons_19_10", "crystal_tears_4_3", "incantations_5_4", "quest_order_tldr_161", "sorceries_5_1", "incantations_6_1", "ancient_dragon_smithing_stones_7", "talismans_4_4", "quest_order_tldr_97", "playthrough_9_1", "weapons_32_17", "armor_293", "weapons_17_4", "ashesofwar_8_8", "npc_quests_34_7", "weapons_25_6", "armor_185", "armor_29", "weapons_21_5", "bosses_5_9", "weapons_6_13", "spirit_ashes_3_7", "npc_quests_2_3", "bosses_8_9", "bosses_4_11", "paintings_3_1", "caves_5_6", "playthrough_5_5", "talismans_6_10", "spirit_ashes_1_2", "caves_2_6", "armor_261", "weapons_22_2", "caves_0_1", "npc_quests_3_3", "npc_quests_26_7_2", "npc_quests_32_5", "ashesofwar_13_9", "pots_bottles_1_14", "sorceries_12_3", "achievements_1_6", "remembrances_mausoleums_1_2_1", "quest_order_tldr_183", "playthrough_4_4", "bell_bearings_1_1", "gestures_0_6", "npc_quests_34_4", "armor_231", "illusory_walls_1_8", "cookbooks_5_8", "illusory_walls_6_3", "spirit_ashes_7_4", "illusory_walls_5_1", "incantations_4_10", "pots_bottles_1_19", "weapons_10_7", "npc_quests_17_8", "bosses_4_23", "dragon_hearts_death_roots_1_1", "quest_order_tldr_148", "playthrough_7_1", "weapons_16_2", "playthrough_14_2", "sorceries_9_4", "npc_quests_19_4", "ashesofwar_5_2", "armor_27", "weapons_29_7", "armor_478", "caves_4_1", "cookbooks_5_3", "npc_quests_20_4", "incantations_10_2", "weapons_17_6", "npc_quests_29_1", "armor_473", "ashesofwar_6_7", "bosses_6_15", "talismans_9_1", "talismans_10_2", "npc_quests_23_1", "bosses_9_1", "talismans_10_7", "armor_131", "ancient_dragon_smithing_stones_17", "weapons_8_7", "quest_order_tldr_241", "flasks_1_3", "armor_552", "ashesofwar_13_7", "dragon_hearts_death_roots_1_5", "sorceries_9_2", "npc_quests_6_1", "talismans_15_1", "weapons_10_1", "sorceries_4_29", "talismans_4_20", "incantations_3_9", "caves_1_9", "weapons_31_4", "npc_quests_31_19", "quest_order_tldr_213", "quest_order_tldr_33", "incantations_7_4", "playthrough_13_6", "armor_137", "pots_bottles_2_6", "weapons_10_6", "npc_quests_9_1", "playthrough_16_1", "weapons_25_9", "talismans_4_18", "flasks_1_14", "bosses_2_1", "npc_quests_26_5", "armor_346", "npc_quests_32_4", "playthrough_17_4", "armor_376", "bosses_2_29", "quest_order_tldr_83", "ancient_dragon_smithing_stones_3", "armor_9", "quest_order_tldr_175", "armor_51", "sorceries_10_2", "weapons_34_23", "bosses_9_11", "weapons_14_3", "npc_quests_21_6", "incantations_9_4", "talismans_1_2", "incantations_10_7", "crystal_tears_6_1", "quest_order_tldr_32", "armor_331", "quest_order_tldr_182", "weapons_3_12", "armor_414", "gestures_3_1", "quest_order_tldr_38", "npc_quests_30_1", "bosses_2_22", "armor_265", "npc_quests_1_2", "bosses_7_3", "quest_order_tldr_72", "spirit_ashes_13_1", "playthrough_3_4", "playthrough_8_8", "quest_order_tldr_138", "npc_quests_17_6", "weapons_32_13", "scrolls_prayerbooks_1_8", "npc_quests_18_2", "npc_quests_31_10_1", "armor_0", "talismans_7_6", "quest_order_tldr_16", "legendaries_5_2", "caves_8_1", "npc_quests_10_4", "incantations_2_3", "armor_541", "playthrough_13_2", "dragon_hearts_death_roots_1_3", "weapons_10_2", "bosses_10_7", "armor_5", "talismans_3_1", "cookbooks_1_5", "talismans_4_5", "armor_182", "pots_bottles_1_11", "quest_order_tldr_219", "ashesofwar_3_3", "npc_quests_15_5", "gestures_4_2", "npc_quests_11_1", "incantations_7_2", "armor_241", "armor_367", "cookbooks_8_1", "playthrough_8_4", "incantations_1_3", "quest_order_tldr_14", "incantations_3_7", "quest_order_tldr_185", "quest_order_tldr_215", "npc_quests_31_20_2", "bosses_4_15", "remembrances_mausoleums_1_14_2", "pots_bottles_3_1", "weapons_13_18", "remembrances_mausoleums_1_11", "weapons_34_24", "npc_quests_28_3", "quest_order_tldr_7", "weapons_14_8", "playthrough_1_13", "armor_332", "weapons_1_8", "armor_366", "npc_quests_20_5_2", "quest_order_tldr_228", "flasks_2_12", "quest_order_tldr_178", "npc_quests_1_1", "legendaries_5_1", "illusory_walls_1_7", "quest_order_tldr_257", "armor_263", "legacy_1_5", "armor_559", "caves_3_6", "playthrough_10_5", "armor_359", "flasks_1_28", "weapons_25_13", "incantations_6_4", "armor_382", "gestures_1_8", "weapons_3_8", "armor_350", "weapons_5_11", "talismans_4_7", "weapons_7_6", "weapons_13_4", "armor_193", "armor_411", "npc_quests_17_7", "bosses_2_15", "evergaols_2_4", "playthrough_4_9", "armor_452", "bosses_8_11", "achievements_2_15", "armor_299", "gestures_2_4", "npc_quests_21_1", "whetstones_0_6", "caves_6_2", "armor_142", "cookbooks_8_4", "playthrough_17_5", "armor_126", "spirit_ashes_4_4", "memory_stones_talisman_pouches_0_7", "armor_120", "incantations_11_3", "sorceries_1_6", "ashesofwar_10_1", "legacy_1_1", "npc_quests_29_7", "armor_341", "armor_108", "quest_order_tldr_179", "armor_311", "talismans_2_2", "armor_404", "bosses_6_16", "flasks_1_18", "npc_quests_23_2", "incantations_3_10", "gestures_0_4", "armor_424", "npc_quests_3_4", "quest_order_tldr_22", "playthrough_4_12", "armor_291", "bosses_4_1", "playthrough_12_3", "quest_order_tldr_140", "incantations_7_1", "cookbooks_1_24", "bell_bearings_2_5", "bosses_8_7", "quest_order_tldr_186", "armor_292", "incantations_12_12", "gestures_1_5", "weapons_14_18", "armor_354", "gestures_6_1", "armor_561", "quest_order_tldr_188", "bosses_4_18", "armor_217", "talismans_2_8", "quest_order_tldr_231", "npc_quests_34_5", "legendaries_4_1", "talismans_8_6", "quest_order_tldr_50", "npc_quests_19_10", "bosses_6_6", "weapons_33_23", "armor_196", "talismans_2_10", "npc_quests_6_3", "playthrough_7_3", "quest_order_tldr_58", "incantations_8_1", "gestures_2_3", "ashesofwar_11_12", "weapons_23_16", "armor_203", "ashesofwar_13_2", "npc_quests_3_6", "talismans_9_3", "armor_272", "armor_158", "bosses_5_22", "ancient_dragon_smithing_stones_8", "caves_3_2", "caves_2_4", "sorceries_4_5", "armor_532", "quest_order_tldr_55_1", "caves_5_5", "playthrough_9_5", "paintings_1", "playthrough_10_8", "pots_bottles_1_2", "paintings_5_1", "spirit_ashes_2_4", "cookbooks_1_9", "weapons_9_3", "npc_quests_12_4", "cookbooks_5_1", "flasks_1_37", "achievements_4_2", "ashesofwar_9_2", "crystal_tears_7_1", "armor_52", "great_runes_2_2", "illusory_walls_2_2", "armor_57", "ashesofwar_5_9", "flasks_2_11", "bosses_7_25", "weapons_4_4", "quest_order_tldr_194", "npc_quests_31_10", "weapons_22_3", "cookbooks_3_6", "playthrough_4_8", "playthrough_1_11", "armor_202", "cookbooks_1_4", "npc_quests_12_6", "quest_order_tldr_210", "spirit_ashes_3_4", "crystal_tears_1_3", "weapons_12_2", "npc_quests_20_1", "flasks_1_24", "armor_512", "gestures_6_3", "bosses_4_3", "npc_quests_27_4", "quest_order_tldr_200", "quest_order_tldr_127", "pots_bottles_3_9", "evergaols_2_2", "whetstones_0_1", "quest_order_tldr_162", "playthrough_12_9", "bosses_4_14", "quest_order_tldr_128", "quest_order_tldr_181", "quest_order_tldr_131", "weapons_14_2", "armor_48", "armor_306", "npc_quests_2_4", "armor_266", "illusory_walls_1_6", "talismans_2_9", "armor_4", "remembrances_mausoleums_1_8_1", "remembrances_mausoleums_1_14", "npc_quests_26_7", "talismans_4_2", "npc_quests_19_7", "bosses_4_36", "legendaries_1_1", "bosses_18_3", "weapons_32_16", "armor_20", "scrolls_prayerbooks_0_2", "scrolls_prayerbooks_1_6", "playthrough_13_5", "cookbooks_1_7", "crystal_tears_2_5", "bosses_11_2", "weapons_8_6", "crystal_tears_0_1", "weapons_28_7", "talismans_5_13", "flasks_1_33", "armor_444", "npc_quests_27_5", "armor_251", "armor_117", "sorceries_12_4", "npc_quests_31_9", "armor_305", "bosses_4_21", "talismans_7_9", "quest_order_tldr_114", "bosses_2_21", "remembrances_mausoleums_2_5", "bosses_4_26", "illusory_walls_6_2", "playthrough_8_3", "playthrough_12_10", "armor_466", "talismans_1_1", "npc_quests_26_7_1", "weapons_33_8", "playthrough_1_6", "armor_344", "weapons_9_5", "quest_order_tldr_136", "armor_12", "npc_quests_10_7", "incantations_7_6", "quest_order_tldr_80", "ashesofwar_11_2", "npc_quests_10_2", "armor_125", "armor_295", "npc_quests_7_8", "whetstones_0_4", "quest_order_tldr_99", "armor_200", "armor_500", "npc_quests_17_4", "armor_551", "armor_454", "caves_1_5", "weapons_6_5", "weapons_28_1", "ashesofwar_4_2", "quest_order_tldr_3", "weapons_3_6", "sorceries_4_28", "quest_order_tldr_47", "flasks_2_7", "weapons_1_10", "weapons_8_4", "caves_2_8", "gestures_0_1", "cookbooks_1_23", "pots_bottles_2_10", "talismans_5_11", "crystal_tears_6_2", "armor_304", "weapons_5_9", "armor_212", "talismans_2_5", "legendaries_3_3", "talismans_5_4", "quest_order_tldr_164", "bosses_1_1", "weapons_33_3", "weapons_29_10", "sorceries_1_5", "armor_22", "npc_quests_4_2", "armor_537", "quest_order_tldr_8", "spirit_ashes_3_14", "ancient_dragon_smithing_stones_4", "npc_quests_7_2", "talismans_18_1", "bosses_3_2", "incantations_5_11", "sorceries_7_2", "memory_stones_talisman_pouches_0_6", "sorceries_5_3", "cookbooks_3_3", "npc_quests_33_2", "armor_11", "memory_stones_talisman_pouches_1_3", "npc_quests_19_5", "weapons_27_1", "bosses_7_10", "weapons_24_2", "weapons_32_7", "armor_98", "armor_329", "bell_bearings_3_2", "quest_order_tldr_155", "ancient_dragon_smithing_stones_20", "bosses_10_11", "ancient_dragon_smithing_stones_15", "armor_324", "armor_519", "armor_267", "npc_quests_17_10", "npc_quests_34_3", "weapons_19_9", "weapons_15_6", "sorceries_8_8", "npc_quests_19_3", "bosses_6_4", "armor_156", "bosses_4_13", "bosses_1_3", "quest_order_tldr_207", "npc_quests_24_2", "sorceries_4_17", "remembrances_mausoleums_1_9_1", "caves_1_1", "armor_436", "quest_order_tldr_149", "bosses_10_13", "armor_417", "quest_order_tldr_173", "armor_445", "npc_quests_34_2", "armor_45", "remembrances_mausoleums_1_10_1", "weapons_28_5", "npc_quests_28_1", "weapons_34_18", "cookbooks_5_4", "armor_55", "legendaries_5_3", "sorceries_3_1", "bosses_4_19", "armor_390", "npc_quests_31_4", "spirit_ashes_3_16", "remembrances_mausoleums_1_9", "bosses_1_6", "flasks_1_43", "playthrough_5_8", "crystal_tears_3_4", "armor_484", "bosses_17_2", "quest_order_tldr_66_2", "bosses_5_28", "pots_bottles_1_4", "armor_429", "sorceries_4_24", "gestures_7_1", "armor_483", "weapons_3_13", "armor_258", "armor_560", "playthrough_16_2", "bosses_2_24", "bosses_2_17", "flasks_1_11", "quest_order_tldr_36", "armor_144", "incantations_12_7", "talismans_2_12", "quest_order_tldr_204", "remembrances_mausoleums_1_1", "armor_187", "armor_455", "armor_225", "weapons_27_2", "weapons_23_3", "weapons_20_4", "quest_order_tldr_235", "incantations_4_8", "quest_order_tldr_158", "ashesofwar_12_2", "bosses_5_24", "flasks_2_6", "npc_quests_16_2", "achievements_3_4", "playthrough_8_6", "cookbooks_1_11", "armor_475", "armor_150", "weapons_10_4", "ashesofwar_12_11", "dragon_hearts_death_roots_1_8", "incantations_1_2", "playthrough_14_3", "npc_quests_29_4", "bosses_4_10", "bosses_1_11", "quest_order_tldr_259", "playthrough_14_7", "legacy_1_15", "caves_8_2", "ashesofwar_12_10", "legendaries_1_9", "spirit_ashes_3_17", "bosses_1_7", "spirit_ashes_2_3", "armor_565", "weapons_22_15", "armor_134", "quest_order_tldr_92", "pots_bottles_1_15", "ashesofwar_9_1", "bosses_8_18", "armor_526", "armor_138", "quest_order_tldr_240", "npc_quests_34_1", "achievements_2_20", "sorceries_13_1", "weapons_18_3", "weapons_22_14", "bosses_4_30", "quest_order_tldr_121", "weapons_6_4", "sorceries_1_3", "quest_order_tldr_247", "incantations_4_3", "remembrances_mausoleums_1_8", "npc_quests_10_6", "ashesofwar_4_1", "weapons_19_2", "playthrough_18_1", "armor_213", "ashesofwar_11_6", "playthrough_12_1", "weapons_24_6", "ashesofwar_7_2", "playthrough_12_4", "incantations_4_12", "incantations_6_2", "weapons_3_9", "playthrough_3_5", "quest_order_tldr_113", "cookbooks_1_21", "quest_order_tldr_120", "bosses_5_13", "weapons_21_2", "weapons_26_2", "quest_order_tldr_206", "incantations_3_13", "npc_quests_19_3_3", "incantations_4_11", "armor_50", "spirit_ashes_6_1", "pots_bottles_2_2", "weapons_19_8", "sorceries_6_7", "dragon_hearts_death_roots_0_8", "weapons_9_14", "talismans_4_14", "caves_7_1", "quest_order_tldr_65", "armor_460", "incantations_4_1", "sorceries_1_10", "npc_quests_1_3", "npc_quests_15_3", "pots_bottles_3_4", "legendaries_1_7", "weapons_32_10", "quest_order_tldr_52", "armor_208", "bosses_10_9", "weapons_29_17", "quest_order_tldr_221", "cookbooks_3_1", "talismans_14_1", "incantations_10_9", "playthrough_8_9", "playthrough_14_4", "achievements_1_2", "armor_318", "bosses_6_13", "caves_1_8", "armor_352", "armor_178", "armor_506", "incantations_10_3", "playthrough_14_9", "weapons_20_6", "armor_381", "caves_0_4", "spirit_ashes_5_3", "armor_172", "weapons_22_6", "armor_545", "achievements_2_10", "sorceries_4_18", "achievements_3_9", "bosses_2_3", "incantations_3_8", "caves_3_7", "weapons_14_16", "armor_556", "weapons_14_1", "talismans_4_15", "talismans_9_2", "armor_35", "remembrances_mausoleums_1_5", "great_runes_2_1", "npc_quests_22_5", "weapons_29_6", "playthrough_5_6", "talismans_6_9", "ashesofwar_1_3", "bosses_2_30", "quest_order_tldr_96", "weapons_18_6", "sorceries_4_23", "sorceries_4_1", "crystal_tears_4_1", "weapons_27_3", "ashesofwar_5_1", "quest_order_tldr_187", "armor_313", "bosses_7_15", "armor_14", "incantations_12_9", "sorceries_4_16", "npc_quests_22_4", "ashesofwar_5_11", "ancient_dragon_smithing_stones_13", "spirit_ashes_14_1", "quest_order_tldr_205", "npc_quests_25_2", "weapons_22_5", "quest_order_tldr_242", "weapons_13_6", "achievements_2_5", "bosses_5_6", "bosses_5_26", "spirit_ashes_4_8", "talismans_6_5", "quest_order_tldr_69", "playthrough_16_4", "armor_327", "armor_244", "weapons_18_2", "bosses_13_1", "armor_255", "ashesofwar_2_1", "sorceries_9_6", "npc_quests_17_4_1", "weapons_7_2", "bosses_17_1", "armor_31", "bosses_7_19", "armor_538", "armor_576", "caves_1_10", "weapons_15_2", "armor_73", "dragon_hearts_death_roots_0_13", "weapons_33_17", "paintings_4_1", "bosses_12_1", "incantations_2_1", "quest_order_tldr_141", "gestures_1_4", "armor_84", "weapons_25_4", "armor_364", "npc_quests_31_15", "armor_130", "achievements_2_16", "weapons_10_3", "flasks_1_39", "armor_574", "armor_118", "sorceries_8_2", "bosses_9_12", "weapons_8_2", "armor_170", "armor_393", "weapons_1_6", "quest_order_tldr_34", "armor_214", "playthrough_1_3", "bosses_6_3", "quest_order_tldr_115", "armor_422", "dragon_hearts_death_roots_1_9", "spirit_ashes_7_5", "playthrough_17_7", "weapons_6_15", "bosses_4_40", "bosses_5_20", "crystal_tears_4_2", "bosses_4_17", "caves_1_2", "caves_4_3", "weapons_3_5", "weapons_25_16", "evergaols_3_1", "playthrough_16_3", "talismans_7_5", "dragon_hearts_death_roots_0_10", "quest_order_tldr_103", "weapons_1_13", "spirit_ashes_3_5", "bell_bearings_1_4", "npc_quests_14_1", "remembrances_mausoleums_2_1", "talismans_5_3", "armor_93", "incantations_3_3", "incantations_7_9", "caves_6_3", "weapons_14_7", "armor_491", "caves_5_2", "armor_18", "weapons_32_12", "armor_46", "armor_180", "incantations_3_1", "sorceries_8_9", "ashesofwar_8_3", "armor_166", "legacy_1_10", "gestures_1_7", "npc_quests_22_7", "talismans_2_7", "bosses_1_10", "armor_64", "npc_quests_7_4", "armor_237", "armor_405", "weapons_13_15", "memory_stones_talisman_pouches_0_2", "npc_quests_30_4", "caves_0_2", "armor_97", "armor_575", "quest_order_tldr_229", "weapons_26_3", "bosses_8_17", "sorceries_1_9", "weapons_5_5", "quest_order_tldr_91", "great_runes_1_7", "npc_quests_16_3", "spirit_ashes_3_1", "weapons_29_13", "dragon_hearts_death_roots_0_12", "weapons_30_1", "paintings_1_2", "weapons_15_3", "legendaries_2_1", "quest_order_tldr_243", "quest_order_tldr_151", "weapons_13_7", "armor_95", "armor_238", "ashesofwar_8_1", "legendaries_1_5", "flasks_2_9", "armor_19", "flasks_1_32", "armor_568", "npc_quests_31_7", "talismans_2_17", "playthrough_4_13", "talismans_6_11", "armor_191", "armor_53", "npc_quests_21_4", "weapons_31_6", "crystal_tears_1_1", "quest_order_tldr_209", "cookbooks_3_7", "remembrances_mausoleums_1_6", "armor_317", "npc_quests_31_13", "quest_order_tldr_167", "playthrough_10_1", "armor_149", "spirit_ashes_10_1", "weapons_6_7", "flasks_1_17", "spirit_ashes_8_1", "weapons_15_1", "npc_quests_7_7", "npc_quests_1_7", "npc_quests_8_3", "armor_58", "armor_54", "npc_quests_24_1", "ashesofwar_13_3", "armor_315", "quest_order_tldr_224", "gestures_4_4", "legacy_1_12", "achievements_2_9", "armor_210", "sorceries_6_6", "playthrough_17_6", "quest_order_tldr_71", "bosses_7_8", "cookbooks_3_2", "armor_163", "weapons_14_5", "talismans_1_5", "weapons_25_14", "weapons_33_19", "weapons_23_1", "npc_quests_11_5", "bosses_6_9", "ashesofwar_6_8", "quest_order_tldr_21", "weapons_3_14", "armor_307", "quest_order_tldr_41", "npc_quests_7_1", "armor_555", "incantations_3_2", "crystal_tears_2_2", "sorceries_4_6", "ashesofwar_11_7", "weapons_29_12", "npc_quests_28_4", "weapons_3_3", "ashesofwar_8_7", "sorceries_12_1", "quest_order_tldr_2", "bosses_9_8", "ashesofwar_7_1", "armor_282", "armor_489", "bosses_8_3", "weapons_18_4", "weapons_5_3", "weapons_14_20", "remembrances_mausoleums_1_13_2", "ashesofwar_8_2", "flasks_2_3", "sorceries_4_21", "bosses_9_10", "weapons_34_2", "armor_297", "npc_quests_33_3", "flasks_1_16", "quest_order_tldr_57", "incantations_8_3", "playthrough_7_5", "gestures_0_11", "armor_486", "sorceries_4_7", "gestures_0_2", "armor_497", "playthrough_1_4", "playthrough_4_1", "armor_143", "quest_order_tldr_133", "armor_502", "ashesofwar_8_5", "quest_order_tldr_61", "quest_order_tldr_135", "weapons_5_8", "armor_76", "weapons_23_15", "npc_quests_29_10", "armor_162", "armor_215", "bosses_9_5", "bosses_1_8", "pots_bottles_3_5", "npc_quests_20_7", "weapons_20_5", "weapons_33_26", "remembrances_mausoleums_1_10", "spirit_ashes_1_3", "bell_bearings_4_1", "armor_558", "weapons_20_10", "npc_quests_27_3", "legendaries_1_3", "armor_276", "armor_434", "bell_bearings_2_4", "armor_542", "spirit_ashes_3_8", "weapons_29_14", "armor_492", "quest_order_tldr_146", "bosses_11_3", "incantations_12_8", "playthrough_4_5", "weapons_34_4", "armor_372", "paintings_3", "flasks_1_4", "npc_quests_27_2", "achievements_2_1", "legacy_1_8", "incantations_5_3", "spirit_ashes_3_12", "playthrough_5_9", "quest_order_tldr_220", "quest_order_tldr_98", "incantations_4_4", "pots_bottles_3_8", "illusory_walls_3_3", "gestures_0_8", "gestures_3_6", "caves_4_4", "quest_order_tldr_75", "incantations_4_6", "paintings_2_1", "bosses_10_2", "bosses_2_10", "npc_quests_31_1", "evergaols_2_3", "talismans_19_1", "armor_296", "npc_quests_17_3", "bosses_4_12", "npc_quests_29_2", "remembrances_mausoleums_1_3_1", "playthrough_8_5", "quest_order_tldr_168", "cookbooks_1_20", "weapons_34_3", "sorceries_4_19", "great_runes_2_3", "quest_order_tldr_87", "npc_quests_16_1", "armor_337", "armor_546", "talismans_11_2", "incantations_12_2", "bosses_8_2", "weapons_7_5", "quest_order_tldr_109", "quest_order_tldr_139", "bosses_5_4", "armor_325", "illusory_walls_1_9", "bosses_2_4", "armor_80", "armor_401", "weapons_9_4", "sorceries_4_11", "quest_order_tldr_171", "achievements_2_17", "bosses_2_25", "armor_370", "talismans_4_8", "armor_188", "weapons_1_11", "cookbooks_6_1", "quest_order_tldr_78", "npc_quests_18_3", "flasks_1_31", "sorceries_9_3", "bosses_10_5", "bosses_4_4", "armor_308", "quest_order_tldr_170", "bosses_5_5", "npc_quests_20_2", "incantations_7_8", "weapons_25_7", "ashesofwar_8_10", "weapons_10_5", "incantations_3_6", "talismans_7_1", "ashesofwar_5_12", "weapons_6_8", "playthrough_9_6", "quest_order_tldr_1", "ashesofwar_9_4", "playthrough_17_1", "great_runes_1_1", "armor_470", "sorceries_12_5", "weapons_33_15", "talismans_4_6", "talismans_9_5", "paintings_2", "npc_quests_8_2", "ashesofwar_13_11", "cookbooks_1_15", "armor_139", "quest_order_tldr_193", "npc_quests_18_1", "cookbooks_2_4", "weapons_13_9", "talismans_4_9", "armor_176", "cookbooks_1_16", "weapons_7_4", "armor_407", "achievements_1_3", "bosses_7_23", "dragon_hearts_death_roots_0_7", "weapons_29_9", "ancient_dragon_smithing_stones_9", "spirit_ashes_9_2", "npc_quests_25_1", "weapons_30_8", "armor_224", "weapons_13_16", "weapons_17_5", "caves_7_2", "ashesofwar_12_8", "armor_109", "npc_quests_14_3", "quest_order_tldr_56", "talismans_10_6", "incantations_12_5", "talismans_3_4", "armor_68", "npc_quests_22_6", "playthrough_13_3", "npc_quests_3_8", "incantations_5_2", "weapons_25_3", "armor_71", "weapons_6_1", "bosses_16_2", "dragon_hearts_death_roots_0_4", "quest_order_tldr_261", "crystal_tears_3_1", "npc_quests_12_5_1", "achievements_3_1", "ancient_dragon_smithing_stones_10", "npc_quests_31_18", "talismans_8_2", "bosses_4_2", "armor_13", "armor_547", "armor_472", "talismans_7_2", "armor_92", "armor_427", "quest_order_tldr_66", "armor_439", "weapons_32_8", "talismans_5_5", "ancient_dragon_smithing_stones_12", "quest_order_tldr_184", "quest_order_tldr_250", "quest_order_tldr_105", "quest_order_tldr_51", "spirit_ashes_2_6", "npc_quests_5_3", "playthrough_14_6", "quest_order_tldr_253", "quest_order_tldr_74", "npc_quests_31_11", "playthrough_1_10", "quest_order_tldr_25", "weapons_32_3", "armor_206", "spirit_ashes_6_4", "bosses_18_2", "bosses_5_15", "incantations_8_5", "npc_quests_22_1", "weapons_11_5", "caves_2_2", "caves_2_1", "armor_562", "armor_192", "talismans_2_14", "flasks_1_27", "weapons_24_1", "spirit_ashes_4_5", "armor_362", "weapons_22_13", "gestures_5_1", "gestures_6_2", "armor_387", "bosses_8_13", "armor_482", "incantations_1_1", "quest_order_tldr_40", "talismans_8_4", "scrolls_prayerbooks_1_5", "bosses_8_14", "cookbooks_1_17", "armor_74", "achievements_1_5", "armor_400", "bosses_6_14", "quest_order_tldr_28", "armor_174", "playthrough_4_10", "bosses_10_1", "armor_294", "quest_order_tldr_249", "spirit_ashes_14_2", "ashesofwar_6_5", "bosses_4_37", "weapons_3_16", "cookbooks_1_10", "weapons_1_12", "playthrough_12_8", "bosses_10_6", "armor_386", "legendaries_3_2", "bosses_7_4", "crystal_tears_8_1", "playthrough_10_4", "incantations_11_2", "bosses_14_1", "remembrances_mausoleums_1_4", "dragon_hearts_death_roots_0_5", "weapons_9_9", "armor_136", "bosses_4_27", "armor_42", "achievements_3_8", "armor_465", "armor_290", "weapons_8_1", "weapons_22_7", "pots_bottles_3_7", "weapons_13_8", "spirit_ashes_4_3", "quest_order_tldr_45", "armor_353", "armor_3", "npc_quests_2_1", "quest_order_tldr_60", "npc_quests_33_4", "npc_quests_34_6", "bosses_10_4", "scrolls_prayerbooks_1_3", "armor_246", "pots_bottles_3_6", "bosses_4_9", "weapons_17_3", "playthrough_1_7", "quest_order_tldr_214", "npc_quests_4_3", "quest_order_tldr_153", "npc_quests_26_1", "dragon_hearts_death_roots_1_6", "armor_227", "incantations_7_5", "playthrough_9_8", "npc_quests_17_1", "cookbooks_8_3", "armor_379", "ashesofwar_3_2", "sorceries_2_1", "weapons_6_10", "remembrances_mausoleums_1_5_2", "armor_16", "quest_order_tldr_129", "legendaries_1_4", "armor_248", "npc_quests_11_4", "ashesofwar_13_5", "legendaries_2_5", "cookbooks_1_2", "talismans_6_1", "weapons_31_2", "armor_320", "armor_456", "armor_60", "armor_107", "whetstones_0_5", "npc_quests_15_1", "bosses_6_11", "bosses_18_4", "armor_543", "weapons_34_5", "playthrough_11_3", "armor_44", "weapons_20_13", "npc_quests_29_3_1", "armor_360", "armor_406", "incantations_7_7", "incantations_9_5", "gestures_3_5", "sorceries_6_5", "npc_quests_12_2", "weapons_29_1", "spirit_ashes_7_1", "remembrances_mausoleums_2_6", "cookbooks_2_5", "npc_quests_32_8", "weapons_1_3", "armor_233", "sorceries_8_7", "crystal_tears_0_3", "quest_order_tldr_6", "quest_order_tldr_79", "bosses_2_6", "weapons_14_13", "pots_bottles_1_12", "remembrances_mausoleums_1_11_2", "weapons_7_1", "ancient_dragon_smithing_stones_21", "flasks_2_4", "talismans_11_3", "armor_394", "remembrances_mausoleums_1_4_2", "bosses_12_3", "npc_quests_32_7", "ashesofwar_1_1", "memory_stones_talisman_pouches_1_1", "armor_441", "sorceries_10_3", "armor_553", "weapons_33_6", "ashesofwar_6_4", "bosses_4_38", "armor_112", "armor_199", "legendaries_1_1_1", "ashesofwar_11_1", "playthrough_2_4", "armor_328", "weapons_33_11", "bosses_7_12", "weapons_33_20", "pots_bottles_2_8", "bosses_6_10", "pots_bottles_3_2", "gestures_0_5", "bosses_7_5", "weapons_30_2", "quest_order_tldr_37", "quest_order_tldr_189", "weapons_5_7", "ashesofwar_5_10", "weapons_33_13", "flasks_1_22", "armor_569", "quest_order_tldr_157", "bosses_6_8", "talismans_6_8", "armor_85", "npc_quests_4_4", "crystal_tears_1_4", "playthrough_6_1", "bosses_2_20", "bosses_14_2", "armor_49", "weapons_23_10", "quest_order_tldr_43", "armor_77", "cookbooks_1_19", "npc_quests_32_1", "spirit_ashes_12_2", "pots_bottles_3_10", "bosses_5_8", "remembrances_mausoleums_1_13", "armor_132", "bosses_2_13", "armor_326", "legendaries_1_2", "bosses_9_15", "incantations_2_4", "flasks_1_38", "talismans_4_10", "quest_order_tldr_10", "sorceries_4_13", "npc_quests_29_3", "bosses_9_7", "flasks_1_2", "achievements_3_6", "armor_548", "remembrances_mausoleums_1_5_1", "gestures_1_10", "bosses_5_1", "weapons_25_11", "bosses_4_25", "armor_310", "armor_209", "flasks_1_30", "playthrough_5_7", "sorceries_1_7", "quest_order_tldr_70", "armor_256", "armor_101", "bosses_9_3", "quest_order_tldr_100", "weapons_29_18", "talismans_2_19", "armor_153", "achievements_4_3", "pots_bottles_1_18", "armor_161", "armor_169", "sorceries_4_26", "weapons_13_5", "armor_286", "weapons_28_2", "achievements_2_23", "weapons_17_8", "armor_75", "quest_order_tldr_156", "illusory_walls_4_2", "armor_232", "flasks_1_13", "weapons_5_1", "crystal_tears_3_3", "talismans_2_11", "ashesofwar_6_10", "armor_234", "spirit_ashes_9_3", "weapons_12_3", "ashesofwar_11_10", "great_runes_1_5", "cookbooks_2_7", "incantations_10_4", "incantations_12_3", "armor_377", "playthrough_5_3", "talismans_5_10", "playthrough_17_3", "weapons_13_12", "quest_order_tldr_130", "playthrough_15_2", "armor_527", "npc_quests_27_6", "npc_quests_20_8", "gestures_7_2", "flasks_1_20", "flasks_1_42", "weapons_23_9", "armor_32", "quest_order_tldr_263", "quest_order_tldr_62", "weapons_4_1", "spirit_ashes_3_11", "armor_39", "incantations_1_6", "armor_504", "spirit_ashes_3_3", "flasks_2_5", "quest_order_tldr_197", "armor_1", "caves_3_4", "cookbooks_6_2", "npc_quests_32_3", "armor_61", "spirit_ashes_4_7", "achievements_3_7", "weapons_4_3", "weapons_2_2", "quest_order_tldr_190", "remembrances_mausoleums_1_15_2", "playthrough_11_2", "weapons_24_3", "armor_148", "weapons_20_15", "quest_order_tldr_195", "bosses_4_32", "gestures_6_4", "armor_239", "ashesofwar_13_12", "npc_quests_11_3", "incantations_6_3", "sorceries_4_8", "remembrances_mausoleums_1_7_2", "dragon_hearts_death_roots_1_4", "bosses_4_24", "bosses_13_2", "flasks_1_41", "armor_440", "armor_509", "achievements_2_24", "incantations_5_9", "cookbooks_1_22", "playthrough_4_11", "armor_195", "bosses_9_13", "armor_201", "quest_order_tldr_223", "bosses_4_16", "weapons_29_11", "achievements_4_1", "legacy_1_3", "weapons_22_4", "illusory_walls_1_4", "bosses_2_11", "armor_270", "bosses_2_19", "npc_quests_31_20", "armor_289", "npc_quests_29_9", "incantations_3_14", "incantations_11_4", "weapons_33_7", "legendaries_2_8", "crystal_tears_1_2", "weapons_8_5", "sorceries_1_8", "crystal_tears_0_2", "weapons_25_2", "weapons_6_12", "armor_375", "talismans_6_6", "armor_257", "weapons_31_3", "armor_127", "cookbooks_1_18", "weapons_14_11", "ashesofwar_13_1", "weapons_19_5", "scrolls_prayerbooks_0_1", "remembrances_mausoleums_1_3", "bosses_11_6", "evergaols_2_1", "armor_59", "pots_bottles_1_7", "achievements_3_5", "incantations_5_1", "npc_quests_22_8", "armor_86", "achievements_1_1", "bell_bearings_3_1", "scrolls_prayerbooks_0_3", "pots_bottles_1_20", "armor_47", "armor_223", "npc_quests_12_5", "armor_426", "talismans_8_7", "weapons_22_11", "incantations_2_2", "incantations_12_15", "armor_550", "bosses_4_22", "npc_quests_27_7", "pots_bottles_3_3", "quest_order_tldr_35", "weapons_27_4", "weapons_16_4", "npc_quests_22_3", "incantations_10_5", "spirit_ashes_11_1", "quest_order_tldr_107", "quest_order_tldr_166", "armor_438", "achievements_2_7", "paintings_6", "bosses_10_3", "weapons_1_7", "incantations_4_9", "armor_133", "ashesofwar_8_4", "bosses_4_31", "npc_quests_20_5_1", "quest_order_tldr_260", "talismans_2_18", "cookbooks_2_2", "evergaols_1_1", "caves_0_3", "spirit_ashes_7_2", "npc_quests_19_3_2", "playthrough_12_5", "quest_order_tldr_5", "talismans_3_3", "weapons_13_13", "armor_355", "armor_333", "armor_260", "armor_155", "armor_160", "gestures_4_1", "bosses_5_23", "npc_quests_20_3", ]);
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
