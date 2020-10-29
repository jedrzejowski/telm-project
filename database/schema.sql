-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: telm | type: DATABASE --
-- -- DROP DATABASE IF EXISTS telm;
-- CREATE DATABASE telm;
-- -- ddl-end --
-- 

-- object: public.patients | type: TABLE --
-- DROP TABLE IF EXISTS public.patients CASCADE;
CREATE TABLE public.patients (
	patient_id uuid NOT NULL,
	name1 text NOT NULL,
	name2 text NOT NULL,
	name3 smallint,
	pesel text,
	sex char NOT NULL,
	date_of_birth date NOT NULL,
	date_of_death date,
	CONSTRAINT patients_pk PRIMARY KEY (patient_id),
	CONSTRAINT sex CHECK (sex='F' or sex = 'M')

);
-- ddl-end --
COMMENT ON COLUMN public.patients.name1 IS E'imie';
-- ddl-end --
COMMENT ON COLUMN public.patients.name2 IS E'nazwisko';
-- ddl-end --
COMMENT ON COLUMN public.patients.name3 IS E'imie2';
-- ddl-end --
COMMENT ON COLUMN public.patients.date_of_birth IS E'data urodzenia';
-- ddl-end --
COMMENT ON COLUMN public.patients.date_of_death IS E'data śmierci';
-- ddl-end --
-- ALTER TABLE public.patients OWNER TO postgres;
-- ddl-end --

-- object: public.examination | type: TABLE --
-- DROP TABLE IF EXISTS public.examination CASCADE;
CREATE TABLE public.examination (
	examination_id uuid NOT NULL,
	personel_id uuid NOT NULL,
	hospitalization_id uuid NOT NULL,
	"timestamp" timestamp NOT NULL,
	pulse numeric(4) NOT NULL,
	temperature numeric(2) NOT NULL,
	blood_pressure1 numeric(3) NOT NULL,
	blood_pressure2 numeric(2) NOT NULL,
	stool numeric(6),
	urine numeric(4),
	comment smallint,
	mass numeric(3),
	CONSTRAINT examination_pk PRIMARY KEY (examination_id)

);
-- ddl-end --
COMMENT ON TABLE public.examination IS E'pomiary';
-- ddl-end --
COMMENT ON COLUMN public.examination.pulse IS E'tętno';
-- ddl-end --
COMMENT ON COLUMN public.examination.temperature IS E'temperatura';
-- ddl-end --
COMMENT ON COLUMN public.examination.blood_pressure1 IS E'ciśnienie tętnicze 1';
-- ddl-end --
COMMENT ON COLUMN public.examination.blood_pressure2 IS E'ciśnienie tętnicze 2';
-- ddl-end --
COMMENT ON COLUMN public.examination.stool IS E'stolec';
-- ddl-end --
COMMENT ON COLUMN public.examination.urine IS E'mocz';
-- ddl-end --
COMMENT ON COLUMN public.examination.comment IS E'zlecenie lekarskie';
-- ddl-end --
COMMENT ON COLUMN public.examination.mass IS E'masa ciała';
-- ddl-end --
-- ALTER TABLE public.examination OWNER TO postgres;
-- ddl-end --

-- object: public.personel | type: TABLE --
-- DROP TABLE IF EXISTS public.personel CASCADE;
CREATE TABLE public.personel (
	personel_id uuid NOT NULL,
	name1 text NOT NULL,
	name2 text NOT NULL,
	name3 text NOT NULL,
	pwz text,
	password text,
	is_admin bool NOT NULL,
	CONSTRAINT personel_pk PRIMARY KEY (personel_id)

);
-- ddl-end --
-- ALTER TABLE public.personel OWNER TO postgres;
-- ddl-end --

-- object: personel_fk | type: CONSTRAINT --
-- ALTER TABLE public.examination DROP CONSTRAINT IF EXISTS personel_fk CASCADE;
ALTER TABLE public.examination ADD CONSTRAINT personel_fk FOREIGN KEY (personel_id)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.hospitalization | type: TABLE --
-- DROP TABLE IF EXISTS public.hospitalization CASCADE;
CREATE TABLE public.hospitalization (
	hospitalization_id uuid NOT NULL,
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
COMMENT ON COLUMN public.hospitalization.time_start IS E'czas od';
-- ddl-end --
COMMENT ON COLUMN public.hospitalization.time_end IS E'czas do';
-- ddl-end --
-- ALTER TABLE public.hospitalization OWNER TO postgres;
-- ddl-end --

-- object: hospitalization_fk | type: CONSTRAINT --
-- ALTER TABLE public.examination DROP CONSTRAINT IF EXISTS hospitalization_fk CASCADE;
ALTER TABLE public.examination ADD CONSTRAINT hospitalization_fk FOREIGN KEY (hospitalization_id)
REFERENCES public.hospitalization (hospitalization_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: patients_fk | type: CONSTRAINT --
-- ALTER TABLE public.hospitalization DROP CONSTRAINT IF EXISTS patients_fk CASCADE;
ALTER TABLE public.hospitalization ADD CONSTRAINT patients_fk FOREIGN KEY (patient_id)
REFERENCES public.patients (patient_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: personel_start_fk | type: CONSTRAINT --
-- ALTER TABLE public.hospitalization DROP CONSTRAINT IF EXISTS personel_start_fk CASCADE;
ALTER TABLE public.hospitalization ADD CONSTRAINT personel_start_fk FOREIGN KEY (personel_id_start)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: personel_end_fk | type: CONSTRAINT --
-- ALTER TABLE public.hospitalization DROP CONSTRAINT IF EXISTS personel_end_fk CASCADE;
ALTER TABLE public.hospitalization ADD CONSTRAINT personel_end_fk FOREIGN KEY (personel_id_end)
REFERENCES public.personel (personel_id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


