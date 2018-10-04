(function () {
	
    _g.setNowPage('user/editInstitution');
    $('#formContent').html(_g.getTemplate('user/editInstitution-V'));

    $('#adddepart').click(function(){
        var code = $('#code').val();
        var name = $('#name').val();
        var college = {
            code : code,
            name : name
        };
        
        _g.ajax({
            lock: true,
    		url: 'http://120.77.204.252:80/college/save.do',
    		async: false,
    		data: {
    			college : college
            },
    		success: function(result) {
                if(result.code === 200){
                    alert("111")
                    layer.open({
                        title: '消息',
                        content: result.msg
                    })
                }
                else if(result.code === 1000){
                    alert("123")
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = '/signin.html';
                        }
                    });
                } else {
                    alert("456")
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                }
            },
            error: function(){
                alert("999")
            }
        })
    })

})();