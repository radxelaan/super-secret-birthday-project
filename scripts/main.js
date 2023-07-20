async function showText(text) {
    document.getElementById("text").innerHTML = `${document.getElementById("text").innerHTML}${text[0]}`
    if (text.length > 1) setTimeout(function () { showText(text.slice(1)) }, 90)
}

