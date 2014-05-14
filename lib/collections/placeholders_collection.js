Placeholders = new Meteor.Collection('placeholders'
, {
    schema: {
      scheme: {
          type: Number,
          label: 'Scheme ID'
        },
      placeholderName: {
          type: String,
          label: 'Placeholder Name',
          max: 20
        },
      value: {
        type: String,
        label: 'Value',
        max: 1024
      }
      
    } // schema
  });


if (Meteor.isServer) {
  // Setup unique compound index
  Placeholders._ensureIndex( { "scheme": 1, "placeholderName": 1 }, { unique: true }  )
}