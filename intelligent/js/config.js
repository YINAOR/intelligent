(function () {
    var config = {
        webTitle: 'cms管理后台',
        copyright: 'lrkj.com',
        debug: true,
        env: 'dev',
        // env: 'test',
        // env: 'pro',
        articleType: {
            hotArticle: '热点文案',
            imgArticle: '美文美图',
            userProtocol: '用户协议',
            aboutUs: '关于我们',
        },
        // 类型: 1.海报分类 2.标记分类 3.水印素材分类 4.文案分类 5.团队素材分组
        adClassify: {
            1: '海报分类',
            2: '标记分类',
            3: '水印素材分类',
            4: '文案分类',
            5: '团队素材分组',
        }
    };
    window._c = config;
})();