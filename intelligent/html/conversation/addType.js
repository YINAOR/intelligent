(function () {
	
    _g.setNowPage('conversation/addType');
    $('#formContent').html(_g.getTemplate('conversation/addType-V'));
    $('#submitBtn1').click = function() {
    	_g.ajax ({
    	    data: {
    	    	account: '1222222',
    	    	apwd: '452222'
    	    },
    	    url: '10.34.122.235:8080/intelligent/login/admin.do',
    	    success: function(result){
    		    alert(result.num);
    	    }
        })
    }
    

})();