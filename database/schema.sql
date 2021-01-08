-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: Adam Jędrzejowski


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: telm | type: DATABASE --
-- -- DROP DATABASE IF EXISTS telm;
-- CREATE DATABASE telm
-- 	ENCODING = 'UTF8';
-- -- ddl-end --
-- 
-- -- Appended SQL commands --
-- 
-- create extension if not exists "uuid-ossp";
-- 
-- -- ddl-end --
-- 

-- object: public.patients | type: TABLE --
-- DROP TABLE IF EXISTS public.patients CASCADE;
CREATE TABLE public.patients (
	patient_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name1 text NOT NULL,
	name2 text NOT NULL,
	name3 text,
	pesel text,
	sex char NOT NULL,
	date_of_birth date NOT NULL,
	date_of_death date,
	CONSTRAINT patients_pk PRIMARY KEY (patient_id),
	CONSTRAINT sex CHECK (sex in ('O', 'F', 'M'))

);
-- ddl-end --
COMMENT ON COLUMN public.patients.name1 IS E'nazwisko';
-- ddl-end --
COMMENT ON COLUMN public.patients.name2 IS E'imie';
-- ddl-end --
COMMENT ON COLUMN public.patients.name3 IS E'imie2';
-- ddl-end --
COMMENT ON COLUMN public.patients.date_of_birth IS E'data urodzenia';
-- ddl-end --
COMMENT ON COLUMN public.patients.date_of_death IS E'data śmierci';
-- ddl-end --
-- ALTER TABLE public.patients OWNER TO postgres;
-- ddl-end --

-- object: public.examinations | type: TABLE --
-- DROP TABLE IF EXISTS public.examinations CASCADE;
CREATE TABLE public.examinations (
	examination_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	personel_id uuid NOT NULL,
	hospitalization_id uuid NOT NULL,
	"timestamp" timestamp NOT NULL DEFAULT current_timestamp,
	pulse numeric(3,0),
	temperature numeric(4,2),
	blood_pressure1 numeric(3,0),
	blood_pressure2 numeric(3,0),
	stool bool,
	urine numeric(6,0),
	mass numeric(6,3),
	comment text,
	CONSTRAINT examination_pk PRIMARY KEY (examination_id)

);
-- ddl-end --
COMMENT ON TABLE public.examinations IS E'pomiary';
-- ddl-end --
COMMENT ON COLUMN public.examinations.pulse IS E'tętno';
-- ddl-end --
COMMENT ON COLUMN public.examinations.temperature IS E'temperatura';
-- ddl-end --
COMMENT ON COLUMN public.examinations.blood_pressure1 IS E'ciśnienie tętnicze, rozkurczowe [mmHg]';
-- ddl-end --
COMMENT ON COLUMN public.examinations.blood_pressure2 IS E'ciśnienie tętnicze,skurczowe [mmHg]';
-- ddl-end --
COMMENT ON COLUMN public.examinations.stool IS E'stolec';
-- ddl-end --
COMMENT ON COLUMN public.examinations.urine IS E'mocz (mililitry)';
-- ddl-end --
COMMENT ON COLUMN public.examinations.mass IS E'masa ciała (kg)';
-- ddl-end --
COMMENT ON COLUMN public.examinations.comment IS E'zlecenie lekarskie';
-- ddl-end --
-- ALTER TABLE public.examinations OWNER TO postgres;
-- ddl-end --

-- object: public.personel | type: TABLE --
-- DROP TABLE IF EXISTS public.personel CASCADE;
CREATE TABLE public.personel (
	personel_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username text NOT NULL,
	name1 text NOT NULL,
	name2 text NOT NULL,
	name3 text,
	pwz text,
	is_admin bool NOT NULL DEFAULT false,
	CONSTRAINT personel_pk PRIMARY KEY (personel_id),
	CONSTRAINT username_uq UNIQUE (username)

);
-- ddl-end --
-- ALTER TABLE public.personel OWNER TO postgres;
-- ddl-end --

