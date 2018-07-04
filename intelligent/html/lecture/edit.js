(function () {
	
    _g.setNowPage('lecture/edit');
    $('#formContent').html(_g.getTemplate('lecture/edit-V'));

    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();

    $(document).ready(function(){  
        $("#addSpeaker").click(function(){  
            var $copy = $("#speaker").html();
            $("#speaker").after($copy);
        });  
    })

    laydate.render({
        elem: '#date1' //指定元素
    });

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();

    $('#submitBtn').click(function() {
        layer.msg('hello');
        return
    	var title = $('#title').val();
        var date = $('#date').val();
        var startTimePicker = $('#startTimePicker').val();
        var endTimePicker = $('#endTimePicker').val();
        var address = $('#address').val();
        var hasProof = $('#hasProof').text();
        var hour = $('#hour').val();
        var speaker = $('.speaker1').val();
        var decoration = $('.decoration1').val();
        var value = $('.w-e-text').html();
        var type = $('#type').text();
        var object = $('#object').val();
        var number = $('#number').val();
        var sponsor = $('#sponsor').val();
        var speakerList = [];
        _.each(speaker,function(item,index) {
            speakerList.push(item);
        })
        console.log(speakerList)
    })
    
})();