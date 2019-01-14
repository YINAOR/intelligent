(function () {
	
    _g.setNowPage('conversation/list');
    $('#formContent').html(_g.getTemplate('conversation/list-V'));

     function getTypeList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/teahouse/toEdit.do',
            success: function(result)  {
                if(result.code == 200){
                    var categoryList=result.data.categoryList;
                    for(var i in categoryList){
                        var id=categoryList[i].id;
                        var name=categoryList[i].name;
                        var str='<li><input type="radio" name="d-s-r" value="'+ id +'"><a href="#">'+name+'</a></li>'
                        $("#type").append(str);
                    }
                }
            },
            error: function(error) {
                layer.open({
                    title: '消息',
                    content: '获取分类列表超时，请重试！',
                });
            }
        })
    }
    getTypeList();

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            theme: $('#theme').val(),
            startDate: $('startDate').val(),
            endDate: $('endDate').val(),
            status: $('#status .active input').val(),
            isSend: $('#isSend .active input').val(),
            category: { 
                id: $('#type .active input').val()
            }
        }
    }

    var result = { list: [] };
    _g.render('conversation/list-V', result, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/teahouse/queryListPageByAid.do',
            async: false,
            data:  {
                paging: data
            },
            success: function(result) {
                if(result.code === 200) {
                    if(result.data.paging) {
                    var data1 = { list: result.data.paging.list, currentPage: data.currentPage, showCount: data.showCount };
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
                    _g.render('conversation/list-V', data1, '#table');
                    } else {
                        var result = { list: [] };
                        _g.render('conversation/list-V', result, '#table');
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
                } else{
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    })
                }
            },  
        });
    }
    getList();
    
    $('#searchBtn').click(function(){
        data.currentPage = 1;
        data.t.theme = $('#theme').val();
        data.t.startDate = $('#startDate').val();
        data.t.endDate = $('#endDate').val();
        data.t.isSend = $('#isSend .active input').val();
        data.t.category.id = $('#type .active input').val();
        data.t.status = $('#status .active input').val();
        getList();
    });

    laydate.render({
        elem: '#startDate' //指定元素
    });
    laydate.render({
        elem: '#endDate' //指定元素
    });

    deleteItem = function(id) {
        layer.confirm('您确定要删除此茶座吗？', { title: '询问' }, function(index) {
            _g.ajax({
                url: 'http://120.77.204.252:80/teahouse/delete.do',
                data: {
                    id: id
                },
                success: function(result) {
                    if(result.code === 1000){
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
                        if(result.code === 200) {
                           getList();
                        }
                    }                    
                }
           })
            layer.close(index);
        });
    }

    sendItem = function(id){
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/teahouse/send.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                    getList();
                } else{
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
                }
            }
        })
    }


})();