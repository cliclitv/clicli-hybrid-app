const apiready = () => {

    const app = new Vue({
        el: '#app',
        data: {
            postContent: api.pageParam.postContent,
            postIntro: api.pageParam.postIntro,
            sortArr: [],
            tagArr: [],
            postCV: api.pageParam.postCV,
            postPV: api.pageParam.postPV
        },
        mounted(){
            this.$refs.container.style.height = api.winHeight - 9 / 16 * api.winWidth - 2 + 'px'
            this.$refs.content.innerHTML = this.postContent
            //标签
            let sorts = this.postIntro.sort
            let tags = this.postIntro.tag
            this.sortArr = sorts.trim().split(' ')
            this.tagArr = tags.trim().split(' ')
        },
        methods: {
            close(){
                api.sendEvent({
                    name: 'closeAvDetailFrame'
                })
                api.closeFrame()
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
