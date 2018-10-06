(function () {

    _g.setNowPage('lecture/list');
    $('#formContent').html(_g.getTemplate('lecture/list-V'));

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
                } else {
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    });
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
            date: '',
            category: $('#type .active input').val(),
            status: $('#status .active input').val()
        }
    }

    var result = { list: [] };
    _g.render('lecture/list-V', result, '#table');

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
    			}
            },  
        });
    }
    getList();

    $('#searchBtn').click(function(){
        data.currentPage = 1;
        getList();
    });

    deleteItem = function(id) {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/delete.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 200) {
                    getList();
                }else if(result.code === 1000){
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
        })
    }

})();