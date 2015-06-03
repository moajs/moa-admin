require('shelljs/global');
var fs = require('fs')
var Promise = require("bluebird");
var Inflector = require('inflected');
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
rm('-Rf','result');
mkdir('result');

function process(names) {
  admin_page(names);
  
  var append_arr = [];
  names.forEach(function(name){
    var script = "mongo express-g-demo --eval \"var collection = '" + name +"'\" variety.js >> result/" + name + ".json \n";
    append_arr.push(fs.appendFile('mongo.sh',script ) ); 
  });
  
  return Promise.all(append_arr).then(function() {
    names.forEach(function(name){

      var script2 = "sed -i '' -e '1,12d' result/" + name + ".json \n";;
      append_arr.push(fs.appendFile('mongo.sh',script2 ) );
    
    });
    
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


function admin_page(names){
  var tpl = require('tpl_apply');

  var Handlebars = require('handlebars');
  
  Handlebars.registerHelper('list', function(items, options) {
    console.log(items)

    var out = "<ul>";

    for(var i=0, l=items.length; i<l; i++) {
      var singularize_name = Inflector.singularize(items[i]) 
      out = out + "<li><a href='/" + items[i] + "'>" + singularize_name+ "</a></li>";
    }

    return out + "</ul>";
  });



  var source  =  './tpl.js'
  var dest    =  './admin.html'


  tpl.tpl_apply_with_register_helper(Handlebars, source, {
    names: names
  }, dest);
}