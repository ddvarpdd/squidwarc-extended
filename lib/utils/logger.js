/**
 * Copyright 2019 ASGdev. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = require('request-json');
var client = request.createClient('http://localhost:3001/');

/**
 * @desc Test to see if a ``plain object`` is empty
 * @param {Object?} object
 * @return {boolean}
 */
exports.logInfo = function (object) {
  let data = {
	datetime: new Date().toISOString(),
  	label: object
  }
  
  client.post('info/', data, function (error, response, body) {
    if(error){
	console.log("[MONITOR] Communication Error");
    } else {
	console.log("[MONITOR] Monitor updated");
    }
  });
}

exports.logError = function (object) {
  let data = {
	datetime: new Date().toISOString(),
  	label: object
  }
  client.post('error/', data, function (error, response, body) {
    if(error){
	console.log("[MONITOR] Communication Error");
    } else {
	console.log("[MONITOR] Monitor updated");
    }
  });
}

exports.logUpdate = function (s, p) {
  let data = {
	datetime: new Date().toISOString(),
  	queue: s,
	processed: p
  }

  client.post('history/', data, function (error, response, body) {
    if(error){
	console.log("[MONITOR] Communication Error");
    } else {
	console.log("[MONITOR][HISTORY] Monitor updated");
    }
  });
}

exports.logLink = function (l) {
  let data = {
	datetime: new Date().toISOString(),
  	link: l
  }

  client.post('link/', data, function (error, response, body) {
    if(error){
	console.log("[MONITOR] Communication Error");
    } else {
	console.log("[MONITOR][LINK] Monitor updated");
    }
  });
}
