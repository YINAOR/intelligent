(function () {
	
    _g.setNowPage('lecture/addType');
    $('#formContent').html(_g.getTemplate('lecture/addType-V'));


    $("#addlproperty").click(function() {
        var code = $("#code").val();
        var name = $('#name').val();

        _g.ajax({
            lock: true,
    		url: 'http://120.77.204.252:80/category/save.do',
    		async: false,
    		data: {
                category:{
                    parentCode: "LC0001",
                    code: code,
                    name: name
                }
            },
    		success: function(result) {
                if(result.code === 1000){
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
                    });
                }
            }
        })
    })

})();