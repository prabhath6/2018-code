var all = {};

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
        all[channel] = msg;
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

    for(var key in data) {
        var channel = data[key];
        console.log(channel);
        if(channel.stream) {
            onlineSectionElement.innerHTML += `<a href="${channel['_links']['channel']}" class="list-group-item list-group-item-action list-group-item-success text-center">${channel['stream']['game']}</a><br>`;
            allSectionElement.innerHTML += `<a href="${channel['_links']['channel']}" class="list-group-item list-group-item-action list-group-item-success text-center">${channel['stream']['game']}</a><br>`;
        } else {
            offlineSectionElement.innerHTML += `<a href="${channel['_links']['channel']}" class="list-group-item list-group-item-action list-group-item-danger text-center">${key}</a><br>`;
            allSectionElement.innerHTML += `<a href="${channel['_links']['channel']}" class="list-group-item list-group-item-action list-group-item-danger text-center">${key}</a><br>`;
        }
    }
}

$(document).ajaxStop(function() {
    createList(all);
});
