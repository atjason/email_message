const axios = require("axios")
const config = require("../config")

class Brevo {

  async sendEmail(params) {
    const { sender, to, apiKey } = config.brevo
    const options = {
      url: 'https://api.brevo.com/v3/smtp/email',
      method: 'POST',
      headers: {
        'api-key': apiKey,
      },
      data: {
        subject: params.subject,
        htmlContent: params.html,
        sender,
        to,
      },
    }

    for (let i = 0; i < 3; i++) {
      try {
        const result = await axios(options)
        const json = result.data
        if (json.messageId) {
          console.log('Mail sent: ' + options.subject)
          return { done: true }
        } else {
          throw new Error(json.message)
        }
        
      } catch (e) {
        console.error('Error: Failed to send email:', e.message)
        await this.sleep(3000)
      }
    }
  
    return { error: 'Mail not send.' }
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

const brevo = new Brevo()
module.exports = brevo
