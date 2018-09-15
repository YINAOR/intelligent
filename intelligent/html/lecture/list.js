(function () {

    _g.setNowPage('lecture/list');
    $('#formContent').html(_g.getTemplate('lecture/list-V'));

    var data = {
        currentPage: 1,
        pageSize: 20
    }

    var result = { list: [] };
    _g.render('lecture/list-V', result, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://118.89.26.114/lecture/queryLectureByAid.do',
            async: false,
            data:  {paging: data},
            success: function(result) {
                $("#lprono").empty();
                if(result.code === 200) {
                    var lpropertyList = result.data.lpropertyList;
                    for(var i in lpropertyList){
                        var id = lpropertyList[i].lprono;
                        var name = lpropertyList[i].lproname;
                        var str="<li><input type='radio' name='d-s-r' value="+id+"><a href='#'>"+ name +"</a></li>"
                        $("#lprono").append(str);
                    };
                    
    			    var result = { list: result.data.paging.list };
                    _g.render('lecture/list-V', result, '#table');
    			} else {
    				layer.open({
    					title: '消息',
    					content: result.msg,
                        yes: function(index){
                            if(result.msg.indexOf('请登录') != -1) {
                                layer.close(index);
                                window.location.href = '/signin.html';
                            }
                        }
    				});
    			}
            },  
        });
    }
    getList();

})();