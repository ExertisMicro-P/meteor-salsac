Template.adminHome.helpers({
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
});


Template.adminHome.events({
  
  // Delete Content Button
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this Content?")) {
      var contentId = this._id;
      Content.remove(contentId);
      Router.go('adminHome');
    }
  }
});