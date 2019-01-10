(function () {
	
    _g.setNowPage('conversation/appointmentList');
    $('#formContent').html(_g.getTemplate('conversation/appointmentList-V'));

    var id = _g.pm.param.id;

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {
            teahouse: {
                id: id,
                status: $('#status .active input').val()
            }
        }
    };

    var data1 = { list: [] };
    _g.render('conversation/appointmentList-V', data1, '#table');

    function getList() {
    	_g.ajax({
    		lock: true,
    		url: 'http://120.77.204.252:80/teahouse/queryAppointmentListPageByTeahouse.do',
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
                    _g.render('conversation/appointmentList-V', data1, '#table');
                    } else {
                        var data1 = { list: [] };
                        _g.render('conversation/appointmentList-V', data1, '#table');
                    }
    				
    			} else if(result.code === 1000){
    				layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index) {
                            layer.close(index);
                            window.location.href = 'signin.html';
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
        data.t.status = $('#status .active input').val();
        getList();
    })

    _g.appointment = function(studentId){
        var status = $('input[name=a]:checked').val();
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/teahouse/processAppointment.do',
            data: {
                appointment: {
                    teahouse: {
                        id: id   
                    },
                    student: {
                        id: studentId
                    },
                    status: status
                }
            },
            success: function(result) {
                if(result.code === 1000){
                    layer.open({
                        title: '消息',
                        content: result.msg,
                        yes: function(index){
                            layer.close(index);
                            window.location.href = 'signin.html';
                        }
                    });
                } else{
                    layer.open({
                        title: '消息',
                        content: result.msg,
                    })
                    if(result.code === 200) {
                        _g.hideBaseModal();
                    }
                }
            }
        })     
    }


    // downloadExcelTemplet = function() {
    //     var token = sessionStorage.getItem('token');;
    //     window.location.href='http://120.77.204.252:80/manageStudent/downExcelTemplets.do?token='+token;
    // }

    // exportExcel = function() {
    //     var token = sessionStorage.getItem('token');
    //     window.location.href='http://120.77.204.252:80/manageStudent/exportExcel.do?token='+token;
    // }



})();