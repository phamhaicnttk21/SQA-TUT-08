<?php
session_start(); // Start a new session or resume the existing one

$loginError = ''; // Initialize login error message

// Check if the login form was submitted
if (isset($_POST['login'])) {
    require_once "dbconnection.php"; // Include your database connection

    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password']; // Password as plain text

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Check if a user exists with the given email
    if ($user = $result->fetch_assoc()) {
        // Check if the entered password matches the one in the database
        if ($password === $user['password']) {
            // Password is correct, set the session
            $_SESSION['user_email'] = $email;
            // Redirect to dashboard
            header("Location: dashboard.php");
            exit;
        } else {
            // Password is incorrect
            $loginError = 'Incorrect email or password.';
        }
    } else {
        // No user found
        $loginError = 'Incorrect email or password.';
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h2>Login</h2>
    <?php
    if (isset($loginError)) {
        echo '<div class="alert alert-danger">' . $loginError . '</div>';
    }
    ?>
    <form action="login.php" method="post">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <button type="submit" name="login" class="btn btn-default">Login</button>
        <p>Don't have an account? <a href="register.php">Sign Up</a></p>
    </form>
</div>
</body>
</html>
