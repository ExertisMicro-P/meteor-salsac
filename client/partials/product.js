Template.product.helpers( {
  /*fromAmount: function() {
                minval = 99999.00;
                $.each(this.deductfromsalary, function(i,v) {
                  minval = Math.min(minval,v);
                });
                return minval.toFixed(2);
          }, // fromamount
          */
  
  networkLogos: function() {
    logos = [];
    
    $.each(this.tariffs, function(i,tariff) {
      tariffObj = Tariffs.findOne({name: tariff});
      if (typeof tariffObj != 'undefined' && logos.lastIndexOf(tariffObj.details.networklogo)==-1) {
        logos.push(tariffObj.details.networklogo);
      }
      
    });
    if (logos.length)
      return logos;
    else
      return '';
  } // networkLogos
}); // helpers


Template.product.events({
  'click .viewoffers': function(e) {
    e.preventDefault();
    
    product = Products.findOne($(e.target).data('product'));
    Session.set('selectedproduct', product);
    
    // Mark the product that's been clicked on
    $(e.target).parents( ".product" ).addClass('selected');
    
    
    $('#carousel').fadeOut('slow');
    // hide all the other products
    //$('.product:not(.selected)').addClass('animated rollOut');
    $('.product:not(.selected)').fadeOut('slow');
    $('.product.selected').addClass('col-md-12').removeClass('col-md-3');
    
    $('.product.selected .hideonproductdetails').addClass('hidden');
    $('.product.selected .productdetailitem').removeClass('hidden');
    $('html,body').animate({scrollTop:0},0);
        
  }, // click .viewoffers
  
  'click .viewallproducts': function(e) {
    e.preventDefault();
    $('.product.selected').addClass('col-md-3').removeClass('col-md-12');
    $('#carousel').fadeIn('slow');
    //$('.product:not(.selected)').removeClass('animated rollOut').addClass('animated rollIn');
    $('.product:not(.selected)').fadeIn('slow');
    
    $('.product.selected .hideonproductdetails').removeClass('hidden');
    $('.product.selected .productdetailitem').addClass('hidden');
    
    Session.set('selectedproduct', null);
    $('.product.selected').removeClass('selected');
    
  } // click .viewallproducts
  
}); // events