<?php

	$uploaddir = '/usr/cs/undergrad/2018/bjacques/public_html/final/images/';
	$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

	if(move_uploaded_file($_FILES['userfile']['name'], $uploadfile)) {
		echo "File is valid and was successfully uploaded."
	} else {
		echo "File upload failed. Possible file upload attack!";
	}

	print_r($_FILES);
?>