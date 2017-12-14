<?php
$data = $_POST['functionname'];
//$data = json_decode($new);
//$data = str_replace('&quot;', '""', $data);
function listFiles($dir, $val) {
	$html = array();
	$struct = scandir($dir);

	$adr = "http://weblab.cs.uml.edu/~bjacques/";

	unset($struct[array_search('.', $struct, true)]);
	unset($struct[array_search('..', $struct, true)]);

	$i = 0;
	$j = 0;

	if(count($struct) < 1) {
		$html[$i] = "<input type='file' name='+Add Image' value='". $val ."' />";
		return $html;
	}

	foreach($struct as $s) {
		$sub_dir = $dir . $s;
		if(is_dir($sub_dir."/")) {
			//If the string obtained points to a sub-directory in All Photos...
			//$val = './images/';
			$new_val = $val . $s . "/";
			$html[$i] = "<div id='sub-folder' class='accordion image-folder' value=". $s .">";
			$i++;
			$html[$i] = "<h3>". $s ."</h3>";
			$i++;
			$html[$i] = "<div id='sub-folder-content'>";
			$i++;
			$html[$i] = listFiles($sub_dir."/", $new_val);
			$i++;
			$html[$i] = "</div>";
			$i++;
			$html[$i] = "</div>";
			$i++;
		} else {
			//If the string obtained points to an image address.
			$sub_dir = ltrim($sub_dir, "/usr/cs/undergrad/2018/bjacques/public_html/");
			$adr_new = $adr . $sub_dir;
			$html[$i] = "<div id='photo-". $j ."' class='image-selector' name='". $val . $s ."' value='". $s ."' adr='" . $adr_new . "'>". $s ."</div>";
			$i++;
			$j++;
		}
	}
	$html[$i] = "<input type='file' name='+Add Image' value='". $val ."' class='choose' />";
	return $html;
}

switch($data) {
	case "listFiles":
		$default = "/usr/cs/undergrad/2018/bjacques/public_html/final/images/";
		$val = "./images/";
		$res = listFiles($default, $val);
		echo json_encode($res);
		break;
	case "upload":
		$image = $_FILES['file']['tmp_name'];
		$ext = $info['extension'];
		$name = $_POST['fileName'];
		$location = $_POST['location'];
		if($location == 'default') {
			$location = 'images/';
		} else {
			$location = ltrim($location, "./");
		}

		$target = "/usr/cs/undergrad/2018/bjacques/public_html/final/" . $location . $name;
		if(move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
			$default = "/usr/cs/undergrad/2018/bjacques/public_html/final/images/";
			$val = "./images/";
			$res = listFiles($default, $val);
			echo json_encode($res);
		} else {
			echo json_encode($target);
		}
		break;
		/*
	case "upload-64":
		$image = $_POST['file'];
		$image = str_replace('data:image/png;base64,', '', $image);
		$image = str_replace(' ', '+', $image);
		$image = base64_decode($image);
		//$ext = $info['extension'];
		$name = $_POST['fileName'];
		$location = $_POST['location'];
		if($location == 'default') {
			$location = 'images/';
		} else {
			$location = ltrim($location, "./");
		}

		$target = "/usr/cs/undergrad/2018/bjacques/public_html/final/" . $location . $name;
		if(file_put_contents($image, $target)) {
			$default = "/usr/cs/undergrad/2018/bjacques/public_html/final/images/";
			$val = "./images/";
			$res = listFiles($default, $val);
			echo json_encode($res);
		} else {
			echo json_encode('Nope');
		}
		break;
		*/
	case "new-folder":
		$name = $_POST['name'];
		if(mkdir("/usr/cs/undergrad/2018/bjacques/public_html/final/images/" . $name)) {
			chmod("/usr/cs/undergrad/2018/bjacques/public_html/final/images/" . $name, 0777);
			$default = "/usr/cs/undergrad/2018/bjacques/public_html/final/images/";
			$val = "./images/";
			$res = listFiles($default, $val);
			echo json_encode($res);
		}
		else {
			echo json_encode("Failed");
		}
		break;
	case "move-image":
		//Need to finish this. 
		//Design a function which searches through the folder structure, finds
		//an image with the image-name given, and alter its path to be:
		//(/usr/cs/undergrad/2018/bjacques/public_html/final/images/". folder-name)
		$location = $_POST['image-location'];
		$location = ltrim($location, "./");
		$new_folder = $_POST['folder-name'];
		$name = $_POST['image-name'];

		$folder = "/usr/cs/undergrad/2018/bjacques/public_html/final/" . $location;
		$default = "/usr/cs/undergrad/2018/bjacques/public_html/final/images/";
		if(rename($folder, $default . $new_folder . "/" . $name)) {
			$val = "./images/";
			$res = listFiles($default, $val);
			echo json_encode($res);
		} else {
			echo json_encode($folder);
		}
		break;
	default:
		echo json_encode($data);
		break;
}
?>