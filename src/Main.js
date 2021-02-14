import React, { Component } from 'react';
import treeGIF from './pics/tree.gif';
import firebase from './util/firebase';
import './main.css';
import ProgressBar from "./progress-bar.component"


class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            snap: null,
            loaded:false,
            total: 0,
            displayTimer: false
        }
        this.onClick = this.onClick.bind(this);
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

    onClick(){
        this.setState({
            displayTimer:true
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
            <div> 
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

                        <div style={{width: "50%", marginLeft: "25%"}}>
                            <ProgressBar bgcolor={"#0055a6"} completed={100 - this.state.total}/>
                        </div>

                        <button onClick={this.onClick}
                         style={{backgroundColor:'#a9d5ef', color:'#0055a6', border:'none'}}>Water the Tree</button>

                         {this.state.displayTimer && <p style={{color:'red', fontSize:'20px'}}>Bucket will be full again tomorrow night</p>}

                </div>  
                
                <img src={treeGIF} alt="Tree"/>
                <img src="https://image.shutterstock.com/image-vector/clipart-style-cartoon-bucket-600w-34869622.jpg" 
                width='400px' alt="bucket"/>

                <section>
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="wave wave3"></div> 
                    <div className="wave wave4"></div>
                </section>
            </div>
            )
        }
    }
}

export default Main;