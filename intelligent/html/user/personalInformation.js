(function() {

    _g.setNowPage('user/personalInformation');

    $('#formContent').html(_g.getTemplate('user/personalInformation-V'));
    var firstFileName;

    function getInformation() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/admin/queryProfile.do',
            // url: 'http://lai.vipgz1.idcfengye.com/admin/queryProfile.do',
            async: false,
            success: function(result) {
                if (result.code == 200) {
                    var id = result.data.administrator.id;
                    var name = result.data.administrator.name;
                    var username = result.data.administrator.account;
                    var avatar = result.data.administrator.avatar;
                    
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
                    if(avatar) {
                        $('#file').val(avatar);
                        $('#prePhoto').append('<img src="http://120.77.204.252:80' + avatar +'" style="width：100px;height: 100px;"/>');
                        firstFileName = avatar;
                    } else {
                        firstFileName = '';
                    }
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

    $('#submitBtn').click(function() {
        var token = sessionStorage.getItem('token');
        var formData = new FormData($('.form-horizontal')[0]);
        var i = formData.entries();
        console.log(firstFileName)
        console.log($('#file').val())
        console.log(firstFileName == $('#file').val())
        if(firstFileName == $('#file').val()) {
            formData.delete('imagefile');
        }

            $.ajax({
                url: 'http://120.77.204.252:80/admin/updateProfile.do?token='+ token +'&uploadsign=administrator',
                dataType:"json",
                type:"POST",
                async:false,
                contentType:false,
                processData:false,
                data: formData,
                success: function(result) {
                    _g.hideLoading();
                    if(result.code === 200) {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                        });
                        history.back();
                        if(firstFileName != $('#file').val()) {
                            var url;
                            var file = $('input[type="file"]')[0].files[0];
                            if (window.createObjectURL != undefined) { // basic
                                url = window.createObjectURL(file);
                            }else if (window.URL != undefined) { // mozilla(firefox)
                                url = window.URL.createObjectURL(file);
                             } else if (window.webkitURL != undefined) { // webkit or chrome
                                url = window.webkitURL.createObjectURL(file);
                            }
                            $('#avatarImage').attr('src',url);
                        }
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
                    _g.hideLoading();
                    layer.open({
                       title: '消息',
                       content: '请求超时，请重试！',
                    });
                } 
            })
    })

     $('input[type="file"]').change(function() {
        $('#file').val($('input[type="file"]').val().substring($('input[type="file"]').val().lastIndexOf('\\') + 1));
        var url;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(this.files[0]);
        }else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(this.files[0]);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(this.files[0]);
        }
        $('#prePhoto').html('<img src="'+ url +'" style="width: 100px; height:100px">');
    })


})();