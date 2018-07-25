(function() {

    _g.setNowPage('lecture/sign');
    $('#formContent').html(_g.getTemplate('lecture/sign-V'));

    function getQrCode(getTime) {
        var supports = (new XMLHttpRequest()).withCredentials !== undefined;
        if (supports) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "http://lai.vipgz1.idcfengye.com/WebTest3/qRCodeServlet", true);
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

//     if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
//     // 浏览器支持onhashchange事件
//     window.onhashchange = clearTimeout(set);  // TODO，对应新的hash执行的操作函数
// } else {
//     // 不支持则用定时器检测的办法
//     setInterval(function() {
//         // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
// 　　　　 var ischanged = isHashChanged(); 
//         if(ischanged) {
//             clearTimeout(set);  // TODO，对应新的hash执行的操作函数
//         }
//     }, 150);
// }

})();