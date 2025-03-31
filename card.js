let err=0;
let checkWin=0;
let conditionWin = (rows*cols)/2
let cardList = [0,1,2,3,4,5,6,7,8,9];

let cardSet;
let board =[];
let rows = 4;//hàng
let cols = 5;//cột

let card1Selected; //thẻ chon 1
let card2Selected; //thẻ chọn 2

window.onload = function () {
    shuffleCards()
    startGame()
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // nhân đôi hàm
    console.log(cardSet);

    cardSet.sort(function() {
        return Math.random() - 0.5;
    });
    console.log(cardSet);
}

function startGame() {
    for (let i = 0; i < rows; ++i) {
        let row = [];
        for (let j = 0; j < cols; ++j) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img"); //tạo thẻ ảnh mới
            card.id = i.toString() + "-" + j.toString();    //gán id
            card.src = "image/" + cardImg + ".jpg";      //gán ảnh
            card.classList.add("card");                 //thêm class css
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);  //thêm thẻ vào div
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            let card = document.getElementById(i.toString()+ "-" + j.toString());
            card.src = "image/images.jpg"
        }
    }
}
//chọn ảnh
function selectCard() {
    if (this.src.includes("image/images")) {
        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let i = parseInt(coords[0]);
            let j = parseInt(coords[1]);
            card1Selected.src = "image/" + board[i][j] + ".jpg";
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let i = parseInt(coords[0]);
            let j = parseInt(coords[1]);
            card2Selected.src = "image/" + board[i][j] + ".jpg";
            setTimeout(update, 1000)
        }
    }

}
//xử lý ảnh
function update() {
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "image/images.jpg";
        card2Selected.src = "image/images.jpg";
        err +=1;
        document.getElementById("err").innerHTML = err;
    } else {
        checkWin++;
        if (checkWin == conditionWin) {
            setTimeout(()=> {
                alert(`You Win`);
            },1000);
        }
    }
    card1Selected = null;
    card2Selected = null;
}