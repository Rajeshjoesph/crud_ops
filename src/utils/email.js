const nodemailer = require("nodemailer");
 
const passwordSent = async(email,password,userName) =>{
    try {
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.FROM_EMAIL,
                pass:process.env.PASS_kEY,
            },
        });

        const mailOptions = {
            from: process.env.FROM_MAIL,
            to: email,
            subject: "Welcome to our website",
            text: `Hello ${userName}, This is your password: ${password}`
        };
    
        await transporter.sendMail(mailOptions);
        console.log("Mail send Sucessfully");
    } catch (error) {
        console.log(`mail error:${error.message}`);
        
    }
}

module.exports={passwordSent};