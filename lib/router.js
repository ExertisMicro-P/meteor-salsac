Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('productList', {path: '/'});
  this.route('howItWorks', {path: '/howitworks', layoutTemplate: 'layoutInfo'});
  this.route('TandCs', {path: '/terms', layoutTemplate: 'layoutInfo'});
  this.route('faqs', {path: '/faqs', layoutTemplate: 'layoutInfo'});
  
   
  //this.route('productList', {path: '/'});
});