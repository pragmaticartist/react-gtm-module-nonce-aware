import Snippets from './Snippets'

const TagManager = {
  dataScript: function (dataLayer, nonce) {
    const script = document.createElement('script')

    if (nonce) {
      script.setAttribute('nonce', nonce);
    }

    script.innerHTML = dataLayer
    return script
  },
  gtm: function (args) {
    const snippets = Snippets.tags(args)

    const noScript = () => {
      const noscript = document.createElement('noscript')
      noscript.innerHTML = snippets.iframe
      return noscript
    }

    const script = (nonce, elementId) => {
      const script = document.createElement('script')

      if (elementId) {
        script.setAttribute('id', elementId);
      }

      if (nonce) {
        script.setAttribute('nonce', nonce);
      }

      script.innerHTML = snippets.script
      return script
    }

    const dataScript = (nonce) => this.dataScript(snippets.dataLayerVar, nonce)

    return {
      noScript,
      script,
      dataScript
    }
  },
  initialize: function ({ gtmId, events = {}, dataLayer, dataLayerName = 'dataLayer', auth = '', preview = '', nonce = '', elementId = '' }) {
    const gtm = this.gtm({
      id: gtmId,
      events: events,
      dataLayer: dataLayer || undefined,
      dataLayerName: dataLayerName,
      auth,
      preview,
      nonce,
      elementId
    })
    if (dataLayer) document.head.appendChild(gtm.dataScript(nonce))
    document.head.insertBefore(gtm.script(nonce, elementId), document.head.childNodes[0])
    document.body.insertBefore(gtm.noScript(), document.body.childNodes[0])
  },
  dataLayer: function ({dataLayer, dataLayerName = 'dataLayer'}) {
    if (window[dataLayerName]) return window[dataLayerName].push(dataLayer)
    const snippets = Snippets.dataLayer(dataLayer, dataLayerName)
    const dataScript = this.dataScript(snippets)
    document.head.insertBefore(dataScript, document.head.childNodes[0])
  }
}

module.exports = TagManager
