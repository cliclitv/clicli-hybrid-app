import './style.css'
import { h, render, useState } from 'fre'

const DOWN_URL = 'http://www.clicli.top/app/clicli.apk'
const QCODE =
  'http://wx1.sinaimg.cn/large/0060lm7Tly1g1xosrqruzj308c08cjsa.jpg'

function App() {
  return (
    <div class="mainer">
      <div class="logo" />
      <h1>人·生·就·是·佛</h1>
      <ul class="link">
        <a href={DOWN_URL} target="_blank">
          <li>Android</li>
        </a>
        <a href="">
          <li>IOS</li>
        </a>
      </ul>
      <div class="qcode">
        <img src={QCODE} alt="c站 app" />
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
