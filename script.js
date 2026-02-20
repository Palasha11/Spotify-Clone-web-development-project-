console.log("Welcome to spotify");
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let playGif=document.getElementById('playGif');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let masterplayName=document.getElementById('masterplayName');

let songs = [
    { songName: "Tauba-Tauba", filePath: "songs/1.mp3", coverPath: "covers/1.png" },
    { songName: "Aangaroon", filePath: "songs/2.mp3", coverPath: "covers/2.png" },
    { songName: "Mere Mehboob Mere Sanam", filePath: "songs/3.mp3", coverPath: "covers/3.png" },
    { songName: "Hauli Hauli", filePath: "songs/4.mp3", coverPath: "covers/4.png" },
    { songName: "Agar Ho Tum", filePath: "songs/5.mp3", coverPath: "covers/5.png" },
    { songName: "Aayi Nai", filePath: "songs/6.mp3", coverPath: "covers/6.png" }
]
 
songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songNames")[0].innerText = songs[i].songName;
})


//audioElement.play();

//handling play pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playGif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playGif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress=parseInt((audioElement.currentTime / audioElement.duration)* 100);
    myProgressbar.value = progress;
})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressbar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
   makeAllPlays();
   songIndex=parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterplayName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    playGif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
   
})
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterplayName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterplayName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

function playNextSong(){
    songIndex=(songIndex+1)%songs.length;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.play();
    masterplayName.innerText=songs[songIndex].songName;
}

audioElement.addEventListener('ended',playNextSong);

