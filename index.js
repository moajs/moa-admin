require('shelljs/global');
var fs = require('fs')
var Promise = require("bluebird");

var get_collection_names = require('get_collection_names');

var child_process = require('child_process');

// var file_path = __dirname;
// var current_path = process.cwd();


var host  = "127.0.0.1";
var port  = "27017";
var db    = "express-g-demo";

//
get_collection_names(host, port, db, function(err, names){
  console.log(names);
  process(names);
})

// mongo express-g-demo --eval "var collection = 'sangs'" variety.js > result/sangs.json
rm('mongo.sh')
mkdir('result');

function process(names) {
  var append_arr = [];
  names.forEach(function(name){
    var script = "mongo express-g-demo --eval \"var collection = '" + name +"'\" variety.js >> result/" + name + ".json \n";
    append_arr.push(fs.appendFile('mongo.sh',script ) );
  });
  
  return Promise.all(append_arr).then(function() {
    chmod('u+x', 'mongo.sh');
    console.log("query successful and connection closed");
    exec()
  });
 
}
 
function exec(){
  // execFile: executes a file with the specified arguments
  child_process.execFile('./mongo.sh',
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('kp exec error: ' + error);
      }else{
        console.log("kp exeute sucess!")
      }
  });
}
