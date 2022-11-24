/* This file just for reference

/* Create Users table*/
CREATE TABLE IF NOT EXISTS users
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(255)  NOT NULL,
    email character varying(255) NOT NULL,
    domain TEXT [] pg_catalog."default" NOT NULL,
    password character varying(255) NOT NULL,
    subscription_date timestamp NOT NULL,
    subscription_expiry_date timestamp NOT NULL,
    created_on timestamp  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp,
    CONSTRAINT user_id PRIMARY KEY (user_id)
)

/* Create Target table*/
CREATE TABLE IF NOT EXISTS targets
(
    target_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    user_id uuid NOT NULL,
    rate numeric,
    created_on timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update timestamp,
    CONSTRAINT targets_pkey PRIMARY KEY (target_id),
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users
)

/* To insert User */

INSERT INTO public.users(name, email, domain, password, subscription_date, subscription_expiry_date)
VALUES ('esmail', 'user@gmail', string_to_array('gmail', 'hostmal'),'0ca0e701', current_timestamp, current_timestamp);


/* To insert Target */
/* You need to add user_id from last creation*/

INSERT INTO public.targets(name, email, user_id, rate)
VALUES ('khaled', 'khaled@gmail', '50d46c45-1261-4b24-9bef-e8fe5e938042', 4);