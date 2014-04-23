Deps.autorun(function () {
  product = Session.get('selectedproduct');
  tariff = Session.get('selectedtariff');
  if (typeof product != 'undefined' && typeof tariff != 'undefined' && product != null && tariff != null) {
      saving = product.deductfromsalary[tariff.name] * Session.get('taxmultiplier');
      Session.set('saving', saving.toFixed(2));
  }  else 
      Session.set('saving', '');
});