(function() {

    _g.setNowPage('user/admin');
    $('#formContent').html(_g.getTemplate('user/admin-V'));

    var data = {
        currentPage: 1,
        pageSize: 5
    }

    function getList() {
        $.ajax({
            url: 'http://118.89.26.114/manageAdmin/queryAllAdminByPaging.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            data: JSON.stringify({data:{"paging": data}}),
            success: function(result) {
                var data1 = { list: result.adminPaging.list};
                _g.initPaginator({
                    currentPage: result.adminPaging.currentPage,
                    totalPages: result.adminPaging.totalPage,
                    totalCount: 15,
                    onPageClicked: function (page) {
                        console.log(page)
                        data.currentPage = page;
                        getList();
                    }
                });
                _g.render('user/admin-V', data1, '#table');
            },
            error: function(error) {
                var data1 = { list: []};
                _g.render('user/admin-V', data1, '#table');
                layer.open({
                    title: '消息',
                    content: '请求超时，请重试！'
                })
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