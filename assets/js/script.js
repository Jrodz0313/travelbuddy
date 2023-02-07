var currentLong;
var currentLat;



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f952658629msh7726f90b2b0366fp176658jsn9a988e1b126b',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/countries', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    


let button = document.getElementById("get-location");

// Get current location 
function getLocation() {

    navigator.geolocation.getCurrentPosition((position) => {
    currentLat = position.coords.latitude;
    console.log("🚀 ~ file: script.js:6 ~ navigator.geolocation.getCurrentPosition ~ lat", currentLat)
    currentLong = position.coords.longitude;        
    console.log("🚀 ~ file: script.js:8 ~ navigator.geolocation.getCurrentPosition ~ long", currentLong)
    });
}


// Get location id to pass to booking API to get list of preperties in the area
function getResultsByCoordinates(lat, long) {
    
    // API call using coordinates
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe32bd232cmsh314f416fc05e978p120522jsn3a47d3a556d5',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };
    
    fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=' + long + '&filter_by_currency=AED&room_number=1&locale=en-gb&latitude=' + lat + '&order_by=popularity&units=metric&checkin_date=2023-07-15&adults_number=2&checkout_date=2023-07-16&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_number=2&include_adjacency=true&children_ages=5%2C0', options)
        .then(response => response.json())
        .then(response => {
            // Pass each listing to a function that will handle page formatting
            console.log(response)
            response.result.forEach(element => {
                displayResults(element);
            });
        })
        .catch(err => console.error(err));
}

// Add each lisitng to page
function displayResults(listing) {
    
    // Listing Card prototype
    var imageSource = listing.max_photo_url;
    var hotelName = listing.hotel_name;
    var hotelAddress = listing.address;
    var hotelCity = listing.city;
    var hotelReviewScore = listing.review_score;
    var hotelReviewWord = listing.review_word;
    var hotelBookLink = listing.url;
}

button.addEventListener("click", () => {
    
    // if (!currentLat || !currentLong) {
    //     getLocation();    
    // }
    getResultsByCoordinates(currentLat, currentLong)
    
});



// Get user's location after page loads
getLocation();
