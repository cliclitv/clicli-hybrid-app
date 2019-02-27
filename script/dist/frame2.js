apiready = function apiready() {
    var app = new Vue({
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
        created: function created() {},
        mounted: function mounted() {
            this.getWeekList();
        },

        methods: {
            getImgUrl: function getImgUrl(content) {
                return 'background-image:url(' + content + ')';
            },
            goVideoPlay: function goVideoPlay(pid, title) {
                api.openWin({
                    name: 'videoPlay',
                    url: './play/videoPlay.html',
                    pageParam: {
                        pid: pid
                    },
                    animation: {
                        type: 'movein'
                    }
                });
            },
            getWeekList: function getWeekList() {
                var _this = this;

                axios({
                    method: 'get',
                    url: 'https://www.clicli.top/week/'
                }).then(function (response) {

                    _this.weekList = response.data.data;
                    _this.Monday = response.data.data[0].content;
                    _this.Tuesday = response.data.data[1].content;
                    _this.Wednesday = response.data.data[2].content;
                    _this.Thursday = response.data.data[3].content;
                    _this.Friday = response.data.data[4].content;
                    _this.Saturday = response.data.data[5].content;
                    _this.Sunday = response.data.data[6].content;
                    _this.loading = false;
                }).catch(function (error) {
                    _this.loading = false;
                    _this.isError = true;
                });
            },
            reload: function reload() {
                location.reload();
            }
        }
    });
};