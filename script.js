// Game Logic for Quiddler Solitaire 

function moveup(index){
    //document.getElementById('slot' + index).style.backgroundColor='blue';
    // DOES NOTHING FOR NOW
}

function reset(){

    for(i = 1; i <=8; i++){
        document.getElementById('slot' + i).style.background='none';
        document.getElementById('slot' + i).style.borderWidth="0px"
        document.getElementById('sletter' + i).innerHTML='';
        document.getElementById('spoint' + i).innerHTML='';
    }
    spelled = [];
    indices = [];
    roundScore = 0;
    cards = deck.slice(0, 8);
    setup();
}

var spelled = [];

var indices = [];

var totalScore = 0;
var roundScore = 0;

function select(index){  

    //MOVE CARD TO THE LEFT MOST PLAYED SLOT
    document.getElementById('slot' + (spelled.length + 1)).style.backgroundImage= "";
    document.getElementById('slot' + (spelled.length + 1)).style.backgroundSize="100px"
    document.getElementById('slot' + (spelled.length + 1)).style.backgroundColor="white"
    document.getElementById('slot' + (spelled.length + 1)).style.borderWidth="4px"
    document.getElementById('slot' + (spelled.length + 1)).style.borderColor="black"
    document.getElementById('slot' + (spelled.length + 1)).style.borderRadius="5px"
    document.getElementById('slot' + (spelled.length + 1)).style.borderStyle="solid"
    document.getElementById('sletter' + (spelled.length + 1)).innerHTML=deck[index-1].letter;
    document.getElementById('spoint' + (spelled.length + 1)).innerHTML=deck[index-1].point;
    
    //REMOVE CARD FROM OLD SPACE
    document.getElementById('card' + index).style.background='none';
    document.getElementById('card' + index).style.borderWidth='0px';
    document.getElementById('letter' + index).innerHTML='';
    document.getElementById('point' + index).innerHTML='';
    document.getElementById('card' + index).onclick='';  // disable onclick
    

    //ADD CARD'S LETTER TO SPELLED LIST
    spelled[spelled.length] = deck[index-1].letter;

    //ADD POINTS
    roundScore += deck[index-1].point;


    //ADD INDEX TO INDICES
    indices.push(index);
}

class PlayingCard{
    constructor(letter, point, front_image, back_image, frequency){
        this.letter = letter
        this.point = point
        this.front_image = front_image
        this.back_image = back_image
        this.frequency = frequency
    }
}


const LET = {'A':1, 'B': 8, 'C':5, 'D': 3, 'E': 2, 'F':9,'G':6,'H':4,'I':2, 'J':9, 'K':9, 
'L':4, 'M':5,'N':4, 'O':1, 'P':6, 'Q': 9, 'R':3, 'S':2, 'T':2, 'U':2, 'V':8, 'W': 8, 'X':9, 'Y':9, 'Z':9
}

const LET2 = []

var deck = []

for (var key in LET){
    deck.push(new PlayingCard(key, LET[key],'f','b', 5));
    if(key == 'A' || key == 'E' || key == 'I' || key =='O' || key =='U'){
        deck.push(new PlayingCard(key, LET[key],'f','b', 5));
        deck.push(new PlayingCard(key, LET[key],'f','b', 5));
    }
}

deck.sort(() => Math.random() - 0.5);

deck.forEach(i =>{
    //console.log(i.letter)
})

function setup(){

    for(let i = 0; i < 8; i ++){
        if(i < deck.length){
            document.getElementById('card' + (i+1)).style.backgroundColor="white";
            document.getElementById('card' + (i+1)).style.backgroundSize="100px";
            document.getElementById('card' + (i+1)).style.borderWidth="4px"
            document.getElementById('letter' + (i+ 1)).innerHTML=deck[i].letter;
            document.getElementById('point' + (i+ 1)).innerHTML=deck[i].point;
            document.getElementById('card' + (i+1)).onclick= function() {select(i+1);}
        }
        else{
            document.getElementById('card' + (i+1)).style.background='none';
            document.getElementById('letter' + (i+1)).innerHTML='';
            document.getElementById('point' + (i+1)).innerHTML='';
        }   
    }
    var highscore = localStorage.getItem("highscore");

            if(highscore !== null){
                if (totalScore > highscore) {
                    localStorage.setItem("highscore", totalScore);      
                }
            }
            else{
                localStorage.setItem("highscore", totalScore);
            }

            
            
            
            document.getElementById('highscore').innerHTML=('HIGH SCORE: ' + highscore);
}

