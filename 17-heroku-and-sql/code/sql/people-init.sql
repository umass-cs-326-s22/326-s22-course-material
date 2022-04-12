-- Drop the people table if it exists.
-- We are just doing this to reset the DB each time.
drop table if exists people;

create table if not exists people (
	id varchar(30) primary key,
	name varchar(30),
	age integer
);

insert into 
	people(id, name, age) 
values 
	('1', 'Artemis', 19),
	('2', 'Parzival', 17),
	('3', 'John', 30),
	('4', 'Mia', 22);
