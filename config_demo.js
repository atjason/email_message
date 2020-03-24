const config = {
  secretList: [
    'SECRET'
  ],
  email: {
    authList: [
      {
        host: "smtp.gmail.com",
        port: 465,
        user: "abc@gmail.com",
        pass: "123",
      },
    ],
    toEmail: "123@gmail.com"
  },
  port: 3300,
}

module.exports = config
