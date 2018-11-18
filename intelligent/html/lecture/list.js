(function () {

    _g.setNowPage('lecture/list');
    $('#formContent').html(_g.getTemplate('lecture/list-V'));

    var result = { list: [] };
    _g.render('lecture/list-V', result, '#table');

    function getTypeList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/toEdit.do',
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
            name: $('#name').val(),
            startDate: $('#startDate').val(),
            endDate: $('#endDate').val(),
            isSend: $('#isSend .active input').val(),
            status: $('#status .active input').val(),
            category: { 
                id: $('#type .active input').val()
            }
        }
    }


    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/queryListPageByAid.do',
            async: false,
            data:  {
                paging: data
            },
            success: function(result) {
                if(result.code === 200) {
                    if(result.data.paging) {
                    var data1 = { list: result.data.paging.list };
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
                    _g.render('lecture/list-V', data1, '#table');
                    } else {
                        var result = { list: [] };
                        _g.render('lecture/list-V', result, '#table');
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
        data.t.name = $('#name').val();
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
        _g.ajax({
            lock: true,
            url: 'http://lai.vipgz1.idcfengye.com/intelligent/lecture/delete.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    getList();
                }
            }
        })
    }

    sendItem = function(id){
        _g.ajax({
            lock: true,
            url: 'http://lai.vipgz1.idcfengye.com/intelligent/lecture/send.do',
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