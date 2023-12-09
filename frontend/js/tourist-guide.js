function goHome(){
    window.location.href = "http://localhost:4000/home";
}

window.onload = function () {
    console.log(localStorage.getItem("tripPlan"));
    let container = document.getElementById("day-container");
    let trip_plan = JSON.parse(localStorage.getItem("tripPlan"));
    for (let i = 0; i < trip_plan.length; i++) {
        if (!("day" in trip_plan[i]))
            continue;
        let side = i % 2 == 0 ? "left" : "right"
        container.innerHTML +=
            `<div class="day-card ${side}">
            <h2>Day ${i + 1}</h2>
            <div class="content">
                <img src="${trip_plan[i]["image"]}" alt="${trip_plan[i]["title"]}">
                <p>${trip_plan[i]["description"]}</p>
            </div>
        </div>`;
    }
};



function audioRequest(){
    let audioButton = document.getElementById("play-button");



}
