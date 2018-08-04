(function() {

    _g.setNowPage('user/personalInformation');

    $('#formContent').html(_g.getTemplate('user/personalInformation-V'));

    function getInformation() {
        $.ajax({
            url: 'http://118.89.26.114/admin/queryAdministratorById.do',
            type: 'GET',
            contentType: 'application/json',
            processData: false,
            dataType: 'json',
            data: {token: sessionStorage.token},
            success: function(result) {
                if (result.code == 200) {
                    var id = result.data.aid;
                    var name = result.data.aname;
                    var username = result.data.ano;
                    var institution = result.data.aorganization;
                    var email = result.data.aemail;
                    var phone = result.data.amobile;
                    var state= result.data.astatus;
                    var permission = result.data.permission;
                    $('#id').val(id);
                    $('#name').val(name);
                    $('#username').val(username);
                    $('#institution').val(institution);
                    $('#email').val(email);
                    $('#phone').val(phone);
                    $('#state').val(state);
                    $('#permisson').val(permission);
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