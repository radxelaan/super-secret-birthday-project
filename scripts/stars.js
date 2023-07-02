function changeOpacity(image, state){
    image.style.opacity = state ? 1 : 0.2
};

state = false
counter = 0
function blink(image, time){
    setTimeout(function() {
        changeOpacity(image, state)
        state = !state
        counter = (counter + 1) % time.length
        blink(image, time)
    }, time[counter]*150)

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
        res.push(...morseEncode(letter),3)
    })
    return res
}