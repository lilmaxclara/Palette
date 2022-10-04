var express = require('express');
var cors = require('cors')
var app = express();
app.use(express.json());
app.use(cors())
var fs = require('fs');

makeupListArray = []

app.use('/pallet/list', async (req, res) => {

    fs.readFile( __dirname + '/assets/makeupList.txt', function (err, data) {
        if (err) {
          throw err; 
        }
        makeupListArray = data.toString().split("\n");
        makeupListArray = makeupListArray.map((item) => {
            return item.replace(/(\r\n|\n|\r)/gm, "");
        })

      });

      // send response as json 
    res.json(makeupListArray);
    
})

var server = app.listen(22887, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})