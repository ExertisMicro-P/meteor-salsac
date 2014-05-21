



Template.productTeaser.helpers( {
  
  networkLogos: function() {
    logos = [];
    
    $.each(this.tariffs, function(i,tariff) {
      tariffObj = Tariffs.findOne({name: tariff});
      if (typeof tariffObj != 'undefined' && logos.lastIndexOf(tariffObj.networklogo)==-1) {
        logos.push(tariffObj.networklogo);
      }
      
    });
    if (logos.length)
      return logos;
    else
      return '';
  }, // networkLogos
}); // helpers



Template.productDetails.helpers( {
  
  networkLogos: function() {
    if (this.tariffs) {
      logos = [];

      $.each(this.tariffs, function(i,tariff) {
        tariffObj = Tariffs.findOne({name: tariff});
        if (typeof tariffObj != 'undefined' && logos.lastIndexOf(tariffObj.networklogo)==-1) {
          logos.push(tariffObj.networklogo);
        }

      });
      if (logos.length)
        return logos;
      else
        return '';
    } else {
      return '';
    }
  } // networkLogos
}); // helpers



/*
Template.product.events({
  'click .viewoffers': function(e) {
    console.log('click .viewoffers');
    
    e.preventDefault();
    
    product = Products.findOne($(e.target).data('product'));
    Session.set('selectedproduct', product);
    Session.set('showingproductdetails', true)
    
    // Mark the product that's been clicked on
    $(e.target).parents( ".product" ).addClass('selected');
    $('#carousel').fadeOut('slow');
    // hide all the other products
    //$('.product:not(.selected)').addClass('animated rollOut');
    $('.product:not(.selected)').fadeOut('slow');
    $('.product.selected').addClass('col-md-12').removeClass('col-md-3');    
    $('html,body').animate({scrollTop:0},0);
        
  }, // click .viewoffers
 
  
  'click .viewallproducts': function(e) {
    e.preventDefault();
    
    $('.product.selected').addClass('col-md-3').removeClass('col-md-12');
    $('.product:not(.selected)').fadeIn('slow');
    $('#carousel').fadeIn('slow');
    Session.set('selectedproduct', null);
    Session.set('showingproductdetails', false)
    $('.product.selected').removeClass('selected');
    
  } // click .viewallproducts
  
}); // events
*/


