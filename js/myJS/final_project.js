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
		//console.log(val);
		$("#picture_display").html("<img class='canvas view' id='photo-"+ val +"' src='"+ name +"'></img>");
		$("#picture_hyperlink").html("<div><h4>Image Hyperlink</h4></div><a src='"+ adr +"'>"+ adr +"</a>");
		initJCrop(name);
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

	$("#upload").on("click", function(){
    	$(this).text("Uploading...").prop("disabled", true);

    	readFile(file, {
    	    width: uploadSize,
    	    height: uploadSize,
    	    crop: cropCoords
    	}).done(function(imgDataURI) {
    	    var data = new FormData();
    	    var blobFile = dataURItoBlob(imgDataURI);
    	    data.append('file', blobFile);
    	    
    	    $.ajax({
    	        url: "./php/server.js",
    	        data: data,
    	        cache: false,
    	        contentType: false,
    	        processData: false,
    	        type: 'POST',
    	        success: function() {
    	            console.log("Yay!");
    	        },
    	        error: function(xhr) {
    	            console.log(imgDataURI.substr(0,128)+"...");
    	        }
    	    });
    	});
	});

	var initJCrop = function(imgDataUrl){
	    var img = $("img.view").attr("src", imgDataUrl);
	    
	    var storeCoords = function(c) {
	        cropCoords = c;
	    };
	    
	    var w = img.width();
	    var h = img.height();
	    var s = uploadSize;
	    img.Jcrop({
	        onChange: storeCoords,
	        onSelect: storeCoords,	
	        aspectRatio: 1,
	        setSelect: [(w - s) / 2, (h - s) / 2, (w - s) / 2 + s, (h - s) / 2 + s]
	    });
	};

	var readFile = function(file, options) {
	    var dfd = new $.Deferred();
	    var allowedTypes = ["image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/bmp"];
	    if ($.inArray(file.type, allowedTypes) !== -1) {
	        //define FileReader object
	        var reader = new FileReader();
	        var that = this;

	        //init reader onload event handlers
	        reader.onload = function(e) {
	            var image = $('<img/>')
	                .load(function() {
	                    //when image is fully loaded
	                    var newimageurl = getCanvasImage(this, options);
	                    dfd.resolve(newimageurl, this);
	                })
	                .attr('src', e.target.result);
	        };
	        reader.onerror = function(e) {
	            dfd.reject("Couldn't read file " + file.name);
	        };
	        //begin reader read operation
	        reader.readAsDataURL(file);
	    } else {
	        //some message for wrong file format
	        dfd.reject("Selected file format (" + file.type + ") not supported!");
	    }
	    return dfd.promise();
	};

	var getCanvasImage = function(image, options) {
	    //define canvas
	    canvas = document.createElement("canvas"),
	        ratio = {
	            x: 1,
	            y: 1
	        };
	    if (options) {
	        if (image.height > image.width) {
	            ratio.x = image.width / image.height;
	        } else {
	            ratio.y = image.height / image.width;
	        }
	    }
	    canvas.height = options.crop ? Math.min(image.height, options.height) : Math.min(image.height, Math.floor(options.height * ratio.y));
	    canvas.width = options.crop ? Math.min(image.height, options.width) : Math.min(image.width, Math.floor(options.width * ratio.x));
	    ctx = canvas.getContext("2d");

	    if (options.crop) {
	        //get resized width and height
	        var c = options.crop;
	        var f = image.width / options.previewWidth;
	        var t = function(a) {
	            return Math.round(a * f);
	        };
	        ctx.drawImage(image, t(c.x), t(c.y), t(c.w), t(c.h), 0, 0, canvas.width, canvas.height);
	    } else {
	        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
	    }
	    //convert canvas to jpeg url
	    return canvas.toDataURL("image/jpeg");
	};

	function applyCrop() {
  		canvas.width = prefsize.w;
  		canvas.height = prefsize.h;
  		context.drawImage($("img.view"), prefsize.x, prefsize.y, prefsize.w, prefsize.h, 0, 0, canvas.width, canvas.height);
  		validateImage();
	}
})