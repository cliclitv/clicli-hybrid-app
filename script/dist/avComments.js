'use strict';

var apiready = function apiready() {

    var app = new Vue({
        el: '#app',
        data: {
            pid: api.pageParam.pid,
            commentsList: [],
            loading: true,
            isError: false
        },
        mounted: function mounted() {
            this.$refs.container.style.height = api.winHeight - 9 / 16 * api.winWidth - 2 + 'px';
            this.getCommentsList();
        },

        methods: {
            close: function close() {
                api.sendEvent({
                    name: 'closeAvCommentsFrame'
                });
                api.closeFrame();
            },
            getCommentsList: function getCommentsList() {
                var _this = this;

                axios({
                    method: 'get',
                    url: 'https://api.clicli.top/comments?pid=' + this.pid + '&page=1&pageSize=100'
                }).then(function (response) {
                    if (response.data.code === 201) {
                        _this.commentsList = response.data.comments;
                        _this.loading = false;
                    }
                }).catch(function (error) {
                    _this.loading = false;
                    _this.isError = true;
                });
            },
            getAvatar: function getAvatar(avatar) {
                if (/^[0-9]+$/.test(avatar)) {
                    return 'https://q2.qlogo.cn/headimg_dl?dst_uin=' + avatar + '&spec=100';
                } else {
                    var hash = md5(avatar);
                    return 'https://cdn.v2ex.com/gravatar/' + hash;
                }
            },
            reload: function reload() {
                location.reload();
            }
        }
    });
};