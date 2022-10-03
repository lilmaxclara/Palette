var express = require('express');
var cors = require('cors')
var app = express();
app.use(express.json());
app.use(cors())

app.use('/pallet/game', async (req, res) => {
    
})

app.use('/pallet/list', async (req, res) => {
    
})

var server = app.listen(22887, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})