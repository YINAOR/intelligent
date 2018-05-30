(function () {
    _g.setNowPage('adminMenu/edit');
    var id = _g.pm.param.id;
    if (id) {
        getData(id)
    } else {
        render({});
    }

    _g.pm.methods = {

    };

    function upload(fileInput) {
        var $form = $('<form enctype="multipart/form-data"></form>');
        $form.append($(fileInput).clone());
        $form.ajaxSubmit({
            url: '/admin/ajaxUpload.do',
            beforeSubmit: function () {
                $('#photoInput > input:file').filestyle('disabled', true);
                _g.setErrorAlert({
                    type: 'success',
                    errorText: '正在上传...'
                });
            },
            success: function (result) {
                setTimeout(function () {
                    $('#photoInput > input:file').filestyle('disabled', false);
                }, 500);
                if (result.code == 200) {
                    $('input[name="photo"]').val(result.data.imgUrl);
                    setTimeout(function () {
                        _g.removeAlert();
                        $('#prePhoto').html('<img src="' + result.data.imgUrl + '" style="width: 150px; height: 80px;">');
                    }, 500);
                } else {
                    _g.setErrorAlert({
                        errorText: result.message
                    });
                }
            }, //处理完成 
            resetForm: true,
            type: 'post',
            dataType: 'json'
        });
    }

    function render(data) {
        _g.render('adminMenu/edit-V', data, '#formContent');

        _g.initFileInput();
        _g.initDateInput();
        $('#photoInput > input:file').change(function () {
            upload(this);
        });

        if (!id) {
            // 初始化选项
            $('input[name="isParent"]').each(function (isParentIndex, isParentItem) {
                if (isParentIndex == 0) {
                    $(isParentItem).attr('checked', true);
                    $('input[name="type"]').each(function (typeIndex, typeItem) {
                        $(typeItem).attr('disabled', true);
                    });
                    $('input[name="url"]').attr('readonly', 'readonly');
                    $('select').attr('disabled', 'disabled');
                }
            });
            $('input[name="type"]').each(function (typeIndex, typeItem) {
                if (typeIndex == 0) {
                    $(typeItem).attr('checked', true);
                }
            });
        } else {
            if (data.isParent == 1) {
                $('select').html('');
                $('input[name="url"]').val('');
                $('select').attr('disabled', 'disabled');
                $('input[name="url"]').attr('readonly', 'readonly');
                $('input[name="type"]').each(function (typeIndex, typeItem) {
                    $(typeItem).attr('disabled', true);
                });
            }
        }
        // 如果是父级
        $('input[name="isParent"]').click(function () {
            if ($(this).val() == 1) { // 是父级
                $('select').html('');
                $('input[name="url"]').val('');
                $('select').attr('disabled', 'disabled');
                $('input[name="url"]').attr('readonly', 'readonly');
                $('input[name="type"]').each(function (typeIndex, typeItem) {
                    $(typeItem).attr('disabled', true);
                });
            } else {
                $('input[name="type"]').each(function (typeIndex, typeItem) {
                    $(typeItem).removeAttr("disabled");
                });
                if ($('input[name="type"]:checked').val() == 1) {
                    $('input[name="url"]').attr('readonly', false);
                    getParentList(0);
                    $('select').removeAttr("disabled");
                } else {
                    getParentList(0);
                    $('select').removeAttr("disabled");
                    $('input[name="url"]').attr('readonly', false);
                }
            }
        });

        $('form').submit(function () {
            var query = $('form').serialize();
            var data = _g.GetQueryObject(query);
            if (!data.id) data.id = 0;
            if (data.title == '') {
                _g.setErrorAlert({
                    errorText: '标题不能为空.'
                });
            } else {
                postData(data);
            }
            return false;
        });
    }

    function postData(data) {
        var url = '/admin/adminMenu/add.do';
        if (data.id) {
            url = '/admin/adminMenu/update.do';
        }
        _g.ajax({
            data: data,
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    _power.getPower();
                    _g.openWin('adminMenu/list');
                }
            }
        });
    }

    function getData(id) {
        _g.ajax({
            data: {
                id: Number(id)
            },
            url: '/admin/adminMenu/detail.do',
            success: function (result) {
                if (result.code == 200) {
                    render(result.data);
                    if (result.data.isParent != 1) {
                        getParentList(result.data.parentId);
                    }
                }
            }
        });
    }

    function getParentList(_id) {
        _g.ajax({
            data: {
                level: 0
            },
            url: '/admin/adminMenu/listParent.do',
            success: function (result) {
                if (result.code == 200) {
                    var options = '';
                    $.each(result.data, function (index, item) {
                        if (_id == item.id) {
                            options += '<option value="' + item.id + '" selected>' + item.title + '</option>'
                        } else {
                            options += '<option value="' + item.id + '">' + item.title + '</option>'
                        }
                    });
                    $('select').html(options);
                }
            }
        });
    }

})();
