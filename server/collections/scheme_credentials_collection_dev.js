SchemeCredentials = new Meteor.Collection('schemecredentials'
, {
    schema: {
      token: {
        type: String,
        label: 'Token'
      }, // token
      
      schemename: {
        type: String,
        label: 'Scheme Name'
      }      
        
    } // schema
});