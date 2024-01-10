import nodemailer from "nodemailer";
export async function sendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAILSENSER,
          pass:process.env.PASSWORDSENDER ,
        },
      });

      const info = await transporter.sendMail({
        from: `"a-shop" <${process.env.EMAILSENSER}>`, // sender address
        to,// list of receivers
        subject, // Subject line
        html, // html body
      });

   return info;

}


// async..await is not allowed in global scope, must use a wrapper
