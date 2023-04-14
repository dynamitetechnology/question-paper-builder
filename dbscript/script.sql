create database question_paper_builder;


CREATE SCHEMA IF NOT EXISTS develop;

DROP TABLE IF EXISTS develop.role CASCADE; 
CREATE TABLE develop.role(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name VARCHAR(200) unique NOT NULL,
    enabled BIT DEFAULT '1',
    created_at TIMESTAMP DEFAULT NOW()
);



DROP TABLE IF EXISTS develop.users; 
CREATE TABLE develop.users(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name VARCHAR(200),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES develop.role(id),
    enabled BIT DEFAULT '1',
    created_at TIMESTAMP DEFAULT NOW()
);



insert into develop.role(name) values('SCHOOL'),('ADMIN'),('STUDENT'),('INSTITUTE');


drop procedure if exists develop.users;
CREATE OR REPLACE procedure  develop.users(IN _json json, out output_json JSON)
LANGUAGE 'plpgsql'
AS $procedure$
  
 DECLARE 
 _json JSONB:= _json;
 BEGIN  
	 
	 drop table if exists temp_users;
	 create temporary table temp_users(
		name VARCHAR(200),
	    email VARCHAR(255),
	    phone VARCHAR(255),
	    password VARCHAR(500),
	    role_id INT
	 );
	
	insert into temp_users(name, email, phone, password, role_id) 
    select cast(t->>'name' AS text) name,
    cast(t->>'email' AS varchar(255)) email,
    cast(t->>'phone' AS varchar(255)) phone,
    cast(t->>'password' AS varchar(255)) password,
    cast(t->>'role_id' AS INT) role_id
    from jsonb(_json) as t;
    
   if ((select count(*) as count  from temp_users tu join develop.users u on tu.email = u.email) = 0) then
   insert into develop.users(name, email, phone, password, role_id)
   select name, email, phone, password, role_id from temp_users;
	 output_json:= '{"status":200, "message":"account has been created sucessfully"}';
	else
	 output_json:= '{"status":409, "message":"User already exists"}';
	END if;

 END
$procedure$;




call develop.users('{
  "name": "Dynamite",
  "password": "pass@123",
  "email": "tech1@gmail.com",
  "phone": "76663214805"
}','{}');

select * from temp_users

select * from develop.users
select id, name from develop.role where name not in ('ADMIN') and enabled ='1'



