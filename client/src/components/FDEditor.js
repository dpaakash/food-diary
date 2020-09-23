import React from 'react';

export default class FDEditor extends React.Component {
    constructor(props) {
        super(props);
        this.allFoodItemsNamevsID = new Map();
        this.state = {
            // food item selected in the dropdown
            selectedFoodItemName: "",
            // all food items added in the current edit 
            addedFoodItemsName: [],
            // name of all the food items stored in db
            allFoodItemsName: [],
            // any comment that needs to be added for the given day
            dayComment: "",
            dayStatus: "",
        }
        this.handleDayCommentOnChange = this.handleDayCommentOnChange.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    // update the 'selectedFoodItemName' in the state on dropdown selection
    handleOnChange(e) {
        // because setState is "async", by the time the function(not applicable when an object is passed) 
        // passed to setState is executed (and the event is accessed), the event is no longer around
        let targetInput = e.target;
        let selectedValue = targetInput.value;
        let opts = document.querySelector('#itemsList').childNodes;
        for (let i=0; i<opts.length; i++) {
            if (opts[i].value === selectedValue) {
                this.setState(state => {
                    return {
                        selectedFoodItemName: selectedValue,
                        addedFoodItemsName: [...state.addedFoodItemsName, selectedValue]
                    }
                }, () => targetInput.value = '') // clear out the selected value after adding to state
            }
        }
    }

    // remove from 'addedFoodItemsName' in the 'state' on the click of 'X'(delete) button
    handleDelete = (i) => {
        let addedFoodItemsNameCopy = this.state.addedFoodItemsName.slice();
        addedFoodItemsNameCopy.splice(i, 1);
        this.setState({ addedFoodItemsName: addedFoodItemsNameCopy });
    }

    // send POST request to the server for saving data
    handleSave = () => {
        let addedItemsID = [];
        for (let itemName of this.state.addedFoodItemsName) {
            addedItemsID.push(this.allFoodItemsNamevsID.get(itemName));
        }
        let requestObj = {
            foodItemsName: this.state.addedFoodItemsName,
            foodItemsID: addedItemsID,
            date: this.props.date,
            dayComment: this.state.dayComment,
            dayStatus: this.state.dayStatus,
        };
        fetch(`/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObj)
        }).then(() => {
            this.setState({
                addedFoodItemsName: [],
                dayComment: "",
                dayStatus: "",
            }); 
            this.props.setSaved(true);
        }).catch(error => {
            console.log("Error occured during save: " + error);
        });
    }

    handleDayCommentOnChange(e){
        this.setState({
            dayComment: e.target.value  
        })
    }

    handleStatusChange = (e) => {
        this.setState({
            dayStatus: e.target.value,
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps.date !== this.props.date || this.props.saved === true)
            // set 'state' to 'false' so that FDViewer's CDU method executes when
            // entries are added for two days with out reloading in between
            this.props.setSaved(false)
    }

    componentDidMount() {
        // fetch all food items from db
        // TODO fetch this list again once a new item is added to the list of available items
        async function getAllFoodItems() {
            try {
                const response = await fetch('/index');
                const myJson = await response.json();
                return JSON.stringify(myJson);
            } catch (e) {
                console.log(e)
            }


        }

        // populate 'allFoodItemsName' in the state
        getAllFoodItems().then((response) => {
            let allFoodItems = JSON.parse(response);
            let allFoodItemsName = [];
            for (let item of allFoodItems) {
                this.allFoodItemsNamevsID.set(item.item_name, item.item_id);
                allFoodItemsName.push(item.item_name)
            }
            this.setState({
                allFoodItemsName: allFoodItemsName,
                selectedFoodItemName: allFoodItemsName[0]
            });
        }).catch((err) => console.log("Unable to get fetch list of available food items from DB" + err));
    }

    render() {
        // create HTML 'option' for each of the food item
        let foodItemOptions = this.state.allFoodItemsName.map((e, i) => { return <option key={i} value={e}>{e}</option> });
        let bulletedItems = this.state.addedFoodItemsName.map((e, i) => {
            return (
                <li key={i}>{e}<button className='remove' onClick={() => this.handleDelete(i)}>X</button></li>
            );
        });

        return (
            <div>
                <hr />
                <input type='text' list="itemsList" placeholder="enter food item" onChange={this.handleOnChange} />
                <datalist id="itemsList">{foodItemOptions}</datalist>
                <ul>{bulletedItems}</ul>
                <textarea placeholder="Comments" value={this.state.dayComment} onChange={this.handleDayCommentOnChange} />
                <button className="save" onClick={this.handleSave}>Save</button>
                <div className="status">
                    <input type="radio" id="red" name="status" value="RED" onChange={this.handleStatusChange} />
                    <label for="red">RED</label>
                    <input type="radio" id="orange" name="status" value="ORANGE" onChange={this.handleStatusChange} />
                    <label for="orange">ORANGE</label>
                    <input type="radio" id="green" name="status" value="GREEN" onChange={this.handleStatusChange} />
                    <label for="green">GREEN</label>
                </div>
            </div>
        );
    }
}