import React from 'react';

export class Header extends React.Component {
    // renders the date and two buttons, 'Prev' and 'Next'
    render() {
        return (
            <div>
                <h3 align="center">{this.props.date.toDateString()}</h3>
                <button onClick={this.handleClick} name="prev">Prev</button>
                <button onClick={this.handleClick} name="next" style={{float:'right'}}>Next</button>
            </div>
        );
    }

    // go to the previous or next day based on the button clicke d
    handleClick = (event) => {
        let currDate = this.props.date;
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