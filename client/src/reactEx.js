import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component{
    constructor(props){
        super(props);
        this.state = {clicked : false};
    }

    handleClick = () => this.setState({clicked : true});

    render(){
        if(this.state.clicked)
            return <h1>Thanks!</h1>

        return(
            <button onClick={this.handleClick}>Click Me!</button>
        );
    }
}


