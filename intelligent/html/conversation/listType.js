(function () {
	
    _g.setNowPage('conversation/listType');
    $('#formContent').html(_g.getTemplate('conversation/listType-V'));

    var resultnull = { list: [] };
    _g.render('conversation/listType-V', resultnull, '#table');

    var parentCode;

    _g.ajax({
        lock: true,
        url: 'http://120.77.204.252:80/category/toEdit.do',
        success: function(result) {
            if(result.code === 200) {
                var list = result.data.parentCategoryList;
                for(var i = 0; i < list.length; i++) {
                    if(list[i].name === '茶座类别') {
                        parentCode = list[i].code;
                        data.t.parentCode = parentCode;
                        getList();
                    }
                }
            } else if(result.code === 1000){
                layer.open({
                    title: '消息',
                    content: result.msg,
                    yes: function(index){
                        layer.close(index);
                        window.location.href = 'signin.html';
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
                        var categoryList = { list:result.data.paging.list, currentPage: data.currentPage, showCount: data.showCount };
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
                             _g.render('conversation/listType-V', categoryList, '#table');
                        } 
                    } else {
                        var resultnull = { list: [] };
                        _g.render('conversation/listType-V', resultnull, '#table');
                        _g.initPaginator({
                            currentPage: 0,
                            totalPages: 0,
                            totalCount: 0,
                        });
                    }       
    			} else if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = 'signin.html';
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

    

    // deleteItem = function(id) {
    //     _g.ajax({
    //         lock: true,
    //         url: 'http://120.77.204.252:80/category/delete.do',
    //         async: false,
    //         data: {
    //             id: id
    //         },
    //         success:function(result){
    //             if(result.code === 200){
    //                 layer.open({
    //                     title: '消息',
    //                     content: result.msg,
    //                 });
    //                 getList();
    //             } else {
    //                 layer.open({
    //                     title: '消息',
    //                     content: result.msg,
    //                 })
    //             }
    //         }
    //     })
    // }

    $('#searchBtn').click(function() {
        data.currentPage = 1;
        data.t.name = $('#categoryName').val();
        data.t.status = $('#status .active input').val();
        getList();
    })

    $('input[type="file"]').change(function() {
            var token = sessionStorage.getItem('token');
            $.ajax({
                url: 'http://120.77.204.252:80/category/readExcel.do?token='+ token,
                dataType: "json",
                type: "POST",
                async: false,
                contentType: false,
                processData: false,
                data: new FormData($('#excelForm')[0]),
                success: function(result) {
                    $('.ui-loading').hide();
                    if (result.code === 1000) {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index) {
                                layer.close(index);
                                window.location.href = 'signin.html';
                            }
                        });
                    } else {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                        });
                        if (result.code === 200) {
                            layer.msg('上传数据成功！');
                            getList();
                        }
                    }
                },
                error: function(error) {
                    $('.ui-loading').hide();
                    _g.hideLoading();
                    layer.open({
                        title: '消息',
                        content: '上传数据超时，请重试！',
                    });
                }
            })
        })



    downloadExcelTemplet = function() {
        var token = sessionStorage.getItem('token');;
        window.location.href='http://120.77.204.252:80/category/downExcelTemplets.do?token='+token + '&parentCode=' + parentCode + '&name=' + $('#categoryName').val();
    }

    exportExcel = function() {
        var token = sessionStorage.getItem('token');
        window.location.href='http://120.77.204.252:80/category/exportExcel.do?token='+token + '&parentCode=' + parentCode + '&name=' + $('#categoryName').val();
    }

})();