// -1 means no guess has been made
let guessFirst = -1;
let guessSecond = -1;

// Cards to be matched
let cards = [
   {
      entity: "&spades;",
      color: "green"
   },
   {
      entity: "&clubs;",
      color: "blue"
   },
   {
      entity: "&hearts;",
      color: "red"
   },
   {
      entity: "&diams;",
      color: "purple"
   },
   {
      entity: "&starf;",
      color: "orange"
   },
   {
      entity: "&malt;",
      color: "gold"
   },
];

// Create the match for each card
cards = cards.concat(cards);

let $cardDivs = [];

$(function() {
   // Add divs for each card
   let $game = $("#cardGrid");

   for (let i = 0; i < cards.length; i++) {
      let $card = $("<div></div>");
      $card.click(function() { clickCard(i); });
      $game.append($card);
      $cardDivs.push($card);
   }

   newGame();

   $("#newGameBtn").click(newGame);
});

function clickCard(index) {
   // Only accept click on non-visible card
   if (!$cardDivs[index].hasClass("card-visible")) {
      if (guessFirst == -1) {
         // Flip card
         showCard(index);
         guessFirst = index;
      }
      else if (guessSecond == -1) {
         showCard(index);
         guessSecond = index;

         // Check for a match
         if (cards[guessFirst].entity == cards[guessSecond].entity) {
            showMatch(guessFirst, guessSecond);
            guessFirst = -1;
            guessSecond = -1;
         }
         else {
            setTimeout(function() {
               hideCard(guessFirst);
               hideCard(guessSecond);
               guessFirst = -1;
               guessSecond = -1;
            }, 1000);
         }
      }         
   }
}

function showCard(index) {
   // TODO: Animate showing the card

	$cardDivs[index].html(cards[index]).slideUp(200) 
		.queue(function(next) {
			$cardDivs[index].html(cards[index].entity).css("color", cards[index].color);
			$(this).addClass("card-visible");
			next();
		})
	.slideDown(200);
}

function hideCard(index) {
   // TODO: Animate hiding the card
	$cardDivs[index].html(cards[index]).slideUp(200)
		.queue(function(next) {
			$cardDivs[index].html("").removeClass("card-visible");
			next();
		})
	.slideDown(200);
	
	
}

function showMatch(cardIndex1, cardIndex2) {
   // TODO: Animate $cardDivs[cardIndex1] and $cardDivs[cardIndex2] card symbols' font size
	setTimeout(function() {
		$cardDivs[cardIndex1].animate({
			fontSize: "100px"
		}, 200);
		$cardDivs[cardIndex1].animate({
			fontSize: "75px"
		}, 200);
		$cardDivs[cardIndex2].animate({
			fontSize: "100px"
		}, 200);
		$cardDivs[cardIndex2].animate({
			fontSize: "75px"
		}, 200);
	}, 500);
}

function newGame() {
   // TODO: Animate fading in and out the cards
   //$("#cardGrid").fadeOut("normal");
   $("#cardGrid").fadeOut("normal")
		.queue(function(next) {
	   // Randomize the cards array by swapping card values 20 times
	   for (let i = 0; i < 20; i++) {
		  let cardIndex1 = getRandomNumber(0, cards.length - 1);
		  let cardIndex2 = getRandomNumber(0, cards.length - 1);
		  let temp = cards[cardIndex1];
		  cards[cardIndex1] = cards[cardIndex2];
		  cards[cardIndex2] = temp;
	   }
		for (let i = 0; i < $cardDivs.length; i++) {
      $cardDivs[i].html("").removeClass("card-visible");
		}
		next();
		})
		.fadeIn("normal");
   // Hide all cards 
   
	//$("#cardGrid").fadeIn("normal");
   
   // Nothing selected yet
   guessFirst = -1;
   guessSecond = -1;
}

// Return a random number between min and max (inclusive).
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}