(function () {
	
    _g.setNowPage('user/major');
    $('#formContent').html(_g.getTemplate('user/major-V'));

    var data = {
        currentPage: 1,
        pageSize: 5,
        t: {
            mname: '',
            depart:{
                dno:''
            }
        }
    }

    var data1 = { list: [] };
    _g.render('user/major-V', data1, '#table');

    function getList() {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252/deptAndMajor/queryAllMajorByPaging.do',
    		async: false,
    		data: {
    			paging: data
    		},
    		success: function(result) {
    			if(result.code === 200) {
    				var data1 = { list: result.data.paging.list };
                    _g.initPaginator({
                        currentPage: result.data.paging.currentPage,
                        totalPages: result.data.paging.totalPage,
                        totalCount: result.data.paging.tatalCount,
                        onPageClicked: function(page) {
                            console.log(page)
                            data.currentPage = page;
                            getList();
                        }
                    });
                    _g.render('user/major-V', data1, '#table');
    			} else {
    				layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
                            if (result.msg.indexOf('请登录') != -1) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            }
                        }
                    });
    			}
    		}
    	})
    }

    getList();

    function deleteMajor(mno) {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252/deptAndMajor/deleteMajor.do',
    		async: false,
    		data: {
    			mno: mno
    		},
    		success: function(result) {
    			if(result.code === 200) {
    				getList();
    			} else {
    				layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
                        	layer.close(index);
                            if (result.msg.indexOf('请登录') != -1) {
                                window.location.href = '/signin.html';
                            }
                        }
                    });
    			}
    		}
    	})
    }

})();