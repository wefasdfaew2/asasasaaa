/*
/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "sportsbook.axbet.com",
            "tur": "sportsbook.axbet.com",
            "rus": "sportsbook.axbet.com"
        },
        site_name: "sportsbook.axbet.com",
        site_id: "38",
        skin: 'sportsbook.axbet.com',
        showMyGamesInBetslip: true,
        integrationMode: true,
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        redirectOnTablets: false,
        videoEnabled: true,
        availableVideoProviderIds: [6, 7, 8, 11, 12],
        showFavoriteGamesInSportList: true,
        selectFavoritesByDefault: true, // will select favorites instead of 1st sport if there are favorite games
        about_company_text: {
            'eng' : "(c) sportsbook.axbet.com",
            'tur' : "(c) sportsbook.axbet.com",
            'rus' : "(c) sportsbook.axbet.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'tur' : { 'short': 'TR', 'full': "Türkçe"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        timeZonePerLanguage: {
            'rus' : '+04:00',
            'tur' : '+03:00'
        },
        registration: {
            defaultCurrency: 'TRY',
            restrictedCountries: {}
        },
        liveChat: null,
        availableCurrencies: ['TRY', 'EUR', 'GBP', 'USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: false, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: true, // disable wordpress content in footer,
        disableFooter: true,
        disableHomepageNews: true,
        disableHeader: true,
        disableHeaderNavigation: true,
        copyrightSince: 2014
    },
    partner: {
        documentDomain: true,  // true means set top level domain as document.domain
        profileNotAvailable: true,
        balanceRefreshPeriod: 30000, //milliseconds, if 0 or null will be disabled
        notifyOnResize: true //if enabled, will call partner's provided callback function on every resize, passing it the frame size
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.axbet.com:8085/"}],
        websocket: [{ url: "ws://swarm.axbet.com:8085/"}]
    },
    xDomainSlaves: '{"http://swarm.axbet.com:8085" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
     ]

});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/sport/'});

}]);


CMS.constant('SkinWPConfig', {
//    wpUrl: 'http://www.sportsbook.axbet.com/json',  // WordpResss instance serving pages, banners
//    wpBaseHost: 'www.sportsbook.axbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//    wpNewsUrl: 'http://www.sportsbook.axbet.com/newsjson',  // WordpResss instance serving news
//    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});
