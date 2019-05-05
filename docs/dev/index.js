import './style.css'
import { h, render } from 'fre'

const DOWN_URL = 'https://cdn.jsdelivr.net/npm/@clicli/app@latest'
const QCODE =
  'https://0d077ef9e74d8.cdn.sohucs.com/roUjdPS_jpg'

function App () {
  return (
    <div class='main'>
      <div class="left">
      <div class='logo' />
      <h1>人·生·就·是·佛</h1>
      <ul class='link'>
        <a href={DOWN_URL} target='_blank'>
          <li>Android</li>
        </a>
        <a href=''>
          <li>IOS</li>
        </a>
      </ul>
      <div class='qcode'>
        <img src={QCODE} alt='c站 app' />
      </div>
      </div>
      <div class="right"></div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
