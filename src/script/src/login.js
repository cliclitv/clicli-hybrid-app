const apiready = () => {

    const app = new Vue({
        el: '#app',
        data: {
            name: '',
            pwd: '',
            //状态
            currentLoginState: true,
            Rname: '',
            Rpwd: '',
            Rqq: ''
        },
        mounted(){
            api.addEventListener({
                name: 'keyback'
            }, function(ret, err){
                this.goBack()
            })
        },
        methods: {
            goBack(){
                api.hideProgress()
                api.closeFrame()
            },
            listenChange(){
                let login = document.querySelector(".login")
                let classVal = login.getAttribute("class")
                if (this.name.length != 0 && this.pwd.length != 0) {
                    classVal = classVal.replace("disabled", "")
                    login.setAttribute("class", classVal)
                } else {
                    if (!this.hasClass(login, "disabled")) {
                        classVal = classVal.concat(" disabled")
                        login.setAttribute("class", classVal)
                    }
                }
            },
            RlistenChange(){
                let register = document.querySelector(".register")
                let classVal = register.getAttribute("class")
                if (this.Rname.length != 0 && this.Rpwd.length != 0 && this.Rqq.length != 0) {
                    console.log("不空")
                    classVal = classVal.replace("disabled", "")
                    register.setAttribute("class", classVal)
                } else {
                    if (!this.hasClass(register, "disabled")) {
                        classVal = classVal.concat(" disabled")
                        register.setAttribute("class", classVal)
                    }
                }
            },
            //判断是否已存在 class 属性
            hasClass(ele, cls) {
                return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
            },
            login(){
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '努力登录中...',
                    text: '先歇会呗...',
                    modal: false
                })
                axios.defaults.withCredentials=true
                axios({
                    method: 'post',
                    url: 'https://api.clicli.us/user/login',
                    data: {
                        name: this.name,
                        pwd: this.pwd
                    }
                }).then(response => {
                    console.log(JSON.stringify(response))
                    if (response.data.code === 200) {
                        $api.setStorage('user-info', response.data.user)
                        $api.setStorage('isLogin', '1');
                        api.sendEvent({
                            name: 'loginSuccess'
                        })
                        api.hideProgress()
                        api.closeFrame()
                    } else {
                        api.hideProgress()
                        api.toast({
                            msg: '用户名或密码错误',
                            duration: 2000,
                            location: 'bottom'
                        })
                    }
                }).catch(error => {
                    console.log(JSON.stringify(error))
                    api.hideProgress()
                    api.toast({
                        msg: '请检查用户名或密码输入是否正确！',
                        duration: 2000,
                        location: 'bottom'
                    })
                })
            },
            goRegister(){
              this.currentLoginState = false
            },
            register(){
              api.showProgress({
                  style: 'default',
                  animationType: 'fade',
                  title: '努力注册中...',
                  text: '先歇会呗...',
                  modal: false
              })
              axios.defaults.withCredentials=true
              axios({
                  method: 'post',
                  url: 'https://api.clicli.us/user/register',
                  data: {
                      name: this.Rname,
                      pwd: this.Rpwd,
                      qq: this.Rqq,
                      level: 1,
                      desc: '人懒，竟然没有签名~'
                  }
              }).then(response => {
                  console.log(JSON.stringify(response))
                  if (response.data.code === 200) {
                      api.hideProgress()
                      api.toast({
                          msg: '注册成功',
                          duration: 2000,
                          location: 'bottom'
                      })
                      this.currentLoginState = true
                  } else {
                      api.hideProgress()
                      api.toast({
                          msg: '服务器忙',
                          duration: 2000,
                          location: 'bottom'
                      })
                  }
              }).catch(error => {
                  console.log(JSON.stringify(error))
                  api.hideProgress()
                  api.toast({
                      msg: '网络出问题了',
                      duration: 2000,
                      location: 'bottom'
                  })
              })
            },
            goLogin(){
              this.currentLoginState = true
            },
        }
    })

}
