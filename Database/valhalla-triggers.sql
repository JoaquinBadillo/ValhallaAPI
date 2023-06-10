-- Valhalla Database Triggers
-- Version 1.0
-- Triggers that allow the deletion of users.

-- Last edited June 05, 2023
-- Joaquín Badillo

DROP TRIGGER IF EXISTS delete_level ON games;
DROP TRIGGER IF EXISTS delete_metrics ON users;
DROP TRIGGER IF EXISTS delete_user_game ON users;
DROP TRIGGER IF EXISTS delete_user_deaths ON users;

CREATE OR REPLACE FUNCTION delete_level()
RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM levels WHERE levels.level_id = OLD.level_id;
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_level
AFTER DELETE ON games
FOR EACH ROW
EXECUTE PROCEDURE delete_level();

CREATE OR REPLACE FUNCTION delete_metrics()
RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM metrics WHERE metrics.metrics_id = OLD.metrics_id;
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_metrics
AFTER DELETE ON users
FOR EACH ROW
EXECUTE PROCEDURE delete_metrics();

CREATE OR REPLACE FUNCTION delete_user_game()
RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM games WHERE games.game_id = OLD.game_id;
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_user_game
AFTER DELETE ON users
FOR EACH ROW
EXECUTE PROCEDURE delete_user_game();

CREATE OR REPLACE FUNCTION delete_user_deaths()
RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM deaths WHERE deaths.user_id = OLD.user_id;
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_user_deaths
AFTER DELETE ON users
FOR EACH ROW
EXECUTE PROCEDURE delete_user_deaths();
