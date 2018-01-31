const express = require('express');
const app = express();

const figlet = require('figlet');

const api = require('./api/call')(app);
const filters = require('./api/filter')(app);

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(PORT, function(){
    figlet.text("Makaan", (err, dat) => {
        console.log(dat);
        console.log("Listening at port 3000..");
      });
});
