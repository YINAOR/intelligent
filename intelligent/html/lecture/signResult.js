(function() {

    _g.setNowPage('lecture/signResult');
    $('#formContent').html(_g.getTemplate('lecture/signResult-V'));

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
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            data: JSON.stringify({
                data: data,
                token: 123
            }),
            success: function(result) {
                alert(1111)
                if (result.num == 1) {
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
    // getList();

    $('#sign').click(function() {
        _g.openBaseModal('lecture/addSign-V', {}, '补签');
    })

    _g.addSign = function() {
        var studentName = $('#studentName').val();
        var studentId = $('#studentId').val();
        
    };

})();