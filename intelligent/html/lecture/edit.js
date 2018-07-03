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

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();

    $('#submitBtn').click(function() {
    	var title = $('#title').val();
        var date = $('#date').val();
        var startTimePicker = $('#startTimePicker').val();
        var endTimePicker = $('#endTimePicker').val();
        var address = $('#address').val();
        var hasProof = $('#hasProof').val();
        var hour = $('#hour').val();
        var speaker1 = $('.speaker1').val();
        var decoration1 = $('.decoration1').val();
        var editor = $('#editot').val();
        var type = $('#type').val();
        var object = $('#object').val();
        var number = $('#number').val();
        var sponsor = $('#sponsor').val();
        console.log(id,date,startTimePicker,endTimePicker);//,address,hasProof,hour,speaker1,decoration1,editor,type,object,number,
    })
    
})();