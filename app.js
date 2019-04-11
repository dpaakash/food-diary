/**
 * app.js
 *
 * HTTP server
 */

// use 'express' framework
const express = require('express');
const app = express(); 
 // use PostgreSQL client 'pg' to connect to the DB
const { Client } = require('pg');
// use middleware 'bodyParser' to parse the received HTTP POST data
const bodyParser = require('body-parser');
const path = require('path');

// serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// initialize PostgreSQL client and connect to the db
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl : true
  });
// TODO check if an error here should process.exit(1)
client.connect().catch((e) => { console.error("Cannot connect to the DB. Exiting..."+e); });

// query the DB and send the available food items details in response
function defaultHandler(req, resp) {
    client.query('SELECT * FROM public.food_items;', (err, res) => {
        if (err)
          throw err;

        const respArr = [];
        for (let row of res.rows)
          respArr.push(row);
        // client.end();
        resp.write(JSON.stringify(respArr));
        resp.end();
      });
    resp.writeHead(200, {'Content-Type': 'text/plain'});    
}

// handle save request
async function saveHandler(req,resp){
    try{
      const res = await client.query('INSERT INTO public.date_entry(date,comment) VALUES($1,$2) RETURNING date_id', [req.body.date,req.body.dayComment])
      const date_id = res.rows[0].date_id;
      const foodItemsIDs = req.body.foodItemsID;
      // TODO make it efficient
      for(let i=0; i<foodItemsIDs.length; i++){
        await client.query('INSERT INTO public.food_entries(date_id,item_id) VALUES($1,$2)',[date_id,foodItemsIDs[i]]);
      }
      resp.end();
    } catch(e){
      console.error("Error while saving data: "+e);
    }
}

// query DB and send names for food items saved on a given date
// date example 'Mon Feb 10 2019'
async function viewHandler(req,resp){
  try{
    //TODO check for a better way to fetch 'comment'
    const response = await client.query(`SELECT public.food_items.item_name, public.date_entry.comment from public.food_entries\
    JOIN public.food_items ON public.food_entries.item_id = public.food_items.item_id\ 
    JOIN public.date_entry ON public.food_entries.date_id = public.date_entry.date_id\
    WHERE date=to_date('${req.query.date}','Dy Mon dd yyyy')`);
    const item_names=[];
    let dayComment = "";
    for(let row of response.rows){
      item_names.push(row.item_name);
      dayComment = row.comment;
    }
    resp.write(JSON.stringify({item_names, dayComment}));
    resp.end();
  }catch(e){
    console.error("Error while fetching saved item names from DB "+e);
  }
      
}

async function addHandler(req,resp){
  try{
    await client.query('INSERT INTO public.food_items (item_name) VALUES ($1)',[req.body.new_item_name]);
  } catch(e) {
    console.error(`Error occurred while adding the new item ${req.body.new_item_name} 
                  ${e}`);
  }
  
}

// listen on port 1337 by default
let port = process.env.PORT;
if (port == null || port == "") {
  port = 1337;
}
app.listen(port);


// route requests
app.get('/index',defaultHandler);
app.post('/save', saveHandler);
app.get('/view',viewHandler);
app.post('/add',addHandler);




