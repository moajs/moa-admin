#!/usr/bin/env node
require('shelljs/global');

var child_process = require('child_process');

var argv = process.argv;
argv.shift();

// var file_path = __dirname;
var current_path = process.cwd();


if (!which('moag')) {
  echo('Sorry, this script requires moajs, please npm install -g moajs');
  exit(1);
}

// step 1
var g_step_1 = require('../index');
g_step_1(current_path);

// step 2
var g_step_2 = require('../m');
g_step_2(current_path);
