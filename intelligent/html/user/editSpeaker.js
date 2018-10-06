(function() {

    _g.setNowPage('user/editSpeaker');
    $('#formContent').html(_g.getTemplate('user/editSpeaker-V'));


    var id = _g.pm.param.id;
    if(id) {
        $('.head').text('编辑主讲人');
        $('.speakerId').show();
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/speaker/queryDetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    var speaker = result.data.speaker;
                    $('#spid').val(speaker.id);
                    $('#spname').val(speaker.name);
                    $('.dropdown-label').text(speaker.gender === 0 ? '男' : '女');
                    if(speaker.imageUrl != '') {
                        $('#file').val(speaker.imageUrl);
                        $('#prePhoto').append("<img src='http://120.77.204.252:80/" + speaker.imageUrl +"' alt=''/>");
                    }
                    $('#spbrief').val(speaker.brief);
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
    // $form.append($(fileInput).clone());
    // $form.ajaxSubmit({
    //     url: '/admin/ajaxUpload.do',
    //     beforeSubmit: function() {
    //         $('#photoInput > input:file').filestyle('disabled', true);
    //         _g.setErrorAlert({
    //             type: 'success',
    //             errorText: '正在上传...'
    //         });
    //     },
    //     success: function(result) {
    //         setTimeout(function() {
    //             $('#photoInput > input:file').filestyle('disabled', false);
    //         }, 500);
    //         if (result.code == 200) {
    //             $('input[name="imgUrl"]').val(result.data.imgUrl);
    //             setTimeout(function() {
    //                 _g.removeAlert();
    //                 $('#prePhoto').html('<img src="' + result.data.imgUrl + '" style="width: 100px; height: 150;">');
    //             }, 500);
    //         } else {
    //             _g.setErrorAlert({
    //                 errorText: result.message
    //             });
    //         }
    //     }, //处理完成
    //     resetForm: true,
    //     type: 'post',
    //     dataType: 'json'
    // });

    submitSp = function(){
        var speaker = {
            id: id,
            name: $('spname').val(),
            brief: $('spbrief').val()
        }
        var url = 'http://120.77.204.252:80/speaker/save.do?token='+ token +'&uploadsign=speaker';

        var gender = $('.dropdown-label').text() === '性别'? '' : $('.dropdown-label').text() === '男' ? 0 : 1;
        var token = sessionStorage.getItem('token');
        var formData = new FormData($('.form-horizontal')[0]);
        formData.delete('id');
        formData.delete('d-s-r');
        formData.append('gender', gender);

        if(id){
            url = 'http://120.77.204.252:80/speaker/update.do';
        } 

        $.ajax({
            url: url,
            dataType:"json",
            type:"POST",
            async:false,
            contentType:false,
            processData:false,
            data: speaker,
            success: function(result) {
                if(result.code === 200) {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                    history.back();
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
                    content: '请求超时，请重试！',
                });
            }
        })
    }


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
        $('#prePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">');
    })
})();