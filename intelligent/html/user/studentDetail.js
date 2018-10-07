(function() {

    _g.setNowPage('user/seudentDetail');

    $('#formContent').html(_g.getTemplate('user/studentDetail-V'));

    var id = _g.pm.param.id;

    function getInformation() {
        _g.ajax({
            lock: true,
            url: 'http://120.77.204.252:80/manageStudent/queryDetail.do',
            async: false,
            data: {
                id: id
            },
            success: function(result) {
                if (result.code == 200) {
                    var id = result.data.student.num;
                    var name = result.data.student.name;
                    var gender = result.data.student.gender === 0 ? '男' : '女';
                    var institution = result.data.student.college.name;
                    var major = result.data.student.major.name;
                    var classNum = result.data.student.classNum;
                    var enrollmentTime = result.data.student.enrollmentTime;
                    var mobile = result.data.student.mobile;
                    var email = result.data.student.email;
                    var nickname = result.data.student.nickname;
                    var status = result.data.student.status === 0 ? '正常' : '冻结';
                    $('#id').val(id);
                    $('#name').val(name);
                    $('#gender').val(gender);
                    $('#college').val(institution);
                    $('#major').val(major);
                    $('#classNum').val(classNum);
                    $('#enrollmentTimeStr').vla(enrollmentTime);
                    $('#mobile').val(phone);
                    $('#email').val(email);
                    $('#nickname').val(nickname);
                    $('#status').val(status);
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

    getInformation();




})();