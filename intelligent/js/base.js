(function () {
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    if (typeof template != 'undefined') {
        template.defaults.imports.$transTime = function (millisec) {
            if (!millisec) return '';
            if ((millisec + '').length < 13) millisec *= 1000;
            var showText = '';
            var d = new Date();
            d.setTime(millisec);
            showText = d.Format('yyyy-MM-dd hh:mm:ss');
            return showText;
        };
        template.defaults.imports.$transDate = function (millisec) {
            if (!millisec) return '';
            if ((millisec + '').length < 13) millisec *= 1000;
            var showText = '';
            var d = new Date();
            d.setTime(millisec);
            showText = d.Format('yyyy-MM-dd');
            return showText;
        };
        template.defaults.imports.$circleImage = function (path) {
            if (!path) return 'image/logo.png';
            path = 'http://119.23.145.162:8198' + path + '?s=50';
            return path.replace('jpg', 'png');
        };
        template.defaults.imports.$transAddress = function (address) {
            if (address.length < 30) return address;
            else {
                // var _address = Substring('0','30',address);
                return address.substring(0, 24) + '...';
            }
        };
    }

    var base = {
        uzStorage: function () {
            var ls = window.localStorage;
            if (this.isAndroid && !window.location.host) ls = os.localStorage();
            return ls;
        },
        setLS: function (key, value) {
            if (arguments.length === 2) {
                var v = value;
                if (typeof v == 'object') {
                    v = JSON.stringify(v);
                    v = 'obj-' + v;
                } else {
                    v = 'str-' + v;
                }
                var ls = this.uzStorage();
                if (ls) {
                    ls.setItem(key, v);
                }
            }
        },
        getLS: function (key) {
            var ls = this.uzStorage();
            if (ls) {
                var v = ls.getItem(key);
                if (!v) {
                    return;
                }
                if (v.indexOf('obj-') === 0) {
                    v = v.slice(4);
                    return JSON.parse(v);
                } else if (v.indexOf('str-') === 0) {
                    return v.slice(4);
                }
            }
        },
        rmLS: function (key) {
            var ls = this.uzStorage();
            if (ls && key) ls.removeItem(key);
        },
        clearLS: function () {
            var ls = this.uzStorage();
            if (ls) ls.clear();
        },
        logger: function () {
            if (_c.env === 'pro' || !_c.debug) return;
            this.logger = console.log;
        },
        j2s: function (obj) {
            return JSON.stringify(obj);
        },
        s2j: function (s) {
            return JSON.parse(s);
        },
        checkNumber: function (number) {
            return (window.isFinite(number) && number >= 0);
        },
        summernote: function (selector, opts) {
            opts = opts || {};
            setTimeout(function () {
                $(selector).summernote({
                    height: opts.height || 600,
                    toolbar: opts.toolbar || [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['misc', ['link', 'picture', 'codeview', 'undo', 'redo']],
                    ],
                    callbacks: {
                        onInit: opts.onInit
                    }
                });
            }, 150);
        },
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        GetQueryObject: function (query) {
            var search = window.location.search.substr(1);
            if (!query && search == '') return {};
            if (query) search = query.replace(/\+/g, ' ');
            var params = search.split('&');
            var result = {};
            for (var i = 0; i < params.length; i++) {
                var param = params[i].split('=');
                param[1] = decodeURIComponent(param[1]);
                // console.log(param[0], param[1])
                if (param[1] != '' && '' + Number(param[1]) != 'NaN') {
                    param[1] = Number(param[1]);
                }
                result[param[0]] = param[1];
            }
            return result;
        },
        ToQueryString: function (QueryObject) {
            var result = [];
            for (var key in QueryObject) {
                result.push(key + '=' + QueryObject[key]);
            }
            return result.join('&');
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return decodeURI(arr[2]);
            else
                return null;
        },
        setErrorAlert: function (opts) {
            var domStr = '\
            <div class="alert alert-' + (opts.type || 'danger') + ' m-t-md">\
                <button type="button" class="close" data-dismiss="alert">&times;</button>\
                <i class="fa fa-ban-circle"></i><span>' + opts.errorText + '</span>\
            </div>';
            var target = opts.target || '#messageArea';
            $(target).html($(domStr));
        },
        removeAlert: function (selector) {
            $(selector || '.alert').remove();
        },
        ajax: function (opts) {
            var _g = this;
            if (!opts) return;
            if (opts.lock) this.showLoading();
            if(opts.isSignin) {
                var postData = {
                    data: $.extend(true, {}, opts.data)
                };
            }
            var postData = {
                data: $.extend(true, {}, opts.data),
                token: opts.token || sessionStorage.getItem('token')
            };

            // postData.sessionKey = opts.sessionKey || _g.getCookie('sessionKey');
            // postData.data = opts.data;
            // postData.token = opts.token || sessionStorage.token; //|| _g.getCookie('token');
            // postData.appVersion = '0.0.1';
            // postData.apiVersions = 'v1';
            // postData.deviceCode = 'developer';
            // postData.platform = 0;
            // postData.timestamp = Math.round(new Date().getTime() / 1000);
            // postData.token = _g.dm.tokenKey;
            // postData.token = md5.go(_g.jsonToPostDataStr(_g.ksort(postData)));
            // console.log(_g.jsonToPostDataStr(_g.ksort(postData)) + _g.dm.tokenKey);
            console.log(postData.token);
            // console.log(postData);
            $.ajax({
                type: opts.type || 'post',
                url: opts.url,
                async: opts.async || true,
                data: JSON.stringify(postData),
                dataType: 'json',
                contentType: opts.contentType || 'application/json', //'application/x-www-form-urlencoded'
                processData: opts.processData || false, //!== false,
                success: function (result) {
                    // console.log(opts.async);
                    _g.hideLoading();
                    // if (result.code != 200) {
                    //     if (_c.env == 'dev' || _c.env == 'test') {
                    //         alert(result.message);
                    //         window.location.href = '/admin/signin.html';
                    //         return;
                    //     }
                    // }
                    // if (result.code === 4005 || result.code === 1000) {
                    //     // alert(result.message);
                    //     window.location.href = 'signin.html';
                    //     return;
                    // }
                    opts.success && opts.success(result);
                },
                error: function (err) {
                    _g.hideLoading();
                    if(opts.error) {
                        opts.error && opts.error(err);
                    } else {
                        layer.open({
                            title: '消息',
                            content: '请求超时，请重试！'
                        });
                    } 
                }
            });
        },
        render: function (temp, data, target) {
            var htmlStr = template.render(this.getTemplate(temp), data);
            if (target) $(target).html(htmlStr);
            // this.initChosenSelect();
            // this.initFileInput();
            // var initDateInputOptions = {
            //     format: 'YYYY-MM-DD HH:mm:ss'
            // };
            // initDateInputOptions = $.extend(true, initDateInputOptions, this.pm.options.initDateInput);
            // this.pm.data.DateInputList = this.initDateInput(initDateInputOptions);
            // this.initFormMatch();
            return htmlStr;
        },
        getTemplate: function (url) {
            var template = '';
            $.ajax({
                url: './html/' + url + '.html?_=' + new Date().getTime(),
                async: false,
                success: function (result) {
                    template = result;
                    _g.loader.check(function () {
                    });
                },
                error: function (msg) {
                    console.log('找不到:' + url + '模板,请检查');
                }
            });
            return template
        },
        openWin: function (url, param) {
            if (!_g.dm.canOpen) return;
            _g.dm.canOpen = false;
            var openUrl = '';
            if (param) {
                if (typeof param == 'object') {
                    // openUrl = url + ',' + this.j2s(param);
                    openUrl = url;
                } else {
                    openUrl = url + ',' + param;
                }
            } else {
                openUrl = url;
            }
            setTimeout(function () {
                _g.dm.openPrev = '';
                _g.dm.canOpen = true;
            }, 700);
            if (this.dm.openPrev == openUrl) return;
            this.dm.openPrev = url;

            /*if (url != 'workerUser/wallet' && _g.dm.powerApis.indexOf(url.split('/')[0]) == -1) {
                alert('没有权限操作,请联系管理员!');
                return;
            }*/
            if (!this.loader.finish) return;
            this.initCommonBjaxBtn();
            this.pm.methods = {};
            this.pm.data = {};
            this.pm.param = {};
            if (param) {
                if (typeof param != 'object') {
                    $.each(param.split('&'), function (i, val) {
                        var kv = val.split('=');
                        _g.pm.param[kv[0]] = kv[1];
                    });
                } else {
                    _g.pm.param = param;
                }
            }

            this.$commonBjaxBtn.attr('href', '').attr('href', 'html/' + url + '.html?_=' + new Date().getTime()).trigger('click');
        },
        renderBaseModalData: function (temp, data, title) {
            var htmlStr = template.render(this.getTemplate(temp), data);
            $('#baseModalLabel').text(title);
            $('#baseModalContent').html(htmlStr);
        },
        openBaseModal: function (temp, data, title) {
            var htmlStr = template.render(this.getTemplate(temp), data);
            $('#baseModalLabel').text(title);
            $('#baseModalContent').html(htmlStr);
            this.$commonModalBtn.trigger('click');
            setTimeout(function () {
                _g.initChosenSelect();
                _g.initDateInput();
                var initDateInputOptions = {
                    format: 'YYYY-MM-DD HH:mm:ss'
                };
                initDateInputOptions = $.extend(true, initDateInputOptions, _g.pm.options.initDateInput);
                _g.pm.data.DateInputList = _g.initDateInput(initDateInputOptions);
            }, 300);
        },
        hideBaseModal: function () {
            $('#baseModal').trigger('click');
        },
        setNowPage: function (path) {
            this.pm.prev = this.pm.now;
            this.pm.now = path;
            var hash = path;
            if (_.isObject(this.pm.param)) {
                var param = this.ToQueryString(this.pm.param);
                if (param) hash = path + ',' + encodeURIComponent(param);
            } else {
                hash = path;
            }
            window.location.hash = hash;
        },
        initPaginator: function (opts) {
            if (opts.target) {
                if (opts.totalCount == 0) {
                    $(opts.target + ' .pagination').closest('.panel-footer').hide();
                } else {
                    $($(opts.target + ' .pagination')[0]).closest('.panel-footer').show();
                    $($(opts.target + ' .pagination')[0]).bootstrapPaginator({
                        currentPage: opts.currentPage,
                        totalPages: opts.totalPages,
                        numberOfPages: opts.numberOfPages || 7,
                        onPageClicked: function (e, originalEvent, type, page) {
                            e.stopImmediatePropagation();
                            var currentTarget = $(e.currentTarget);
                            var pages = currentTarget.bootstrapPaginator("getPages");
                            var current = pages.current;
                            if (page != current) {
                                opts.onPageClicked && opts.onPageClicked(page);
                            }
                        }
                    });
                    $(opts.target + ' .pagination').find('ul').addClass('pagination pagination-sm m-t-none m-b-none');
                    $(opts.target + ' .totalCount').html(opts.totalCount);
                    $(opts.target + ' .totalPages').html(opts.totalPages);
                }
            } else {
                if (opts.totalCount == 0) {
                    $('#pagination').closest('.panel-footer').hide();
                } else {
                    $('#pagination').closest('.panel-footer').show();
                    $('#pagination').bootstrapPaginator({
                        currentPage: opts.currentPage,
                        totalPages: opts.totalPages,
                        numberOfPages: opts.numberOfPages || 7,
                        onPageClicked: function (e, originalEvent, type, page) {
                            e.stopImmediatePropagation();
                            var currentTarget = $(e.currentTarget);
                            var pages = currentTarget.bootstrapPaginator("getPages");
                            var current = pages.current;
                            if (page != current) {
                                opts.onPageClicked && opts.onPageClicked(page);
                            }
                        }
                    });
                    $('#pagination').find('ul').addClass('pagination pagination-sm m-t-none m-b-none');
                    $('#totalCount').html(opts.totalCount);
                    $('#totalPages').html(opts.totalPages);
                }
            }
        },
        initPopup: function (content) {
            $('.ui-popup__bd').html(content);
        },
        initClip: function () {
            var clipboard2 = new Clipboard('.copyZclip');
            clipboard2.on('success', function (e) {
                console.log(e);
                alert("复制成功！")
            });
            clipboard2.on('error', function (e) {
                console.log(e);
                alert("复制失败！请手动复制")
            });
        },
        showPopup: function () {
            $('.ui-popup').show();
        },
        showLoading: function () {
            document.activeElement.blur();
            $('.ui-loading').show();
        },
        hideLoading: function () {
            $('.ui-loading').hide();
        },
        initFormMatch: function () {
            $('form').parsley();
        },
        initChosenSelect: function () {
            $('.chosen-select').length && $('.chosen-select').chosen();
        },
        initDateInput: function (opts) {
            opts = opts || {};
            var DateInputList = [];
            $('.datepicker-input').each(function () {
                var DateInput = $(this).datetimepicker({
                    locale: 'zh-cn',
                    sideBySide: true,
                    showClear: true,
                    // showTodayButton: true,
                    format: opts.format || 'YYYY-MM-DD'
                });
                DateInputList.push(DateInput.data('DateTimePicker'));
            });
            this.pm.data.DateInputList = DateInputList;
            return DateInputList;
        },
        initFileInput: function (opts) {
            // $(':file').filestyle('destroy');
            $('.filestyle:file').filestyle({
                input: true,
                icon: false,
                buttonText: '选择文件',
                buttonName: 'btn btn-default',
                classInput: 'form-control inline v-middle input-s',
                classButton: 'btn btn-default',
                size: 'nr',
                iconName: 'glyphicon-folder-open',
                disabled: false,
                buttonBefore: false,
                badge: true,
                placeholder: '请选择上传文件'
            });
        },
        initCommonModalBtn: function () {
            $('#commonModalBtn').remove();
            var commonModalStr = '\
                <span id="commonModalBtn" data-toggle="modal" data-target="#baseModal" class="btn btn-s-md btn-primary"></span>\
            ';
            this.$commonModalBtn = $(commonModalStr);
            this.$commonModalBtn.css({
                'position': 'absolute',
                'left': '-1px',
                'top': '-1px',
                'width': '1px',
                'height': '1px',
                'overflow': 'hidden',
                'opacity': 0
            });
            $('body').append(this.$commonModalBtn);
        },
        initCommonBjaxBtn: function () {
            $('#commonBjaxBtn').remove();
            var commonBjaxStr = '\
                <a id="commonBjaxBtn" href="" data-bjax="" data-target="#bjax-target" data-el="#content" class="bg-black auto">\
                    <i class="fa fa-chevron-right text-xs"></i>\
                    <span>通用按钮</span>\
                </a>\
            ';
            this.$commonBjaxBtn = $(commonBjaxStr);
            this.$commonBjaxBtn.css({
                'position': 'absolute',
                'left': '-1px',
                'top': '-1px',
                'width': '1px',
                'height': '1px',
                'overflow': 'hidden',
                'opacity': 0
            });
            $('body').append(this.$commonBjaxBtn);
        },
        checkHash: function () {
            var hash = window.location.hash.slice(1);
            if (hash) {
                var url = hash.split(',')[0];
                var param = hash.split(',')[1];
                if (param) param = decodeURIComponent(param);
                this.openWin(url, param);
            }
        },
        initPage: function () {
            // 初始化加载器
            this.loader = {
                need: 1,
                loaded: 0,
                finish: false,
                check: function (callback) {
                    this.loaded++;
                    if (this.loaded >= this.need) {
                        this.finish = true;
                        callback && callback();
                    }
                }
            };
            // 初始化数据管理器 dm = data manager
            this.dm = {
                powerApis: '',
                canOpen: true,
                openPrev: '',
                tokenKey: '7aeeb7da08390a43f73f97e3bc319c79'
            };
            // 初始化通用Bjax按钮
            this.initCommonBjaxBtn();
            // 初始化通用Modal按钮
            this.initCommonModalBtn();
            // 加载公共头部
            $('#commonHeader').html(_g.getTemplate('common/header-V'));
            // 加载侧边导航
            // $('#commonNav').html(_g.getTemplate('common/nav-V'));

            // 初始化页面管理器 pm = page manager
            this.pm = {
                prev: '', // 上个页面
                now: 'index', // 当前页面
                param: {}, // 页面要传递的参数, JSON对象
                data: {}, // 当前页面存储的数据
                methods: {}, // 当前页面存储的方法
                options: {}, // 当前页面的配置项
            };
            // 检查Hash
            // this.checkHash();
            // 绑定弹出层关闭事件
            $('.ui-popup__close, .ui-popup__bg').click(function () {
                $('.ui-popup').hide();
            });

            // initClip
            this.initClip();
        },
        exportExcel: function (tableid) {
            if (getExplorer() == 'ie') {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");

                //创建AX对象excel
                var oWB = oXL.Workbooks.Add();
                //获取workbook对象
                var xlsheet = oWB.Worksheets(1);
                //激活当前sheet
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                //把表格中的内容移到TextRange中
                sel.select();
                //全选TextRange中内容
                sel.execCommand("Copy");
                //复制TextRange中内容
                xlsheet.Paste();
                //粘贴到活动的EXCEL中
                oXL.Visible = true;
                //设置excel可见属性

                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);

                    oWB.Close(savechanges = false);
                    //xls.visible = false;
                    oXL.Quit();
                    oXL = null;
                    //结束excel进程，退出完成
                    //window.setInterval("Cleanup();",1);
                    idTmr = window.setInterval("Cleanup();", 1);
                }
            }
            else {
                tableToExcel(tableid)
            }
        },
        openAdminDruid: function () {
            window.open('/admin/druid/login.html');
        },
        openAppDruid: function () {
            window.open('/app/druid/login.html');
        },
        ksort: function (a, b) {
            var e, f, g, c = {},
                d = [],
                h = this,
                i = !1,
                j = {};
            switch (b) {
                case "SORT_STRING":
                    e = function (a, b) {
                        return h.strnatcmp(a, b)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var k = this.i18n_loc_get_default();
                    e = this.php_js.i18nLocales[k].sorting;
                    break;
                case "SORT_NUMERIC":
                    e = function (a, b) {
                        return a + 0 - (b + 0)
                    };
                    break;
                default:
                    e = function (a, b) {
                        var c = parseFloat(a),
                            d = parseFloat(b),
                            e = c + "" === a,
                            f = d + "" === b;
                        return e && f ? c > d ? 1 : d > c ? -1 : 0 : e && !f ? 1 : !e && f ? -1 : a > b ? 1 : b > a ? -1 : 0
                    }
            }
            for (g in a) a.hasOwnProperty(g) && d.push(g);
            for (d.sort(e), this.php_js = this.php_js || {}, this.php_js.ini = this.php_js.ini || {}, i = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && "off" !== this.php_js.ini["phpjs.strictForIn"].local_value, j = i ? a : j, f = 0; f < d.length; f++) g = d[f], c[g] = a[g], i && delete a[g];
            for (f in c) c.hasOwnProperty(f) && (j[f] = c[f]);
            return i || j
        },
        jsonToPostDataStr: function (json) {
            var PostDataStr = '';
            for (var i in json) {
                PostDataStr += i + '=' + json[i] + '&';
            }
            return PostDataStr == '' ? PostDataStr : PostDataStr.slice(0, -1);
        }
    };
    window._g = base;

    _g.initPage();

    // $('#global_username').text(_g.getCookie('loginName'));

    var idTmr;

    function getExplorer() {
        var explorer = window.navigator.userAgent;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
            return 'Chrome';
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
            return 'Opera';
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            return 'Safari';
        }
    }

    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }

    var tableToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="Content-Type" charset=utf-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g,
                    function (m, p) {
                        return c[p];
                    })
            }
        return function (table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
        }
    })()

    var power = {
        getPower: function () {
            var _p = this;
            _g.ajax({
                data: {},
                url: '/admin/adminUser/getPower.do',
                success: function (result) {
                    if (result.code == 200 || result.code == 4005) {
                        var data = result.data;
                        _g.dm.powerApis = data.powerApis;
                        var adminPowers = data.adminMenus;
                        var navHtml = _p.createDownList(adminPowers);
                        $('#commonNav').html(navHtml);
                        _g.loader.check(function () {
                            _g.checkHash();
                        });
                        _g.getArticleClassify();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },

        //无限极分类创建部门列表
        //递归创建无限极分类
        createList: function (list, index) {
            var _p = this;
            //获取当前index节点的子节点的信息
            var tmp = list[index];
            var str = '';
            if (tmp) {
                var ulHtml = '<ul class="nav" data-ride="collapse">';
                var liHtml = '';
                if (tmp[0].isParent == 2) {
                    ulHtml = '<ul class="nav dk text-sm" style="display: none;">';
                }
                str += ulHtml;
                for (var i = 0; i < tmp.length; i++) {

                    if (tmp[i].isParent == 2) {
                        var api = tmp[i].url;
                        var pram = '';
                        if (api.indexOf(',')) {
                            pram = api.split(',')[1];
                            api = api.split(',')[0];
                        }
                        var aHref = '<a href="javascript:_g.openWin(\'' + api + '\');" class="bg-black auto">';
                        if (api.indexOf('/admin/druid/login.html') > -1) {
                            aHref = '<a href="javascript:_g.openAdminDruid();" class="bg-black auto">';
                        } else if (api.indexOf('/app/druid/login.html') > -1) {
                            aHref = '<a href="javascript:_g.openAppDruid();" class="bg-black auto">';
                        } else {
                            if (pram) {
                                aHref = '<a href="javascript:_g.openWin(\'' + api + '\',\'' + pram + '\');" class="bg-black auto">';
                            }
                        }

                        liHtml = '\
                    ' + aHref + '\
                    <i class="fa fa-chevron-right text-xs"></i>\
                        <span>' + tmp[i].title + '</span>\
                        </a>\
                    ';
                    } else {
                        liHtml = '\
                    <a href="javascript:;" class="auto">\
                        <span class="pull-right text-muted">\
                    <i class="fa fa-angle-right text"></i>\
                    <i class="fa fa-angle-down text-active"></i>\
                    </span>\
                    <i class="icon-settings icon"></i>\
                    <span>' + tmp[i].title + '</span>\
                    </a>\
                    ';
                    }
                    //获取id用来递归
                    var id = tmp[i].id;
                    str += '<li>';
                    str += liHtml;
                    //递归
                    str += _p.createList(list, id);
                    str += '</li>';
                }
                str += '</ul>';
            }
            return str;
        },

        //入口函数，必须有的是id和parentId
        createDownList: function (arr) {
            var _p = this;
            //初始化对象
            var list = {};
            var pid = '';
            //循环遍历数组，将数据放到对应的parentId下
            for (var i = 0; i < arr.length; i++) {
                //获取父节点下标
                pid = arr[i].parentId;
                //如果为定义，就定义为空数组
                if (!list[pid]) {
                    list[pid] = [];
                }
                //将当前节点信息加入到父元素中
                list[pid].push(arr[i]);
            }
            //排序，其实没有的话也行，我这里是为了确定某一个分类在当前兄弟分类的顺序
            for (var key in list) {
                list[key].sort(function (a, b) {
                    return a.order > b.order ? 1 : -1;
                });
            }
            //传入根节点（也就是最顶级分类）的下标
            return _p.createList(list, 0);
        }
    };
    window._power = power;
})();
