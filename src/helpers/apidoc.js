'use strict'

const jsdom = require('jsdom')

module.exports = (page) => {
  var contents = page.contents
  if (page.canonicalUrl && page.url?.endsWith('.html')) {
    const dom = new jsdom.JSDOM(page.contents.toString())
    const document = dom.window.document
    const head = document.getElementsByTagName('head')[0]
    if (!head.querySelector('link[rel=\'canonical\']')) {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', page.canonicalUrl)
      head.appendChild(link)
    }
    contents = dom.serialize()
    dom.window.close()
  }
  return contents
}
