create database question_paper_builder;


CREATE SCHEMA IF NOT EXISTS develop;

DROP TABLE IF EXISTS develop.users; 
CREATE TABLE develop.users(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    institute_name VARCHAR(200),
    institute_email VARCHAR(255) UNIQUE NOT NULL,
    institute_phone VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    enabled BIT DEFAULT '1',
    created_at TIMESTAMP DEFAULT NOW()
);




drop procedure if exists develop.users;
CREATE OR REPLACE procedure  develop.users(IN _json json, out output_json JSON)
LANGUAGE 'plpgsql'
AS $procedure$
  
 DECLARE 
 _json JSONB:= _json;
 BEGIN  
	 
	 drop table if exists temp_users;
	 create temporary table temp_users(
		institute_name VARCHAR(200),
	    institute_email VARCHAR(255),
	    institute_phone VARCHAR(255),
	    password VARCHAR(500)
	 );
	
	insert into temp_users(institute_name, institute_email, institute_phone, password) 
    select cast(t->>'name_of_institute' AS text) name_of_institute,
    cast(t->>'email_of_institute' AS varchar(255)) email_of_institute,
    cast(t->>'phone_of_institute' AS varchar(255)) phone_of_institute,
    cast(t->>'password_of_institute' AS varchar(255)) password_of_institute
    from jsonb(_json) as t;
    
   
   if ((select count(*) as count  from temp_users tu join develop.users u on tu.institute_email = u.institute_email) = 0) then
   insert into develop.users(institute_name, institute_email, institute_phone, password)
   select institute_name, institute_email, institute_phone, password from temp_users;
	 output_json:= '{"status":200, "message":"User inserted successfully"}';
	else
	 output_json:= '{"status":409, "message":"User already exists"}';
	END if;

 END
$procedure$;

call develop.users('{
  "name_of_institute": "Dynamite",
  "password_of_institute": "pass@123",
  "email_of_institute": "tech1@gmail.com",
  "phone_of_institute": "76663214805"
}','{}');

select * from temp_users
select * from develop.users
