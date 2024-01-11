let hadith = document.getElementsByClassName("hadith");
let prev = document.getElementsByClassName("prev");
let next = document.getElementsByClassName("next");
let number= document.getElementsByClassName("number");
let surahslist = document.querySelector(".list")
let close = document.querySelector(".close");
let index = 0;

getHadith();
function getHadith(){
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-150")
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let Hadithes = data.data.hadiths;
        // console.log(Hadithes);
       hadith[0].innerHTML = Hadithes[index].arab;
       number[0].innerHTML = `${index  +1}`+'/'+'150';
    })
   
}
next[0].addEventListener("click", function(){
    index++;
    if(index > 149){
        index = 0;
    }
    getHadith();
})

prev[0].addEventListener("click", function(){
    index--;
    if(index < 0){
        index = 149;
    }
    getHadith();
})
getsurah();
function getsurah(){
fetch("https://api.alquran.cloud/v1/meta")
.then(response => response.json())
.then(data => {
    let surahs = data.data.surahs.references;
    let numSurah= 114;
    surahslist.innerHTML = "";
    for(let i =0 ;i< 114;i++)
    {
        surahslist.innerHTML+=`<div class="surah">
        <p>${surahs[i].name}</p>
        <p>${surahs[i].englishName}</p>
        <p>${surahs[i].numberOfAyahs}</p>
    </div>`
    }
    let surah = document.querySelectorAll(".surah");
    let popup = document.querySelector(".pop-up");
    let ayat=document.querySelector(".ayat");
    surah.forEach((item,index)=>{
      item.addEventListener("click",function(){
        fetch(`https://api.alquran.cloud/v1/surah/${index+1}/ar.alafasy`)
        .then(response => response.json())
        .then(data => {
            ayat.innerHTML="";
            let Ayat=data.data.ayahs;
            console.log(Ayat);
            Ayat.forEach((item,index)=>{
                popup.classList.add('active');
                ayat.innerHTML+=`<p>${item.text}</p>`
            })
            close.addEventListener("click",function(){
                popup.classList.remove('active');
            })
    })
})})})}
