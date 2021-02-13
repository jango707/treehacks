import React, { Component } from 'react';
import firebase from './util/firebase';


class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {

        }
        this.createTodo = this.createTodo.bind(this);
    }

    createTodo(){
        const todoRef = firebase.database().ref('water');
       

        //todoRef.push(todo);
        todoRef.on('value', (snapshot) => {
            console.log(snapshot.val());
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.createTodo}>click</button>
            </div>
        )
    }
}

export default Main;