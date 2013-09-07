

var mkPayment = function(access_token, phone, email, user_id, note, amount) {
	var result;
	$.ajax({
		type: 'POST',
		url: 'https://api.venmo.com/payments',
		datatype: 'json',
		async: 'false',
		success: function(data) {
			result = data;
		}
	})
	return result;
}
