/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:balanceCtrl
 * @description
 *  bet history controller.
 */
VBET5.controller('balanceCtrl', ['$rootScope', '$scope', 'Utils', 'Zergling', 'Moment', 'Translator', 'Config', function ($rootScope, $scope, Utils, Zergling, Moment, Translator, Config) {
    'use strict';

    $scope.balanceHistoryLoaded = false;
    var balanceHistory, ITEMS_PER_PAGE = 10;

    $scope.balanceTypes = {
        '-1': Translator.get('All'),
        0: Translator.get('New Bets'),
        1: Translator.get('Winning Bets'),
        2: Translator.get('Returned Bet'),
        3: Translator.get('Deposit'),
        4: Translator.get('Card Deposit'),
        5: Translator.get('Bonus'),
        6: Translator.get('Bonus Bet'),
        7: Translator.get('Commission'),
        8: Translator.get('Withdrawal'),
        9: Translator.get('Correction'),
        10: Translator.get('Deposit by payment system'),
        12: Translator.get('Withdrawal request'),
        13: Translator.get('Authorized Withdrawal'),
        14: Translator.get('Withdrawal denied'),
        15: Translator.get('Withdrawal paid'),
        16: Translator.get('Pool Bet'),
        17: Translator.get('Pool Bet Win'),
        18: Translator.get('Pool Bet Return'),
        23: Translator.get('In the process of revision'),
        24: Translator.get('Removed for recalculation'),
        29: Translator.get('Free Bet Bonus received'),
        30: Translator.get('Wagering Bonus received'),
        31: Translator.get('Transfer from Gaming Wallet'),
        32: Translator.get('Transfer to Gaming Wallet'),
        37: Translator.get('Declined Superbet'),
        39: Translator.get('Bet on hold'),
        40: Translator.get('Bet cashout'),
        19: Translator.get('Fair'),
        20: Translator.get('Fair Win'),
        21: Translator.get('Fair Return')
    };

    $scope.casinoBalanceTypes = {
        0: Translator.get('Bet'),
        1: Translator.get('Win'),
        2: Translator.get('Correction'),
        3: Translator.get('Deposit'),
        4: Translator.get('Withdraw'),
        5: Translator.get('Tip'),
        6: Translator.get('Bonus')
    };

    var disabledOperationsInFilter = [18, 23, 24, 29, 30, 31, 32, 19, 20, 21, 4]; // don't show these operations in filter

    var balanceTypesFilter = {};
    angular.forEach($scope.balanceTypes, function (value, key) {
        if (disabledOperationsInFilter.indexOf(parseInt(key, 10)) === -1) {
            balanceTypesFilter[key] = value;
        }
    });

    $scope.balanceHistoryParams = {
        dateRanges: [],
        dateRange: null,
        balanceTypes: balanceTypesFilter,
        balanceType: '-1'
    };

    /**
     * @ngdoc method
     * @name initbalanceHistory
     * @methodOf vbet5.controller:balanceCtrl
     * @description init function. Generates  month and weeks data for select box and loads entries
     * for the first month and default type
     */
    $scope.initbalanceHistory = function initbalanceHistory(product) {
        var i, time;
        for (i = 0; i < 6; i++) {
            time = Moment.get().subtract('months', i).startOf('month');
            $scope.balanceHistoryParams.dateRanges.push({fromDate: time.unix(), toDate: time.clone().add('months', 1).unix(), str: time.format('MMMM YYYY'), type: 'month'});

            var monthDays = i === 0 ? Moment.get().lang('en').format('D') :  time.clone().endOf('month').lang('en').format('D'),
                wCount = parseInt(monthDays / 7, 10),
                moreDaysCount = monthDays % 7;
            var j, fromDate, toDate, weekDates = [];
            for (j = 0; j < wCount; j++) {
                fromDate = time.clone().add('days', j * 7);
                toDate = time.clone().add('days', (j + 1) * 7);
                weekDates.push({fromDate: fromDate.unix(), toDate: toDate.unix(), str: "· " + (fromDate.format('DD MMM') + " - " + toDate.format('DD MMM')), type: 'week'});
            }
            if (moreDaysCount > 0) {
                fromDate = time.clone().add('days', j * 7);
                toDate = fromDate.clone().add('days', moreDaysCount);
                var str = moreDaysCount == 1 ? toDate.format('DD MMM') : fromDate.format('DD MMM') + " - " + toDate.format('DD MMM');
                weekDates.push({fromDate: fromDate.unix(), toDate: toDate.unix(), str: "· " + str, type: 'week'});
            }
            $scope.balanceHistoryParams.dateRanges = $scope.balanceHistoryParams.dateRanges.concat(weekDates.reverse());
        }
        $scope.dataSelectedIndex  =  product === 'Casino' ? 1 : 0;
        $scope.loadBalanceHistory(product);
    };

    /**
     * @ngdoc method
     * @name loadBalanceHistory
     * @methodOf vbet5.controller:balanceCtrl
     * @description loads balance history according to selected parameters from  **$scope.balanceHistoryParams**
     * and selects first page
     * @param {String} [product] optional.  Sport, Casino or Poker.  Default is sport
     */
    $scope.loadBalanceHistory = function loadBalanceHistory(product) {
        $scope.balanceHistoryParams.dateRange = $scope.balanceHistoryParams.dateRanges[$scope.dataSelectedIndex];
        var where = {},
            balanceType = parseInt($scope.balanceHistoryParams.balanceType, 10);

        if ($scope.balanceHistoryParams.dateRange.fromDate !== -1) {
            where.from_date = $scope.balanceHistoryParams.dateRange.fromDate;
            where.to_date = $scope.balanceHistoryParams.dateRange.toDate;
        }

        if (balanceType !== -1) {
            where.type = balanceType;
        }
        $scope.balanceHistoryLoaded = false;
        var request = {'where': where};
        if (product) {
            request.product = product;
        }
        Zergling.get(request, 'balance_history')
            .then(
                function (response) {
                    if (response.history) {
                        if (Config.main.balanceTypesToHideInHistory && Config.main.balanceTypesToHideInHistory.length) {
                            balanceHistory = [];
                            var i;
                            for (i = 0; i < response.history.length; i++) {
                                if (Config.main.balanceTypesToHideInHistory.indexOf(response.history[i].operation) === -1) {
                                    balanceHistory.push(response.history[i]);
                                }
                            }
                        } else {
                            balanceHistory = response.history;
                        }
                        $scope.balanceHistoryGotoPage(1);
                        console.log('balance history:', balanceHistory, "response", response, "where", where);
                    } else {
                        $scope.message = response.details || Translator.get('Error');
                    }
                    $scope.balanceHistoryLoaded = true;
                },
                function (failResponse) {
                    $scope.message = failResponse.data;
                    $scope.balanceHistoryLoaded = true;
                }
            );
    };

    /**
     * @ngdoc method
     * @name balanceHistoryGotoPage
     * @methodOf vbet5.controller:balanceCtrl
     * @description selects slice of bet history data according to given page number
     *
     * @param {Number} page page number
     */
    $scope.balanceHistoryGotoPage = function balanceHistoryGotoPage(page) {
        $scope.totalPages = parseInt(balanceHistory.length / ITEMS_PER_PAGE + (balanceHistory.length % ITEMS_PER_PAGE ? 1 : 0), 10);
        $scope.balanceHistoryPages = Utils.createPaginationArray($scope.totalPages, page, 10);
        $scope.balanceHistoryActivePage = page;
        var start = (page - 1) * ITEMS_PER_PAGE;
        var end = page * ITEMS_PER_PAGE;
        end = end > balanceHistory.length ? balanceHistory.length : end;
        $scope.balanceHistory = balanceHistory.slice(start, end);
    };





}]);
