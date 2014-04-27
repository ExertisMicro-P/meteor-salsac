Applications = new Meteor.Collection('applications', {
    schema: {
      firstname: {
            type: String,
            label: "First name",
            max: 20
          },
      lastname: {
            type: String,
            label: "Last name",
            max: 20
          },
      dob: {
            type: Date,
            label: "Date of Birth",
            max: 20
          }
    } // schema
}
      );
