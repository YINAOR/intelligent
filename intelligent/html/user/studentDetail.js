(function() {

    _g.setNowPage('user/seudentDetail');

    $('#formContent').html(_g.getTemplate('user/studentDetail-V'));
    

    function getInformation() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/manageStudent/queryDetail.do',
            async: false,
            data: {

            },
            success: function(result) {
                if (result.code == 200) {
                    var id = result.data.administrator.id;
                    var name = result.data.administrator.name;
                    username = result.data.administrator.account;
                    var institution = result.data.administrator.organization;
                    var email = result.data.administrator.email;
                    var phone = result.data.administrator.mobile;
                    var state = result.data.administrator.status;
                    var permission = '';
                    for (var i = 0; i < result.data.administrator.permissionList.length; i++) {
                        permission += result.data.administrator.permissionList[i].describe + '; ';
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
                        yes: function(index) {
                            if (result.msg.indexOf('请登录') != -1) {
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




})();