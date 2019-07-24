const apiready = () => {
    const app = new Vue({
        el: '#app',
        data: {
            postsList: [],
            loading: true,
            isError: false
        },
        created() {
            api.setRefreshHeaderInfo({
                bgColor: '#FEFEFE',
                textColor: '#808080',
                textDown: '下拉刷新...',
                textUp: '松开刷新...'
            }, (ret, err) => {
                location.reload()
                api.refreshHeaderLoadDone()
            })
        },
        mounted() {
            this.getRecommendList()
            api.addEventListener({
                name: 'swipeleft'
            }, (ret, err) => {
                api.sendEvent({
                    name: 'swipeToNew'
                })
            })
            //监听导航栏双击
            api.addEventListener({
                name: 'navbarDoubleClick'
            }, (ret, err) => {
                if(ret.value.key == 0 && ret.value.isRecommend){
                    this.smoothscroll()
                }
            })
        },
        methods: {
            getImgUrl(content) {
                if (content.indexOf('[suo]') !== -1) {
                    return 'background-image:url(' + content.split('[suo](')[1].split(')')[0] + ')'
                } else {
                    if (content.indexOf('![](') !== -1) {
                        return 'background-image:url(' + content.split('](')[1].split(')')[0] + ')'
                    } else {
                        return 'background-image:url("https://b-ssl.duitang.com/uploads/item/201501/07/20150107202826_UXcuQ.gif")'
                    }
                }
            },
            goVideoPlay(pid, title) {
                api.openWin({
                    name: 'videoPlay',
                    url: './play/videoPlay.html',
                    pageParam: {
                        pid
                    },
                    animation: {
                        type: 'movein'
                    }
                })
            },
            getRecommendList() {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力加载中...',
                    text: '先喝杯茶...',
                    modal: false
                })
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/posts?status=public&sort=bgm&tag=推荐&page=1&pageSize=10'
                }).then(response => {
                    if (response.data.code === 200) {
                        this.postsList = response.data.posts
                        this.loading = false
                        api.hideProgress()
                    } else {
                        this.loading = false
                        this.isError = true
                        api.hideProgress()
                    }
                }).catch(error => {
                    this.loading = false
                    this.isError = true
                    api.hideProgress()
                })
            },
            reload() {
                location.reload()
            },
            //滚动绘制
            smoothscroll() {
                let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
                if (currentScroll > 0) {
                    //告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画
                    window.requestAnimationFrame(this.smoothscroll)
                    //进行页面位置重绘
                    window.scrollTo(0, currentScroll - (currentScroll / 5))
                }
            }
        }
    })
}
