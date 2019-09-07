import './style.css'
import { h, render } from 'fre'

const DOWN1 =
  'https://cdn.jsdelivr.net/gh/cliclitv/clicli-hybrid-app@master/bin/clicli.apk'
const DOWN2 =
  'https://cdn.staticaly.com/gh/cliclitv/clicli-hybrid-app/master/bin/clicli.apk?env=dev'
const QCODE =
  'https://s2.ax1x.com/2019/09/07/nl0FFs.png'

function App () {
  return (
    <div class='main'>
      <div class='left'>
        <div class='logo' />
        <h1>人·生·就·是·佛</h1>
        <ul class='link'>
          <a href={DOWN1 + '?t=' + new Date().getTime()} target='_blank'>
            <li>下载一（国内）</li>
          </a>
          <a href={DOWN2} target='_blank'>
            <li>下载二（国外）</li>
          </a>
        </ul>
        <div class='qcode'>
          <img src={QCODE} alt='c站 app' />
        </div>
      </div>
      <div class='right' />
    </div>
  )
}

render(<App />, document.getElementById('root'))
