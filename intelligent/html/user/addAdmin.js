(function() {

    _g.setNowPage('user/addAdmin');
    $('#formContent').html(_g.getTemplate('user/addAdmin-V'));


    $('#allAuthority').change(function() {
        $('#allAuthority option:selected').appendTo('#selectedAuthority').attr('selected', false);
    })

    $('#selectedAuthority').change(function() {
        $('#selectedAuthority option:selected').appendTo('#allAuthority').attr('selected', false);
    })

    $('#passwordSure').blur(function() {
        if ($(this).val() !== $('#password').val()) {
            _g.setErrorAlert({
                errorText: '密码不一致'
            });
            $('#password').val('');
            $(this).val('');
            $('#password').focus();
        }

    })


})();