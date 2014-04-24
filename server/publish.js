Meteor.publish('products', function() {
  return Products.find({}); 
});

Meteor.publish('tariffs', function() {
  return Tariffs.find({}); 
});

