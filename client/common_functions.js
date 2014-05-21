Deps.autorun(function () {
  product = Session.get('selectedproduct');
  tariff = Session.get('selectedtariff');
  if (typeof product != 'undefined' && typeof tariff != 'undefined' && product != null && tariff != null) {
      monthlydeduction = parseFloat(product.deductfromsalary[tariff.name]);
      saving = monthlydeduction * Session.get('taxmultiplier');
      totalcost = monthlydeduction * Session.get('term');
    
      Session.set('monthlydeduction', monthlydeduction.toFixed(2));
      Session.set('saving', saving.toFixed(2));
      Session.set('totalcost', totalcost.toFixed(2));
  }  else {
      Session.set('monthlydeduction', '');
      Session.set('saving', '');
      Session.set('totalcost', '');
  }
});




Deps.autorun(function () {

// mapStringsForScheme = function(scheme) {
    scheme = Session.get('currentscheme');
  if (scheme) {
    schemesPlaceholders = Placeholders.find({scheme: scheme.scheme_id});
    translations = {};
    schemesPlaceholders.forEach(function (placeholder) {
              console.log(placeholder.placeholderName + ": " + placeholder.value);
              translations[placeholder.placeholderName] = placeholder.value;
            });
    console.log(scheme);
    console.log(translations);
    i18n.map(scheme.schemename, translations);
    Session.set('translations', translations);
  }
});






