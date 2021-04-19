console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    getJokes();
}



function getJokes() {
    
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