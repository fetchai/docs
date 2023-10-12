CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

---------------------------------------------------------------------------------------------------
-- Clear all old schema
---------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS migrations;

---------------------------------------------------------------------------------------------------
-- Common
---------------------------------------------------------------------------------------------------

CREATE
OR REPLACE FUNCTION trigger_update_modified_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.modified_at
= NOW();
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

---------------------------------------------------------------------------------------------------
-- Table: migrations
---------------------------------------------------------------------------------------------------

CREATE TABLE migrations
(
    id         SERIAL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id)
);

---------------------------------------------------------------------------------------------------
-- Table: organisations
---------------------------------------------------------------------------------------------------

CREATE TABLE feedbacks
(
    id          SERIAL,
    feedback_type VARCHAR(255),
    description VARCHAR(255),
    page_url    VARCHAR(255),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id)
);

CREATE TRIGGER update_modified_at
    BEFORE UPDATE
    ON feedbacks
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_modified_at();
