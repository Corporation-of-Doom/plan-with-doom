const { db } = require("../db");
const bcrypt = require("bcrypt");

async function signIn(emailToFind, password) {
  // check if email exists
  const res = await db.raw("SELECT * FROM doom_user WHERE email = ?", [
    emailToFind
  ]);
  if (!res.rows.length) throw new Error("No user with this email");

  // TODO: check if account registration email has been verified

  const {
    password_hash: hashedPassword,
    id,
    email,
    first_name,
    middle_name,
    last_name,
    organization,
    linked_in,
    twitter,
    facebook,
    instagram,
    phone_number,
    privacy_settings
  } = res.rows[0];

  // check if password is correct
  if (bcrypt.compareSync(password, hashedPassword)) {
    return {
      id,
      email,
      first_name,
      middle_name,
      last_name,
      organization,
      linked_in,
      twitter,
      facebook,
      instagram,
      phone_number,
      privacy_settings
    };
  }

  return new Error("Incorrect password");
}

module.exports = { signIn };
