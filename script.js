let filter={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    }
    ,
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    greyscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sephia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}

const filterContainer = document.querySelector(".filters");

const inputImage=document.querySelector("#file-input");
const canvas=document.querySelector("#canvas");
const canvasCtx=canvas.getContext("2d");
const file=null;
let image=null;
const resetBtn=document.getElementById("reset-btn");
const downloadBtn=document.getElementById("download-btn");
const presetContainer=document.querySelector(".preset-btns");
 
function createFilterElement(name, unit="%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const label = document.createElement("label");
    label.innerText = name;

    div.appendChild(label);
    div.appendChild(input);

    input.addEventListener("input", (event)=>{
        filter[name].value=input.value;
        applyFilter();
    });

    return div;
}

function defaultValues(){
    Object.keys(filter).forEach(key=>{
        const filterElement=createFilterElement(key, filter[key].unit, filter[key].value, filter[key].min, filter[key].max);
        filterContainer.appendChild(filterElement);
    });
}
defaultValues();


inputImage.addEventListener("change", (event)=>{
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder");
    imagePlaceholder.style.display = "none";
    canvas.style.display="block";
    let img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload =()=>{
        image = img;   
        canvas.width = img.width;
        canvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    } // image onload is used to load a image from my local machine in a new img tag created by javascript
});

function applyFilter(){
    canvasCtx.clearRect(0,0,canvas.width, canvas.height);

    canvasCtx.filter = `brightness(${filter.brightness.value}${filter.brightness.unit})
        contrast(${filter.contrast.value}${filter.contrast.unit})
        saturate(${filter.saturation.value}${filter.saturation.unit})
        hue-rotate(${filter.hueRotation.value}${filter.hueRotation.unit})
        blur(${filter.blur.value}${filter.blur.unit})
        grayscale(${filter.greyscale.value}${filter.greyscale.unit})
        sepia(${filter.sephia.value}${filter.sephia.unit})
        opacity(${filter.opacity.value}${filter.opacity.unit})
        invert(${filter.invert.value}${filter.invert.unit})`

    canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click",()=>{
    filter={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    }
    ,
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    greyscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sephia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}
filterContainer.innerHTML="";

defaultValues();
applyFilter();
})

downloadBtn.addEventListener("click", ()=>{
    const a=document.createElement("a");
    a.href=canvas.toDataURL();
    a.download="edited-img.png";
    a.click();
})

const filterPresets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 90,
        contrast: 150,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        greyscale: 5,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        greyscale: 10,
        sephia: 35,
        opacity: 100,
        invert: 0
    },

    coolTones: {
        brightness: 100,
        contrast: 105,
        saturation: 90,
        hueRotation: 190,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    warmTones: {
        brightness: 105,
        contrast: 105,
        saturation: 115,
        hueRotation: 10,
        blur: 0,
        greyscale: 0,
        sephia: 15,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 135,
        saturation: 85,
        hueRotation: 0,
        blur: 0,
        greyscale: 8,
        sephia: 10,
        opacity: 100,
        invert: 0
    },

    blackAndWhite: {
        brightness: 105,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        greyscale: 100,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 75,
        hueRotation: 0,
        blur: 0,
        greyscale: 10,
        sephia: 5,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 75,
        contrast: 140,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        greyscale: 10,
        sephia: 5,
        opacity: 100,
        invert: 0
    },

    bright: {
        brightness: 130,
        contrast: 105,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    soft: {
        brightness: 115,
        contrast: 85,
        saturation: 90,
        hueRotation: 0,
        blur: 1,
        greyscale: 5,
        sephia: 5,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 90,
        saturation: 85,
        hueRotation: 350,
        blur: 0,
        greyscale: 15,
        sephia: 30,
        opacity: 100,
        invert: 0
    },

    sunset: {
        brightness: 105,
        contrast: 110,
        saturation: 125,
        hueRotation: 15,
        blur: 0,
        greyscale: 0,
        sephia: 20,
        opacity: 100,
        invert: 0
    },

    forest: {
        brightness: 95,
        contrast: 115,
        saturation: 120,
        hueRotation: 80,
        blur: 0,
        greyscale: 0,
        sephia: 5,
        opacity: 100,
        invert: 0
    },

    ocean: {
        brightness: 105,
        contrast: 110,
        saturation: 115,
        hueRotation: 180,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 85,
        contrast: 160,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        greyscale: 100,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 120,
        contrast: 80,
        saturation: 90,
        hueRotation: 340,
        blur: 1,
        greyscale: 5,
        sephia: 5,
        opacity: 100,
        invert: 0
    },

    pastel: {
        brightness: 115,
        contrast: 85,
        saturation: 75,
        hueRotation: 350,
        blur: 0,
        greyscale: 5,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    vivid: {
        brightness: 105,
        contrast: 120,
        saturation: 170,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    highContrast: {
        brightness: 100,
        contrast: 180,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    fadedFilm: {
        brightness: 108,
        contrast: 75,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        greyscale: 12,
        sephia: 18,
        opacity: 95,
        invert: 0
    },

    cyberpunk: {
        brightness: 100,
        contrast: 140,
        saturation: 150,
        hueRotation: 270,
        blur: 0,
        greyscale: 0,
        sephia: 0,
        opacity: 100,
        invert: 0
    },

    goldenHour: {
        brightness: 115,
        contrast: 105,
        saturation: 120,
        hueRotation: 25,
        blur: 0,
        greyscale: 0,
        sephia: 25,
        opacity: 100,
        invert: 0
    },

    matte: {
        brightness: 105,
        contrast: 75,
        saturation: 85,
        hueRotation: 0,
        blur: 0,
        greyscale: 5,
        sephia: 8,
        opacity: 100,
        invert: 0
    }
}

Object.keys(filterPresets).forEach(presetName =>{
    const presetButton=document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText=presetName;
    presetContainer.appendChild(presetButton);
    presetButton.addEventListener("click",()=>{
        const applypreset=filterPresets[presetName];
        Object.keys(applypreset).forEach(presetName=>{
            filter[presetName].value=applypreset[presetName];
        })
        applyFilter();
    })
});

