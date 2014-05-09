// Server

Meteor.methods({
lookupAddress: function(enteredaddressdetails) {
      check(enteredaddressdetails, Object);
      console.log('enteredaddressdetails=');console.log(enteredaddressdetails);
  
  // are we already dealing with a lookup?
  if (!ServerInfo.findOne({ value: true, clientID: enteredaddressdetails.clientID })) {
      
  
      // start with a clean list for the SELECT  
      Addresses.truncate();
  
      ServerInfo.upsert(
            { field: "postcodeLookupInProgress" },
            { $set: { value: true, clientID: enteredaddressdetails.clientID } }
          );
  
  
      console.log('calling Meteor.http.call');
  
 
    
    /*
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
                                                        address.clientID = enteredaddressdetails.clientID;
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
                                     
                                     
                                           ServerInfo.upsert(
                                                    { field: "postcodeLookupInProgress", clientID: enteredaddressdetails.clientID },
                                                    { $set: { value: false, clientID: enteredaddressdetails.clientID  } }
                                                  );
                                     
                                           console.log(ServerInfo.findOne({ field: "postcodeLookupInProgress", clientID: enteredaddressdetails.clientID }));
                                                
                                             });  // Meteor.http.call
    
*/    
    
    // dev test value
    enteredaddressdetails.postcode='ID11QD';
    
    
    Meteor.http.call("GET", 
                     "https://api.ideal-postcodes.co.uk/v1/postcodes/"+enteredaddressdetails.postcode, 
                     {params: {api_key: 'ak_huvexxteLLXMu6oP69auE6h9Oq4m4'}
                                   }, function(error, result) { 
                           
                                                if (!error) {
                                                  console.log(result);
                                                  jsonresult = JSON.parse(result.content);
                                                  
                                                  if (jsonresult.code == '2000') {
                                                    addressesresult = jsonresult.result;
                                                    
                                                    console.log(addressesresult);
                                                    if (addressesresult.length) {                                                      
                                                      // adding addresses should make the SELECT appear on the applicationForm
                                                      for(a in addressesresult) {
                                                        address = remapAddressFields(addressesresult[a]);
                                                        address.clientID = enteredaddressdetails.clientID;
                                                        console.log(address);                                                     
                                                        Addresses.insert(address);
                                                      } // for
                                                    } // if
                                                  }  else {
                                                    // no match found
                                                    console.log(jsonresult.code);
                                                  } // no match
                                                } else {
                                                  console.log(error);
                                                }
                                     
                                     
                                           ServerInfo.upsert(
                                                    { field: "postcodeLookupInProgress", clientID: enteredaddressdetails.clientID },
                                                    { $set: { value: false, clientID: enteredaddressdetails.clientID  } }
                                                  );
                                     
                                           console.log(ServerInfo.findOne({ field: "postcodeLookupInProgress", clientID: enteredaddressdetails.clientID }));
                                                
                                             });  // Meteor.http.call
  
      } else {
        // already dealing with an address lookup for this client
        console.log('Busy! Skipped Meteor.http.call');
        return false;
      }
    } //lookupAddress
}); // methods


remapAddressFields = function (address) {
  newaddress = {
    town: address.post_town, 
    streetName: address.thoroughfare,
    houseNumber: address.building_number,
    houseName: address.building_name,
    flatNumbe: address.sub_building_name
  };
  
  return newaddress;
};  // remapAddressFields