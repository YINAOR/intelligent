(function () {
	
    _g.setNowPage('conversation/edit');
    $('#formContent').html(_g.getTemplate('conversation/edit-V'));

    $(document).ready(function(){  
        $("#addSpeaker").click(function(){  
            var $copy = $("#speaker").html();
            $("#speaker").after($copy);
        });  
    })
    
})();