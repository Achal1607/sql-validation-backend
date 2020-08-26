const express = require('express');
const bodyParser = require('body-parser');
const { Parser } = require('node-sql-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//app.get("/data",(req,res)=>res.send("Hello World!!!"));

app.post('/data', (req, res, next) => {
    const all = req.body.data.split(";"); //data field must be added to body
    let result    
    const parser = new Parser();
            try {
                const ast = parser.astify(all[all.length-1]); // mysql sql grammer parsed by default
                const sql = parser.sqlify(ast);
                result={ message: true, sql: sql }
            }
            catch{
                result={ message: false, sql: all[all.length-1] }
            }
        console.log(result)
        res.send({ result: result });
});

app.listen(5000);