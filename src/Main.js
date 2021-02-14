import React, { Component } from 'react';
import treeGIF from './pics/tree.gif';
import firebase from './util/firebase';
import './main.css';
import ProgressBar from "./progress-bar.component"
import LiquidFillGauge from 'react-liquid-gauge';


class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            snap: null,
            loaded:false,
            total: 0,
            displayTimer: false,
            numTree:0,
            progressTree:0
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        const waterRef = firebase.database().ref('water');       
        const treeRef = firebase.database().ref('tree');       

        waterRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            var t = 0;
            Object.keys(snaps).map((item, index) => {
                t+= snaps[item];
            })
            this.setState({
                snap: snaps,
                total: t
            })
        })
        treeRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            console.log(snaps);
            this.setState({
                numTree: snaps.count,
                progressTree: snaps.progress,
                loaded:true
            })
        })
    }

    onClick(){
        const waterRef = firebase.database().ref('water');
        
        waterRef.update({dishes:0, dishwasher:0, hands:0, shower:0, washingmachine:0});

        if(this.state.total === 0){
            this.setState({
                displayTimer:true
            })
        }
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


                        <button onClick={this.onClick}
                         style={{backgroundColor:'#a9d5ef', color:'#0055a6', border:'none', width:'500px'}}>Water the Tree
                         </button>

                         <h3>Bucket state:</h3>
                        <div style={{width: "50%", marginLeft: "25%"}}>
                            {/* <ProgressBar bgcolor={"#0055a6"} completed={100 - this.state.total}/> */}
                            <LiquidFillGauge 
                                style={{ margin: '0 auto' }}
                                value={100 - this.state.total}
                                percent="%"
                                riseAnimation
                                waveAnimation
                                waveFrequency={2}
                                waveAmplitude={1}
                                gradient
                            />
                        </div>

                        <h3>Current progress on tree:</h3>
                        <div style={{width: "50%", marginLeft: "23%"}}>
                            <ProgressBar bgcolor={"#49a144"} completed={this.state.progressTree}/>
                        </div>

                        <h3>Number of trees: <b style={{color:'#49a144'}}>{this.state.numTree}</b></h3>


                         {this.state.displayTimer && <p style={{color:'red', fontSize:'20px'}}>Bucket will be full again tomorrow night</p>}

                <img src={treeGIF} alt="Tree"/>
                </div>  
                

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