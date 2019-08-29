'use strict';

var apiready = function apiready() {
    var app = new Vue({
        el: '#app',
        data: {
            weekList: [],
            loading: true,
            isError: false
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

            this.getWeekList();
            //监听导航栏双击
            api.addEventListener({
                name: 'navbarDoubleClick'
            }, function (ret, err) {
                if (ret.value.key == 1) {
                    _this.smoothscroll();
                }
            });
        },

        methods: {
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
            getWeekList: function getWeekList() {
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
                    url: 'https://api.clicli.us/posts?status=nowait&sort=新番&page=1&pageSize=100'
                }).then(function (response) {

                    if (response.data.code === 200) {
                        var ret = {
                            1: [],
                            2: [],
                            3: [],
                            4: [],
                            5: [],
                            6: [],
                            0: []
                        };
                        response.data.posts.forEach(function (item) {
                            var day = new Date(item.time).getDay();
                            ret[day].push(item);
                        });
                        _this2.weekList = ret;
                        _this2.loading = false;
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
            getSuo: function getSuo(content) {
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
            getDay: function getDay(day) {
                if (day == 1) return '周一';
                if (day == 2) return '周二';
                if (day == 3) return '周三';
                if (day == 4) return '周四';
                if (day == 5) return '周五';
                if (day == 6) return '周六';
                if (day == 0) return '周日';
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