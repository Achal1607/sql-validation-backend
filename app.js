const express = require('express');
const bodyParser = require('body-parser');
const { Parser } = require('node-sql-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//app.get("/data",(req,res)=>res.send("Hello World!!!"));

app.post('/data', (req, res, next) => {
    const all = req.body.data.split(";"); //data field must be added to body
        const parser = new Parser();
        let result = [];
        for (i = 0; i < all.length; i++) {
            try {
                const ast = parser.astify(all[i]); // mysql sql grammer parsed by default
                const sql = parser.sqlify(ast);
                result.push({ message: true, sql: sql });
            }
            catch{
                result.push({ message: false, sql: all[i] });
            }
        }
        res.send({ result: result });
});

app.listen(5000);