/**
 * Created by srikanth681 on 08/12/2016.
 */

processURL();

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

function goURL() {
    $("#loading").show();
    $("#carData").html('');

    setTimeout(processURL, 500);

}