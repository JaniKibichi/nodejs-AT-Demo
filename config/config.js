var options = {
  AT : {
    username : 'WeloveNerds',
    apiKey   : 'c3a9669275cb6b14230a6b610f64e387c726b05ec5d1b20f7910b824184cc405',
    format   : 'json'
  },

  mysql: {
    port: '3306',
    host: 'localhost',
    db  : 'voicemanenos',
    user: 'root',
    pass: ''
  },

  redis: {
    port: '6379',
    host: 'localhost'
  }
};

module.exports = options;
