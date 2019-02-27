apiready = () => {

    const app = new Vue({
        el: '#app',
        data: {
            pid: api.pageParam.pid,
            commentsList: [],
            loading: true,
            isError: false
        },
        mounted(){
            this.$refs.container.style.height = api.winHeight - 9 / 16 * api.winWidth - 2 + 'px'
            this.getCommentsList()
        },
        methods:{
            close(){
                api.sendEvent({
                    name: 'closeAvCommentsFrame'
                })
                api.closeFrame()
            },
            getCommentsList(){
                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/comments?pid=' + this.pid + '&page=1&pageSize=100'
                }).then(response => {
                    if(response.data.code === 201){
                        this.commentsList = response.data.comments
                        this.loading = false
                    }
                }).catch( error => {
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
            },
            reload(){
                location.reload()
            }
        }
    })

}