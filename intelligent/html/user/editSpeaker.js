(function() {

    _g.setNowPage('user/editSpeaker');
    $('#formContent').html(_g.getTemplate('user/editSpeaker-V'));

    
    var id = _g.pm.param.id;
    var firstFileName;
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
                    $('#gender li input[value='+ speaker.gender +']').parent().addClass('active');
                    $('.dropdown-label').text(speaker.gender === 0 ? '男' : '女');
                    firstFileName = speaker.imageUrl;
                    if(speaker.imageUrl != '') {
                        $('#file').val(speaker.imageUrl);
                        $('#prePhoto').append('<img src="http://120.77.204.252:80' + speaker.imageUrl +'" style="width：100px;height: 150px;"/>');
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
        $('#messageArea').html('');
        var gender = $('#gender .active input').val();
        if(gender && $('#spname').val() && $('#spbrief').val()) {
            var token = sessionStorage.getItem('token');
            var url = 'http://120.77.204.252:80/speaker/save.do?token='+ token +'&uploadsign=speaker';
            var formData = new FormData($('.form-horizontal')[0]);

            if(!id) {
                formData.delete('id');
            }
            formData.delete('d-s-r');
            formData.append('gender', gender);
            if(id){
                url = 'http://lai.vipgz1.idcfengye.com/intelligent/speaker/update.do?token='+ token +'&uploadsign=speaker';
                formData.append('id', id);
                if(firstFileName == $('#file').val()) {
                    formData.delete('imagefile');
                }
            } 
      //           function convertBase64UrlToBlob(base64){ 
      //               var urlData =  base64.dataURL;
      //               var type = base64.type;
      //               var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
      //               //处理异常,将ascii码小于0的转换为大于0  
      //               var ab = new ArrayBuffer(bytes.length);  
      //               var ia = new Uint8Array(ab);  
      //               for (var i = 0; i < bytes.length; i++) {  
      //                   ia[i] = bytes.charCodeAt(i);  
      //               }  
      //               return new Blob( [ab] , {type : type});  
      //           }
      // /* 
      //  * 图片的绝对路径地址 转换成base64编码 如下代码： 
      //  */
      //           function getBase64Image(img) {
      //               var canvas = document.createElement("canvas");
      //               canvas.width = img.width;
      //               canvas.height = img.height;
      //               var ctx = canvas.getContext("2d");
      //               ctx.drawImage(img, 0, 0, img.width, img.height);
      //               var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
      //               var dataURL = canvas.toDataURL("image/"+ext);
      //               return {
      //                   dataURL: dataURL,
      //                   type: "image/"+ext
      //               };
      //           }
      //           var img = 'http://120.77.204.252:80' + $('#file').val();
      //           var image = new Image();
      //           image.crossOrigin = '';
      //           image.src = img;
      //           image.onload = function(){
      //               var base64 = getBase64Image(image);
      //               console.log(base64);
      //   /*
      //    打印信息如下：
      //    {
      //     dataURL: "data:image/png;base64,xxx"
      //     type: "image/jpg"
      //    }
      //    */
      //               var img2 = convertBase64UrlToBlob(base64);
      //               console.log(img2);
      //               formData.set('imagefile', img2);
      //   /*
      //    打印信息如下：
      //    Blob {size: 9585, type: "image/jpg"}
      //    */     }
                
            
            document.activeElement.blur();
            $('.ui-loading').show();
            $.ajax({
                url: url,
                dataType:"json",
                type:"POST",
                async:false,
                contentType:false,
                processData:false,
                data: formData,
                success: function(result) {
                    $('.ui-loading').hide();
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
                    $('.ui-loading').hide();
                    layer.open({
                       title: '消息',
                       content: '请求超时，请重试！',
                    });
                } 
            })
        } else {
            _g.setErrorAlert({
                errorText: '主讲人姓名，性别和简介不能为空'
            });
        }
        
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