var game = {
    wins: 0,
    guesses: [],
    attempts: 3,
    words : ['avengers','madagascar','star wars','top gun',"titanic",
    'jumanji', 'black panther', 'the godfather', 'the shawshank redemption',
'the silence of the lambs', 'back to the future' ],
    gameStarted: false,
    currWord: '',
    match: [],
    initiate: function () {
        var wordDiv = document.getElementById("words");
        wordDiv.innerHTML='';
        this.currWord = this.words[Math.floor(Math.random() * this.words.length)];
        //console.log(this.currWord);    
        for (var i=0; i < this.currWord.length; i++) {
            var s = document.createElement("span");
            s.setAttribute("id", "span"+i); 
            if(this.currWord[i]==' '){
                s.innerHTML="&nbsp;";
                this.match[i]=true;
            }
            else {
                s.innerHTML=" _ ";
                this.match[i]=false;
            }
            wordDiv.appendChild(s); 
            
        }
        this.gameStarted=true;
        this.updatePage();
    },
    updatePage: function() {
        document.getElementById("wins").innerHTML=this.wins;
        document.getElementById("guesses").innerHTML=this.guesses;
        document.getElementById("attempts").innerHTML=this.attempts;
    },
    reset: function() {
        this.guesses=[];
        this.gameStarted=false;
        this.attempts=3;
        this.currWord='';
        this.match=[];
        this.initiate();
    },
    message: function(message) {
        document.getElementById("message").innerHTML=message;
    },
    checkGame: function(){
        if(!this.match.includes(false))
        {
            var audio = document.getElementById("myAudio");
            audio.play();
            game.wins++;
            game.updatePage();
            game.message("You Won!");
            game.reset();
        } else if( game.attempts === 0) {
            game.message("No more attempts left. You Lose!");
            game.reset();
        }
    }
};


document.onkeyup = function(event) {
    // Determines which key was pressed.
    var userGuess = event.key;
    if(game.gameStarted === false) {
        game.initiate();
    }
    // determine if they is a letter
    else if (game.gameStarted === true && event.which >= 65 && event.which <= 90
        && game.attempts > 0) {
        game.message("&nbsp;");
        var guessed=false;
        userGuess = userGuess.toLowerCase();
        
        if(game.guesses.indexOf(userGuess)=== -1) {
            for(var i=0; i<game.currWord.length;i++) {
                if (game.currWord[i] === userGuess) {
                    document.getElementById("span"+i).innerHTML=userGuess;
                    guessed=true;
                    game.match[i]=true;
                }
            }
            if(guessed){
                game.guesses.push(userGuess);
            } else {
                game.guesses.push(userGuess);
                game.attempts--;
            }
            // console.log("match is "+match);
            // console.log("guessed "+guesses);
            
        } else {
            game.message("You've already guessed this letter. Try again.");
        }
        game.checkGame();
        game.updatePage();
        
        
    } else if (game.gameStarted) {
        game.message("Please enter a letter.");
    } 

}





