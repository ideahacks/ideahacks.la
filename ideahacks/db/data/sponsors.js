const COMPANY_LOGOS_DIR = '/img/company_logos/'

module.exports = [
  {
    tier: 'diamond',
    sponsors: [
      {
        name: 'Cypress',
        website: 'http://www.cypress.com/',
        logo: COMPANY_LOGOS_DIR + 'cypress.png',
        maxWidth: '500px'
      }
    ]
  },
  {
    tier: 'platinum',
    sponsors: [
      {
        name: 'Texas Instruments',
        website: 'https://www.ti.com',
        logo: COMPANY_LOGOS_DIR + 'ti.png',
        maxWidth: '375px'
      },
      {
        name: 'AT&T',
        website: 'https://www.att.com/',
        logo: COMPANY_LOGOS_DIR + 'att.jpg',
        maxWidth: '200px'
      },
      {
        name: 'Google',
        website: 'https://www.google.com/intl/en/about/',
        logo: COMPANY_LOGOS_DIR + 'google.png',
        maxWidth: '300px'
      }
    ]
  }
]
