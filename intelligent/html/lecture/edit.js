(function () {
	
    _g.setNowPage('lecture/edit');
    $('#formContent').html(_g.getTemplate('lecture/edit-V'));

    function getList() {
        _g.ajax({
            lock: true,
    		url: 'http://118.89.26.114/lecture/queryAllLProperty.do',
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

    getList();

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

            var speakerlink = new Array();
            speakerlink.push(
                {spname:$("#spname").val(),
                spbrief:$("#spbrief").val()});       
			speakerlink.push(
                {spname:$("#spname2").val(),
                spbrief:$("#spbrief2").val()});

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
    		    url: 'http://118.89.26.114/lecture/saveLecture.do',
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

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();


    
})();