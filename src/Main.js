import React, { Component } from 'react';


class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            loaded: false
        }
    }

    render(){
        return(
            <div>
                hello
            </div>
        )
    }
}

export default Main;