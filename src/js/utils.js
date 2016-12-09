/**
 * Created by srikanth681 on 08/12/2016.
 * Provides the basis necessary methods
 *  @module Utils
 */

$(document).ready(function() {});


/**
 * This function gets car information from carTrawler through Ajax and executes the callback function.
 * 
 * @method getData
 * @param {Callback} input the callback function
 * @returns {void}
 */
function getData(func) {
    $.get("js/cars.json", function(data, status) {
        // console.log(data);
        func(data);
    });
}

/**
 * This function is used for sorting car listings based on price
 *
 * @method compare
 * @returns {number}
 */
function compare(a, b) {
    if (parseFloat(a.TotalCharge["@EstimatedTotalAmount"]) < parseFloat(b.TotalCharge["@EstimatedTotalAmount"]))
        return -1;
    if (parseFloat(a.TotalCharge["@EstimatedTotalAmount"]) > parseFloat(b.TotalCharge["@EstimatedTotalAmount"]))
        return 1;
    return 0;
}
