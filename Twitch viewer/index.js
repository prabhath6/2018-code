var all = [];

function getTwitchData() {
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    channels.forEach(channel => {
        getDataFromTwitch(channel, all);
    });
}

function getDataFromTwitch(channel, all) {

    var request = $.ajax({
        url: `https://wind-bow.gomix.me/twitch-api/streams/${channel}`,
        beforeSend: function(request) {
            request.setRequestHeader("Client-ID", 'uo6dggojyb8d6soh92zknwmi5ej1q2');
        },
        method: "GET",
        async: false,
        dataType: "jsonp"
    });

    request.done(function(msg) {
        all.push(msg);
    });

    request.fail(function( jqXHR, textStatus ) {
        console.log(jqXHR);
        console.log(textStatus);
    });
}


function createList(data) {
    var onlineSectionElement = document.getElementById('online');
    var offlineSectionElement = document.getElementById('offline');
    var allSectionElement = document.getElementById('all');

    for(var i = 0; i < data.length; i++) {
        var channel = data[i];
        console.log(channel);
        if(channel.stream) {
            onlineSectionElement.innerHTML += `<li class="list-group-item list-group-item-success">This is a primary list group item</li>`;
            allSectionElement.innerHTML += `<li class="list-group-item list-group-item-success">This is a primary list group item</li>`;
        } else {
            offlineSectionElement.innerHTML += `<li class="list-group-item list-group-item-danger">${channel}</li>`;
            allSectionElement.innerHTML += `<li class="list-group-item list-group-item-danger">This is a danger list group item</li>`;
        }
    }
}




$(document).ajaxStop(function() {
    createList(all);
});
