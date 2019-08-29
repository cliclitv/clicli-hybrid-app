'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var apiready = function apiready() {
    var _methods;

    var app = new Vue({
        el: '#app',
        data: {
            postsList: [],
            loading: true,
            isError: false,
            page: 1,
            user: null
        },
        created: function created() {
            api.setRefreshHeaderInfo({
                bgColor: '#FEFEFE',
                textColor: '#808080',
                textDown: '下拉刷新...',
                textUp: '松开刷新...'
            }, function (ret, err) {
                location.reload();
                api.refreshHeaderLoadDone();
            });
        },
        mounted: function mounted() {
            var _this = this;

            this.getMyBGM();

            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, function (ret, err) {
                console.log('已滚动到底部');
                _this.loadMore();
            });
        },

        methods: (_methods = {
            getImgUrl: function getImgUrl(content) {
                if (content.indexOf('[suo]') !== -1) {
                    return 'background-image:url(' + content.split('[suo](')[1].split(')')[0] + ')';
                } else {
                    if (content.indexOf('![](') !== -1) {
                        return 'background-image:url(' + content.split('](')[1].split(')')[0] + ')';
                    } else {
                        return 'background-image:url("https://b-ssl.duitang.com/uploads/item/201501/07/20150107202826_UXcuQ.gif")';
                    }
                }
            },
            goVideoPlay: function goVideoPlay(pid, title) {
                api.openWin({
                    name: 'videoPlay',
                    url: '../play/videoPlay.html',
                    pageParam: {
                        pid: pid
                    },
                    animation: {
                        type: 'movein'
                    }
                });
            }
        }, _defineProperty(_methods, 'getImgUrl', function getImgUrl(content) {
            if (content.indexOf('[suo]') !== -1) {
                return 'background-image:url(' + content.split('[suo](')[1].split(')')[0] + ')';
            } else {
                if (content.indexOf('![](') !== -1) {
                    return 'background-image:url(' + content.split('](')[1].split(')')[0] + ')';
                } else {
                    return 'background-image:url("https://b-ssl.duitang.com/uploads/item/201501/07/20150107202826_UXcuQ.gif")';
                }
            }
        }), _defineProperty(_methods, 'getMyBGM', function getMyBGM() {
            var _this2 = this;

            api.showProgress({
                style: 'default',
                animationType: 'fade',
                title: '努力加载中...',
                text: '先喝杯茶...',
                modal: false
            });
            axios({
                method: 'get',
                url: 'https://api.clicli.us/posts?status=public&sort=原创&tag=&uid=' + $api.getStorage('user-info').id + '&page=' + this.page + '&pageSize=20'
            }).then(function (response) {
                console.log(JSON.stringify(response));
                if (response.data.code === 200) {
                    if (response.data.posts !== null) {
                        _this2.postsList = response.data.posts;
                        if (response.data.posts.length < 20) {
                            _this2.loading = false;
                        }
                    } else {
                        _this2.loading = false;
                        _this2.postsList = null;
                        api.removeEventListener({
                            name: 'scrolltobottom'
                        });
                    }
                }
                api.hideProgress();
            }).catch(function (error) {
                _this2.loading = false;
                _this2.isError = true;
                api.hideProgress();
            });
        }), _defineProperty(_methods, 'loadMore', function loadMore() {
            var _this3 = this;

            this.page++;
            axios({
                method: 'get',
                url: 'https://api.clicli.us/posts?status=public&sort=原创&tag=&uid=' + $api.getStorage('user-info').id + '&page=' + this.page + '&pageSize=20'
            }).then(function (response) {
                if (response.data.code === 200) {
                    if (response.data.posts !== null) {
                        for (var i = 0; i < response.data.posts.length; i++) {
                            _this3.postsList.push(response.data.posts[i]);
                        }
                        if (response.data.posts.length < 20) {
                            _this3.loading = false;
                        }
                    } else {
                        _this3.loading = false;
                        //移除事件监听
                        api.removeEventListener({
                            name: 'scrolltobottom'
                        });
                    }
                }
                api.hideProgress();
            }).catch(function (error) {
                _this3.loading = false;
                _this3.isError = true;
                api.hideProgress();
            });
        }), _defineProperty(_methods, 'reload', function reload() {
            location.reload();
        }), _defineProperty(_methods, 'goBack', function goBack() {
            api.closeWin();
        }), _methods)
    });
};