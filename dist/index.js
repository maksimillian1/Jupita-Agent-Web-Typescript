
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jupita-agent-sdk.cjs.production.min.js')
} else {
  module.exports = require('./jupita-agent-sdk.cjs.development.js')
}
