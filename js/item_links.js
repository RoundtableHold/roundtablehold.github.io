(function($) {
  'use strict';
  $(function() {
    $("#bosses_2_1").click(function () {
      var checked = $(this).prop("checked");
      $("#caves_1_1").prop("checked", checked);
      $("#caves_1_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#caves_1_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_1").prop("checked", checked);
      $("#bosses_2_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#playthrough_1_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_3_1,#npc_quests_32_1").prop("checked", checked);
      $("#npc_quests_3_1,#npc_quests_32_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#playthrough_1_3").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_3_2").prop("checked", checked);
      $("#npc_quests_3_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_15_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_14_1,#npc_quests_14_2,#npc_quests_14_3").prop("checked", checked);
      $("#npc_quests_14_1,#npc_quests_14_2,#npc_quests_14_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_31_14").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_15_1,#npc_quests_15_2,#npc_quests_15_3,#npc_quests_15_4").prop("checked", checked);
      $("#npc_quests_15_1,#npc_quests_15_2,#npc_quests_15_3,#npc_quests_15_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_22_3").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_23_4").prop("checked", checked);
      $("#npc_quests_23_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_23_4").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_22_3").prop("checked", checked);
      $("#npc_quests_22_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_22_4").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_23_5").prop("checked", checked);
      $("#npc_quests_23_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_23_5").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_22_4").prop("checked", checked);
      $("#npc_quests_22_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_24_2_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_22_8").prop("checked", checked);
      $("#npc_quests_22_8").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_33_3").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_34_5").prop("checked", checked);
      $("#npc_quests_34_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_33_4").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_34_6").prop("checked", checked);
      $("#npc_quests_34_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_33_5").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_32_8").prop("checked", checked);
      $("#npc_quests_32_8").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_17_7").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_1_3").prop("checked", checked);
      $("#npc_quests_1_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_17_9").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_30_1,#npc_quests_30_2,#npc_quests_30_3,#npc_quests_30_4").prop("checked", checked);
      $("#npc_quests_30_1,#npc_quests_30_2,#npc_quests_30_3,#npc_quests_30_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#npc_quests_22_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_21_4,#npc_quests_21_5").prop("checked", checked);
      $("#npc_quests_21_4,#npc_quests_21_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_5").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_2_2").prop("checked", checked);
      $("#talismans_2_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_2_2").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_5").prop("checked", checked);
      $("#bosses_2_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_4").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_2_3").prop("checked", checked);
      $("#talismans_2_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_2_3").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_4").prop("checked", checked);
      $("#bosses_2_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_9").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_2_13").prop("checked", checked);
      $("#talismans_2_13").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_2_13").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_9").prop("checked", checked);
      $("#bosses_2_9").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_21").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_2_17").prop("checked", checked);
      $("#talismans_2_17").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_2_17").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_21").prop("checked", checked);
      $("#bosses_2_21").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_10").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_2_18").prop("checked", checked);
      $("#talismans_2_18").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_2_18").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_10").prop("checked", checked);
      $("#bosses_2_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_1_10").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_1_6").prop("checked", checked);
      $("#talismans_1_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_1_6").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_1_10").prop("checked", checked);
      $("#bosses_1_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_17").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_4_1").prop("checked", checked);
      $("#talismans_4_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_4_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_17").prop("checked", checked);
      $("#bosses_4_17").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_37").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_4_6").prop("checked", checked);
      $("#talismans_4_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_1").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_4_10").prop("checked", checked);
      $("#talismans_4_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_8").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_4_13").prop("checked", checked);
      $("#talismans_4_13").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_26").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_4_17").prop("checked", checked);
      $("#talismans_4_17").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_4_6").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_37").prop("checked", checked);
      $("#bosses_4_37").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_4_10").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_1").prop("checked", checked);
      $("#bosses_4_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_4_13").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_8").prop("checked", checked);
      $("#bosses_4_8").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_4_17").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_26").prop("checked", checked);
      $("#bosses_4_26").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_5_14").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_5_2").prop("checked", checked);
      $("#talismans_5_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_5_21").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_5_7").prop("checked", checked);
      $("#talismans_5_7").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_6_1").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_6_5").prop("checked", checked);
      $("#talismans_6_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_7_4").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_6_10").prop("checked", checked);
      $("#talismans_6_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_7_13").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_7_5").prop("checked", checked);
      $("#talismans_7_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_8_3").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_8_1").prop("checked", checked);
      $("#talismans_8_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_5_2").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_5_14").prop("checked", checked);
      $("#bosses_5_14").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_5_7").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_5_21").prop("checked", checked);
      $("#bosses_5_21").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_6_5").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_6_1").prop("checked", checked);
      $("#bosses_6_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_6_10").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_7_4").prop("checked", checked);
      $("#bosses_7_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_7_5").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_7_13").prop("checked", checked);
      $("#bosses_7_13").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#talismans_8_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_8_3").prop("checked", checked);
      $("#bosses_8_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_28").prop("checked", checked);
      $("#bosses_2_28").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_2").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_1_11").prop("checked", checked);
      $("#bosses_1_11").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_3").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_35").prop("checked", checked);
      $("#bosses_4_35").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_4").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_36,#great_runes_1_2").prop("checked", checked);
      $("#bosses_4_36,#great_runes_1_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_5").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_27").prop("checked", checked);
      $("#bosses_4_27").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_6").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_33").prop("checked", checked);
      $("#bosses_4_33").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_7").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_13_2").prop("checked", checked);
      $("#bosses_13_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_8").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_14_1").prop("checked", checked);
      $("#bosses_14_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_9").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_8_17").prop("checked", checked);
      $("#bosses_8_17").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_10").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_16_1").prop("checked", checked);
      $("#bosses_16_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_11").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_17_2").prop("checked", checked);
      $("#bosses_17_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_12").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_14_2").prop("checked", checked);
      $("#bosses_14_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_13").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_14_3").prop("checked", checked);
      $("#bosses_14_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_14").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_7_8").prop("checked", checked);
      $("#bosses_7_8").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_15").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_7_23").prop("checked", checked);
      $("#bosses_7_23").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_16").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_9_9").prop("checked", checked);
      $("#bosses_9_9").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_17").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_9_15").prop("checked", checked);
      $("#bosses_9_15").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_18").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_11_2").prop("checked", checked);
      $("#bosses_11_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_19").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_10_10").prop("checked", checked);
      $("#bosses_10_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_20").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_11_6").prop("checked", checked);
      $("#bosses_11_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_21").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_12_2").prop("checked", checked);
      $("#bosses_12_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_22").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_8_16").prop("checked", checked);
      $("#bosses_8_16").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_23").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_11_5").prop("checked", checked);
      $("#bosses_11_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_2_24").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_18_4").prop("checked", checked);
      $("#bosses_18_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_1_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_29,#great_runes_1_1").prop("checked", checked);
      $("#bosses_2_29,#great_runes_1_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_1_2").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_5_27,#great_runes_1_3").prop("checked", checked);
      $("#bosses_5_27,#great_runes_1_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_1_3").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_8_18,#great_runes_1_4").prop("checked", checked);
      $("#bosses_8_18,#great_runes_1_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_1_4").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_7_26,#great_runes_1_5").prop("checked", checked);
      $("#bosses_7_26,#great_runes_1_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_1_5").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_15_3,#great_runes_1_7").prop("checked", checked);
      $("#bosses_15_3,#great_runes_1_7").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_1_6").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_10_11,#great_runes_1_6").prop("checked", checked);
      $("#bosses_10_11,#great_runes_1_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_28").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_1").prop("checked", checked);
      $("#achievements_2_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_1_11").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_2").prop("checked", checked);
      $("#achievements_2_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_35").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_3").prop("checked", checked);
      $("#achievements_2_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_36").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_4,#great_runes_1_2").prop("checked", checked);
      $("#achievements_2_4,#great_runes_1_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_27").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_5").prop("checked", checked);
      $("#achievements_2_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_4_33").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_6").prop("checked", checked);
      $("#achievements_2_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_13_2").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_7").prop("checked", checked);
      $("#achievements_2_7").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_14_1").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_8").prop("checked", checked);
      $("#achievements_2_8").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_8_17").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_9").prop("checked", checked);
      $("#achievements_2_9").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_16_1").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_10").prop("checked", checked);
      $("#achievements_2_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_17_2").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_11").prop("checked", checked);
      $("#achievements_2_11").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_14_2").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_12").prop("checked", checked);
      $("#achievements_2_12").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_14_3").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_13").prop("checked", checked);
      $("#achievements_2_13").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_7_8").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_14").prop("checked", checked);
      $("#achievements_2_14").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_7_23").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_15").prop("checked", checked);
      $("#achievements_2_15").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_9_9").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_16").prop("checked", checked);
      $("#achievements_2_16").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_9_15").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_17").prop("checked", checked);
      $("#achievements_2_17").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_11_2").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_18").prop("checked", checked);
      $("#achievements_2_18").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_10_10").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_19").prop("checked", checked);
      $("#achievements_2_19").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_11_6").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_20").prop("checked", checked);
      $("#achievements_2_20").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_12_2").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_21").prop("checked", checked);
      $("#achievements_2_21").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_8_16").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_22").prop("checked", checked);
      $("#achievements_2_22").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_11_5").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_23").prop("checked", checked);
      $("#achievements_2_23").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_18_4").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_2_24").prop("checked", checked);
      $("#achievements_2_24").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_2_29").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_1_1,#great_runes_1_1").prop("checked", checked);
      $("#achievements_1_1,#great_runes_1_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_5_27").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_1_2,#great_runes_1_3").prop("checked", checked);
      $("#achievements_1_2,#great_runes_1_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_8_18").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_1_3,#great_runes_1_4").prop("checked", checked);
      $("#achievements_1_3,#great_runes_1_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_7_26").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_1_4,#great_runes_1_5").prop("checked", checked);
      $("#achievements_1_4,#great_runes_1_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_15_3").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_1_5,#great_runes_1_7").prop("checked", checked);
      $("#achievements_1_5,#great_runes_1_7").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#bosses_10_11").click(function () {
      var checked = $(this).prop("checked");
      $("#achievements_1_6,#great_runes_1_6").prop("checked", checked);
      $("#achievements_1_6,#great_runes_1_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_29,#achievements_1_1").prop("checked", checked);
      $("#bosses_2_29,#achievements_1_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_2").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_4_36,#achievements_2_4").prop("checked", checked);
      $("#bosses_4_36,#achievements_2_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_3").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_5_27,#achievements_1_2").prop("checked", checked);
      $("#bosses_5_27,#achievements_1_2").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_4").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_8_18,#achievements_1_3").prop("checked", checked);
      $("#bosses_8_18,#achievements_1_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_5").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_7_26,#achievements_1_4").prop("checked", checked);
      $("#bosses_7_26,#achievements_1_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_6").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_10_11,#achievements_1_6").prop("checked", checked);
      $("#bosses_10_11,#achievements_1_6").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#great_runes_1_7").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_15_3,#achievements_1_5").prop("checked", checked);
      $("#bosses_15_3,#achievements_1_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_3_5").click(function () {
      var checked = $(this).prop("checked");
      $("#incantations_6_2,#incantations_3_9,#incantations_5_8,#sorceries_12_3,#sorceries_5_3,#sorceries_9_4,#sorceries_8_8,#legendaries_4_1,#legendaries_4_2,#legendaries_4_3,#legendaries_4_4,#legendaries_5_1,#legendaries_5_2,#legendaries_5_3").prop("checked", checked);
      $("#incantations_6_2,#incantations_3_9,#incantations_5_8,#sorceries_12_3,#sorceries_5_3,#sorceries_9_4,#sorceries_8_8,#legendaries_4_1,#legendaries_4_2,#legendaries_4_3,#legendaries_4_4,#legendaries_5_1,#legendaries_5_2,#legendaries_5_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#achievements_3_6").click(function () {
      var checked = $(this).prop("checked");
      $("#talismans_4_4,#talismans_5_5,#talismans_6_5,#talismans_17_1,#talismans_10_8,#talismans_10_4,#talismans_11_3,#talismans_12_2,#legendaries_2_1,#legendaries_2_2,#legendaries_2_3,#legendaries_2_4,#legendaries_2_5,#legendaries_2_6,#legendaries_2_7,#legendaries_2_8").prop("checked", checked);
      $("#talismans_4_4,#talismans_5_5,#talismans_6_5,#talismans_17_1,#talismans_10_8,#talismans_10_4,#talismans_11_3,#talismans_12_2,#legendaries_2_1,#legendaries_2_2,#legendaries_2_3,#legendaries_2_4,#legendaries_2_5,#legendaries_2_6,#legendaries_2_7,#legendaries_2_8").each(function(idx, el) {window.onCheckbox(el)});
    });
  });
})( jQuery );
