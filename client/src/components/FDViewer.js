import React from 'react';

/**
 * Used to view the saved data on a given date
 */
export default class FDViewer extends React.Component {

    constructor(props) {
        super(props);
        this.savedFoodItemNames = [];
        this.state = {
            bulletedItems: [],
            dayComment: "",
        };
    }

    // handle default page load
    componentDidMount() {
        this.setStateBulletedItems();
    }

    // handle date change via 'Next' and 'Prev' buttons
    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date || (this.props.saved === true && prevProps.saved !== true)){
            this.savedFoodItemNames = [];
            this.setStateBulletedItems();
        }
    }

    // fetches records on the passed date and populates the state
    setStateBulletedItems() {
        this.getSavedItemsOnDate().then((response) => {
            let responseObj = JSON.parse(response);
            for (let itemName of responseObj.item_names)
                // ignore 'null' itemName when only comment is added
                itemName && this.savedFoodItemNames.push(itemName);
            this.setState({
                bulletedItems: this.savedFoodItemNames.map((e, i) => {
                    return <li key={i}>{e}</li>;
                }),
                dayComment: responseObj.dayComment
            });
        }).catch((e) => console.log(e));
    }

    // get the saved data from db based on the selected date
    //TODO return immediately if the date is in future
    async getSavedItemsOnDate() {
        try {
            // Response {type: "basic", url: "http://localhost:3000/view?date=Tue%20Mar%2019%202019", redirected: false, status: 200, ok: true, …}
            const response = await fetch(`/view?date=${this.props.date.toDateString()}`);
            //{item_names: Array(0), dayComment: ""}
            const myJson = await response.json();
            return JSON.stringify(myJson);
        }
        catch (e) {
            console.log("Unable to fetch saved food items from DB" + e);
        }
    }

    render() {
        return (
            <div id="viewer">
                {this.state.bulletedItems.length > 0 ? <ul>{this.state.bulletedItems}</ul> : <span>No entries saved</span>}
                <br />
                {this.state.dayComment==="" ? <span>No comment added</span> :this.state.dayComment}
            </div>
        )
    }
}