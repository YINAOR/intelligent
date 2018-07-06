(function () {
	
    _g.setNowPage('user/speaker');
    $('#formContent').html(_g.getTemplate('user/speaker-V'));

    var data = {
        currentPage: 1,
        pageSize: 5
    }

    function getList() {
        $.ajax({
            url: 'http://118.89.26.114/speakerAndLecType/queryAllSpeaker.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data:JSON.stringify(data),
            success: function(result) {
                var data1 = { list: result.speakerPaging.list };
                _g.initPaginator({
                    currentPage: result.speakerPaging.currentPage,
                    totalPages: result.speakerPaging.totalPage,
                    totalCount: 20,
                    onPageClicked: function (page) {
                        console.log(page)
                        data.currentPage = page;
                        getList();
                    }
                });
                _g.render('user/speaker-V', data1, '#table');
            },
        });
    }
    getList();
})();