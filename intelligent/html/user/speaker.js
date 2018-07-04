(function () {
	
    _g.setNowPage('user/speaker');
    $('#formContent').html(_g.getTemplate('user/speaker-V'));

    function getList() {
        $.ajax({
            url: 'http://118.89.26.114/speakerAndLecType/queryAllSpeaker.do',
            dataType: 'json',
            type: 'POST',
            async: false,
            processData: false,
            contentType: 'application/json',
            data:JSON.stringify({
                currentPage: 1,
                pageSize: 20
            }),
            success: function(result) {
                var data1 = { list: result.speakerPaging.list };
                _g.render('user/speaker-V', data1, '#table');
            },
        });
    }
    getList();
})();