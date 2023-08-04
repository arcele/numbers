(function () {
  console.log("numbers.")
  function setNewNumber() {
    console.log("set new number.", $(".current-number").find(".number"));
    $(".current-number").find(".number").text(Math.floor(Math.random() * 10 % 9))
  }

  $(document).ready( () => {
    $(".blank-placed-number").on("click", (e) => {
      let tar = $(e.target);
      if(tar.hasClass("blank-placed-number")) {
        $(e.target).removeClass("blank-placed-number").text($(".current-number").find(".number").text());
        if($(".blank-placed-number").length > 0) {
          setNewNumber();
        } else {
          $(".current-number").find(".number").text('-')
        }
      }
    });

    setNewNumber();

  });

})()
