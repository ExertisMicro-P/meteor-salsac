Meteor.methods({
  removeContent: function(id) {
    console.log('removeContent: '+id);
      check(id, String);
      Content.remove(id);
  }, // removeContent
  
  removePlaceholder: function(id) {
    console.log('removePlaceholder: '+id);
      check(id, String);
      Placeholders.remove(id);
  } // removePlaceholder

});