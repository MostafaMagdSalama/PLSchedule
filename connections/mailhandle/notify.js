const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});
module.exports.notify = (users, matches) => {
  let html = "";
  matches.forEach((e) => {
    html += `         <tr>
<td class="match">
    
        <img src="${e.home_team.logo}" alt="" class="logo">
          <br>
   
    
    <label for="" class="name">${e.home_team.name}</label>
</td>

<td class="match">
    <img src="${e.away_team.logo}" alt="" class="logo">
    <br>
    <label for="" class="name">${e.away_team.name}</label>
</td>

</tr>
<tr><td class="time" colspan="2">${e.match_start}</td></tr>`;
  });
  var website = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                margin: 0;
            }
    
            table {
                border-collapse: collapse;
                margin: auto;
    
            }
    
            .head {
                background-color: #350B39;
                color: white;
                text-align: center;
                border: 5px solid #350B39;
               
            }
    
            .head-logo {
                width:170px;
               height: 120px;
            }
    
            .test {
                background-color: white;
                color: #350B39;
                padding: 10px;
            }
            .match{
         
                text-align: center;
                padding: 10px;
                color: rgb(98, 98, 98);
              
               
            }
            
            .match  img{
                display: block;
                margin: auto;
                transform: scale(0.7);
            }
            .time{
                border-bottom: 5px solid #350B39;
                text-align: center;
                width: 100%;
                padding: 20px;
                color: rgb(98, 98, 98);
              
            }
          
          
          
        </style>
    </head>
    
    <body>
        <table>
            <tr class="head">
                <th class="h-logo-container"><img src="https://i.pinimg.com/originals/7a/27/0a/7a270a97fa2a0a8dda82189a025d0825.png" alt=""
                        class="head-logo"></th>
                <th class="test">
                    <h2>Matches Today</h2>
                </th>
            </tr>
     ${html}
          
        </table>
    </body>
    
    </html>`;
  users.forEach((e) => {
    const info = {
      from: "plschedule.website@gmail.com",
      to: e,
      subject: "premier league",
      text: "this is a text",
      html: website,
    };
    transport
      .sendMail(info)
      .then((res) => console.log(res))
      .catch((err) => console.log("err"));
  });
};
