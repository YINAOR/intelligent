(function() {

    _g.setNowPage('user/admin');
    $('#formContent').html(_g.getTemplate('user/admin-V'));

    var data = {
        currentPage: 1,
        pageSize: 5,
        t: {
            aname: ''
        }
    }

    var data1 = { list: [] };
    _g.render('user/admin-V', data1, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://118.89.26.114/manageAdmin/queryAllAdminByPaging.do',
            async: false,
            data: { paging: data },
            success: function(result) {
                if (result.code === 200) {
                    var data1 = { list: result.data.paging.list };
                    _g.initPaginator({
                        currentPage: result.data.paging.currentPage,
                        totalPages: result.data.paging.totalPage,
                        totalCount: result.data.paging.totalCount,
                        onPageClicked: function(page) {
                            console.log(page)
                            data.currentPage = page;
                            getList();
                        }
                    });
                    _g.render('user/admin-V', data1, '#table');
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

    deleteId = function(aid) {
        layer.confirm('您确定要删除此管理员吗？', { title: '询问' }, function(index) {
            $.ajax({
                url: 'http://118.89.26.114/manageAdmin/deleteAdmin.do',
                dataType: 'json',
                type: 'POST',
                data: {
                    aid: aid
                },
                success: function(result) {
                    getList();
                }
            });

            layer.close(index);
        });
    }

    forbidden = function(aid) {
        layer.confirm('您确定要禁用此管理员吗？', { title: '询问' }, function(index) {
            $.ajax({
                url: 'http://118.89.26.114/manageAdmin/freezeAccount.do',
                dataType: 'json',
                type: 'POST',
                data: {
                    aid: aid,
                    astatus: 0
                },
                success: function(result) {
                    getList();
                }
            })

            layer.close(index);
        });

    }

    liftForbidden = function(aid) {
        $.ajax({
            url: 'http://118.89.26.114/manageAdmin/freezeAccount.do',
            dataType: 'json',
            type: 'POST',
            data: {
                aid: aid,
                astatus: 1
            },
            success: function(result) {
                getList();
            }
        })

    }

})();