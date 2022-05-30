let form = document.querySelector(".myForm");
let mainCards = document.querySelector(".mainCards");

form.addEventListener("submit", async function (e) {
 e.preventDefault();

 mainCards.innerHTML = "";

 let array = [];

 let dateI = document.querySelector("#date");
 let cityI = document.querySelector("#city");
 let dateArray = dateI.value.split("-");

 let x = await fetch(`http://api.aladhan.com/v1/calendarByCity?city=${cityI.options[cityI.selectedIndex].text}&country=${cityI.value}&method=2&month=${dateArray[1]}&year=${dateArray[0]}`);
 let resp = await x.json();

 resp.data.forEach(element => {
  let {timings, date} = {...element};

  array.push({
   timings: timings,
   date: date,
  })
 });

 array.splice(0,Number(dateArray[2] - 1))

 createCard(array);
})

function createCard(array) {
 array.map(n => {
  mainCards.innerHTML += `<div class="col-lg-4 m-1">
  <div class="card">
   <div class="card-header">
     ${n.date.readable}
   </div>
   <ul class="list-group list-group-flush">
     <li class="list-group-item">Asr: ${n.timings.Asr}</li>
     <li class="list-group-item">Dhuhr: ${n.timings.Dhuhr}}</li>
     <li class="list-group-item">Fajr: ${n.timings.Fajr}}</li>
     <li class="list-group-item">Imsak: ${n.timings.Imsak}}</li>
     <li class="list-group-item">Isha: ${n.timings.Isha}}</li>
     <li class="list-group-item">Maghrib: ${n.timings.Maghrib}}</li>
     <li class="list-group-item">Midnight: ${n.timings.Midnight}}</li>
     <li class="list-group-item">Sunrise: ${n.timings.Sunrise}}</li>
     <li class="list-group-item">Sunset: ${n.timings.Sunset}}</li>
   </ul>
  </div>`
 })
}