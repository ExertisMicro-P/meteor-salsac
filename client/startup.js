// Client

Meteor.startup(function() {
  Session.set('exertismicrop', 'Exertis Micro-P');
  Session.set('schemecompany', 'TLT');
  Session.set('schemecompanyaddress', '1 Redcliffe Street, Bristol, BS1 6TO');
  
  Session.set('taxmultiplier', 0.32); // 20% tax bracket
  Session.set('term', 24); // 24 months
  
  Session.set('productsorting','label');
  
  Session.set('showingproductdetails', false);
  Session.set('applynowclicked', false);
  
  // for https://atmospherejs.com/package/handlebar-helpers
  //Helpers.addScope('Session', Session);
  
  // use this for any data stored persistently on the Server
  // it's a sort of session ID, so we can retrieve only our own values
  // and not thos from another client
  Session.set('uniqueClientID', Random.id());
  
  Session.set('translations', {});
  
  Products.truncate();

  
  // Get a list of schemes, ids and username - useful fro dropdowns in Content Admin
  getSchemesBrief();
  
  
  /*
  ServerInfo.insert(
    { field: "postcodeLookupInProgress", value: false, clientID: Session.get('uniqueClientID') }
  );
  */


  Deps.autorun(function () {
    Session.set('scheme', CurrentScheme.findOne({}));
  });
  
  
  function getSchemesBrief() {
    response = Meteor.http.call("GET", 
                                "http://api.exertismicro-p.info/schemesbrief",
                                {'auth': 'salsacf:d45e999a9f8badc1e88033735c34c4bb1f019928'}, 
                                function(error, response) {
                                  if (!error) {
                                     console.log(response);
                                    
                                    if (response.statusCode==200) {
                                      scheme_ids = [];
                                      response.data.forEach(function (scheme) {
                                           scheme_ids.push({label: scheme.username, value: scheme.scheme_id});
                                         });
                                      console.log(scheme_ids);
                                      Session.set('schemesBrief', scheme_ids);
                                    }
                              
                                  } // iff
                                }
                               ); // Method.call

  } // getSchemesBrief

  
});


