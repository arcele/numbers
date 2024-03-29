(function () {

  this.numbers = [];
  this.placedNumbers = [-1,-1,-1,-1,-1];

  function setNewNumber() {
    let newNumber = Math.floor(Math.random() * 10 % 10);
    $(".current-number").find(".number").text(newNumber);
    this.numbers.push(newNumber);
  }
  function printNumberArray(arr) {
    console.log("printing ", arr)
    return parseInt(arr.toString().replaceAll(",",""));
  }

  $(document).ready( () => {
    // requires confetti to be included
    var myCanvas = document.createElement('canvas');
    document.body.appendChild(myCanvas);
    var myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true
    });
    myConfetti({
      particleCount: 675,
      spread: 125
    });
    confetti.reset();
    // end confetti requirement

    $(".blank-placed-number").on("click", (e) => {
      // Place a number
      let tar = $(e.target),
          currentNumber = $(".current-number").find(".number").text(),
          maxNumber,
          minNumber,
          difference;
      if(tar.hasClass("blank-placed-number")) {
        tar.removeClass("blank-placed-number").text(currentNumber);
        this.placedNumbers[tar.attr("number-index")] = currentNumber;
        if($(".blank-placed-number").length > 0) {
          //Empty slots remain, generate the next number
          setNewNumber();
        } else {
          //Toggle css class to display "end game" display
          $(".game").addClass("full")
          maxNumber = this.numbers.sort((a,b) => {return b-a}).slice();
          minNumber = this.numbers.sort().slice();
          difference = printNumberArray(maxNumber) - printNumberArray(this.placedNumbers);
          //Highlight Numbers as correct/incorrect
          for(z=0; z < 5; z++) {
            $(".placed-number").map((x, i) => {
                if($(i).attr('number-index') == z) {
                  $(i).addClass((this.placedNumbers[z] == maxNumber[z]) ? 'correct' : 'incorrect')
                }
            })
          }
          //Populate the results
          if(difference > 0) {
            $(".result").text('You were ' + (printNumberArray(maxNumber) - printNumberArray(this.placedNumbers)) + ' below the max value of ' + printNumberArray(maxNumber))
          } else {
            $(".result").text('Nice job, you found the maximum possible number of ' + printNumberArray(this.placedNumbers));
            confetti();
          }
        }
      }
    });
    $(".reset a").on("click", () => {
      // Start New Game
      $(".game").removeClass("full")
      $(".placed-number").text("-").addClass("blank-placed-number").removeClass('correct').removeClass('incorrect')
      this.numbers = [];
      this.placedNumbers = [-1,-1,-1,-1,-1];
      setNewNumber();
    })
    setNewNumber();
  });
})();
