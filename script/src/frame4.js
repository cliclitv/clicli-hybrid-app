const apiready = () => {
    const app = new Vue({
        el: "#app",
        data: {
            postsList: [],
            loading: true,
            isError: false,
            page: 1,
            user: null,
            isLogin: $api.getStorage('isLogin')
        },
        mounted(){
            this.getAuth()

            api.addEventListener({
                name: 'loginSuccess'
            }, function(ret, err){
                location.reload()
            })
            api.addEventListener({
                name: 'logout'
            }, function(ret, err){
                location.reload()
            })
        },
        methods: {
            getAuth(){
                axios.defaults.withCredentials=true
                axios({
                    method: 'get',
                    url: 'https://api.clicli.us/auth'
                }).then(response => {
                    console.log(JSON.stringify(response))
                    if (response.data.token) {
                        if(this.isLogin === '1'){
                            const user = $api.getStorage('user-info')
                            this.user = user
                        }else{
                            this.user = null
                            this.loading = false
                            this.postsList = null
                        }
                    }else{
                        this.user = null
                        this.loading = false
                        this.postsList = null
                    }
                }).catch(error => {
                    console.log(JSON.stringify(error))
                    this.user = null
                    this.loading = false
                    this.isError = true
                    this.postsList = null
                })
            },
            getMyBGM(){
                if(this.isLogin === '1'){
                    api.openWin({
                        name: 'myBGM',
                        url: './mine/myBGM.html',
                        pageParam: {
                            name: 'test'
                        }
                    })
                }else{
                    api.openFrame({
                        name: 'login',
                        url: './login/login.html',
                        animation: {
                            type: 'movein',
                            subType: 'from_right',
                            duration: 300
                        }
                    })
                    api.sendEvent({
                        name: 'loginPageOpenStatus',
                        extra: {
                            key: 1
                        }
                    })
                }
            },
            getMyUp(){
                if(this.isLogin === '1'){
                    api.openWin({
                        name: 'myUp',
                        url: './mine/myUp.html',
                        pageParam: {
                            name: 'test'
                        }
                    })
                }else{
                    api.openFrame({
                        name: 'login',
                        url: './login/login.html',
                        animation: {
                            type: 'movein',
                            subType: 'from_right',
                            duration: 300
                        }
                    })
                    api.sendEvent({
                        name: 'loginPageOpenStatus',
                        extra: {
                            key: 1
                        }
                    })
                }
            },
            getAvatar(avatar){
                if (/^[0-9]+$/.test(avatar)) {
                    return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
                } else {
                    let hash = md5(avatar)
                    return `https://cdn.v2ex.com/gravatar/${hash}`
                }
            },
            reload(){
                location.reload()
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
            goLogin(){
                api.openFrame({
                    name: 'login',
                    url: './login/login.html',
                    animation: {
                        type: 'movein',
                        subType: 'from_right',
                        duration: 300
                    }
                })
                api.sendEvent({
                    name: 'loginPageOpenStatus',
                    extra: {
                        key: 1
                    }
                })
            },
            getMyInfo(){
                api.openWin({
                    name: 'myInfo',
                    url: './mine/myInfo.html',
                    pageParam: {
                        user: this.user
                    }
                })
            }
        }
    })
}
