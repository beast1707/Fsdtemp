<?php
$conn = mysqli_connect("localhost", "root", "", "crud_app");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>