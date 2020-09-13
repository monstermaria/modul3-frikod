(function () {
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

    function getAnimalPromise(animal) {
        const animals = [
            "cat",
            "dog",
            "horse",
            "snake",
            "frog",
            "rabbit",
            "rat",
            "lion",
            "tiger"
        ];

        if (animals.includes(animal)) {
            return Promise.resolve("I have heard of the animal " + animal);
        } else {
            return Promise.reject("I do not know of this animal " + animal);
        }
    }

    document
        .querySelector("#animal-input")
        .addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                let result = "";
                let color = "";

                getAnimalPromise(event.target.value)
                    .then((text) => {
                        result = text;
                        color = "green";
                    })
                    .catch((text) => {
                        result = text;
                        color = "red";
                    })
                    .finally(() => {
                        const animalResult = document.querySelector(
                            "#animal-result"
                        );
                        animalResult.innerText = result;
                        animalResult.style.color = color;
                    });

                event.target.value = "";
            }
        });

    async function getCatPicture() {
        const kitties = await fetch(
            "https://api.thecatapi.com/v1/images/search"
        );
        if (kitties.status !== 200) {
            document.querySelector("#error-message").innerText =
                "Cat-astrofy has struck! No kitties delivered because: " +
                kitties.status;
        } else {
            const kittiesJSON = await kitties.json();
            const kittyUrl = kittiesJSON[0].url;
            document.querySelector("#kitty-image").src = kittyUrl;
            document.querySelector("#error-message").innerText = "";
        }
    }

    document
        .querySelector("#kitty-button")
        .addEventListener("click", getCatPicture);

    getCatPicture();
})();
