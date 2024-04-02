<?php
session_start();

if (!isset($_SESSION['user_email'])) {
    // If no session exists, redirect to login page
    header('Location: login.php');
    exit();
}

echo "<h1>Welcome to the Dashboard</h1>";
// Implement your dashboard logic here
?>
