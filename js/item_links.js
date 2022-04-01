(function($) {
  'use strict';
  $(function() {
    $("#bosses_2_1").click(function () {
      var checked = $(this).prop("checked");
      $("#caves_1_1").prop("checked", checked);
      $("#caves_1_1").each(function(idx, el) {window.onCheckbox(el)});
    });
  });
})( jQuery );
