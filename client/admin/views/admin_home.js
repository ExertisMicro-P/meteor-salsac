Template.contentList.helpers({
  rendered: function() {
      // shorten length content
      $('.truncateme').trunk8({
            lines: 2
          });  
    }, // rendered
  
  content: function() {
    return Content.find({});
    }, // content
  
  
  settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: '_id', label: 'Content ID' },
                { key: 'scheme', label: 'Scheme' },
                { key: 'contentFormat', label: 'Format' },
                { key: 'contentType', label: 'Type' },
                { key: 'content', label: 'Content', tmpl: Template.content },
                { key: 'actions', label: 'Actions', tmpl: Template.contentActions }
            ],
            useFontAwesome: true
        };
    } // settings
  
  
 
}); // contentList.helpers




Template.placeholderList.helpers({
  rendered: function() {
      // shorten length content
      $('.truncateme').trunk8({
            lines: 2
          });  
    }, // rendered
  

  
  
  placeholders: function() {
    return Placeholders.find({});
    }, // placeholders
  
  
  settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: '_id', label: 'Content ID' },
                { key: 'scheme', label: 'Scheme' },
                { key: 'placeholderName', label: 'Placeholder Name' },
                { key: 'value', label: 'Value' },
                { key: 'actions', label: 'Actions', tmpl: Template.placeholderActions }
            ],
            useFontAwesome: true
        };
    } // settings
}); // placeholderList.helpers





Template.adminHome.events({
  
  // Delete Content Button
  'click .content.delete': function(e) {
    e.preventDefault();
    contentId = $(e.target).parent().attr('id');

    if (confirm("Delete this Content? "+contentId)) {
      console.log('Click Delete: '+contentId);
      Meteor.call('removeContent', contentId,
                  function(error, scheme) {
                    if(error) {
                      console.log(error);
                    }
                        }
                    );
      //Router.go('adminHome');
    } // if
  }, // click
  
  
    // Delete Content Button
  'click .placeholder.delete': function(e) {
    e.preventDefault();
    placeholderId = $(e.target).parent().attr('id');

    if (confirm("Delete this Placeholder? "+placeholderId)) {
      console.log('Click Delete: '+placeholderId);
      Meteor.call('removePlaceholder', placeholderId,
                  function(error, scheme) {
                    if(error) {
                      console.log(error);
                    }
                        }
                    );
      //Router.go('adminHome');
    } // if
  } // click

});