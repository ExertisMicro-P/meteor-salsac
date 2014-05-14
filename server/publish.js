Meteor.publish('products', function() {
  return Products.find({}); 
});

Meteor.publish('tariffs', function() {
  return Tariffs.find({}); 
});

Meteor.publish('submittedforms', function() {
  return SubmittedForms.find({}); 
});

Meteor.publish('addresses', function() {
  return Addresses.find({}); 
});


Meteor.publish('serverinfo', function() {
  return ServerInfo.find({}); 
});

Meteor.publish('content', function() {
  return Content.find({}); 
});

Meteor.publish('placeholders', function() {
  return Placeholders.find({}); 
});


Meteor.publish('availableschemes', function() {
  return SchemeCredentials.find({}, {fields: {token: false}});
});

