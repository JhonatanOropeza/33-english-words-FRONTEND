import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

export default class loading extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center loading">
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column bd-highlight mb-3">
                        <div className="p-2 bd-highlight ">
                            <ClimbingBoxLoader
                                size={30}
                                color={"#d9534f"}
                                loading={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
