(function () {
	
    _g.setNowPage('lecture/comment');
    $('#formContent').html(_g.getTemplate('lecture/comment-V'));

    var id = _g.pm.param.id;

    var data = {
    	currentPage: 1,
        showCount: 5,
        t: {
        	id: id
        }
    };

    var result = { list: [] };
    _g.render('lecture/comment-V', result, '#table');

    function getComment() {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/lecture/queryCommentListPage.do',
    		data: {
    			paging: data
    		},
    		success: function(result)  {
                if(result.code == 200){
                	if(result.data.paging) {
                		var data1 = { list: result.data.paging.list, currentPage: data.currentPage, showCount: data.showCount };
                        _g.initPaginator({
                            currentPage: result.data.paging.currentPage,
                            totalPages: result.data.paging.totalPage,
                            totalCount: result.data.paging.totalResult,
                            onPageClicked: function(page) {
                                console.log(page)
                                data.currentPage = page;
                                getComment();
                            }
                        });
                        _g.render('lecture/comment-V', data1, '#table');
                	} else {
                        var result = { list: [] };
                        _g.render('lecture/comment-V', result, '#table');
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
    	})
    }

    getComment();


    deleteReply = function(id, floorId) {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/lecture/cancelReply.do',
    		data: {
    			lectureComment: {
    				id: id,
    				floorId: floorId
    			}
    		},
    		success: function(result)  {
                if(result.code == 200){
                	getComment();
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
    };

    deleteComment = function(id,floorId) {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/lecture/deleteComment.do',
    		data: {
    			lectureComment:{
    				id: id,
    				floorId: floorId
    			}
    		},
    		success: function(result) {
    			if(result.code == 200){
                	getComment();
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

    _g.reply = function(id,floorId) {
    	var replyContent = $('#replyContent').val();
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/lecture/replyComment.do',
    		data: {
    			lectureComment: {
    				id: id,
    				floorId: floorId,
    				replyContent: replyContent
    			}
    		},
    		success: function(result) {
    			if(result.code == 200){
                	getComment();
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

})();