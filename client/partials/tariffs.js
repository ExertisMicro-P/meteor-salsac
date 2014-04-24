Template.tariffs.helpers({
  
  tariffswithproduct: function(productId) {
    Session.set('currentlyrenderingproduct', Products.findOne(productId));
    return Tariffs.find({});
  } // tariffs
}); // helpers
                         
                         
                         

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
  
  getProductTariffMonthlyDeduction: function(productId, tariff) {
              product = Products.findOne(productId);
              if (typeof product != 'undefined' && product != null)
                return product.deductfromsalary[tariff];
              else 
                return '';
            }, // getProductTariffMonthlyDeduction

  
    getProductTariffMonthlySaving: function(productId, tariff) {
              product = Products.findOne(productId);
              if (typeof product != 'undefined' && product != null) {
                saving = product.deductfromsalary[tariff] * Session.get('taxmultiplier');
                return saving.toFixed(2);
  
            }  else 
                return '';
            }, // getProductTariffMonthlySaving

    getProductTariffMonthlyYouPay: function(productId, tariff) {
              product = Products.findOne(productId);
              if (typeof product != 'undefined' && product != null) {
                saving = product.deductfromsalary[tariff] * Session.get('taxmultiplier');
                youpay = product.deductfromsalary[tariff] - saving;
                return youpay.toFixed(2);
              } else 
                return '';
            } // getProductTariffMonthlyYouPay

});  // helpers




Template.product.events({
  'click .applynow': function(e) {
    e.preventDefault();
    $('.hideonapplynow').hide('slow');
    
    tariff = Tariffs.findOne({name: $(e.target).data('tariff')});
    Session.set('selectedtariff', tariff);
    
    // Mark the tariff that's been clicked on
    $(e.target).parents( ".tariff" ).addClass('selected');
    
    $('.tariff:not(.selected)').hide('slow');
    $('.cancelapplynow').removeClass('hidden');
    
    $('#beforeorderpanel').removeClass('hidden');

  }, // click .applynow
  
  
  'click .cancelapplynow': function(e) {
    e.preventDefault();
    $('.hideonapplynow').show('slow');
    
    Session.set('selectedtariff', null);
    
    // Mark the tariff that's been clicked on
    $(e.target).parents( ".tariff" ).removeClass('selected');
    
    $('.tariff:not(.selected)').show('slow');
    $('.cancelapplynow').addClass('hidden');
    
    $('#beforeorderpanel').addClass('hidden');

  } // click .cancelapplynow
}); // events


Meteor.startup(function() {
  
});