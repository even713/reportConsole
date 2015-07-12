(function($){
	var appID = "a4d0c92efd1ecb99325a03d9609a1bf2";
	var restAPIKey = "a32621bb72e8f8702b06b95d843415bd";
	var oldConsole = window.console;
	window.console = {};

	

	function logClient(appName){

	    Bmob.initialize(appID, restAPIKey);
	    this.logs = Bmob.Object.extend("logs");
	    this.logsObject = new this.logs();

	    this.logQuery = new Bmob.Query(this.logs);
	    this.appName = appName;
	    this.init();
	}

	logClient.prototype = {
		init: function(){
			for(var p in oldConsole) {
				if(p == "log" || p == "info" ||p == "debug" ||p == "error")
					console[p] = this.consoleLog(p);
				else
					console[p] = oldConsole[p];
				
			}	

			var that = this;

			 $(document).ajaxError( function(event, jqXHR, options, data){
		    	that.addLog("ajax-error", "the request url is:" + options.url + "\n, the request method is: " + options.type + "\n, error: " + data);
			 } );					
		},
	    addLog: function(logType, logInfo){
	          this.logsObject.save({appName: this.appName, logType: logType, logInfo: logInfo}, {
	          success: function(object) {
	            //
	          },
	          error: function(model, error) {
	            //$(".error").show();
	          }
	        });     
	    },
	    consoleLog: function(type) {
	    	var that = this;
			return function(){
				oldConsole[type].apply(oldConsole, arguments);
				//if($.inArray(type, logLevel) > -1) {
					var message = arguments[0];
			    	var str = ""
			    	if(Object.prototype.toString.call(message) === "[object String]") {
			    		str = message;
			    	} else {
			    		str = JSON.stringify(message);
			    	}
					that.addLog(type, str);
				//}
			};	    	
	    }
	}

	window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
	    var msg = "Error: " + errorMessage + "\n"
	    		+ "Source file: " + scriptURI + "\n"
	    		+ "Line: " + lineNumber + "\n"
	    		+ "Column: " + columnNumber + "\n"
	    		+ "Stack: " + errorObj;
	    console.error(msg);
	 }	


	this.logClient = logClient;
})(jQuery)