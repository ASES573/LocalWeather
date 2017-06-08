var result;
var myDate = new Date();
var hrs = myDate.getHours();
var currentdate = new Date();
var datetime = " " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes();
document.getElementById("currentDate").innerHTML = datetime;

var greet;

if (hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';

document.getElementById('lblGreetings').innerHTML =
    '<b>' + greet;
$(document).ready(function ()
{

    $.ajax(
    {
        type: "GET",
        url: "http://ipinfo.io/json/",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function (data)
        {
            console.log(data);
            weathercity = data.city;
            weathercountry = data.country;
            console.log(weathercity);
            document.getElementById("city").innerHTML = weathercity + ', ' + weathercountry;

            $.ajax(
            {
                type: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + weathercity + "&units=metric&APPID=98c0573bfe0231a3d6c48e4f53317e09",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "jsonp",
                success: function (data)
                {
                    console.log(data);
                    description = data["weather"][0].description;
                    document.getElementById("currently").innerHTML = description;
                    temperature = data["main"].temp;
                    farenheit = Math.round(temperature * (9 / 5) + 32);
                    console.log(temperature + ',' + farenheit);
                    document.getElementById("temp-f").innerHTML = farenheit + " °" + 'F';
                    icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    $("#icon").attr("src", icon);

                }
            });

        }

    });
    var flag = 1;
    $(".switch-temp").click(function ()
    {

        if (flag == 1)
        {
            document.getElementById("temp-f").innerHTML = temperature + " °" + 'C';

            flag = 0;
        }
        else
        {
            document.getElementById("temp-f").innerHTML = farenheit + " °" + 'F';
            flag = 1;
        }


    });

});