import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

export default class Videos extends Component {
    render() {
        return (
            <Player loop autoPlay={true} className="header-video-video">
                <ControlBar disableDefaultControls disableCompletely/>
                <source src="/Videos/video1.mp4" type="video/mp4" />
            </Player>
        );
    }
}
