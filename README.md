# Food Diary
Web app to keep a log of the consumed food items on a daily basis

## Prerequisites
React 16.8.0+

## Usage
````
npm install
npm run server
npm run client
````
Open http://localhost:3000

### Files
`app.js` - NodeJS server. Handles save, view requests

`App.js` - React's default entry point for the application

`header.js` - Header component. Has date and navigation buttons

`FDEditor.js` - Component which lets the user add the entry on a given date

`FDViewer.js` - Component which lets the user view the saved entry on a given date

`ItemAdder.js` - Component which lets the user add a new food item

The *DB, PostgreSQL,* contains 3 tables

`date_entry` has date_id, date and comment

`food_items` has item_id and item_name

`food_entries` has entry_id, date_id, item_id, quantity, time_period and comment
