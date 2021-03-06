/**
 * Markdown Editor dupport for Job Descriptions
 */
if (typeof Template.editor.created == 'undefined') {
  Template.editor.created = function() {
      this.editor = false;
  };
  
  Template.editor.rendered = function() {
      if (!this.editor) {
          var converter = {
              makeHtml: function(text) { return marked(text); }
          };
  
          var editor = new Markdown.Editor(converter);
          editor.run();
          this.editor = true;
      }
     
      $('#edit-btn').tooltip({placement: 'bottom'})
      $('#preview-btn').tooltip({placement: 'bottom'})
      $('table').addClass('table table-striped table-bordered table-hover');
  }
  
  
  
  Template.editor.events({
      'click a': function(e) {
          // always follow links
          e.stopPropagation();
      },
      'click #preview-btn': function(e, t) {
          e.preventDefault();
          var description = $('#innerEditor').text();
          $('#wmd-input').hide();
          $('#preview-btn').hide();
          $('#wmd-preview').show();
          $('#edit-btn').show();
          $('table').addClass('table table-striped table-bordered table-hover');
      },
      'click #edit-btn': function(e) {
          e.preventDefault();
          $('#wmd-preview').hide();
          $('#edit-btn').hide();
          $('#wmd-input').show();
          $('#preview-btn').show();
      },
  });
} else {
  console.log('Not rendering Markdown Editor!');
}