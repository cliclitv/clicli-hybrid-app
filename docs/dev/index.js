import './style.css'
import { h, render } from 'fre'

const DOWN_URL = 'https://unpkg.com/@clicli/app'
const QCODE =
  'https://ws1.sinaimg.cn/large/0065Zy9egy1g214spuj16j308c08c745.jpg'

function App () {
  return (
    <div class='mainer'>
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
  )
}

render(<App />, document.getElementById('root'))
