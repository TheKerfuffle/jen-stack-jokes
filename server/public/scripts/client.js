console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    // Want to automatically render all jokes to the DOM upon page load
    getJokes();
    // Submit button functionality
    $('#addJokeButton').on('click', sendJoke);
}



function sendJoke() {
    
    // Create a new object to send to the server
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    }

    // Clear inputs
    $('#whoseJokeIn').val();
    $('#questionIn').val();
    $('#punchlineIn').val();
    
    // POST our new joke
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    })
    .then(function (response) {
        getJokes();
    })
    .catch( function (error) {
        console.log('error from server', error);
        alert('sorry, could not get jokes. Try again later.');
    })

}

function getJokes() {

    // GET all jokes from our server
    $.ajax({
        method: 'GET',
        url: '/jokes'
    })
    .then(function (response) {
        // Everytime we get Jokes, we want to write them to the DOM
        render(response);
    })
    .catch( function (error) {
        console.log('error from server', error);
        alert('sorry, could not get jokes. Try again later.');
    })
}

function render(allJokes) {
    // Empty the Div
    $('#outputDiv').empty();

    // Write Jokes to the DOM
    for (let joke of allJokes) {
        $('#outputDiv').append(`<h4>${joke.jokeQuestion}</h4><p>${joke.punchLine}</p><p>- ${joke.whoseJoke}</p><p> ---------- </p>`);
    }
}