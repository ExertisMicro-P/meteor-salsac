Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('products'); }
});

Router.map(function() {
  this.route('productList', {path: '/',
        onBeforeAction: function() {
            // hit Scheme Manager with e querystring param
            // to see if we can log in
            console.log('e='+this.params.e);
            token = this.params.e;
            // if no token passed, we'll stay logged in if we were before, or logged out otherwise
            if (typeof token !== 'undefined') {
              
              Meteor.call('authenticateScheme', token, function(error, scheme) {
                CurrentScheme.truncate();
                if (!scheme) {
                  console.log('Can\'t authenticate '+token);
                 // we don't have a scheme                  
                } else {
                  console.log(scheme);                  
                  CurrentScheme.insert(scheme);         
                }
              });
            } // if
          },
       }); // productList
  
  
  this.route('howItWorks', {path: '/howitworks', layoutTemplate: 'layoutInfo'});
  this.route('TandCs', {path: '/terms', layoutTemplate: 'layoutInfo'});
  this.route('faqs', {path: '/faqs', layoutTemplate: 'layoutInfo'});
  
  //this.route('applicationForm', {path: '/form'});

  this.route('applicationForm', {path: '/form'});

  
  this.route('productDetails', {
    path: '/product/:_id',
    data: function() { return Products.findOne(this.params._id); },
    onBeforeAction: function() {
        Session.set('selectedproduct', Products.findOne(this.params._id));
      },
    onAfterAction: function() {
          $('html,body').animate({scrollTop:0},0);
      }
  }); // productDetails
   
  
  this.route('logout', {
      path: '/logout',
      onAfterAction: function() {
          CurrentScheme.truncate();
          this.stop();
          this.go('productList');
        },
   }); // logout
});

Router.onBeforeAction('loading');