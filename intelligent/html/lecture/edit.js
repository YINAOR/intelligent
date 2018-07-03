(function () {
	
    _g.setNowPage('lecture/edit');
    $('#formContent').html(_g.getTemplate('lecture/edit-V'));

    $(document).ready(function(){  
        $("#addSpeaker").click(function(){  
            var $copy = $("#speaker").html();
            $("#speaker").after($copy);
        });  
    })

    $('#startTimePicker').hunterTimePicker();
    $('#endTimePicker').hunterTimePicker();

    $('#submitBtn').click(function() {
    	console.log($('#startTimePicker').val());
    })
    
})();