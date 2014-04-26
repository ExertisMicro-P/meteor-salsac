Handlebars.registerHelper('session',function(input){
    return Session.get(input);
});

Handlebars.registerHelper('showingproductdetails',function(){
    return Session.get('showingproductdetails');
});