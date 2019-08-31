import './style.css'
import { h, render } from 'fre'

const DOWN_URL = 'https://cdn.jsdelivr.net/gh/cliclitv/clicli-hybrid-app@latest/bin/clicli.apk'
const QCODE =
  'https://ae01.alicdn.com/kf/Had6fa2a0d8e54465820740a3317a8725t.png'

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
