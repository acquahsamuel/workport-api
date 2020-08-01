const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));



//Might change the template engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




const home = require("./routes/home/index");
const admin = require("./routes/admin/index");

app.use("/" , home);
app.use("/admin" ,admin);






const port = process.env.PORT || 4800;
app.listen(port , ()=>{
    console.log(`Server is runing on ${port} `);
})