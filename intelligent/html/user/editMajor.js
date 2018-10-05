(function () {
	
    _g.setNowPage('user/editmajor');
    $('#formContent').html(_g.getTemplate('user/editmajor-V'));



    function getList() {
        _g.ajax({
            lock: true,
    		url: 'http://120.77.204.252:80/major/toEdit.do',
    		async: false,
    		data: {},
    		success: function(result) {
                $("#dno").empty();
                if(result.code == 200){
                    var departmessage = "<li value=''>请选择所属学院</li>";
                    $('#dno').append(departmessage);
                    var collegeList = result.data.collegeList;
                    for(var i in collegeList){
                        var id = collegeList[i].id;
                        var name = collegeList[i].name;
                        var str="<li><input type='radio' name='d-s-r' value="+id+"><a href='#'>"+ name +"</a></li>"
                        $("#dno").append(str);
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
        })
    }

    getList();

    $('#addmajor').click(function(){
        var name = $('#major').val();
        var code = $('#majorNum').val();

        var id = $('#dno .active input').val();
        if(name && code && id){
            _g.ajax({
                lock: true,
                url: 'http://120.77.204.252:80/major/save.do',
                data: {
                    major: {
                        name: name,
                        code: code,
                        college: {
                            id: id
                        }
                    }
                },
                success: function(result) {
                    $('#messageArea').html('');
                    if(result.code === 200) {
                        layer.open({
                            title: '消息',
                            content: result.msg
                        })
                        _g.openWin('user/major');
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
        } else {
            _g.setErrorAlert({
                errorText: '专业名称或所属学院不能为空'
            });
        }
        
    });

    $('#major').change(function() {
        if($('#major').val()&&$('#dno .active input').val()) {
            $('#messageArea').html('');
        } else {
            _g.setErrorAlert({
                errorText: '专业名称或所属学院不能为空'
            });
        }
    })

    $('#dno .active input').change(function() {
        if($('#major').val() && $('#dno .active input').val()) {
            $('#messageArea').html('');
        } else {
            _g.setErrorAlert({
                errorText: '专业名称或所属学院不能为空'
            });
        }
    })

})();