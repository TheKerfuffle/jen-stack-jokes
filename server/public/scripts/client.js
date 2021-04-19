console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    getJokes();
    $('#addJokeButton').on('click', sendJoke);
}



function sendJoke() {
    
    // Create a new package to send to the server
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#jokeQuestion').val(),
        punchLine: $('#punchLine').val(),
    }

    // Clear inputs
    $('#whoseJokeIn').val()
    $('#jokeQuestion').val()
    $('#punchLine').val()
    
    // POST our new joke
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newValues,
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
        render(response);
    })
    .catch( function (error) {
        console.log('error from server', error);
        alert('sorry, could not get jokes. Try again later.');
    })
}

function render(allJokes) {
    $('#outputDiv').empty();

    for (let joke of allJokes) {
        $('#outputDiv').append(`<h4>${joke.jokeQuestion}</h4><p>${joke.punchLine}</p><p>- ${joke.whoseJoke}</p>`);
    }
}