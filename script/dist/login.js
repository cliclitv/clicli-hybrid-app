'use strict';

var apiready = function apiready() {

    var app = new Vue({
        el: '#app',
        data: {
            name: '',
            pwd: ''
        },
        mounted: function mounted() {
            api.addEventListener({
                name: 'keyback'
            }, function (ret, err) {
                this.goBack();
            });
        },

        methods: {
            goBack: function goBack() {
                api.hideProgress();
                api.closeFrame();
            },
            listenChange: function listenChange() {
                var submit = document.querySelector(".submit");
                var classVal = submit.getAttribute("class");
                if (this.name.length != 0 && this.pwd.length != 0) {
                    classVal = classVal.replace("disabled", "");
                    submit.setAttribute("class", classVal);
                } else {
                    if (!this.hasClass(submit, "disabled")) {
                        classVal = classVal.concat(" disabled");
                        submit.setAttribute("class", classVal);
                    }
                }
            },

            //判断是否已存在 class 属性
            hasClass: function hasClass(ele, cls) {
                return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
            },
            login: function login() {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力登录中...',
                    text: '先歇会呗...',
                    modal: false
                });
                axios.defaults.withCredentials = true;
                axios({
                    method: 'post',
                    url: 'https://api.clicli.us/user/login',
                    data: {
                        name: this.name,
                        pwd: this.pwd
                    }
                }).then(function (response) {
                    console.log(JSON.stringify(response));
                    if (response.data.code === 201) {
                        $api.setStorage('user-info', response.data.user);
                        $api.setStorage('isLogin', '1');
                        api.sendEvent({
                            name: 'loginSuccess'
                        });
                        api.hideProgress();
                        api.closeFrame();
                    } else {
                        api.hideProgress();
                        api.toast({
                            msg: '用户名或密码错误',
                            duration: 2000,
                            location: 'bottom'
                        });
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    api.hideProgress();
                    api.toast({
                        msg: '喔，出错啦，请稍后重试！',
                        duration: 2000,
                        location: 'bottom'
                    });
                });
            }
        }
    });
};