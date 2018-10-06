(function () {
	
    _g.setNowPage('lecture/edit');
    $('#formContent').html(_g.getTemplate('lecture/edit-V'));

    $('#speakerInput').focus(function() {
        $('#speakerDiv').addClass('chosen-with-drop chosen-container-active');
    })

    $('#speakerInput').blur(function(e) {
        if(e.target.id != 'speakerquery') {
            $('#speakerDiv').removeClass('chosen-with-drop chosen-container-active');
        }    
    })

    $('#speakerquery li').mouseover(function() {
        $(this).siblings().removeClass('highlighted');
        $(this).addClass('highlighted');
    })

    $('#speakerquery li').click(function() {
        $('#speakerInput').val($(this).text());
        $('#speakerDiv').removeClass('chosen-with-drop chosen-container-active');
    })

    return

    var id = _g.pm.param.id;
    if(id) {
        $('.panel-heading').text('编辑讲座');
        $('.lectureId').show();
        $('#id').val(id);
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/queryDetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    var name = result.data.lecture.name;
                    var imageUrl = result.data.lecture.imageUrl;
                    var lectureProvedImage = result.data.lecture.lectureProvedImage;
                    var dateStr = result.data.lecture.dateStr;
                    var startTime = result.data.lecture.startTime;
                    var endTime = result.data.lecture.endTime;
                    var address = result.data.lecture.address;
                    var isProved = result.data.lecture.isProved;
                    var hour = result.data.lecture.hour;
                    var speakerLinkList = result.data.lecture.speakerLinkList;
                    var content = result.data.lecture.content;
                    var category = result.data.lecture.category;
                    var groupOfPep = result.data.lecture.groupOfPep;
                    var limitNumOfPep = result.data.lecture.limitNumOfPep;
                    var sponsor = result.data.lecture.sponsor;
                    var organization = result.data.lecture.organization;
                    $('#name').val(name);
                    $('#imageUrl').val(imageUrl);
                    $('#prePhoto').html('<img src="http://120.77.204.252:80'+ imageUrl +'" style="width: 120px; height:150px">');
                    $('#lectureProvedImage').val(lectureProvedImage);
                    $('#preProvePhoto').html('<img src="http://120.77.204.252:80'+ lectureProvedImage +'" style="width: 120px; height:150px">');
                    $('#date').val(dateStr);
                    $('#startTimePicker').val(startTime);
                    $('#endTimePicker').val(endTime);
                    $('#address').val(address);
                    $('.lectureProve').val(isProved === 0 ? '否' : '是');
                    $('#lprove li input[value="'+ isProved +'"]').addClass('active');
                    $('#hour').val(hour);
                    $('#spname').val(speakerLinkList[0].name);
                    $('#spbrief').val(speakerLinkList[0].brief);
                    if(speakerLinkList.length > 1) {
                        $('#speakerGroup2').show();
                        $('#spname2').val(speakerLinkList[1].name);
                        $('#spbrief2').val(speakerLinkList[1].brief);
                    }
                    $('#editor').val(content);
                    $('#type').val(category.name);
                    $('#lprove li input[value="'+ category.id +'"]').addClass('active');
                    $('#limitNumOfPep').val(limitNumOfPep);
                    $('#sponsor').val(sponsor);
                    $('#organization').val(organization);
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

    function querySpeakerList(str) {
        var speakerName = $('#spname').val();
        if(str) {
            speakerName = $('#spname2').val();
        }
        var speakerList = [{name: 5656},{name: 7777}];
                    for(var i in speakerList){
                        var name=speakerList[i].name;
                        // var brief=speakerList[i].brief;
                        //返回结果
                        var list='<option value="'+ name + '">'+ name +'</option>';
                        if(str) {
                            $("#speakerquery2").append(list);
                        } else {
                            $("#speakerquery").append(list);
                        }     
                    }
        return
        _g.ajax({
            url: 'http://120.77.204.252:80/lecture/querySpeakerList.do',
            data: {
                speaker: {
                    name: speakerName
                }
            },
            success: function(result) {
                if(str) {
                    $('#speakerquery2').empty();
                } else {
                    $('#speakerquery').empty();
                } 
                if(result.code == 200){
                    var speakerList = result.data.speakerList;
                    for(var i in speakerList){
                        var name=speakerList[i].name;
                        var brief=speakerList[i].brief;
                        //返回结果
                        var list="<li>" +name+ "</li>";
                        if(str) {
                            $("#speakerquery2").append(list);
                        } else {
                            $("#speakerquery").append(list);
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
        })
    }

    function debounce(str) {
        var timer = null;
        return function() {
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(querySpeakerList(str),2000);
        }
    }

    document.getElementById('spname').addEventListener('keyup', debounce());
    document.getElementById('spname2').addEventListener('keyup', debounce('spname2'));


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