let _recommendOnSelected = true,
    _newOnSelected = false

const recommendBtn = document.querySelector('#recommend')
const newBtn = document.querySelector('#new')

let _loginPageOpenStatus = false

const apiready = () => {
    api.setStatusBarStyle({
        style: 'dark',
        color: 'rgba(255,255,255,0.00001)'
    });
    api.parseTapmode()
    funIniGroup()
    switchFunc()
    listenMasterStationSwiperEvent()
    initSearchFunc()
    listenLoginPageOpenStatus()
    navbarDoubleClick()
    bindPushService()
}

function initSearchFunc() {
    let searchBtns = document.querySelectorAll('.search')
    for (let i = 0; i < searchBtns.length; i++) {
        searchBtns[i].onclick = () => {
            api.openWin({
                name: 'search',
                url: './html/search/search.html',
                animation: {
                    type: 'movein',
                    subType: 'from_right',
                    duration: 300
                }
            })
        }
    }

}

function listenMasterStationSwiperEvent() {
    //左滑
    api.addEventListener({
            name: 'swipeToRecommend'
        }, (ret, err) => {
            recommendBtnOnSelected()
        })
        //右滑
    api.addEventListener({
        name: 'swipeToNew'
    }, (ret, err) => {
        newBtnOnSelected()
    })
}

function listenLoginPageOpenStatus() {
    api.addEventListener({
        name: 'loginPageOpenStatus'
    }, (ret, err) => {
        if (ret.value.key === 1) {
            _loginPageOpenStatus = true
        }
    })
    api.addEventListener({
        name: 'keyback'
    }, (ret, err) => {
        if (_loginPageOpenStatus) {
            api.closeFrame({
                name: 'login'
            })
            _loginPageOpenStatus = false
        } else {
            api.closeWidget({
                id: 'A6093043874032',
                retData: {
                    name: 'closeWidget'
                },
                animation: {
                    type: 'flip',
                    subType: 'from_bottom',
                    duration: 500
                }
            })
        }
    })
}

function switchFunc() {
    recommendBtn.onclick = (e) => {
        recommendBtnOnSelected()
        e.stopPropagation()
    }
    newBtn.onclick = (e) => {
        newBtnOnSelected()
        e.stopPropagation()
    }
}

//推荐 被选中
function recommendBtnOnSelected() {
    recommendBtn.className = "selected"
    newBtn.className = ""
    api.setFrameGroupIndex({
        name: 'group',
        index: 0,
        scroll: true
    })
    _recommendOnSelected = true
    _newOnSelected = false
}

//最新 被选中
function newBtnOnSelected() {
    newBtn.className = "selected"
    recommendBtn.className = ""
    api.setFrameGroupIndex({
        name: 'group',
        index: 1,
        scroll: true
    })
    _recommendOnSelected = false
    _newOnSelected = true
}

function funIniGroup() {
    let eHeaderLis = $api.domAll('header li')
    frames = []
    let frame = ['frame0.html', 'frame1.html', 'frame2.html', 'frame3.html', 'frame4.html']
    for (let i = 0; i < eHeaderLis.length + 1; i++) {
        frames.push({
            url: './html/' + frame[i],
            bgColor: '#FEFEFE',
            bounces: false,
            overScrollMode: 'always'
        })
    }
    api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
            x: 0,
            y: $api.dom('header').offsetHeight + 28,
            w: api.winWidth,
            h: $api.dom('#main').offsetHeight - 75
        },
        overScrollMode: 'always',
        index: 0,
        frames: frames,
        background: '#FEFEFE',
        preload: 0
    }, (ret, err) => {

    })
}

// 随意切换按钮
function randomSwitchBtn(tag) {
    if (tag == $api.dom('#footer li.active')) return
    let eFootLis = $api.domAll('#footer li')
    let eHeaderLis = $api.domAll('header li')
    let index = 0
    for (let i = 0, len = eFootLis.length; i < len; i++) {
        if (tag == eFootLis[i]) {
            index = i
        } else {
            $api.removeCls(eFootLis[i], 'active')
            $api.removeCls(eHeaderLis[i], 'active')
        }
    }
    $api.addCls(eFootLis[index], 'active')
    $api.addCls(eHeaderLis[index], 'active')
    if (index == 0) {
        if (_recommendOnSelected) {
            api.setFrameGroupIndex({
                name: 'group',
                index: 0,
                scroll: true
            })
        } else {
            api.setFrameGroupIndex({
                name: 'group',
                index: 1,
                scroll: true
            })
        }
        return
    } else {
        index++
    }
    api.setFrameGroupIndex({
        name: 'group',
        index: index,
        scroll: true
    })
}


//监听导航栏双击事件
function navbarDoubleClick() {
    let touchtime = new Date().getTime()
    let navbars = document.querySelectorAll('.border-b')
    for (let i = 0; i < navbars.length; i++) {
        navbars[i].onclick = (e) => {
            if (new Date().getTime() - touchtime < 500) {
                console.log("dbclick")
                api.sendEvent({
                    name: 'navbarDoubleClick',
                    extra: {
                        key: i,
                        isRecommend: _recommendOnSelected
                    }
                })
            } else {
                touchtime = new Date().getTime()
                console.log("click")
            }
        }
    }
}


//绑定推送相关
function bindPushService() {
    let ajpush = api.require('ajpush')
    //初始化
    ajpush.init(ret => {
        if (ret && ret.status) {
            //success
        }
    })
    //监听设备状态栏通知点击
    api.addEventListener({
        name: 'appintent'
    }, (ret, err) => {
        if (ret && ret.appParam.ajpush) {
            let ajpush = ret.appParam.ajpush
            let id = ajpush.id
            let title = ajpush.title
            let content = ajpush.content
            let extra = ajpush.extra
                //根据 extra 进行跳转
            api.openWin({
                name: 'videoPlay',
                url: 'html/play/videoPlay.html',
                pageParam: {
                    pid: extra.gv
                },
                animation: {
                    type: 'movein'
                }
            })
        }
    })
    //监听进入前台
    api.addEventListener({name:'resume'}, (ret,err) => {
        let ajpush = api.require('ajpush')
        ajpush.onResume()
    })
    //监听进入后台
    api.addEventListener({name:'pause'}, (ret,err) => {
        let ajpush = api.require('ajpush')
        ajpush.onPause()
    });
}
