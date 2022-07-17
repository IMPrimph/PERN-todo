create database perntodo;

create table todo(
    todo_id serial primary key not null,
    description varchar(255) not null
)