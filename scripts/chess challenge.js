let selectedPiece;
let currentColor;
let turn = 0;
let validMoves = ['kl56','nl14', 'nl31', 'rl16'];
let kasparov;

function createBoard(){
    const board = document.querySelector('.board');
    board.addEventListener('mouseleave', mouseLeave);
    kasparov = document.getElementById("kasparov");
    document.getElementsByTagName("audio")[0].volume = '0.4';
    let piece, row, rowcount = 0;

    for(let i=1; i<=64; i++){
        if(i%8 == 1){
            rowcount++;

            row = document.createElement('div');
            row.className = 'row';
            board.appendChild(row);
        }

        let square = document.createElement('div');
        square.className = 'square';
        square.id = i;
        square.addEventListener('drop', dropPiece);
        square.addEventListener('dragover', dragoverPiece);
        square.addEventListener('dragenter', dragenterPiece);
        square.addEventListener('dragleave', dragleavePiece);

        if((rowcount%2 == 0 && i%2 == 0) || (rowcount%2 != 0 && i%2 != 0)){
            square.style.backgroundColor = '#FAD6A5';
        }
        else{
            square.style.backgroundColor = '#622A0F';
        }
        
        if(i==8){
            piece = document.createElement('img');
            piece.className='black piece';
            piece.setAttribute('draggable', false);
            square.appendChild(piece);
            piece.src = 'images\\Chess_kdt60.png'
        }
        else if(i == 14 || i == 16 || i == 36 || i == 46){
            piece = document.createElement('img');
            piece.className='black piece';
            piece.setAttribute('draggable', false);
            square.appendChild(piece);
            piece.src = 'images\\Chess_pdt60.png'
        }
        else if(i == 44){
            piece = document.createElement('img');
            piece.className='black piece';
            piece.setAttribute('draggable', false);
            square.appendChild(piece);
            piece.src = 'images\\Chess_ndt60.png'
        }
        else if(i == 61){
            piece = document.createElement('img');
            piece.className='black piece';
            piece.setAttribute('draggable', false);
            square.appendChild(piece);
            piece.src = 'images\\Chess_rdt60.png'
        }
        else if(i == 22){
            piece = document.createElement('img');
            piece.className='black piece';
            piece.setAttribute('draggable', false);
            square.appendChild(piece);
            piece.src = 'images\\Chess_qdt60.png'
        }
        else if(i == 11){
            piece = document.createElement('img');
            piece.className='white piece';
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragPiece);
            square.appendChild(piece);
            piece.src = 'images\\Chess_rlt60.png'
        }
        else if(i == 20){
            piece = document.createElement('img');
            piece.className='white piece';
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragPiece);
            square.appendChild(piece);
            piece.src = 'images\\Chess_nlt60.png'
        }
        else if(i == 28){
            piece = document.createElement('img');
            piece.className='white piece';
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragPiece);
            square.appendChild(piece);
            piece.src = 'images\\Chess_qlt60.png'
        }
        else if(i == 41 || i == 42 || i == 47 || i == 48 || i == 54){
            piece = document.createElement('img');
            piece.className='white piece';
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragPiece);
            square.appendChild(piece);
            piece.src = 'images\\Chess_plt60.png'
        }
        else if(i == 63){
            piece = document.createElement('img');
            piece.className='white piece';
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragPiece);
            square.appendChild(piece);
            piece.src = 'images\\Chess_klt60.png'
            piece.parentElement.style.backgroundColor = 'red';
        }
        
        row.appendChild(square);
    }
}

function createBlack(piece, square){
    piece = document.createElement('img');
    piece.className='black piece';
    piece.setAttribute('draggable', false);
    square.appendChild(piece);
    return piece, square;
}

function createWhite(piece, square){
    piece = document.createElement('img');
    piece.className='white piece';
    piece.setAttribute('draggable', true);
    piece.addEventListener('dragstart', dragPiece);
    square.appendChild(piece);
    return piece, square;
}

function mouseLeave(){
    if(selectedPiece){
        selectedPiece.parentElement.style.backgroundColor = currentColor;
        selectedPiece.classList.remove('invisible');
    }
}

function dragoverPiece(e){
    e.preventDefault();
}

function dragenterPiece(e){
    e.target.style.opacity = 0.5;
    if(e.target.className == "black piece"){
        e.target.parentElement.style.opacity = 0.5;
    }
    else if(e.target.className == "white piece"){ 
        selectedPiece.classList.remove('invisible');
    }
    else{
        selectedPiece.classList.add('invisible');
    }
}

function dragleavePiece(e){
    e.target.style.opacity = 1;
    if(e.target.className == "black piece"){
        e.target.parentElement.style.opacity = 1;
    }

}

function dragPiece(e){
    selectedPiece = e.target;
    currentColor = selectedPiece.parentElement.style.backgroundColor;
    selectedPiece.parentElement.style.backgroundColor = 'green';
    setTimeout(function(){
        selectedPiece.classList.add('invisible');
    });
}

function dropPiece(e){
    selectedPiece.parentElement.style.backgroundColor = currentColor;
    let strings = selectedPiece.src.split("_");
    let move = strings[1].split("t")[0];
    move += e.target.id ? e.target.id : e.target.parentElement.id;
    console.log(move);
    if(move == validMoves[turn]){
        if((!e.target.className.includes("piece") || (e.target.className != selectedPiece.className))){
            if(e.target.className.includes("piece")){
                e.target.replaceWith(selectedPiece);
            }
            else{
                e.target.append(selectedPiece);
            }
        }
        if(turn==0){
            document.getElementById('63').style.backgroundColor = '#622A0F';
            let square = document.getElementById('44');
            setTimeout(function(){document.getElementById('54').firstChild.replaceWith(square.firstChild)}, 400);
        }
        if(turn==1){
            kasparov.src = "images\\kasparov2.png";
            let square = document.getElementById('8');
            square.style.backgroundColor = 'red';
            setTimeout(function(){
                document.getElementById('15').append(square.firstChild);
                document.getElementById('8').style.backgroundColor = '#622A0F';
            }, 400);
        }
        if(turn==2){
            kasparov.src = "images\\kasparov3.png";
            let square = document.getElementById('15');
            square.style.backgroundColor = 'red';
            setTimeout(function(){
                document.getElementById('24').append(square.firstChild),
                document.getElementById('15').style.backgroundColor = '#622A0F';
            }, 400);
        }
        if(turn==3){
            kasparov.src = "images\\kasparov4.png";
            document.getElementById('24').style.backgroundColor = 'red';
            pieces = document.querySelectorAll('.piece');
            pieces.forEach(p => {
                p.setAttribute("draggable", false);
            });
            document.getElementsByTagName("audio")[0].pause();
            setTimeout(function(){
                document.getElementsByTagName("audio")[0].src = "audio\\Boss Win - WarioWare, Inc. Mega Microgames! (OST).ogg"
                document.getElementsByTagName("audio")[0].loop=false
                setTimeout(function(){
                    document.getElementById('paper').style.visibility = 'visible';
                    document.getElementById('paper').classList.add('transition');
                }, 3000);
            }, 500);
        }
        turn++;
        
    }
    selectedPiece.classList.remove('invisible');
    e.target.style.opacity = 1;
    selectedPiece.parentElement.style.opacity = 1;
    selectedPiece.style.opacity = 1;
    selectedPiece = null;
}