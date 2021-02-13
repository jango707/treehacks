import React, { Component } from 'react';
import treeGIF from './pics/tree.gif';
import firebase from './util/firebase';
import './main.css';


class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            snap: null,
            loaded:false,
            total: 0
        }
    }

    componentDidMount(){
        const todoRef = firebase.database().ref('water');       

        //todoRef.push(todo);
        todoRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            console.log(snaps);
            var t = 0;
            Object.keys(snaps).map((item, index) => {
                t+= snaps[item];
            })
            this.setState({
                total: t
            })
            this.setState({
                snap: snaps,
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
                        <table style={{width:'20%', marginLeft:'42%'}}>
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
                                <tr>
                                    <td ><b>total</b></td>
                                    <td> <b>{this.state.total} Litres</b> </td>
                                </tr>
                        </table>

                        <img src={treeGIF} alt="Tree"/>
                </div>
            )
        }
    }
}

export default Main;