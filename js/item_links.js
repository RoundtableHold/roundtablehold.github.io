(function($) {
  'use strict';
  $(function() {
    $("#bosses_2_1").click(function () {
      var checked = $(this).prop("checked");
      $("#caves_1_1").prop("checked", checked);
      window.onCheckbox("#caves_1_1");
    });
    $("#caves_1_1").click(function () {
      var checked = $(this).prop("checked");
      $("#bosses_2_1").prop("checked", checked);
      window.onCheckbox("#bosses_2_1");
    });
    $("#npc_quests_15_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_14_1").prop("checked", checked);
      window.onCheckbox("#npc_quests_14_1");
      $("#npc_quests_14_2").prop("checked", checked);
      window.onCheckbox("#npc_quests_14_2");
      $("#npc_quests_14_3").prop("checked", checked);
      window.onCheckbox("#npc_quests_14_3");
    });
    $("#npc_quests_31_14").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_15_1").prop("checked", checked);
      window.onCheckbox("#npc_quests_15_1");
      $("#npc_quests_15_2").prop("checked", checked);
      window.onCheckbox("#npc_quests_15_2");
      $("#npc_quests_15_3").prop("checked", checked);
      window.onCheckbox("#npc_quests_15_3");
      $("#npc_quests_15_4").prop("checked", checked);
      window.onCheckbox("#npc_quests_15_4");
    });
    $("#npc_quests_22_3").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_23_4").prop("checked", checked);
      window.onCheckbox("#npc_quests_23_4");
    });
    $("#npc_quests_23_4").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_22_3").prop("checked", checked);
      window.onCheckbox("#npc_quests_22_3");
    });
    $("#npc_quests_22_4").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_23_5").prop("checked", checked);
      window.onCheckbox("#npc_quests_23_5");
    });
    $("#npc_quests_23_5").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_22_4").prop("checked", checked);
      window.onCheckbox("#npc_quests_22_4");
    });
    $("#npc_quests_24_2_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_22_8").prop("checked", checked);
      window.onCheckbox("#npc_quests_22_8");
    });
    $("#npc_quests_33_3").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_34_5").prop("checked", checked);
      window.onCheckbox("#npc_quests_34_5");
    });
    $("#npc_quests_33_4").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_34_6").prop("checked", checked);
      window.onCheckbox("#npc_quests_34_6");
    });
    $("#npc_quests_33_5").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_32_8").prop("checked", checked);
      window.onCheckbox("#npc_quests_32_8");
    });
    $("#npc_quests_17_7").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_1_3").prop("checked", checked);
      window.onCheckbox("#npc_quests_1_3");
    });
    $("#npc_quests_17_9").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_30_1").prop("checked", checked);
      window.onCheckbox("#npc_quests_30_1");
      $("#npc_quests_30_2").prop("checked", checked);
      window.onCheckbox("#npc_quests_30_2");
      $("#npc_quests_30_3").prop("checked", checked);
      window.onCheckbox("#npc_quests_30_3");
      $("#npc_quests_30_4").prop("checked", checked);
      window.onCheckbox("#npc_quests_30_4");
    });
    $("#npc_quests_22_2").click(function () {
      var checked = $(this).prop("checked");
      $("#npc_quests_21_4").prop("checked", checked);
      window.onCheckbox("#npc_quests_21_4");
      $("#npc_quests_21_5").prop("checked", checked);
      window.onCheckbox("#npc_quests_21_5");
    });
  });
})( jQuery );
