(function () {
    _g.setNowPage('aDEliteCoin/edit');
    var id = _g.pm.param.id;
    var reqObj = {
        page: 1,
        pageSize: 20,
    };

    _g.pm.methods = {
        render: function (data) {
            var self = this;
            _g.render('aDEliteCoin/edit-V', data, '#formContent');
            _g.initFileInput();
            _g.initDateInput();
            $('#photoInput > input:file').change(function () {
                self.upload(this);
            });

            $('form').submit(function () {
                var couponIds = [];
                $('#coupon').find('option:selected').each(function () {
                    couponIds.push($(this).val());
                });
                var query = $('form').serialize();
                var data = _g.GetQueryObject(query);
                if (!data.id) data.id = 0;
                data.couponId = couponIds.join(',');
                _g.logger(data);
                if (data.coinPrice == '') {
                    _g.setErrorAlert({
                        errorText: '精英币金额不能为空.'
                    });
                    return false;
                } else if (data.originPrice == '') {
                    _g.setErrorAlert({
                        errorText: '原价不能为空.'
                    });
                    return false;
                } else if (data.discountPrice == '') {
                    _g.setErrorAlert({
                        errorText: '折扣价不能为空.'
                    });
                    return false;
                } else if (data.couponId == '') {
                    _g.setErrorAlert({
                        errorText: '赠送卡券不能为空.'
                    });
                    return false;
                }
                self.postData(data);
                return false;
            });
        },
        postData: function (data) {
            var url = '/admin/aDEliteCoin/add.do';
            if (data.id) {
                url = '/admin/aDEliteCoin/update.do';
            }
            _g.ajax({
                data: data,
                url: url,
                success: function (result) {
                    if (result.code == 200) {
                        _g.openWin('aDEliteCoin/list');
                    }
                }
            });
        },
        getData: function (id) {

            _g.ajax({
                data: {
                    id: Number(id)
                },
                url: '/admin/aDEliteCoin/detail.do',
                success: function (result) {
                    if (result.code == 200) {
                        _g.pm.methods.getCouponList(result.data);
                    }
                }
            });
        },

        getCouponList: function (eliteCoinData) {
            var self = this;
            _g.ajax({
                data: reqObj,
                url: '/admin/aDCoupon/listAll.do',
                success: function (result) {
                    if (result.code == 200) {
                        if (eliteCoinData != null) {
                            var couponIds = eliteCoinData.couponId.split(',');
                            _.each(result.data, function (val) {
                                var flag = _.indexOf(couponIds, val.id + '');
                                if (flag > -1) {
                                    val.selected = 1;
                                } else {
                                    val.selected = 0;
                                }
                            });
                        }

                        var _data = {
                            couponList: result.data
                        };
                        _data = _.extend(_data, eliteCoinData);
                        _g.logger(_data);
                        self.render(_data);
                    }

                }
            });
        },
    };

    if (id) {
        _g.pm.methods.getData(id)
    } else {
        _g.pm.methods.getCouponList();
    }


})();