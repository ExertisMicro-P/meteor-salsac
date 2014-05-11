Content = new Meteor.Collection('content'
, {
    schema: {
      scheme: {
          type: Number,
          label: 'Scheme ID'
        },
      contentFormat: {
          type: String,
          label: 'Content Format',
          allowedValues: ['markdown', 'imageURL', 'HTML', 'markdown_from_externalURL', 'HTML_from_externalURL', 'PDF_from_externalURL']
        },
      contentType: {
        type: String,
        label: 'Content Type',
        allowedValues: ['HowItWorks', 'TandCs', 'Charges', 'FAQs', 'Other']
      },
      content: {
          type: String,
          label: 'Content'
        }
    } // schema
  });
                                

