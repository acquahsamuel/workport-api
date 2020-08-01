const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser({urlencoded : false}));
app.use(bodyParser.json());






// console.log(app);
// console.log(bodyParser());
















const port = process.env.PORT || 4800;
app.listen(port , ()=>{
    console.log(`Server is runing on ${port} `);
})