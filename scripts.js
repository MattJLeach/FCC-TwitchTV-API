// Array of channels
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Function for making AJAX call
function getDetails(channel, callback) {
	$.ajax({
		url: 'https://wind-bow.hyperdev.space/twitch-api/channels/' + channel,
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
		getDetails(channels[i], function(data) {
			// Append channel details to #output
			$('#output').append('<div class="channelPanel">' + 
				'<img src="' + data.logo + '">' +
				'<div class="channelName">' + data.display_name + '</div>' +
				'<div class="channelStatus">' + data.status + '</div></div><hr />');
		});
	}

});