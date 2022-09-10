const SOUND_STEP_1 = 0;
const SOUND_STEP_2 = 1;
const SOUND_FRYING = 2;
const SOUND_PICK_UP = 3;
const SOUND_DROP = 4;
const SOUND_BLIP = 5;
const SOUND_SPEAK_1 = 6;
const SOUND_SPEAK_2 = 7;

let _sounds = [
    [.6,0,392,.01,,.03,2,.8,,,,,,5,,,,.3], // SOUND_STEP_1
    [.6,0,440,.01,,.03,2,.8,,,,,,5,,,,.3], // SOUND_STEP_2
    [.3,0,,.5,,2,4,,,,550,,,3.6], // SOUND_FRYING
    [,,40,.02,.02,,,.4,3.2,,,,,.8,,,,.7,.02], // SOUND_PICK_UP
    [,0,170,.02,.02,,,.3,-4,,,,,,,,,.7,.03], // SOUND_DROP
    [.7,0,600,.01,,.07,1,,,,300,.03,,,,,,.9,.01], // SOUND_BLIP
    [,0,62,.01,.03,.05,3,,.2,1.5,,,,,2,,.12,.6], // SOUND_SPEAK_1
    [,0,128,.01,.03,.05,3,,.2,1.5,,,,,2,,.12,.6], // SOUND_SPEAK_2
];
