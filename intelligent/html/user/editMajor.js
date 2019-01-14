(function () {
	
    _g.setNowPage('user/editmajor');
    $('#formContent').html(_g.getTemplate('user/editmajor-V'));

    var id = _g.pm.param.id;
    if(id) {
        $('.panel-heading').text('编辑专业');
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/major/queryDetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    var majorNum = result.data.major.code;
                    var major = result.data.major.name;
                    var collegeId = result.data.major.college.id;
                    var college = result.data.major.college.name;
                    $('#majorNum').val(majorNum);
                    $('#major').val(major);
                    $('#dno li input[value='+ college +']').parent().addClass('active');
                    $('.dropdown-label').text(college);
                } else if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = 'signin.html';
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

    function getList() {
        _g.ajax({
            lock: true,
    		url: 'http://120.77.204.252:80/major/toEdit.do',
    		async: false,
    		success: function(result) {
                if(result.code == 200){
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
                            window.location.href = 'signin.html';
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
        $('#messageArea').html('');
        var name = $('#major').val();
        var code = $('#majorNum').val();
        var collegeId = $('#dno .active input').val();
        var url = 'http://120.77.204.252:80/major/save.do'
        var data = {
                    major: {
                        name: name,
                        code: code,
                        college: {
                            id: collegeId
                        }
                    }
                };
        if(id) {
            url = 'http://120.77.204.252:80/major/update.do';
            data.major.id = id;
        }
        if(name && code && collegeId){
            _g.ajax({
                lock: true,
                url: url,
                data: data,
                success: function(result) {
                    $('#messageArea').html('');
                    if(result.code === 200) {
                        layer.open({
                            title: '消息',
                            content: result.msg
                        })
                        history.back(-1);
                    } else if(result.code === 1000){
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index){
                                layer.close(index);
                                window.location.href = 'signin.html';
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

    // $('#major').change(function() {
    //     if($('#major').val() && $('#dno .active input').val()) {
    //         $('#messageArea').html('');
    //     } else {
    //         _g.setErrorAlert({
    //             errorText: '专业名称或所属学院不能为空'
    //         });
    //     }
    // })

    // $('#dno .active input').change(function() {
    //     if($('#major').val() && $('#dno .active input').val()) {
    //         $('#messageArea').html('');
    //     } else {
    //         _g.setErrorAlert({
    //             errorText: '专业名称或所属学院不能为空'
    //         });
    //     }
    // })

})();