function submit(){
    multiplier = 1;
    word = '';
    for(var i in spelled){
        word += spelled[i];
    }
    wordLength = word.length;

    switch(wordLength){
        case 1:
        case 2:
        case 3:
        case 4:

            multiplier = 1;
            break;
        case 5:
        case 6:
            multiplier = 2;
            break;
        case 7:
            multiplier = 3;
            break;
        case 8:
            multiplier = 4;
            break;
    }
    

    if(spelled.length > 0){
        document.getElementById('score').innerText='';
        document.getElementById('score').append('YOU SPELLED: ' + word);
        check(word);

        if(spelling == 1){
            for(i = 1; i <=8; i++){ //delete submitted cards from slots
                document.getElementById('slot' + i).style.background='none';
                document.getElementById('slot' + i).style.border="none"
                document.getElementById('sletter' + i).innerHTML='';
                document.getElementById('spoint' + i).innerHTML='';
            }
            // delete cards submitted from deck   
            var sortedIndices = indices.sort(function(a, b){return b - a});
    
            for(var i of sortedIndices){
                deck.splice(i-1, 1);
                document.getElementById('notes').innerText='';
                document.getElementById('notes').innerText=('DECK LENGTH: ' + deck.length);
            } 

            roundScore *= multiplier;
            totalScore += roundScore;

            var highscore = localStorage.getItem("highscore");

            if(highscore !== null){
                if (totalScore > highscore) {
                    localStorage.setItem("highscore", totalScore);      
                }
            }
            else{
                localStorage.setItem("highscore", totalScore);
            }

            
            
            document.getElementById('points').innerText=('SCORE: ' + totalScore);
            document.getElementById('highscore').innerHTML=('HIGH SCORE: ' + highscore);

            
            spelled = [];
            indices = [];
            roundScore = 0;
            spelling = 0;
            cards = deck.slice(0, 8);
            setup()
            if(deck.length < 1){
                window.alert('YOU WIN');
                location.reload();
            }
            document.getElementById('highscore').innerHTML=('HIGH SCORE: ' + highscore);
        }else{
            reset();
        }
        
    }
}
var spelling = 0;   // FLAG FOR WORD SPELLED CORRECTLY 

function check(word){

    $.ajax({async: false, type: 'GET', url: 'dictionary.txt', success: function(data){      // change path once on server
        
        wordsAll = data.split('\n');
        if(wordsAll.includes(word)){
            document.getElementById('header').style.backgroundColor='rgb(255, 212, 121)';
            spelling = 1;
            document.getElementById('highscore').innerHTML=('HIGH SCORE: ' + highscore);

        }
        else{
            document.getElementById('header').style.backgroundColor='red';
        }
    }});

    console.log(spelling);
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode){   
        // make copy of the deck.slice(0,7) and pop off letters to check against 
        case 65:
            value = 'A';
            loop();
            break;
        case 66:
            value = 'B';
            loop();
            break;
        case 67:
            value = 'C';
            loop();
            break;
        case 68:
            value = 'D';
            loop();
            break;
        case 69:
            value = 'E';
            loop();
            break;   
        case 70:
            value = 'F';
            loop();
            break;  
        case 71:
            value = 'G';
            loop();
            break;  
        case 72:
            value = 'H';
            loop();
            break;  
        case 73:
            value = 'I';
            loop();
            break;  
        case 74:
            value = 'J';
            loop();
            break;  
        case 75:
            value = 'K';
            loop();
            break;
        case 76:
            value = 'L';
            loop();
            break;
        case 77:
            value = 'M';
            loop();
            break;
        case 78:
            value = 'N';
            loop();
            break;
        case 79:
            value = 'O';
            loop();
            break;
        case 80:
            value = 'P';
            loop();
            break;
        case 81:
            value = 'Q';
            loop();
            break;
        case 82:
            value = 'R';
            loop();
            break;
        case 83:
            value = 'S';
            loop();
            break;
        case 84:
            value = 'T';
            loop();
            break;
        case 85:
            value = 'U';
            loop();
            break;
        case 86:
            value = 'V';
            loop();
            break;
        case 87:
            value = 'W';
            loop();
            break;
        case 88:
            value = 'X';
            loop();
            break;
        case 89:
            value = 'Y';
            loop();
            break;
        case 90:
            value = 'Z';
            loop();
            break;   
        case 13:
            submit();
            break;
        case 8:
            reset();
            break;
    }
});

var cards = deck.slice(0,8);
console.log(cards);

function loop(){
    for(x = 0; x < 8; x++){  // x < cards.length 
        if(cards[x].letter == value){
            select(x+1);
            cards[x]= '';
            console.log(cards);
            break; // break loop so only 1 letter is moved
        }
    }
}




function newgame(){
    location.reload()
}

/*
 ADD BONUS FOR USING ALL WORDS IN DECK

 ADD HIGH SCORE 

 FIX SPELLED, DECK LENGTH, ETC IN HEADER SO IT DOESN'T MOVE AROUND

 FIX POINTS NUMBER IN CARD FOR LETTER 'I's.


A - Z  keycodes
65 -90 



1 letter per card:

const LET = {'A':1, 'B': 8, 'C':5, 'D': 3, 'E': 2, 'F':9,'G':6,'H':4,'I':2, 'J':9, 'K':9, 
'L':4, 'M':5,'N':4, 'O':1, 'P':6, 'Q': 9, 'R':3, 'S':2, 'T':2, 'U':2, 'V':8, 'W': 8, 'X':9, 'Y':9, 'Z':9
}

const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
'S','T','U','V','W','X','Y','Z']

 const QUID = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 
'D', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'F', 
'F', 'G', 'G', 'G', 'G', 'H', 'H', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'J', 'J', 
'K', 'K', 'L', 'L', 'L', 'L', 'M', 'M', 'N', 'N', 'N', 'N', 'N', 'N', 'O', 'O', 'O', 
'O', 'O', 'O', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 
'S', 'S', 'T', 'T', 'T', 'T', 'T', 'T', 'U', 'U', 'U', 'U', 'U', 'U', 'V', 'V', 'W', 
'W', 'X', 'X', 'Y', 'Y', 'Y', 'Y', 'Z', 'Z', 'QU', 'QU', 'IN', 'IN', 'ER', 'ER', 'CL', 
'CL', 'TH', 'TH']

*/
