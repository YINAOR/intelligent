(function () {
	
    _g.setNowPage('lecture/listType');
    $('#formContent').html(_g.getTemplate('lecture/listType-V'));

    var data = {
        currentPage: 1,
        pageSize: 5
    };

    function getList() {
    	alert(1111)
        $.ajax({
            url: 'http://118.89.26.114/speakerAndLecType/queryAllLPropertyByPage.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                if(data.num == 1) {
    			    var result = { list: data.lpropertyPaging.list };
                    _g.render('lecture/listType-V', result, '#table');
    			} else {
    				layer.open({
    					title: '消息',
    					content: data.msg
    				});
    			}
            },
        });
    }
    getList();

})();