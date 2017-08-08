<?php
$filename = $_FILES['file']['name'];
$key1 = $_POST['key1'];
$key2 = $_POST['key2'];
if ($filename) {
    move_uploaded_file($_FILES["file"]["tmp_name"],
      "uploads/images/" . $filename);
}
//print_r($_FILES);
//echo $key1;
//echo $key2;

$path = "http://localhost/lucas/H5uploadify/uploads/".$filename;
echo json_encode($path);
?>