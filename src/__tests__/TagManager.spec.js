import TagManager from '../TagManager'

describe('TagManager', () => {
  it('should render tagmanager', () => {
    TagManager.initialize({gtmId: 'GTM-000000'})
    expect(window.dataLayer).toHaveLength(1)
  })

  it('should render datalayer', () => {
    const gtmArgs = {
      gtmId: 'GTM-000000',
      dataLayer: {
        userInfo: 'userInfo'
      }
    }
    TagManager.initialize(gtmArgs)
    expect(window.dataLayer).toHaveLength(1)
  })

  it('should render tagmanager with nonce', () => {
    TagManager.initialize({gtmId: 'GTM-000000', nonce: 'foo'})
    const scripts = window.document.getElementsByTagName('script');
    expect(scripts[0].nonce).toBe('foo');
  })

  it('should render tagmanager without nonce', () => {
    TagManager.initialize({gtmId: 'GTM-000000'})
    const scripts = window.document.getElementsByTagName('script');
    expect(scripts[0].nonce).toBe('');
 })
})