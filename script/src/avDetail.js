apiready = () => {

    const app = new Vue({
        el: '#app',
        data: {
            postContent: api.pageParam.postContent,
            postIntro: api.pageParam.postIntro,
            postCV: api.pageParam.postCV,
            postPV: api.pageParam.postPV
        },
        mounted(){
            this.$refs.container.style.height = api.winHeight - 9 / 16 * api.winWidth - 2 + 'px'
            this.$refs.content.innerHTML = this.postContent
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
            },
            translate(sortName) {
                switch (sortName) {
                    case 'xinfan':
                        return '新番'
                    case 'tuijian':
                        return '推荐'
                    case 'danmei':
                        return '耽美'
                    case 'moren':
                        return '默认'
                    case 'lianzai':
                        return '连载'
                    case 'wenzhang':
                        return '文章'
                    case 'yuanchuang':
                        return '原创'
                    case 'wanjie':
                        return '完结'
                    default:
                        return '其他'
                }
            }
        }
    })

}