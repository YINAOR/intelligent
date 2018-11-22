(function () {

    _g.setNowPage('lecture/audit');
    $('#formContent').html(_g.getTemplate('lecture/audit-V'));

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

    var result = { list: [] };
    _g.render('lecture/list-V', result, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/allLecture/queryListPage.do',
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
                    _g.render('lecture/audit-V', data1, '#table');
                    } else {
                        var result = { list: [] };
                        _g.render('lecture/audit-V', result, '#table');
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

    // deleteItem = function(id) {
    //     _g.ajax({
    //         lock: true,
    //         url: 'http://lai.vipgz1.idcfengye.com/intelligent/lecture/delete.do',
    //         data: {
    //             id: id
    //         },
    //         success: function(result) {
    //             if(result.code === 200) {
    //                 getList();
    //             }
    //         }
    //     })
    // }

    auditItem = function(id) {
        _g.openBaseModal('lecture/list-audit-V', {id: id,isLecture: true}, '审核讲座');
    }


    _g.audit = function(id) {
        var status = $('input[name=a]:checked').val();
        var opinion = $('#opinion').val();
        var url = 'http://120.77.204.252:80/allLecture/audit.do';
        _g.ajax({
            lock: true,
            url: url,
            data: {
                lecture: {
                    id: id,
                    status: status,
                    checkDescription: opinion
                }
            },
            success: function(result) {
                if(result.code === 1000){
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
                    if(result.code === 200) {
                        _g.hideBaseModal();
                    }
                }
            }
        })     
    }
})();