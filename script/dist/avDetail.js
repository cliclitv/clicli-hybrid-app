'use strict';

var apiready = function apiready() {

    var app = new Vue({
        el: '#app',
        data: {
            postContent: api.pageParam.postContent,
            postIntro: api.pageParam.postIntro,
            sortArr: [],
            tagArr: [],
            postCV: api.pageParam.postCV,
            postPV: api.pageParam.postPV
        },
        mounted: function mounted() {
            this.$refs.container.style.height = api.winHeight - 9 / 16 * api.winWidth - 2 + 'px';
            this.$refs.content.innerHTML = this.postContent;
            //标签
            var sorts = this.postIntro.sort;
            var tags = this.postIntro.tag;
            this.sortArr = sorts.trim().split(' ');
            this.tagArr = tags.trim().split(' ');
        },

        methods: {
            close: function close() {
                api.sendEvent({
                    name: 'closeAvDetailFrame'
                });
                api.closeFrame();
            },
            getAvatar: function getAvatar(avatar) {
                if (/^[0-9]+$/.test(avatar)) {
                    return 'https://q2.qlogo.cn/headimg_dl?dst_uin=' + avatar + '&spec=100';
                } else {
                    var hash = md5(avatar);
                    return 'https://cdn.v2ex.com/gravatar/' + hash;
                }
            }
        }
    });
};