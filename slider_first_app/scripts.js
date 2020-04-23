let data = {

    0: {
        photo: './images/wallpaper-dragon-ball-z_6800934_small.jpg',
        title: 'Freeze saga',
        description: 'The Frieza Saga is the second major plot arc of the Dragon Ball Z anime. The manga volumes that it is made up of are "The Wrath of Freeza", "Goku vs. Freeza", and "The Super Saiyan".'
    },

    1: {
        photo: './images/efab1df83cc569cbb9bd3880ed162859_small.jpg',
        title: 'Cell saga',
        description: 'Perfect Cell Saga is the ninth saga of the Dragon Ball Z series. The manga volume that it is made up of is "The Room Of Spirit And Time". The saga is about Semi-Perfect Cell continuing his quest to reach his Perfect Form.'
    },
    2: {
        photo: './images/257_small.jpg',
        title: 'Boo saga (The Majin Buu Saga )',
        description: 'The Majin Buu Saga is the fourth major plot arc from the Dragon Ball Z series. The manga volume that it is made up of is "Boo Unleashed".',
        
    },

};

let count = 0;
let obj_lenght = Object.keys(data).length;
let root = document.documentElement;

const imageLoader = ((poz) => {

    

    let imageBg = document.querySelector('.slider-image');
    let title = document.querySelector('.image-desc-bg h2');
    let desc = document.querySelector('.image-desc-bg p');
    let divThumb = document.querySelectorAll('.thumbnails div');

    imageBg.classList.remove('active_slide');

    if(typeof(poz) !== 'number' && poz.target.getAttribute('data-slider-poz') !== null){

        console.log(poz.target.getAttribute('data-slider-poz'));
        poz =  poz.target.getAttribute('data-slider-poz');
       } else if(typeof(poz) !== 'number'){
         //  nemPoz++;
         return;
       }

    divThumb.forEach(element => {

            if(element.getAttribute('class').indexOf(poz) > -1) {
               element.classList.add('active');

            }else{
                element.classList.remove('active');
            }
       
    });

    imageBg.classList.add('active_slide');

     root.style.setProperty('--after-bg',`${imageBg.style.backgroundImage}`);

    //console.log(imageBg.style);

    imageBg.style.cssText = `background-image: url(${data[poz].photo})`;
    title.textContent = data[poz].title;
    desc.textContent = data[poz].description;


    setTimeout(()=>{
       imageBg.classList.remove('active_slide');
    },1000)

});

imageLoader(0);

const counter = ((e) => {
    // 
    if (e.target.className === 'next') {
        count++;
        root.style.setProperty('--slider-direction','850px');

    } else if (e.target.className === 'previous') {
        count--;
        root.style.setProperty('--slider-direction','-850px');
    }

    if (count > (obj_lenght - 1)) {
        count = 0;
    } else if (count < 0) {
        count = (obj_lenght - 1);
    }

    imageLoader(count);

});

const thumb = ((pozicio) => {
    let thumbDOM = document.querySelector('.thumbnails');
    let addCss ="";
  
    Object.keys(data).forEach((element) => {
        if(pozicio == Number(element)){
            addCss = 'active';
        }else {
            addCss = '';
        }       
         thumbDOM.innerHTML += `<div class="thum-${element} ${addCss} " data-slider-poz="${element}" style="background-image: url(${data[element].photo})"> <span> ${data[element].title} </span> </div>`;

         setTimeout(()=>{
            document.querySelectorAll('.thumbnails div span')[element].style.cssText = `margin-left:-${document.querySelectorAll('.thumbnails div span')[element].offsetWidth / 2}px`;
         },100)

    });



});
thumb(0);

document.querySelector('.next').addEventListener('click', counter);
document.querySelector('.previous').addEventListener('click', counter);
document.querySelector('.thumbnails').addEventListener('click', imageLoader);

document.querySelector('body').addEventListener('keyup',(e)=>{
        if(e.key === 'ArrowRight'){
            document.querySelector('.next').click()
        }else if(e.key === 'ArrowLeft'){
            document.querySelector('.previous').click()
        }
});

