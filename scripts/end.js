let credits = ['Programmers&Sandra&Nerobableki&DJ Aboo', 'Art Direction&Marius&Bing AI', 'Production&Alexa&Bableki', 'Writing&J.R.R Tolkien&Marios-Ioannis', 'Music&Toby Fox&Nintendo&Mozart', 'Localization&Beanis&Babiniotis', 'Marketing&Junny&D', 'Trivia Game&Mr. Wiki&Saint George','Chess Game&WimbleBimble&Garry Kasparov&IBM', 'Sally Up Game&Marios&Sarabachar&Sally', 'Hamster Game&Alex&Hampter&HManaSu', 'Stars Game&Alexandra&NASA&Solanum','Special Thanks&Junny&D', 'Binis&Andrew', 'F1 Skatzoxeiros&ManaSu', 'Thanks for playing!'];
let creditIndex = 0;
let credit1;
let credit2;

function epilogue(){
    credit1 = document.getElementById('credit1');
    credit2 = document.getElementById('credit2');
    document.body.style.backgroundColor = 'black';
    document.getElementById('flash2').classList.toggle('fadein');
    setTimeout(function(){
        document.getElementById('flash2').style.visibility = 'hidden';
        document.getElementById('flash2').classList.remove('fadein');
        cons = document.getElementById("console");
        cons.style.zIndex = '1001';
        cons.style.visibility = 'visible';
        script = ['Offer the items you have gathered?#a.Yes#b.No&'];
        outcomes = ["+", "-"];
        start();
    }, 2000);
}

function teleportToRoom(){
    output.innerHTML ='';
    document.body.style.backgroundImage = 'url("images/room.png")';
    cons.style.visibility = 'hidden';
    cons.style.zIndex = '9999';
    document.getElementById('flash2').classList.toggle('fadein');
    document.getElementById('flash').style.visibility = 'hidden';
    document.getElementById('flash2').style.visibility = 'hidden';
    setTimeout(function(){
        document.getElementById('flash2').classList.remove('fadein');
        cons.style.visibility = 'visible';
        script = ['Mike: ...and that\'s what happened!/Junny: Mike.../Junny: Tell me something.../Junny: How much kalamatiano did you do to trip this hard?/Mike: I\'m telling you it really happened! I\'m not lying!/Mike: At least it felt real.../Junny: So what, am I supposed to believe that you are some enlightened being now?/Junny: Come on Mike, stop pulling my leg./Mike: Ok, maybe you are right.../Junny: Come on, I\'ll show you how "Sally Up" is actually done./ $'];
        eventCount = 16;
        start();
    }, 2000);
}

function teleportToRoom2(){
    output.innerHTML ='';
    document.body.style.backgroundImage = 'url("images/room.png")';
    cons.style.visibility = 'hidden';
    cons.style.zIndex = '9999';
    document.getElementById('flash2').classList.toggle('fadein');
    document.getElementById('flash').style.visibility = 'hidden';
    document.getElementById('flash2').style.visibility = 'hidden';
    setTimeout(function(){
        document.getElementById('flash2').classList.remove('fadein');
        cons.style.visibility = 'visible';
        script = ['Mike: ...and that\'s what happened!/Junny: Mike.../Junny: Tell me something.../Junny: How much kalamatiano did you do to trip this hard?/Mike: I\'m telling you it really happened! I\'m not lying!/Junny: So what, am I supposed to believe that you are some enlightened being now?/Junny: Come on Mike, stop pulling my leg./Mike: Ok then how do you explain all this stuff?/ *Mike shows the wine, magazine page, Polaretti tattoo, piece of pi and Nomai mask*/Junny: Really? A bottle of wine, an old torn page, a tattoo for kids, some random piece of pie and a fake mask?/Junny: You could probably find all that at a place like Jumbo for like 10€./Mike: I bet Binis will believe me, he\'ll understand./ Junny: H mana sou will understand./Junny: .../Junny: Ok, that was uncalled for. Sorry./Junny: Fine let\'s go ask him./ $'];
        eventCount = 13;
        start();
    }, 2000);
}

function rollCredits(){
    document.getElementsByTagName("audio")[0].src = "audio/Kirby Super Star Credits.ogg";
    document.getElementsByTagName("audio")[0].loop=false;
    document.getElementsByTagName("audio")[0].volume = '0.45';
    cons.style.visibility = 'hidden';
    document.body.style.backgroundImage = 'url("images/bg3.jpg")';
    setTimeout(function(){
        document.getElementById('flash2').classList.toggle('fadein');
        document.getElementById('flash2').style.visibility = 'hidden';
        setTimeout(function(){
            document.getElementById('flash').style.visibility = 'hidden';
            setTimeout(function(){
                changeCredits();
            }, 10000);
        }, 2000);
    }, 3000);
}

function changeCredits(){
    document.getElementById('credits').style.visibility = 'invisible';
    setTimeout(function(){
        document.getElementById('credits').style.visibility = 'visible';
        if(creditIndex < credits.length){
            credit1.innerHTML = credits[creditIndex].replaceAll('&', '<br/>');
            credit2.innerHTML = credits[creditIndex + 1].replaceAll('&', '<br/>');
            setTimeout(function(){
                document.getElementById('credits').style.visibility = 'hidden';
                creditIndex += 2;
                changeCredits();
            }, 3000);
        }
        else{
            if(credit2){
                credit2.remove();
            }
            credit1.style.float = 'none';
            credit1.style.fontSize = '5rem';
            credit1.style.marginLeft = '0';
            credit1.innerHTML = 'Happy Birthday Mike!';
        }
    }, 1000);
}