(function () {
	
    _g.setNowPage('lecture/edit');
    $('#formContent').html(_g.getTemplate('lecture/edit-V'));

    var id = _g.pm.param.id;
    if(id) {
        $('.panel-heading').text('编辑讲堂');
        getList();
    }

    function getList() {
        _g.ajax({
            lock: true,
    		url: 'http://120.77.204.252:80/lecture/toEdit.do',
    		async: false,
    		data: {},
    		success: function(result) {
                $("#categoryId").empty();
                if(result.code == 200){
                    var categoryList = result.data.categoryList;
                    for(var i in categoryList){
                        var id = categoryList[i].id;
                        var name = categoryList[i].name;
                        var str="<li><input type='radio' name='d-s-r' value="+id+"><a href='#'>"+ name +"</a></li>"
                        $("#categoryId").append(str);
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
    
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();

    $(document).ready(function(){ 

        $('#spname').on('input propertychange', function(){
            let name = $('#spname').val();
            if(name != null){
                _g.ajax({
                    lock: true,
                    url: 'http://120.77.204.252:80/lecture/querySpeakerList.do',
                    async: false,
                    data: {
                        speaker: {
                            name: name
                        }
                    },
                    success: function(result) {
                        $('#speakerquery').empty();
                        if(result.code == 200){
                            var speakerList = result.data.speakerList;
        
                            for(var i in speakerList){
                                var name=speakerList[i].name;
                                var brief=speakerList[i].brief;
                                //返回结果
                                var str="<li>" +name+ "</li>";
                                $("#speakerquery").append(str);
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
        });

        $("#addSpeaker").click(function(){
            if($("#speakerGroup2").is(':hidden')) {
                $("#speakerGroup2").show();
            }else{
                $("#speakerMost").show();
            }
        }); 

        $('#submitBtn').click(function() {
            var title = $('#title').val();
            var imageUrl = $('#photoInput').val();
            var date = $('#date').val();
            var startTimePicker = $('#startTimePicker').val();
            var endTimePicker = $('#endTimePicker').val();
            var address = $('#address').val();
            var lprove = $('#lprove').val();

            var speakerlink = [];
            speakerlink.push({
                spname: $("#spname").val(),
                spbrief: $("#spbrief").val()
            });
            if($("#spname2").val() != '') {
                speakerlink.push({
                    spname: $("#spname2").val(),
                    spbrief: $("#spbrief2").val()
                });
            }  
			

            var hour = $('#hour').val();
            var editor = "$('#editor').val();//editor";
            var categoryId = $('#categoryId .active input').val();
            var object = $('#object').val();
            var number = $('#number').val();
            var sponsor = $('#sponsor').val();

                

            var lecture ={
                name :title,speakerLinkList:speakerlink,category:{id:categoryId},
                date:date,startTime:startTimePicker,endTime:endTimePicker,
                address:address,sponsor:sponsor,content:editor,isProved:lprove,
                hour:hour,groupOfPep:object,limitNumOfPep:number,imageUrl:imageUrl
            }

            _g.ajax({
                lock: true,
    		    url: 'http://120.77.204.252:80/lecture/save.do',
    		    async: false,
    		    data: {
                    lecture:lecture
                },
                success:function(result){
                    //code==1000未登录或token失效跳转回登录页面
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
                    }
                }
            })
        })
    })

    laydate.render({
        elem: '#date' //指定元素
    });

    $('input[type="file"]').change(function() {
        $('#file').val($('input[type="file"]').val().substring($('input[type="file"]').val().lastIndexOf('\\') + 1));
        var url;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(this.files[0]);
        }else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(this.files[0]);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(this.files[0]);
        }
        $('#prePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">');
    })

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();


    
})();