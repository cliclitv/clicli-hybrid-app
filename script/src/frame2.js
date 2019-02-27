apiready = () => {
    const app = new Vue({
        el: '#app',
        data: {
            weekList: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
            loading: true,
            isError: false
        },
        created(){

        },
        mounted() {
            this.getWeekList()
        },
        methods: {
            getImgUrl(content){
                return 'background-image:url('+ content +')'
            },
            goVideoPlay(pid,title) {
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
            getWeekList(){
                axios({
                    method: 'get',
                    url: 'https://www.clicli.top/week/'
                }).then(response => {

                    this.weekList = response.data.data
                    this.Monday = response.data.data[0].content
                    this.Tuesday = response.data.data[1].content
                    this.Wednesday = response.data.data[2].content
                    this.Thursday = response.data.data[3].content
                    this.Friday = response.data.data[4].content
                    this.Saturday = response.data.data[5].content
                    this.Sunday = response.data.data[6].content
                    this.loading = false

                }).catch(error => {
                    this.loading = false
                    this.isError = true
                })
            },
            reload(){
                location.reload()
            }
        }
    })
}