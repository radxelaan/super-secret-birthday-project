let down = true;
let count = 0;
let wait = false;
let waitTime;
let prevWait=0;

function start(){
    document.getElementsByTagName("audio")[0].volume = '0.2';
    let go = document.getElementById("go");
    setTimeout(function(){
        go.src = "images\\4.png"
        setTimeout(function(){
            go.src = "images\\3.png"
            setTimeout(function(){
                go.src = "images\\2.png"
                setTimeout(function(){
                    go.src = "images\\1.png"
                    setTimeout(function(){
                        go.style.marginLeft = "37%";
                        go.style.marginTop = "5%";
                        go.src = "images\\go.png";
                        bringSallyUp();
                        setTimeout(function(){
                            go.style.visibility = "hidden";
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

async function bringSallyUp() {
    let gob = document.getElementById("goblin");
    let gobPos = gob.src.split("images/")[1];
    if (gobPos == "sarabacharMid.png" || gobPos == "sarabacharDefeat1.png" || gobPos == "sarabacharDefeat2.png"){
        waitTime = 200;
        if(count == 29 && !down){
            waitTime = 1000;
            gobPos = "sarabacharDefeat1.png";
            count++;
        }
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
            down = true;
        }
        else if (!wait && gobPos == "sarabacharMid.png" && down){
            gob.src = "images\\sarabacharDown.png";
        }
        else if (!wait && gobPos == "sarabacharMid.png"){
            gob.src = "images\\sarabacharUp.png";
            count++;
        }
        else if (gobPos == "sarabacharDefeat1.png") {
            gob.src = "images\\sarabacharDefeat2.png";
        }
        else if (gobPos == "sarabacharDefeat2.png") {
            gob.src = "images\\sarabacharDefeat1.png";
        }
        else if (!wait && gobPos != "sarabacharDefeat2.png" && gobPos != "sarabacharDefeat2.png") {
            gob.src = "images\\sarabacharMid.png";
            down = false;
        }
        prevWait = waitTime;
        bringSallyUp()
    }, waitTime);
}