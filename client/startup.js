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
  
  Session.set('postcodeLookupInProgress', false);

  Deps.autorun(function () {
    Session.set('scheme', CurrentScheme.findOne({}));
  });

  
});


