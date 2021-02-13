import React, { Component } from 'react';
import firebase from './util/firebase';
import './main.css';

class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            snap: null,
            loaded:false
        }
    }

    componentDidMount(){
        const todoRef = firebase.database().ref('water');       

        //todoRef.push(todo);
        todoRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({
                snap: snapshot.val(),
                loaded: true
            })
        })
    }

    render(){
        if(!this.state.loaded){
            return(
            <div className="Homepage">
                Loading
            </div>
            )
        }else{
            const snap = this.state.snap
            return(
                <div className="Homepage">
                    <h1>TreeHacks</h1>
                        <table style={{width:'20%', marginLeft:'40%'}}>
                            <tr>
                                <th>activity</th>
                                <th>amount</th>
                            </tr>

                            {Object.keys(snap).map((item, index) => (
                                
                                <tr>
                                    <td key={index}>{item}</td>
                                    <td key={item}>{snap[item]}</td>
                                </tr>                                
                                
                            ))}
                        </table>
                </div>
            )
        }
    }
}

export default Main;