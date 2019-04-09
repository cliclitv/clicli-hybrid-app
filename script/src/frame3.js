const apiready = () => {
    const app = new Vue({
        el: '#app',
        data: {
            postsList: [],
            loading: true,
            isError: false,
            page: 1
        },
        created() {

        },
        mounted() {
            this.getPostsList()
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, (ret, err) => {
                console.log('已滚动到底部')
                this.loadMore()
            });
        },
        methods: {
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
            getPostsList() {
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/type?status=ugc&page='+ this.page +'&pageSize=20'
                }).then(response => {
                    if (response.data.code === 201) {
                        if(response.data.posts !== null){
                            this.postsList = response.data.posts
                            if(response.data.posts.length<20){
                                this.loading = false
                            }
                        }else{
                            this.loading = false
                            this.postsList = null
                        }
                    }
                }).catch(error => {
                    this.loading = false
                    this.isError = true
                })
            },
            reload() {
                location.reload()
            },
            loadMore() {
                this.page ++
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/posts/type?status=ugc&page=' + this.page + '&pageSize=20'
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
            getAvatar(avatar){
                if (/^[0-9]+$/.test(avatar)) {
                    return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
                } else {
                    let hash = md5(avatar)
                    return `https://cdn.v2ex.com/gravatar/${hash}`
                }
            }
        }
    })
}
