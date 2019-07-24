'use strict';

var apiready = function apiready() {
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
            this.getAuth();

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
                var _this = this;

                axios.defaults.withCredentials = true;
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/auth'
                }).then(function (response) {
                    console.log(JSON.stringify(response));
                    if (response.data.token) {
                        if (_this.isLogin === '1') {
                            var user = $api.getStorage('user-info');
                            _this.user = user;
                        } else {
                            _this.user = null;
                            _this.loading = false;
                            _this.postsList = null;
                        }
                    } else {
                        _this.user = null;
                        _this.loading = false;
                        _this.postsList = null;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    _this.user = null;
                    _this.loading = false;
                    _this.isError = true;
                    _this.postsList = null;
                });
            },
            getMyBGM: function getMyBGM() {
                if (this.isLogin === '1') {
                    api.openWin({
                        name: 'myBGM',
                        url: './mine/myBGM.html',
                        pageParam: {
                            name: 'test'
                        }
                    });
                } else {
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
                }
            },
            getMyUp: function getMyUp() {
                if (this.isLogin === '1') {
                    api.openWin({
                        name: 'myUp',
                        url: './mine/myUp.html',
                        pageParam: {
                            name: 'test'
                        }
                    });
                } else {
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