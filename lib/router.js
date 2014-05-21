Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return [  Meteor.subscribe('placeholders')]; }
});


// User must be logged in to do admin functions
Router.onBeforeAction(
  function() {
    if (!Meteor.userId()) {
      // use http://beta.atmospherejs.com/package/bootstrap-alerts
      Alerts.add('Sorry, you need to login first', 'danger', {
                fadeIn: 1000, fadeOut: 1000, autoHide: 10000
            });
      this.redirect('productList');      
    } else {
      this.stop;
    }
}, {except: ['productList', 'faqs','howItWorks', 'TandCs', 'applicationForm', 'thanks', 'logout', 'productDetails']});



// Display loading indicator before loading each page
Router.onBeforeAction('loading');




// Set the <title> as each page is loaded
Router.onAfterAction(function() {
        document.title = 'Salary Sacrifice - '+this.route.name;
      }
);


/**
 * This map handles the landing page. 
 * It checks to see if we need to and can login to a scheme.
 * It sets the current scheme if we know it.
 * It displays the product range.
 */
Router.map(function() {
  this.route('productList', {path: '/',
         waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('placeholders')];},
         onBeforeAction: function() {RouterSupport.productListOnBeforeAction(this);},
         onAfterAction: function() {
           this.subscribe('products').wait();
         }
       }); // productList
  

   
  

 
  
  
  
  
  
  this.route('howItWorks', {path: '/howitworks', 
                            layoutTemplate: 'layoutInfo',
                            waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('placeholders')];}
                        });
  
  this.route('TandCs', {path: '/terms', 
                        layoutTemplate: 'layoutInfo',
                        waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('placeholders')];}
                      });

  this.route('faqs', {path: '/faqs', 
                      layoutTemplate: 'layoutInfo',
                      waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('placeholders')];}
                     });
  
  this.route('thanks', {path: '/thanks', layoutTemplate: 'layoutInfo'});
  
  //this.route('applicationForm', {path: '/form'});

  this.route('applicationForm', {
                          path: '/form',
                          onBeforeAction: function() {
                             
                            },
                         });

  
    
  
  
  this.route('productDetails', {
                path: '/product/:_id',
                waitOn: function() { return [Meteor.subscribe('products'), Meteor.subscribe('tariffs')];},
                data: function() { 
                                    console.log('productDetails:'+this.params._id); 
                                    product = Products.findOne(this.params._id); 
                                    console.log('product='); console.log(product);
                                    Session.set('currentProduct', product);
                                    return product;
                                  },
                onBeforeAction: function() {RouterSupport.productDetailsOnBeforeAction(this);},
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

  
  
  
    /**
     * ****************************
     * ADMIN ROUTES
     * ****************************
     */
  
  
    this.route('adminHome', {path: '/admin', 
                             layoutTemplate: 'layoutAdmin',
                             waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('placeholders')];}
                            });
                             
    this.route('createContent', {path: '/createcontent', 
                                 layoutTemplate: 'layoutAdmin',
                                 waitOn: function() { return Meteor.subscribe('availableschemes');}
                                });
  
  this.route('updateContent', {path: '/updatecontent/:_id', 
                                 layoutTemplate: 'layoutAdmin',
                                 waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('availableschemes')];},
                                  data: function() {
                                    return Content.findOne(this.params._id);
                                                  }
                                });
  

    this.route('updateContentInPlace', {path: '/updatecontentinplace/:contentType', 
                                 layoutTemplate: 'layoutAdmin',
                                        template: 'updateContent',
                                 waitOn: function() { return [Meteor.subscribe('content'), Meteor.subscribe('availableschemes')];},
                                  data: function() {
                                        scheme = CurrentScheme.findOne({});
                                        if (scheme) {
                                          contentObj = Content.findOne({scheme: scheme.scheme_id, contentType: this.params.contentType});

                                          return contentObj;
                                        } // if
                                  } // function
                                });


  
  
  
      this.route('createPlaceholder', {path: '/createplaceholder', 
                                 layoutTemplate: 'layoutAdmin',
                                 waitOn: function() { return Meteor.subscribe('availableschemes');}
                                });
  
  this.route('updatePlaceholder', {path: '/updateplaceholder/:_id', 
                                 layoutTemplate: 'layoutAdmin',
                                 waitOn: function() { return [Meteor.subscribe('placeholders'), Meteor.subscribe('availableschemes')];},
                                  data: function() {
                                    return Placeholders.findOne(this.params._id);
                                                  }
                                });

  
  

});
