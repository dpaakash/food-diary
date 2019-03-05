# food-diary

## Usage
````
npm install
npm start

cd client

npm install
npm start
````
Open http://localhost:3000 to view it in the browser(The DB needs to be up and running).

#### Relevant files
app.js - NodeJS server. Handles save, view requests.

in *client/src*

App.js - React's default entry point for the application.<br />
header.js - Header component. Has date and navigation buttons.<br />
FDEditor.js - Component which lets the user add the entry on a given date.<br />
FDViewer.js - Component which lets the user view the saved entry on a given date.<br />
ItemAdder.js - Component which lets the user add a new food item.

The *DB, PostgreSQL,* contains 3 tables

date_entry has date_id, date and comment<br />
food_items has item_id and item_name<br />
food_entries has entry_id, date_id, item_id, quantity, time_period and comment<br />
