(function() {

    _g.setNowPage('user/addAdmin');

    $('#formContent').html(_g.getTemplate('user/addAdmin-V'));

    var id = _g.pm.param.id;
    var selectedPerminssion;

    if (id) {
        $('#header').text("编辑管理员");
        $('.hidePassword').hide();
        $('.admin').show();
        function getDetail() {
            _g.ajax({
                url: 'http://120.77.204.252:80/manageAdmin/queryDetail.do',
                data: {
                    id: id
                },
                success: function(result) {
                    if(result.code === 200) {
                        var administrator = result.data.administrator;
                        $('#id').val(administrator.id);
                        $('#username').val(administrator.account);
                        $('#status').val(administrator.status  === 0 ? '正常' : '冻结');
                        $('#name').val(administrator.name);
                        if(administrator.avatar) {
                            $('#file').val(administrator.avatar);
                            $('#prePhoto').append('<img src="http://120.77.204.252:80' + administrator.avatar +'" style="width：100px;height: 150px;"/>');
                        }                        
                        $('#institution').val(administrator.organization);
                        $('#mobile').val(administrator.mobile);
                        $('#email').val(administrator.email);
                        selectedPerminssion = administrator.permissionList;
                        _.each(administrator.permissionList,function(item,index) {
                            $('#selectedAuthority').append('<option value="' + item.id + '">' + item.describe + '</option>');
                        })
                    } else if(result.code === 1000){
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index){
                                layer.close(index);
                                window.location.href = '/signin.html';
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
        getDetail();
        function unassignedPerlist() {
            _g.ajax({
                url: 'http://120.77.204.252:80/manageAdmin/getPermissionListByAid.do',
                data: {
                    id: id
                },
                success: function(result) {
                    if(result.code === 200) {
                        var unassignedPerminssion = result.data.unassignedPerlist;
                        _.each(unassignedPerminssion,function(item,index) {
                            $('#allAuthority').append('<option value="' + item.id + '">' + item.describe + '</option>');
                        })
                    } else if(result.code === 1000){
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index){
                                layer.close(index);
                                window.location.href = '/signin.html';
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
        unassignedPerlist();
        $('#username').attr('disabled',true);
        $('#name').attr('disabled',true);
        $('#institution').attr('disabled',true);
        $('#mobile').attr('disabled',true);
        $('#email').attr('disabled',true); 
    } else {
        function getAuthority() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/manageAdmin/queryPermissionList.do',
            async: false,
            success: function(result) {
                if(result.code === 200) {
                    var permissionList = result.data.permissionList;
                    _.each(permissionList,function(item,index) {
                        $('#allAuthority').append('<option value="' + item.id + '">' + item.describe + '</option>');
                    })   
                } else if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = '/signin.html';
                        }
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                }
                
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
    }


    
    

    $('#allAuthority').change(function() {
        $('#allAuthority option:selected').appendTo('#selectedAuthority').attr('selected', false);
    })

    $('#selectedAuthority').change(function() {
        $('#selectedAuthority option:selected').appendTo('#allAuthority').attr('selected', false);
    })

    // $('#id').blur(function() {
    //    if(!/^(?!\d+$)[\da-zA-Z]+$/.test($(this).val()) || $(this).val().length < 5 || $(this).val().length > 20) {
    //         _g.setErrorAlert({
    //             errorText: '请输入5-20位英文或者英文和数字的组合'
    //         });
    //         $(this).val('');
    //    } else {
    //         $('#messageArea').html('');
    //    }
    // })

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
        var url = 'http://120.77.204.252:80/manageAdmin/save.do';
        var password = $('#password').val();
        var passwordSure = $('#passwordSure').val();
        var username = $('#username').val();
        var name = $('#name').val();
        var institution = $('#institution').val();
        var mobile = $('#mobile').val();
        var email = $('#email').val();  
        var authority = [];
        $('#selectedAuthority option').each(function() {
            var value = $(this).val();
            authority.push({id: value});
        })
        var data;
        if(id) {
            url = 'http://120.77.204.252:80/manageAdmin/update';
            data = {
                administrator: { 
                    id: id,
                    permissionList: authority
                }
            }
        } else {
            data = {
                administrator: { 
                    password: password,
                    account: username,
                    name: name,
                    mobile: mobile,
                    email: email,
                    organization: institution,
                    permissionList: authority
                }
            };
            if(username == '') {
            layer.open({
                title: '消息',
                content: '用户名不能为空！'
            });
            return
            }
            if(name == '') {
            layer.open({
                title: '消息',
                content: '姓名不能为空！'
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
        }   
        _g.ajax({
            lock: true,
            url: url,
            data: data,
            success: function(result) {
                if(result.code === 1000) {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = '/signin.html';
                        }
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg
                    })
                    if(result.code === 200) {
                        history.back(-1);
                    }
                }
                
            }
        })
    })


})();