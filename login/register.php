<?php
if (isset($_POST['register'])) {
    // Include database connection
    require_once "dbconnection.php";

    // Extract data from form
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password']; // Storing the password as plain text directly

// Prepare SQL statement to avoid SQL injection
$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password); // Bind parameters as strings

// Execute the statement
if ($stmt->execute()) {
    echo "<script>alert('Successfully registered'); window.location.href='login.php';</script>";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();

}
?>
>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>
<body>
<div class="container">
  <h2>Register</h2>
  <form action="register.php" method="post">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" name="name" required>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" class="form-control" id="password" name="password" required>
    </div>
    <button type="submit" class="btn btn-default" name="register">Register</button>
  </form>
</div>
</body>
</html>
