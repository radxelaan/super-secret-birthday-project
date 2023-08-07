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

function enterTavern(){
    document.getElementById('flash2').classList.toggle('fadein');
    setTimeout(function(){
        cons = document.getElementById("console");
        document.getElementById('flash2').style.visibility = 'hidden';
        cons.style.visibility = 'visible';
        script = ['Mike: That was close./Mike: Now where am I this time? Some kind of tavern./Mike: Oh well as long as I have my phone with me I won\'t need anything else! /Mike: *checks pockets*/Mike: I don\'t have my phone!!!/Goblin: What is all this fuss about here huh?/Goblin: You are disturbing my customers human! /Mike: Nice cosplay! Are you a goblin?/Goblin: C-cosplay? What is cosplay?/Goblin: Are you making fun of me!? Goblin: I, Sarabachar, will not tolerate your insults human! /Sarabachar: I challenge you to a competition of strength to teach you a lesson!/Mike: (Oh I get it! There is some kind of roleplaying going on here!)/Mike: And I, Eladorian Eraisuithon accept your challenge, goblin! /$'];
        eventCount = 8;
        start();
    }, 2000);
}

function sally(){
    cons.style.visibility = 'hidden';
    let audio = document.getElementsByTagName("audio")[0];
    audio.volume = '0.2';
    audio.src = 'audio\\Bring Sally Up - Push Up Challenge with Timer.ogg';
    audio.addEventListener("loadeddata", loadedAudio);
}

function loadedAudio(){
    mike = document.getElementById("mike");
    gob = document.getElementById("goblin");
    mike.src = "images\\mikeUp.png";
    mike.style.visibility = 'visible';
    gob.style.visibility = 'visible'; 
    mikePos = mike.src.split("images/")[1];
    let go = document.getElementById("go");
    mike.onload = function(){
        if(!mikeFlag){
            go.style.visibility = 'visible';
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
                                    setTimeout(function(){
                                        command = Math.floor(Math.random()*keyCodes.length);
                                        key.innerHTML = keyLabels[command];
                                    }, 1000);
                                    setTimeout(function(){
                                    }, 1000);
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
        if(count == 1 && down && ui.src.split("images/")[1] != "defeat.png"){
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
            setTimeout(function(){
                command = Math.floor(Math.random()*keyCodes.length);
                key.innerHTML = keyLabels[command];
            }, 3000);
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
                key.innerHTML ='';
            }, 350);
            setTimeout(function(){
                down = true;
                if(ui.src.split("images/")[1] != "defeat.png" && mikePos == "mikeUp.png"){
                    penalty();
                }
            }, 175);
        }
        else if (!wait && gobPos == "sarabacharMid.png"){
            setTimeout(function(){
                command = Math.floor(Math.random()*keyCodes.length);
                key.innerHTML = keyLabels[command];
            }, 700);
            gob.src = "images\\sarabacharUp.png";
            count++;
            setTimeout(function(){
                down = false;
                if(ui.src.split("images/")[1] != "defeat.png" && mikePos == "mikeDown.png"){
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
    let ui = document.getElementById("ui");
    if(e.keyCode == keyCodes[command] && mikePos == "mikeUp.png" && !down){
        mikePos = "mikeDown.png";
        mike.src = "images\\mikeMid.png";
        key.style.backgroundColor = "lime";
        ui.src = "images\\good.png";
        ui.style.visibility = "visible";
        setTimeout(function(){
            ui.style.visibility = "hidden";
        }, 800);
        setTimeout(function(){
            mike.src = "images\\mikeDown.png";
        }, 200);
    }
    else if(!wait && e.keyCode == keyCodes[command] && mikePos == "mikeDown.png" && down){
        mikePos = "mikeUp.png";
        mike.src = "images\\mikeMid.png";
        key.style.backgroundColor = "lime";
        ui.src = "images\\good.png";
        ui.style.visibility = "visible";
        setTimeout(function(){
            ui.style.visibility = "hidden";
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
        ui.style.visibility = "visible";
        ui.src = "images\\victory.png";
        ui.onload = function(){
            ui.style.width= "500px";
            ui.style.marginLeft= "40%";
        }
        setTimeout(function(){
            ui.style.visibility = "hidden";
            ui.src = 'images\\polarettiGet.png';
            ui.onload = function(){
                document.getElementById('tattoo').style.visibility = 'visible';
                document.getElementById('tattoo').classList.add('transition-rotate');
                setTimeout(function(){
                    let ui = document.getElementById('ui');
                    ui.style.visibility = 'visible';
                    ui.style.marginLeft = '30%';
                    ui.style.marginTop = '0%';
                    document.addEventListener('keydown', itemGet);
                }, 1000);
            }
        }, 3000);
    }, 13000 );
}

function defeat(){
    document.removeEventListener("keydown", keyDownHandler);
    document.getElementsByTagName("audio")[0].pause();
    setTimeout(function(){
        document.getElementsByTagName("audio")[0].src = "audio\\Boss Loss - WarioWare, Inc. Mega Microgames! (OST).ogg";
        document.getElementsByTagName("audio")[0].loop=false
        ui.style.visibility = "visible";
        ui.src = "images\\defeat.png";
        ui.onload = function(){
            ui.style.width= "500px";
            ui.style.marginLeft= "40%";
        }
    }, 300);
}

function penalty(){
    strikes++;
    key.style.backgroundColor = "red";
    ui.src = "images\\wrong.png";
    ui.style.visibility = "visible";
    setTimeout(function(){
        ui.style.visibility = "hidden";
    }, 800);
    if(strikes>=3){
        defeat();
    }
}

function nextChapter(){
    document.getElementById('tattoo').classList.remove('transition-rotate');
    document.getElementById('tattoo').style.visibility = 'hidden';
    setTimeout(function(){
        mike.style.visibility = 'hidden';
        gob.style.visibility = 'hidden';
        key.style.visibility = 'hidden';
    }, 1000);
    setTimeout(function(){
        cons.style.visibility = 'visible';
        document.getElementById('text').innerHTML = '';
        script = ['Sarabachar: Sarabachar admits defeat! /Sarabachar: Sarabachar is sorry! This prize is one that is given only to true champions./ Wear it with pride, Eladorian Eraisuithon! /Eladorian: Thank you, o worthy adversary! I will not forget thy gift!/ Farewell!/ $'];
        start();
    }, 2000);
}