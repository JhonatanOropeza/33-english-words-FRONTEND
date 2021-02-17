import React, { Component } from 'react';

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

export default class LoadingDos extends Component {
    render() {
        return <ClimbingBoxLoader
            size={30}
            color={"#d9534f"}
            loading={true}
        />
    }
}