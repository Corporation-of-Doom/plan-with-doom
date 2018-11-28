const fs = require("fs");
const { google } = require("googleapis");
const { db } = require("./db");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

async function getAuthUrl(userID) {
  const gcal_token = await getUserToken(userID);

  if (gcal_token)
    throw new Error(`User with ID ${userID} already has an access token.`);

  const oAuth2Client = getAuthClient();
  const authUrl = oAuth2Client.generateAuthUrl({
    // access_type: "offline",
    scope: SCOPES
  });

  console.log(authUrl);

  return authUrl;
}

async function setAccessToken(userID, code) {
  const oAuth2Client = getAuthClient();

  const token = await getUserToken(userID);

  if (token)
    throw new Error(
      "User has a token; they have already authorized the application to sync with their Google calendar"
    );

  oAuth2Client.getToken(code, async (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oAuth2Client.setCredentials(token);

    // Store the token to DB for later program executions
    const queryString = `UPDATE doom_user set gcal_token = ? where id = ?;`;
    await db.raw(queryString, [JSON.stringify(token), userID]);

    // listEvents(oAuth2Client);
  });
}

async function listEvents(userID) {
  const oAuth2Client = getAuthClient();
  const token = await getUserToken(userID);

  console.log("oAuth2Client", oAuth2Client);
  console.log("token", token);

  if (!token)
    throw new Error(
      "User doesn't have a token; they have not authorized the application to sync with their Google calendar"
    );

  oAuth2Client.setCredentials(token);

  const calendar = google.calendar({ version: "v3", oAuth2Client });
  console.log("LIST...");
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime"
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

// ********************************** HELPER FUNCTIONS ********************************** //

function validateToken(token) {
  if (!token) return true;
  const keys = Object.keys(token);
  const expectedKeys = [
    "access_token",
    "refresh_token",
    "scope",
    "token_type",
    "expiry_date"
  ];

  for (let i = 0; i < keys.length; i++) {
    if (!expectedKeys.includes(keys[i])) return false;
  }
  return true;
}

function getAuthClient() {
  const f = __dirname + "/credentials.json";
  const credentials = JSON.parse(fs.readFileSync(f));

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  return oAuth2Client;
}

async function getUserToken(userID) {
  // check if user already has an access token
  // // if they do, don't generate link and throw error
  const res = await db.raw(`Select gcal_token from doom_user where id = ?;`, [
    userID
  ]);
  const gcal_token = res.rows[0].gcal_token;
  return gcal_token;
}

module.exports = { getAuthUrl, setAccessToken, listEvents };
