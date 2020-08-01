const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));



//Might change the template engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');











const port = process.env.PORT || 4800;
app.listen(port , ()=>{
    console.log(`Server is runing on ${port} `);
})