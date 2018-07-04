(function() {

    _g.setNowPage('user/admin');
    $('#formContent').html(_g.getTemplate('user/admin-V'));

    var data = {
        page: 1,
        pageSize: 20
    }

    function getList() {
        $.ajax({
            url: 'http://118.89.26.114/manageAdmin/queryAllAdmin.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            success: function(result) {
                var data1 = { list: result };
                _g.render('user/admin-V', data1, '#table');
            },
        });
    }
    getList();

    deleteId = function(aid) {
        if (confirm('您确定要删除此管理员吗？')) {
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
        }
    }

    forbidden = function(aid) {
        if (confirm('您确定要禁用此管理员吗？')) {
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
        }
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