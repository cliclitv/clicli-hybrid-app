const apiready = () => {

    let pid = api.pageParam.pid,
        title = api.pageParam.title

    let videoPlayer = api.require('videoPlayer'),
        _isFullScreen = false

    let _avDetailIsShow = false,
        _avCommentsIsShow = false

    const app = new Vue({
        el: '#app',
        data: {
            postIntro: [],
            sortArr: [],
            tagArr: [],
            postContent: '',
            videosList: [],
            postCV: 0,
            postPV: 0,
            loading: true,
            isError: false
        },
        mounted() {
            this.getPostIntro()
            this.getVideosList()
            this.getPostCV()
            this.getPostPV()
            api.parseTapmode()
        },
        methods: {
            getPostIntro() {
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/post/' + pid
                }).then(response => {
                    if (response.data.code === 200) {
                        this.postIntro = response.data.result

                        let sorts = this.postIntro.sort
                        let tags = this.postIntro.tag

                        if(sorts != ' '){
                            this.sortArr = sorts.trim().split(' ')
                        }else{
                            this.sortArr = []
                        }

                        if(tags != ' '){
                            this.tagArr = tags.trim().split(' ')
                        }else{
                            this.tagArr = []
                        }

                        let parser = new HyperDown
                        let html = parser.makeHtml(response.data.result.content)
                        this.postContent = html
                        console.log(html);
                    }
                })
            },
            getVideosList() {
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/videos?pid=' + pid + '&page=1&pageSize=300'
                }).then(response => {
                    if (response.data.code === 200) {
                        this.videosList = response.data.videos
                        this.loading = false
                        if (response.data.videos !== null) {
                            setTimeout(() => {
                                document.querySelectorAll('.video-item')[0].style.background = 'rgba(0,156,255,0.4)'
                                this.loadVideoPlayer(response.data.videos[0].content, response.data.videos[0].title)
                            }, 300)
                        }
                    }
                }).catch(error => {
                    this.loading = false
                    this.isError = true
                })
            },
            getPostCV() {
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/post/' + pid
                }).then(response => {
                    if (response.data.code === 200) {
                        this.postCV = response.data.result.count.cv
                    }
                })
            },
            getPostPV() {
                axios({
                    method: 'get',
                    url: 'https://jx.clicli.us/get/pv?pid=' + pid
                }).then(response => {
                    if (response.data.code === 0) {
                        this.postPV = response.data.pv
                    }
                })
            },
            getAvatar(avatar) {
                if (/^[0-9]+$/.test(avatar)) {
                    return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
                } else {
                    let hash = md5(avatar)
                    return `https://cdn.v2ex.com/gravatar/${hash}`
                }
            },
            getImgUrl(content) {
                if(content.indexOf('[suo]') !== -1){
                    return 'background-image:url('+ content.split('[suo](')[1].split(')')[0] +')'
                }else{
                    if(content.indexOf('![](') !== -1){
                        return 'background-image:url('+ content.split('](')[1].split(')')[0] +')'
                    }else{
                        return 'background-image:url("https://b-ssl.duitang.com/uploads/item/201501/07/20150107202826_UXcuQ.gif")'
                    }
                }
            },
            playVideo(url, title, e) {
                videoPlayer.close()
                this.loadVideoPlayer(url, title)
                e.currentTarget.style.background = 'rgba(0,156,255,0.4)'
            },
            loadVideoPlayer(url, title) {

                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力加载中...',
                    text: '先喝杯茶...',
                    modal: false
                })

                if (url.indexOf('jx.clicli') > -1) {
                    axios({
                        method: 'get',
                        url
                    }).then(response => {
                        console.log(JSON.stringify(response.data));
                        if (response.data.code === 0) {
                            console.log(response.data.url)
                            _initVideoClient(response.data.url, title)
                        }
                        api.hideProgress()
                    }).catch( error => {
                        console.log(JSON.stringify(error))
                        if(error.response.status){
                            switch (error.response.status) {
                                case 500:
                                    api.toast({
                                        msg: '服务器开小差了',
                                        duration: 2000,
                                        location: 'bottom'
                                    })
                                    break;

                                default:
                            }
                        }
                        api.hideProgress()
                    })
                } else {
                    axios({
                        method: 'get',
                        url: 'https://jx.clicli.us/jx?url=' + url
                    }).then(response => {
                        if (response.data.code === 0) {
                            console.log(response.data.url)
                            _initVideoClient(response.data.url, title)
                        }
                        api.hideProgress()
                    }).catch( error => {
                        console.log(JSON.stringify(error))
                        if(error){
                            switch (error.response.status) {
                                case 500:
                                    api.toast({
                                        msg: '服务器开小差了',
                                        duration: 2000,
                                        location: 'bottom'
                                    })
                                    break;

                                default:
                            }
                        }
                        api.hideProgress()
                    })
                }
            },
            reload() {
                location.reload()
            },
            goAvDetail() {
                _avDetailIsShow = true
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
                })

            },
            goAvComments() {
                _avCommentsIsShow = true
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
                        pid
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
                })

            }
        }
    })


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
                    title
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
                    customButtons: [],
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
                    horizontalImg: 'widget://image/fullscreen.png',
                }
            },
            path: url,
            coverImg: 'widget://image/coverImg.png',
            autoPlay: false,
            fixed: true
        }, function(ret, err) {
            console.log(JSON.stringify(ret));
            if (ret.eventType === 'back') {
                if (ret.value === false) {
                    videoPlayer.close()
                    api.setFullScreen({
                        fullScreen: false
                    })
                    api.closeWin()
                }
            } else if (ret.eventType === 'failed') {
                api.toast({
                    msg: '播放失败,重新试试或上PC站看看吧',
                    duration: 2000,
                    location: 'bottom'
                });
            } else if (ret.eventType === 'show') {
                api.setFullScreen({
                    fullScreen: true
                })
            }
        });

        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            //判断当前是否处于全屏播放
            videoPlayer.isFullscreen(function(ret) {
                if (ret.isFullscreen === false) {
                    if (_avDetailIsShow) {
                        api.closeFrame({
                            name: 'avDetail'
                        })
                        _avDetailIsShow = false
                    } else if (_avCommentsIsShow) {
                        api.closeFrame({
                            name: 'avComments'
                        })
                        _avCommentsIsShow = false
                    } else {
                        videoPlayer.close()
                        api.setFullScreen({
                            fullScreen: false
                        })
                        api.closeWin()
                    }
                } else {
                    videoPlayer.onBack()
                }
            })
        });

        api.addEventListener({
            name: 'resume'
        }, function(ret) {
            videoPlayer.onResume()
            videoPlayer.start()
        });

        api.addEventListener({
            name: 'pause'
        }, function(ret) {
            videoPlayer.onPause()
        });

    }

    api.addEventListener({
        name: 'closeAvDetailFrame'
    }, function(ret, err) {
        _avDetailIsShow = false
    });

    api.addEventListener({
        name: 'closeAvCommentsFrame'
    }, function(ret, err) {
        _avCommentsIsShow = false
    });

}
