var previewSize = 800;
$(document).ready(function() {

	$("input[type='file']").on("change", function() {
		var file = this.files[0];
		console.log(file);
		var formData = new FormData();
		formData.append('functionname', 'upload');
		formData.append('file', this.files[0]);
		formData.append('fileName', this.files[0].name);
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
				console.log(JSON.parse(data));
				var new_html = html_concat(data);
				console.log(new_html);
				$("#main-folder-content").html(new_html);
			},
			error: function(xhr) {
				alert("Failure!");
			}
		});
	});

});