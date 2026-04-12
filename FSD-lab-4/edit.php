<?php
include 'config.php';

$id = $_GET['id'];

$stmt = mysqli_prepare($conn, "SELECT * FROM students WHERE id=?");
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);
if (isset($_POST['update'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];
    $stmt = mysqli_prepare($conn,
        "UPDATE students SET name=?, email=?, course=? WHERE id=?");
    mysqli_stmt_bind_param($stmt, "sssi",
        $name, $email, $course, $id);
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
<h1>Edit Student</h1>
<form method="POST">
    <input type="text" name="name" value="<?php echo $row['name']; ?>" required>
    <input type="email" name="email" value="<?php echo $row['email']; ?>" required>
    <input type="text" name="course" value="<?php echo $row['course']; ?>" required>
    <button type="submit" name="update">Update</button>
</form>
</div>
</body>
</html>