code = Math.floor(Math.random() * (9999 - 1000) + 1000).toString()

function blink(image, time, counter){
  image.style.opacity = image.style.opacity == 1 ? 0.3 : 1
  if (counter == time.length - 1 || !counter){
    sparkle(image)
  }
  setTimeout(function() {
    blink(image, time, (counter + 1) % time.length)
  }, time[counter]*150)
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
    alert("Yay");
    return true;
  }
  alert("Try again");
    return false;
}