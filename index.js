require('shelljs/global');


var get_collection_names = require('get_collection_names');

var host  = "127.0.0.1";
var port  = "27017";
var db    = "express-g-demo";

//
get_collection_names(host, port, db, function(err, names){
  console.log(names);
})



// Run external tool synchronously
if (exec('git commit -am "Auto-commit"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}

// mongo express-g-demo --eval "var collection = 'sangs'" variety.js > result/sangs.json

mkdir('result');

function process_item(name) {
  var script = "mongo express-g-demo --eval \"var collection = 'sangs'\" variety.js > result/sangs.json";
  // Run external tool synchronously
  if (exec(script).code !== 0) {
    echo('Error: Git commit failed');
    exit(1);
  }
}

process_item('name') ;