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
    		url: 'http://120.77.204.252/lecture/queryAllLProperty.do',
    		async: false,
    		data: {
    			t:{}
    		},
    		success: function(result) {
                $("#lprono").empty();
                if(result.code == 200){
                    var lpropertyList = result.data.lpropertyList;
                    for(var i in lpropertyList){
                        var id = lpropertyList[i].lprono;
                        var name = lpropertyList[i].lproname;
                        var str="<li><input type='radio' name='d-s-r' value="+id+"><a href='#'>"+ name +"</a></li>"
                        $("#lprono").append(str);
                    }
                }
                if(result.code==1000){
                    window.location.href ="signin.html";
                }

            }
        })
    }
    

    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();

    $(document).ready(function(){  
        $("#addSpeaker").click(function(){
            if($("#speakerGroup2").is(':hidden')) {
                $("#speakerGroup2").show();
            }else{
                $("#speakerMost").show();
            }
        }); 

        $('#submitBtn').click(function() {
            var title = $('#title').val();
            //海报
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
            var lprono = $('#lprono .active input').val();
            var object = $('#object').val();
            var number = $('#number').val();
            var sponsor = $('#sponsor').val();

                

            var lecture ={
                lname :title,speakerlink:speakerlink,lproperty:{lprono:lprono},
                ldate:date,lstarttime:startTimePicker,lendtime:endTimePicker,
                laddr:address,lsponsor:sponsor,content:editor,lprove:lprove,
                lhour:hour,lgroup:object,llimit:number
            }

            _g.ajax({
                lock: true,
    		    url: 'http://120.77.204.252/lecture/saveLecture.do',
    		    async: false,
    		    data: {
                    lecture:lecture,
    		    	t:{}
                },
                success:function(respData){
                    alert(respData.msg);
                    alert(respData.code)
                    alert(111)
                    //code==1000未登录或token失效跳转回登录页面
                    if(respData.code==1000){
                        window.location.href ="/signin.html";
                    }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    alert(222)
                    alert("Error");
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
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