Template.addressSelect.helpers({
  addresses: function() {
      console.log('Template.addressSelect.helpers.addresses');      
      return Addresses.find({});
    }, // addresses
  
  postcodeLookupInProgress: function() {
    return ServerInfo.findOne({field: 'postcodeLookupInProgress', clientID: Session.get('uniqueClientID')});
  } // postocdeLookupInProgress
}); // helpers



Template.addressSelect.events({
  'change #addressSelect': function(e) {
    if ($(e.target).val()=='none') {
      // no address slected, clear the other fields
      // and trigger to force re-validation
      $('input[name="curflat_name"]').val('').trigger('change');
      $('input[name="curhouse_name"]').val('').trigger('change');
      $('input[name="curhouse_no"]').val('').trigger('change');
      $('input[name="curstreet_name"]').val('').trigger('change');
      $('input[name="curcounty"]').val('').trigger('change');
      $('input[name="curtown"]').val('').trigger('change');
      $('input[name="curcity"]').val('').trigger('change');
      
      // clear any validation errors
      this.resetForm('applicationForm'); // doesn't work - see http://stackoverflow.com/questions/23513520/force-meteor-autoform-to-revalidate-when-input-value-is-changed-programmatically/23518791?noredirect=1#23518791
      
    
    }
  } // change #addressSelect
});


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
  
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      console.log('onSubmit');
    },

    //called when any operation succeeds, where operation will be
    //"insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log('onSuccesst');
                      Session.set('selectedproduct', null);
                  Session.set('selectedtariff', null);
                  Session.set('applynowclicked', false);
                  Router.go('productList');

    }, 

    //called when any operation fails, where operation will be
    //"validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      console.log('onError:'+operation);
      console.log('onError:'+error);
      console.log('onError:'+template);
    },
/*
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
  }, // keyup .postcodeinfluencer
  
  'change #addressSelect': function(e) {
    selectedAddressId = $(e.target).val();
    console.log('selectedAddressId = '+selectedAddressId);
    selectedAddress = Addresses.findOne(selectedAddressId);
    console.log(selectedAddress);
    // we populate the inputs, and trigger to force re-validation
    $('input[name="curflat_name"]').val(selectedAddress.flatNumber).trigger('change');
    $('input[name="curhouse_name"]').val(selectedAddress.houseName).trigger('change');
    $('input[name="curhouse_no"]').val(selectedAddress.houseNumber).trigger('change');
    $('input[name="curstreet_name"]').val(selectedAddress.streetName).trigger('change');
    $('input[name="curcounty"]').val(selectedAddress.county).trigger('change');
    $('input[name="curtown"]').val(selectedAddress.locality).trigger('change');
    $('input[name="curcity"]').val(selectedAddress.town).trigger('change');
    
    // clear any validation errors
    this.resetForm('applicationForm'); // doesn't work - see http://stackoverflow.com/questions/23513520/force-meteor-autoform-to-revalidate-when-input-value-is-changed-programmatically/23518791?noredirect=1#23518791

  }
});

Deps.autorun(function(computation) {
    //curflat_name = Session.get('curflat_name');
    //curhouse_name = Session.get('curhouse_name');
    //curhouse_no = Session.get('curhouse_no');
    curpostcode = Session.get('curpostcode');
    if (!curpostcode || curpostcode=='') return;
        
    curpostcode = curpostcode.replace(' ','');
  
    postcodeRegex = /^([A-PR-UWYZ][A-HK-Y0-9](?:[A-HJKS-UW0-9][ABEHMNPRV-Y0-9]?)?\s*[0-9][ABD-HJLNP-UW-Z]{2}|GIR\s*0AA)$/i;
    //if ((curflat_name || curhouse_name || curhouse_no) && postcodeRegex.test(curpostcode)) {
    if (postcodeRegex.test(curpostcode)) {
      // should be okay to lookup postcode
      
      enteredaddressdetails = { 
                                     postcode: curpostcode,
                                     house_no: '99999',//curhouse_no,
                                     //house_name: curhouse_name,
                                     //flat_name: curflat_name
                                     clientID: Session.get('uniqueClientID')
                              };
      
      console.log('Looking up: '); console.log(enteredaddressdetails);
      
      Meteor.call('lookupAddress', enteredaddressdetails);
      
      
    } // if
  } // function
); // Deps
  
  //https://www.mybroadbandshop.co.uk/secure/sprint_via_ajax.php?postcode='+postcode+'&house_no='+house_no+'&house_name='+house_name+'&flat_name='+flat_name};


