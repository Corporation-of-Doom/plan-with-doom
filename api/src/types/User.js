const User = `
  type User {
    id: Int!
    email: String!
    first_name: String!
    last_name: String!
    middle_name: String
    organization: String
    linked_in: String
    twitter: String
    facebook: String
    instagram: String
    phone_number: String
    privacy_settings: String!
    about_me: String
    picture_path: String

    landing_page: String
    menu_orientation: menu_orientation!
    # My Stalkers
    followers: [User!]
    # Who I'm stalking
    following: [User!]
  }

  input UserInput {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    middle_name: String
    organization: String
    linked_in: String
    twitter: String
    facebook: String
    instagram: String
    phone_number: String
    privacy_settings: String!
    about_me: String
    picture_path: String
    
    landing_page: String
    menu_orientation: menu_orientation
    
    
  }
  
  input UserUpdateInput {
    email: String
    password: String
    first_name: String
    last_name: String
    middle_name: String
    organization: String
    linked_in: String
    twitter: String
    facebook: String
    instagram: String
    phone_number: String
    privacy_settings: String
    about_me: String
    
    # still need to add photo
    picture_path: String
    
    landing_page: String
    menu_orientation: menu_orientation
  }
  `;

module.exports = { User };
