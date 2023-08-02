let count = 0;
let corruptedText = ['S̶̪̙͙̬̈́́p̶̩̟̿̔a̵͇̔č̸̬͠ ̵̲̾ͅr̵̦̽š̴̨e̶̡͔͉͉̅̄̑̅ ̶̡̦͓͚͂̆͆Ċ̷̥̗͠ȯ̶̥̯̐d̵͇͝ē̶̻̯͍̙', 'B̶͎̙̗̣͝o̸̡͙̒̒͒a̴̧͍̻̥̕ȓ̶̫̦̹͚̿͠d̸͓̀̌ ̷̪̂̽̕͝G̷̼̖͑e̴̻͍͠ ̵̨̦̺͆̒Ṫ̶̝̭r̶̹̠̾̕a̴̢͔͍̺̍̊̄v̸̰͚͖̈́̎̈́e̴̺̞̎ĺ̴̝͘', 'M̵̡̪̒ö̵͍̲̻̫́͂r̸̲̰͓͙͝S̴̮̤̀̓̉͛p̸̹̫̥̕â̷̠̹̗͍̕c̵̢̹̭̝͆̔̀̚', 'R̴͕̙̦̆͝ȏ̷̫͙̑l̸̦̰̝̫̇̚i̶̫̮͑n̵̡̢͙̞̾̈́g̵̰̉͆̇̌-̷̦̀̇̐͑P̴̛̬͋͐̂͜l̸̫͌͝ǎ̶̡̯̰̯̌y̵̤̎̊͝Ö̴̡̮͓̞́ǘ̵͖̟̥̂̏͝ţ̸̼͐̄̆','v̴̛͕̈́ị̷̎͑T̸̳͆͋r̸͕̜͋i̶̼͖̺̊͆̈͊ą̸̼̣̟̿', 'T̷̈́̆͜ī̶̩ͅm̸̧̟̯̄̓̆͌͜ ̴̭͚͙͇̀͋̒͠G̷̡̹̤͂ä̶͈̦́m̸̛̤', 'k̵̰̜̟̻̑i̷̜̘͇̗͌͝͠ṇ̶̼͌ğ̶̰͍l̷̹͌ä̴̛͍̣̜́͋͜y̵͉͚̙̓̈i̸̘͔̜̙̎͌̉̚n̶̨͈̹̈́̓̽̉g̵̢̛̙̬͍̿̀'];

function showPopup(){
    if (document.querySelectorAll('input[type="radio"]:checked').length) {
        document.getElementById("confirm").style.visibility = 'visible';
    }
}

function hidePopup(){
    document.getElementById("confirm").style.visibility = 'hidden';
    count++;
    if(count>=5){
        document.getElementById("console2").style.visibility = 'visible';
        script = ['Urgh, every game jam these choices become more and more difficult to pick from.../I mean, it\'s as if they are specifically for me!/ I wish I could choose all of them./ That would make for an interesting game./$Uh oh... What\'s going on?/ $'];
        eventCount=2;
        start();
    }
}

function startGlitching(){
    document.getElementsByTagName("p")[0].innerHTML = "W̶̩̤͑̒͆̀h̸̳̆͆i̷̢̪̻̫̒̃̋̃c̷̟͇̹̦̍̂͠ḫ̵̢́͆ ̷̟̓͜t̵̢͔̖̅͊h̴̢͖͎̼̿̇̓e̵̺̠͎̽m̴̨̭̾̇̚è̴̮͍̀́̆ ̸̧̠̻̩͗ḑ̶̜͈̟̊͒̐̿o̶̻̔ ̶͔̽̀̑ý̴̢͖̚͝ö̶̰̪́̈́͆̋u̶̧̩̟͚̍̎ ̶̛̭͇͒̌l̶̝͓͕̓̈̋ȋ̷̙͋̽k̶̢͕͔̓ę̸̻̂̋̂ͅ ̴̢̳̣̥̆̚t̵͂͜͠h̷͕̓̀̿͜e̶̠̍ ̶̨̣̟͑̉ͅm̸̛̛̼͔̙̚o̷̯̙̒s̶̛͇͖͂̽ţ̶͇̄̀̀̑?̵̠͝͠";
    let radios = document.querySelectorAll('label');
    let i = 0;
    radios.forEach(element => {
        element.innerHTML = corruptedText[i];
        i++;
    });

    radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(element => {
        element.checked = true;
    });
    showText(remainingText.slice(1));
}

function flashScreen(){
    document.getElementById('flash').style.visibility = "visible"
    document.getElementById('flash').classList.toggle('transition');
    setTimeout(function () { 
        window.location.replace('chess.html');
    }, 1200)
}