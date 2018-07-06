(function () {
	
    _g.setNowPage('lecture/listType');
    $('#formContent').html(_g.getTemplate('lecture/listType-V'));

    function getList() {
        $.ajax({
            url: 'http://118.89.26.114/speakerAndLecType/queryAllLPropertyByPage.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify({
                currentPage: 1,
                pageSize: 5
            }),
            success: function(result) {
                if(result.num == 1) {
    			    var result1 = { list: result.lpropertyPaging.list };
                    _g.render('lecture/listType-V', result1, '#table');
    			} else {
    				layer.open({
    					title: '消息',
    					content: result.msg
    				});
    			}
            },
            error: function(error) {
                var result1 = { list: [] }; 
                _g.render('lecture/listType-V', result1, '#table');
                layer.open({
                    title: '消息',
                    content: '请求超时请重试'
                });
            }
        });
    }
    getList();

})();