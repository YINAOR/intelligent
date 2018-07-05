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
            async: false,
            type: 'post',
            contentType: 'application/json',
            processData: false,
            data: {},
            success: function(data) {
                _.each(data,function(item,index) {
                    $('#allAuthority').append('<option value="' + item.pid + '">' + item.pdesc + '</option>');
                })
            },
            error: function(error) {
                layer.open({
                    title: '消息',
                    content: '请求超时，无法获取权限列表，请重试！'
                });
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

    $('#id').blur(function() {
       if(!/^(?!\d+$)[\da-zA-Z]+$/.test($(this).val()) || $(this).val().length < 5 || $(this).val().length > 20) {
            _g.setErrorAlert({
                errorText: '请输入5-20位英文或者英文和数字的组合'
            });
            $(this).val('');
            $(this).focus();
       } else {
            $('#messageArea').html('');
       }
    })

    $('#password').blur(function() {
        if(!/^[\d_a-zA-Z]{10,20}$/.test($(this).val())) {
            _g.setErrorAlert({
                errorText: '请输入10-20位字母、数字或者下划线的组合'
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
        var passwordSure = $('#passwordSure').val();
        var username = $('#username').val();
        var institution = $('#institution').val();
        var authority = [];
        $('#selectedAuthority option').each(function() {
            var value = $(this).val();
            authority.push({pid: value});
        })
        if(id == '') {
            layer.open({
                title: '消息',
                content: '管理员账号不能为空！'
            });
            return
        }
        if(password == '') {
            layer.open({
                title: '消息',
                content: '密码不能为空！'
            });
            return
        }
        if(passwordSure == '') {
            layer.open({
                title: '消息',
                content: '请先确认密码！'
            });
            return
        }
        if(username == '') {
            layer.open({
                title: '消息',
                content: '用户名不能为空！'
            });
            return
        }
        $.ajax({
            url: 'http://118.89.26.114/manageAdmin/saveAdmin.do',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify({
                ano: id,
                apwd: password,
                aname: username,
                aorganization: institution,
                permission: authority
            }),
            success: function(data) {
                layer.open({
                    title: '消息',
                    content: data
                })
                if(data.indexOf('成功') != -1) {
                    _g.openWin('user/admin');
                }
            }
        })
    })


})();