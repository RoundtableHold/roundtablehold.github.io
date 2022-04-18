
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
        var all_ids = new Set(["quest_order_tldr_28", "ashesofwar_5_7", "weapons_20_3", "ashesofwar_8_4", "quest_order_tldr_187", "gestures_2_3", "quest_order_tldr_43", "achievements_4_1", "weapons_9_11", "armor_340", "bosses_2_1", "bosses_13_1", "incantations_3_3", "weapons_32_16", "ancient_dragon_smithing_stones_11", "weapons_34_12", "armor_59", "weapons_33_27", "playthrough_1_3", "armor_281", "bosses_1_2", "talismans_4_8", "quest_order_tldr_136", "quest_order_tldr_228", "weapons_27_3", "weapons_23_11", "crystal_tears_5_1", "armor_38", "quest_order_tldr_32", "weapons_33_5", "playthrough_9_2", "npc_quests_26_4", "memory_stones_talisman_pouches_1_1", "npc_quests_7_8", "npc_quests_19_10", "weapons_14_18", "quest_order_tldr_240", "bosses_5_13", "weapons_5_3", "spirit_ashes_3_8", "bosses_2_27", "spirit_ashes_4_8", "armor_84", "armor_113", "quest_order_tldr_227", "flasks_1_39", "bosses_7_12", "flasks_1_19", "sorceries_4_28_1", "cookbooks_2_7", "incantations_7_3", "weapons_9_8", "remembrances_mausoleums_1_2_2", "quest_order_tldr_10", "pots_bottles_3_8", "achievements_2_9", "playthrough_16_3", "caves_3_2", "legacy_1_10", "talismans_12_2", "spirit_ashes_1_2", "armor_495", "armor_369", "weapons_5_4", "talismans_3_4", "npc_quests_1_4", "weapons_17_3", "playthrough_7_4", "sorceries_4_27", "bosses_7_6", "quest_order_tldr_158", "armor_569", "playthrough_2_1", "quest_order_tldr_78", "weapons_9_7", "armor_454", "armor_135", "armor_253", "evergaols_3_1", "bosses_6_15", "playthrough_9_7", "armor_126", "quest_order_tldr_59", "armor_288", "armor_11", "armor_507", "npc_quests_15_5", "evergaols_1_2", "ashesofwar_12_10", "npc_quests_30_6", "gestures_1_10", "weapons_19_5", "spirit_ashes_9_1", "crystal_tears_0_2", "quest_order_tldr_112", "ashesofwar_12_1", "sorceries_4_23", "achievements_1_1", "playthrough_5_1", "incantations_4_7", "armor_199", "bell_bearings_3_3", "npc_quests_10_7", "spirit_ashes_3_6", "cookbooks_1_6", "bosses_4_1", "playthrough_10_8", "scrolls_prayerbooks_0_1", "gestures_6_2", "armor_494", "memory_stones_talisman_pouches_0_8", "weapons_25_9", "quest_order_tldr_188", "weapons_1_1", "armor_163", "talismans_1_3", "weapons_24_5", "ashesofwar_6_8", "playthrough_5_5", "npc_quests_28_2", "bosses_8_16", "armor_187", "npc_quests_7_4", "incantations_3_4", "flasks_1_33", "quest_order_tldr_89", "weapons_13_12", "armor_252", "illusory_walls_3_6", "ashesofwar_5_2", "spirit_ashes_2_1", "bosses_6_9", "npc_quests_23_5", "npc_quests_4_3", "bosses_5_9", "quest_order_tldr_210", "weapons_29_17", "sorceries_3_1", "whetstones_0_4", "weapons_19_6", "caves_3_5", "talismans_7_4", "armor_352", "spirit_ashes_3_11", "cookbooks_7_1", "weapons_25_5", "quest_order_tldr_152", "weapons_22_13", "armor_344", "remembrances_mausoleums_1_5", "talismans_3_1", "armor_497", "armor_239", "weapons_8_3", "spirit_ashes_7_3", "spirit_ashes_6_1", "weapons_6_2", "quest_order_tldr_67", "playthrough_18_1", "talismans_6_1", "weapons_8_2", "bosses_9_2", "armor_290", "weapons_9_12", "weapons_23_16", "cookbooks_2_6", "pots_bottles_1_13", "npc_quests_10_6", "achievements_1_2", "bosses_12_4", "npc_quests_13_1", "playthrough_10_1", "playthrough_10_2", "npc_quests_1_6", "flasks_1_36", "illusory_walls_3_2", "quest_order_tldr_139", "caves_0_2", "quest_order_tldr_47", "npc_quests_22_7", "armor_295", "bosses_6_8", "armor_171", "armor_404", "gestures_2_4", "talismans_6_3", "paintings_5_1", "gestures_4_2", "armor_207", "legendaries_2_7", "pots_bottles_1_9", "playthrough_4_10", "armor_532", "quest_order_tldr_218", "legendaries_2_3", "incantations_12_5", "cookbooks_4_2", "quest_order_tldr_38", "armor_167", "talismans_5_8", "npc_quests_31_5", "armor_292", "quest_order_tldr_22", "quest_order_tldr_91", "crystal_tears_4_3", "incantations_9_2", "spirit_ashes_4_6", "armor_150", "talismans_4_19", "incantations_12_12", "quest_order_tldr_115", "quest_order_tldr_235", "remembrances_mausoleums_1_2_1", "quest_order_tldr_231", "ashesofwar_12_2", "quest_order_tldr_110", "playthrough_5_6", "spirit_ashes_4_1", "npc_quests_31_9", "spirit_ashes_2_6", "armor_582", "weapons_28_1", "bosses_2_9", "bosses_7_15", "weapons_33_23", "remembrances_mausoleums_1_13", "quest_order_tldr_7", "weapons_20_7", "weapons_34_2", "armor_261", "npc_quests_7_2", "talismans_2_2", "npc_quests_27_7", "legendaries_4_4", "pots_bottles_2_4", "weapons_5_7", "npc_quests_14_2", "npc_quests_15_4", "bosses_10_12", "playthrough_4_13", "quest_order_tldr_64", "npc_quests_19_3_2", "weapons_14_5", "spirit_ashes_4_7", "playthrough_9_5", "armor_73", "achievements_2_7", "illusory_walls_6_3", "spirit_ashes_3_13", "incantations_10_8", "quest_order_tldr_197", "npc_quests_17_8", "armor_500", "bosses_10_1", "armor_240", "playthrough_13_7", "bosses_8_4", "bell_bearings_1_3", "npc_quests_7_3", "weapons_29_12", "bosses_6_2", "memory_stones_talisman_pouches_1_3", "quest_order_tldr_98", "armor_574", "armor_396", "spirit_ashes_6_2", "bosses_4_30", "armor_203", "cookbooks_1_5", "playthrough_8_5", "bosses_7_5", "bosses_5_29", "ashesofwar_12_11", "weapons_25_13", "incantations_12_8", "incantations_12_16", "weapons_9_3", "npc_quests_24_2", "weapons_27_4", "illusory_walls_1_4", "bosses_4_19", "weapons_13_17", "incantations_12_3", "armor_337", "weapons_13_5", "quest_order_tldr_9", "npc_quests_34_7", "armor_489", "quest_order_tldr_66", "weapons_21_1", "cookbooks_5_3", "weapons_34_4", "armor_524", "dragon_hearts_death_roots_0_10", "weapons_14_6", "remembrances_mausoleums_2_4", "armor_278", "npc_quests_11_2", "bosses_4_35", "illusory_walls_3_5", "armor_27", "weapons_9_2", "playthrough_14_7", "bosses_4_6", "legendaries_1_8", "armor_241", "remembrances_mausoleums_1_15_2", "scrolls_prayerbooks_1_7", "quest_order_tldr_174", "playthrough_1_1", "armor_577", "sorceries_4_7", "talismans_6_2", "pots_bottles_3_2", "armor_365", "talismans_4_14", "bosses_7_27", "weapons_29_9", "npc_quests_22_3", "bosses_1_3", "npc_quests_3_7_2", "incantations_9_5", "armor_370", "ashesofwar_7_3", "caves_2_1", "scrolls_prayerbooks_1_8", "talismans_9_2", "flasks_1_7", "armor_249", "armor_63", "cookbooks_4_3", "achievements_2_23", "npc_quests_8_6", "quest_order_tldr_114", "weapons_22_7", "incantations_5_8", "armor_147", "armor_156", "armor_192", "armor_560", "talismans_2_16", "armor_354", "armor_72", "armor_108", "weapons_9_6", "armor_75", "npc_quests_12_5_1", "legendaries_2_8", "armor_5", "legacy_1_12", "talismans_1_1", "armor_419", "flasks_1_10", "bosses_11_1", "ashesofwar_8_8", "memory_stones_talisman_pouches_0_7", "armor_473", "bosses_1_4", "npc_quests_29_8", "bosses_9_10", "npc_quests_31_6", "bosses_15_3", "ashesofwar_13_2", "incantations_12_14", "ancient_dragon_smithing_stones_13", "caves_3_3", "quest_order_tldr_196", "armor_272", "weapons_22_2", "npc_quests_9_3", "playthrough_14_8", "npc_quests_17_7", "bosses_10_10", "quest_order_tldr_51", "ashesofwar_5_12", "armor_128", "armor_421", "talismans_4_15", "ancient_dragon_smithing_stones_18", "armor_267", "talismans_7_2", "armor_99", "weapons_7_5", "armor_422", "armor_420", "memory_stones_talisman_pouches_0_2", "playthrough_12_7", "bosses_2_30", "caves_2_3", "sorceries_9_3", "legendaries_5_2", "armor_143", "crystal_tears_2_2", "talismans_14_1", "armor_36", "npc_quests_9_2", "sorceries_6_7", "armor_431", "armor_118", "weapons_2_1", "quest_order_tldr_258", "armor_229", "achievements_3_6", "weapons_8_9", "talismans_4_20", "playthrough_4_14", "weapons_34_25", "quest_order_tldr_39", "armor_471", "remembrances_mausoleums_1_9_2", "quest_order_tldr_241", "weapons_19_3", "quest_order_tldr_50", "npc_quests_6_1", "armor_138", "flasks_1_28", "incantations_12_11", "npc_quests_19_9", "bosses_5_11", "weapons_23_2", "playthrough_17_4", "quest_order_tldr_31", "legendaries_1_1", "quest_order_tldr_17", "legacy_1_5", "quest_order_tldr_170", "npc_quests_26_7_2", "great_runes_2_3", "npc_quests_9_1", "armor_258", "bosses_10_8", "weapons_32_10", "armor_62", "armor_285", "incantations_10_5", "ashesofwar_11_8", "bosses_17_1", "armor_402", "weapons_23_5", "great_runes_1_5", "bosses_6_14", "armor_557", "dragon_hearts_death_roots_0_6", "pots_bottles_2_9", "weapons_5_10", "ashesofwar_5_5", "incantations_10_7", "cookbooks_5_4", "paintings_4", "ashesofwar_5_3", "npc_quests_31_14", "armor_506", "npc_quests_24_2_2", "bell_bearings_3_1", "incantations_1_4", "armor_224", "incantations_9_6", "armor_166", "armor_294", "bosses_8_9", "ashesofwar_8_9", "bosses_7_22", "armor_331", "armor_455", "bosses_10_7", "cookbooks_3_5", "caves_6_2", "cookbooks_3_7", "armor_496", "bosses_9_9", "playthrough_4_3", "npc_quests_9_5", "bosses_10_6", "quest_order_tldr_76", "flasks_2_2", "spirit_ashes_5_3", "evergaols_5_1", "incantations_4_5", "armor_234", "pots_bottles_2_2", "armor_1", "incantations_9_4", "npc_quests_19_6", "npc_quests_27_2", "great_runes_1_7", "weapons_30_3", "ancient_dragon_smithing_stones_19", "playthrough_12_8", "legacy_1_7", "weapons_29_10", "quest_order_tldr_128", "npc_quests_25_1", "quest_order_tldr_127", "weapons_13_9", "spirit_ashes_3_17", "ashesofwar_8_1", "quest_order_tldr_150", "quest_order_tldr_189", "weapons_6_14", "armor_276", "spirit_ashes_2_4", "playthrough_10_3", "npc_quests_12_3", "sorceries_11_1", "playthrough_12_6", "npc_quests_12_5_2", "quest_order_tldr_103", "bosses_6_3", "playthrough_7_1", "armor_274", "spirit_ashes_13_1", "armor_390", "ashesofwar_3_3", "flasks_2_11", "flasks_1_38", "quest_order_tldr_93", "npc_quests_30_2", "playthrough_13_3", "npc_quests_24_2_1", "armor_436", "talismans_8_2", "quest_order_tldr_4", "ashesofwar_9_3", "armor_286", "sorceries_13_1", "incantations_10_1", "gestures_1_7", "armor_384", "npc_quests_26_7", "armor_324", "bosses_4_37", "npc_quests_26_2", "weapons_17_2", "weapons_6_9", "gestures_4_1", "armor_429", "weapons_34_15", "flasks_1_13", "crystal_tears_1_4", "armor_219", "armor_298", "quest_order_tldr_131", "bosses_2_29", "armor_122", "quest_order_tldr_1", "armor_308", "armor_61", "pots_bottles_3_3", "armor_140", "sorceries_9_2", "armor_248", "armor_426", "playthrough_1_13", "remembrances_mausoleums_1_13_2", "incantations_7_1", "illusory_walls_6_1", "armor_40", "weapons_4_4", "ashesofwar_1_3", "armor_528", "bosses_5_5", "remembrances_mausoleums_1_1_2", "weapons_9_4", "armor_542", "weapons_24_1", "ashesofwar_6_7", "armor_481", "ashesofwar_6_3", "weapons_13_15", "talismans_2_9", "weapons_14_7", "quest_order_tldr_87", "quest_order_tldr_33", "weapons_29_4", "incantations_8_3", "weapons_10_4", "crystal_tears_8_2", "npc_quests_11_1", "weapons_25_14", "talismans_18_1", "pots_bottles_2_8", "npc_quests_31_13", "weapons_22_6", "weapons_17_6", "ashesofwar_6_5", "quest_order_tldr_3", "weapons_26_4", "talismans_13_1", "weapons_14_21", "gestures_0_3", "weapons_16_2", "armor_322", "weapons_28_5", "weapons_34_11", "armor_172", "weapons_22_15", "gestures_1_5", "weapons_32_3", "quest_order_tldr_140", "weapons_30_5", "quest_order_tldr_209", "incantations_5_7", "flasks_1_2", "pots_bottles_1_3", "playthrough_8_8", "weapons_23_3", "bosses_9_3", "playthrough_5_7", "weapons_19_9", "quest_order_tldr_63", "armor_16", "ashesofwar_1_4", "remembrances_mausoleums_1_2", "paintings_7", "armor_251", "quest_order_tldr_2", "npc_quests_20_3", "armor_69", "playthrough_1_14", "cookbooks_2_1", "weapons_11_2", "npc_quests_31_1", "pots_bottles_1_12", "sorceries_2_1", "armor_180", "weapons_20_15", "weapons_9_1", "sorceries_4_18", "weapons_21_2", "weapons_25_10", "ashesofwar_2_3", "npc_quests_1_1", "weapons_30_1", "sorceries_1_8", "spirit_ashes_2_8", "crystal_tears_3_1", "npc_quests_15_1", "weapons_3_1", "remembrances_mausoleums_1_10_2", "bosses_9_5", "bosses_6_5", "cookbooks_1_1", "playthrough_1_8", "quest_order_tldr_251", "sorceries_5_2", "flasks_1_22", "weapons_33_3", "npc_quests_22_8", "npc_quests_2_1", "remembrances_mausoleums_1_14_1", "armor_58", "pots_bottles_1_10", "quest_order_tldr_142", "illusory_walls_7_2", "armor_502", "caves_1_10", "quest_order_tldr_253", "weapons_5_2", "npc_quests_19_4", "npc_quests_19_2", "armor_330", "talismans_9_3", "npc_quests_26_7_1", "incantations_10_9", "bosses_4_26", "weapons_34_10", "incantations_3_10", "weapons_8_1", "weapons_14_4", "quest_order_tldr_155", "ancient_dragon_smithing_stones_12", "crystal_tears_4_1", "ashesofwar_11_5", "playthrough_14_5", "achievements_3_1", "incantations_3_1", "armor_245", "ashesofwar_2_2", "quest_order_tldr_106", "weapons_23_12", "armor_19", "armor_26", "pots_bottles_2_1", "playthrough_5_2", "npc_quests_34_1", "gestures_1_11", "talismans_9_1", "armor_306", "armor_312", "bosses_5_26", "flasks_1_15", "bell_bearings_1_1", "remembrances_mausoleums_1_10", "npc_quests_6_3", "armor_201", "sorceries_8_8", "weapons_13_1", "achievements_2_15", "legacy_1_14", "incantations_7_4", "armor_546", "crystal_tears_3_2", "weapons_23_10", "caves_4_1", "incantations_4_1", "great_runes_1_6", "cookbooks_7_3", "weapons_23_15", "legendaries_1_2", "caves_3_7", "weapons_10_5", "armor_256", "armor_372", "armor_57", "bosses_2_7", "bosses_8_18", "flasks_1_43", "crystal_tears_8_4", "armor_210", "weapons_14_2", "armor_505", "gestures_0_4", "armor_536", "armor_173", "npc_quests_8_1", "bosses_4_11", "npc_quests_30_3", "gestures_5_1", "npc_quests_34_2", "weapons_5_9", "bosses_2_19", "memory_stones_talisman_pouches_0_5", "weapons_13_2", "armor_296", "achievements_2_14", "caves_3_8", "weapons_31_6", "sorceries_8_1", "playthrough_1_9", "flasks_2_5", "playthrough_14_6", "armor_425", "weapons_1_8", "remembrances_mausoleums_1_13_1", "quest_order_tldr_252", "armor_523", "quest_order_tldr_214", "armor_117", "bosses_4_29", "talismans_4_12", "ashesofwar_6_2", "ashesofwar_5_9", "armor_314", "playthrough_14_3", "npc_quests_27_6", "gestures_0_10", "dragon_hearts_death_roots_0_9", "crystal_tears_0_1", "armor_375", "weapons_15_3", "memory_stones_talisman_pouches_0_3", "talismans_10_6", "armor_179", "weapons_18_5", "sorceries_9_6", "legendaries_4_2", "crystal_tears_1_2", "sorceries_4_11", "npc_quests_19_8", "achievements_3_5", "bosses_4_15", "bosses_1_7", "weapons_29_13", "armor_50", "armor_345", "quest_order_tldr_259", "bosses_9_15", "playthrough_2_2", "bosses_7_20", "ashesofwar_12_3", "pots_bottles_3_1", "achievements_2_21", "talismans_2_6", "weapons_20_13", "flasks_2_6", "weapons_34_13", "armor_363", "weapons_25_3", "ashesofwar_6_11", "quest_order_tldr_182", "remembrances_mausoleums_1_12_1", "legendaries_3_3", "armor_480", "bell_bearings_2_2", "npc_quests_31_20", "sorceries_6_5", "npc_quests_29_4", "bell_bearings_1_2", "npc_quests_31_3", "talismans_11_5", "quest_order_tldr_123", "bell_bearings_4_2", "bosses_5_15", "incantations_2_3", "talismans_10_8", "bosses_2_6", "weapons_27_1", "armor_289", "talismans_2_5", "quest_order_tldr_204", "spirit_ashes_2_9", "legendaries_3_4", "flasks_1_18", "cookbooks_2_4", "weapons_21_5", "weapons_2_2", "armor_568", "ashesofwar_5_1", "sorceries_4_16", "npc_quests_10_4", "bosses_5_16", "weapons_5_5", "spirit_ashes_3_15", "weapons_14_12", "armor_466", "weapons_3_11", "weapons_6_13", "bosses_2_24", "weapons_20_8", "weapons_23_9", "armor_492", "npc_quests_31_19", "npc_quests_27_3", "cookbooks_1_21", "weapons_3_7", "legendaries_4_3", "bosses_4_14", "crystal_tears_3_5", "weapons_3_13", "caves_5_5", "remembrances_mausoleums_1_7_1", "talismans_1_7", "quest_order_tldr_198", "talismans_3_3", "playthrough_15_2", "armor_443", "pots_bottles_3_6", "armor_291", "npc_quests_20_7", "npc_quests_32_7", "armor_109", "armor_414", "quest_order_tldr_255", "playthrough_17_1", "npc_quests_21_6", "quest_order_tldr_29", "npc_quests_1_3", "armor_217", "ashesofwar_8_3", "gestures_1_8", "quest_order_tldr_126", "npc_quests_18_3", "illusory_walls_4_2", "incantations_2_1", "ashesofwar_5_13", "armor_51", "flasks_1_1", "quest_order_tldr_245", "armor_405", "sorceries_1_9", "bosses_1_8", "quest_order_tldr_205", "ashesofwar_7_2", "armor_82", "incantations_7_2", "sorceries_4_4", "spirit_ashes_3_2", "weapons_10_2", "bosses_4_33", "armor_427", "bosses_2_28", "armor_381", "armor_315", "bosses_5_7", "armor_565", "weapons_34_1", "ashesofwar_2_1", "npc_quests_34_3", "incantations_12_15", "cookbooks_3_1", "pots_bottles_1_1", "weapons_32_13", "ashesofwar_10_1", "paintings_5", "spirit_ashes_7_2", "npc_quests_22_5", "pots_bottles_3_4", "achievements_3_2", "bosses_1_5", "quest_order_tldr_213", "flasks_2_8", "npc_quests_7_6", "quest_order_tldr_18", "npc_quests_10_10", "armor_90", "quest_order_tldr_5", "armor_266", "achievements_1_4", "spirit_ashes_3_4", "armor_174", "incantations_3_12", "sorceries_12_2", "playthrough_3_4", "bosses_6_13", "caves_5_3", "armor_10", "crystal_tears_5_2", "pots_bottles_1_7", "cookbooks_6_1", "quest_order_tldr_208", "weapons_6_6", "remembrances_mausoleums_1_7_2", "weapons_34_3", "quest_order_tldr_134", "armor_395", "great_runes_1_3", "quest_order_tldr_225", "npc_quests_20_8", "armor_123", "talismans_5_6", "npc_quests_22_6", "achievements_2_8", "weapons_28_3", "bosses_2_2", "weapons_32_14", "weapons_28_9", "spirit_ashes_4_3", "quest_order_tldr_37", "ancient_dragon_smithing_stones_6", "ashesofwar_7_1", "armor_448", "quest_order_tldr_92", "ashesofwar_13_5", "npc_quests_12_1", "npc_quests_3_4", "bosses_7_14", "crystal_tears_0_3", "weapons_7_7", "armor_242", "armor_484", "npc_quests_8_2", "armor_28", "bosses_7_8", "quest_order_tldr_94", "ashesofwar_11_7", "achievements_2_6", "sorceries_8_2", "incantations_11_3", "talismans_2_18", "bosses_14_1", "bosses_16_1", "incantations_12_9", "armor_310", "bosses_7_24", "weapons_20_14", "spirit_ashes_2_3", "weapons_33_15", "memory_stones_talisman_pouches_1_4", "pots_bottles_3_5", "quest_order_tldr_200", "npc_quests_26_5", "bosses_17_2", "armor_142", "bosses_9_1", "caves_4_3", "npc_quests_22_2", "armor_202", "dragon_hearts_death_roots_1_1", "bosses_4_31", "armor_106", "weapons_8_6", "quest_order_tldr_160", "weapons_22_3", "playthrough_14_2", "playthrough_10_7", "quest_order_tldr_53", "bosses_10_2", "playthrough_12_1", "armor_351", "scrolls_prayerbooks_1_5", "quest_order_tldr_125", "playthrough_7_5", "quest_order_tldr_215", "quest_order_tldr_194", "armor_320", "sorceries_4_25", "weapons_13_7", "spirit_ashes_9_3", "quest_order_tldr_261", "armor_227", "weapons_27_5", "armor_411", "armor_534", "quest_order_tldr_226", "bosses_4_2", "weapons_14_13", "armor_246", "weapons_24_4", "incantations_1_6", "ashesofwar_9_4", "weapons_23_14", "pots_bottles_2_6", "playthrough_8_6", "playthrough_4_12", "playthrough_17_5", "armor_104", "playthrough_4_2", "armor_529", "ashesofwar_11_10", "armor_127", "armor_367", "achievements_2_24", "talismans_8_8", "bosses_2_14", "armor_190", "armor_204", "legendaries_4_1", "illusory_walls_1_10", "weapons_32_2", "weapons_33_19", "bosses_7_28", "npc_quests_29_1", "talismans_7_5", "weapons_29_14", "remembrances_mausoleums_1_6_1", "ashesofwar_1_2", "ashesofwar_5_11", "weapons_32_4", "quest_order_tldr_145", "ancient_dragon_smithing_stones_17", "dragon_hearts_death_roots_0_11", "npc_quests_31_18", "weapons_23_1", "armor_364", "playthrough_2_3", "npc_quests_7_5", "armor_379", "armor_468", "incantations_3_14", "remembrances_mausoleums_1_5_2", "armor_499", "playthrough_2_4", "weapons_15_7", "incantations_7_9", "armor_336", "talismans_8_5", "armor_386", "illusory_walls_2_2", "achievements_4_3", "quest_order_tldr_121", "legendaries_5_3", "armor_79", "armor_389", "playthrough_3_1", "playthrough_9_6", "legendaries_1_1_0", "armor_178", "armor_319", "bosses_7_7", "weapons_20_4", "legendaries_1_1_1", "bosses_8_5", "weapons_23_7", "ashesofwar_11_6", "incantations_4_6", "quest_order_tldr_222", "cookbooks_6_2", "quest_order_tldr_75", "memory_stones_talisman_pouches_0_4", "talismans_8_6", "bosses_2_18", "weapons_25_4", "flasks_1_42", "talismans_9_4", "ashesofwar_8_10", "ashesofwar_13_8", "paintings_2", "npc_quests_17_2", "quest_order_tldr_238", "armor_134", "illusory_walls_6_2", "armor_332", "playthrough_1_2", "weapons_34_22", "great_runes_2_2", "gestures_8_1", "npc_quests_1_2", "incantations_5_6", "cookbooks_5_8", "caves_2_7", "armor_350", "weapons_33_26", "cookbooks_3_2", "talismans_5_5", "quest_order_tldr_82", "bosses_7_11", "weapons_25_16", "quest_order_tldr_120", "bosses_5_24", "caves_5_6", "npc_quests_17_4", "npc_quests_10_2", "playthrough_4_11", "gestures_4_3", "npc_quests_16_1", "spirit_ashes_7_5", "playthrough_12_3", "armor_477", "legendaries_1_5", "npc_quests_11_4", "talismans_2_15", "armor_96", "incantations_5_4", "npc_quests_23_1", "npc_quests_30_5", "pots_bottles_1_18", "weapons_14_8", "armor_579", "weapons_27_6", "playthrough_1_6", "ancient_dragon_smithing_stones_21", "armor_380", "playthrough_3_5", "achievements_2_4", "npc_quests_32_2", "quest_order_tldr_20", "quest_order_tldr_13", "weapons_4_2", "quest_order_tldr_60", "npc_quests_31_17", "quest_order_tldr_11", "weapons_24_3", "quest_order_tldr_68", "playthrough_14_4", "quest_order_tldr_244", "illusory_walls_3_3", "quest_order_tldr_72", "ancient_dragon_smithing_stones_14", "sorceries_8_10", "caves_4_4", "bosses_7_26", "armor_517", "playthrough_12_2", "armor_139", "armor_236", "ashesofwar_13_1", "armor_564", "bosses_9_13", "talismans_16_1", "weapons_9_13", "playthrough_9_1", "armor_100", "weapons_13_16", "paintings_3_1", "remembrances_mausoleums_1_1", "cookbooks_1_17", "spirit_ashes_4_2", "talismans_19_1", "npc_quests_3_2", "npc_quests_3_7", "armor_74", "incantations_1_5", "ashesofwar_12_8", "ancient_dragon_smithing_stones_8", "pots_bottles_1_16", "bosses_4_39", "weapons_4_1", "quest_order_tldr_116", "armor_159", "armor_47", "playthrough_12_5", "legendaries_3_1", "quest_order_tldr_185", "npc_quests_34_6", "weapons_32_9", "bosses_14_2", "npc_quests_20_2", "bosses_7_17", "npc_quests_31_8", "armor_214", "npc_quests_17_4_2", "weapons_23_4", "paintings_2_1", "remembrances_mausoleums_1_1_1", "quest_order_tldr_124", "achievements_2_19", "quest_order_tldr_236", "weapons_3_15", "armor_32", "armor_518", "talismans_4_10", "incantations_9_3", "gestures_0_9", "bosses_2_17", "npc_quests_4_4", "playthrough_5_4", "talismans_4_13", "incantations_3_8", "remembrances_mausoleums_1_15", "weapons_19_7", "flasks_1_31", "quest_order_tldr_157", "quest_order_tldr_190", "armor_377", "incantations_5_3", "bosses_7_10", "armor_235", "incantations_12_4", "bosses_5_22", "bosses_5_23", "bosses_5_4", "weapons_4_3", "pots_bottles_2_7", "quest_order_tldr_178", "weapons_3_10", "weapons_18_6", "flasks_1_29", "quest_order_tldr_211", "npc_quests_28_1", "weapons_25_12", "talismans_10_9", "ashesofwar_11_12", "armor_283", "playthrough_6_1", "bosses_13_2", "achievements_1_6", "weapons_17_5", "armor_393", "weapons_32_7", "flasks_1_17", "armor_188", "incantations_5_5", "playthrough_1_7", "npc_quests_30_4", "quest_order_tldr_27", "legacy_1_9", "armor_85", "armor_101", "armor_220", "weapons_10_7", "npc_quests_20_5_3", "whetstones_0_6", "quest_order_tldr_101", "bosses_4_9", "talismans_2_8", "memory_stones_talisman_pouches_0_6", "playthrough_14_1", "achievements_2_10", "armor_212", "armor_35", "bosses_12_1", "flasks_1_40", "playthrough_17_2", "quest_order_tldr_232", "armor_516", "armor_486", "sorceries_4_6", "npc_quests_20_5_2", "bosses_16_2", "quest_order_tldr_55", "weapons_34_7", "evergaols_2_4", "armor_20", "bosses_10_3", "quest_order_tldr_73", "armor_137", "armor_30", "playthrough_4_7", "quest_order_tldr_23", "bosses_1_6", "weapons_14_16", "gestures_6_1", "weapons_22_4", "bosses_15_2", "bosses_4_36", "spirit_ashes_9_2", "quest_order_tldr_207", "caves_1_3", "incantations_1_2", "legacy_1_4", "achievements_4_2", "armor_511", "armor_456", "quest_order_tldr_143", "armor_65", "pots_bottles_3_7", "ashesofwar_5_8", "quest_order_tldr_229", "bosses_1_1", "weapons_30_6", "armor_168", "npc_quests_28_4", "bosses_15_1", "flasks_1_8", "weapons_14_11", "weapons_12_1", "quest_order_tldr_56", "talismans_2_12", "weapons_20_2", "armor_563", "gestures_2_2", "quest_order_tldr_21", "incantations_12_1", "bosses_4_16", "legendaries_2_1", "talismans_6_5", "evergaols_0_1", "armor_17", "bosses_2_8", "weapons_29_16", "sorceries_5_3", "weapons_26_3", "armor_535", "armor_445", "incantations_6_2", "cookbooks_1_4", "npc_quests_7_1", "talismans_5_3", "weapons_6_5", "armor_222", "dragon_hearts_death_roots_1_8", "flasks_1_41", "weapons_1_12", "bosses_6_1", "sorceries_1_7", "weapons_32_5", "talismans_10_7", "dragon_hearts_death_roots_1_5", "dragon_hearts_death_roots_0_7", "weapons_8_4", "flasks_1_30", "flasks_2_12", "spirit_ashes_3_18", "armor_77", "sorceries_10_3", "weapons_11_5", "bosses_5_17", "talismans_7_8", "bosses_12_2", "weapons_14_20", "ashesofwar_6_4", "npc_quests_12_6", "sorceries_10_2", "npc_quests_8_3", "ashesofwar_12_5", "weapons_28_2", "armor_31", "weapons_29_11", "incantations_7_7", "weapons_11_4", "armor_394", "weapons_9_10", "legendaries_3_6", "incantations_3_9", "pots_bottles_1_14", "npc_quests_3_3", "bosses_10_9", "armor_326", "flasks_1_25", "spirit_ashes_3_10", "weapons_14_17", "weapons_31_5", "armor_307", "playthrough_1_4", "weapons_29_18", "armor_154", "bosses_11_5", "weapons_8_7", "armor_368", "armor_439", "remembrances_mausoleums_1_4", "armor_206", "weapons_11_3", "playthrough_7_6", "npc_quests_19_3_1", "armor_576", "armor_41", "quest_order_tldr_62", "npc_quests_10_3", "playthrough_4_6", "armor_157", "talismans_7_6", "armor_346", "sorceries_8_5", "bosses_4_7", "weapons_15_6", "spirit_ashes_3_7", "ashesofwar_13_12", "sorceries_4_17", "dragon_hearts_death_roots_0_5", "dragon_hearts_death_roots_1_3", "great_runes_1_4", "bosses_7_25", "remembrances_mausoleums_2_1", "quest_order_tldr_42", "quest_order_tldr_55_1", "talismans_4_3", "armor_451", "gestures_4_4", "caves_8_1", "incantations_11_1", "playthrough_3_2", "armor_359", "weapons_17_7", "cookbooks_1_16", "npc_quests_25_2", "bosses_2_21", "incantations_8_5", "npc_quests_30_1", "quest_order_tldr_192", "bell_bearings_2_4", "flasks_1_27", "npc_quests_17_1", "armor_551", "quest_order_tldr_164", "armor_121", "bosses_11_4", "armor_114", "weapons_18_1", "talismans_4_2", "flasks_1_14", "weapons_33_14", "armor_244", "cookbooks_1_12", "ancient_dragon_smithing_stones_10", "remembrances_mausoleums_1_11_2", "weapons_13_14", "caves_3_6", "npc_quests_11_5", "quest_order_tldr_193", "quest_order_tldr_180", "armor_37", "sorceries_5_1", "bosses_9_6", "ashesofwar_13_7", "quest_order_tldr_96", "armor_305", "incantations_10_4", "bosses_10_5", "weapons_20_11", "armor_215", "armor_509", "npc_quests_18_2", "npc_quests_17_4_1", "bell_bearings_2_3", "npc_quests_27_4", "ashesofwar_11_4", "achievements_3_9", "cookbooks_1_11", "bosses_10_13", "npc_quests_10_8", "playthrough_16_4", "pots_bottles_2_3", "weapons_6_8", "npc_quests_19_3_3", "pots_bottles_1_5", "gestures_0_11", "quest_order_tldr_234", "remembrances_mausoleums_1_3_2", "armor_581", "cookbooks_3_4", "bosses_5_28", "armor_2", "armor_385", "armor_545", "playthrough_8_1", "armor_460", "npc_quests_32_5", "whetstones_0_5", "weapons_33_17", "quest_order_tldr_30", "weapons_29_15", "caves_7_1", "armor_543", "quest_order_tldr_74", "armor_580", "quest_order_tldr_199", "crystal_tears_2_4", "armor_12", "bell_bearings_2_5", "quest_order_tldr_129", "legacy_1_16", "quest_order_tldr_86", "bosses_4_18", "armor_556", "bosses_7_3", "whetstones_0_3", "flasks_1_16", "npc_quests_29_5", "weapons_14_19", "cookbooks_2_3", "armor_362", "gestures_0_6", "armor_446", "crystal_tears_1_1", "armor_553", "weapons_6_15", "incantations_1_3", "bosses_5_8", "cookbooks_2_5", "scrolls_prayerbooks_1_2", "npc_quests_29_3", "ashesofwar_12_4", "talismans_4_7", "scrolls_prayerbooks_1_6", "sorceries_1_6", "npc_quests_31_10", "armor_176", "sorceries_4_29", "quest_order_tldr_61", "armor_328", "talismans_8_7", "armor_93", "quest_order_tldr_104", "npc_quests_21_7", "talismans_2_4", "ancient_dragon_smithing_stones_4", "playthrough_8_7", "armor_44", "npc_quests_33_3", "npc_quests_31_20_2", "sorceries_4_21", "quest_order_tldr_201", "quest_order_tldr_12", "npc_quests_29_6", "quest_order_tldr_169", "armor_284", "armor_327", "cookbooks_1_20", "npc_quests_7_7", "remembrances_mausoleums_2_5", "quest_order_tldr_69", "incantations_8_1", "npc_quests_31_10_1", "incantations_3_5", "bosses_6_6", "remembrances_mausoleums_1_4_1", "armor_158", "weapons_29_5", "talismans_2_13", "weapons_6_1", "armor_145", "quest_order_tldr_84", "armor_309", "talismans_6_4", "weapons_25_6", "armor_162", "remembrances_mausoleums_1_12", "npc_quests_15_2", "armor_450", "armor_52", "armor_533", "gestures_3_4", "weapons_13_4", "armor_177", "armor_538", "legendaries_1_6", "armor_519", "weapons_1_13", "weapons_18_2", "bosses_11_3", "pots_bottles_1_11", "bosses_6_17", "npc_quests_22_4", "incantations_5_12", "sorceries_4_19", "evergaols_1_1", "playthrough_16_1", "armor_155", "incantations_3_2", "armor_318", "sorceries_6_1", "weapons_32_1", "bosses_8_12", "bosses_2_25", "bosses_4_40", "talismans_7_1", "gestures_0_5", "npc_quests_6_4", "quest_order_tldr_15", "quest_order_tldr_177", "sorceries_4_28", "weapons_33_13", "talismans_6_9", "bell_bearings_2_1", "weapons_3_4", "crystal_tears_6_3", "armor_45", "weapons_10_6", "bosses_5_21", "playthrough_4_5", "bosses_7_1", "armor_472", "talismans_9_5", "sorceries_6_6", "armor_120", "ashesofwar_5_10", "armor_522", "weapons_20_12", "armor_49", "armor_169", "weapons_15_2", "npc_quests_23_4", "talismans_15_1", "cookbooks_1_15", "armor_353", "armor_339", "quest_order_tldr_111", "npc_quests_2_3", "npc_quests_11_3", "whetstones_0_2", "bosses_8_8", "legendaries_1_3", "achievements_1_5", "talismans_2_19", "talismans_14_2", "armor_313", "great_runes_2_1", "talismans_1_2", "armor_501", "armor_570", "crystal_tears_2_3", "crystal_tears_8_1", "weapons_1_9", "achievements_3_4", "remembrances_mausoleums_1_7", "weapons_25_11", "quest_order_tldr_262", "spirit_ashes_12_1", "gestures_7_1", "armor_237", "bosses_4_25", "achievements_2_22", "weapons_9_14", "talismans_6_7", "legacy_1_11", "armor_7", "cookbooks_1_10", "armor_185", "talismans_11_4", "armor_193", "armor_218", "armor_175", "armor_366", "npc_quests_26_6", "sorceries_12_4", "armor_265", "achievements_2_3", "weapons_32_17", "illusory_walls_4_1", "armor_409", "armor_293", "cookbooks_8_3", "weapons_15_4", "weapons_30_9", "armor_170", "armor_262", "spirit_ashes_11_1", "spirit_ashes_12_2", "ancient_dragon_smithing_stones_16", "ancient_dragon_smithing_stones_5", "npc_quests_23_2", "npc_quests_5_1", "npc_quests_3_5", "remembrances_mausoleums_1_6_2", "remembrances_mausoleums_1_6", "bosses_2_10", "quest_order_tldr_100", "npc_quests_10_5", "armor_130", "pots_bottles_2_5", "armor_449", "paintings_6", "illusory_walls_1_2", "pots_bottles_1_2", "bosses_6_16", "illusory_walls_1_3", "quest_order_tldr_8", "gestures_0_8", "weapons_19_10", "armor_260", "talismans_5_2", "armor_153", "npc_quests_33_2", "weapons_33_1", "armor_342", "legendaries_3_5", "sorceries_1_10", "npc_quests_8_4", "armor_376", "legendaries_2_2", "npc_quests_29_9", "weapons_25_15", "armor_161", "weapons_32_8", "armor_527", "flasks_1_34", "cookbooks_1_19", "armor_467", "weapons_33_11", "caves_5_2", "spirit_ashes_1_3", "gestures_3_3", "npc_quests_17_3", "armor_95", "illusory_walls_1_5", "paintings_1", "quest_order_tldr_102", "incantations_12_7", "bosses_4_21", "weapons_17_8", "incantations_3_11", "armor_559", "npc_quests_31_11", "caves_0_5", "playthrough_13_8", "talismans_7_9", "armor_148", "weapons_33_12", "weapons_10_1", "spirit_ashes_7_1", "weapons_31_3", "armor_54", "weapons_6_4", "talismans_4_16", "npc_quests_20_1", "armor_434", "bosses_1_9", "cookbooks_1_13", "bosses_9_11", "caves_8_2", "playthrough_1_5", "playthrough_11_2", "dragon_hearts_death_roots_1_6", "bosses_8_15", "armor_521", "bosses_4_34", "quest_order_tldr_71", "caves_0_3", "npc_quests_2_4", "weapons_1_4", "quest_order_tldr_34", "playthrough_6_2", "armor_198", "weapons_32_6", "cookbooks_8_4", "quest_order_tldr_97", "npc_quests_3_8", "bosses_4_24", "quest_order_tldr_36", "caves_2_6", "npc_quests_3_1", "gestures_2_5", "bell_bearings_4_1", "bosses_4_20", "caves_5_1", "armor_452", "npc_quests_29_10", "quest_order_tldr_183", "quest_order_tldr_202", "npc_quests_7_9", "npc_quests_29_2", "gestures_6_4", "weapons_32_12", "incantations_4_11", "sorceries_9_5", "armor_541", "quest_order_tldr_117", "quest_order_tldr_186", "bosses_4_23", "armor_562", "armor_42", "caves_1_7", "npc_quests_34_4", "weapons_34_5", "armor_81", "armor_575", "armor_144", "weapons_9_15", "playthrough_3_3", "quest_order_tldr_171", "armor_311", "spirit_ashes_4_4", "spirit_ashes_7_4", "achievements_2_12", "weapons_7_6", "weapons_20_5", "talismans_4_4", "sorceries_8_4", "talismans_4_6", "bosses_9_8", "npc_quests_33_1", "flasks_1_5", "armor_475", "weapons_30_7", "playthrough_13_4", "npc_quests_32_1", "weapons_13_6", "quest_order_tldr_195", "armor_478", "flasks_1_35", "flasks_1_12", "ashesofwar_1_1", "armor_504", "gestures_3_2", "quest_order_tldr_58", "incantations_6_4", "quest_order_tldr_256", "incantations_7_6", "talismans_4_11", "sorceries_6_3", "armor_194", "playthrough_8_4", "armor_348", "armor_275", "remembrances_mausoleums_1_9_1", "npc_quests_24_1", "talismans_1_4", "npc_quests_21_5", "armor_18", "npc_quests_19_1", "weapons_6_12", "weapons_5_11", "caves_3_4", "bosses_4_4", "quest_order_tldr_166", "armor_263", "armor_165", "quest_order_tldr_250", "playthrough_14_10", "ashesofwar_13_11", "weapons_28_7", "spirit_ashes_1_1", "cookbooks_8_2", "legacy_1_2", "cookbooks_1_9", "weapons_29_6", "weapons_22_12", "armor_338", "quest_order_tldr_113", "quest_order_tldr_130", "weapons_8_5", "armor_136", "weapons_1_7", "armor_250", "armor_325", "talismans_13_2", "flasks_1_37", "bosses_7_4", "quest_order_tldr_52", "quest_order_tldr_99", "npc_quests_28_5", "legendaries_1_7", "weapons_33_25", "legacy_1_8", "quest_order_tldr_224", "playthrough_1_10", "talismans_5_10", "incantations_3_13", "talismans_2_17", "npc_quests_20_9", "npc_quests_12_4", "incantations_12_2", "armor_184", "npc_quests_28_3", "weapons_9_5", "weapons_8_8", "quest_order_tldr_175", "armor_358", "npc_quests_10_1", "sorceries_1_3", "bosses_6_11", "gestures_1_2", "weapons_13_19", "quest_order_tldr_221", "armor_88", "playthrough_5_9", "gestures_2_1", "remembrances_mausoleums_1_10_1", "weapons_34_14", "playthrough_5_10", "cookbooks_5_1", "weapons_7_3", "npc_quests_6_5", "quest_order_tldr_203", "playthrough_11_1", "playthrough_9_3", "armor_205", "ashesofwar_12_7", "caves_7_3", "sorceries_4_26", "illusory_walls_1_6", "playthrough_14_9", "playthrough_17_7", "weapons_23_6", "spirit_ashes_10_1", "armor_397", "incantations_6_3", "cookbooks_1_7", "armor_412", "illusory_walls_3_4", "evergaols_2_1", "armor_196", "weapons_31_2", "incantations_10_3", "playthrough_13_1", "armor_160", "quest_order_tldr_254", "playthrough_18_2", "sorceries_4_1", "weapons_31_1", "achievements_2_11", "bosses_6_12", "incantations_12_13", "spirit_ashes_3_14", "armor_29", "talismans_2_14", "armor_105", "playthrough_2_5", "npc_quests_10_9", "bosses_5_20", "sorceries_7_1", "flasks_1_23", "npc_quests_12_5", "armor_66", "armor_110", "armor_71", "ashesofwar_8_2", "talismans_4_1", "quest_order_tldr_179", "ashesofwar_13_10", "armor_316", "armor_503", "sorceries_4_22", "pots_bottles_3_10", "armor_189", "bosses_8_7", "playthrough_4_15", "weapons_29_8", "weapons_34_19", "armor_183", "dragon_hearts_death_roots_0_3", "armor_531", "weapons_24_2", "armor_15", "armor_430", "quest_order_tldr_173", "illusory_walls_2_1", "ashesofwar_13_6", "quest_order_tldr_223", "weapons_7_4", "quest_order_tldr_46", "quest_order_tldr_154", "talismans_5_1", "armor_282", "quest_order_tldr_107", "talismans_10_5", "armor_407", "dragon_hearts_death_roots_0_8", "armor_68", "incantations_5_2", "ashesofwar_8_6", "weapons_33_16", "quest_order_tldr_79", "quest_order_tldr_148", "caves_1_6", "gestures_6_3", "npc_quests_2_5", "sorceries_4_8", "quest_order_tldr_65", "great_runes_1_2", "quest_order_tldr_35", "armor_555", "ashesofwar_9_2", "quest_order_tldr_212", "armor_22", "npc_quests_33_4", "ashesofwar_13_9", "sorceries_1_5", "bosses_11_2", "quest_order_tldr_85", "armor_410", "armor_433", "armor_540", "npc_quests_31_16", "weapons_30_8", "spirit_ashes_3_12", "weapons_29_3", "whetstones_0_1", "flasks_1_11", "sorceries_7_2", "pots_bottles_1_15", "talismans_5_12", "weapons_20_6", "spirit_ashes_2_7", "quest_order_tldr_141", "armor_558", "incantations_5_1", "npc_quests_18_1", "crystal_tears_6_1", "armor_482", "armor_98", "caves_4_2", "bosses_5_27", "spirit_ashes_15_1", "weapons_25_8", "playthrough_17_6", "weapons_25_7", "armor_24", "weapons_3_14", "ashesofwar_4_2", "bosses_6_7", "bosses_8_2", "playthrough_10_4", "talismans_6_8", "armor_333", "playthrough_7_2", "quest_order_tldr_246", "armor_280", "armor_440", "talismans_10_1", "dragon_hearts_death_roots_0_1", "bosses_18_3", "bosses_4_12", "sorceries_4_5", "npc_quests_19_7", "npc_quests_25_3", "incantations_7_8", "quest_order_tldr_90", "gestures_3_6", "npc_quests_33_5", "weapons_7_1", "spirit_ashes_3_1", "pots_bottles_1_4", "armor_92", "playthrough_13_6", "weapons_6_11", "quest_order_tldr_156", "npc_quests_17_6", "weapons_33_8", "armor_490", "armor_371", "legacy_1_1", "weapons_33_21", "scrolls_prayerbooks_0_3", "bosses_5_18", "bosses_2_22", "bosses_4_5", "playthrough_15_1", "armor_149", "playthrough_4_1", "armor_195", "caves_5_4", "bosses_7_21", "weapons_10_3", "incantations_7_5", "playthrough_5_3", "bosses_4_38", "weapons_14_1", "quest_order_tldr_44", "incantations_8_4", "armor_299", "paintings_1_2", "crystal_tears_2_6", "armor_182", "achievements_1_3", "quest_order_tldr_146", "armor_86", "cookbooks_1_18", "cookbooks_5_2", "quest_order_tldr_248", "armor_463", "remembrances_mausoleums_1_9", "quest_order_tldr_243", "cookbooks_1_24", "armor_361", "npc_quests_4_2", "quest_order_tldr_230", "dragon_hearts_death_roots_0_4", "ashesofwar_6_10", "spirit_ashes_3_3", "npc_quests_27_5", "bosses_8_17", "legendaries_1_9", "playthrough_3_6", "weapons_30_2", "caves_0_1", "armor_232", "armor_483", "armor_225", "quest_order_tldr_138", "pots_bottles_1_20", "illusory_walls_5_1", "weapons_5_1", "gestures_0_12", "bosses_8_10", "incantations_5_13", "talismans_5_11", "npc_quests_17_10", "armor_476", "armor_46", "armor_415", "bell_bearings_1_4", "quest_order_tldr_168", "crystal_tears_6_2", "legendaries_1_4", "legendaries_3_2", "dragon_hearts_death_roots_0_12", "quest_order_tldr_239", "caves_2_8", "armor_301", "playthrough_4_4", "bosses_5_2", "incantations_4_4", "bosses_9_7", "sorceries_8_7", "pots_bottles_1_8", "armor_269", "weapons_33_6", "npc_quests_29_7", "npc_quests_20_4", "remembrances_mausoleums_2_3", "weapons_34_8", "caves_2_4", "crystal_tears_4_2", "npc_quests_1_8", "ashesofwar_11_1", "armor_300", "incantations_2_2", "weapons_34_23", "playthrough_4_9", "weapons_20_10", "legacy_1_15", "weapons_30_4", "spirit_ashes_14_2", "npc_quests_32_4", "talismans_2_3", "armor_226", "cookbooks_1_23", "npc_quests_31_2", "ancient_dragon_smithing_stones_9", "incantations_11_2", "bell_bearings_3_2", "weapons_3_6", "armor_233", "armor_200", "caves_0_4", "dragon_hearts_death_roots_1_9", "cookbooks_8_1", "incantations_10_6", "weapons_33_9", "armor_512", "achievements_2_5", "ancient_dragon_smithing_stones_1", "weapons_29_7", "pots_bottles_1_17", "quest_order_tldr_159", "caves_6_3", "bosses_4_32", "npc_quests_1_7", "scrolls_prayerbooks_1_4", "cookbooks_1_8", "armor_257", "sorceries_12_1", "ancient_dragon_smithing_stones_2", "weapons_22_8", "ashesofwar_10_2", "npc_quests_22_1", "quest_order_tldr_40", "armor_323", "quest_order_tldr_19", "illusory_walls_1_7", "cookbooks_1_14", "npc_quests_17_9", "npc_quests_32_6", "playthrough_1_11", "weapons_31_4", "quest_order_tldr_95", "bosses_18_1", "armor_132", "talismans_5_9", "flasks_2_4", "quest_order_tldr_137", "weapons_20_9", "weapons_3_3", "armor_341", "armor_435", "bosses_2_11", "weapons_33_20", "armor_23", "armor_39", "talismans_4_18", "caves_1_9", "weapons_16_3", "spirit_ashes_3_5", "paintings_3", "remembrances_mausoleums_1_15_1", "ashesofwar_5_6", "bosses_10_11", "armor_125", "armor_0", "dragon_hearts_death_roots_1_7", "weapons_23_8", "talismans_2_11", "incantations_5_10", "pots_bottles_2_10", "armor_91", "great_runes_1_1", "npc_quests_3_6", "quest_order_tldr_25", "weapons_3_8", "illusory_walls_7_1", "armor_349", "quest_order_tldr_172", "cookbooks_5_6", "quest_order_tldr_108", "quest_order_tldr_41", "bosses_10_4", "quest_order_tldr_149", "spirit_ashes_3_9", "flasks_1_32", "playthrough_1_12", "talismans_6_10", "quest_order_tldr_153", "bosses_7_2", "quest_order_tldr_122", "armor_4", "quest_order_tldr_263", "quest_order_tldr_80", "ashesofwar_12_9", "npc_quests_12_2", "armor_514", "ashesofwar_3_2", "spirit_ashes_9_4", "remembrances_mausoleums_2_6", "armor_548", "armor_43", "bosses_2_15", "incantations_9_1", "gestures_1_1", "bosses_5_1", "npc_quests_5_3", "bosses_2_20", "bosses_7_23", "bosses_4_17", "caves_1_4", "bosses_5_10", "weapons_26_2", "bosses_2_4", "ashesofwar_11_3", "weapons_3_12", "incantations_4_12", "sorceries_12_5", "spirit_ashes_2_2", "armor_116", "remembrances_mausoleums_1_11", "weapons_12_4", "legendaries_2_6", "weapons_14_14", "crystal_tears_8_3", "weapons_34_6", "talismans_11_1", "talismans_11_2", "weapons_25_2", "quest_order_tldr_105", "spirit_ashes_8_1", "sorceries_8_9", "quest_order_tldr_45", "quest_order_tldr_119", "quest_order_tldr_220", "armor_102", "incantations_3_6", "talismans_12_1", "sorceries_4_9", "weapons_22_14", "bosses_2_16", "talismans_8_1", "weapons_14_10", "quest_order_tldr_133", "quest_order_tldr_26", "armor_211", "armor_223", "talismans_2_1", "achievements_3_8", "evergaols_4_1", "spirit_ashes_3_16", "crystal_tears_1_3", "bosses_1_11", "weapons_17_4", "dragon_hearts_death_roots_0_13", "crystal_tears_2_1", "npc_quests_32_3", "quest_order_tldr_206", "weapons_32_15", "quest_order_tldr_163", "armor_550", "ashesofwar_6_9", "bosses_5_25", "armor_388", "achievements_3_3", "quest_order_tldr_66_2", "armor_3", "weapons_6_3", "armor_382", "flasks_2_7", "remembrances_mausoleums_1_11_1", "weapons_23_13", "armor_209", "npc_quests_34_5", "weapons_33_18", "bosses_8_3", "armor_34", "weapons_24_6", "remembrances_mausoleums_1_5_1", "armor_287", "armor_547", "weapons_13_13", "ancient_dragon_smithing_stones_3", "npc_quests_21_3_1", "weapons_22_1", "armor_97", "legendaries_5_1", "playthrough_13_5", "npc_quests_31_12", "npc_quests_27_1", "achievements_2_13", "spirit_ashes_5_1", "flasks_2_3", "ashesofwar_12_6", "caves_6_1", "talismans_8_4", "npc_quests_28_6", "bosses_2_13", "evergaols_2_3", "memory_stones_talisman_pouches_0_1", "armor_513", "ancient_dragon_smithing_stones_7", "npc_quests_26_1", "remembrances_mausoleums_2_2", "achievements_2_1", "quest_order_tldr_161", "playthrough_12_10", "incantations_1_1", "flasks_1_4", "armor_254", "incantations_10_2", "armor_238", "armor_424", "paintings_6_1", "sorceries_4_20", "illusory_walls_1_1", "weapons_29_2", "sorceries_6_4", "armor_112", "quest_order_tldr_162", "armor_465", "weapons_33_10", "quest_order_tldr_257", "armor_317", "weapons_9_9", "armor_457", "sorceries_1_4", "weapons_34_21", "npc_quests_14_1", "playthrough_4_8", "weapons_34_20", "quest_order_tldr_118", "quest_order_tldr_49", "bosses_7_18", "armor_243", "cookbooks_1_3", "flasks_1_26", "playthrough_17_3", "talismans_1_6", "armor_357", "talismans_4_5", "weapons_22_10", "quest_order_tldr_24", "npc_quests_20_6", "bosses_4_8", "quest_order_tldr_191", "weapons_33_24", "talismans_5_4", "paintings_1_1", "sorceries_9_4", "gestures_3_1", "ashesofwar_6_1", "incantations_4_3", "playthrough_8_10", "weapons_19_1", "weapons_14_15", "cookbooks_3_6", "armor_552", "quest_order_tldr_237", "achievements_2_18", "talismans_5_13", "playthrough_8_2", "armor_302", "weapons_28_4", "incantations_8_2", "talismans_4_17", "ashesofwar_5_4", "npc_quests_16_2", "scrolls_prayerbooks_0_2", "crystal_tears_2_5", "weapons_11_1", "bosses_4_28", "weapons_33_2", "gestures_1_12", "quest_order_tldr_184", "pots_bottles_3_9", "quest_order_tldr_70", "ashesofwar_11_11", "armor_487", "ashesofwar_6_6", "cookbooks_5_7", "armor_441", "remembrances_mausoleums_1_4_2", "quest_order_tldr_247", "weapons_26_1", "weapons_34_18", "armor_164", "armor_391", "playthrough_8_3", "bosses_2_3", "weapons_34_24", "ashesofwar_8_5", "legacy_1_3", "incantations_3_7", "incantations_5_11", "quest_order_tldr_57", "armor_444", "quest_order_tldr_48", "npc_quests_1_5", "armor_60", "armor_197", "npc_quests_26_3", "caves_7_2", "weapons_33_4", "weapons_1_6", "armor_417", "caves_3_1", "spirit_ashes_4_9", "talismans_6_11", "cookbooks_7_2", "weapons_16_4", "paintings_4_1", "quest_order_tldr_16", "quest_order_tldr_135", "armor_303", "legendaries_2_4", "armor_231", "incantations_5_9", "flasks_1_24", "weapons_3_5", "armor_9", "weapons_34_16", "ashesofwar_5_14", "bosses_18_2", "bosses_5_14", "quest_order_tldr_242", "quest_order_tldr_233", "npc_quests_16_3", "remembrances_mausoleums_1_14_2", "weapons_5_8", "spirit_ashes_4_5", "armor_571", "weapons_22_11", "weapons_13_10", "bosses_4_13", "quest_order_tldr_6", "bosses_5_3", "bosses_5_12", "quest_order_tldr_77", "weapons_20_1", "armor_329", "flasks_2_10", "remembrances_mausoleums_1_8", "armor_304", "legacy_1_13", "bosses_4_10", "talismans_1_5", "quest_order_tldr_219", "dragon_hearts_death_roots_1_2", "npc_quests_19_5", "bosses_4_22", "caves_2_5", "bosses_8_6", "armor_387", "npc_quests_31_20_1", "playthrough_13_2", "npc_quests_21_4", "bosses_7_13", "npc_quests_23_3", "weapons_19_4", "talismans_2_10", "ashesofwar_11_2", "bosses_11_6", "armor_213", "quest_order_tldr_54", "achievements_2_16", "dragon_hearts_death_roots_0_2", "sorceries_9_1", "talismans_11_3", "flasks_1_21", "remembrances_mausoleums_1_14", "npc_quests_31_4", "armor_191", "cookbooks_3_3", "weapons_7_2", "talismans_6_6", "flasks_1_20", "armor_578", "ashesofwar_11_9", "armor_70", "caves_1_8", "armor_459", "armor_53", "legacy_1_6", "ashesofwar_4_1", "playthrough_16_2", "weapons_6_10", "armor_561", "armor_360", "talismans_8_3", "armor_14", "sorceries_2_2", "legendaries_2_5", "npc_quests_29_3_1", "weapons_19_11", "bosses_8_14", "armor_355", "sorceries_4_28_0", "armor_400", "bosses_7_19", "sorceries_12_3", "ashesofwar_13_4", "remembrances_mausoleums_1_8_2", "weapons_1_10", "cookbooks_7_4", "npc_quests_20_10", "weapons_1_3", "armor_208", "ancient_dragon_smithing_stones_20", "armor_64", "bosses_1_10", "weapons_15_1", "weapons_25_1", "playthrough_7_3", "playthrough_10_5", "armor_259", "weapons_12_2", "bosses_3_1", "incantations_4_8", "talismans_7_7", "incantations_12_6", "cookbooks_1_22", "npc_quests_3_7_1", "talismans_10_2", "npc_quests_14_3", "crystal_tears_7_1", "weapons_28_6", "evergaols_2_2", "weapons_3_9", "talismans_3_2", "cookbooks_2_2", "weapons_22_5", "ashesofwar_3_1", "weapons_1_11", "incantations_6_1", "weapons_3_2", "quest_order_tldr_147", "gestures_1_6", "armor_76", "bosses_5_6", "armor_133", "sorceries_4_13", "armor_103", "spirit_ashes_6_4", "weapons_1_5", "gestures_1_3", "remembrances_mausoleums_1_12_2", "armor_573", "npc_quests_15_3", "quest_order_tldr_216", "flasks_1_3", "armor_399", "playthrough_12_9", "bosses_2_5", "armor_566", "weapons_34_17", "incantations_11_4", "gestures_0_7", "npc_quests_31_15", "weapons_17_1", "weapons_3_16", "armor_567", "sorceries_4_12", "gestures_3_5", "quest_order_tldr_181", "quest_order_tldr_144", "pots_bottles_1_6", "illusory_walls_3_1", "weapons_18_4", "gestures_0_1", "weapons_28_8", "armor_416", "weapons_1_2", "playthrough_9_8", "weapons_14_9", "npc_quests_20_5", "ashesofwar_14_1", "playthrough_8_9", "weapons_6_7", "quest_order_tldr_165", "bosses_6_4", "quest_order_tldr_249", "playthrough_5_8", "flasks_2_9", "armor_461", "talismans_2_7", "bosses_2_26", "spirit_ashes_2_5", "bosses_8_1", "illusory_walls_1_8", "quest_order_tldr_14", "bosses_5_19", "pots_bottles_1_19", "incantations_2_4", "weapons_27_2", "caves_1_2", "quest_order_tldr_132", "illusory_walls_1_9", "talismans_5_7", "armor_406", "talismans_17_1", "incantations_4_10", "quest_order_tldr_88", "weapons_33_7", "memory_stones_talisman_pouches_1_2", "weapons_32_11", "dragon_hearts_death_roots_1_4", "weapons_13_11", "bosses_8_13", "armor_131", "cookbooks_4_1", "quest_order_tldr_260", "weapons_21_4", "bosses_12_3", "armor_186", "bosses_2_23", "bosses_8_11", "npc_quests_19_3", "weapons_19_8", "weapons_12_3", "playthrough_12_4", "talismans_4_9", "weapons_13_8", "armor_55", "caves_8_3", "armor_270", "armor_255", "achievements_2_17", "achievements_3_7", "npc_quests_21_2", "bell_bearings_4_3", "armor_321", "sorceries_8_3", "ashesofwar_8_7", "bosses_18_4", "quest_order_tldr_167", "flasks_1_9", "bosses_14_3", "weapons_13_3", "caves_1_5", "quest_order_tldr_81", "bosses_4_3", "incantations_4_9", "gestures_0_2", "npc_quests_9_4", "ashesofwar_13_3", "weapons_29_1", "weapons_14_3", "caves_1_1", "sorceries_4_24", "armor_438", "playthrough_10_6", "armor_13", "spirit_ashes_14_1", "remembrances_mausoleums_1_3", "talismans_10_3", "weapons_33_22", "incantations_4_2", "spirit_ashes_5_2", "bosses_2_12", "talismans_14_3", "bosses_9_4", "bosses_6_10", "quest_order_tldr_83", "caves_2_2", "npc_quests_15_6", "weapons_21_3", "playthrough_11_3", "armor_485", "npc_quests_20_5_1", "remembrances_mausoleums_1_8_1", "flasks_2_1", "ancient_dragon_smithing_stones_15", "armor_152", "weapons_16_1", "npc_quests_21_3", "armor_48", "quest_order_tldr_217", "weapons_15_5", "crystal_tears_2_7", "bosses_4_27", "armor_67", "armor_247", "armor_107", "playthrough_17_8", "npc_quests_4_1", "npc_quests_6_2", "scrolls_prayerbooks_1_1", "remembrances_mausoleums_1_3_1", "bosses_9_12", "scrolls_prayerbooks_1_3", "npc_quests_31_7", "crystal_tears_3_4", "armor_401", "armor_335", "weapons_5_6", "weapons_18_3", "armor_374", "armor_537", "weapons_34_9", "achievements_2_2", "flasks_1_6", "quest_order_tldr_151", "weapons_13_18", "cookbooks_5_5", "bosses_3_2", "quest_order_tldr_109", "npc_quests_21_1", "great_runes_2_4", "weapons_19_2", "achievements_2_20", "playthrough_9_4", "npc_quests_32_8", "gestures_1_9", "crystal_tears_3_3", "talismans_10_4", "armor_491", "cookbooks_1_2", "armor_80", "armor_297", "gestures_7_2", "gestures_1_4", "armor_470", "quest_order_tldr_176", "spirit_ashes_6_3", "ashesofwar_9_1", "armor_526", ]);
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
