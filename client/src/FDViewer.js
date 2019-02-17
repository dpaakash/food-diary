import React from 'react';

/**
 * Used to view the saved data on a given date
 */
export class FDViewer extends React.Component {

    constructor(props) {
        super(props);
        this.savedFoodItemNames = [];
        this.state = {
            bulletedItems: []
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
            let itemNames = JSON.parse(response);
            for (let itemName of itemNames)
                this.savedFoodItemNames.push(itemName);
            this.setState({
                bulletedItems: this.savedFoodItemNames.map((e, i) => {
                    return <li key={i}>{e}</li>;
                })
            });
        }).catch((e) => console.log(e));
    }

    // get the saved data from db based on the selected date
    //TODO return immediately if the date is in future
    async getSavedItemsOnDate() {
        try {
            const response = await fetch(`/view?date=${this.props.date.toDateString()}`);
            const myJson = await response.json();
            return JSON.stringify(myJson);
        }
        catch (e) {
            console.log("Unable to fetch saved food items from DB" + e);
        }
    }

    render() {
        let val = null;
        if (this.state.bulletedItems.length)
            val = <ul>{this.state.bulletedItems}</ul>
        else
            val = <h5>No entries saved on {this.props.date.toDateString()}</h5>

        return (
            <div>{val}</div>
        )
    }
}