let err=0;
let cardList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

let cardSet;
let board =[];
let rows ;//hàng
let cols ;//cột
let timerInterval;

let checkWin=0;
let conditionWin ;

let card1Selected; //thẻ chon 1
let card2Selected; //thẻ chọn 2

function setupGame() {
    let difficulty = document.getElementById("difficulty").value;
    if (difficulty === "2x4") {
        rows = 2;
        cols = 4;
    } else if (difficulty === "4x5") {
        rows = 4;
        cols = 5;
    } else {
        rows = 5;
        cols = 6;
    }
    conditionWin = (rows * cols) / 2;
}
function setupGameTime() {
    clearInterval(timerInterval);   //đảm bảo không có bộ đếm trước đó
    let timeLeft = document.getElementById("timeLimit").value;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `${timeLeft}`;
        if (timeLeft < 0) {
            clearInterval(timerInterval); //dừng bộ đếm
            alert("Hết thời gian! Bạn đã thua.")
            disableBoard()
        }
    }, 1000);
}

function disableBoard() {
    document.getElementById("board").style.pointerEvents = "none";
}
function enableBoard() {
    document.getElementById("board").style.pointerEvents = "auto";
}
// trộn thẻ
function shuffleCards() {
    let totalCards = (rows * cols) / 2;
    cardSet = cardList.slice(0, totalCards).concat(cardList.slice(0, totalCards));  //tạo danh sách thẻ
    cardSet.sort(() => Math.random() - 0.5);
}

function startGame() {
    enableBoard()
    setupGame();
    setupGameTime()
    err = 0;
    checkWin = 0;
    document.getElementById("err").innerText = err;
    board = [];
    document.getElementById("board").innerHTML = "";
    shuffleCards();
    document.getElementById("board").style.gridTemplateColumns = `repeat(${cols}, 80px)`;   //khoảng cách giữa các thẻ

    for (let i = 0; i < rows; ++i) {
        let row = [];
        for (let j = 0; j < cols; ++j) {
            let cardImg = cardSet.pop();    // lấy một phần tử từ cuối mảng
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = i + "-" + j;
            card.src = "image/" + cardImg + ".jpg";     //lấy ảnh
            card.classList.add("card");                 //thêm class CSS
            card.addEventListener("click", selectCard); // sự kiện chuột
            document.getElementById("board").append(card);  //thêm card vào div
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 0); //sau 1 giây che đi các thẻ
}

function hideCards() {
    document.querySelectorAll(".card").forEach(card => {
        card.src = "image/images.jpg";  //hiển thị mặt sau thẻ
    });
}
//chọn thẻ
function selectCard() {
    if (this.src.includes("image/images")) {    //chỉ chọn thẻ up
        if (!card1Selected) {  // nếu chưa chọn thẻ nào
            card1Selected = this;
            let [i, j] = card1Selected.id.split("-").map(Number);
            card1Selected.src = "image/" + board[i][j] + ".jpg";
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            let [i, j] = card2Selected.id.split("-").map(Number);
            card2Selected.src = "image/" + board[i][j] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}
//kiểm tra 2 thẻ
function update() {
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "image/images.jpg";
        card2Selected.src = "image/images.jpg";
        err++;
        document.getElementById("err").innerText = err;
    } else {
        checkWin++;
        if (checkWin === conditionWin) {
            setTimeout(() => {
                alert("You win!");
                // let highscore = localStorage.getItem("highscore");
                // if (highscore === null || err < parseInt(highscore)) {
                //     localStorage.setItem("highscore", err);
                //     document.getElementById("highscore").innerText = err;
                // }
            }, 500);
        }
    }
    card1Selected = null;
    card2Selected = null;
}
// window.onload = function () {
//     let highscore = localStorage.getItem("highscore");
//     if (highscore !== null) {
//         document.getElementById("highscore").innerText = highscore;
//     } else {
//         document.getElementById("highscore").innerText = "Chưa có điểm cao";
//     }
// };