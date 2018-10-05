(function() {

    _g.setNowPage('user/speaker');
    $('#formContent').html(_g.getTemplate('user/speaker-V'));

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            name: $('#name').val()
        }
    }

    var data1 = { list: [] };
    _g.render('user/speaker-V', data1, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/speaker/queryListByPage.do',
            async: false,
            data: {
                paging: data
            },
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
                    _g.render('user/speaker-V', data1, '#table');
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

    $('#searchBtn').click(function() {
        getList();
    });

    deleteId = function(id) {
        _g.ajax({
            url: 'http://120.77.204.252:80/speaker/delete.do',
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

    downloadExcelTemplet = function() {
        var token = sessionStorage.getItem('token');;
        window.location.href='http://120.77.204.252:80/speaker/downExcelTemplets.do?token='+token;
    }

    exportExcel = function() {
        var token = sessionStorage.getItem('token');
        window.location.href='http://120.77.204.252:80/speaker/exportExcel.do?token='+token;
    }
})();