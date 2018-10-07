(function () {
	
    _g.setNowPage('lecture/addType');
    $('#formContent').html(_g.getTemplate('lecture/addType-V'));

    var parentCode;

    _g.ajax({
        lock: true,
        url: 'http://120.77.204.252:80/category/toEdit.do',
        success: function(result) {
            if(result.code === 200) {
                var list = result.data.parentCategoryList;
                for(var i = 0; i < list.length; i++) {
                    if(list[i].name === '讲座类别') {
                        parentCode = list[i].code;
                    }
                }
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
    });

    var id = _g.pm.param.id;
    if(id) {
        $('.panel-heading:first').text("更新讲座类别");
        $('.idInput').show();
        $('#id').val(id);
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
        var url = 'http://120.77.204.252:80/category/save.do';
        var data = {
            category:{
                parentCode: parentCode,
                code: code,
                name: name
            }
        }

        if(id){
            url = 'http://120.77.204.252:80/category/update.do';
            data.category.id = id;
            delete data.category.parentCode;
        }

        _g.ajax({
            lock: true,
    		url: url,
    		async: false,
    		data: data,
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