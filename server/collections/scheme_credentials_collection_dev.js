// DEVELOPMENT ONLY
// Holds several tokens we can try logging in as to test authentication and scheme switching.
// In production we'll authenticate against an REST API provided around Scheme Manager Database
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