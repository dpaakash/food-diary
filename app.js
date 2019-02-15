/**
 * fd_server-0.js
 *
 * HTTP server
 */

// use 'express' framework
const express = require('express');
const app = express(); 
 // use PostgreSQL client 'pg' to connect to db
const { Client } = require('pg');
// use middleware 'bodyParser' to parse the HTTP POST data
const bodyParser = require('body-parser');
const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// initialize PostgreSQL client and connect to the db
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // ssl : true
  });
client.connect();

// add all food items as JSON in the response
function defaultHandler(req, resp) {
    client.query('SELECT * FROM public.food_items;', (err, res) => {
        if (err)
          throw err;

        let respArr = [];
        for (let row of res.rows)
          respArr.push(row);
        // client.end();
        resp.write(JSON.stringify(respArr));
        resp.end();
      });
    resp.writeHead(200, {'Content-Type': 'text/plain'});    
}

async function saveHandler(req,resp){
  console.log(req.body);
    try{
      let res = await client.query('INSERT INTO public.date_entry(date) VALUES($1) RETURNING date_id', [req.body.date])
      let date_id = res.rows[0].date_id;
      const foodItemsIDs = req.body.foodItemsID;
      for(let i=0; i<foodItemsIDs.length; i++){
        await client.query('INSERT INTO public.food_entries(date_id,item_id) VALUES($1,$2)',[date_id,foodItemsIDs[i]]);
      }
    } catch(e){
      console.error(e);
    }
}


/* SQL query
SELECT public.food_items.item_name from public.food_entries
JOIN public.food_items ON public.food_entries.item_id = public.food_items.item_id
JOIN public.date_entry ON public.food_entries.date_id = public.date_entry.date_id
where date = to_date('Mon Feb 10 2019', 'Dy Mon dd yyyy') 
*/
// Queries DB for food items saved on a given date
async function viewHandler(req,resp){
  try{
    let response = await client.query(`SELECT public.food_items.item_name from public.food_entries\
    JOIN public.food_items ON public.food_entries.item_id = public.food_items.item_id\ 
    JOIN public.date_entry ON public.food_entries.date_id = public.date_entry.date_id\
    WHERE date=to_date('${req.query.date}','Dy Mon dd yyyy')`);
    console.log(response);
    let item_names=[];
    for(let row of response.rows){
      item_names.push(row.item_name)
    }
    resp.write(JSON.stringify(item_names));
    resp.end();
  }catch(e){
    console.log(e);
  }
      
}

// listen on port 1337
let port = process.env.PORT;
if (port == null || port == "") {
  port = 1337;
}
app.listen(port);


// route requests
app.get('/index',defaultHandler);
app.post('/save', saveHandler);
app.get('/view',viewHandler);

// test code
app.get('/save', function(req,res){
  res.send(200, 'hello, world again');
});



