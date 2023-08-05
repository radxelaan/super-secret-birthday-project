code = Math.floor(Math.random() * (9999 - 1000) + 1000).toString()
let flag = false;

function blink(image, time, counter){
  image.style.opacity = image.style.opacity == 1 ? 0.3 : 1
  if (counter == time.length - 1 || !counter){
    sparkle(image)
  }
  setTimeout(function() {
    blink(image, time, (counter + 1) % time.length)
  }, time[counter]*150)
  if(!flag){
    flag = true;
    document.getElementById('flash2').classList.toggle('fadein');
    setTimeout(function(){
        document.getElementById('flash2').style.visibility = 'hidden';
        document.getElementById('flash2').classList.remove('fadein');
        cons = document.getElementById("console");
        cons.style.visibility = 'visible';
        script = ['test/ $'];
        eventCount = 10;
        start();
    }, 2000);
  }
}

function sparkle(starImage){
  const sparkleImage = document.getElementById(`sparkle${starImage.id.slice(-1)}`)
  if (sparkleImage == null) return
  sparkleImage.style.opacity = 1 - starImage.style.opacity
}

function morseEncode(x) {
  switch (x) {
    case '1':
      return [1,1,3,1,3,1,3,1,3];
    case '2':
      return [1,1,1,1,3,1,3,1,3];
    case '3':
      return [1,1,1,1,1,1,3,1,3];
    case '4':
      return [1,1,1,1,1,1,1,1,3];
    case '5':
      return [1,1,1,1,1,1,1,1,1];
    case '6':
      return [3,1,1,1,1,1,1,1,1];
    case '7':
      return [3,1,3,1,1,1,1,1,1];
    case '8':
      return [3,1,3,1,3,1,1,1,1];
    case '9':
      return [3,1,3,1,3,1,3,1,1];
    case '0':
      return [3,1,3,1,3,1,3,1,3];
    default:
      process.exit(0);
  }
}

function morse(word){
  let res = []
  word.split('').forEach(letter => {
    res.push(...morseEncode(letter),4)
  })
  return res
}

function validateForm() {
  const input1 = document.forms["codeInput"]["input1"].value;
  const input2 = document.forms["codeInput"]["input2"].value;
  const input3 = document.forms["codeInput"]["input3"].value;
  const input4 = document.forms["codeInput"]["input4"].value;
  if (input1 === code[0] && input2 === code[1] && input3 === code[2] && input4 === code[3]) {
    flashScreen();
    setTimeout(function(){
      document.getElementById('flash').classList.toggle('fadeout');
      document.getElementById('flash2').style.visibility = 'visible';
      setTimeout(function(){
          cons = document.getElementById("console");
          cons.style.zIndex = '10001';
          cons.style.visibility = 'visible';
          output.innerHTML = '';
          script = ['(You feel like you are closer to discovering the truth of the universe)/ $'];
          start();
      }, 1000);
  }, 2000);
  document.getElementsByClassName('form')[0].style.visibility = 'hidden';
  document.getElementById('submit').remove();
    return false;
  }
  alert("Try again");
    return false;
}

function formVisible(){
  cons.style.visibility = 'hidden';
  document.getElementsByClassName('form')[0].style.visibility = 'visible';
}

function getMask(){

  document.getElementById('flash2').classList.toggle('fadein');
  document.getElementById('flash').style.visibility = 'hidden';
  document.getElementById('flash2').style.visibility = 'hidden';
  cons.style.visibility = 'hidden';
  cons.style.zIndex = '9999';
  setTimeout(function(){
    document.getElementById('mask').style.visibility = 'visible';
    document.getElementById('mask').classList.add('transition-rotate');
    setTimeout(function(){
        let ui = document.getElementById('ui');
        ui.style.visibility = 'visible';
        ui.style.marginLeft = '30%';
        ui.style.marginTop = '0%';
        ui.src = 'images\\maskGet.png';
        document.addEventListener('keydown', itemGet);
    }, 1000);
  }, 3000);
}

function nextChapter(){
  document.getElementById('mask').classList.remove('transition-rotate');
  document.getElementById('mask').style.visibility = 'hidden';
  setTimeout(function(){
    cons.style.visibility = 'visible';
    document.getElementById('text').innerHTML = '';
    script = ['(You feel like time and space start warping around you...)/ $'];
    start();
}, 2000);
}