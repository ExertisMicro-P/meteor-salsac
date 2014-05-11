UI.registerHelper("schemeAllowedValues", function() {

    schemes = SchemeCredentials.find({});
console.log(schemes);
  scheme_ids = [];
    schemes.forEach(function (scheme) {
         scheme_ids.push({label: scheme.schemename, value: scheme.scheme_id});
       });
    console.log(scheme_ids);
  /*return [{label: 'label A', value: 'value A'},
          {label: 'label V', value: 'value V'}];*/
  return scheme_ids;

 });

/**
 * gets content from the Content collection
 * used for FAQs, HowItWorks etc
 */
UI.registerHelper("getContent", function(contentType) {
  
    scheme = CurrentScheme.findOne({});
    if (scheme) {
      contentObj = Content.findOne({scheme: scheme.scheme_id, contentType: contentType});
      
      // prepare content based on it's type
      switch (contentObj.contentFormat) {
        case 'markdown':
          return marked(contentObj.content);
        default:
          return contentObj.content;
      } // switch
    } // if
  }  // getContent
  
);