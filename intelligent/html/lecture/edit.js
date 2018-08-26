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
            var $copy = $("#speakerGroup").html();
            $("#speakerGroup").after($copy);
        });  

        $('#submitBtn').click(function() {
            var title = $('#title').val();
            //海报
            var date = $('#date').val();
            var startTimePicker = $('#startTimePicker').val();
            var endTimePicker = $('#endTimePicker').val();
            var address = $('#address').val();
            //讲座证明var hasProof = $('#hasProof').text();

            var speakerlink = new Array();
            speakerlink.push(
                {spname:document.getElementById("spname").value,
                spbrief:document.getElementById("spbrief").value});
			speakerlink.push(
                {spname:document.getElementById("spname1").value,
                spbrief:document.getElementById("spbrief1").value});

            var hour = $('#hour').val();
            //editor
            //讲座类别var type = $('#type').text();
            var object = $('#object').val();
            var number = $('#number').val();
            var sponsor = $('#sponsor').val();

        })
    })

    laydate.render({
        elem: '#date' //指定元素
    });

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();


    
})();