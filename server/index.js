import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 4000;

const db = mysql.createConnection({
  host: 'localhost',  // your MySQL host
  user: 'root',       // your MySQL user
  password: '123456',  // your MySQL password
  database: 'test'    // your MySQL database
});


app.get('/', (req, res) => {
  res.send(`<h2>Hi</h2>`)
});
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
app.post("/createBook", (req, res) => {
    // Why we are not giving the values directly in query , 
    // beacuse if we will give this ,it will become a query ,
    //  so a attacker or hacker might be send a malicous query to hack our database , like
    //  '1' ="1"  this will return true and we will lost our data
    // so we have used a concept name paramterized queries

    const q = "INSERT INTO books ( `title`, `description`, `cover`) VALUES (?)"
    const  VALUES = [
        "A Sharp Mind",
        "A Book for all peoples which are intersting to grow their personality",
        "Book"
    ]
    db.query(q,[VALUES] ,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
