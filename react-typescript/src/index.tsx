import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Alert} from 'antd'

import 'antd/dist/antd.css'
import './less/test.less'

const render =()=>{
    ReactDOM.render(
        <div >
            <div className="test">
            123
            </div>
            <Alert message="Success Text" type="success"/>
            
        </div>,
        document.querySelector('#root')
    )
}

render();