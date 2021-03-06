/**
 * Created by srikanth681 on 08/12/2016.
 * Provides the methods neeeded to display content to user
 * @module displayMethods
 */



/**
 * This function displays a single car product.
 *
 * @method displayCarDetail
 * @returns {void}
 */
function displayCarDetail(data, vandorCode, carCode) {
    displayCarsList(data, vandorCode, carCode)
}


/**
 * This function displays a list of available cars for the home page, it uses HTML templates for generating
 * product's markup.
 * 
 * @method displayCarsList
 * @returns {void}
 */
function displayCarsList(data, vandorCode, carCode) {

    displayLegendInfo(data)

    $.each(data[0].VehAvailRSCore.VehVendorAvails, function(index, car) {

        if (vandorCode) {
            if (car.Vendor["@Code"] != vandorCode) return;
        }
        // console.log(car)
        var sectionTemp = $("#section-template");
        $(sectionTemp).find('.infoArea').html("");
        $(sectionTemp).find('.title .titleArea').html(car.Vendor["@Name"])

        car.VehAvails.sort(compare);
        
        $(sectionTemp).find('.infoArea').html("");
        $.each(car.VehAvails, function(i, carItem) {
            if (carCode) {
                if (carItem.Vehicle["@Code"] != carCode) return;
            }
            // console.log(carItem)
            var productTemplateData = productTemplate(carItem, car.Vendor["@Code"]);
            $(sectionTemp).find('.infoArea').append(productTemplateData)

        })
        $("#carData").append(sectionTemp.html())

    })
}

/**
 * This function displays top legend information like Pickup and Drop info
 *
 * @method displayLegendInfo
 * @param {Object} Data Object
 * @returns {void}
 */
function displayLegendInfo(data) {
    var pt = new Date(data[0].VehAvailRSCore.VehRentalCore["@PickUpDateTime"]);
    var rt = new Date(data[0].VehAvailRSCore.VehRentalCore["@ReturnDateTime"]);
    $(".mainLegendInfo strong").first().html(data[0].VehAvailRSCore.VehRentalCore.PickUpLocation["@Name"])
    $(".mainLegendInfo strong").last().html(data[0].VehAvailRSCore.VehRentalCore.ReturnLocation["@Name"])
    $(".pickupInfoLegend .pickupTime strong").html(pt.toLocaleDateString() + " " + pt.toLocaleTimeString())
    $(".pickupInfoLegend .dropTime strong").html(rt.toLocaleDateString() + " " + rt.toLocaleTimeString())

}

/**
 * This function builds up the main product from the html template.
 *
 * @method productTemplate
 * @returns {void}
 */
function productTemplate(carItem, vandorCode) {
    var productTemp = $("#product-template");

    // $(productTemp).find('.feat_prod_box').attr("vendorCode",vandorCode )
    // $(productTemp).find('.feat_prod_box').attr("carCode",carItem.Vehicle["@Code"] )
    // $(productTemp).find('.feat_prod_box').addClass(carItem.Vehicle["@Code"]+vandorCode )
    $(productTemp).find('a').attr('href', '#/carDetail/' + vandorCode + "/" + carItem.Vehicle["@Code"])

    $(productTemp).find('img').attr("src", carItem.Vehicle.PictureURL)
    $(productTemp).find('.prod_title .titleHeading').html(carItem.Vehicle.VehMakeModel["@Name"] + " (" + carItem["@Status"] + ")")
    $(productTemp).find('.prod_title .price').html(carItem.TotalCharge["@RateTotalAmount"] + " " + carItem.TotalCharge["@CurrencyCode"])
    $(productTemp).find('.TransmissionType strong').html(carItem.Vehicle["@TransmissionType"])
    $(productTemp).find('.FuelType strong').html(carItem.Vehicle["@FuelType"])
    $(productTemp).find('.DriveType strong').html(carItem.Vehicle["@DriveType"])
    $(productTemp).find('.PassengerQuantity strong').html(carItem.Vehicle["@PassengerQuantity"])
    $(productTemp).find('.BaggageQuantity strong').html(carItem.Vehicle["@BaggageQuantity"])
    $(productTemp).find('.AirConditionInd strong').html(carItem.Vehicle["@AirConditionInd"] == "true" ? "Yes" : "No")
    $(productTemp).find('.DoorCount strong').html(carItem.Vehicle["@DoorCount"])
    $(productTemp).find('.DoorCount strong').html(carItem.Vehicle["@DoorCount"])

    return productTemp.html();
}