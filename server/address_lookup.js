Meteor.methods({
lookupAddress: function(enteredaddressdetails) {
      check(enteredaddressdetails, Object);
      console.log('enteredaddressdetails=');console.log(enteredaddressdetails);
  
      // start with a clean list for the SELECT  
      Addresses.truncate();
  
      Meteor.http.call("GET", 
                                   "https://www.mybroadbandshop.co.uk/secure/sprint_via_ajax.php", 
                                   {params: enteredaddressdetails
                                   }, function(error, result) {                                                
                                                if (!error) {
                                                  console.log(result);
                                                  jsonresult = JSON.parse(result.content);
                                                  
                                                  if (jsonresult.result != 'no match') {
                                                    addressesresult = jsonresult.result;
                                                    
                                                    console.log(addressesresult);
                                                    if (addressesresult.length) {
                                                      
                                                      // adding addresses should make the SELECT appear on the applicationForm
                                                      for(a in addressesresult) {
                                                        address = addressesresult[a];
                                                        console.log(address);                                                     
                                                        Addresses.insert(address);
                                                      } // for
                                                    } // if
                                                  }  else {
                                                    // no match found
                                                    console.log(jsonresult.result);
                                                  } // no match
                                                } else {
                                                  console.log(error);
                                                }
                                                
                                             });
    } //lookupAddress
}); // methods