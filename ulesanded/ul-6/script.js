(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var onEL = false;

            if (h < 10) {
                h = "0" + h;
                onEL = true;
            } else if (h < 12) {
                onEL = true;
            } else if (h == 12) {
                onEL = false;
            } else if (h < 22) {
                h = "0" + (h - 12);
                onEL = false;
            } else {
                onEL = false;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (onEL) {
                c.innerHTML = h + ":" + m + ":" + s + " EL";
            } else {
                c.innerHTML = h + ":" + m + ":" + s + " PL";
            }
            
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    var sum = 0.0;
    
    function estimateDelivery(event) {
        sum = 0;

        event.preventDefault();
        
        var linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if(document.getElementById("fname").value === "") {
            alert("Palun sissestage nimi");
            return;
        } else if(/\d/.test(document.getElementById("fname").value)) {
            alert("Palun sissestage nimi ilma numbrita");
            return;
        } else if(/\d/.test(document.getElementById("lname").value)) {
            alert("Palun sissestage perenimi ilma numbrita");
            return;
        } else if (document.getElementById("lname").value === "") {
            alert("Palun sissestage perenimi");
            return;
        } else if ((document.getElementById("male").checked == false) &&(document.getElementById("female").checked == false)) {
            alert("Valige mees või naine");
            return;
        } else{

            if (linn.value == "trt") {
                sum += 2.5;
            } else if (linn.value == "nrv") {
                sum += 2.5;
            } else if (linn.value == "prn") {
                sum += 3;
            }
            
            if (document.getElementById("v1").checked) {
                sum += 5;
            }

            if (document.getElementById("v2").checked) {
                sum += 1;
            }

            
            e.innerHTML = sum + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;
var infobox;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.942140,
            25.577988
        );

    var tartusPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var tallinnasPoint = new Microsoft.Maps.Location(
            59.445201,
            24.751803
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });



    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);



    
    var pushpin = new Microsoft.Maps.Pushpin(tartusPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            text: 'UT',
            description: 'Discription for pin Tartu'
        });

    pushpin.metadata = {
                title: 'Tartu Ülikool',
                description: 'Väga hea koht. Siin peab olema lisainfo'
            };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    map.entities.push(pushpin);
    

    var pushpin2 = new Microsoft.Maps.Pushpin(tallinnasPoint, {
            title: 'Tallinn',
            //subTitle: 'Hea koht ka',
            text: 'T',
            description: 'Discription for pin Tallinn'

        });

    pushpin2.metadata = {
                title: 'Tallinn',
                description: 'Väga hea koht ka. Siin peab olema lisainfo, aga ma ei tea, mida kirjutada'
            };


    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin2);


}

function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

