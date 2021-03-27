const nodemailer = require("nodemailer");
require('dotenv').config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:`${process.env.MAIL_ADDRESS}`,
    pass: `${process.env.MAIL_PASSWORD}`
  },
});
module.exports.verify = (url) => {
  const info = {
    from: "plschedule.website@gmail.com",
    to: "mostafa.magdy621@gmail.com",
    subject: "Thanks For Subscribe",
    text: "this is a text",
    html: ` <h3>thanks for your subscribe please verify your mail : </h3>
        <a href="http://localhost:3000/${url}">Link</a>`,
  };
  transport
    .sendMail(info)
    .then((res) => console.log(res))
    .catch((err) => console.log("err"));
};
