import React, { Component } from 'react';

export default class Main extends Component {

    render() {
        const centered = this.props.verticalCenter;
        let classes = `Main ${centered ? 'Main-Center' : ''}`;
        return <div className={classes}>
            <div className="Main_Inside_Elements">
                {this.props.children}
            </div>
        </div>
    }
}

