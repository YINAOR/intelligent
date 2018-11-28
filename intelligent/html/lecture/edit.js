(function() {

    _g.setNowPage('lecture/edit');
    $('#formContent').html(_g.getTemplate('lecture/edit-V'));

    var id = _g.pm.param.id;
    var lectureUrl;
    var lectureProvedUrl;
    var appendList = $('#speakerGroup').html();
    if (id) {
        $('.panel-heading').text('编辑讲座');
        $('.lectureId').show();
        $('#id').val(id);
        $('.statusHidden').show();
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/queryDetail.do',
            data: {
                id: id
            },
            success: function(result) {
                if (result.code === 200) {
                    var name = result.data.lecture.name;
                    var imageUrl = result.data.lecture.imageUrl;
                    var lectureProvedImage = result.data.lecture.lectureProvedImage;
                    var dateString = result.data.lecture.dateStr.replace(/[\u4e00-\u9fa5]/g, '-');
                    var dateStr = dateString.substring(0, dateString.length - 1);
                    var startTime = result.data.lecture.startTimeStr;
                    var endTime = result.data.lecture.endTimeStr;
                    var address = result.data.lecture.address;
                    var isProved = result.data.lecture.isProved;
                    var status = result.data.lecture.status === 0 ? '待审核' : result.data.lecture.status === 1 ? '通过审核' : '审核不通过'; //0：待审核，1：通过审核，2：审核不通过
                    var isSend = result.data.lecture.isSend === 0 ? '未发送' : '已发送'; //0：未发送，1：已发送
                    var thumbsUpNum = result.data.lecture.thumbsUpNum;
                    var signUpNum = result.data.lecture.signUpNum;
                    var participateNum = result.data.lecture.participateNum;
                    var isProvedSign = result.data.lecture.isProvedSign;
                    var hour = result.data.lecture.hour;
                    var speakerLinkList = result.data.lecture.speakerLinkList;
                    var content = result.data.lecture.content;
                    var category = result.data.lecture.category;
                    var groupOfPep = result.data.lecture.groupOfPep;
                    var limitNumOfPep = result.data.lecture.limitNumOfPep;
                    var sponsor = result.data.lecture.sponsor;
                    var organization = result.data.lecture.organization;
                    $('#name').val(name);
                    if (imageUrl) {
                        $('#file').val(imageUrl);
                        $('#prePhoto').append('<img src="http://120.77.204.252:80' + imageUrl + '" style="width: 120px; height:150px">');
                    }
                    if (lectureProvedImage) {
                        $('#proveFile').val(lectureProvedImage);
                        $('#preProvePhoto').append('<img src="http://120.77.204.252:80' + lectureProvedImage + '" style="width: 120px; height:150px">');
                    }
                    $('#date').val(dateStr);
                    $('#startTimePicker').val(startTime);
                    $('#endTimePicker').val(endTime);
                    $('#address').val(address);
                    if (isProved != null) {
                        $('.lectureProve').text(isProved === 0 ? '否' : '是');
                        $('#lprove li input[value="' + isProved + '"]').parent().addClass('active');
                    }
                    if (isProvedSign != null) {
                        $('.isProvedSign').text(isProvedSign === 0 ? '不需要签到' : isProvedSign === 1 ? '需要签到1次' : '需要签到2次');
                        $('#sign li input[value="' + isProvedSign + '"]').parent().addClass('active');
                    }
                    $('#hour').val(hour);
                    for (var i = 0; i < speakerLinkList.length; i++) {
                        if (i == 0) {
                            $('.speakerInput').val(speakerLinkList[i].name);
                            $('.spbrief').val(speakerLinkList[i].brief);
                        } else {
                            $('#speakerGroup').append(appendList);
                            $('.speakerList:eq(' + i + ') .speakerInput').val(speakerLinkList[i].name);
                            $('.speakerList:eq(' + i + ') .spbrief').val(speakerLinkList[i].brief);
                        }
                    }

                    // if(speakerLinkList.length > 1) {
                    //     $('#speakerGroup2').show();
                    //     $('#spname2').val(speakerLinkList[1].name);
                    //     $('#spbrief2').val(speakerLinkList[1].brief);
                    // }
                    $('#editor .w-e-text').html(content);
                    $('#status').val(status);
                    $('#isSend').val(isSend);
                    $('#signUpNum').val(signUpNum);
                    $('#participateNum').val(participateNum);
                    $('#isProvedSign').val(isProvedSign);
                    $('#type').text(category.name);
                    $('#categoryId li input[value="' + category.id + '"]').parent().addClass('active');
                    $('#limitNumOfPep').val(limitNumOfPep);
                    $('#sponsor').val(sponsor);
                    $('#organization').val(organization);
                    $('#groupOfPep').val(groupOfPep);
                    $('#thumbsUpNum').val(thumbsUpNum);
                } else if (result.code === 1000) {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
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
                if (result.code == 200) {
                    var categoryList = result.data.categoryList;
                    for (var i in categoryList) {
                        var id = categoryList[i].id;
                        var name = categoryList[i].name;
                        var str = "<li><input type='radio' name='d-s-r' value=" + id + "><a href='#'>" + name + "</a></li>"
                        $("#categoryId").append(str);
                    }
                } else if (result.code === 1000) {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
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

    function querySpeakerList(val, target) {
        // var speakerName = $('.speakerInput').val();
        // if(str) {
        //     speakerName = $('#speakerInput2').val();
        // }
        console.log(target)
        var list = '<li class="active-result" data-option-array-index="' + 1 + '">' + 'name' + '</li>';
        $(target).parents('.speakerList').find('.speakerquery').append(list);
        
        return 
        if (val != "") {
            _g.ajax({
                url: 'http://120.77.204.252:80/lecture/querySpeakerList.do',
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

                    if (result.code == 200) {
                        var speakerList = result.data.speakerList;
                        for (var i = 0; i < speakerList.length; i++) {
                            var name = speakerList[i].name;
                            var list = '<li class="active-result" data-option-array-index="' + i + '">' + name + '</li>';
                            // if(str) {
                            //     $("#speakerquery2").append(list);
                            // } else {
                            $(target).parents('.speakerList').find('.speakerquery').append(list);
                            // }
                        }
                        $('.speakerquery').on("click", "li", function(e) {
                            $(target).val($(e.target).text());
                            for (var i = 0; i < speakerList.length; i++) {
                                if ($(target).val() == speakerList[i].name) {
                                    $(target).parents('.speakerList').find('textarea').val(speakerList[i].brief);
                                }
                            }
                        })
                    } else if (result.code === 1000) {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index) {
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
            $('.speakerquery').empty()
        }
    }

    function debounce() {
        var timer = null;
        return function(e) {
            var e = e || window.e;
            var target = e.target || e.srcElement;
            if (target.className == 'speakerInput') {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    querySpeakerList.call(null, $(target).val(), target);
                }, 2000);
            }
            // if(timer) {
            //     clearTimeout(timer);
            // }
            // timer = setTimeout(querySpeakerList,2000);
        }
    }

    // $('.speakerInput').each(function() {
    //     this.addEventListener('keyup', debounce());
    // })
    document.getElementById('speakerGroup').addEventListener('keyup', debounce());

    // var timer = null;
    // $('#speakerGroup').keyup(function(e) {
    //     var e = e || window.e;
    //     var target = e.target || e.srcElement;
    //     if (target.className == 'speakerInput') {
    //         if (timer) {
    //             clearTimeout(timer);
    //         }
    //         timer = setTimeout(function() {
    //             querySpeakerList.call(null, $(target).val(), target);
    //         }, 2000);
    //     }
    // })


    // $('#speakerGroup').keyup(debounce());

    $("#addSpeaker").click(function() {
        $('#speakerGroup').append(appendList);
    });

    $('#yes').click(function() {
        $('.lectureHour').show();
    })

    $('#no').click(function() {
        $('#hour').val('');
        $('.lectureHour').hide();
    })

    $('#submitBtn').click(function() {
        var name = $('#name').val();
        var date = $('#date').val();
        var startTimePicker = $('#startTimePicker').val();
        var endTimePicker = $('#endTimePicker').val();
        var address = $('#address').val();
        var lprove = $('#lprove .active input').val();

        var speakerlink = [];
        var size = $('.speakerList').size();
        for (var j = 0; j < size; j++) {
            speakerlink.push({
                name: $('.speakerList:eq(' + j + ') .speakerInput').val(),
                brief: $('.speakerList:eq(' + j + ') .spbrief').val()
            });
        }
        var hour = $('#hour').val();
        var editor = $('#editor .w-e-text').html(); //editor;
        var categoryId = $('#categoryId .active input').val();
        var isProvedSign = $('#sign .active input').val();
        var object = $('#groupOfPep').val();
        var number = $('#limitNumOfPep').val();
        var sponsor = $('#sponsor').val();
        var organization = $('#organization').val();
        console.log(lectureUrl)
        console.log(lectureProvedUrl)

        var lecture = {
            name: name,
            speakerLinkList: speakerlink,
            category: {
                id: categoryId
            },
            date: date,
            startTime: date + ' ' + startTimePicker + ':00',
            endTime: date + ' ' + endTimePicker + ':00',
            address: address,
            sponsor: sponsor,
            organization: organization,
            content: editor,
            isProved: lprove,
            isProvedSign: isProvedSign,
            hour: hour,
            groupOfPep: object,
            limitNumOfPep: number,
            imageUrl: lectureUrl,
            lectureProvedImage: lectureProvedUrl
        }
        var url = 'http://120.77.204.252:80/lecture/save.do';
        if (id) {
            url = 'http://120.77.204.252:80/lecture/update.do';
            lecture.id = id;
        }

        _g.ajax({
            lock: true,
            url: url,
            async: false,
            data: {
                lecture: lecture
            },
            success: function(result) {
                //code==1000未登录或token失效跳转回登录页面
                if (result.code === 1000) {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
                            layer.close(index);
                            window.location.href = '/signin.html';
                        }
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                    if (result.code === 200) {
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
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(this.files[0]);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(this.files[0]);
        }
        var self = this;
        var token = sessionStorage.getItem('token');
        var ajaxUrl;
        var formData;
        if (self.id == 'lecture') {
            // $('#file').val($('input[id="teahouse"]').val().substring($('input[id="teahouse"]').val().lastIndexOf('\\') + 1));
            // $('#prePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">');
            ajaxUrl = 'http://120.77.204.252:80/lecture/uploadImage.do?token=' + token + '&uploadsign=lecture';
            formData = new FormData($('#lectureForm')[0]);
        } else {
            // $('#proveFile').val($('input[id="lectureProved"]').val().substring($('input[id="lectureProved"]').val().lastIndexOf('\\') + 1));
            // $('#preProvePhoto').html('<img src="'+ url +'" style="width: 120px; height:150px">'); 
            ajaxUrl = 'http://120.77.204.252:80/lecture/uploadImage.do?token=' + token + '&uploadsign=lectureProved';
            formData = new FormData($('#lectrueProvedForm')[0]);
        }

        function uploadImg() {
            document.activeElement.blur();
            $('.ui-loading').show();
            $.ajax({
                url: ajaxUrl,
                dataType: "json",
                type: "POST",
                async: false,
                contentType: false,
                processData: false,
                data: formData,
                success: function(result) {
                    $('.ui-loading').hide();
                    if (result.code === 1000) {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            }
                        });
                    } else {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                        });
                        if (result.code === 200) {
                            if (self.id == 'lecture') {
                                lectureUrl = result.data.imageUrl;
                                $('#file').val($('input[id="lecture"]').val().substring($('input[id="lecture"]').val().lastIndexOf('\\') + 1));
                                $('#prePhoto').html('<img src="' + url + '" style="width: 120px; height:150px">');
                            } else {
                                lectureProvedUrl = result.data.imageUrl;
                                $('#proveFile').val($('input[id="lectureProved"]').val().substring($('input[id="lectureProved"]').val().lastIndexOf('\\') + 1));
                                $('#preProvePhoto').html('<img src="' + url + '" style="width: 120px; height:150px">');
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


    $('.speakerquery').on("mouseover", "li", function() {
        $(this).siblings().removeClass('highlighted');
        $(this).addClass('highlighted');
    })

    $('.speakerquery').on("click", "li", function() {
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