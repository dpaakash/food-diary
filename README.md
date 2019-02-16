# food-diary

## Usage
````
npm install
npm start
cd client
npm install
npm start
````
Open http://localhost:3000 to view it in the browser.

#### Relevant files
app.js - NodeJS server. Handles save, view requests.

in *client/*

App.js - React's default entry point for the application
header.js - Header component. Has date and navigation buttons.
FDEditor.js - Component which lets the user add the entry on a given date.
FDViewer.js - Component which lets the user view the saved entry on a given date.

The *DB, PostgreSQL,* contains 3 tables

date_entry has date_id, date and comment
food_items has item_id and item_name
food_entries has entry_id, date_id, item_id, quantity, time_period and comment
