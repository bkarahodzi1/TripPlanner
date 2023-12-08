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



window.onLoad = onLoadPage();