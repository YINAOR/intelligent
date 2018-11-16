(function() {

    _g.setNowPage('lecture/signResult');
    $('#formContent').html(_g.getTemplate('lecture/signResult-V'));

    var id = _g.pm.param.id;

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            lecture: {
                id: id,
                participateWay: $('#participateWay .active input').val(),
                signStatus: $('#signStatus .active input').val()
            }
        }
    }

    
    var data1 = { list: [] };
    _g.render('lecture/signResult-V', data1, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/querySignListPageByLecture.do',
            async: false,
            data: {
                paging: data
            },
            success: function(result) {
                if(result.code === 200) {
                    if(result.data.paging) {
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
                    var data1 = { list: result.data.paging.list, currentPage: data.currentPage, showCount: data.showCount};
                    _g.render('lecture/signResult-V', data1, '#table');
                    } else {
                        var data1 = { list: [] };
                        _g.render('lecture/signResult-V', data1, '#table');
                    }
                    
                } else if(result.code === 1000){
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
                }
            }
        })
    }

    getList();

    $('#searchBtn').click(function() {
        data.currentPage = 1;
        data.t.participateWay = $('#participateWay .active input').val();
        data.t.signStatus = $('#signStatus .active input').val();
        getList();
    })

    $('#sign').click(function() {
        _g.openBaseModal('lecture/addSign-V', {}, '补签');
    })

    _g.addSign = function() {
        // var studentName = $('#studentName').val();
        var studentId = $('#studentId').val();
        _g.ajax({
            lock: true,
            url:'http://120.77.204.252:80/lecture/supplement.do',
            data: {
                lectureId: id,
                num: studentId,
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
                    if(result.code === 200) {
                        $('#studentId').val('');
                    }      
                }
            }
        })
    };

})();