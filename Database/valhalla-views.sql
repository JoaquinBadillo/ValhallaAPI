-- Create Postgresql Views
-- Net Kills View
DROP VIEW IF EXISTS top_kills;
CREATE VIEW top_kills AS
SELECT users.user_id, users.username, metrics.kills
FROM users
INNER JOIN metrics USING (metrics_id)
ORDER BY metrics.kills DESC
LIMIT 10;

-- Weekly Eliminations Leaderboard
-- (You only need to play that week to appear on the leaderboard)
DROP VIEW IF EXISTS top_weekly_elims;
CREATE VIEW top_weekly_elims AS
SELECT users.user_id, users.username, metrics.kills
FROM users
INNER JOIN metrics USING (metrics_id)
WHERE metrics.last_update >= DATE_TRUNC('week', CURRENT_DATE)
ORDER BY metrics.kills DESC;

-- Place of Death View
DROP VIEW IF EXISTS death_place;
CREATE VIEW death_place AS
SELECT deaths.room, COUNT(deaths.room) AS "total"
FROM deaths
GROUP BY deaths.room;

-- Cause of Death View (Which type of character killed the player)
DROP VIEW IF EXISTS death_cause;
CREATE VIEW death_cause AS
SELECT deaths.killer, COUNT(deaths.killer) AS "total"
FROM deaths
GROUP BY deaths.killer;

