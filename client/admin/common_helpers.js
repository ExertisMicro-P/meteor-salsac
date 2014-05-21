UI.registerHelper("schemeAllowedValues", function() {

//    schemes = SchemeCredentials.find({});
//    console.log(schemes);
  
       
  /*return [{label: 'label A', value: 'value A'},
          {label: 'label V', value: 'value V'}];*/
  return Session.get('schemesBrief');

 });

/**
 * gets content from the Content collection
 * used for FAQs, HowItWorks etc
 */
UI.registerHelper("getContent", function(contentType) {
  
    scheme = CurrentScheme.findOne({});
    if (scheme) {
      contentObj = Content.findOne({scheme: scheme.scheme_id, contentType: contentType});
      
      if (contentObj) {
        // prepare content based on it's type
        switch (contentObj.contentFormat) {
          case 'markdown':
            translations = Session.get('translations');         
            str = contentObj.content.replace(/{{\w+}}/g, function(all) {
              all = all.replace(/{{/g,'');
              all = all.replace(/}}/g,'');
              return translations[all] || '[['+all+']]';
            });
            
                return marked(str);
           
            break;
            
          default:
            return contentObj.content;
            
        } // switch
      } else {
        // no content available for this scheme or content type
        return '[Content is not yet available]';
      }
    } // if
  }  // getContent
  
);







