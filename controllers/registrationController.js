const User = require("../models/User");
const { verify } = require("../connections/mailhandle/mailHandler");

module.exports.add_post = async (req, res) => {
  const data = req.body;
  try {
    const check = await User.findOne({ email: data.email });
    console.log(check);
    console.log(data.email);
    if (check) {
      req.session.message = {
        type: "danger",
        message: "You Already Subscribed",
      };
    } else {
      req.session.message = {
        type: "success",
        message: "Thanks For Subscribe ,Please Verify Your Account",
      };

      const { email } = data;
      const user = new User({
        email,
        verified: false,
        verification_string: Math.random().toString(36).substring(3),
      });
      user
        .save()
        .then((resp) => {
            // send mail to verify user email
          verify(user.verification_string);
         
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err.message);
  }

  res.redirect("/");
};
module.exports.get_home = (req, res) => {
  res.render("home");
};
