Template.productList.helpers({
  products: function() {
              return Products.find({});
            }
});

Template.productList.rendered = function() {
  
  //if ($('#productlist .product').length==0)
    //return;
  Meteor.defer(function () {
  var $container = $('#productlist');
  // init
  $container.isotope({
    // options
    itemSelector: '.product',
    layoutMode: 'fitRows',
    getSortData: {
      'price': '[data-price]',
      'label': '[data-label]'
    }
  });
  
  // sort items on button click
  $('#sortbuttons div button').on( 'click', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
  });
  }); // defer function

}; // rendered
 
