$("document").ready(function() {
	var brightness = $("<div id='brightness-slider' class='inline'></div>").insertAfter("#brightness").slider({
		value: 0,
		min: -100,
		max: 100,
		range: "min",
		step: 1,
		stop: function( event, ui ) {
			$("#brightness").val(ui.value).change();
		}
	});

	var contrast = $("<div id='contrast-slider' class='inline'></div>").insertAfter("#contrast").slider({
		value: 0,
		min: -100,
		max: 100,
		range: "min",
		step: 1,
		stop: function( event, ui ) {
			$("#contrast").val(ui.value).change();
		}
	});

	var red = $("<div id='red-slider' class='inline'></div>").insertAfter("#red").slider({
		value: 0,
		min: 0,
		max: 100,
		range: "min",
		step: 1,
		stop: function( event, ui ) {
			$("#red").val(ui.value).change();
		}
	});

	var green = $("<div id='green-slider' class='inline'></div>").insertAfter("#green").slider({
		value: 0,
		min: 0,
		max: 100,
		range: "min",
		step: 1,
		stop: function( event, ui ) {
			$("#green").val(ui.value).change();
		}
	});

	var blue = $("<div id='blue-slider' class='inline'></div>").insertAfter("#blue").slider({
		value: 0,
		min: 0,
		max: 100,
		range: "min",
		step: 1,
		stop: function( event, ui ) {
			$("#blue").val(ui.value).change();
		}
	});

	var intense = $("<div id='intense-slider' class='inline'></div>").insertAfter("#intense").slider({
		value: 0,
		min: 0,
		max: 100,
		range: "min",
		step: 1,
		stop: function( event, ui ) {
			$("#intense").val(ui.value).change();
		}
	});
/*
	$("#rotation-slider").slider({
		value: 0,
		min: 0,
		max: 360,
		range: "min",
		step: 45,
		stop: function( event, ui ) {
			rotation();
		}
	});
*/
	$(document).on('change', 'input[class=editor_input]', function() {
		var bright = parseInt($("#brightness").val());
		//console.log("Brightness = "+ bright);
		var cont = parseInt($("#contrast").val());
		//console.log("Contrast = "+ cont);
		var r = parseInt($("#red").val());
		//console.log("Red = " + r);
		var g = parseInt($("#green").val());
		var b = parseInt($("#blue").val());
		var intensity = parseInt($("#intense").val());
		$(brightness).slider("value", bright);
		$(contrast).slider("value", cont);
		$(red).slider("value", r);
		$(green).slider("value", g);
		$(blue).slider("value", b);
		$(intense).slider("value", intensity);
		if($("#canvas").length) {
			Caman("#canvas", function() {
				this.revert(false);
				this.brightness(bright);
				this.contrast(cont);
				this.colorize(r, g, b, intensity);
				this.render();
			});
		}
	})
})

function rotation() {
	var rotation = $("#rotation-slider").slider("value");
	console.log(rotation);
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');
	context.translate(view[0].width / 2, view[0].height / 2);
	context.rotate(Math.PI / 4);
}