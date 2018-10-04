(function () {
	
    _g.setNowPage('user/student');
    $('#formContent').html(_g.getTemplate('user/student-V'));

    var data = {
        currentPage: 1,
        showCount: 5
    };

    var t = {

    };

    var data1 = { list: [] };
    _g.render('user/student-V', data1, '#table');

    function getList() {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/manageStudent/queryListByPage.do',
    		async: false,
    		data: {
    			paging: data
    		},
    		success: function(result) {
    			if(result.code === 200) {
    				var data1 = { list: result.data.paging.list };
                    _g.initPaginator({
                        currentPage: result.data.paging.currentPage,
                        totalPages: result.data.paging.totalResult,
                        totalCount: result.data.paging.tatalCount,
                        onPageClicked: function(page) {
                            console.log(page)
                            data.currentPage = page;
                            getList();
                        }
                    });
                    _g.render('user/student-V', data1, '#table');
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
    
    deleteStudent = function(id) {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/manageStudent/delete.do',
            data: {
                id: id
            },
            success: function(result) {
                if(result.code === 1000){
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


})();