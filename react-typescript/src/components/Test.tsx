import * as React from 'react'
 
import { Alert, message, Button } from 'antd'

export default class Test extends React.PureComponent {

    private info = () => {
        message.success("1111")
    }

    render() {
        return (
            <div>
                <Alert message="Success Text" type="success" />
                <Button onClick={this.info}>点击</Button>
            </div>

        )
    }
}
