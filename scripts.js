// Array of channels
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Function for making AJAX call
function getDetails(type, channel, callback) {
	$.ajax({
		url: 'https://wind-bow.hyperdev.space/twitch-api/' + type + '/' + channel,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			callback(data);
		},
		error: function(err) {
			alert('Oops, you broke it');
		}
	});
}

$(function() {

	// On load run the AJAX function for each channel in the array
	for( var i = 0; i < channels.length; i++ ) {

		// Setup blank variables
		var logo, name, stream, status;

		// Make first AJAX call for channel details
		getDetails('channels', channels[i], function(data) {
			// set channel variables
			logo = data.logo;
			name = data.display_name;
		
			// Make second AJAX call for stram details
			getDetails('streams', channels[i], function(data) {
				// set stream variables
				if(data.stream === null || data.stream === undefined) {
					stream = 'Offline',
					status = 'offline'
				} else {
					stream = data.game,
					status = 'online'
				}

				$('#output').append('<div class="channelPanel">' + 
					'<img src="' + logo + '">' +
					'<div class="channelName">' + name + '</div>' +
					'<div class="channelStatus">' + status + '</div></div><hr />');
				});		
			});

	}
});