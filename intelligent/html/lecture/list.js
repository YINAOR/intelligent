(function () {

    _g.setNowPage('lecture/list');
    $('#formContent').html(_g.getTemplate('lecture/list-V'));

    var data = {
        currentPage: 1,
        pageSize: 20
    }

    function getList() {
        $.ajax({
            url: 'http://118.89.26.114/lecture/queryLectureByAid.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                if(data.num == 1) {
    			    var result = { list: data.lecturePaging.list };
                    _g.render('lecture/list-V', result, '#table');
    			} else {
    				layer.open({
    					title: '消息',
    					content: data.msg
    				});
    			}
            },
        });
    }
    getList();

})();