function showOptions() {
    document.getElementById('planBtn').style.display = 'none';
    var optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';
}
  
function selectOption(option) {
    // saved option value in localStorage
    localStorage.setItem('selectedOption', option);
    window.location.href = 'new_trip.html';
}
  