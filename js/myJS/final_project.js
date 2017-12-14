var i = 0; var j = 0;
var images = new Array();
var folders = new Array();
var uploadSize = 300;
var canvas;
var ctx;
//On startup, run an ajax request to the file listFiles to return an array of html elements
//that will be inserted into div id="main-folder"
function html_concat(data) {
	var output;
	if(data[0].length > 1) {
		output = html_concat(data[0]);
	} else {
		output = data[0];
	}
	for(var i = 1; i < data.length; i++) {
		if(data[i].length > 1) {
			output = output.concat(html_concat(data[i]));
		} else {
			output = output.concat(data[i]);
		}
	}
	return output;
}

function fillDatalists() {
	$("#files").html("");
	$("#folders").html("");
	$(images).each(function() {
		$("#files").append(
			"<option value='"+ this +"' />"
		);
	});
	$(folders).each(function() {
		$("#folders").append(
			"<option value='"+ this +"' />"
		);
	});
}
/*
function saveToServer(image, name) {
	var formData = new FormData();
		formData.append('functionname', 'upload-64');
		formData.append('file', image);
		formData.append('fileName', name);
		formData.append('location', 'default');
		for(var pair of formData.entries()) {
  			console.log(pair[0]+ ', '+ pair[1]); 
		}
		$.ajax({
			type: "POST",
			url: "./php/server.php",
			data: formData,
			contentType: false,
			processData: false,
			success: function(data) {
				if(data == 'Nope') {
					console.log(data);
					return;
				}
				//console.log(data);
				var new_data = JSON.parse(data);
				var new_html = html_concat(new_data);
				//console.log(new_html);
				$("#main-folder-content").html(new_html);
				$(".accordion").accordion({
  					collapsible: true,
  					active: false,
  					styleHeight: "content"
  				});
  				images = [];
  				i = 0;
  				$("div.image-selector").each(function() {
  					images[i] = $(this).attr("value");
  					i++;
  				});
  				folders = [];
  				j = 0;
  				$("div.image-folder").each(function() {
  					folders[i] = $(this).attr("value");
  					//console.log(folders[j]);
  					j++;
  				});
  				fillDatalists();
			},
			error: function(xhr) {
				alert("Failure!");
			}
		});
}
*/

