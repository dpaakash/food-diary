import React from 'react';

export class ItemAdder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newItemName : ""
        }
    }

    handleAdder = async (req,resp) => {
        let reqObj = {new_item_name: this.state.newItemName};
        try{
            await fetch('/add',
                        {   
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                                },
                            body: JSON.stringify(reqObj)
                        });
        } catch(e) {
            console.error(`Error occurred while adding the new item ${reqObj.body.new_item_name} 
                            e`);
        }
        
    }

    handleOnChange = (e) => this.setState({newItemName : e.target.value});
    
    render(){
        return(
            <div>
                <input id="item_name" placeholder="New food item name" value={this.state.newItemName} onChange={this.handleOnChange}></input>
                <button id="adder" onClick={this.handleAdder}>Add a New Food Item</button>
            </div>        
        )
    }
}