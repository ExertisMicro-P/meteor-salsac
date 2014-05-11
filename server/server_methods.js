Meteor.methods({
  removeContent: function(id) {
    console.log('removeContent: '+id);
      check(id, String);
      Content.remove(id);
  } // removeContent
});