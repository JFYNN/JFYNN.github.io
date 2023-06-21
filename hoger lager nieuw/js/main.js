const current_elem = document.getElementById("current");
const btns = document.getElementsByClassName("btn");
const result_elem = document.getElementById("result");
const score_elem = document.getElementById("score");
let score = 0; 
let last_number = 0;
let current_number = getRandomInt();
current_elem.innerHTML = current_number
for(let i = 0; i < btns.length; i++){
    btns[i].addEventListener("click", function (){
        playGame(this.dataset.value);
    });
}

function playGame (choice){
   last_number = current_number;
    current_number = getRandomInt();
    current_elem.innerText = current_number;

    let comparison;
    console.log(choice);

    if(last_number < current_number){
        alert = "higher";
    }else if (last_number > current_number){
        alert = "lower";
    }else{
        alert = "match";
    }
    if(choice == alert){
        score++;
        score_elem.innerText = score;
        result_elem.innerText = "correct";
        result_elem.classList.add("correct");
        result_elem.classList.remove("hide");

        setTimeout(function(){
            result_elem.classList.add("hide");
            result_elem.classList.remove("correct");
        }, 750); 
    }else if (alert == "match"){
        result_elem.innerText = "match"
    }
}
function getRandomInt(){
    return Math.floor(Math.random() * 100);
}

console.log()