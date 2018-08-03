(function() {

    _g.setNowPage('user/personalInformation');

    $('#formContent').html(_g.getTemplate('user/personalInformation-V'));

    function getInformation() {
        $.ajax({
            url: 'http://118.89.26.114/admin/queryAdministratorById.do',
            dataType: 'json',
            type: 'GET',
            processData: false,
            contentType: 'application/json',
            success: function(result) {
                if (result.code == 200) {
                    var id = result.data.aid;
                    var username = result.data.ano;
                    var institution = result.data.aorganization;
                    var permission = result.data.permission;
                    $('#id').val(id);
                    $('#username').val(username);
                    $('#institution').val(institution);
                    $('#permisson').val(permission);
                }
            }
        })
    }

    getInformation();




})();