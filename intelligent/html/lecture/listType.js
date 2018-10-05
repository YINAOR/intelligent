(function () {
	
    _g.setNowPage('lecture/listType');
    $('#formContent').html(_g.getTemplate('lecture/listType-V'));


    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            name: ''
        }
    }

    var result1 = { list: [] };
    _g.render('lecture/listType-V', result1, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/category/queryListByPage.do',
            async: false,
            data: {
                paging: data
            },
            success: function(result) {
                if(result.code === 200) {
                    if(result.data.paging.list.length>0){
                        var categoryList = { list: result.data.paging.list };
                        _g.initPaginator({
                            currentPage: result.data.paging.currentPage,
                            totalPages: result.data.paging.totalPage,
                            totalCount: result.data.paging.totalResult,
                            onPageClicked: function(page) {
                                console.log(page)
                                data.currentPage = page;
                                getList();
                            }
                        });
                        _g.render('lecture/listType-V', categoryList, '#table');
                    }    
    			} else if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = '/signin.html';
                        }
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                }
            }
        });
    }

    getList();

    deleteItem = function(id) {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/category/delete.do',
            async: false,
            data: {
                id: id
            },
            success:function(result){
                if(result.code === 200){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                    getList();
                } else if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = '/signin.html';
                        }
                    });
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    })
                }
            }
        })
    }

})();