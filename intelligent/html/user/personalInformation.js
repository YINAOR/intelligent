(function() {

    _g.setNowPage('user/personalInformation');

    $('#formContent').html(_g.getTemplate('user/personalInformation-V'));

    var username;

    function getInformation() {
        _g.ajax({
            lock: true,
            // type: 'get',
            url: 'http://120.77.204.252:80/admin/queryProfile.do',
            // url: 'http://lai.vipgz1.idcfengye.com/admin/queryProfile.do',
            async: false,
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

    function checkUserName() {
        var account = $('#username').val();
        _g.ajax({
            url: 'http://120.77.204.252:80/admin/checkRepeat.do',
            data: {
                account: account
            },
            success: function(result) {
                if(result.code === 200) {
                    if (result.msg.indexOf('用户名已存在') != -1) {
                        _g.setErrorAlert({
                            errorText: result.msg
                        });
                    } else if (result.msg.indexOf('可用') != -1) {
                        $('#messageArea').html('');
                    }
                } else if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
                            // if (result.msg.indexOf('请登录') != -1) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            // }
                        }
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                }
            }
        })
    }

    function debounce() {
        var timer = null;
        return function() {
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(checkUserName,1000);
        }
    }

    document.getElementById('username').addEventListener('keyup', debounce());

    // $('#username').keyup(function() {
    //     debounce();
    // });

    $('#submitBtn').click(function() {
        var ano = $('#username').val();
        var aname = $('#name').val();
        var aorganization = $('#institution').val();
        var amobile = $('#phone').val();
        var aemail = $('#email').val();
        _g.ajax({
            url: 'http://120.77.204.252:80/admin/updateProfile.do',
            data: {
                administrator: {
                    account: ano,
                    name: aname,
                    organization: aorganization,
                    mobile: amobile,
                    email: aemail
                }
            },
            success: function(result) {
                if (result.code === 200) {
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