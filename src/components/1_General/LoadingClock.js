import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import ClockLoader from 'react-spinners/ClockLoader'

export default class loading extends Component {
    render() {
        let color = this.props.color
        const loadingBgColor ={
            backgroundColor: color,
            borderColor: color,
            minHeight: '300px',
        }
        return (
            <div className="d-flex justify-content-center" style={loadingBgColor}>
                <div className="d-flex align-items-center">
                    <ClockLoader
                        size={120}
                        color={"#252525"}
                        loading={true}
                    />
                </div>

            </div>
        )
    }
}
