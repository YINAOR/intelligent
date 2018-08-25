(function () {
	
    _g.setNowPage('user/editmajor');
    $('#formContent').html(_g.getTemplate('user/editmajor-V'));

    var data = {
        t:''
    }

    function getList() {
        _g.ajax({
            lock: true,
    		url: 'http://118.89.26.114/deptAndMajor/queryAllDepart.do',
    		async: false,
    		data: {
    			paging: data
    		},
    		success: function(result) {
                $("#dno").empty();
                if(result.code == 200){
                    var departlist = result.data.departList;
                    for(var i in departlist){
                        var id = departlist[i].dno;
                        var name = departlist[i].dname;
                        var str="<li><input type='radio' name='d-s-r' value="+id+"><a href='#'>"+ name +"</a></li>"
                        $("#dno").append(str);
                    }
                }

                if(result.code==1000){
                    window.location.href ="signin.html";
                }

            }
        })
    }

    getList();

    $('#submitBtn').click(function(){
        var mname = $('#major').val();
        var depart = $('#dno .active input').val();
        if(mname && depart){
            _g.ajax({
                lock: true,
                url: 'http://118.89.26.114/deptAndMajor/saveMajor.do',
                data: {
                    major: {
                        mname: mname,
                        depart: {
                            dno: depart
                        }
                    }
                },
                success: function(result) {
                    $('#messageArea').html('');
                    if(result.code === 200) {
                        layer.open({
                            title: '消息',
                            content: '提交成功'
                        })
                        _g.openWin('user/major');
                    } else {
                        layer.open({
                            title: '消息',
                            content: result.msg
                        })
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