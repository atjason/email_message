const mail = require('./mail')
const config = require('../config')

async function sendMail(ctx) {
  const query = ctx.request.query
  const param = ctx.request.body

  const secret = query.s || query.secret || param.secret || param.secret
  if (secret !== config.secret) {
    throw { status: 404, message: 'Not found.'}
  }

  const title = query.t || query.title || param.t || param.title
  const content = query.c || query.content || param.c || param.content
  const toMail = query.to || param.to

  if (!title || !content) {
    throw { message: 'Param missed.' }
  }
  
  const options = {
    subject: title,
    html: content,
    to: toMail,
  }

  try {
    await mail.sendMail(options)
    ctx.body = { done: true }
  } catch(e) {
    throw e
  }
}

module.exports = {
  sendMail,
}