Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('products'); }
});


/**
 * This map handles the landing page. 
 * It checks to see if we need to and can login to a scheme.
 * It sets the current scheme if we know it.
 * It displays the product range.
 */
Router.map(function() {
  this.route('productList', {path: '/',
        onBeforeAction: function() {
            // hit Scheme Manager with 'e' querystring param
            // to see if we can log in
            console.log('e='+this.params.e);
            token = this.params.e;
            // if no token passed, we'll stay logged in if we were before, or logged out otherwise
            if (typeof token !== 'undefined') {
              
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
                  console.log(scheme);                  
                  CurrentScheme.insert(scheme);  
                  Router.go('productList');
                }
              });
            }// if
          },
       }); // productList
  
  
  this.route('howItWorks', {path: '/howitworks', layoutTemplate: 'layoutInfo'});
  this.route('TandCs', {path: '/terms', layoutTemplate: 'layoutInfo'});
  this.route('faqs', {path: '/faqs', layoutTemplate: 'layoutInfo'});
  this.route('thanks', {path: '/thanks', layoutTemplate: 'layoutInfo'});
  
  //this.route('applicationForm', {path: '/form'});

  this.route('applicationForm', {
                          path: '/form',
                          onBeforeAction: function() {
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
                            },
                         });

  
    
  
  
  this.route('productDetails', {
    path: '/product/:_id',
    data: function() { return Products.findOne(this.params._id); },
    onBeforeAction: function() {
      
                             if (CurrentScheme.find().count()) {
                                //Addresses.truncate();
                                $('html,body').animate({scrollTop:0},0);
                                Session.set('selectedproduct', Products.findOne(this.params._id));
                              } else {
                                // no scheme set, so prevent direct links to the form
                                Alerts.add('Sorry, you don\'t appear to have access to this site'); 
                                Alerts.add('If you have arrived from another site, please go back and try again', 'info'); 
                                Router.go('productList');
                              }
        
      },
    onAfterAction: function() {
          $('html,body').animate({scrollTop:0},0);
      }
  }); // productDetails
   
  
  this.route('logout', {
      path: '/logout',
      onAfterAction: function() {
          CurrentScheme.truncate();         
        },
   }); // logout
});

Router.onBeforeAction('loading');