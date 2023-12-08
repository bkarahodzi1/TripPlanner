
function onLoadPage() {
    let option = localStorage.getItem('selectedOption');
    if (option == 'new') {
        console.log("if")

    }
    else if (option == 'guide') {
        let startPoint = document.getElementById("startPoint_p");
        startPoint.remove();
        console.log("else if")
        let title = document.title;
        title = "Tourist guide";
    }
}

let submitButton = document.getElementById("submit_div").getElementsByTagName("button")[0];

submitButton.addEventListener('click', function () {
    const url = 'http://localhost:4000/locations/locations';

    const body = {};
    body["start_point"] = document.getElementById("startPoint_div").getElementsByTagName("input")[0].value;
    body["interests"] = document.getElementById("interests_div").getElementsByTagName("input")[0].value;
    body["budget"] = document.getElementById("budget_div").getElementsByTagName("input")[0].value;
    body["categories"] = [];
    for (cat of document.getElementById("budget_div").getElementsByTagName("input"))
        if (cat.checked)
            categories.push(cat.value);
    body["trip_length"] = document.getElementById("time_div").getElementsByTagName("input")[0].value;

    const input = document.getElementById('photo');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            body["base64"] = e.target.result.split(',')[1];
        };

        reader.readAsDataURL(file);
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

});

window.onLoad = onLoadPage();