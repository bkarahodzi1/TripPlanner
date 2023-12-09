let recommended_list = [];
let body = {}
let trip_plan = []

function unsetLoaderCss(loader,container){
    loader.style.cssText = `
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    visibility:hidden;
    display: none;
    `
   
    container.style.cssText = `
    height: 100vh;
    display: flex;
    align-items: center; 
    background-image: url("../img/random_images/background1.png");
    -webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    filter: blur(0px);
   
    `
}

function onSubmit() {
    let loader = document.getElementById("loader");
    let container = document.getElementById('container');

    

    container.style.cssText = `
    height: 100vh;
    display: flex;
    align-items: center; 
    background-image: url("../img/random_images/background1.png");
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    `

    loader.style.cssText = `
    visibility: visible;
    width: 100px;
    height: 100px;
    display: block;
    position: absolute;
    top: 50%;
    left: 46%;
    margin: -50px 0 0 -50px;
    z-index: 1000;
    `

}

function handleButtonText(){
    document.getElementById("submit").textContent = "Generate";
}
function onLoadPage() {
    let option = localStorage.getItem('selectedOption');
    if (option == 'guide') {
        let startPoint = document.getElementById("startPoint_div");
        startPoint.remove();
        let title = document.title;
        title = "Tourist guide";
    }
    else {
        let infoText = document.getElementById("info-text");
        infoText.innerHTML = ` 
        <p>
            <b>Starting point</b><br>
            Tell me the location you want to travel from.
        </p>
    <p>
        <b>Interests</b><br>
        Tell me about what interests you generally, so I can recommend places that fit you better.
    </p>
    <p>
        <b>Budget</b><br>
        Tell me what is the maximum of your budget you are willing to spend on this trip.
    </p>
    <p>
        <b>Categories</b><br>
        Select which of the given categories would best describe what you would like to explore in the location.
    </p>
    <p>
        <b>Time</b><br>
        Select how long your trip will be (in days).
    </p>
    <p>
        <b>Upload an example image</b><br>
        Select a photo of a place you like the look of and I will base my suggestions on places that are similar to that photo.
    </p>`
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

function openPlan(btnDivRef) {
    let loader = document.getElementById("loader");
    let container = document.getElementById('container');

    

    container.style.cssText = `
    height: 100vh;
    display: flex;
    align-items: center; 
    background-image: url("../img/random_images/background1.png");
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    `

    loader.style.cssText = `
    visibility: visible;
    width: 100px;
    height: 100px;
    display: block;
    position: absolute;
    top: 50%;
    left: 46%;
    margin: -50px 0 0 -50px;
    z-index: 1000;
    `
    console.log("CHOOSE BUTTON CLICKED");
    const url = 'http://localhost:4000/plan';
    body["location"] = recommended_list[btnDivRef.id]["LocationName"];
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
            trip_plan = data;
            trip_plan["duration"] = body["trip_length"];
            localStorage.setItem("tripPlan", JSON.stringify(trip_plan["0"]));
            let fullContainer = document.getElementById("container");
            unsetLoaderCss(loader,fullContainer);
            window.location.href = '/html/tourist-guide.html';
        })  
        .catch(error => {
            console.error('Error:', error);
        });
}



submitButton.addEventListener('click', function () {
    const url = 'http://localhost:4000/locations';
    let option = localStorage.getItem('selectedOption');
    document.getElementById("submit").textContent = "Regenerate";
    if (option == "new") {
        body = {};
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
                if ("error" in data) {
                    alert(data["error"]);
                    let fullContainer = document.getElementById("container");
                    let loader = document.getElementById("loader");
                    unsetLoaderCss(loader,fullContainer)
                   
                   
                    return;
                }
                recommended_list = data["0"];
                console.log("VELICINA JE " + recommended_list.length)
                let container = document.getElementById("card-container");
                let images = document.getElementById('album');
                images.style.display = "none";
                container.innerHTML = '';
                let max = 3;
                if (recommended_list.length>3){
                    max=3;
                }
                else if (recommended_list.length<3){
                    max=recommended_list.length;
                }
                let loader = document.getElementById("loader");
                let fullContainer = document.getElementById("container")
                for (let i = 0; i < max; i++) {
                    console.log("ADDING CARD");
                    const locationCard = document.createElement('div');
                    locationCard.classList.add('location-card');
                    if (recommended_list[i]["LocationName"]==undefined||recommended_list[i]["Description"]==undefined){
                        alert("Something went wrong, try again!");
                        unsetLoaderCss(loader,fullContainer)
                        return
                    }
                    locationCard.innerHTML = `
                    <div class="image">
                        <img src="${recommended_list[i]["image"]}" alt="${recommended_list[i]["image"]}">
                    </div>
                    <div class="content">
                        <div class="title">
                            <p><b>${recommended_list[i]["LocationName"]}</b></p>
                        </div>
                        <div class="description">
                            <p>${recommended_list[i]["Description"]}</p>
                        </div>
                    </div>
                    <div class="button">
                        <button class="btn" onclick=openPlan(this) id="${i}"><b>Choose</b></button>
                    </div>`
                    container.appendChild(locationCard);
                }
                
                unsetLoaderCss(loader, fullContainer);
                
            }
            )
            .catch(error => {
                console.log("ERROR");
                console.error('Error:', error);
                
            });
    } else if (option == "guide") {

    }
});

function goHome(){
    window.location.href = "http://localhost:4000/home";
}

window.onLoad = onLoadPage();
setInterval(imgSwitcher, 4000);