function displayCarDetail(a,b,c){displayCarsList(a,b,c)}function displayCarsList(a,b,c){displayLegendInfo(a),$.each(a[0].VehAvailRSCore.VehVendorAvails,function(a,d){if(!b||d.Vendor["@Code"]==b){var e=$("#section-template");$(e).find(".infoArea").html(""),$(e).find(".title .titleArea").html(d.Vendor["@Name"]),d.VehAvails.sort(compare),$(e).find(".infoArea").html(""),$.each(d.VehAvails,function(a,b){if(!c||b.Vehicle["@Code"]==c){var f=productTemplate(b,d.Vendor["@Code"]);$(e).find(".infoArea").append(f)}}),$("#carData").append(e.html())}})}function displayLegendInfo(a){var b=new Date(a[0].VehAvailRSCore.VehRentalCore["@PickUpDateTime"]),c=new Date(a[0].VehAvailRSCore.VehRentalCore["@ReturnDateTime"]);$(".mainLegendInfo strong").first().html(a[0].VehAvailRSCore.VehRentalCore.PickUpLocation["@Name"]),$(".mainLegendInfo strong").last().html(a[0].VehAvailRSCore.VehRentalCore.ReturnLocation["@Name"]),$(".pickupInfoLegend .pickupTime strong").html(b.toLocaleDateString()+" "+b.toLocaleTimeString()),$(".pickupInfoLegend .dropTime strong").html(c.toLocaleDateString()+" "+c.toLocaleTimeString())}function productTemplate(a,b){var c=$("#product-template");return $(c).find("a").attr("href","#/carDetail/"+b+"/"+a.Vehicle["@Code"]),$(c).find("img").attr("src",a.Vehicle.PictureURL),$(c).find(".prod_title .titleHeading").html(a.Vehicle.VehMakeModel["@Name"]+" ("+a["@Status"]+")"),$(c).find(".prod_title .price").html(a.TotalCharge["@RateTotalAmount"]+" "+a.TotalCharge["@CurrencyCode"]),$(c).find(".TransmissionType strong").html(a.Vehicle["@TransmissionType"]),$(c).find(".FuelType strong").html(a.Vehicle["@FuelType"]),$(c).find(".DriveType strong").html(a.Vehicle["@DriveType"]),$(c).find(".PassengerQuantity strong").html(a.Vehicle["@PassengerQuantity"]),$(c).find(".BaggageQuantity strong").html(a.Vehicle["@BaggageQuantity"]),$(c).find(".AirConditionInd strong").html("true"==a.Vehicle["@AirConditionInd"]?"Yes":"No"),$(c).find(".DoorCount strong").html(a.Vehicle["@DoorCount"]),$(c).find(".DoorCount strong").html(a.Vehicle["@DoorCount"]),c.html()}function processURL(){if(window.location.hash){var a=window.location.hash.substring(1).split("/");getData(function(b){switch(a[1]){case"home":$(".backToHome").hide(),displayCarsList(b);break;default:$(".backToHome").show(),displayCarDetail(b,a[2],a[3])}})}else getData(function(a){$(".backToHome").hide(),displayCarsList(a)});$("#loading").hide()}function goURL(){$("#loading").show(),$("#carData").html(""),setTimeout(processURL,500)}function getData(a){$.get("js/cars.json",function(b,c){a(b)})}function compare(a,b){return parseFloat(a.TotalCharge["@EstimatedTotalAmount"])<parseFloat(b.TotalCharge["@EstimatedTotalAmount"])?-1:parseFloat(a.TotalCharge["@EstimatedTotalAmount"])>parseFloat(b.TotalCharge["@EstimatedTotalAmount"])?1:0}processURL(),$(document).ready(function(){});