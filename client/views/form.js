Template.addressSelect.helpers({
  addresses: function() {
      console.log('Template.addressSelect.helpers.addresses');      
      return Addresses.find({});
    }, // addresses
  
  postcodeLookupInProgress: function() {
    return ServerInfo({field: 'postcodeLookupInProgress'});
  } // postocdeLookupInProgress
}); // helpers


AutoForm.hooks({
  applicationForm: {
   /* before: {
      insert: function(doc) {},
      update: function(docId, modifier) {},
      remove: function(docId) {},
      "methodName": function(doc) {}
    },*/
    /*
    after: {
      insert: function(error, result, template) {
                }
     /* update: function(error, result, template) {},
      remove: function(error, result, template) {},
      "methodName": function(error, result, template) {}
    } */
  /*
    onSubmit: function(insertDoc, updateDoc, currentDoc) {},
*/
    //called when any operation succeeds, where operation will be
    //"insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
                      Session.set('selectedproduct', null);
                  Session.set('selectedtariff', null);
                  Session.set('applynowclicked', false);
                  Router.go('productList');

    }, 
/*
    //called when any operation fails, where operation will be
    //"validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {},
    formToDoc: function(doc) {},
    docToForm: function(doc) {}
    */
  }
});


Template.formAddress.events({
 
  'keyup .postcodeinfluencer': function(e) {
      // check we  have enough data try a postcode lookup
      value = $(e.target).val().toUpperCase();      
      $(e.target).val(value);
      Session.set($(e.target).attr('name'), value);      
  }
});

Deps.autorun(function(computation) {
    //curflat_name = Session.get('curflat_name');
    //curhouse_name = Session.get('curhouse_name');
    //curhouse_no = Session.get('curhouse_no');
    curpostcode = Session.get('curpostcode');
    if (curpostcode) curpostcode = curpostcode.replace(' ','');
  
    postcodeRegex = /^([g][i][r][0][a][a])$|^((([a-pr-uwyz]{1}([0]|[1-9]\d?))|([a-pr-uwyz]{1}[a-hk-y]{1}([0]|[1-9]\d?))|([a-pr-uwyz]{1}[1-9][a-hjkps-uw]{1})|([a-pr-uwyz]{1}[a-hk-y]{1}[1-9][a-z]{1}))(\d[abd-hjlnp-uw-z]{2})?)$/i;
    //if ((curflat_name || curhouse_name || curhouse_no) && postcodeRegex.test(curpostcode)) {
    if (postcodeRegex.test(curpostcode)) {
      // should be okay to lookup postcode
      
      enteredaddressdetails = { 
                                     postcode: curpostcode,
                                     house_no: '99999',//curhouse_no,
                                     //house_name: curhouse_name,
                                     //flat_name: curflat_name
                              };
      
      console.log('Looking up: '); console.log(enteredaddressdetails);
      
      Meteor.call('lookupAddress', enteredaddressdetails);
      
      
    } // if
  } // function
); // Deps
  
  //https://www.mybroadbandshop.co.uk/secure/sprint_via_ajax.php?postcode='+postcode+'&house_no='+house_no+'&house_name='+house_name+'&flat_name='+flat_name};


