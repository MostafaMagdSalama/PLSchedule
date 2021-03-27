const user = require("../models/User");
const fetch = require("node-fetch");
const { notify } = require("../connections/mailhandle/notify");

// retrieve all users's mails from database
async function getAllUsers() {
  try {
    const res = await user.find({ verified: true });
    return res;
  } catch (err) {
    console.log(err);
  }
}

// fetch the fooball api and get matches data
async function getMatches() {
  var day1 = new Date();
  var day2 = new Date();
  day2.setDate(day2.getDate() + 1);
  // change date formate to be acceptable to api
  var d1 =
    day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
  var d2 =
    day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
  // fetching the footnall api
  const data = await fetch(
    `https://app.sportdataapi.com/api/v1/soccer/matches?apikey=10767040-7723-11eb-af4f-23fb659bb0b6&season_id=352&date_from=${d1}&date_to=${d2}`
  );
  const json = await data.json();
  if (!json.errors) {
    return json;
  } else {
    return null;
  }
}

// formate data to be easy to send mails
const run = async () => {
  const users = await getAllUsers();
  const matches = await getMatches();

  if (!matches) {
    return null;
  }
  const mails = users.map((e) => e.email);
  const filterMatches = matches.data.map((e) => {
    return {
      home_team: {
        name: e.home_team.name,
        logo: e.home_team.logo,
      },
      away_team: {
        name: e.away_team.name,
        logo: e.away_team.logo,
      },
      match_start: e.match_start,
    };
  });
  notify(mails, filterMatches);
};
// run this function every 24 hours
setInterval(run, 1000 * 60 * 60 * 24);
// run();
