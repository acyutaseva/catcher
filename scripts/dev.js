const nodemon = require('nodemon')
const sendEmails = require('../scripts/send.js')

nodemon({
  script: './bin/maildev',
  verbose: true,
  watch: [
    'index.js',
    'lib/*'
  ],
  args: [
    '--verbose'
  ]
}).on('start', function () {
  setTimeout(sendEmails, 1000)
})
