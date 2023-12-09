recommended_list = [];
function onLoadPage() {
    let option = localStorage.getItem('selectedOption');
    if (option == 'guide') {
        let startPoint = document.getElementById("startPoint_div");
        startPoint.remove();
        let title = document.title;
        title = "Tourist guide";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var infoButton = document.getElementById('info-button');
    var infoText = document.getElementById('info-text');

    infoButton.addEventListener('mouseover', function () {
        infoText.style.opacity = 1;
        infoText.style.zIndex = 999;
    });

    infoButton.addEventListener('mouseout', function () {
        infoText.style.opacity = 0;
        infoText.style.zIndex = -1;
    });
});
let counter = 2;
function imgSwitcher() {
    if (counter == 4)
        counter = 1;
    let image = document.getElementById('album');
    image.style.opacity = 0;
    setTimeout(function () {
        image.style.opacity = 1;
        image.src = `../img/random_images/background${counter}.jpg`;
        counter += 1;
    }, 1000);
}

let submitButton = document.getElementById("submit_div").getElementsByTagName("button")[0];

submitButton.addEventListener('click', function () {
    const url = 'http://localhost:4000/locations';
    let option = localStorage.getItem('selectedOption');

    if (option == "new") {
        const body = {};
        body["start_point"] = document.getElementById("startPoint_div").getElementsByTagName("textarea")[0].value;
        body["interests"] = document.getElementById("interests_div").getElementsByTagName("textarea")[0].value;
        body["budget"] = document.getElementById("budget_div").getElementsByTagName("textarea")[0].value;
        body["categories"] = [];
        for (let cat of document.getElementById("categories_div").getElementsByTagName("input"))
            if (cat.checked)
                body["categories"].push(cat.value);
        body["trip_length"] = document.getElementById("time_div").getElementsByTagName("input")[0].value;

        const input = document.getElementById('photo');
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                body["base64"] = e.target.result.split(',')[1];
                // popravit upload slike
            };

            reader.readAsDataURL(file);
        }

        console.log(body);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);

                recommended_list = data["0"];
                let container = document.getElementById("card-container");
                for (let i = 0; i < recommended_list.length; i++) {
                    console.log("ADDING CARD");
                    const locationCard = document.createElement('div');
                    locationCard.classList.add('location-card');

                    // Image
                    const imageDiv = document.createElement('div');
                    imageDiv.classList.add("image");
                    const image = document.createElement('img');
                    image.src = recommended_list[i]["image"]; // Replace with the actual image URL
                    image.alt = recommended_list[i]["LocationName"];
                    imageDiv.appendChild(image);
                    locationCard.appendChild(imageDiv);

                    // Button
                    const buttonDiv = document.createElement('div');
                    buttonDiv.classList.add("button");
                    const button = document.createElement('input');
                    button.type = 'button';
                    button.value = 'GENERATE PLAN';
                    buttonDiv.appendChild(button);
                    locationCard.appendChild(buttonDiv);

                    // Content
                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add("content");
                    locationCard.appendChild(contentDiv);

                    // Title
                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add("title");
                    const title = document.createElement('p');
                    title.textContent = recommended_list[i]["LocationName"];
                    titleDiv.appendChild(title);
                    contentDiv.appendChild(titleDiv);

                    // Description
                    const descriptionDiv = document.createElement('div');
                    descriptionDiv.classList.add("description");
                    const description = document.createElement('p');
                    description.textContent = recommended_list[i]["Description"];
                    descriptionDiv.appendChild(description);
                    contentDiv.appendChild(descriptionDiv);

                    container.appendChild(locationCard);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else if (option == "") {

    }
});

window.onLoad = onLoadPage();
setInterval(imgSwitcher, 4000);