(function () {
	
    _g.setNowPage('lecture/listType');
    $('#formContent').html(_g.getTemplate('lecture/listType-V'));

    var data = {
        currentPage: 1,
        pageSize: 5,
        t: {
            lproname: ''
        }
    }

    var result1 = { list: [] };
    _g.render('lecture/listType-V', result1, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://118.89.26.114/speakerAndLecType/queryAllLPropertyByPaging.do',
            async: false,
            data: {
                paging: data
            },
            success: function(result) {
                if(result.code === 200) {
    			    var result1 = { list: result.data.paging.list };
                    _g.render('lecture/listType-V', result1, '#table');
    			} else {
    				layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            if(result.msg.indexOf('请登录') != -1) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            }
                        }
                    });
    			}
            }
        });
    }
    getList();

})();