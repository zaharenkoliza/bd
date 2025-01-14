<?php

$host = 'localhost';
$db = 'studs';
$user = 's335141';
$password = 'rKux7MCx0SKISIWe';

$dsn = "pgsql:host=$host;port=5432;dbname=$db;";

$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

// print_r($_POST);

// Проверка, если форма была отправлена
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// session_start();
    $username = $_POST['username'];
    $password = $_POST['password'];

	$stmt = $pdo->prepare("SELECT auth(:username, :password)");  // Здесь мы создаём шаблон запроса с параметрами
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);  // Привязываем параметр :username
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);  // Привязываем параметр :password
    $stmt->execute();  // Выполняем запрос

	// $query = $pdo->query("select auth($username, $password)");
	$resultset = $stmt->fetchAll(\PDO::FETCH_ASSOC);

	$jsonString = $resultset[0]['auth']; // Извлекаем строку JSON

    // Декодируем строку JSON в массив
    $data = json_decode($jsonString, true);

    if ($resultset) {
		session_start();  

		$token = $data['token'];
        $_SESSION['token'] = $token;

		echo "<pre>";
        print_r($data);
        echo "</pre>";

        // Перенаправление на страницу профиля
        // header('Location: profile.php');
        // exit();
    } else {
        $error = "Invalid credentials.";
    }
}
?>

<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Sabotur</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../css/index.css">
   </head> 
	<body>
		<h1>Саботёр!!!!!!1</h1>
		<p>онлайн настольная игра</p>
		<button data-show-dialog="auth-dialog">войти</button>
		<button>регистрация</button>
		<button>правила</button>

		<dialog data-dialog-name="auth-dialog">
		<form action="index.php" method="POST">
			<h2>Войти</h2>
			<input name="username" type="text">
			<input name="password" type="text">
			<button type="submit">Войти</button>
</form>
		</dialog>
</body>
<script type="module" src="./scripts/index.js"></script>
</html>