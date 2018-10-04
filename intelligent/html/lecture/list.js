(function () {

    _g.setNowPage('lecture/list');
    $('#formContent').html(_g.getTemplate('lecture/list-V'));

    function getTypeList() {
        _g.ajax({
            url: 'http://120.77.204.252:80/lecture/toSave.do',
            success: function(result)  {
                if(result.code == 200){
                    var lpropertymesssge="<option value='-1'>请选择类别</option>";
                    $("#type").append(lpropertymesssge);
                    var categoryList=respData.data.categoryList;
                    for(var i in categoryList){
                        var id=categoryList[i].id;
                        var name=categoryList[i].name;
                        var str='<li><input type="radio" name="d-s-r" value="'+ id +'"><a href="#">'+name+'</a></li>'
                        $("#categoryId").append(str);
                    }
                }
                //code==1000未登录或token失效跳转回登录页面
                if(respData.code==1000){
                    window.location.href ="/signin.html";
                }
            }
        })
    }
    getTypeList();

    var data = {
        currentPage: 1,
        showCount: 5,
        t: {

        }
    }

    var result = { list: [] };
    _g.render('lecture/list-V', result, '#table');

    function getList() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/lecture/queryListPageByAid.do',
            async: false,
            data:  {
                paging: data
            },
            success: function(result) {
                if(result.code === 200) {
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
    // getList();

})();