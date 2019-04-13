'use strict';

var apiready = function apiready() {

    var pid = api.pageParam.pid,
        title = api.pageParam.title;

    var videoPlayer = api.require('videoPlayer'),
        _isFullScreen = false;

    var _avDetailIsShow = false,
        _avCommentsIsShow = false;

    var app = new Vue({
        el: '#app',
        data: {
            postIntro: [],
            postContent: '',
            videosList: [],
            postCV: 0,
            postPV: 0,
            loading: true,
            isError: false
        },
        mounted: function mounted() {
            this.getPostIntro();
            this.getVideosList();
            this.getPostCV();
            this.getPostPV();
            api.parseTapmode();
        },

        methods: {
            getPostIntro: function getPostIntro() {
                var _this = this;

                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/post/' + pid
                }).then(function (response) {
                    if (response.data.code === 201) {
                        _this.postIntro = response.data.result;
                        var parser = new HyperDown();
                        var html = parser.makeHtml(response.data.result.content);
                        _this.postContent = html;
                        console.log(html);
                    }
                });
            },
            getVideosList: function getVideosList() {
                var _this2 = this;

                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/videos?pid=' + pid + '&page=1&pageSize=300'
                }).then(function (response) {
                    if (response.data.code === 201) {
                        _this2.videosList = response.data.videos;
                        _this2.loading = false;
                        if (response.data.videos !== null) {
                            _this2.loadVideoPlayer(response.data.videos[0].content, response.data.videos[0].title);
                            setTimeout(function () {
                                document.querySelectorAll('.video-item')[0].style.background = 'rgba(0,156,255,0.4)';
                                api.setFullScreen({
                                    fullScreen: true
                                });
                            }, 100);
                        }
                    }
                }).catch(function (error) {
                    _this2.loading = false;
                    _this2.isError = true;
                });
            },
            getPostCV: function getPostCV() {
                var _this3 = this;

                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/post/' + pid
                }).then(function (response) {
                    if (response.data.code === 201) {
                        _this3.postCV = response.data.count.cv;
                    }
                });
            },
            getPostPV: function getPostPV() {
                var _this4 = this;

                axios({
                    method: 'get',
                    url: 'https://www.clicli.us/get/pv?pid=' + pid
                }).then(function (response) {
                    if (response.data.code === 0) {
                        _this4.postPV = response.data.pv;
                    }
                });
            },
            getAvatar: function getAvatar(avatar) {
                if (/^[0-9]+$/.test(avatar)) {
                    return 'https://q2.qlogo.cn/headimg_dl?dst_uin=' + avatar + '&spec=100';
                } else {
                    var hash = md5(avatar);
                    return 'https://cdn.v2ex.com/gravatar/' + hash;
                }
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
            playVideo: function playVideo(url, title, e) {
                videoPlayer.close();
                this.loadVideoPlayer(url, title);
                e.currentTarget.style.background = 'rgba(0,156,255,0.4)';
            },
            loadVideoPlayer: function loadVideoPlayer(url, title) {

                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力加载中...',
                    text: '先喝杯茶...',
                    modal: false
                });

                if (url.indexOf('www.clicli') > -1) {
                    axios({
                        method: 'get',
                        url: url
                    }).then(function (response) {
                        console.log(JSON.stringify(response.data));
                        if (response.data.code === 0) {
                            console.log(response.data.url);
                            _initVideoClient(response.data.url, title);
                        }
                        api.hideProgress();
                    }).catch(function (error) {
                        console.log(JSON.stringify(error));
                        if (error.response.status) {
                            switch (error.response.status) {
                                case 500:
                                    api.toast({
                                        msg: '服务器开小差了',
                                        duration: 2000,
                                        location: 'bottom'
                                    });
                                    break;

                                default:
                            }
                        }
                        api.hideProgress();
                    });
                } else {
                    axios({
                        method: 'get',
                        url: 'https://www.clicli.us/jx?url=' + url
                    }).then(function (response) {
                        if (response.data.code === 0) {
                            console.log(response.data.url);
                            _initVideoClient(response.data.url, title);
                        }
                        api.hideProgress();
                    }).catch(function (error) {
                        console.log(JSON.stringify(error));
                        if (error) {
                            switch (error.response.status) {
                                case 500:
                                    api.toast({
                                        msg: '服务器开小差了',
                                        duration: 2000,
                                        location: 'bottom'
                                    });
                                    break;

                                default:
                            }
                        }
                        api.hideProgress();
                    });
                }
            },
            reload: function reload() {
                location.reload();
            },
            goAvDetail: function goAvDetail() {
                _avDetailIsShow = true;
                api.openFrame({
                    name: 'avDetail',
                    url: './avDetail.html',
                    rect: {
                        x: 0,
                        y: 9 / 16 * api.winWidth - 50,
                        w: api.winWidth,
                        h: api.winHeight - 9 / 16 * api.winWidth + 50
                    },
                    pageParam: {
                        postContent: this.postContent,
                        postIntro: this.postIntro,
                        postPV: this.postPV,
                        postCV: this.postCV
                    },
                    animation: {
                        type: 'movein',
                        subType: 'from_bottom',
                        duration: 300
                    },
                    bounces: false,
                    bgColor: 'rgba(0,0,0,0)',
                    vScrollBarEnabled: true,
                    hScrollBarEnabled: true,
                    overScrollMode: 'always'
                });
            },
            goAvComments: function goAvComments() {
                _avCommentsIsShow = true;
                api.openFrame({
                    name: 'avComments',
                    url: './avComments.html',
                    rect: {
                        x: 0,
                        y: 9 / 16 * api.winWidth - 50,
                        w: api.winWidth,
                        h: api.winHeight - 9 / 16 * api.winWidth + 50
                    },
                    pageParam: {
                        pid: pid
                    },
                    animation: {
                        type: 'movein',
                        subType: 'from_bottom',
                        duration: 300
                    },
                    bounces: false,
                    bgColor: 'rgba(0,0,0,0)',
                    vScrollBarEnabled: true,
                    hScrollBarEnabled: true,
                    overScrollMode: 'always'
                });
            },
            translate: function translate(sortName) {
                switch (sortName) {
                    case 'xinfan':
                        return '新番';
                    case 'tuijian':
                        return '推荐';
                    case 'danmei':
                        return '耽美';
                    case 'moren':
                        return '默认';
                    case 'lianzai':
                        return '连载';
                    case 'wenzhang':
                        return '文章';
                    case 'yuanchuang':
                        return '原创';
                    case 'wanjie':
                        return '完结';
                    default:
                        return '其他';
                }
            }
        }
    });

    //初始化播放器
    function _initVideoClient(url, title) {
        videoPlayer.openPlay({
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: 9 / 16 * api.winWidth
            },
            texts: {
                head: {
                    title: title
                }
            },
            centerPlayBtn: {
                size: 80,
                iconPath: 'widget://image/play.png'
            },
            styles: {
                head: {
                    bg: 'rgba(161,161,161,0)',
                    height: 44,
                    y: 20,
                    titleSize: 20,
                    titleColor: '#fff',
                    backSize: 22,
                    backImg: 'fs://image/back.png',
                    customButtons: []
                },
                foot: {
                    bg: 'rgba(0,0,0,0.15)',
                    height: 44,
                    playSize: 22,
                    playImg: 'fs://img/paly.png',
                    pauseImg: 'fs://img/pause.png',
                    timeSize: 14,
                    timeColor: '#fff',
                    sliderImg: 'fs://img/slder.png',
                    progressColor: '#BEBEBE',
                    progressSelected: '#1296db',
                    rotationSize: 22,
                    verticalImg: 'widget://image/fullscreen.png',
                    horizontalImg: 'widget://image/fullscreen.png'
                }
            },
            path: url,
            coverImg: 'widget://image/coverImg.png',
            autoPlay: false,
            fixed: true
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            if (ret.eventType === 'back') {
                if (ret.value === false) {
                    videoPlayer.close();
                    api.setFullScreen({
                        fullScreen: false
                    });
                    api.closeWin();
                }
            } else if (ret.eventType === 'failed') {
                api.toast({
                    msg: '播放失败,重新试试或上PC站看看吧',
                    duration: 2000,
                    location: 'bottom'
                });
            }
        });

        api.addEventListener({
            name: 'keyback'
        }, function (ret, err) {
            //判断当前是否处于全屏播放
            videoPlayer.isFullscreen(function (ret) {
                if (ret.isFullscreen === false) {
                    if (_avDetailIsShow) {
                        api.closeFrame({
                            name: 'avDetail'
                        });
                        _avDetailIsShow = false;
                    } else if (_avCommentsIsShow) {
                        api.closeFrame({
                            name: 'avComments'
                        });
                        _avCommentsIsShow = false;
                    } else {
                        videoPlayer.close();
                        api.setFullScreen({
                            fullScreen: false
                        });
                        api.closeWin();
                    }
                } else {
                    videoPlayer.onBack();
                }
            });
        });

        api.addEventListener({
            name: 'resume'
        }, function (ret) {
            videoPlayer.onResume();
            videoPlayer.start();
        });

        api.addEventListener({
            name: 'pause'
        }, function (ret) {
            videoPlayer.onPause();
        });
    }

    api.addEventListener({
        name: 'closeAvDetailFrame'
    }, function (ret, err) {
        _avDetailIsShow = false;
    });

    api.addEventListener({
        name: 'closeAvCommentsFrame'
    }, function (ret, err) {
        _avCommentsIsShow = false;
    });
};