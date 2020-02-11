
async function start() {
  const api = require('./api')
  api.start()
}

start()

process.on('unhandledRejection', (e, p) => {
  console.error('Error: unhandledRejection:', e)
})
