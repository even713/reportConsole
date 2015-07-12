(function($){
  var appID = "a4d0c92efd1ecb99325a03d9609a1bf2";
  var restAPIKey = "a32621bb72e8f8702b06b95d843415bd";

  function logServer(appName, container){
      Bmob.initialize(appID, restAPIKey);
      BmobSocketIo.initialize(appID);
      this.logs = Bmob.Object.extend("logs");
      this.logsObject = new this.logs();

      this.logQuery = new Bmob.Query(this.logs);
      this.appName = appName; 
      this.container = $(container);

      this.getLog();

      var that = this;
      BmobSocketIo.updateTable("logs");
      BmobSocketIo.onUpdateTable = function(tableName, data){
        that.onLogUpdate(tableName, data);
      }
  }

  logServer.prototype = {
      getLog: function(){
          var that = this;
          this.logQuery.equalTo("appName", this.appName).greaterThan("createdAt", new Date((new Date().getTime() - 10* 60 * 1000))).find({
            success: function(results) {
              // results is an array of Bmob.Object.
              that.showLogs(results);
            },

            error: function(error) {
              // error is an instance of Bmob.Error.
            }
        });     
      },

      onLogUpdate: function(tableName, data){
        //console.log([tableName, data]);
        var results = [{attributes:{logType: data.logType, logContent: data.logContent, logInfo: data.logInfo}}];
        this.showLogs(results);
      },

      showLogs: function(results){
            var str = "";
            for(var i = 0; i < results.length; i++) {
              str += "<div class='type-"+ results[i].attributes.logType +"'>"+ results[i].attributes.logInfo +"</div>";
            }
            this.container.append(str);    
      },

      clearLog: function(){
          this.container.html("");
      }
  }

  this.logServer = logServer;  
})(jQuery);