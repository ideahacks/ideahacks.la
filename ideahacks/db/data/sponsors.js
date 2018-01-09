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
      },
      {
        name: 'Northrop Grumman',
        website: 'http://www.northropgrumman.com/',
        logo: COMPANY_LOGOS_DIR + 'northropgrumman.png',
        maxWidth: '515px'
      },
      {
        name: 'Traction Labs LLC',
        website: 'http://www.traction-labs.com/',
        logo: COMPANY_LOGOS_DIR + 'tractionlabs.png',
        maxWidth: '515px'
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
        logo: COMPANY_LOGOS_DIR + 'att.png',
        maxWidth: '260px'
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
