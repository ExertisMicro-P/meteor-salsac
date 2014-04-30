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





// from http://michaelcamden.me/?p=159
Meteor.Collection.prototype.truncate = function() {
  return this.find().forEach((function(_this) {
    return function(item) {
      return _this.remove(item._id);
    };
  })(this));
};
