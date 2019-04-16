import React from 'react';

export class Header extends React.Component {
    constructor(props){
        super(props);
        this.openDatePicker = this.openDatePicker.bind(this);
    }
    // renders the date and two buttons, 'Prev' and 'Next'
    render() {
        return (
            <div>
                <nav>
                    <button onClick={this.handleClick} name="prev">Previous</button>
                    {/* <button onClick={this.openDatePicker}>Calendar</button> */}
                    <button onClick={this.handleClick} name="next">Next</button>
                </nav>
                <h3>{this.props.date.toDateString()}</h3>
            </div>
        );
    }

    openDatePicker(e){
        const dateInput = <input type='date'></input>;
        e.target.append(dateInput);
    }

    // go to the previous or next day based on the button clicked
    handleClick = (event) => {
        let currDate = this.props.date;
        // prevent mutating the previous state to get the correct value in 'prevProps' of 'componentDidUpdate'
        let copiedCurrDate = new Date(currDate.getTime());
        let name = event.target.name;
        if(name === "next"){
            copiedCurrDate.setDate(copiedCurrDate.getDate()+1);
        } else {
            copiedCurrDate.setDate(copiedCurrDate.getDate()-1);
        }
        this.props.setDate(copiedCurrDate);
    };
}