'use strict';

var apiready = function apiready() {
    var app = new Vue({
        el: '#app',
        data: {
            postsList: [],
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
            this.getRecommendList();
            api.addEventListener({
                name: 'swipeleft'
            }, function (ret, err) {
                api.sendEvent({
                    name: 'swipeToNew'
                });
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
            getRecommendList: function getRecommendList() {
                var _this = this;

                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力加载中...',
                    text: '先喝杯茶...',
                    modal: false
                });
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/both?status=public&type=tuijian&page=1&pageSize=20'
                }).then(function (response) {
                    if (response.data.code === 201) {
                        _this.postsList = response.data.posts;
                        _this.loading = false;
                        api.hideProgress();
                    } else {
                        _this.loading = false;
                        _this.isError = true;
                        api.hideProgress();
                    }
                }).catch(function (error) {
                    _this.loading = false;
                    _this.isError = true;
                    api.hideProgress();
                });
            },
            reload: function reload() {
                location.reload();
            }
        }
    });
};