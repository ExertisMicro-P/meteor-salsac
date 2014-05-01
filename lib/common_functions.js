// from http://michaelcamden.me/?p=159
Meteor.Collection.prototype.truncate = function() {
  return this.find().forEach((function(_this) {
    return function(item) {
      return _this.remove(item._id);
    };
  })(this));
};