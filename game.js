(function () {

  function setNewNumber() {
    $(".current-number").find(".number").text(Math.floor(Math.random() * 10 % 9))
  }

  $(document).ready( () => {
    $(".blank-placed-number").on("click", (e) => {
      // Place a number
      let tar = $(e.target);
      if(tar.hasClass("blank-placed-number")) {
        $(e.target).removeClass("blank-placed-number").text($(".current-number").find(".number").text());
        if($(".blank-placed-number").length > 0) {
          setNewNumber();
        } else {
          $(".current-number").find(".number").text('-')
          $(".game").addClass("full")
        }
      }
    });
    $(".reset a").on("click", () => {
      // Start New Game
      $(".game").removeClass("full")
      $(".placed-number").text("-").addClass("blank-placed-number")
      setNewNumber();
    })
    setNewNumber();
  });
})();
