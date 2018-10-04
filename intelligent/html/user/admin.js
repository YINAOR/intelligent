(function() {

    _g.setNowPage('user/admin');
    $('#formContent').html(_g.getTemplate('user/admin-V'));

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            name: ''
        }
    }

    var data1 = { list: [] };
    _g.render('user/admin-V', data1, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/manageAdmin/queryListByPage.do',
            async: false,
            data: { paging: data },
            success: function(result) {
                if (result.code === 200) {
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
                    _g.render('user/admin-V', data1, '#table');
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

    deleteId = function(id) {
        layer.confirm('您确定要删除此管理员吗？', { title: '询问' }, function(index) {
            _g.ajax({
                url: 'http://120.77.204.252:80/manageAdmin/delete.do',
                data: {
                    id: id
                },
                success: function(result) {
                    if(result.code === 200) {
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
                        });
                    }
                    
                }
            });
            layer.close(index);
        });
    }

    freeze = function(id,status,unfreeze) {
        if(unfreeze) {
            freezeAjax(id,status);
        } else {
            layer.confirm('您确定要冻结此管理员吗？', { title: '询问' }, function(index) {
                freezeAjax(id,status);
                layer.close(index);
            });
        }
        function freezeAjax(id,status) {
            _g.ajax({
                url: 'http://120.77.204.252:80/manageAdmin/freezeAccount.do',
                data: {
                    adminstrator: {
                        id: id,
                        status: status
                    }
                },
                success: function(result) {
                    if(result.code === 200) {
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
                        });
                    }
                }
            })
        }

    }


    logout = function(id) {
        _g.ajax({
            url: 'http://120.77.204.252:80/manageAdmin/forcedLogout.do',
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