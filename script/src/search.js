apiready = () => {
    const app = new Vue({
        el: '#app',
        data: {
            postsList: [],
            loading: false,
            isNull: true,
            isError: false,
            page: 1
        },
        created() {

        },
        mounted() {
            this.$refs.searchInput.style.width = api.winWidth - 110 + 'px'
            // api.addEventListener({
            //     name: 'scrolltobottom',
            //     extra: {
            //         threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
            //     }
            // }, (ret, err) => {
            //     console.log('已滚动到底部')
            //     this.loadMore()
            // })
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
                    url: '../play/videoPlay.html',
                    pageParam: {
                        pid
                    },
                    animation: {
                        type: 'movein'
                    }
                })
            },
            getPostsList() {
                if(this.$refs.searchInput.value === "") return
                this.loading = true
                this.isNull = false
                this.postsList = []
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/search/posts?key=' + this.$refs.searchInput.value + '&page=1&pageSize=20'
                }).then(response => {
                    if (response.data.code === 201) {
                        if(response.data.posts !== null){
                            this.postsList = response.data.posts
                            if(response.data.posts.length<20){
                                this.loading = false
                            }
                            //暂时没有分页下隐藏loading
                            this.loading = false
                        }else{
                            this.isNull = true
                            this.loading = false
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
            // loadMore() {
            //     this.page ++
            //     axios({
            //         method: 'get',
            //         url: 'https://api.clicli.top/posts/type?status=public&page=' + this.page + '&pageSize=20'
            //     }).then(response => {
            //         if (response.data.code === 201) {
            //             if(response.data.posts !== null){
            //                 for ( let i = 0; i < response.data.posts.length; i ++ ) {
            //                     this.postsList.push(response.data.posts[i])
            //                 }
            //                 if(response.data.posts.length<20){
            //                     this.loading = false
            //                 }
            //             }else{
            //                 this.loading = false
            //                 //移除事件监听
            //                 api.removeEventListener({
            //                     name: 'scrolltobottom'
            //                 })
            //             }
            //         }
            //     }).catch(error => {
            //         this.loading = false
            //         this.isError = true
            //     })
            // },
            close(){
                api.closeWin()
            }
        }
    })
}