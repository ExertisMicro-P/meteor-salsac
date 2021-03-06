AutoForm.hooks({
  updatePlaceholder: {
   /* before: {
      insert: function(doc) {},
      update: function(docId, modifier) {},
      remove: function(docId) {},
      "methodName": function(doc) {}
    },*/
    /*
    after: {
      insert: function(error, result, template) {
                }
     /* update: function(error, result, template) {},
      remove: function(error, result, template) {},
      "methodName": function(error, result, template) {}
    } */
  
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      console.log('onSubmit');
    },

    //called when any operation succeeds, where operation will be
    //"insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log('onSuccess');
                  Router.go('adminHome');

    }, 

    //called when any operation fails, where operation will be
    //"validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      console.log('onError:'+operation);
      console.log('onError:'+error);
      console.log('onError:'+template);
    },
/*
formToDoc: function(doc) {},
    docToForm: function(doc) {}
    */
  }
});
