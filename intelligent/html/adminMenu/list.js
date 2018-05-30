(function () {
    _g.setNowPage('adminMenu/list');
    var reqObj = {
        page: 1,
        pageSize: 20,
    };

    _g.pm.methods = {
        deleteItem: function (_id) {
            if (confirm('是否确定删除?')) {
                _g.ajax({
                    data: {
                        id: _id
                    },
                    url: '/admin/adminMenu/delete.do',
                    success: function (result) {
                        if (result.code == 200) {
                            _power.getPower();
                            getUserList();
                        } else {
                            _g.setErrorAlert({
                                errorText: result.message
                            });
                        }
                    }
                });
            }
        }
    };

    function getUserList() {
        _g.ajax({
            data: reqObj,
            url: '/admin/adminMenu/list.do',
            success: function (result) {
                if (result.code == 200) {
                    var data = {list: result.data.list};
                    _g.initPaginator({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        totalCount: result.data.totalCount,
                        onPageClicked: function (page) {
                            reqObj.page = page;
                            getUserList();
                        }
                    });
                    _g.render('adminMenu/list-V', data, '#table');
                }
            }
        });
    }

    getUserList();

})();
