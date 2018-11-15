(function () {
	
    _g.setNowPage('conversation/appointmentList');
    $('#formContent').html(_g.getTemplate('conversation/appointmentList-V'));

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            teahouse: 
            id: 
            status: 
        }
    };

    var data1 = { list: [] };
    _g.render('conversation/appointmentList-V', data1, '#table');

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
                    _g.render('user/student-V', data1, '#table');
                    } else {
                        var data1 = { list: [] };
                        _g.render('user/student-V', data1, '#table');
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
        data.t.num = $('#id').val();
        data.t.name = $('#name').val();
        data.t.status = $('#status .active input').val();
        data.t.classNum = $('#classNum').val();
        data.t.activeStatus = $('#activeStatus .active input').val();
        data.t.college.id = $('#collegeId').val();
        data.t.major.id = $('#majorId').val();
        getList();
    })


    downloadExcelTemplet = function() {
        var token = sessionStorage.getItem('token');;
        window.location.href='http://120.77.204.252:80/manageStudent/downExcelTemplets.do?token='+token;
    }

    exportExcel = function() {
        var token = sessionStorage.getItem('token');
        window.location.href='http://120.77.204.252:80/manageStudent/exportExcel.do?token='+token;
    }



})();