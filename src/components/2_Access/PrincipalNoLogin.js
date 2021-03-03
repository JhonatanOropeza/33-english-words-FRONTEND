import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

import First from './first';
import Login from './login';
import Logup from './logup';

const linkVideo = process.env.REACT_APP_VIDEO_FOR_LOG;

export default class PrincipalNoLogin extends Component {
    render() {
        return (
            <div className="ToAccess">
                {/** 
                <div className="ToAccess-Text-1">
                    <div className="ToAccess-Text-First">
                        {this.props.option === 0 && <First/>}
                        {this.props.option === 1 && <Login signin={this.props.signin}/>}
                        {this.props.option === 2 && <Logup/>}
                    </div>
                </div>
                <div className="ToAccess-Transparency-2"></div>
                */}
                <div className="ToAccess-Video-3">
                    <Player loop autoPlay muted>
                        <ControlBar disableDefaultControls disableCompletely />
                        <source src={linkVideo} type="video/mp4" muted="true"/>
                    </Player>
                </div>
            </div>
        )
    }
}
