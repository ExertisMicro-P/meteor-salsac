Meteor.methods({
  getFullSchemeDetail: function(scheme_id) {
        check(scheme_id, Number);
        console.log('getFullSchemeDetail: scheme_id='+scheme_id);
        
        // DEV only, uses local collection to authenticate credentials
        //match = SchemeCredentials.findOne({token: token});      
        //console.log("authenticateScheme: match=");console.log(match);
                                           
        // PRD will do a HTTP REST call to PHP which will check MySQL Scheme Manager DB
        //this.unblock();
        //console.log(Meteor.http.call("GET", "http://www.mocky.io/v2/5360bd4bc8ca888702c2d584"));
        //dev_token = '9a61f3a0ecb4427bffd6286efe052317'; // Sandwell MS
       response = Meteor.http.call("GET", "http://api.exertismicro-p.info/fullscheme/"+scheme_id,{
                  'auth': 'salsacf:d45e999a9f8badc1e88033735c34c4bb1f019928'
              })
       
       console.log('getFullSchemeDetail: response = ');console.log(response);
      
      if (response.statusCode==200) {
          // save scheme details, saving products separately
           if (response.data[0]) {
             console.log('Upserting FullSchemeDetails and Products');
             FullSchemeDetails.upsert(
                  { scheme_id: scheme_id },
                  { $set: { full_scheme_details: response.data[0] } }
                );

          // if                                                       
        } // if        
        
        return response.data;
      }  // if
        
   
 }, //getFullSchemeDetail
  
  
   getProducts: function(scheme_id) {
        check(scheme_id, Number);
        console.log('getProducts: scheme_id='+scheme_id);
        
        // DEV only, uses local collection to authenticate credentials
        //match = SchemeCredentials.findOne({token: token});      
        //console.log("authenticateScheme: match=");console.log(match);
                                           
        // PRD will do a HTTP REST call to PHP which will check MySQL Scheme Manager DB
        //this.unblock();
        //console.log(Meteor.http.call("GET", "http://www.mocky.io/v2/5360bd4bc8ca888702c2d584"));
        //dev_token = '9a61f3a0ecb4427bffd6286efe052317'; // Sandwell MS
       response = Meteor.http.call("GET", "http://api.exertismicro-p.info/products/"+scheme_id,{
                  'auth': 'salsacf:d45e999a9f8badc1e88033735c34c4bb1f019928'
              })
       
       console.log('getProducts: response = ');console.log(response);
      
      if (response.statusCode==200) {
          // save scheme details, saving products separately
           if (response.data) {
             Products.remove({});
             return response.data;
           } // if                                                       
        } // if        
        
   
 }, //getProducts 

  
  
getTariffs: function(scheme_id) {
        check(scheme_id, Number);
        console.log('getTariffs: scheme_id='+scheme_id);
        
        // DEV only, uses local collection to authenticate credentials
        //match = SchemeCredentials.findOne({token: token});      
        //console.log("authenticateScheme: match=");console.log(match);
                                           
        // PRD will do a HTTP REST call to PHP which will check MySQL Scheme Manager DB
        //this.unblock();
        //console.log(Meteor.http.call("GET", "http://www.mocky.io/v2/5360bd4bc8ca888702c2d584"));
        //dev_token = '9a61f3a0ecb4427bffd6286efe052317'; // Sandwell MS
       response = Meteor.http.call("GET", "http://api.exertismicro-p.info/tariffs/"+scheme_id,{
                  'auth': 'salsacf:d45e999a9f8badc1e88033735c34c4bb1f019928'
              })
       
       console.log('getTariffs: response = ');console.log(response);
      
      if (response.statusCode==200) {
          // save scheme details, saving products separately
           if (response.data) {
             Tariffs.remove({});
             return response.data;
           } // if                                                       
        } // if        
        
   
 } //getTariffs 

  
  
}); // methods


