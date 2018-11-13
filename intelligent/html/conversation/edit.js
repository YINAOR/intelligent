(function () {
	
    _g.setNowPage('conversation/edit');
    $('#formContent').html(_g.getTemplate('conversation/edit-V'));

    // $(document).ready(function(){  
    //     $("#addSpeaker").click(function(){  
    //         var $copy = $("#speaker").html();
    //         $("#speaker").after($copy);
    //     });  
    // })
    
    
    var id = _g.pm.param.id;
    var teahouseUrl;
    var teahouseProvedUrl;
    var appendList = $('#speakerGroup').html();
    if(id) {
        $('.panel-heading').text('编辑茶座');
        $('#conversationId').show();
        $('#id').val(id);
        $('.statusHidden').show();
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/teahouse/queryDetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    var theme = result.data.teahouse.theme;
                    var imageUrl = result.data.teahouse.imageUrl;
                    var dateString = result.data.teahouse.dateStr.replace(/[\u4e00-\u9fa5]/g,'-');
                    var dateStr = dateString.substring(0, dateString.length-1);
                    var startTime = result.data.teahouse.startTime;
                    var endTime = result.data.teahouse.endTime;
                    var address = result.data.teahouse.address;
                    var statusId = result.data.teahouse.status;
                    var status = statusId === 1 ? '未审核' : statusId === 2 ? '待审核' : statusId === 3 ? '审核通过' : statusId === 4 ? '审核不通过' : '待复审中';//0：待审核，1：通过审核，2：审核不通过
                    var isSend = result.data.teahouse.isSend === 1 ? '未发送' : result.data.teahouse.isSend === 2 ? '已发送' : '回退';  
                    var signUpNum = result.data.teahouse.signUpNum;
                    var speakerLinkList = result.data.teahouse.speakerLinkList;
                    var content = result.data.teahouse.content;
                    var category = result.data.teahouse.category;
                    var adminstrator = result.data.teahouse.adminstrator;
                    var organization = result.data.teahouse.organization;
                    $('#name').val(name);
                    if(imageUrl) {
                        $('input[id="teahouse"]').val(imageUrl);
                        $('#prePhoto').html('<img src="http://120.77.204.252:80'+ imageUrl +'" style="width: 120px; height:150px">');
                    }
                    if(teahouseProvedImage) {
                        $('input[id="teahouseProved"]').val(teahouseProvedImage);
                        $('#preProvePhoto').html('<img src="http://120.77.204.252:80'+ teahouseProvedImage +'" style="width: 120px; height:150px">');
                    }
                    $('#date').val(dateStr);
                    $('#startTimePicker').val(startTime);
                    $('#endTimePicker').val(endTime);
                    $('#address').val(address);
                    if(isProved != null) {
                        $('.teahouseProve').text(isProved === 0 ? '否' : '是');
                        $('#lprove li input[value="'+ isProved +'"]').parent().addClass('active');
                    }
                    if(isProvedSign !=null) {
                        $('.isProvedSign').text(isProvedSign === 0 ? '不需要签到' : isProvedSign === 1 ? '需要签到1次' : '需要签到2次');
                        $('#sign li input[value="'+ isProvedSign +'"]').parent().addClass('active');
                    }
                    $('#hour').val(hour);
                    for(var i = 0; i < speakerLinkList.length; i++) {
                        if(i == 0) {
                            $('.speakerInput').val(speakerLinkList[i].name);
                            $('.spbrief').val(speakerLinkList[i].brief);
                        } else {
                            $('#speakerGroup').append(appendList);
                            $('.speakerList:eq('+ i +') .speakerInput').val(speakerLinkList[i].name);
                            $('.speakerList:eq('+ i +') .spbrief').val(speakerLinkList[i].brief);
                        }
                    }
                    
                    // if(speakerLinkList.length > 1) {
                    //     $('#speakerGroup2').show();
                    //     $('#spname2').val(speakerLinkList[1].name);
                    //     $('#spbrief2').val(speakerLinkList[1].brief);
                    // }
                    $('#editor').val(content);
                    $('#status').val(status);
                    $('#isSend').val(isSend);
                    $('#signUpNum').val(signUpNum);
                    $('#participateNum').val(participateNum);
                    $('#isProvedSign').val(isProvedSign);
                    $('#type').text(category.name);
                    $('#categoryId li input[value="'+ category.id +'"]').parent().addClass('active');
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
    		url: 'http://120.77.204.252:80/teahouse/toEdit.do',
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

    function querySpeakerList(val,target) {
        // var speakerName = $('.speakerInput').val();
        // if(str) {
        //     speakerName = $('#speakerInput2').val();
        // }
        if(val != ""){
            _g.ajax({
                url: 'http://120.77.204.252:80/teahouse/querySpeakerList.do',
                data: {
                    speaker: {
                        name: val
                    }
                },
                success: function(result) {
                    // if(str){
                    //     $('#speakerquery2').empty();
                    // }else {
                        $('.speakerquery').empty()
                    // }
                    
                    if(result.code == 200){
                        var speakerList = result.data.speakerList;
                        for(var i=0;i<speakerList.length;i++){
                            var name=speakerList[i].name;
                            var list = '<li class="active-result" data-option-array-index="' + i + '">' + name + '</li>';
                            // if(str) {
                            //     $("#speakerquery2").append(list);
                            // } else {
                                $(".speakerquery").append(list);
                                
                            // }
                        }
                        $('.speakerquery').on("click","li",function(e){
                            $(target).val($(e.target).text());
                            for(var i=0;i<speakerList.length;i++){
                                if($(target).val() == speakerList[i].name){
                                    $(target).parents('.speakerList').find('textarea').val(speakerList[i].brief);
                                }
                            }
                        })
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
    }

    // function debounce() {
    //     var timer = null;
    //     return function() {
    //         if(timer) {
    //             clearTimeout(timer);
    //         }
    //         timer = setTimeout(querySpeakerList,2000);
    //     }
    // }
    
    // $('.speakerInput').each(function() {
    //     this.addEventListener('keyup', debounce());
    // })
    // document.getElementById('speakerInput2').addEventListener('keyup', debounce('speakerInput2'));
    
    var timer = null;
    $('#speakerGroup').keyup(function(e) {
        var e = e || window.e;
        var target = e.target || e.srcElement;
        if(target.className == 'speakerInput') {
            clearTimeout(timer);
            timer = setTimeout(function(){
                querySpeakerList.call(null,$(target).val(),target);
            },2000);
        }
    })


    // $('#speakerGroup').keyup(debounce());

        $("#addSpeaker").click(function(){
            $('#speakerGroup').append(appendList);
        }); 

        $('#submitBtn').click(function() {
            var name = $('#name').val();
            var date = $('#date').val();
            var startTimePicker = $('#startTimePicker').val();
            var endTimePicker = $('#endTimePicker').val();
            var address = $('#address').val();
            var lprove = $('#lprove .active input').val();

            var speakerlink = [];
            var size = $('.speakerList').size();
            for(var j = 0 ; j < size; j++) {
                speakerlink.push({
                    name: $('.speakerList:eq('+ j +') .speakerInput').val(),
                    brief: $('.speakerList:eq('+ j +') .spbrief').val()
               });
            }
            var hour = $('#hour').val();
            var editor = $('#editor').val();//editor;
            var categoryId = $('#categoryId .active input').val();
            var isProvedSign = $('#sign .active input').val();
            var object = $('#groupOfPep').val();
            var number = $('#limitNumOfPep').val();
            var sponsor = $('#sponsor').val();
            var organization = $('#organization').val();

            var teahouse ={
                name: name,
                speakerLinkList:speakerlink,
                category:{
                    id: categoryId
                },
                date:date,
                startTime:date + ' '+ startTimePicker,
                endTime:date+ ' '+endTimePicker,
                address:address,
                sponsor:sponsor,
                organization: organization,
                content:editor,
                isProved:lprove,
                isProvedSign: isProvedSign,
                hour:hour,
                groupOfPep:object,
                limitNumOfPep:number,
                imageUrl: teahouseUrl,
                teahouseProvedImage: teahouseProvedUrl
            }
            var url = 'http://120.77.204.252:80/teahouse/save.do';
            if(id) {
                url = 'http://120.77.204.252:80/teahouse/update.do';
                teahouse.id = id;
            }

            _g.ajax({
                lock: true,
    		    url: url,
    		    async: false,
    		    data: {
                    teahouse:teahouse
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
                        if(result.code === 200) {
                            history.back(-1);
                        }
                    }
                }
            })
        })


    laydate.render({
        elem: '#date' //指定元素
    });


    $('input[type="file"]').change(function() {
        var url;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(this.files[0]);
        }else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(this.files[0]);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(this.files[0]);
        }
        var ajaxUrl;
        var formData;
        if(this.id == 'teahouse') {
            // $('#file').val($('input[id="teahouse"]').val().substring($('input[id="teahouse"]').val().lastIndexOf('\\') + 1));
            // $('#prePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">');
            ajaxUrl = 'http://120.77.204.252:80/teahouse/uploadImage.do?token='+ token +'&uploadsign=teahouse';
            formData = new FormData($('#lectrueForm')[0]);
        } else {
            // $('#proveFile').val($('input[id="teahouseProved"]').val().substring($('input[id="teahouseProved"]').val().lastIndexOf('\\') + 1));
            // $('#preProvePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">'); 
            ajaxUrl = 'http://120.77.204.252:80/teahouse/uploadImage.do?token='+ token +'&uploadsign=teahouseProved';
            formData = new FormData($('#lectrueProvedForm')[0]);
        }
        var self = this;
        var token = sessionStorage.getItem('token');
        function uploadImg() {
            document.activeElement.blur();
            $('.ui-loading').show();
            $.ajax({
                url: ajaxUrl,
                dataType:"json",
                type:"POST",
                async:false,
                contentType:false,
                processData:false,
                data: formData,
                success: function(result) {
                    $('.ui-loading').hide();
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
                        if(result.code === 200) {
                            if(self.id == 'teahouse') {
                                teahouseUrl = result.data.imageUrl;
                                $('#file').val($('input[id="teahouse"]').val().substring($('input[id="teahouse"]').val().lastIndexOf('\\') + 1));
                                $('#prePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">');
                            } else {
                                teahouseProvedUrl = result.data.imageUrl;
                                $('#proveFile').val($('input[id="teahouseProved"]').val().substring($('input[id="teahouseProved"]').val().lastIndexOf('\\') + 1));
                                $('#preProvePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">'); 
                            }
                        }
                    }
                },
                error: function(error) {
                    $('.ui-loading').hide();
                    _g.hideLoading();
                    layer.open({
                       title: '消息',
                       content: '上传图片超时，请重试！',
                    });
                } 
            })
        }
        uploadImg();
            
    }) 

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();

    $('.speakerInput').focus(function() {
        $('.speakerDiv').addClass('chosen-with-drop chosen-container-active');
    })
    
    // $('#speakerInput2').focus(function() {
    //     $('#speakerDiv2').addClass('chosen-with-drop chosen-container-active');
    // })

    $(document).click(function(event) {
        var target = event.target;
        if (target.className === 'speakerquery' || target.className === 'speakerInput') {
            return false;
        } else {
            $('.speakerDiv').removeClass('chosen-with-drop chosen-container-active');  
        }
        // if (target.id === 'speakerquery2' || target.id === 'speakerInput2') {
        //     return false;
        // } else {
        //     $('#speakerDiv2').removeClass('chosen-with-drop chosen-container-active');  
        // }
    });
    

    $('.speakerquery').on("mouseover","li",function(){
        $(this).siblings().removeClass('highlighted');
        $(this).addClass('highlighted');
    })

    $('.speakerquery').on("click","li",function(){
        $('.speakerInput').val($(this).text());
        $('.speakerDiv').removeClass('chosen-with-drop chosen-container-active');
    })

    // $('#speakerquery2').on("mouseover","li",function(){
    //     $(this).siblings().removeClass('highlighted');
    //     $(this).addClass('highlighted');
    // })

    // $('#speakerquery2').on("click","li",function(){
    //     $('#speakerInput').val($(this).text());
    //     $('#speakerDiv').removeClass('chosen-with-drop chosen-container-active');
    // })


})();