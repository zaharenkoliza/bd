<?php
session_start();

if (isset($_SESSION['token'])) {
	header("Location: ./php/profile.php");
}
else {
	header("Location: ./php/start.php");
}
?>