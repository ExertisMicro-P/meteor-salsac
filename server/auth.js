Meteor.methods({
  authenticateScheme: function(token) {
        check(token, String);
              console.log('authenticateScheme: token='+token);
        
        // DEV only, uses local collection to authenticate credentials
        //match = SchemeCredentials.findOne({token: token});      
        //console.log("authenticateScheme: match=");console.log(match);
                                           
        // PRD will do a HTTP REST call to PHP which will check MySQL Scheme Manager DB
        //this.unblock();
        //console.log(Meteor.http.call("GET", "http://www.mocky.io/v2/5360bd4bc8ca888702c2d584"));
        //dev_token = '9a61f3a0ecb4427bffd6286efe052317'; // Sandwell MS
       response = Meteor.http.call("GET", "http://api.exertismicro-p.info/scheme/"+token,{
                  'auth': 'salsacf:d45e999a9f8badc1e88033735c34c4bb1f019928'
              })
       
       console.log('authenticateScheme: response = ');console.log(response);
      
      if (response.statusCode==200) {
        return response.data[0];
      }
        
    
       /*
        // or using Node.JS http://stackoverflow.com/questions/22233676/digest-authentication-in-meteor
        var request = Npm.require('request');
        
        var res = request.get('http:/api.exertismicro-p.info/scheme/'+token, {
            'auth': {
                'user': 'salsacf',
                'pass': '4be6e41ee05b3527abdd5f1cb53c185b053a4b45',
                'sendImmediately': false
            }
        });
        console.log(res);
        */
    
        
    
    
          
        return match;
      } //authenticateScheme
}); // methods