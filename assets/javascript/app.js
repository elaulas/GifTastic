$(document).ready(function() {
  var btnClicked;

  $(".btnSubmit").on("click", function() {
    $(".images").empty();
    userInput = $("#userInput")
      .val()
      .trim();
    var newButton = $(".newButton");
    var button = $("<button>" + userInput + "</button>");
    button.attr("data-team", userInput);
    button.attr("class", "myTeams");
    newButton.append(button);

    $(".myTeams").on("click", function() {
      $(".images").empty();
      btnClicked = $(this).attr("data-team");
      console.log(btnClicked);
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        btnClicked +
        "&api_key=p423lQ3Mc0K07s2qLaf7aymo9tTZbXNr&limit=10";

      function gifImage() {
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          for (i = 0; i < response.data.length; i++) {
            var gifs = $(".images");
            var gifDisplay = $("<img>");
            var ratingDisplay = $(
              "<p>" + "rating: " + response.data[i].rating + "</p>"
            );
            gifDisplay.attr(
              "src",
              response.data[i].images.fixed_height_still.url
            );
            gifDisplay.attr(
              "data-still",
              response.data[i].images.fixed_height_still.url
            );
            gifDisplay.attr(
              "data-animate",
              response.data[i].images.fixed_height.url
            );
            gifDisplay.attr("data-state", "still");
            gifs.append(gifDisplay);
            gifs.append(ratingDisplay);

            gifDisplay.on("click", function() {
              var state = $(this).attr("data-state");

              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
          }
        });
      }

      gifImage();
    });
  });
});
