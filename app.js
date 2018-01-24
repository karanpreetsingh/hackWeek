const express = require('express');
const app = express();
const api = require('./api/route')(app);

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(PORT, function(){
    console.log("Listening at port " + PORT);
});
