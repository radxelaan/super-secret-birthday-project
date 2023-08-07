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
        setTimeout(function () { showText(text.slice(1)) }, 20)
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
        switch(eventCount) {
            case 0:
                startGlitching();
                break;
            case 1:
                setTimeout(function () { 
                    window.location.replace('trivia.html');
                }, 1200)
                flashScreen();
                break;
            case 2:
                lightsOn();
                break;
            case 3:
                startQuiz();
                break;
            case 4:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('chess.html');
                }, 1200);
                break;
            case 5:
                setTimeout(function () { createBoard() }, 1000);
                break;
            case 6:
                victory();
                break;
            case 7:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('sally.html');
                }, 1200);
                break;
            case 8:
                sally();
                break;
            case 9:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('2DGame.html');
                }, 1200);
                break;
            case 10:
                cons.style.visibility = 'hidden';
                document.body.style.backgroundColor= '#1a1b26';
                load2D();
                output.innerHTML = '';
                setTimeout(function(){
                    cons.style.visibility = 'visible';
                    script = ['test/ $'];
                    start();
                }, 1000);
                break;
            case 11:
                cons.style.visibility = 'hidden';
                document.getElementById('controls').style.visibility = 'visible';
                document.getElementsByTagName("audio")[0].src = "audio\\Pokémon Contest Pokémon Ruby Sapphire.ogg";
                document.getElementsByTagName("audio")[0].volume = '0.1';
                break;
            case 12:
                setTimeout(function () { 
                    window.location.replace('stars.html');
                }, 1200);
                break;
            case 13:
                formVisible();
                break;
            case 14:
                getMask();
                break;
            case 15:
                flashScreen();
                setTimeout(function () { 
                    window.location.replace('end.html');
                }, 1200);
                break;
            case 16:
                flashScreen();
                setTimeout(function () { 
                    document.getElementById('flash').classList.toggle('fadeout');
                    document.getElementById('flash2').style.visibility = 'visible';
                    setTimeout(function () { 
                        rollCredits();
                    }, 1000);
                }, 2000);
                break;
        }
        eventCount++;
    }
    else if(text[0] === '+'){
        flashScreen();
        setTimeout(function () { 
            document.getElementById('flash').classList.toggle('fadeout');
            document.getElementById('flash2').style.visibility = 'visible';
            setTimeout(function () { 
                teleportToRoom();
            }, 1000);
        }, 2000);
    }else if(text[0] === '-'){
        flashScreen();
        setTimeout(function () { 
            document.getElementById('flash').classList.toggle('fadeout');
            document.getElementById('flash2').style.visibility = 'visible';
            setTimeout(function () { 
                teleportToRoom2();
            }, 1000);
        }, 2000);
    }
    else{
        output.innerHTML += text[0];
        cons.scrollTop = cons.scrollHeight;
        if (text.length > 1) setTimeout(function () { showText(text.slice(1)) }, 20)
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