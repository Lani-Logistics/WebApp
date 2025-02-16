import { createClient } from "smtpexpress";
const smtpexpressClient = createClient({
    projectId: import.meta.env.VITE_SMTP_EXPRESS_PROJECT_ID,
    projectSecret: import.meta.env.VITE_SMTP_EXPRESS_PROJECT_SECRET,
  });

const sendEmail = async (email: string, subject: string, message: string, senderName: string) => {
    smtpexpressClient.sendApi.sendMail({
      subject,
      message: message,
      sender: {
        name: senderName ? senderName : "Lani Logistics",
        email: "lani-logistics-621304@projects.smtpexpress.com",
      },
      recipients: email,
    });
  }; 
  
  export default sendEmail;