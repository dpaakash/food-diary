import React from 'react';

/**
 * Used to view the saved data on a given date
 */
export class FDViewer extends React.Component {

    constructor(props) {
        super(props);
        this.savedFoodItemNames = [];
        this.state = {
            bulletedItems: [],
            dayComment: ""
        };
    }

    // handle default page load
    componentDidMount() {
        this.setStateBulletedItems();
    }

    // handle date change via 'Next' and 'Prev' buttons
    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.savedFoodItemNames = [];
            this.setStateBulletedItems();
        }
    }

    // fetches records on the passed date and populates the state
    setStateBulletedItems() {
        this.getSavedItemsOnDate().then((response) => {
            let responseObj = JSON.parse(response);
            for (let itemName of responseObj.item_names)
                this.savedFoodItemNames.push(itemName);
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
            const response = await fetch(`/view?date=${this.props.date.toDateString()}`);
            console.log(response);
            const myJson = await response.json();
            console.log(myJson);
            return JSON.stringify(myJson);
        }
        catch (e) {
            console.log("Unable to fetch saved food items from DB" + e);
        }
    }

    render() {
        return (
            <div>
                {this.state.bulletedItems.length ? <ul>{this.state.bulletedItems}</ul> : "No entries saved"}
                <br />
                {this.state.dayComment==="" ? "No comment added" :this.state.dayComment}
            </div>
        )
    }
}