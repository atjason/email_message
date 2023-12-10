const email = require('./email')
const config = require('../config')

function stringValue(value) {
  if (typeof value === 'string' || value instanceof String) {
    return value
  }
}

async function sendMail(ctx) {
  const query = ctx.request.query
  const param = ctx.request.body

  const secret = query.s || query.secret || param.secret || param.secret
  if (!config.secretList.includes(secret)) {
    // Should return 401 (Bad request), return 404 for safe.
    throw { status: 404, error: 'Not found.' }
  }

  const title = query.t || query.title || param.t || param.title || ''
  let content = query.c || query.content || param.c || param.content || stringValue(param) || ''
  if (!title && !content) {
    throw { status: 400, error: 'Param missed.' }
  }

  if (!content) {
    const _param = JSON.parse(JSON.stringify(param))
    delete _param.title
    delete _param.email
    delete _param.secret

    content = JSON.stringify(_param, null, 2)
    content = `<div style="white-space: pre-wrap;">${content}</div>`
  }

  const toMailStr = query.to || param.to || config.email.toEmail
  const toMailList = toMailStr.split(',')

  try {
    for (let toMail of toMailList) {
      const options = {
        subject: title,
        html: content,
        to: toMail,
      }
    
      // TODO Be careful. It's related with privacy.
      console.log(new Date().toJSON(), JSON.stringify(options))

      ctx.body = await email.sendEmail(options)
    }

  } catch(e) {
    const error = e.message || JSON.stringify(e)
    throw { status: 500, error }
  }
}

module.exports = {
  sendMail,
}