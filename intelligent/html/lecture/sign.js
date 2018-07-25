(function() {

    _g.setNowPage('lecture/sign');
    $('#formContent').html(_g.getTemplate('lecture/sign-V'));

    function getQrCode() {
        var supports = (new XMLHttpRequest()).withCredentials !== undefined;
        alert(supports);
        $.ajax({
            url: 'http://lai.vipgzl.idcfengye.com/WebTest3/qRCodeServlet',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify({
                QRCode: 'Y',
                status: 'S',
                lecture: 1
            }),
            success: function(result) {
                alert(111)
            },
        })
    }

    getQrCode();


})();