-- object: personel_fk | type: CONSTRAINT --
-- ALTER TABLE public.examinations DROP CONSTRAINT IF EXISTS personel_fk CASCADE;
ALTER TABLE public.examinations ADD CONSTRAINT personel_fk FOREIGN KEY (personel_id)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.hospitalizations | type: TABLE --
-- DROP TABLE IF EXISTS public.hospitalizations CASCADE;
CREATE TABLE public.hospitalizations (
	hospitalization_id uuid NOT NULL DEFAULT uuid_generate_v4(),
	patient_id uuid NOT NULL,
	time_start timestamp NOT NULL,
	time_end timestamp,
	personel_id_start uuid NOT NULL,
	comment_start text,
	comment_end text,
	personel_id_end uuid,
	CONSTRAINT hospitalization_pk PRIMARY KEY (hospitalization_id)

);
-- ddl-end --
COMMENT ON COLUMN public.hospitalizations.time_start IS E'czas od';
-- ddl-end --
COMMENT ON COLUMN public.hospitalizations.time_end IS E'czas do';
-- ddl-end --
-- ALTER TABLE public.hospitalizations OWNER TO postgres;
-- ddl-end --

-- object: hospitalizations_fk | type: CONSTRAINT --
-- ALTER TABLE public.examinations DROP CONSTRAINT IF EXISTS hospitalizations_fk CASCADE;
ALTER TABLE public.examinations ADD CONSTRAINT hospitalizations_fk FOREIGN KEY (hospitalization_id)
REFERENCES public.hospitalizations (hospitalization_id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: patients_fk | type: CONSTRAINT --
-- ALTER TABLE public.hospitalizations DROP CONSTRAINT IF EXISTS patients_fk CASCADE;
ALTER TABLE public.hospitalizations ADD CONSTRAINT patients_fk FOREIGN KEY (patient_id)
REFERENCES public.patients (patient_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: personel_start_fk | type: CONSTRAINT --
-- ALTER TABLE public.hospitalizations DROP CONSTRAINT IF EXISTS personel_start_fk CASCADE;
ALTER TABLE public.hospitalizations ADD CONSTRAINT personel_start_fk FOREIGN KEY (personel_id_start)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: personel_end_fk | type: CONSTRAINT --
-- ALTER TABLE public.hospitalizations DROP CONSTRAINT IF EXISTS personel_end_fk CASCADE;
ALTER TABLE public.hospitalizations ADD CONSTRAINT personel_end_fk FOREIGN KEY (personel_id_end)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "uuid-ossp" | type: EXTENSION --
-- DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
CREATE EXTENSION "uuid-ossp"
WITH SCHEMA public;
-- ddl-end --

-- object: public.basic_auth | type: TABLE --
-- DROP TABLE IF EXISTS public.basic_auth CASCADE;
CREATE TABLE public.basic_auth (
	password text NOT NULL,
	personel_id uuid NOT NULL
);
-- ddl-end --
-- ALTER TABLE public.basic_auth OWNER TO postgres;
-- ddl-end --

-- object: personel_fk | type: CONSTRAINT --
-- ALTER TABLE public.basic_auth DROP CONSTRAINT IF EXISTS personel_fk CASCADE;
ALTER TABLE public.basic_auth ADD CONSTRAINT personel_fk FOREIGN KEY (personel_id)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: basic_auth_uq | type: CONSTRAINT --
-- ALTER TABLE public.basic_auth DROP CONSTRAINT IF EXISTS basic_auth_uq CASCADE;
ALTER TABLE public.basic_auth ADD CONSTRAINT basic_auth_uq UNIQUE (personel_id);
-- ddl-end --

-- object: public.logs | type: TABLE --
-- DROP TABLE IF EXISTS public.logs CASCADE;
CREATE TABLE public.logs (
	"timestamp" timestamp,
	ip inet,
	headers json,
	method text,
	url text,
	request_data text,
	response_data text
);
-- ddl-end --
-- ALTER TABLE public.logs OWNER TO postgres;
-- ddl-end --


