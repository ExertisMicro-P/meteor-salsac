/*
Handlebars.registerHelper('session',function(input){
    return Session.get(input);
});
*/

UI.registerHelper('showingproductdetails', function(){
    return Session.get('showingproductdetails');
});


UI.registerHelper('scheme', function() { 
    return Session.get('scheme');
});




