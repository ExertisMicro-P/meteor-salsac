// Application forms submitted
// The master for these will be Formtools2, not here
SubmittedForms = new Meteor.Collection('submittedforms'
, {
    schema: {
       title: {
        type: String,
        label: 'Title',
        allowedValues: [  "Mr",
                          "Mrs",
                          "Miss",
                          "Ms",
                          "Dr",
                          "Lady",
                          "Lord",
                          "Professor",
                          "Rev",
                          "Sir",
                          "Sister"
                           ]
        
        
        },

      fname: {
            type: String,
            label: "First name",
            max: 20
          },
      sname: {
            type: String,
            label: "Last name",
            max: 20
          },
      
      empno:{
            type: String,
            label: "Employee Number"
            },
      deliverto: {
            type: String,
            label: "Deliver To"
            },
      phone: {
            type: String,
            label: "Phone"
            },
      email: {
            type: String,
            label: "Email"
            },
      curflat_name: {
            type: String,
            label: "Flat Name",
            optional: true
            },
      curhouse_name: {
            type: String,
            label: "House Name",
            optional: true
            },
      curhouse_no: {
            type: String,
            label: "House Number",
            optional: true
            },
      curstreet_name: {
            type: String,
            label: "Street"
            },
      curcounty: {
            type: String,
            label: "County",
            optional: true
            },
      curtown: {
            type: String,
            label: "Town",
            optional: true
            },
      curcity: {
            type: String,
            label: "City"
            },
      curpostcode: {
            type: String,
            label: "Postcode"
            },
      
      oldnumber: {
            type: String,
            label: "Old Mobile Number",
            optional: true
            },
      
      renewal:{
            type: Boolean,
            label: "Are you renewing after a previous Salary Sacrifice Scheme with us?",
            defaultValue: false
            },
      consent:{
            type: Boolean,
            label: "I agree",
            defaultValue: false,
            allowedValues: [true]
            },
      understandinsurance: {
            type: Boolean,
            label: "I understand",
            defaultValue: false,
            allowedValues: [true]
            },
      overspendadvice: {
            type: Boolean,
            label: "I agree",
            defaultValue: false,
            allowedValues: [true]
            },
      consenttandc: {
            type: Boolean,
            label: ' ',
            defaultValue: false,
            allowedValues: [true]
            },
      optout: {
            type: Boolean,
            label: "Marketing Opt-Out",
            defaultValue: true
            },
      esig: {
            type: String,
            label: "E-signature"
            },
      
      dob: {
            type: Date,
            label: "Date of Birth"
          }
    } // schema
}
      );
