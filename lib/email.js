
const config = require('../config')
const nodemailer = require('nodemailer')

const transporterList = config.email.authList.map(auth => {
  return nodemailer.createTransport({
    host: auth.host,
    port: auth.port,
    secure: true, // SSL
    auth: {
      user: auth.user,
      pass: auth.pass
    },
    debug: false,
    logger: false,
  })
})

function getRandomTransporter() {
  const index = Math.floor(Math.random() * transporterList.length)
  return transporterList[index]
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function sendEmail (options) {

  // options: { subject, html, to }
  // options.from = config.email.from || config.email.user
  if (!options.to) options.to = config.email.toEmail

  for (let i = 0; i < 3; i++) {
    try {
      const transporter = getRandomTransporter()
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