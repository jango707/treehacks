import React, { Component } from 'react';
import treeGIF from './pics/tree.gif';
import firebase from './util/firebase';
import './main.css';
import ProgressBar from "./progress-bar.component"
import LiquidFillGauge from 'react-liquid-gauge';

const terms={
    'dishes':'Doing dishes (5L/minute)',
    'dishwasher':' Dishwasher (11L/cycle)',
    'flush':'Flushing (13L/usage)',
    'hands':'Washing hands (5L/minute)',
    'shower':'Showering (8L/minute)',
    'washingmachine':'Washing machine (10L/cycle)',
}
class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            snap: null,
            loaded:false,
            total: 0,
            added: 0,
            displayTimer: false,
            displaySuc: false,
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
                if(item ==="dishes"){
                    t+= 5* snaps[item];
                }else if(item ==="dishwasher"){
                    t+= 11* snaps[item];
                }else if(item ==="flush"){
                    t+= 13* snaps[item];
                }else if(item ==="hands"){
                    t+= 5* snaps[item];
                }else if(item ==="shower"){
                    t+= 8* snaps[item];
                }else if(item ==="washingmachine"){
                    t+= 20* snaps[item];
                }
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
        this.setState({
            added: this.state.total
        })
        
        if(this.state.total !== 0){
        const waterRef = firebase.database().ref('water');
        const treeRef = firebase.database().ref('tree');   

        var current = this.state.progressTree + 100 - this.state.total;
        
        if (current >= 100){
            current = current-100;
            treeRef.update({count: this.state.numTree+1});

        }
        
        this.setState({
            displaySuc:true,
            displayTimer:false
        })
        
        treeRef.update({progress: current})
        waterRef.update({dishes:0, dishwasher:0, hands:0, shower:0, flush:0, washingmachine:0});

    }else{
            this.setState({
                displayTimer:true,
                displaySuc:false
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
                    <h1 style={{fontSize:'60px'}}>WaterWatch</h1>
                        <table style={{width:'20%', marginLeft:'40%'}}>
                            <tr>
                                <th>activity</th>
                                <th>amount</th>
                            </tr>

                            {Object.keys(snap).map((item, index) => (
                                
                                <tr>
                                    <td key={index}>{terms[item]}</td>
                                    <td key={item}>{snap[item]}</td>
                                </tr>                                
                                
                            ))}
                                <tr>
                                    <td ><b>total litre usage</b></td>
                                    <td> <b>{this.state.total} Litres</b> </td>
                                </tr>
                                <tr>
                                    <td > daily goal</td>
                                    <td>  150 Litres </td>
                                </tr>
                                <tr>
                                    <td >Bucket volume</td>
                                    <td> 200 Litres </td>
                                </tr>
                        </table>
                            
                            <p style={{width:'80%', marginLeft:'10%', marginTop:'30px', fontSize:'20px'}}>Hello, and welcome to <b>WaterWatch</b>. In the table above, you can see your water consumption from today. Every day, <b>your tree will need water in order to grow</b>. You can water the tree with the bucket, however, the bucket only contains <b>150L</b> of water. You have to watch your water consumption over the day to make sure there is enough water left to water your tree.</p>

                        <button onClick={this.onClick}
                         style={{backgroundColor:'#a9d5ef', color:'#0055a6', border:'none', width:'500px'}}>Water the Tree
                         </button>
                         {this.state.displayTimer && <p style={{color:'red', fontSize:'20px'}}>You already have watered your tree for today. Come back tomorrow!</p>} {this.state.displaySuc && <p style={{color:'#49a144', fontSize:'20px'}}>You have watered your tree. Congrats, your tree has grown by {100 - (this.state.added/200)*100} %</p>}

                        <h3>Current progress on tree:</h3>
                        <div style={{width: "50%", marginLeft: "23%"}}>
                            <ProgressBar bgcolor={"#49a144"} completed={this.state.progressTree}/>
                        </div>

                        <h3>Number of trees: <b style={{color:'#49a144'}}>{this.state.numTree}</b></h3>
                        </div>  

                        <img style={{float:'left'}} src={treeGIF} alt="Tree"/>
                         <h3 style={{marginLeft:'65%'}}>Bucket state:</h3>
                        <div style={{float:'right', marginRight:'14%', marginTop:'40px'}}>
                            {/* <ProgressBar bgcolor={"#0055a6"} completed={100 - this.state.total}/> */}
                            <LiquidFillGauge 
                                value={Math.max( 0, Math.min(100 - (this.state.total/200)*100, 100) )}
                                percent="%"
                                riseAnimation
                                waveAnimation
                                waveFrequency={2}
                                waveAmplitude={1}
                                gradient
                            />
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