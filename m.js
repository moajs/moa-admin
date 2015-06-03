var Inflector = require('inflected');

function process (file) {
  var file_name = file.split('/').pop();

  var name = file_name.split('.')[0]
  console.log(name)  

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
    console.log(e)
  }
}

function _filter(key){
  if('__v' === key || '_id' === key){
    return;
  }
  
  return key;
}


var file ='./result/movies.json';

a= process(file);

console.log(a)