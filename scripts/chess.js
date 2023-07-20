let selectedPiece;
let currentColor;

function createBoard(){
    const board = document.querySelector('.board');
    board.addEventListener('mouseleave', mouseLeave);
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

        if(i<17){
            piece = document.createElement('img');
            piece.className='black piece';
            piece.setAttribute('draggable', false);
            square.appendChild(piece);
            if(i>8){
                piece.src = 'images\\Chess_pdt60.png'
            }
            else if(i == 1 || i == 8){
                piece.src = 'images\\Chess_rdt60.png'
            }
            else if(i == 2 || i == 7){
                piece.src = 'images\\Chess_ndt60.png'
            }
            else if(i == 3 || i == 6){
                piece.src = 'images\\Chess_bdt60.png'
            }
            else if(i == 4){
                piece.src = 'images\\Chess_qdt60.png'
            }
            else if(i == 5){
                piece.src = 'images\\Chess_kdt60.png'
            }
        }
        else if(i>48){
            piece = document.createElement('img');
            piece.className='white piece';
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragPiece);
            square.appendChild(piece);
            if(i<57){
                piece.src = 'images\\Chess_plt60.png'
            }
            else if(i == 64 || i == 57){
                piece.src = 'images\\Chess_rlt60.png'
            }
            else if(i == 63 || i == 58){
                piece.src = 'images\\Chess_nlt60.png'
            }
            else if(i == 62 || i == 59){
                piece.src = 'images\\Chess_blt60.png'
            }
            else if(i == 61){
                piece.src = 'images\\Chess_qlt60.png'
            }
            else if(i == 60){
                piece.src = 'images\\Chess_klt60.png'
            }
        }
        
        row.appendChild(square);
    }
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
    if((!e.target.className.includes("piece") || (e.target.className != selectedPiece.className))){
        if(e.target.className.includes("piece")){
            e.target.replaceWith(selectedPiece);
        }
        else{
            e.target.append(selectedPiece);
        }
    }
    selectedPiece.classList.remove('invisible');
    e.target.style.opacity = 1;
    selectedPiece.parentElement.style.opacity = 1;
    selectedPiece.style.opacity = 1;
    selectedPiece = null;
}