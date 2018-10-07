(function () {
	
    _g.setNowPage('lecture/listType');
    $('#formContent').html(_g.getTemplate('lecture/listType-V'));



    var resultnull = { list: [] };
    _g.render('lecture/listType-V', resultnull, '#table');

    var parentCode;

    _g.ajax({
        lock: true,
        url: 'http://120.77.204.252:80/category/toEdit.do',
        success: function(result) {
            if(result.code === 200) {
                var list = result.data.parentCategoryList;
                for(var i = 0; i < list.length; i++) {
                    if(list[i].name === '讲座类别') {
                        parentCode = list[i].code;
                    }
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

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            parentCode: parentCode,
            name: $('#categoryName').val()
        }
    }

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
                    if(result.data.paging) {
                        var categoryList = { list:result.data.paging.list };
                        if(categoryList.list.length>0){
                            _g.initPaginator({
                                currentPage: result.data.paging.currentPage,
                                totalPages: result.data.paging.totalPage,
                                totalCount: categoryList.list.length,
                                onPageClicked: function(page) {
                                    console.log(page)
                                    data.currentPage = page;
                                    getList();
                                }
                            });
                             _g.render('lecture/listType-V', categoryList, '#table');
                        } 
                    } else {
                        var resultnull = { list: [] };
                        _g.render('lecture/listType-V', resultnull, '#table');
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
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    })
                }
            }
        })
    }

    $('#searchBtn').click(function() {
        data.currentPage = 1;
        data.t.name = $('#categoryName').val();
        data.t.status = $('#status .active input').val();
        getList();
    })


    downloadExcelTemplet = function() {
        var token = sessionStorage.getItem('token');;
        window.location.href='http://120.77.204.252:80/category/downExcelTemplets.do?token='+token;
    }

    exportExcel = function() {
        var token = sessionStorage.getItem('token');
        window.location.href='http://120.77.204.252:80/category/exportExcel.do?token='+token;
    }

})();