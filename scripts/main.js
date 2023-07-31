let script = ['Hello, this is a test./How are you doing?#a. Fine#b. Not fine :(&'];
let outcomes = ['Glad to hear. Want me to show you something cool?#a.Sure#b. Nah.&', 'Oh no what\'s wrong? Want me to take you somewhere to cheer you up?#a.Yes please#b.Not really...&', '$Ta-dah! We are in space!', 'Oh ok... I\'ll leave you alone then.'];
let output;
let remainingText;
let waiting = false;
let choices = Array();

function start(){
    output = document.getElementById("text");
    showText(script[0]);
}

function showText(text) {
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
        output.innerHTML += '<br/>>';
        document.addEventListener('keydown', selectChoice);
        remainingText = text;
        waiting = true;
        waitForInput();
    }
    else if(text[0] === '$'){
        document.body.classList.add('transition');
        document.body.style.backgroundColor = "azure";
        setTimeout(function () { 
            document.body.classList.remove('transition');
            document.body.style.background = "url('images/bg3.jpg')";
            setTimeout(function () { showText(text.slice(1)) }, 50)
        }, 1000)
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
    if(e.button === 0 || e.key === 'Enter' || e.key === ' '){
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
            console.log(output.innerHTML)
        }
        output.innerHTML += e.key + '<br/>';
        remainingText = remainingText.replace('&', outcomes[choices.indexOf(e.key)]);
        outcomes = outcomes.splice(choices.length);
        choices = Array();
        console.log(remainingText);
        waiting = false;
        showText(remainingText);
    }
}

