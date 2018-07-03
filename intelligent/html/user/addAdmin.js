(function() {

    _g.setNowPage('user/addAdmin');
    
    var id = _g.pm.param.id;

    if(id) {
        console.log($('#header1').text());
    }

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

    $('#submitBtn').click(function() {
        var id = $('#id').val();
        var password = $('#password').val();
        var institution = $('#institution').val();
        var authority = [];
        $('#selectedAuthority option').each(function() {
            var value = $(this).val();
            authority.push(value);
        })
        
    })


})();