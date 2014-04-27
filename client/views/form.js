Template.applicationForm.steps = function() {
  return [{
    id: 'stepOne',
    title: 'Step 1. About You.',
    template: 'applicationFormStepOne',
    formId: 'applicationForm-step-one-form'
  }, {
    id: 'stepTwo',
    title: 'Step 2. Your Address',
    template: 'applicationFormStepTwo',
    formId: 'applicationForm-step-two-form',
    onSubmit: function(data, mergedData) {
      Applications.create(mergedData, function(err) {
        if(!err) Router.go('/');
      });
    }
  }]
}