$("document").ready(function() {
	$.ajax({
		type: "POST",
		url:"./php/server.php",
		dataType: 'json',
		data: {functionname: 'listFiles'},
		success: function(data) {
			//console.log(data);
			var html = html_concat(data);
			//console.log(html);
			$("#main-folder-content").html(html);
			$(".accordion-main").accordion({
  				collapsible: false,
  				active: false,
  				styleHeight: "content"
  			});
			$(".accordion").accordion({
  				collapsible: true,
  				active: false,
  				styleHeight: "content"
  			});
  			images = [];
  			i = 0;
  			$("div.image-selector").each(function() {
  				images[i] = $(this).attr("value");
  			//	console.log(images[i]);
  				i++;
  			});
  			folders = [];
  			j = 0;
  			$("div.image-folder").each(function() {
  				folders[j] = $(this).attr("value");
  			//	console.log(folders[j]);
  				j++;
  			});
  			fillDatalists();
		}
	})

	$(document).on('click', '.image-selector', function() {
		//FINISH THIS. Still need to figure this out.
		var name = $(this).attr("name");
		var val = $(this).attr("value");
		var adr = $(this).attr("adr");
		if($("#picture_editor").css('display') == 'none') {
			$("#picture_editor").css('display', 'block');
		}
		if($("#picture_hyperlink").css('display') == 'none') {
			$("#picture_hyperlink").css('display', 'block');
		}
		//console.log(val);
		$("#picture_display").html("<img class='view' id='"+ val +"' src='"+ name +"'></img>");
		$("#picture_edit").html("<img class='canvas' id='canvas' src='"+ name +"' ></img>");
		//$("#picture_crop").html("<img class='crop' id='crop' src='"+ name +"' ></img>");
		$("#picture_hyperlink").html("<div><h4>Image Hyperlink</h4></div><a href='"+ adr +"' target='_blank'>"+ adr +"</a>");
		if($("#share").css('display') == 'none') {
		//	$('#facebook-share').html("<a id='facebook-btn' class='btn btn-success clearfix'>Facebook Share</a>")
			$("#twitter-share").html("<a href='https://twitter.com/share' data-url='"+ adr +"' class='twitter-share-button' data-show-count='false'>Tweet</a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>")
			$("#share").css('display', 'block');
		}
	});

	$(document).on('click', '#ui-id-1', function() {
		$(".accordion").accordion("refresh");
	})

	$(document).on('change', "input[type='file']", function() {
		var file = this.files[0];
		console.log(file);
		var formData = new FormData();
		formData.append('functionname', 'upload');
		formData.append('file', this.files[0]);
		formData.append('fileName', this.files[0].name);
		formData.append('location', this.getAttribute('value'));
		for(var pair of formData.entries()) {
  			console.log(pair[0]+ ', '+ pair[1]); 
		}
		$.ajax({
			type: "POST",
			url: "./php/server.php",
			data: formData,
			contentType: false,
			processData: false,
			success: function(data) {
				if(data == 'Nope') {
					console.log(data);
					return;
				}
				//console.log(data);
				var new_data = JSON.parse(data);
				var new_html = html_concat(new_data);
				//console.log(new_html);
				$("#main-folder-content").html(new_html);
				$(".accordion").accordion({
  					collapsible: true,
  					active: false,
  					styleHeight: "content"
  				});
  				images = [];
  				i = 0;
  				$("div.image-selector").each(function() {
  					images[i] = $(this).attr("value");
  					i++;
  				});
  				folders = [];
  				j = 0;
  				$("div.image-folder").each(function() {
  					folders[i] = $(this).attr("value");
  					//console.log(folders[j]);
  					j++;
  				});
  				fillDatalists();
			},
			error: function(xhr) {
				alert("Failure!");
			}
		});
	});

	$("#add-folder").on("click", function() {
		var folder_name = prompt("Please enter new folder name.");
		if(folder_name == null) {
			return;
		}
		var formData = new FormData();
		formData.append('functionname', 'new-folder');
		formData.append('name', folder_name);
		$.ajax({
			type: "POST",
			url: "./php/server.php",
			data: formData,
			contentType: false,
			processData: false,
			success: function(data) {
				//console.log(data);
				var new_data = JSON.parse(data);
				var new_html = html_concat(new_data);
				//console.log(new_html);
				$("#main-folder-content").html(new_html);
				$(".accordion").accordion({
  					collapsible: true,
  					active: false,
  					styleHeight: "content"
  				});
  				images = [];
  				i = 0;
  				$("div.image-selector").each(function() {
  					images[i] = $(this).attr("value");
  					i++;
  				});
  				folders = [];
  				j = 0;
  				$("div.image-folder").each(function() {
  					folders[i] = $(this).attr("value");
  					//console.log(folders[j]);
  					j++;
  				});
  				fillDatalists();
			},
			error: function(data) {
				alert("Failed to create new folder.");
			}
		})
	});

	dialog = $("#dialog-form").dialog({
		autoOpen: false,
		height: 400,
		width: 350,
		modal: true,
		buttons: {
			"Submit": function() {
				var test = document.getElementById("image-name").value;
				var loc = $("div[value='" + test + "']").attr('name');
				console.log(test);
				var formData = new FormData;
				formData.append('functionname', 'move-image');
				formData.append('image-name', $("#image-name").val());
				formData.append('image-location', loc);
				formData.append('folder-name', $("#folder-name").val());
				$.ajax({
					type: "POST",
					url: "./php/server.php",
					data: formData,
					contentType: false,
					processData: false,
					success: function(data) {
						//console.log(data);
						var new_data = JSON.parse(data);
						var new_html = html_concat(new_data);
						//console.log(new_html);
						$("#main-folder-content").html(new_html);
						$(".accordion").accordion({
  							collapsible: true,
  							active: false,
  							styleHeight: "content"
  						});
  						images = [];
  						i = 0;
  						$("div.image-selector").each(function() {
  							images[i] = $(this).attr("value");
  							console.log(images[i]);
  							i++;
  						});
  						folders = [];
  						j = 0;
  						$("div.image-folder").each(function() {
  							folders[j] = $(this).attr("value");
  							console.log(folders[j]);
  							j++;
  						});
  						fillDatalists();
					},
					error: function(data) {
						console.log("Failure!");
					}
				})
				//var image_name = $("#image-name").val();
				//var folder_name = $("#folder-name").val();
				//console.log(image_name);
				//console.log(folder_name);
				dialog.dialog("close");
			},
			Cancel: function() {
				dialog.dialog("close");
			}
		}
	});

	$("#move-image").on('click', function() {
		dialog.dialog("open");
	});

	color_correct = $("#color-form").dialog({
		autoOpen: false,
		width: 800,
		height: 900,
		modal: true,
		"Submit": function(data) {
			console.log("Saved");
			color_correct.dialog("close");
		},
		Cancel: function(data) {
			color_correct.dialog("close");
		}
	});

	$("#color-correct").on("click", function() {
		color_correct.dialog("open");
	});

	$(document).on("click", "#color_correct_save1", function() {
		var download = document.createElement("a");
		var new_image = document.getElementById('canvas').toDataURL();
		download.href = new_image;
		var new_name = prompt("What's the name of the new file?");
		download.download = new_name;
		download.click();
		//var image = new Image();
		//image.src = new_image;
		
		//$("#base64Img").attr('src', $(new_image).val);
		//saveToServer(new_image, new_name);
		console.log("Saved");
		color_correct.dialog("close");
	});

	$(document).on("click", "#color_correct_cancel", function() {
		console.log("Saved");
		color_correct.dialog("close");
	});


})