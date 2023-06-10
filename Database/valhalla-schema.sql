-- Valhalla Database Schema
-- Version 3.0 - Postgresql
-- Last edited June 05, 2023

-- Developed by Einherjar / Joaquín Badillo, Pablo Bolio, Shaul Zayat

CREATE TABLE metrics (
	metrics_id SERIAL PRIMARY KEY,
    kills SMALLINT NOT NULL DEFAULT 0,
    wins SMALLINT NOT NULL DEFAULT 0,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE levels (
	level_id SERIAL PRIMARY KEY,
    level_num SMALLINT NOT NULL DEFAULT 1,
    seed INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE stats (
    stats_id SERIAL PRIMARY KEY,
    hp SMALLINT NOT NULL,
    primary_attack SMALLINT NOT NULL,
    secondary_attack SMALLINT NOT NULL,
    primary_lag FLOAT NOT NULL,
    secondary_lag FLOAT NOT NULL,
    defense SMALLINT NOT NULL,
    speed FLOAT NOT NULL
);

CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    stats_id SMALLINT NOT NULL,
    CONSTRAINT fk_classes_stats 
         FOREIGN KEY (stats_id) 
            REFERENCES stats (stats_id) ON UPDATE CASCADE
);

CREATE TABLE characters (
    character_id SERIAL PRIMARY KEY,
    class_id SMALLINT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    CONSTRAINT fk_characters_classes 
         FOREIGN KEY (class_id) 
            REFERENCES classes (class_id) ON UPDATE CASCADE
);


CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    level_id SMALLINT NOT NULL,
    character_id SMALLINT NOT NULL,
    CONSTRAINT fk_levels_game 
         FOREIGN KEY (level_id) 
            REFERENCES levels (level_id) ON UPDATE CASCADE,
    CONSTRAINT fk_character_id 
         FOREIGN KEY (character_id) 
            REFERENCES characters (character_id) ON UPDATE CASCADE
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(32) NOT NULL,
    metrics_id SMALLINT NOT NULL,
    game_id SMALLINT DEFAULT NULL,
    CONSTRAINT fk_users_metrics 
         FOREIGN KEY (metrics_id) 
            REFERENCES metrics (metrics_id) ON UPDATE CASCADE,
    CONSTRAINT fk_users_game 
         FOREIGN KEY (game_id) 
            REFERENCES games (game_id) ON UPDATE CASCADE
);

CREATE TABLE deaths(
    deaths_id SERIAL PRIMARY KEY,
    user_id SMALLINT NOT NULL,
    room VARCHAR(50) NOT NULL,
    killer VARCHAR(50),
    CONSTRAINT fk_deaths_users 
         FOREIGN KEY (user_id) 
            REFERENCES users (user_id) ON UPDATE CASCADE
);