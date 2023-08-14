---
title: "Building-DB-Layer"
date: 2023-04-30
draft: false
# description
description: "Get-to-know-about grpc"
weight: 3
---
**Let’s start by building database layer**

To create a database layer for the Person service, you can use a database library like gorm. Here's an example of how you can define a Person model and create a database connection using gorm:

- creating a DB instance and estabishing connection with the database.
```go
package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Person struct {
	gorm.Model
	Name  string
	Email string
	Phone string
}

func NewDB() (*gorm.DB, error) {
	// replace these values with your actual database connection parameters
	dsn := "user:password@tcp(localhost:3306)/database_name?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	// migrate the Person table to the database
	err = db.AutoMigrate(&Person{})
	if err != nil {
		return nil, fmt.Errorf("failed to migrate database: %v", err)
	}

	return db, nil
}
```
In this example, we define a Person model using the gorm.Model struct, which provides the basic fields like ID, CreatedAt, UpdatedAt and DeletedAt. We then define a NewDB() function which creates a new database connection using the mysql driver and the provided DSN. We also call the AutoMigrate() method on the database connection to automatically create the Person table in the database.

***Note that you will need to replace the DSN string with the actual connection parameters for your database. You will also need to import the gorm and mysql packages.***

Once you have the Person model and the database connection, you can use the gorm methods to implement the PersonService interface methods. For example, to implement the CreatePerson method, you can use the following code:
```go
func (s *personServer) CreatePerson(ctx context.Context, req *api.CreatePersonRequest) (*api.CreatePersonResponse, error) {
	// create a new Person instance from the request data
	p := &database.Person{
		Name:  req.Name,
		Email: req.Email,
		Phone: req.Phone,
	}
```
- inserting a new person into the database
```go

	// insert the new Person into the database
	err := s.db.Create(p).Error
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create person: %v", err)
	}
```
- creating a response with the ID of newly created person
```go

	// create a response with the ID of the newly created Person
	res := &api.CreatePersonResponse{
		Id: uint64(p.ID),
	}

	return res, nil
}
```
In this example, we create a new Person instance from the request data and insert it into the database using the Create() method on the s.db database connection. We then create a response with the ID of the newly created Person and return it to the client. Note that we use the status package from google.golang.org/grpc/status to return gRPC status codes and error messages.
