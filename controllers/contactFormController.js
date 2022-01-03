const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    // service : 'gmail',
    // host: 'smtp.gmail.com',
    auth: {
      user: "email", // generated ethereal user
      pass: "*******", // generated ethereal password
    },
  });

const sendMsg = async (req,res) =>{
    const msgBody = {
        // from: "sendre",
        // to: "reciver",
        subject : req.body.subject,
        text: req.body.text
    };
    console.log(msgBody)
    const result = await transporter.sendMail(msgBody);
    console.log(result);
    return res.status(200).json(result);

}

module.exports = sendMsg;