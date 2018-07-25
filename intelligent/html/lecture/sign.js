(function() {

    _g.setNowPage('lecture/sign');
    $('#formContent').html(_g.getTemplate('lecture/sign-V'));

    function getQrCode() {
        var supports = (new XMLHttpRequest()).withCredentials !== undefined;
        if (supports) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "http://lai.vipgz1.idcfengye.com/WebTest3/qRCodeServlet", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.responseType = "blob";
            xmlhttp.onload = function() {
                console.log(this);
                if (this.status == 200) {
                    if(set) {
                        clearInterval(set);
                    }
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

    getQrCode();
    var set = setInterval(getQrCode, 6000);


})();