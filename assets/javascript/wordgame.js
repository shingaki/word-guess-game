$(document).ready(function() {

    var gamesWon = 0;
    var guessesLeft = 12;
    var yourGuessesSoFar = " ";
    var playerWon = false;
    var userGuess;
    var numberOfGuessesLeft = 12;
    var alreadyGuessed = false;
    var userLetter;
    var displayMovieNameUpdated = " ";
    var pageNeedsToBeReset = false;
    var pageWasReset = false;





    var validCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C',
        'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];



    document.getElementById("games-won").innerHTML = "YOUR SCORE: " + gamesWon + "<br><br>";
    document.getElementById("guesses-left").innerHTML = "NUMBER OF GUESSES LEFT: " + guessesLeft + "<br><br>";
    document.getElementById("guesses-so-far").innerHTML = "YOUR GUESSES SO FAR: " + yourGuessesSoFar + "<br><br>";


    // set up the array of Movies, Year, Hint, and image
    var movieOscar =
        {
            year: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            name: ["SLUM DOG MILLIONAIRE", "KINGS SPEECH", "THE ARTIST", "ARGO", "12 YEARS A SLAVE", "BIRDMAN OR (THE UNEXPECTED VIRTUE OF IGNORANCE", "SPOTLIGHT", "MOONLIGHT", "THE SHAPE OF WATER", "GREEN BOOK"],
            hint: ["A Mumbai teen reflects on his upbringing in the slums when he is accused of cheating on the Indian Version of \"Who Wants to be a Millionaire?",
                "The story of King George VI, his impromptu ascension to the throne of the British Empire in 1936, and the speech therapist who helped the unsure monarch overcome his stammer.",
                "An egomaniacal film star develops a relationship with a young dancer against the backdrop of Hollywood's silent era.",
                "Acting under the cover of a Hollywood producer scouting a location for a science fiction film, a CIA agent launches a dangerous operation to rescue six Americans in Tehran during the U.S. hostage crisis in Iran in 1979.",
                "In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.",
                "A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.",
                "The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",
                "A chronicle of the childhood, adolescence and burgeoning adulthood of a young, African-American, gay man growing up in a rough neighborhood of Miami.",
                "At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.",
                "A working-class Italian-American bouncer becomes the driver of an African-American classical pianist on a tour of venues through the 1960s American South."],
            poster: ["./assets/images/2009_SlumDogMillionaire.png", "./assets/images/2010_KingsSpeech.png", "./assets/images/2011_TheArtist.png",
                "./assets/images/2012_Argo.png", "./assets/images/2013_12YearsASlave.png", "./assets/images/2014_Birdman.png",
                "./assets/images/2015_Spotlight.png", "./assets/images/2016_Moonlight.png", "./assets/images/2017_TheShapeOfWater.png",
                "./assets/images/2018_GreenBook.png"]
        };

// randomly select one of the Movies
    function getRandomMovie() {
        var movieYear = movieOscar.year[Math.floor(Math.random() * movieOscar.year.length)];

        return movieYear;
    }


// get the movie information for the random movie year
    function getMovieInformation(oscarYear) {
        for (i = 0; movieOscar.year.length > 0; i++) {

            if (oscarYear === movieOscar.year[i]) {
                var oscarMovie = movieOscar.name[i];
                var oscarHint = movieOscar.hint[i];
                var oscarPicture = movieOscar.poster[i];

                return [oscarYear, oscarMovie, oscarHint, oscarPicture];
            }
        }
    }


// replace each character in the movie name with an underscore
// CREATE HASH TABLE HERE

    function replaceMovieNameWithUnderScores(movieToParse) {

        var oscarMovieNameLetter = movieToParse;

        console.log("replace Movie Name With Underscore " +  oscarMovieNameLetter);

        var j = 0;


        for (var i = 0; oscarMovieNameLetter.length > i; i++) {


            if ((!isLetter(oscarMovieNameLetter[i])) && (!isNumber(oscarMovieNameLetter[i]))) {
                displayMovieName[j] = " ";
                j++;
            } else {
                displayMovieName[j] = "-";
                j++;
            }
        }

    }

// check if input is a letter or number
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    function isNumber(str) {
        return str.length === 1 && str.match(/[0-9]/i);
    }


// check if user input (letter or number) already provided
    function checkLetterAlreadyGuessed(userInput, guessesSoFar)
    {
        var letterAlreadyGuessed = false;
        var passedInUserGuess = guessesSoFar;


        if (guessesSoFar == "") {
            console.log("guessesSoFar is blank so no duplicates exist");
        }
        else {
            console.log("guessesSoFar is not blank");
            var n = passedInUserGuess.indexOf(userInput);
            console.log("n =" + n);
            if (n >= 0) {
                letterAlreadyGuessed = true;
            } else letterAlreadyGuessed = false;

        }
        return letterAlreadyGuessed;
    }

// append the letter to string

    function appendYourGuessesSoFar(userInput, appendLetter)
    {
        if (appendLetter == "")
        {
            appendLetter = userInput;
        }
        else appendLetter = (appendLetter + ", " + userInput);

        console.log("after appending userInput and appendLetter = " + userInput, appendLetter);

        yourGuessesSoFar = appendLetter;

        document.getElementById("guesses-so-far").innerHTML = "YOUR GUESSES SO FAR: " + yourGuessesSoFar + "<br><br>";


        return (userInput, appendLetter);
    }

// check if user letter matches any letters on the movie
    function checkUserLettersMatchMovieLetters(userInput) {

        displayMovieNameUpdated = " ";


        var matchMovieName = oscarMovieName;
        var arrayMatchMovieName = matchMovieName;

        console.log("arrayMatchMovieName " + arrayMatchMovieName);
        console.log("displayMovieName = " + displayMovieName);

        $("#movie-year").replaceWith(oscarMovieYear);



        for (var i = 0; arrayMatchMovieName.length > i; i++) {

            if (userInput === arrayMatchMovieName[i]) {
                displayMovieName[i] = userInput;

                displayMovieNameUpdated = displayMovieName.join('');
                document.getElementById("hangman-dashes").innerHTML = displayMovieNameUpdated;

            }
        }
    }



    function didPlayerWin()
    {
        var matchMovieTitle = displayMovieName.join('');

        playerWon = false;
        pageNeedsToBeReset = false;



        if (matchMovieTitle == oscarMovieName)
        {
            gamesWon = gamesWon + 1;
            numberOfGuessesLeft = 12;
            playerWon = true;
            $("#games-won").append(gamesWon);

            // show image and get person to click to reset the game
            displayMoviePoster();
            console.log("player won " + displayMovieName);
            document.getElementById("guesses-left").innerHTML = "NUMBER OF GUESSES LEFT: " + numberOfGuessesLeft + "<br><br>";
            document.getElementById("games-won").innerHTML = "YOUR SCORE: " + gamesWon + "<br><br>";

            pageNeedsToBeReset = true;

        }
        else {

            numberOfGuessesLeft = (numberOfGuessesLeft - 1);

            if (numberOfGuessesLeft > 0) {
                document.getElementById("guesses-left").innerHTML = "NUMBER OF GUESSES LEFT: " + numberOfGuessesLeft + "<br><br>";
            }
            else if (numberOfGuessesLeft === 0)  { pageNeedsToBeReset = true; }
        }
    }




    function displayMoviePoster()
    {
        var path = oscarMoviePoster;
        console.log("path " + path);
        $("#movie-poster").attr("src",oscarMoviePoster);
    }


    function clearMovieName() {

        console.log("clear this movie name " + displayMovieName);

        for (i = 0; displayMovieName.length > i; i++)

            displayMovieName[i] = " ";
    }


    function resetPage() {


        //reset the poster

        pageWasReset = true;

        oscarMoviePoster = "./assets/images/oscar_gold_statue1.png";
        displayMoviePoster();

        yourGuessesSoFar = "";
        numberOfGuessesLeft = 12;

        document.getElementById("guesses-left").innerHTML = "NUMBER OF GUESSES LEFT: " + numberOfGuessesLeft + "<br><br>";

        document.getElementById("guesses-so-far").innerHTML = "YOUR GUESSES SO FAR: " + yourGuessesSoFar + "<br><br>";

        var oscarMovieYear = getRandomMovie();


        [oscarMovieYear, oscarMovieName, oscarMovieHint, oscarMoviePoster] = getMovieInformation(oscarMovieYear);
        console.log(" oscarYear 20 " + oscarMovieYear + " oscarMovieName " + oscarMovieName + " oscarMovieHint " + oscarMovieHint + " oscarMoviePoster " + oscarMoviePoster);


        // need to clear the display array from last game

        console.log("movie to be cleared out: - " + displayMovieName);

        clearMovieName();

        displayMovieName = [];


        replaceMovieNameWithUnderScores(oscarMovieName);

        $("#movie-year").replaceWith(oscarMovieYear);

        // $("#movie-hint").replaceWith(oscarMovieHint);

        resetDisplayMovieName = displayMovieName.join('');

        document.getElementById("hangman-dashes").innerHTML = resetDisplayMovieName;
        document.getElementById("movie-hint").innerHTML = oscarMovieHint;

        playerWon = false;

        pageNeedsToBeReset = false;

    }




// create variable for the random movie year

    if (gamesWon < 1) {
        var oscarMovieYear = getRandomMovie();


        var [oscarMovieYear, oscarMovieName, oscarMovieHint, oscarMoviePoster] = getMovieInformation(oscarMovieYear);
        console.log(" oscarYear 10 " + oscarMovieYear + " oscarMovieName " + oscarMovieName + " oscarMovieHint " + oscarMovieHint + " oscarMoviePoster " + oscarMoviePoster);

        var displayMovieName = [];

        replaceMovieNameWithUnderScores(oscarMovieName);

        $("#movie-year").append(oscarMovieYear);

        $("#movie-hint").append(oscarMovieHint);

        $("#hangman-dashes").append(displayMovieName);
    }




// get the key user clicks and check if letter has been selected before
    // Global Variables




    document.onkeyup = function(event) {
        // Determines which key was pressed.
        console.log("function event called");
        userLetter = event.key;
        pageWasReset = false;

        if (pageNeedsToBeReset)
        {
            resetPage();

        }


        if (!pageWasReset) {
            userGuess = userLetter.toUpperCase();
            console.log("user input changed to cap: " + userGuess);
            var charValid = validCharacters.indexOf(userGuess);
            console.log("user input " + userGuess);
            if (charValid >= 0) {

                // call function to see if userGuess already guessed
                console.log("alreadyGuessed = b4 " + alreadyGuessed);
                console.log("before calling the function : " + userGuess);

                alreadyGuessed = checkLetterAlreadyGuessed(userGuess, yourGuessesSoFar);

                console.log("alreadyGuessed after = " + alreadyGuessed);

                // check if alreadyGuessed is true

                if (alreadyGuessed) {
                    alert("You already chose this letter, choose another letter");
                } else {

                    // check if userInput match any Letters in the Movie Name
                    checkUserLettersMatchMovieLetters(userGuess);
                    console.log("after replacing underscores " + displayMovieName);
                    // call function to append the letter
                    userGuess, yourGuessesSoFar = appendYourGuessesSoFar(userGuess, yourGuessesSoFar);
                    // check if player won
                    didPlayerWin();

                }
            }
        }
    }
})






















