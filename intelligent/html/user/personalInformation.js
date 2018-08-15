(function() {

    _g.setNowPage('user/personalInformation');

    $('#formContent').html(_g.getTemplate('user/personalInformation-V'));

    function getInformation() {
        _g.ajax({
            url: 'http://118.89.26.114/admin/queryAdministratorById.do',
            async: false,
            success: function(result) {
                if (result.code == 200) {
                    var id = result.data.admin.aid;
                    var name = result.data.admin.aname;
                    var username = result.data.admin.ano;
                    var institution = result.data.admin.aorganization;
                    var email = result.data.admin.aemail;
                    var phone = result.data.admin.amobile;
                    var state= result.data.admin.astatus;
                    var permission = '';
                    for(var i = 0; i < result.data.admin.permission.length; i++) {
                        permission += result.data.admin.permission[i].pdesc + '; ';
                    }
                    
                    $('#id').val(id);
                    $('#name').val(name);
                    $('#username').val(username);
                    $('#institution').val(institution);
                    $('#email').val(email);
                    $('#phone').val(phone);
                    $('#state').val(state);
                    $('#permission').val(permission);
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            if(result.msg.indexOf('请登录') != -1) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            }
                        }
                    });
                }
            }
        })
    }

    getInformation();

    $('#username').change(function() {
        var ano = $('#username').val();
        _g.ajax({
            url: 'http://118.89.26.114/manageAdmin/checkMRepeat.do',
            data: {
                ano: ano
            },
            success: function(result) {
                _g.setErrorAlert({
                    errorText: result.msg
                });
            }
        })
    })

    $('#submitBtn').click(function() {
        var ano = $('#username').val();
        var aname = $('#name').val();
        var aorganization = $('#institution').val();
        var amobile = $('#phone').val();
        var aemail =  $('#email').val();
        _g.ajax({
            url: 'http://118.89.26.114/admin/updateProfileById.do',
            data: {
                admin: {
                    ano:ano,
                    aname:aname,
                    aorganization:aorganization,
                    amobile:amobile,
                    aemail:aemail
                }
            },
            success: function(result) {
                if(result.code === 200) {
                    layer.open({
                        title: '消息',
                        content: '修改成功'
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: reslut.msg
                    });
                }
            }
        })
    })




})();