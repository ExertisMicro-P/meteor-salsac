RouterSupport = {
productListOnBeforeAction: function(routeObj) {
            // hit Scheme Manager with 'e' querystring param
            // to see if we can log in
            if (routeObj.params && routeObj.params.e) {
              console.log('e='+routeObj.params.e);
              token = routeObj.params.e;
              // if no token passed, we'll stay logged in if we were before, or logged out otherwise
              if (typeof token !== 'undefined') {
                Session.set('currentscheme', null);
                
                // hit the Server and try to authenticate.
                // It should return a scheme
                Meteor.call('authenticateScheme', token, function(error, scheme) {
                  CurrentScheme.truncate();
                  if (!scheme) {
                    console.log('Can\'t authenticate '+token);
                   // we don't have a scheme                  
                    Alerts.add('Sorry, you don\'t appear to have access to this site'); 
                    Alerts.add('If you have arrived from another site, please go back and try again', 'info'); 
                  } else {
                    // We have matched a known scheme
                    scheme.scheme_id = parseInt(scheme.scheme_id);
                    console.log('Router: scheme=');console.log(scheme);                  
                    CurrentScheme.insert(scheme); 
                    Session.set('currentscheme', scheme);

                    // Grab all the scheme's products we need to build to site
                    Meteor.call('getProducts', scheme.scheme_id, function(error,data) {
                      if (error) {
                        console.log(error);
                      } else {                          
                       // Get Products and create 
                       console.log(data);                       
                       _.each(data, function(product){
                             product.scheme_id = scheme.scheme_id;
                             product.pricefrom = parseFloat(_.min(product.deductfromsalary)).toFixed(2); 
                             console.log(product);
                             //Products.remove({scheme_id: scheme.scheme_id, handsetcode: product.handsetcode});
                             if (!Products.findOne({scheme_id: scheme.scheme_id, handsetcode: product.handsetcode})){                         
                                 Products.insert(product);
                              }

                         });
                      }
                    }); // Meteor.call

                    
                    // Grab all the scheme's products we need to build to site
                    Meteor.call('getTariffs', scheme.scheme_id, function(error,data) {
                      if (error) {
                        console.log(error);
                      } else {                          
                       // Get Tariffs and create 
                       console.log('Tariffs=');console.log(data);                       
                        
                       _.each(data, function(tariff, index){
                             tariff.scheme_id = scheme.scheme_id;
                             tariff.name = index;
                             console.log(tariff);
                             //Products.remove({scheme_id: scheme.scheme_id, handsetcode: product.handsetcode});
                             if (!Tariffs.findOne({scheme_id: scheme.scheme_id, name: index})){                         
                                 Tariffs.insert(tariff);
                              }

                         });
                      }
                    }); // Meteor.call

                    
                    // support string replacements like John Lewis want 'partners' instead of 'employees'
                    // see https://atmospherejs.com/package/just-i18n
                    //mapStringsForScheme(scheme);
                    i18n.setLanguage(scheme.schemename);
                    i18n.showMissing(true);
                    


                    // set background image if one is defined
                    backgroundURL = Content.findOne({scheme: scheme.scheme_id, contentFormat: 'imageURL', contentType: 'Background'});
                    if (backgroundURL) {
                      console.log('Setting background to '+backgroundURL.content);
                      $('body').css('background-image', 'url("'+backgroundURL.content+'")');
                    }

                    //Router.go('productList');
                  }
                });
              }// if
            } // params? 
          }, // productListOnBeforeAction
                                      
                                      
                                      
productDetailsOnBeforeAction: function(routeObj) {                                   
          if (CurrentScheme.find().count()) {
            //Addresses.truncate();
            $('html,body').animate({scrollTop:0},0);
            Session.set('curpostcode','');  
          } else {
            // no scheme set, so prevent direct links to the form
            Alerts.add('Sorry, you don\'t appear to have access to this site'); 
            Alerts.add('If you have arrived from another site, please go back and try again', 'info'); 
            Router.go('productList');
          }     
        } // productDetailsOnBeforeAction

}; // RouterSupport
                                    