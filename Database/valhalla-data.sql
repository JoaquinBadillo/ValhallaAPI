-- Valhalla Sample Database Data
-- Version 1.0
-- This data will be used for testing

-- Last edited June 05, 2023
-- Joaquín Badillo

USE valhalla;

INSERT INTO stats (hp, primary_attack, secondary_attack, primary_lag, secondary_lag, defense, speed) VALUES
(200, 20, 15, 0.5, 1.5, 5, 2),
(250, 30, 40, 0.5, 1.1, 2, 3),
(150, 15, 35, 0.5, 2, 4, 2);

INSERT INTO classes (name, stats_id) VALUES
('Archer', 1),
('Berserker', 2),
('Spellcaster', 3);

INSERT INTO characters (character_id, class_id, gender) VALUES
(1, 1, 'Female'),
(2, 1, 'Male'),
(3, 2, 'Female'),
(4, 2, 'Male'),
(5, 3, 'Neutral');

CALL create_user('Joaquin', 'joaq@dev.com', 'password');

CALL create_user('Pablo', 'bolio@dev.com', 'password');

CALL create_user('Shaul', 'shabu@dev.com', 'password');

CALL create_game('Joaquin', 1, 12345);

CALL create_game('Pablo', 4, 420);

CALL create_game('Shaul', 5, 1337);