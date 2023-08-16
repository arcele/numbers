(function () {

  this.numbers = [];
  this.placedNumbers = [-1,-1,-1,-1,-1];

  function setNewNumber() {
    let newNumber = Math.floor(Math.random() * 10 % 9);
    $(".current-number").find(".number").text(newNumber);
    this.numbers.push(newNumber);
  }
  function printNumberArray(arr) {
    console.log("printing ", arr)
    return parseInt(arr.toString().replaceAll(",",""));
  }

  $(document).ready( () => {
    $(".blank-placed-number").on("click", (e) => {
      // Place a number
      let tar = $(e.target),
          currentNumber = $(".current-number").find(".number").text(),
          maxNumber,
          minNumber;
      if(tar.hasClass("blank-placed-number")) {
        tar.removeClass("blank-placed-number").text(currentNumber);
        this.placedNumbers[tar.attr("number-index")] = currentNumber;
        if($(".blank-placed-number").length > 0) {
          setNewNumber();
        } else {
          $(".current-number").find(".number").text('-')
          $(".game").addClass("full")
          maxNumber = this.numbers.sort((a,b) => {return b-a}).slice();
          minNumber = this.numbers.sort().slice();
          console.log("Above Min:", printNumberArray(this.placedNumbers) - printNumberArray(minNumber))  // above min is probably the best "High Score" to save
          $(".result").text('You were ' + (printNumberArray(maxNumber) - printNumberArray(this.placedNumbers)) + ' below the max value of ' + printNumberArray(maxNumber))
        }
      }
    });
    $(".reset a").on("click", () => {
      // Start New Game
      $(".game").removeClass("full")
      $(".placed-number").text("-").addClass("blank-placed-number")
      this.numbers = [];
      this.placedNumbers = [-1,-1,-1,-1,-1];
      setNewNumber();
    })
    setNewNumber();
  });
})();
