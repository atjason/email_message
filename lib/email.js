
const config = require('../config')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: true, // SSL
  auth: {
    user: config.email.user,
    pass: config.email.pass
  },
  debug: false,
  logger: false,
})

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function sendEmail (options) {

  // options: { subject, html, to }
  // options.from = config.email.from || config.email.user
  if (!options.to) options.to = config.email.toEmail

  for (let i = 0; i < 3; i++) {
    try {
      await transporter.sendMail(options)
      console.log('Mail sent: ' + options.subject)
      return { done: true }
    } catch (e) {
      console.error('Error: Failed to send email:', e.message)
      await sleep(5000)
    }
  }

  return { error: 'Mail not send.' }
}

module.exports = {
  sendEmail,
}