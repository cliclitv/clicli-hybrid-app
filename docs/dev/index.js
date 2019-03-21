import './style.css'
import { h, render, useState } from 'fre'

const DOWN_URL = 'http://www.clicli.top/app/clicli.apk'
const QCODE =
  'https://ws3.sinaimg.cn/large/0078bOVFgy1g0lc1qlf25j308c08c75h.jpg'

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
