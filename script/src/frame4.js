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

            if(this.isLogin == '1'){
                api.addEventListener({
                    name: 'scrolltobottom',
                    extra: {
                        threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
                    }
                }, (ret, err) => {
                    console.log('已滚动到底部')
                    this.loadMore()
                })
            }
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
                    url: 'https://api.clicli.top/auth'
                }).then(response => {
                    console.log(JSON.stringify(response))
                    if (response.data.code === 201) {
                        if(this.isLogin === '1'){
                            const user = $api.getStorage('user-info')
                            this.user = user
                            this.getPostsList()
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
            getPostsList(){
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/both?status=public&uid=' + this.user.id + '&page=' + this.page + '&pageSize=20'
                }).then(response => {
                    console.log(JSON.stringify(response));
                    if (response.data.code === 201) {
                        if(response.data.posts !== null){
                            this.postsList = response.data.posts
                            if(response.data.posts.length<20){
                                this.loading = false
                            }
                        }else{
                            this.loading = false
                            this.postsList = null
                            api.removeEventListener({
                                name: 'scrolltobottom'
                            })
                        }
                    }
                }).catch(error => {
                    this.loading = false
                    this.isError = true
                })
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
            loadMore(){
                this.page ++
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/both?status=public&uid=' + this.user.id + '&page=' + this.page + '&pageSize=20'
                }).then(response => {
                    if (response.data.code === 201) {
                        if(response.data.posts !== null){
                            for ( let i = 0; i < response.data.posts.length; i ++ ) {
                                this.postsList.push(response.data.posts[i])
                            }
                            if(response.data.posts.length<20){
                                this.loading = false
                            }
                        }else{
                            this.loading = false
                            //移除事件监听
                            api.removeEventListener({
                                name: 'scrolltobottom'
                            })
                        }
                    }
                }).catch(error => {
                    this.loading = false
                    this.isError = true
                })
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
