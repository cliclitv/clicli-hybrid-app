import './style.css'
import { h, render, useState } from 'fre'

const DOWN_URL =
  'http://d0.ananas.chaoxing.com/download/ce2bc417d5d9636bf5cd9da5e09e180c?fn=clicli-beta'
const QCODE =
  'https://ws1.sinaimg.cn/large/0065Zy9egy1g0eyxkjvcfj308c08cdh3.jpg'

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
