$(document).ready(function () 
{
	var fileNames = new Array();
    $.get("./images", function(data) 
    {
        $("#fileNames").append(data);
    });
    console.log(fileNames);
})