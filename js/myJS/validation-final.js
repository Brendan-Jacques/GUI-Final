$("document").ready(function() {
	$("#picture_editor").validate({
		rules: {
			brightness: {
				digits: true,
				min: -100,
				max: 100
			},
			contrast: {
				digits: true,
				min: -100,
				max: 100
			}
		},
		messages: {
			brightness: {
				digits: "*Please enter a number value between -100 and 100."
			}
		}
	});
})