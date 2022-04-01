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
  });
})( jQuery );
