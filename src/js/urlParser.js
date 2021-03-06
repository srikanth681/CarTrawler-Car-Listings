/**
 * Created by srikanth681 on 08/12/2016.
 * Provides a standalone url routes manager. It manages and controles content based on URL on the browser.
 * @module urlParser
 */

processURL();

/**
 * This function is a standalone URL router for this app. It parses and manages hashtag URL's
 *
 * 
 * @method processURL
 * @returns {void}
 */
function processURL() {

    if (!window.location.hash) {
        // has no Hash
        getData(function(data) {
            $(".backToHome").hide();
            displayCarsList(data);
        })


    } else {
        // Hash Found
        var hash = window.location.hash.substring(1).split('/'); //Puts hash in variable, and removes the # character

        getData(function(data) {
            switch (hash[1]) {
                case "home":
                    $(".backToHome").hide();
                    displayCarsList(data);
                    break;
                default:
                    $(".backToHome").show();
                    displayCarDetail(data, hash[2], hash[3])
            }
        });
    }
    $("#loading").hide();
}

/**
 * This function is called when url change event occurs and it clears content and parses updated URL.
 *
 * @method goURL
 * @returns {void}
 */
function goURL() {
    $("#loading").show();
    $("#carData").html('');

    setTimeout(processURL, 500);

}