/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "bet2u.com"
        },
        site_name: "bet2u.com",
        site_id: "13",
        skin: 'bet2u.com',
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: false,
        skillgamesEnabled: true,
        ogwilEnabled: true,
        redirectOnTablets: 'http://tablet.bet2u.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) bet2u.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"}
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: {
			isSfChat:true,	
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['GHS'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
     ]

});

CMS.constant('SkinWPConfig', {
//   wpUrl: 'http://www.bet2u.com/json',  // WordpResss instance serving pages, banners
//  wpBaseHost: 'www.bet2u.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.bet2u.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.bet2u.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '13'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});