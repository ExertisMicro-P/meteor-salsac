

Meteor.methods({
authenticateScheme: function(token) {
      check(token, String);
      console.log('token='+token);
      
      // DEV only, uses local collection to authenticate credentials
      match = SchemeCredentials.findOne({token: token});      
                                         
      // PRD will do a HTTP REST call to PHP which will check MySQL Scheme Manager DB
      this.unblock();
      console.log(Meteor.http.call("GET", "http://www.mocky.io/v2/5360bd4bc8ca888702c2d584"));
        
      return match;
    } //authenticateScheme
}); // methods