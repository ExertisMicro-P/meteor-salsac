Meteor.publish('products', function() {
  return Products.find({}); 
});

Meteor.publish('tariffs', function() {
  return Tariffs.find({}); 
});

Meteor.publish('submittedforms', function() {
  return SubmittedForms.find({}); 
});

