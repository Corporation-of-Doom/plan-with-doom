const { find, filter } = require("lodash");

const users = [
  {
    id: 0,
    email: "zero@email.com",
    firstName: "first0",
    lastName: "last0",
    middleName: "middle0",
    privacySetting: "public"
  },
  {
    id: 1,
    email: "first@email.com",
    firstName: "first1",
    lastName: "last1",
    middleName: "middle1",
    privacySetting: "public"
  },
  {
    id: 2,
    email: "second@email.com",
    firstName: "first2",
    lastName: "last2",
    middleName: "middle2",
    privacySetting: "public"
  },
  {
    id: 3,
    email: "third@email.com",
    firstName: "first3",
    lastName: "last3",
    middleName: "middle3",
    privacySetting: "public"
  },
  {
    id: 4,
    email: "fourth@email.com",
    firstName: "first4",
    lastName: "last4",
    middleName: "middle4",
    privacySetting: "public"
  },
  {
    id: 5,
    email: "fifth@email.com",
    firstName: "first5",
    lastName: "last5",
    middleName: "middle5",
    privacySetting: "public"
  }
];

const rootResolvers = {
  Query: {
    users: () => users
  },
  User: {
    id: ({ id }) => id,
    email: ({ email }) => email,
    firstName: ({ firstName }) => firstName,
    lastName: ({ lastName }) => lastName,
    middleName: ({ middleName }) => middleName,
    privacySetting: ({ privacySetting }) => privacySetting,
    organization: ({ organization }) => organization,
    linkedIn: ({ linkedIn }) => linkedIn,
    twitter: ({ twitter }) => twitter,
    facebook: ({ facebook }) => facebook,
    instagram: ({ instagram }) => instagram,
    phoneNumber: ({ phoneNumber }) => phoneNumber
  }
};

module.exports = { rootResolvers };
