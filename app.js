const appNameButton = document.querySelector("#app-name-button");
const appName = document.querySelector("#app-name");
const geolocationButton = document.querySelector("#geolocation-button");
const geolocation = document.querySelector("#geolocation");
const clipboardButton = document.querySelector("#clipboard-button");
const clipboard = document.querySelector("#clipboard");

appNameButton.addEventListener("click", (event) => {
    appName.innerText = navigator.appName;
});

geolocationButton.addEventListener("click", (event) => {
    navigator.geolocation.getCurrentPosition((location) => {
        geolocation.innerText =
            "Latitude: " +
            location.coords.latitude +
            " Longitude: " +
            location.coords.longitude;
    });
});

clipboardButton.addEventListener("click", (event) => {
    navigator.clipboard.readText().then(
        (text) => {
            clipboard.innerText = text;
        },
        (reason) => {
            clipboard.innerText =
                "Could not retrieve text from clipboard because: " + reason;
        }
    );
});
