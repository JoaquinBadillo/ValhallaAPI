-- Valhalla Database Procedures
-- Version 2.0 - Postgresql
-- Procedures that facilitate the creation of users and games

-- Last edited June 05, 2023
-- Joaquín Badillo

CREATE OR REPLACE PROCEDURE create_user(
    _username VARCHAR(30),
    _email VARCHAR(50),
    _password VARCHAR(50))
LANGUAGE plpgsql
AS $$
    BEGIN
        IF (SELECT COUNT(*) FROM users WHERE users.username = _username OR users.email = _email) > 0 THEN
            RAISE EXCEPTION 'User already exists';
        END IF;
        
        INSERT INTO metrics (wins) VALUES (0);
        INSERT INTO users (username, email, password, metrics_id) VALUES
        (_username, _email, _password, LASTVAL()); 
    END;
$$; 

CREATE OR REPLACE PROCEDURE create_game(
    _username VARCHAR(30),
    _character_id INTEGER,
    _seed INTEGER)
LANGUAGE plpgsql
AS $$
    BEGIN
        IF (SELECT COUNT(*) FROM users WHERE users.username = _username) = 0 THEN
            RAISE EXCEPTION 'Invalid User!';
        END IF;
        
        IF (SELECT COUNT(*) FROM users JOIN games USING (game_id) WHERE users.username = _username) > 0 THEN
            RAISE EXCEPTION 'Game Already Exists!';
        END IF;
        
        INSERT INTO levels (level_num, seed) VALUES (1, _seed);
        INSERT INTO games (level_id, character_id) VALUES (LASTVAL(), _character_id);
        UPDATE users SET game_id = LASTVAL() WHERE username = _username;
    END;
$$;

CREATE OR REPLACE PROCEDURE add_death(
    _username VARCHAR(30),
    _room VARCHAR(50),
    _killer VARCHAR(50))
LANGUAGE plpgsql
AS $$
    BEGIN
        IF (SELECT COUNT(*) FROM users WHERE users.username = _username) = 0 THEN
            RAISE EXCEPTION 'Invalid User!';
        END IF;
        
        INSERT INTO deaths (user_id, room, killer) VALUES 
        ((SELECT user_id FROM users WHERE username = _username), _room, _killer);
    END;
$$;