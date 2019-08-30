### clicli-hybrid-app
🍰 A hybrid app powered by apicloud and vue .

some screen shot in APP

![截屏1](/screen/screen_1.png)
![截屏2](/screen/screen_2.png)
![截屏3](/screen/screen_3.png)

how to build 

在官网 [https://www.apicloud.com](https://www.apicloud.com) 新建账号  
新建应用，然后在开发控制台的 `模块` 功能进行模块添加  
分别为：`ajpush`、`videoPlayer`，即 `极光推送` 和 `视频播放器`  
然后编译 `自定义 Loader`，用于开发调试  
安装 `自定义 Loader` 后，安装到手机上  
下载 `APICloud Studio`, 参考官网 [https://www.apicloud.com](https://www.apicloud.com) 相关配置  
`APICloud Studio` 与 `Loader APP` 连上后  

开始进入正题  
```
git clone 本项目
cd clicli-hybrid-app
npm install 
```
然后在 `APICloud Studio` 打开本项目  
注意：打开 `/src` 文件夹，不是打开 `/clicli-hybrid-app`  
这样可以避免同步应用到 `Loader` 上把 `node_modules` 也同步  

引入 `babel` 是为了兼容部分低版本的手机系统  
所以在每次修改 `JS` 文件时候都需要进行 `npm run build` 以生成兼容的代码  
然后进行 `ctrl + i` 进行代码同步，在手机上预览  

当然，修改 `html` 结构样式文件就不需要执行 `npm run build`
还有一种就是在使用版本相对较新的系统时可以直接同步，不需要执行`npm run build`  
只需要修改一下 `html` 文件引入的 `JS` 路径为源 `JS` 文件即可  

`/src/script/src` 下的文件为源文件  
`/src/script/dist` 下的文件为 `babel` 编译后的文件

do

- [x] 整体框架结构
- [x] 番剧播放页
- [x] 番剧简介页
- [x] 番剧评论页
- [x] 番剧推荐页
- [x] 番剧搜索页
- [x] 番剧最近更新页
- [x] UGC页面
- [x] 个人中心页
- [x] 登录注册页
- [x] 1920*1080启动页

add feature

- [x] 统计番剧浏览量
- [ ] 用户发表评论
- [ ] 查看up主投稿列表
- [x] 推荐与最新页面滑动切换

try

- [x] 提示新版本实现更新
- [x] 消息推送

difference

- [x] 支持m3u8

……

boom!!!!    

更多精彩请访问     [https://www.clicli.us](https://www.clicli.us)

![image](https://jwchan.cn/images/background_header.png)
