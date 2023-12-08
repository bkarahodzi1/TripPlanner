function onLoadPage(){
    let option = localStorage.getItem('selectedOption');
    if (option == 'new')
    {
        console.log("if")

    }
    else if(option == 'guide')
    {
        let polazna = document.getElementById("startPoint_p");
        polazna.remove();
        console.log("else if")
        let naslov = document.title;
        naslov = "Tourist guide";
    }
}

window.onLoad = onLoadPage();