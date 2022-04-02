(function($) {
  'use strict';
  $(function() {
    $("#bosses_2_1").click(function () {
      var checked = $(this).prop("checked");
      $("#caves_1_1").prop("checked", checked);
      $("#caves_1_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_1").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_19_11,#weapons_28_9").prop("checked", checked);
      $("#weapons_19_11,#weapons_28_9").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_2").click(function () {
      var checked = $(this).prop("checked");
      $("#sorceries_6_5,#weapons_29_10").prop("checked", checked);
      $("#sorceries_6_5,#weapons_29_10").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_3").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_5_6,#weapons_12_4").prop("checked", checked);
      $("#weapons_5_6,#weapons_12_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_4").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_19_10,#talismans_3_4").prop("checked", checked);
      $("#weapons_19_10,#talismans_3_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_5").click(function () {
      var checked = $(this).prop("checked");
      $("#ashesofwar_8_10,#weapons_21_5").prop("checked", checked);
      $("#ashesofwar_8_10,#weapons_21_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_6").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_6_6,#ashesofwar_5_7").prop("checked", checked);
      $("#weapons_6_6,#ashesofwar_5_7").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_7").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_5_3,#incantations_5_5").prop("checked", checked);
      $("#weapons_5_3,#incantations_5_5").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_8").click(function () {
      var checked = $(this).prop("checked");
      $("#sorceries_9_6,#weapons_14_18").prop("checked", checked);
      $("#sorceries_9_6,#weapons_14_18").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_9").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_27_6,#incantations_6_1").prop("checked", checked);
      $("#weapons_27_6,#incantations_6_1").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_10").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_8_9").prop("checked", checked);
      $("#weapons_8_9").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_11").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_16_4,#incantations_3_11").prop("checked", checked);
      $("#weapons_16_4,#incantations_3_11").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_12").click(function () {
      var checked = $(this).prop("checked");
      $("#incantations_4_6,#incantations_4_3").prop("checked", checked);
      $("#incantations_4_6,#incantations_4_3").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_13").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_20_15,#weapons_14_21").prop("checked", checked);
      $("#weapons_20_15,#weapons_14_21").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_14").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_17_8,#incantations_11_4").prop("checked", checked);
      $("#weapons_17_8,#incantations_11_4").each(function(idx, el) {window.onCheckbox(el)});
    });
    $("#remembrances_mausoleums_1_15").click(function () {
      var checked = $(this).prop("checked");
      $("#weapons_24_6,#incantations_2_1").prop("checked", checked);
      $("#weapons_24_6,#incantations_2_1").each(function(idx, el) {window.onCheckbox(el)});
    });
  });
})( jQuery );
