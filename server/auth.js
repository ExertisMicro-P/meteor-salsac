Meteor.methods({
  authenticateScheme: function(token) {
        check(token, String);
        console.log('token='+token);
        
        // DEV only, uses local collection to authenticate credentials
        match = SchemeCredentials.findOne({token: token});      
    console.log("authenticateScheme: match=");console.log(match);
                                           
        // PRD will do a HTTP REST call to PHP which will check MySQL Scheme Manager DB
        //this.unblock();
        //console.log(Meteor.http.call("GET", "http://www.mocky.io/v2/5360bd4bc8ca888702c2d584"));
        /*
        console.log(Meteor.http.call("GET", "http:/api.exertismicro-p.info/scheme/"+token,{
                  'auth': {'salsacf:4be6e41ee05b3527abdd5f1cb53c185b053a4b45'
                  }
              }));
        */
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