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
          currentNumber = $(".current-number").find(".number").text();
      if(tar.hasClass("blank-placed-number")) {
        tar.removeClass("blank-placed-number").text(currentNumber);
        this.placedNumbers[tar.attr("number-index")] = currentNumber;
        if($(".blank-placed-number").length > 0) {
          setNewNumber();
        } else {
          $(".current-number").find(".number").text('-')
          $(".game").addClass("full")
          console.log("all numbers:", this.numbers)
          console.log("placed number:", printNumberArray(this.placedNumbers))
          console.log("max :", printNumberArray(this.numbers.sort((a,b) => {return b-a})))
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
