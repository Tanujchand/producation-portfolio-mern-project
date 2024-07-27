// controllers/portfolioController.js
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

// Configure the transport using SendGrid
const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID, // Ensure this environment variable is set
    },
  })
);

// Controller to handle sending emails
const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validate input fields
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Send email
    await transport.sendMail({
      to: "tanujchand786@gmail.com",
      from: "tanujchand786@gmail.com",
      subject: "Regarding MERN Portfolio App",
      html: `
        <h5>Details Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    });

    // Return success response
    return res.status(200).send({
      success: true,
      message: "Your message was sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error); // Log error to the console
    // Return error response
    return res.status(500).send({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
};

module.exports = { sendEmailController };
