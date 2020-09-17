/**
 * Copyright 2020 ASGdev <aurelien.surier@gmail.com>. All rights reserved.
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

class Logger {	
   /**
   * @desc Create a new logger object
   */
  constructor () {
    /**
     * @desc http transport
     */
    this.http = {
		enabled: false,
		endpoint: "",
		client: null
	}
  }

  init (conf) {
	console.log(conf)
    if(conf.http.enabled){
	  this.http.enabled = true
	  this.http.endpoint = conf.http.endpoint
	  this.http.client = request.createClient(conf.http.endpoint); 
	}
  }
  
	
  logInfo = function (object) {
    let data = {
	  datetime: new Date().toISOString(),
  	  label: object
    }
	
	if(this.http.enabled){
      this.http.client.post('info/', data, function (error, response, body) {
        if(error){
	      console.log("[MONITOR] Communication Error");
        } else {
	      console.log("[MONITOR] Monitor updated");
        }
      });
    }
  }

  logError = function (object) {
    let data = {
	  datetime: new Date().toISOString(),
  	  label: object
    }
	
	if(this.http.enabled){
      this.http.client.post('error/', data, function (error, response, body) {
        if(error){
	      console.log("[MONITOR] Communication Error");
        } else {
	      console.log("[MONITOR] Monitor updated");
        }
      });
	}
  }

  logUpdate = function (s, p) {
    let data = {
	  datetime: new Date().toISOString(),
  	  queue: s,
	  processed: p
    }

	if(this.http.enabled){
      this.http.client.post('history/', data, function (error, response, body) {
        if(error){
	      console.log("[MONITOR] Communication Error");
        } else {
	      console.log("[MONITOR][HISTORY] Monitor updated");
        }
      });
	}
  }

  logLink = function (l) {
    let data = {
	  datetime: new Date().toISOString(),
  	  link: l
    }

	if(this.http.enabled){
	  this.http.client.post('link/', data, function (error, response, body) {
        if(error){
	      console.log("[MONITOR] Communication Error");
        } else {
	      console.log("[MONITOR][LINK] Monitor updated");
        }
      });
	}
  }
}

/**
 * @type {Logger}
 */
let logger = new Logger(); // Node caching shared instance
module.exports = logger;
