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


function doStuffWhenWindowsScrolls() {
    //var selectEl = template.find(".product"); // Arbitrary element in template
    //var targetEl = event.target;                 // Element that triggered the event
    windowscrolledby = $(window).scrollTop();
    $('.productteaser').each( function(i) {         // Element that is handling this event function (the element referenced by "click a")
          if (windowscrolledby > (this.offsetTop + $('#menu').height()))
            $(this).addClass('fadeOut');
          else 
            $(this).removeClass('fadeOut');
    });
  }


$(window).scroll(doStuffWhenWindowsScrolls);
 