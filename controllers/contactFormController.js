const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    // service : 'gmail',
    // host: 'smtp.gmail.com',
    auth: {
      user: "shyamanthawijesiri33@gmail.com", // generated ethereal user
      pass: "newambition@$NET96", // generated ethereal password
    },
  });

const sendMsg = async (req,res) =>{
    const msgBody = {
        from: "shyamanthawijesiri33@gmail.com",
        to: "shyamanthawijesiri33@gmail.com",
        subject : req.body.subject,
        text: req.body.text
    };
    console.log(msgBody)
    const result = await transporter.sendMail(msgBody);
    console.log(result);
    return res.status(200).json(result);

}

module.exports = sendMsg;