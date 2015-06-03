require('shelljs/global');
var Promise = require("bluebird");

var fs = require('fs')
var child_process = require('child_process');
var Inflector = require('inflected');

// Run external tool synchronously
 
// rm('./scaffold.sh');

fs.appendFile('./scaffold.sh', '#! /bin/bash \n');
chmod('u+x', './scaffold.sh');


var dir ='./result/';

fs.readdir(dir, function(err, files){
  processnames(files) 
});


function processnames(files) {
  var append_arr = [];

  files.forEach(function(file){  
    a = process(dir + '' +file);
    // console.log(a);
    if(a !== undefined){  
      var t = 'moag ' + a.join(' ');
      console.log(t)
      fs.appendFileSync('scaffold.sh',t + "\n" );
    }
  })
}



function process (file) {
  var file_name = file.split('/').pop();

  var name = file_name.split('.')[0]
  // console.log(name)  

  var singularize_name = Inflector.singularize(name) 
  var arr = [singularize_name];
  
  try{  
    a = require(file)
    // console.log(a)
    
    for(var k in a){
      var obj = a[k];
      
      // console.log(obj._id.key)
      var key = _filter(obj._id.key);
      
      if(key){
        arr.push(key + ':' + obj.value.types[0].toLowerCase());
      }
      // console.log(obj.value.types[0])
    }
    
    return arr;
  }catch(e){
    // console.log(e)
  }
}



function _filter(key){
  if('__v' === key || '_id' === key){
    return;
  }
  
  return key;
}
