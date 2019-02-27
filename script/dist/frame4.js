apiready = function apiready() {
    var app = new Vue({
        el: "#app",
        data: {
            postsList: [],
            loading: true,
            isError: false,
            page: 1,
            user: null,
            isLogin: $api.getStorage('isLogin')
        },
        mounted: function mounted() {
            var _this = this;

            this.getAuth();

            if(this.isLogin == '1'){
                api.addEventListener({
                    name: 'scrolltobottom',
                    extra: {
                        threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
                    }
                }, function (ret, err) {
                    console.log('已滚动到底部');
                    _this.loadMore();
                });
            }
            api.addEventListener({
                name: 'loginSuccess'
            }, function (ret, err) {
                location.reload();
            });
            api.addEventListener({
                name: 'logout'
            }, function (ret, err) {
                location.reload();
            });
        },

        methods: {
            getAuth: function getAuth() {
                var _this2 = this;

                axios.defaults.withCredentials = true;
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/auth'
                }).then(function (response) {
                    console.log(JSON.stringify(response));
                    if (response.data.code === 201) {
                        if (_this2.isLogin === '1') {
                            var user = $api.getStorage('user-info');
                            _this2.user = user;
                            _this2.getPostsList();
                        } else {
                            _this2.user = null;
                            _this2.loading = false;
                            _this2.postsList = null;
                        }
                    } else {
                        _this2.user = null;
                        _this2.loading = false;
                        _this2.postsList = null;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    _this2.user = null;
                    _this2.loading = false;
                    _this2.isError = true;
                    _this2.postsList = null;
                });
            },
            getPostsList: function getPostsList() {
                var _this3 = this;

                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/both?status=public&uid=' + this.user.id + '&page=' + this.page + '&pageSize=20'
                }).then(function (response) {
                    console.log(JSON.stringify(response));
                    if (response.data.code === 201) {
                        if (response.data.posts !== null) {
                            _this3.postsList = response.data.posts;
                            if (response.data.posts.length < 20) {
                                _this3.loading = false;
                            }
                        } else {
                            _this3.loading = false;
                            _this3.postsList = null;
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
            getAvatar: function getAvatar(avatar) {
                if (/^[0-9]+$/.test(avatar)) {
                    return 'https://q2.qlogo.cn/headimg_dl?dst_uin=' + avatar + '&spec=100';
                } else {
                    var hash = md5(avatar);
                    return 'https://cdn.v2ex.com/gravatar/' + hash;
                }
            },
            reload: function reload() {
                location.reload();
            },
            loadMore: function loadMore() {
                var _this4 = this;

                this.page++;
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/both?status=public&uid=' + this.user.id + '&page=' + this.page + '&pageSize=20'
                }).then(function (response) {
                    if (response.data.code === 201) {
                        if (response.data.posts !== null) {
                            for (var i = 0; i < response.data.posts.length; i++) {
                                _this4.postsList.push(response.data.posts[i]);
                            }
                            if (response.data.posts.length < 20) {
                                _this4.loading = false;
                            }
                        } else {
                            _this4.loading = false;
                            //移除事件监听
                            api.removeEventListener({
                                name: 'scrolltobottom'
                            });
                        }
                    }
                }).catch(function (error) {
                    _this4.loading = false;
                    _this4.isError = true;
                });
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
            goLogin: function goLogin() {
                api.openFrame({
                    name: 'login',
                    url: './login/login.html',
                    animation: {
                        type: 'movein',
                        subType: 'from_right',
                        duration: 300
                    }
                });
                api.sendEvent({
                    name: 'loginPageOpenStatus',
                    extra: {
                        key: 1
                    }
                });
            },
            getMyInfo: function getMyInfo() {
                api.openWin({
                    name: 'myInfo',
                    url: './mine/myInfo.html',
                    pageParam: {
                        user: this.user
                    }
                });
            }
        }
    });
};
