#!/usr/bin/env node
require('shelljs/global');

var fs = require('fs')
var Promise = require("bluebird");
var Inflector = require('inflected');
var child_process = require('child_process');

var argv = process.argv;
argv.shift();

// var file_path = __dirname;
var current_path = process.cwd();


if (!which('moag')) {
  echo('Sorry, this script requires moajs, please npm install -g moajs');
  exit(1);
}

var config = {};

if (fs.existsSync(current_path + '/config/default.json')) {
  config = require('config');
}else{
  echo('Sorry, this script can not read config/default.json, please check it is a moajs project root direction!');
}

// step 1
var g_step_1 = require('../index');
g_step_1(current_path, config);

// step 2
var g_step_2 = require('../m');
g_step_2(current_path);
