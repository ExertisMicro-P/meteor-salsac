Accounts.config({
  // prevent users from registering new accounts themselves
  forbidClientAccountCreation : false
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});