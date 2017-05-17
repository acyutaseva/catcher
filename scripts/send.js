
/**
 * MailDev - send.js -- send a few emails for testing
 *
 * Run this to send emails to port 1025 for testing MailDev during development
 *   node test/scripts/send.js
 */
const path = require('path')
const nodemailer = require('nodemailer')

// Create a transport with MailDev's default receiving port
var transporter = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true
})

const webpushes = {
  'simple': {
    title: 'Title',
    body: 'just a simple body'
  },
  'actions': {
    title: 'Hello!',
    body: 'There are actions here',
    actions: [{
      action: "yes",
      title: "yes",
      icon: "https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/png/512/thumbsup.png"
    },
    {
      action: "no",
      title: "no"
    }]
  },
  'image 400x240': {
    title: 'Hello!',
    body: 'Only image here',
    image: 'https://fakeimg.pl/400x240/'
  },
  'image 80x380': {
    title: 'Hello!',
    body: 'Only image here',
    image: 'https://fakeimg.pl/80x380/'
  },
  'image 380x80': {
    title: 'Hello!',
    body: 'Only image here',
    image: 'https://fakeimg.pl/380x80/'
  },
  'image 16x16': {
    title: 'Hello!',
    body: 'Only image here',
    image: 'https://fakeimg.pl/16x16/'
  },
  'image + actions': {
    title: 'Hello!',
    body: 'image + actions',
    image: 'https://fakeimg.pl/400x240/',
    actions: [{
      action: "yes",
      title: "yes",
      icon: "https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/png/512/thumbsup.png"
    },
    {
      action: "no",
      title: "no"
    }]
  },
  'icon': {
    title: 'Hello!',
    body: 'Only icon',
    icon: 'https://fakeimg.pl/100x100/'
  },
  'badge': {
    title: 'Hello!',
    body: 'Only badge',
    badge: 'https://fakeimg.pl/80x80/'
  },
  'icon + badge': {
    title: 'Hello!',
    body: 'icon + badge',
    icon: 'https://fakeimg.pl/100x100/',
    badge: 'https://fakeimg.pl/80x80/'
  },
  'all': {
    title: 'Hello!',
    body: 'all *!',
    image: 'https://fakeimg.pl/400x240/',
    actions: [{
      action: "yes",
      title: "yes",
      icon: "https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/png/512/thumbsup.png"
    },
    {
      action: "no",
      title: "no"
    }],
    icon: 'https://fakeimg.pl/100x100/',
    badge: 'https://fakeimg.pl/80x80/'
  }
};

const webpushesMessages = Object.keys(webpushes).map((wk) => ({
  from: 'notif.me',
  to: 'xxx@browser.io',
  subject: '[webpush] ' + wk,
  headers: {
    'X-type': 'webpush',
    'X-to': 'authtoken',
    'X-payload': JSON.stringify(webpushes[wk])
  },
  text: '-'
}));

const fbpages = {
  'text': {
    message: {
      text: 'Hello this is a simple text'
    }
  },
  'long text': {
    message: {
      text: 'Hello this is a long text, Hello this is a long text, Hello this is a long text, Hello this is a long text'
    }
  },
  'generic one element': {
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: '75010 - 2160€ - 75m² - 3p.',
            default_action:{
              type: 'web_url',
              url: 'http://www.google.com/?t=default_action'
            },
            image_url: 'https://fakeimg.pl/800x800/',
            subtitle: 'This is a subtitle',
            buttons:[{
              type: 'web_url',
              url: 'http://www.google.com/?t=button',
              title: 'See on Google'
            }, {
              type: 'postback',
              title: 'Add to favorite',
              payload: 'addFavorite_123'
            }]
          }]
        }
      }
    }
  },
  'generic 3 element': {
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: '75010 - 2160€ - 75m² - 3p.',
            default_action:{
              type: 'web_url',
              url: 'http://www.google.com/?t=default_action'
            },
            image_url: 'https://fakeimg.pl/800x800/',
            subtitle: 'This is a subtitle',
            buttons:[{
              type: 'web_url',
              url: 'http://www.google.com/?t=button',
              title: 'See on Google'
            }, {
              type: 'postback',
              title: 'Add to favorite',
              payload: 'addFavorite_123'
            }]
          },
          {
            title: 'second element',
            default_action:{
              type: 'web_url',
              url: 'http://www.google.com/?t=default_action'
            },
            image_url: 'https://fakeimg.pl/100x200/',
            subtitle: 'This is a subtitle',
            buttons:[{
              type: 'web_url',
              url: 'http://www.google.com/?t=button',
              title: 'See on Google'
            }, {
              type: 'postback',
              title: 'Add to favorite',
              payload: 'addFavorite_123'
            }]
          },
          {
            title: 'The last but not the least',
            default_action:{
              type: 'web_url',
              url: 'http://www.google.com/?t=default_action'
            },
            image_url: 'https://fakeimg.pl/200x100/',
            subtitle: 'This is a subtitle',
            buttons:[{
              type: 'web_url',
              url: 'http://www.google.com/?t=button',
              title: 'See on Google'
            }, {
              type: 'postback',
              title: 'Add to favorite',
              payload: 'addFavorite_123'
            }]
          }]
        }
      }
    }
  },
  'image (square)': {
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: 'https://fakeimg.pl/800x800/'
        }
      }
    }
  },
  'image (long)': {
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: 'https://fakeimg.pl/80x800/'
        }
      }
    }
  },
  'image (large)': {
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: 'https://fakeimg.pl/800x80/'
        }
      }
    }
  },
  'audio': {
    message: {
      attachment: {
        type: 'audio',
        payload: {
          url: 'http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3'
        }
      }
    }
  },
  'video': {
    message: {
      attachment: {
        type: 'video',
        payload: {
          url: 'http://techslides.com/demos/samples/sample.mp4'
        }
      }
    }
  },
  'buttons': {
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "This is test text",
          buttons:[{
            type: "web_url",
            url: "https://www.oculus.com/en-us/rift/",
            title: "Open Web URL"
          }, {
            type: "postback",
            title: "Trigger Postback",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }, {
            type: "phone_number",
            title: "Call Phone Number",
            payload: "+16505551234"
          }]
        }
      }
    }
  },
  'quick replies (1)': {
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          content_type: 'location'
        }
      ]
    }
  },
  'quick replies (long)': {
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          content_type:"text",
          title: 'Action',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION'
        },
        {
          content_type: 'text',
          title: 'This is a very very very very long text',
          image_url: 'https://fakeimg.pl/24x24/',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY'
        },
        {
          content_type: 'text',
          title: 'Comedy',
          image_url: 'https://fakeimg.pl/24x24/',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY7'
        }
      ]
    }
  }
};

