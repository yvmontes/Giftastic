var topicsArray = ["Professor X", "Magneto", "Mystique", "Wolverine", "Jean Grey"];

$(document).ready(function() {
    for (var i = 0; i < topicsArray.length; i++) {
        $("#xmen-buttons").append("<button type='button' onclick='searchGif(\"" + topicsArray[i] + "\")' class='btn btn-primary' value=' " + topicsArray[i] + "'> " + topicsArray[i] + " </button>");
    }
});

function xmenButtonClicked() {
    var userInput = $('#xmen-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#xmen-input').val();

    if (userInput) {
        $('#xmen-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=lKtAJLduKg5AKea2RtE4WJPj6tk4B1IW&limit=10',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#xmen').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:400px; height:250px;">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#xmen').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}
