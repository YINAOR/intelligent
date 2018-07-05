(function() {

    _g.setNowPage('user/addAdmin');

    $('#formContent').html(_g.getTemplate('user/addAdmin-V'));

    var id = _g.pm.param.id;

    if (id) {
        $('#header').text("编辑管理员");
    }

    function getAuthority() {
        $.ajax({
            url: 'http://118.89.26.114/manageAdmin/queryAllPermission.do',
            dataType:'json',
            type: 'post',
            contentType: 'application/json',
            processData: false,
            data: {},
            success: function(data) {
                _.each(data,function(item,index) {
                    $('#allAuthority').append('<option value="' + item.pid + '">' + item.pdesc + '</option>');
                })
            }

        })
    }
    getAuthority();

    $('#allAuthority').change(function() {
        $('#allAuthority option:selected').appendTo('#selectedAuthority').attr('selected', false);
    })

    $('#selectedAuthority').change(function() {
        $('#selectedAuthority option:selected').appendTo('#allAuthority').attr('selected', false);
    })

    $('#password').blur(function() {
        if($(this).val().length < 6) {
            _g.setErrorAlert({
                errorText: '请输入6位以上密码'
            });
            $('#password').val('');
            $('#password').focus();
        } else {
            $('#messageArea').html('');
        }
    })

    $('#passwordSure').blur(function() {
        if ($(this).val() !== $('#password').val()) {
            _g.setErrorAlert({
                errorText: '密码不一致'
            });
            $('#password').val('');
            $(this).val('');
            $('#password').focus();
        } else {
            $('#messageArea').html('');
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
        if(id == '') {
            alert('管理员账号不能为空！');
        }

    })


})();