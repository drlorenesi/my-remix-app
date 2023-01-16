DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255),
	pass VARCHAR(255),
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
	users (username, pass)
VALUES
	('test', 'test'),
	('user123', 'abc123'),
	('johnDoe', 'password');

CREATE TABLE IF NOT EXISTS posts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255),
	body TEXT,
	user_id INT,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO 
	posts (title, body, user_id)
VALUES
	('JavaScript 😀', 'My favorite programming language.', 1),
	('Python', 'Meh, I guess its alright.', 2),
	('Java', 'Dude...', 2),
	('JavaScript Performance Tips','We will look at 10 simple tips and tricks to increase the speed of your code when writing JS', 3),
	('Tailwind vs. Bootstrap','Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them', 1),
	('Writing Great Unit Tests','We will look at 10 simple tips and tricks on writing unit tests in JavaScript', 3),
	('What Is New In PHP 8?','In this article we will look at some of the new features offered in version 8 of PHP`', 2);
