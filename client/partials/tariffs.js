Template.tariff.helpers({
  networklogo: function(tariff) {
              tariffObj = Tariffs.findOne({name: tariff});
              if (typeof tariffObj != 'undefined')
                return tariffObj.details.networklogo;
              else
                return '';
            }, // networklogo
  
  getDetailField: function(tariff,field) {
              tariffObj = Tariffs.findOne({name: tariff});
              if (typeof tariffObj != 'undefined')
                return tariffObj.details[field];
              else
                return '';
            }, // getDetailField
  
  getProductTariffMonthlyDeduction: function() {
              product = Session.get('selectedproduct');
              if (product)
                return product.deductfromsalary[this];
              else 
                return '';
            }, // getProductTariffMonthlyDeduction

  
    getProductTariffMonthlySaving: function() {
              product = Session.get('selectedproduct');
              if (typeof product != 'undefined' && product != null) {
                saving = product.deductfromsalary[this] * Session.get('taxmultiplier');
                return saving.toFixed(2);
  
            }  else 
                return '';
            }, // getProductTariffMonthlySaving

    getProductTariffMonthlyYouPay: function() {
              product = Session.get('selectedproduct');
              if (typeof product != 'undefined' && product != null) {
                saving = product.deductfromsalary[this] * Session.get('taxmultiplier');
                youpay = product.deductfromsalary[this] - saving;
                return youpay.toFixed(2);
              } else 
                return '';
            }, // getProductTariffMonthlyYouPay
  
  applynowclicked: function() {
      return Session.get('applynowclicked');
  } // applynowclicked

});  // helpers




Template.tariff.events({
  'click .applynow': function(e) {
    e.preventDefault();
    $('.hideonapplynow').fadeOut('slow');
    Session.set('applynowclicked',true);
    
    tariff = Tariffs.findOne({name: $(e.target).data('tariff')});
    Session.set('selectedtariff', tariff);
    
    // Mark the tariff that's been clicked on
    $(e.target).parents( ".tariff" ).addClass('selected');
    
    $('.tariff:not(.selected)').fadeOut('slow');
    $('.cancelapplynow').fadeIn('slow');
    
    $('#beforeorderpanel').fadeIn('slow');
    
    $('html,body').animate({scrollTop:0},0);

  }, // click .applynow
  
  
  'click .cancelapplynow': function(e) {
    e.preventDefault();
    Session.set('applynowclicked', false);
    
    $('.hideonapplynow').fadeIn('slow');
    
    Session.set('selectedtariff', null);
    
    // Mark the tariff that's been clicked on
    $(e.target).parents( ".tariff" ).removeClass('selected');
    
    $('.tariff:not(.selected)').fadeIn('slow');
    $('.cancelapplynow').fadeOut('slow');
    
    $('#beforeorderpanel').fadeOut('slow');
    $('html,body').animate({scrollTop:0},0);
    
  } // click .cancelapplynow
}); // events

