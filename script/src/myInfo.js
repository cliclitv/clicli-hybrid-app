const apiready = () => {

    const app = new Vue({
        el: '#app',
        data: {
            user: {}
        },
        mounted(){
            this.user = api.pageParam.user
        },
        methods: {
            goBack(){
                api.closeWin()
            },
            getAvatar(avatar){
              if (/^[0-9]+$/.test(avatar)) {
                  return `https://q2.qlogo.cn/headimg_dl?dst_uin=` + avatar + `&spec=100`
              } else {
                  let hash = md5(avatar)
                  return `https://cdn.v2ex.com/gravatar/${hash}`
              }
            },
            logout(){
                $api.rmStorage('user-info')
                $api.setStorage('isLogin', '0')
                api.sendEvent({
                    name: 'logout'
                })
                api.closeWin()
            }
        }
    })

}
