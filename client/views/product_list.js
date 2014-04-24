Template.productList.helpers({
  products: function() {
              switch(Session.get('productsorting')) {
                case 'label':
                  sortrule = {label:1};
                  break;
                case 'pricefrom':
                  sortrule = {pricefrom:1};
                  break;
              } // switch
    return Products.find({}, {sort: sortrule });
            }
});

Template.productList.rendered = function() {
    
  // sort items on button click
  $('#sortbuttons div button').on( 'click', 
    function() {
      var sortByValue = $(this).attr('data-sort-by');
      Session.set('productsorting',sortByValue);
    });
 
}; // rendered

 