const apiready = () => {
    const app = new Vue({
        el: '#app',
        data: {
            weekList: [],
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
            this.getWeekList()
            //监听导航栏双击
            api.addEventListener({
                name: 'navbarDoubleClick'
            }, (ret, err) => {
                if(ret.value.key == 1){
                    this.smoothscroll()
                }
            })
        },
        methods: {
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
            getWeekList() {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力加载中...',
                    text: '先喝杯茶...',
                    modal: false
                })
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/both?status=public&sort=xinfan&page=1&pageSize=100'
                }).then(response => {

                    if (response.data.code === 201) {
                        let ret = {
                            1: [],
                            2: [],
                            3: [],
                            4: [],
                            5: [],
                            6: [],
                            0: [],
                        }
                        response.data.posts.forEach(item => {
                            let day = new Date(item.time).getDay()
                            ret[day].push(item)
                        })
                        this.weekList = ret
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
            getSuo(content) {
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
            getDay(day) {
                if (day == 1) return '周一'
                if (day == 2) return '周二'
                if (day == 3) return '周三'
                if (day == 4) return '周四'
                if (day == 5) return '周五'
                if (day == 6) return '周六'
                if (day == 0) return '周日'
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
