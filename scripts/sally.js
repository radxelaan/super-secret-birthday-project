let mike;
let gob;
let gobPos;
let down = false;
let count = 0;
let wait = false;
let waitTime;
let prevWait=0;
let keyCodes = ['87', '65', '83', '68', '81', '69', '82', '84', '89', '73', '74', '75', '76', '90', '88'];
let keyLabels = ['W', 'A', 'S', 'D', 'Q', 'E', 'R', 'T', 'Y', 'I', 'J', 'K', 'L', 'Z', 'X'];
let key;
let command;
let strikes = 0;
let mikeFlag=false;
let mikePos;

function start(){
    let audio = document.getElementsByTagName("audio")[0];
    audio.volume = '0.2';
    audio.src = 'audio\\Bring Sally Up - Push Up Challenge with Timer.ogg';
    audio.addEventListener("loadeddata", loadedAudio);
}

function loadedAudio(){
    mike = document.getElementById("mike");
    gob = document.getElementById("goblin");
    mike.src = "images\\mikeUp.png";
    mikePos = mike.src.split("images/")[1];
    let go = document.getElementById("go");
    mike.onload = function(){
        if(!mikeFlag){
            mikeFlag = true;
            setTimeout(function(){
                go.src = "images\\4.png"
                setTimeout(function(){
                    go.src = "images\\3.png"
                    setTimeout(function(){
                        go.src = "images\\2.png"
                        setTimeout(function(){
                            go.src = "images\\1.png"
                            setTimeout(function(){
                                go.src = "images\\go.png";
                                go.onload = function(){
                                    go.style.marginLeft = "37%";
                                    go.style.marginTop = "5%";
                                }
                                bringSallyUp();
                                getReadyMike();
                                setTimeout(function(){
                                    go.style.visibility = "hidden";
                                    key = document.getElementById("key");
                                    key.style.visibility = "visible";
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    }
}

async function bringSallyUp() {
    gobPos = gob.src.split("images/")[1];
    mikePos = mike.src.split("images/")[1];
    if (gobPos == "sarabacharMid.png"){
        waitTime = 200;
        if(count == 29 && down && text.src.split("images/")[1] != "defeat.png"){
            waitTime = 1000;
            gobPos = "sarabacharDefeat1.png";
            victory();
        }
    }
    else if(gobPos == "sarabacharDefeat1.png" || gobPos == "sarabacharDefeat2.png"){
        waitTime = 200;
    }
    else{
        waitTime = 1400;
    }
    if(prevWait<2500){
        if(gobPos == "sarabacharDown.png" && (count == 8 || count == 13 || count == 18 || count == 30)){
            waitTime = 8700;
            wait = true;
        }
        else if(gobPos == "sarabacharDown.png" && count>=1){
            waitTime = 2700;
            wait = true;
        }
    }
    else{
        wait = false;
    }

    setTimeout(function(){
        if(!wait && gobPos == "sarabacharUp.png"){
            gob.src = "images\\sarabacharMid.png";
        }
        else if (!wait && gobPos == "sarabacharMid.png" && !down){
            gob.src = "images\\sarabacharDown.png";
            setTimeout(function(){
                command = Math.floor(Math.random()*keyCodes.length);
                key.innerHTML = keyLabels[command];
            }, 700);
            setTimeout(function(){
                down = true;
                if(text.src.split("images/")[1] != "defeat.png" && mikePos == "mikeUp.png"){
                    penalty();
                }
            }, 175);
        }
        else if (!wait && gobPos == "sarabacharMid.png"){
            gob.src = "images\\sarabacharUp.png";
            count++;
            setTimeout(function(){
                command = Math.floor(Math.random()*keyCodes.length);
                key.innerHTML = keyLabels[command];
            }, 700);
            setTimeout(function(){
                down = false;
                if(text.src.split("images/")[1] != "defeat.png" && mikePos == "mikeDown.png"){
                    penalty();
                }
            }, 175);
        }
        else if (gobPos == "sarabacharDefeat1.png") {
            gob.src = "images\\sarabacharDefeat2.png";
        }
        else if (gobPos == "sarabacharDefeat2.png") {
            gob.src = "images\\sarabacharDefeat1.png";
        }
        else if (!wait && gobPos != "sarabacharDefeat2.png" && gobPos != "sarabacharDefeat2.png") {
            gob.src = "images\\sarabacharMid.png";
        }
        prevWait = waitTime;
        key.style.backgroundColor = "aquamarine";
        bringSallyUp()
    }, waitTime);
}

function getReadyMike(){
   setTimeout(function(){
        mike.src = "images\\mikeMid.png";
        setTimeout(function(){
            mike.src = "images\\mikeDown.png";
            document.addEventListener("keydown", keyDownHandler);
        }, 200);
    }, 1400);
}

function keyDownHandler(e){
    let text = document.getElementById("text");
    if(e.keyCode == keyCodes[command] && mikePos == "mikeUp.png" && !down){
        mikePos = "mikeDown.png";
        mike.src = "images\\mikeMid.png";
        key.style.backgroundColor = "lime";
        text.src = "images\\good.png";
        text.style.visibility = "visible";
        setTimeout(function(){
            text.style.visibility = "hidden";
        }, 400);
        setTimeout(function(){
            mike.src = "images\\mikeDown.png";
        }, 200);
    }
    else if(!wait && e.keyCode == keyCodes[command] && mikePos == "mikeDown.png" && down){
        mikePos = "mikeUp.png";
        mike.src = "images\\mikeMid.png";
        key.style.backgroundColor = "lime";
        text.src = "images\\good.png";
        text.style.visibility = "visible";
        setTimeout(function(){
            text.style.visibility = "hidden";
        }, 400);
        setTimeout(function(){
            mike.src = "images\\mikeUp.png";
        }, 200);
    }
    else if(gobPos != "sarabacharDefeat1.png" && gobPos != "sarabacharDefeat2.png"){
        penalty();
    }

}

function victory(){
    setTimeout(function(){
        document.removeEventListener("keydown", keyDownHandler);
        key.style.visibility = "hidden";
    }, 2000);
    setTimeout(function(){
        document.getElementsByTagName("audio")[0].src = "audio\\Boss Win - WarioWare, Inc. Mega Microgames! (OST).ogg";
        document.getElementsByTagName("audio")[0].loop=false
        text.style.visibility = "visible";
        text.src = "images\\victory.png";
        text.onload = function(){
            text.style.width= "500px";
            text.style.marginLeft= "40%";
        }
        setTimeout(function(){
            document.getElementById('tattoo').style.visibility = 'visible';
            document.getElementById('tattoo').classList.add('transition');
        }, 3000);
    }, 13000 );
}

function defeat(){
    document.removeEventListener("keydown", keyDownHandler);
    document.getElementsByTagName("audio")[0].pause();
    setTimeout(function(){
        document.getElementsByTagName("audio")[0].src = "audio\\Boss Loss - WarioWare, Inc. Mega Microgames! (OST).ogg";
        document.getElementsByTagName("audio")[0].loop=false
        text.style.visibility = "visible";
        text.src = "images\\defeat.png";
        text.onload = function(){
            text.style.width= "500px";
            text.style.marginLeft= "40%";
        }
    }, 300);
}

function penalty(){
    strikes++;
    key.style.backgroundColor = "red";
    text.src = "images\\wrong.png";
    text.style.visibility = "visible";
    setTimeout(function(){
        text.style.visibility = "hidden";
    }, 200);
    if(strikes>=3){
        defeat();
    }
}