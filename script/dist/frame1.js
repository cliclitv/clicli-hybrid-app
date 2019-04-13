'use strict';

var apiready = function apiready() {
    var app = new Vue({
        el: '#app',
        data: {
            postsList: [],
            loading: true,
            isError: false,
            page: 1
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

            this.getPostsList();
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, function (ret, err) {
                console.log('已滚动到底部');
                _this.loadMore();
            });
            api.addEventListener({
                name: 'swiperight'
            }, function (ret, err) {
                api.sendEvent({
                    name: 'swipeToRecommend'
                });
            });
            //监听导航栏双击
            api.addEventListener({
                name: 'navbarDoubleClick'
            }, function (ret, err) {
                if (ret.value.key == 0 && !ret.value.isRecommend) {
                    _this.smoothscroll();
                }
            });
        },

        methods: {
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
                    url: './play/videoPlay.html',
                    pageParam: {
                        pid: pid
                    },
                    animation: {
                        type: 'movein'
                    }
                });
            },
            getPostsList: function getPostsList() {
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
                    url: 'https://api.clicli.us/posts?status=public&sort=bgm&tag=&uid=&page=' + this.page + '&pageSize=20'
                }).then(function (response) {
                    if (response.data.code === 201) {
                        if (response.data.posts !== null) {
                            _this2.postsList = response.data.posts;
                            if (response.data.posts.length < 20) {
                                _this2.loading = false;
                            }
                        } else {
                            _this2.loading = false;
                            _this2.postsList = null;
                        }
                        api.hideProgress();
                    } else {
                        _this2.loading = false;
                        _this2.isError = true;
                        api.hideProgress();
                    }
                }).catch(function (error) {
                    _this2.loading = false;
                    _this2.isError = true;
                    api.hideProgress();
                });
            },
            reload: function reload() {
                location.reload();
            },
            loadMore: function loadMore() {
                var _this3 = this;

                this.page++;
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/posts?status=public&sort=bgm&tag=&uid=&page=' + this.page + '&pageSize=20'
                }).then(function (response) {
                    if (response.data.code === 201) {
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
                }).catch(function (error) {
                    _this3.loading = false;
                    _this3.isError = true;
                });
            },

            //滚动绘制
            smoothscroll: function smoothscroll() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    //告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画
                    window.requestAnimationFrame(this.smoothscroll);
                    //进行页面位置重绘
                    window.scrollTo(0, currentScroll - currentScroll / 5);
                }
            }
        }
    });
};