const fbpagesMessages =  Object.keys(fbpages).map((fk) => ({
  from: 'notif.me',
  to: 'xxx@fb.io',
  subject: '[fbpage] ' + fk,
  headers: {
    'X-type': 'fbpage',
    'X-to': 'fbpsid',
    'X-app': JSON.stringify({ "endpoint": "fb.notif.me", "name": "Catcher", "letter": "C" }),
    'X-payload': JSON.stringify(fbpages[fk])
  },
  text: '-'
}));
// Messages list
var messages = [
  // Email w/ simple attachment and basic header
  {
    from: 'Angelo Pappas <angelo.pappas@fbi.gov>',
    to: 'Johnny Utah <johnny.utah@fbi.gov>',
    subject: 'The ex-presidents are surfers',
    headers: {
      'X-some-header': 1000
    },
    text: 'The wax at the bank was surfer wax!!!',
    html: '<!DOCTYPE html><html><head></head><body>' +
          '<p>The wax at the bank was surfer wax!!!</p>' +
          '</body></html>',
    attachments: [
      { fileName: 'notes.txt', content: 'Info on surf board wax', contentType: 'text/plain' }
    ]
  },

  {
    from: '-',
    to: '0670123456@fb.me',
    subject: 'SMS T',
    headers: {
      'X-type': 'sms',
      'X-to': '06 70 12 34 56'
    },
    text: 'The wax at the bank was surfer wax!!!'
  },

  // Plain text email
  {
    from: 'Johnny Utah <johnny.utah@fbi.gov>',
    to: 'Angelo Pappas <angelo.pappas@fbi.gov>',
    subject: 'You were right.',
    text: 'They are surfers.'
  },

  // HTML email w/ image
  {
    from: 'Bodhi <bodhi@gmail.com>',
    to: 'Johnny Utah <johnny.utah@fbi.gov>',
    subject: 'The ultimate price',
    text: 'If you want the ultimate, you\'ve got to be willing to pay the ultimate price. \nIt\'s not tragic to die doing what you love.',
    html: '<!DOCTYPE html><html><head></head><body style="background:#eeefont-family:sans-serifpadding:2em 2em">' +
          '<h1>Point Break</h1>' +
          '<img src="http://farm8.staticflickr.com/7337/11784709785_bbed9bae7d_m.jpg">' +
          '<p>If you want the ultimate, you\'ve got to be willing to pay the ultimate price. <br>It\'s not tragic to die doing what you love.</p>' +
          '<p><strong>- Bodhi</strong></p>' +
          '</body></html>'
  },

  // Email w/ embedded image
  {
    from: 'Johnny Utah <johnny.utah@fbi.gov>',
    to: 'Bodhi <bodhi@gmail.com>',
    subject: 'Where\'s Tyler?',
    html: 'Here she is:<br><img src="cid:12345"/>',
    attachments: [
      {
        filename: 'tyler.jpg',
        path: path.join(__dirname, '/../test/tyler.jpg'),
        cid: '12345'
      }
    ]
  }

]
.concat(webpushesMessages)
.concat(fbpagesMessages);

function sendEmails (logErrors) {
  messages.forEach(function (message) {
    transporter.sendMail(message, function (err, info) {
      if (logErrors && err) { return console.log('Test email error: ', err) }
      console.log('Test email sent: ' + info.response)
    })
  })
}

// Run once if called directly, otherwise export
if (require.main === module) { sendEmails(true) } else { module.exports = sendEmails }
