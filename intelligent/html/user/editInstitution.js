(function () {
	
    _g.setNowPage('user/editInstitution');
    $('#formContent').html(_g.getTemplate('user/editInstitution-V'));
    
    var id = _g.pm.param.id;
    if(id) {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/college/querydetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200){
                    var code = result.data.college.code;
                    var name = result.data.college.name;
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

    $('#adddepart').click(function(){
        var code = $('#code').val();
        var name = $('#name').val();
        $('#messageArea').html('');
        if(code && name) {
            var college = {
            code : code,
            name : name
        };
        var url = 'http://120.77.204.252:80/college/save.do';
        if(id) {
            url = 'http://120.77.204.252:80/college/update.do';
            college.id = id;
        }  
        _g.ajax({
            lock: true,
            url: url,
            async: false,
            data: {
                college : college
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
                        content: result.msg,
                    });
                    if(result.code === 200){
                        history.back(-1);
                    }
                }
            }
        })
    } else {
        _g.setErrorAlert({
                errorText: '学院编码和学院名称不能为空'
            });
    }
       
    })

})();