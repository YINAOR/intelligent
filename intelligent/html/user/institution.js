(function () {
	
    _g.setNowPage('user/institution');
    $('#formContent').html(_g.getTemplate('user/institution-V'));

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            name: $('#college').val(),
            status: $('#status .active input').val()
        }
    }

    var data1 = { list: [] };
    _g.render('user/institution-V', data1, '#table');

    function getList() {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/college/queryListByPage.do',
    		async: false,
    		data: {
    			paging: data
    		},
    		success: function(result) {
    			if(result.code === 200) {
                    if(result.data.paging) {
                        if(result.data.paging.list.length > 0){
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
                        _g.render('user/institution-V', data1, '#table');
                    }
                } else {
                    var data1 = { list: [] };
                    _g.render('user/institution-V', data1, '#table');
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

    getList();

    deleteInstitution = function(dno) {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/college/delete.do',
    		async: false,
    		data: {
    			id: dno
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

    $('#searchBtn').click(function() {
        data.currentPage = 1;
        data.t.name = $('#college').val();
        data.t.status = $('#status .active input').val();
        getList();
    })

    downloadExcelTemplet = function() {
        var token = sessionStorage.getItem('token');;
        window.location.href='http://120.77.204.252:80/college/downExcelTemplets.do?token='+token;
    }

    exportExcel = function() {
        var token = sessionStorage.getItem('token');
        window.location.href='http://120.77.204.252:80/college/exportExcel.do?token='+token;
    }

})();