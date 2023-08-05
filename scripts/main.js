let script = ['Hello, this is a test./How are you doing?#a. Fine#b. Not fine :(&This is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentenceThis is a really long sentence'];
let outcomes = ['Glad to hear. Want me to show you something cool?#a.Sure#b. Nah.&', 'Oh no what\'s wrong? Want me to take you somewhere to cheer you up?#a.Yes please#b.Not really...&', '$Ta-dah! We are in space!/ Do you want to go somewhere else? #a. Sure#b. No&', 'Oh ok... I\'ll leave you alone then.', 'Here we go!$', 'Oh ok... I\'ll leave you alone then.'];
let output;
let remainingText;
let waiting = false;
let choices = Array();
let eventCount = 0;
let cons;

function start(){
    output = document.getElementById("text");
    cons = document.getElementById("console");
    showText(script[0]);
}

async function showText(text) {
    if (text[0] === '/'){
        document.addEventListener('mousedown', clickToContinue);
        document.addEventListener('keydown', clickToContinue);
        remainingText = text;
        waiting = true;
        waitForInput();
    }
    else if(text[0] === '#'){
        output.innerHTML += '<br/>';
        choices.push(text[1]);
        setTimeout(function () { showText(text.slice(1)) }, 50)
    }
    else if(text[0] === '&'){
        output.innerHTML += '<br/>> ';
        document.addEventListener('keydown', selectChoice);
        remainingText = text;
        waiting = true;
        waitForInput();
    }
    else if(text[0] === '$'){
        remainingText = text;
        console.log(eventCount)
        switch(eventCount) {
            case 0:
                startGlitching();
                break;
            case 1:
                setTimeout(function () { 
                    window.location.replace('chess.html');
                }, 1200)
                flashScreen();
                eventCount = 3;
                break;
            case 2:

            case 3:

            case 4:
                setTimeout(function () { createBoard() }, 1000);
                break;
            case 5:
                victory();
                break;
            case 6:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('sally.html');
                }, 1200);
                break;
            case 7:
                sally();
                break;
            case 8:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('stars.html');
                }, 1200);
                break;
            case 9:
                formVisible();
                break;
            case 10:
                getMask();
                break;
            case 11:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('end.html');
                }, 1200);
                break;
        }
        eventCount++;
    }
    else{
        output.innerHTML += text[0];
        if (text.length > 1) setTimeout(function () { showText(text.slice(1)) }, 50)
    }
}

function waitForInput(){
    if(waiting){
        if(remainingText[0] === '/' || remainingText[0] === '&'){
            output.innerHTML += '_';
        }
        setTimeout(function () {
            if(output.innerHTML[output.innerHTML.length - 1] === '_'){
                output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
            }
            setTimeout(function () { 
                waitForInput();
            }, 300)  
        }, 300)
    }
}

function clickToContinue(e){
    if((e.button === 0 || e.key === 'Enter' || e.key === ' ') && cons.style.visibility == 'visible'){
        document.removeEventListener('mousedown', clickToContinue);
        document.removeEventListener('keydown', clickToContinue);
        if(output.innerHTML[output.innerHTML.length - 1] === '_'){
            output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
        }
        output.innerHTML += '<br/>';
        waiting = false;
        showText(remainingText.slice(1));
    }
}

function selectChoice(e){
    if(choices.includes(e.key)){
        document.removeEventListener('keydown', selectChoice);
        if(output.innerHTML[output.innerHTML.length - 1] === '_'){
            output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
        }
        output.innerHTML += e.key + '<br/>';
        remainingText = remainingText.replace('&', outcomes[choices.indexOf(e.key)]);
        outcomes = outcomes.splice(choices.length);
        choices = Array();
        waiting = false;
        showText(remainingText);
    }
}

function itemGet(e){
    if((e.button === 0 || e.key === 'Enter' || e.key === ' ') && cons.style.visibility == 'hidden'){
        ui.style.visibility = 'hidden';
        nextChapter();
    }
}

function flashScreen(){
    document.getElementById('flash').style.visibility = "visible"
    document.getElementById('flash').classList.toggle('fadeout');
}