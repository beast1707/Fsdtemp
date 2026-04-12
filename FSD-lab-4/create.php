<?php
include 'config.php';

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];

    $stmt = mysqli_prepare($conn,
        "INSERT INTO students (name, email, course) VALUES (?, ?, ?)");

    mysqli_stmt_bind_param($stmt, "sss", $name, $email, $course);
    mysqli_stmt_execute($stmt);

    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
<h1>Add Student</h1>

<form method="POST">
    <input type="text" name="name" placeholder="Enter Name" required>
    <input type="email" name="email" placeholder="Enter Email" required>
    <input type="text" name="course" placeholder="Enter Course" required>
    <button type="submit" name="submit">Save</button>
</form>

</div>
</body>
</html>