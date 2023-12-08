function onLoad(){
    let option = localStorage.getItem('selectedOption');
    if (option == 'new')
    {

    }
    else if(option == 'guide')
    {
        let polazna = document.getElementById("startPoint_p");
        polazna.remove();
        let naslov = document.title;
        naslov = "Tourist guide";
    }
}