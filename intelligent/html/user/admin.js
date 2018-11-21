(function() {

    _g.setNowPage('user/admin');
    $('#formContent').html(_g.getTemplate('user/admin-V'));

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            account: $('#account').val(),
            status: $('#status .active input').val()
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
                    _g.render('user/admin-V', data1, '#table');
                    } else {
                        var data1 = { list: [] };
                        _g.render('user/admin-V', data1, '#table');
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

    deleteId = function(id,index) {
        layer.confirm('您确定要删除此管理员吗？', { title: '询问' }, function(index) {
            _g.ajax({
                url: 'http://120.77.204.252:80/manageAdmin/delete.do',
                data: {
                    id: id
                },
                success: function(result) {
                    if(result.code === 200) {
                        if(index%data.showCount === 1) {
                            data.currentPage--;
                        }
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
        layer.confirm('您确定要强制此管理员下线吗？', { title: '询问' }, function(index) {
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
        layer.close(index);
        });
    }

    resetPassword = function(id) {
        layer.confirm('您确定要重置此管理员密码吗？', { title: '询问' }, function(index) {
            _g.ajax({
                url: 'http://120.77.204.252:80/manageAdmin/resetPassword.do',
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
            layer.close(index);
        });
    }

    $('#search').click(function() {
        data.currentPage = 1;
        data.t.account= $('#account').val();
        data.t.status = $('#status .active input').val();
        getList();
    })

    $('input[type="file"]').change(function() {
            var token = sessionStorage.getItem('token');
            $.ajax({
                url: 'http://120.77.204.252:80/category/readExcel.do?token='+ token,
                dataType: "json",
                type: "POST",
                async: false,
                contentType: false,
                processData: false,
                data: new FormData($('#excelForm')[0]),
                success: function(result) {
                    $('.ui-loading').hide();
                    if (result.code === 1000) {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                            yes: function(index) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            }
                        });
                    } else {
                        layer.open({
                            title: '消息',
                            content: result.msg,
                        });
                        if (result.code === 200) {
                            layer.msg('上传数据成功！');
                            getList();
                        }
                    }
                },
                error: function(error) {
                    $('.ui-loading').hide();
                    _g.hideLoading();
                    layer.open({
                        title: '消息',
                        content: '上传数据超时，请重试！',
                    });
                }
            })
        })


    downloadExcelTemplet = function() {
        var token = sessionStorage.getItem('token');;
        window.location.href='http://120.77.204.252:80/manageAdmin/downExcelTemplets.do?token=' + token;
    }

    exportExcel = function() {
        var token = sessionStorage.getItem('token');
        window.location.href='http://120.77.204.252:80/manageAdmin/exportExcel.do?token=' + token;
    }

})();