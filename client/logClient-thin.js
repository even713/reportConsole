(function(){
	var appID = "17688807c71cdab03b68296c1b92277e";
	var restAPIKey = "b2c717427dd60f3b3855de72c6c873a6";
	var oldConsole = window.console;


	function logClient(appName, isOverrideConsoleLog){

	    Bmob.initialize(appID, restAPIKey);

			this.logQuery = Bmob.Query("logs");
	    this.appName = appName;
	    this.init(isOverrideConsoleLog);
	}

	logClient.prototype = {
		init: function(isOverrideConsoleLog){
			if(isOverrideConsoleLog) {
				window.console = {};
				for(var p in oldConsole) {
					if(p == "log" || p == "info" ||p == "debug" ||p == "error")
						console[p] = this.consoleLog(p);
					else
						console[p] = oldConsole[p];

				}
			}
		},
	    addLog: function(logType, logInfo){
					this.logQuery.set("appName", this.appName);
					this.logQuery.set("logType", logType);
					this.logQuery.set("logInfo", logInfo);
					this.logQuery.save().then(res => {
						//alert(res);
					}).catch(err => {
						alert(err);
					});
	    },
	    consoleLog: function(type) {
	    	var that = this;
			return function(){
				oldConsole[type].apply(oldConsole, arguments);
					var message = arguments[0];
			    	var str = ""
			    	if(Object.prototype.toString.call(message) === "[object String]") {
			    		str = message;
			    	} else {
			    		str = JSON.stringify(message);
			    	}
					that.addLog(type, str);
			};
		},

		log: function(arguments){
			var message = arguments;
				var str = ""
				if(Object.prototype.toString.call(message) === "[object String]") {
					str = message;
				} else {
					str = JSON.stringify(message);
				}
			this.addLog("report", str);
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


	window.logClient = logClient;
})()
