<?php
// Database configuration
$host = 'localhost'; // or your host
$dbname = 'sqa';
$username = 'root'; // your database username
$password = 'mysql'; // your database password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
