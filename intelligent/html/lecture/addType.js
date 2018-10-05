(function () {
	
    _g.setNowPage('lecture/addType');
    $('#formContent').html(_g.getTemplate('lecture/addType-V'));

    var id = _g.pm.param.id;
    if(id) {
        $('.panel-heading:first').text("更新讲座类别");

        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/category/queryDetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200){
                    var code = result.data.category.code;
                    var name = result.data.category.name;
                    $('#code').val(code);
                    $('#name').val(name);
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

    $("#addlproperty").click(function() {
        var code = $("#code").val();
        var name = $('#name').val();

        if(id){
            _g.ajax({
                lock:true,
                url: 'http://120.77.204.252:80/category/update.do',
                async: false,
                data: {
                    category:{
                        id: code,
                        name: name
                    }
                },
                success:function(result){
                    if(result.code === 200){
                        layer.open({
                            title: '消息',
                            content: result.msg
                        })
                        history.back();
                    }
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
        }

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
                if(result.code === 200){
                    layer.open({
                        title: '消息',
                        content: result.msg
                    })
                    history.back();
                }else if(result.code === 1000){
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