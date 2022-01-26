import React from "react";

import "./data.css"
import Trackersbackground from "../background/index";

class Trackers extends React.Component {
    constructor() {
        super();
        this.state = {
            // Roller data
            Rolloutcome : "",
        };

        this.HandleRolldice = this.HandleRolldice.bind(this);
    }

    HandleRolldice(event){ if(event.keyCode === 13) {
        //parse, roll and output "best" total with meh dice
        function Rolldice(inp){
            function Find_Highest_Index(a){
                var highest = 0
                let index = 0
                let i = 0 
                while(i < a.length){
                    if(highest < a[i]){
                        highest = a[i]
                        index = i
                    }
                    i++;
                }                
                return index
            }

            function Remove_Fumbles_Sort(results,dice){
                let ls = [];
                let i = 0;
                while(i < results.length){
                    if(results[i] !== 1){
                        ls.push(dice[i])
                    }
                    i ++;
                }

                ls.sort((a, b) => a - b); //wtf js .. alphabetically
                ls.reverse();

                return ls 
            }

            let results = [];
            let dice = [];
            let top = [];
            let fumbles = 0;

            //lower + parse dice(-d-)
            let re = /(?:\d*?d(4|6|8|10|12))/g;
            let to_roll = inp.toLowerCase().match(re);

            // roll dice and dump out to array(results, dice)
            for (let roll in to_roll) {
                roll = to_roll[roll]

                //check for number of dice
                if (roll.charAt(0) === 'd') {
                    let die = roll.substring(1)
                    let a = Math.floor(Math.random() * die) + 1;
                    if(a===1){ fumbles+=1 }

                    results.push(a)
                    dice.push(die)
                } else {
                    let d = roll.indexOf("d");
                    let die = roll.substring(d+1, roll.length);
                    let num = roll.substring(0, d);

                    let i = 0;
                    while (i < num){
                        let a = Math.floor(Math.random() * die) + 1;
                        if(a===1){ fumbles+=1 }
        
                        results.push(a)
                        dice.push(die)

                        i ++; 
                    }
                }
            }

            let outstring = "";

            //setup dice outputs
            let dicestr = [["D4   : ",],["D6   : ",],["D8   : ",],["D10 : ",],["D12 : ",]]; 
            for (let index in results){
                switch (dice[index]) {
                    case "4":
                        dicestr[0].push(results[index])
                        break;
                    case "6":
                        dicestr[1].push(results[index])
                        break;
                    case "8":
                        dicestr[2].push(results[index])
                        break;
                    case "10":
                        dicestr[3].push(results[index])
                        break;
                    case "12":
                        dicestr[4].push(results[index])
                        break;
                    default:
                        break;
                }
            }

            // add dice outputs to output
            for (let index in dicestr){
                // arr of (die, rolls) to string with comma then remove first comma.
                outstring+= (dicestr[index].join(', ') +"\n").replace(": ,",": ")
            }

            //get higest rolled dice x1 or x2 
            //add one or 2 numbers together.
            let length = 0
            if (results.length > 1){ length=2;}else{length=1;}

            // get biggest rolls
            let i =0;
            while (i < length){
                let index = Find_Highest_Index(results)
                if(results[index] !== 1 ){
                    top.push(results[index])
                    results.splice(index,1)
                    dice.splice(index,1)
                }
                i++
            }

            // Remove fumbles and Sort array
            dice = Remove_Fumbles_Sort(results,dice);

            // total roll, effect dice and fumble count
            if(top.length > 1){
                outstring+="\nFor a roll of : "+ (top[0]+top[1])
            }else{
                outstring+="\nFor a roll of : "+ top[0]
            }

            if(dice.length > 0){
                outstring+="\nwith an effect die of : D" + dice[0];
            }
            else{
                outstring+="\nwith an effect die of : D4"
            }

            if(fumbles === 1){
                outstring+="\nand "+ fumbles +" fumble."
            }
            else if(fumbles > 1){
                outstring+="\nand "+ fumbles +" fumbles."
            }
            
            return outstring
        }

        let val = event.target.value;
        let outie = Rolldice(val);

        this.setState({Rolloutcome: outie});
    }}

    render() {
        return (
        <div className="Trackersdata-container">
            <Trackersbackground/>
            <input className="Trackersdata-Rolldiceinput" type="text" 
            placeholder="ie. 1d8 2d6 d12" onKeyDown={this.HandleRolldice}/>

            <div className="Trackersdata-Rolldicedata" style={{whiteSpace: "pre"}}>
                {this.state.Rolloutcome}
            </div>

        </div>
        );
    }
}
export default Trackers;