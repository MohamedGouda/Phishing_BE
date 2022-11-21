/* This file just for reference

/* To create the table */
CREATE TABLE IF NOT EXISTS public.targets
(
    target_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    rate numeric,
    created_on timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp without time zone,
    CONSTRAINT targets_pkey PRIMARY KEY (target_id)
)

/* To insert in it */
INSERT INTO public.targets(name, email, user_id, rate)
VALUES ('khaled', 'khaled@gmail', '0ca0e701-2b10-4c40-8fbb-6fbc3553f38a', 4);