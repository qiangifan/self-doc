import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import './less/test.less'

import Test from './components/Test'

const render =()=>{
    ReactDOM.render(
        <div >
            <div className="test">
            123
            </div>
            <Test/>
            
        </div>,
        document.querySelector('#root')
    )
}

render();