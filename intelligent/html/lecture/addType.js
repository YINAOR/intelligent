(function () {
	
    _g.setNowPage('lecture/addType');
    $('#formContent').html(_g.getTemplate('lecture/addType-V'));


    $("#addlproperty").click(function() {
        var lproname = $("#lproname").val();
        alert(lproname);
        _g.ajax({
            lock: true,
    		url: 'http://120.77.204.252/speakerAndLecType/saveLProperty.do',
    		async: false,
    		data: {
                lproperty:{
                    lproname:lproname
                },t:{}
            },
    		success: function(result) {
                alert(111)
                if(result.code==1000){
                    window.location.href ="signin.html";
                }

            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                alert("Error");
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        })
    })

})();