(function() {

    _g.setNowPage('lecture/sign');
    $('#formContent').html(_g.getTemplate('lecture/sign-V'));

    if(set) {
        clearInterval(set);
    }

    function getQrCode(getTime) {
        var supports = (new XMLHttpRequest()).withCredentials !== undefined;
        if (supports) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "http://yanhuo.free.idcfengye.com/WebTest3/qRCodeServlet", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.responseType = "blob";
            if(getTime) {
                xmlhttp.onreadystatechange = function() {
                    if(xmlhttp.readyState != 4) {
                        $('#item').html('<div class="ui-loading__bd"><img src="/images/loading_more.gif" alt=""></div>');
                    }
                }
            }
            xmlhttp.onload = function() {
                console.log(this);
                if (this.status == 200) {
                    var blob = this.response;  
                    var img = document.createElement('img');  
                    img.onload = function (e) {  
                        window.URL.revokeObjectURL(img.src);  
                    };  
                    img.src = window.URL.createObjectURL(blob);  
                    $('#item').html(img);
                    $('#item img').addClass('img-full');
                }
            }
            xmlhttp.send(JSON.stringify({
                QRCode: 'Y',
                status: 'S',
                lecture: 1
            }));
        }

    }

    getQrCode('first');
    
    var set = setTimeout(function () {
        getQrCode();
        setTimeout(arguments.callee, 6000);
    }, 6000);

})();