(function() {

    _g.setNowPage('user/editSpeaker');
    $('#formContent').html(_g.getTemplate('user/editSpeaker-V'));

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
})();