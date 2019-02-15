import React from 'react';

/**
 * Used to view the saved data on a given date
 */
export class FDViewer extends React.Component{

    constructor(props){
        super(props);
        this.savedFoodItemNames = [];
        this.bulletedItems2 = []
        this.state = {
            bulletedItems : []
        };
    }

    componentDidMount(){
        this.setStateBulletedItems();
    }

    componentDidUpdate(prevProps){
        if(prevProps.date !== this.props.date){
            // this.setState({bulletedItems : []});
            this.savedFoodItemNames = [];
            this.setStateBulletedItems();
        }
            
    }

    setStateBulletedItems() {
        this.getSavedItemsOnDate().then((response) => {
            let itemNames = JSON.parse(response);
            // debugger;
            for (let itemName of itemNames)
                this.savedFoodItemNames.push(itemName);
            this.setState({
                bulletedItems: this.savedFoodItemNames.map((e, i) => {
                    return <li key={i}>{e}</li>;
                })
            // this.bulletedItems2.push(this.savedFoodItemNames.map((e, i) => {
            //             return <li key={i}>{e}</li>;
            //         }));
            });
        }).catch((e) => console.log("errorrr" + e));
    }

    // get the saved data from db based on the selected date
    //TODO return immediately if the date is in future
    async getSavedItemsOnDate(){
        //query:"date=Mon%20Feb%2011%202019%2011:45:50%20GMT+0530%20(India%20Standard%20Time)"
        try{
            const response = await fetch(`/view?date=${this.props.date.toDateString()}`);
            const myJson = await response.json();
            return JSON.stringify(myJson);
        }
        catch(e){
            console.log(e);
        }
    }

    render(){
            if(this.state.bulletedItems.length)
                var rVal = <ul>{this.state.bulletedItems}</ul> 
            else
                var rVal = <h5>No entries saved on {this.props.date.toDateString()}</h5>

            return (
                <div>{rVal}</div>
                    // <div>
                    //     <h5>Hello from FDViewer on {this.props.date.toDateString()}</h5>
                    //     <ul>{this.state.bulletedItems}</ul> 
                    //     {/* {this.setState({bulletedItems : []})}        */}
                    //     {/* <ul>{this.bulletedItems2}</ul> */}
                    // </div>
                    

            )
    }
}