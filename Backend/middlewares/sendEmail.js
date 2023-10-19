import nodemailer from "nodemailer";
export const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "90148468b7433c",
    //   pass: "8cc1e6588a58f3",
    // },

    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailOptons = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailOptons);
};
