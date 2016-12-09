/**
 * Created by srikanth681 on 08/12/2016.
 */
$(document).ready(function() {});

function getData(func) {
    $.get("js/cars.json", function(data, status) {
        // console.log(data);
        func(data);
    });
}

function compare(a, b) {
    if (parseFloat(a.TotalCharge["@EstimatedTotalAmount"]) < parseFloat(b.TotalCharge["@EstimatedTotalAmount"]))
        return -1;
    if (parseFloat(a.TotalCharge["@EstimatedTotalAmount"]) > parseFloat(b.TotalCharge["@EstimatedTotalAmount"]))
        return 1;
    return 0;
}
