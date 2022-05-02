(function($) {
    'use strict';
    
    jQuery(document).ready(function($) {
        // Get the right style going...
    
        function updateTextbox() {
            document.getElementById("profileText").value = JSON.stringify(profiles);
        }

        // Theme callback
        $('#themes').change(function(event) {
            profiles = $.jStorage.get(profilesKey, {});
            var stylesheet = $('#themes').val();
            window.themeSetup(stylesheet);
            profiles[profilesKey][profiles.current].style = stylesheet;
            $.jStorage.set(profilesKey, profiles);
            reload();
        });

        $('#profiles').change(function(event) {
            profiles = $.jStorage.get(profilesKey, {});
            profiles.current = $(this).val();
            $.jStorage.set(profilesKey, profiles);
            reload();

            $('li .checkbox .completed').show();
        });

        $('#profileAdd').click(function() {
            $('#profileModalTitle').html('Add Profile');
            $('#profileModalName').val('');
            $('#profileModalAdd').show();
            $('#profileModalUpdate').hide();
            $('#profileModalDelete').hide();
            $('#profileModal').modal('show');
        });

        $('#profileEdit').click(function() {
            $('#profileModalTitle').html('Edit Profile');
            $('#profileModalName').val(profiles.current);
            $('#profileModalAdd').hide();
            $('#profileModalUpdate').show();
            if (canDelete()) {
                $('#profileModalDelete').show();
            } else {
                $('#profileModalDelete').hide();
            }
            $('#profileModal').modal('show');
        });

        function profileAddSubmit() {
            profiles = $.jStorage.get(profilesKey, {});
            var profile = $.trim($('#profileModalName').val());
            if (profile.length > 0) {
                initializeProfile(profile);

                profiles.current = profile;
                $.jStorage.set(profilesKey, profiles);
                reload();
                populateProfiles();
            }

        }

        $('#profileModalAdd').click(function(event) {
            profileAddSubmit();
        });

        $('#profileModalName').on('keypress', function (e) {
            if (e.which === 13) {
                $(this).attr('disabled', 'disabled');
                profileAddSubmit();
            }
        })

        $('#profileModalUpdate').click(function(event) {
            profiles = $.jStorage.get(profilesKey, {});
            event.preventDefault();
            var newName = $.trim($('#profileModalName').val());
            if (newName.length > 0 && newName != profiles.current) {
                profiles[profilesKey][newName] = profiles[profilesKey][profiles.current];
                delete profiles[profilesKey][profiles.current];
                profiles.current = newName;
                $.jStorage.set(profilesKey, profiles);
                populateProfiles();
                reload();
            }
            $('#profileModal').modal('hide');
        });

        $('#profileModalDelete').click(function(event) {
            $('#deleteModal').show();
        });

        $('#deleteYes').click(function(event) {
            $('#deleteModal').hide();
            profiles = $.jStorage.get(profilesKey, {});
            event.preventDefault();
            if (!canDelete()) {
                myalert('Failed to delete', 'danger');
                return;
            }
            delete profiles[profilesKey][profiles.current];
            profiles.current = getFirstProfile();
            $.jStorage.set(profilesKey, profiles);
            populateProfiles();
            $('#profileModal').modal('hide');
            reload();
            myalert('Successfully deleted profile', 'success');
        })

        $('#profileNG\\+').click(function() {
            $('#NG\\+Modal').modal('show');
        });

        $('#NG\\+ModalYes').click(function(event) {
            profiles = $.jStorage.get(profilesKey, {});
            event.preventDefault();
            $('[id^="playthrough_"], [id^="npc_quests_"], [id^="bosses_"], [id^="legacy_"], [id^="caves_"], [id^="evergaols_"], [id^="paintings"]').filter(':checked').each(function(){
                profiles[profilesKey][profiles.current].checklistData[this.id] = false;
            });
            if (profiles[profilesKey][profiles.current].journey < 3) {
                profiles[profilesKey][profiles.current].journey++;
            }
            $.jStorage.set(profilesKey, profiles);
            $('#NG\\+Modal').modal('hide');
            reload();
            myalert("NG+ Started", 'success');
        });

        $('#profileExport').click(function(){
            var filename = 'profiles.json';
            var text = JSON.stringify(profiles);
            if (window.Blob && window.navigator.msSaveBlob) {
                // Microsoft browsers (https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/html5/file-api/blob)
                var blob = new window.Blob([text]);
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // All other modern browsers
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        });

        $('#profileImport').click(function(){
          $('#fileInput').trigger('click');
        });
        /* Will reject if an incorrect file or no file is selected */
        $('input#fileInput').change(function(){
          var fileInput = document.getElementById('fileInput');
          if(!fileInput.files || !fileInput.files[0] || !/\.json$/.test(fileInput.files[0].name)){
              myalert('Bad input file. File should end in .json', 'danger')
              return;
          }
          var fr = new FileReader();
          fr.readAsText(fileInput.files[0]);
          fr.onload = dataLoadCallback;
        });
        
        function myalert(message, type) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert"</button></div>'
            
            $('#alert-div').append(wrapper);
        }

        /*
        *  Import & Export using textarea instead of files
        */
        $('#profileExportText').click(function(){
            document.getElementById("profileText").value = JSON.stringify(profiles);
            document.getElementById("profileText").select();
            document.execCommand("copy");
        });

        $('#profileImportText').click(function(){
            $('#importTextModal').modal('show');
        });

        $('#importTextYes').click(function() {
            $('#importTextModal').modal('hide');
            profiles = $.jStorage.get(profilesKey, {});
            try {
                var jsonProfileData = JSON.parse(document.getElementById("profileText").value);
                profiles = jsonProfileData;
                $.jStorage.set(profilesKey, profiles);
                reload();
            } catch(e) {
                myalert(e, 'danger');
                return;
            }

            myalert('Successfully imported', 'success');
        });

        function dataLoadCallback(arg){
            console.log('dataloadcallback')
            profiles = $.jStorage.get(profilesKey, {});
            var jsonProfileData = JSON.parse(arg.currentTarget.result);
            profiles = jsonProfileData;
            $.jStorage.set(profilesKey, profiles);
            populateProfiles();
            $('#profiles').trigger("change");
            reload();
            myalert('Successfully imported', 'success');
        }

        function reload() {
            window.themeSetup(buildThemeSelection());
            populateProfiles();
            updateTextbox();
        }

        reload();

    });

    function buildThemeSelection() {
        var style = profiles[profilesKey][profiles.current].style;
        var themeSelect = $("#themes");
        $.each(themes, function(key, value){
            themeSelect.append(
                $('<option></option>').val(key).html(key + " Theme")
            );
        });
        themeSelect.val(style);
        return style;
    }

    function populateProfiles() {
        $('#profiles').empty();
        $.each(profiles[profilesKey], function(index, value) {
            $('#profiles').append($("<option></option>").attr('value', index).text(index));
        });
        $('#profiles').val(profiles.current);
    }
    
    function canDelete() {
        var count = 0;
        $.each(profiles[profilesKey], function(index, value) {
            count++;
        });
        return (count > 1);
    }

    function getFirstProfile() {
        for (var profile in profiles[profilesKey]) {
            return profile;
        }
    }

})(jQuery);