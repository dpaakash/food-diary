import React from 'react';

export class FDEditor extends React.Component {
    constructor(props) {
        super(props);
        this.allFoodItemsNamevsID = new Map();
        this.state = {
            // food item selected in the dropdown
            selectedFoodItemName : "",
            // all food items added in the current edit 
            addedFoodItemsName : [],
             // name of all the food items stored in db
            allFoodItemsName : []
        }
    }

    // add to 'addedFoodItemsName' in the state on the click of 'Add' button
    addItem = () => {
        if (this.state.selectedFoodItemName) 
            this.setState(state=>({ addedFoodItemsName: [...state.addedFoodItemsName, state.selectedFoodItemName]}));
    }

    // update the 'selectedFoodItemName' in the state on dropdown selection
    handleOnChange = (e) => this.setState({ selectedFoodItemName: e.target.value });

    // remove from 'addedFoodItemsName' in the 'state' on the click of 'X'(delete) button
    handleDelete = (i) => {
        let addedFoodItemsNameCopy = this.state.addedFoodItemsName.slice();
        addedFoodItemsNameCopy.splice(i, 1);
        this.setState({ addedFoodItemsName: addedFoodItemsNameCopy });
    }

    // send POST request to the server for saving data
    handleSave = () =>{
        let addedItemsID = [];
        for(let itemName of this.state.addedFoodItemsName){
            addedItemsID.push(this.allFoodItemsNamevsID.get(itemName));
        }
        // TODO check if need to send item name and date string instead of item id and date id
        // TODO the date data isn't present yet in the date table, need to save it there first and then take the id
        // TODO for sending item id, maybe create a map of id vs name here after calling getAllFoodItems()
        let requestObj = {
            foodItemsName: this.state.addedFoodItemsName,
            foodItemsID: addedItemsID,
            date: this.props.date
        };
        (async () => {
            // const rawResponse = 
            await fetch(`http://localhost:1337/save`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(requestObj)
            });
          })().then((rawResponse)=> {this.setState({addedFoodItemsName: []});
                            const content = rawResponse.json();
                            console.log(content);});

        }

    componentDidMount(){
        // TODO fetch this list again once a new item is added
        // fetch all food items from db

        async function getAllFoodItems(){
            try{
                const response = await fetch('/index');
                console.log(response);
                // response.then(()=>console.log(response.json()));
                const myJson = await response.json();
                return JSON.stringify(myJson);
            } catch(e){
                console.log(e)
            }
            
            
        }

        // populate 'allFoodItemsName' in the state
        getAllFoodItems().then((response) => {
            let allFoodItems = JSON.parse(response);
            let allFoodItemsName = [];
            for(let item of allFoodItems){
                this.allFoodItemsNamevsID.set(item.item_name,item.item_id);
                allFoodItemsName.push(item.item_name)
            }
            this.setState({allFoodItemsName : allFoodItemsName,
                           selectedFoodItemName: allFoodItemsName[0]});
        }).catch((err)=>console.log("Unable to get fetch list of available food items from DB"+err));
    }

    render() {
        // create HTML 'option' for each of the food item
        let foodItemOptions = this.state.allFoodItemsName.map((e,i)=>{return <option key={i} value={e}>{e}</option>});            
        let bulletedItems = this.state.addedFoodItemsName.map((e, i) => {
            return (
                <li key={i}>{e}<button onClick={() => this.handleDelete(i)}>X</button></li>
            );
        });

        return (
            <div>
                <select id="itemsList" value={this.selectedFoodItemName} onChange={this.handleOnChange}>
                    {foodItemOptions}
                </select>
                <button onClick={this.addItem}>Add</button>
                <ul>{bulletedItems}</ul> 
                <input type = "textArea" placeholder="Comments"></input>
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}