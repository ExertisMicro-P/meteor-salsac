Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('products'); }
});

Router.map(function() {
  this.route('productList', {path: '/'});
  this.route('howItWorks', {path: '/howitworks', layoutTemplate: 'layoutInfo'});
  this.route('TandCs', {path: '/terms', layoutTemplate: 'layoutInfo'});
  this.route('faqs', {path: '/faqs', layoutTemplate: 'layoutInfo'});
  
  //this.route('applicationForm', {path: '/form'});

  this.route('applicationForm', {path: '/applicationForm/:step'});
  
  this.route('productDetails', {
    path: '/product/:_id',
    data: function() { return Products.findOne(this.params._id); },
    onBeforeAction: function() {
        Session.set('selectedproduct', Products.findOne(this.params._id));
      },
    onAfterAction: function() {
          $('html,body').animate({scrollTop:0},0);
      }
  });
   
  //this.route('productList', {path: '/'});
});

Router.onBeforeAction('loading');