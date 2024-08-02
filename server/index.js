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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
