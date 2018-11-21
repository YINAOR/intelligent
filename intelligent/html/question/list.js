(function() {

    _g.setNowPage('question/list');
    $('#formContent').html(_g.getTemplate('question/list-V'));

    var result = { list: [] };
    _g.render('question/list-V', result, '#table');

    function getTypeList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/question/toQuery.do',
            success: function(result) {
                if (result.code == 200) {
                    var categoryList = result.data.categoryList;
                    for (var i in categoryList) {
                        var id = categoryList[i].id;
                        var name = categoryList[i].name;
                        var str = '<li><input type="radio" name="d-s-r" value="' + id + '"><a href="#">' + name + '</a></li>'
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
            question: $('#question').val(),
            isFaq: $('#status .active input').val(),
            category: {
                id: $('#type .active input').val()
            }
        }
    }


    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/question/queryQuestionListPage.do',
            async: false,
            data: {
                paging: data
            },
            success: function(result) {
                if (result.code === 200) {
                    if (result.data.paging) {
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
                        _g.render('question/list-V', data1, '#table');
                    } else {
                        var result = { list: [] };
                        _g.render('question/list-V', result, '#table');
                        _g.initPaginator({
                            currentPage: 0,
                            totalPages: 0,
                            totalCount: 0,
                        });
                    }
                } else if (result.code === 1000) {
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
                    })
                }
            },
        });
    }
    getList();

    deleteItem = function(id) {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/question/deleteQuestion.do',
            data: {
                id: id
            },
            success: function(result) {
                if (result.code === 200) {
                    getList();
                }
            }
        })
    }

    setFAQ = function(id, string) {
        var isFaq = 2;
        if (string) {
            isFaq = 1;
        }
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/question/deleteQuestion.do',
            data: {
                id: id,
                isFaq: isFaq
            },
            success: function(result) {
                if (result.code === 200) {
                    getList();
                }
            }
        })
    }

    $('#searchBtn').click(function() {
        data.currentPage = 1;
        data.t.question = $('#question').val();
        data.t.isFaq = $('#status .active input').val();
        data.t.category.id = $('#type .active input').val();
        getList();
    });

    _g.answer = function(id) {
        var solution = $('#replyContent').val();
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/question/answer.do',
            data: {
                id: id,
                solution: solution
            },
            success: function(result) {
                if (result.code === 200) {
                    getList();
                }
            }
        })
    }

})();