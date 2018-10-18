const User = `
type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    middleName: String
    organization: String
    linkedIn: String
    twitter: String
    facebook: String
    instagram: String
    phoneNumber: String
    privacySetting: String!

    # still need to add photo
    # Will deal with that when we have DB set up
  }
`;

module.exports = { User };
