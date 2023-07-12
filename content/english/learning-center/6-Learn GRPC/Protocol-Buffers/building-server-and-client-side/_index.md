---
title: "Building-server-and-client"
date: 2023-04-27
draft: false
# description
description: "Get-to-know-about grpc"
weight: 1
---
Now we have created DB layer,let's create a grpc.Server and start it up.

To create a gRPC server in Go for your service, you can use the grpc.NewServer() function from the google.golang.org/grpc package. Here's an example of how you can create a server for the PersonService we defined earlier:
```go
package main

import (
	"log"
	"net"

	"google.golang.org/grpc"

	api "my-app/api/v1"
)

func main() {
	// create a TCP listener on port 50051
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	// create a new gRPC server instance
	server := grpc.NewServer()

	// register the PersonService with the gRPC server
	api.RegisterPersonServiceServer(server, &personServer{})

	// start the gRPC server
	if err := server.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```
In this example, we created a new grpc.Server instance using the grpc.NewServer() function. We then register our PersonService implementation with the server using the api.RegisterPersonServiceServer(server, &personServer{}) function. Here, personServer is the implementation of the PersonService interface. Finally, we start the server by calling the Serve method with the TCP listener we created earlier.

Now the task at our hands is to add RPC methods so tha server can establish connection receive gRPC requests.Here below i'm providing an example:
- importing all the functionalities and importing your packages.
```go
package main

import (
	"context"
	"fmt"
	"net"

	"google.golang.org/grpc"

	api "your-package-name-here/api/v1"
	"your-package-name-here/database"
)

type personServer struct {
	db *gorm.DB
}
```
- Creating a person instance from the requested data
```go
func (s *personServer) CreatePerson(ctx context.Context, req *api.CreatePersonRequest) (*api.CreatePersonResponse, error) {
	// create a new Person instance from the request data
	p := &database.Person{
		Name:  req.Name,
		Email: req.Email,
		Phone: req.Phone,
	}

	// insert the new Person into the database
	err := s.db.Create(p).Error
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create person: %v", err)
	}

	// create a response with the ID of the newly created Person
	res := &api.CreatePersonResponse{
		Id: uint64(p.ID),
	}

	return res, nil
}
```
- Add the implementation of GetPerson and all the functionalities like delete,update and list.
```go
func (s *personServer) GetPerson(ctx context.Context, req *api.GetPersonRequest) (*api.GetPersonResponse, error) {
	// find the Person in the database by ID
	var p database.Person
	err := s.db.First(&p, req.Id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, status.Errorf(codes.NotFound, "person with ID %d not found", req.Id)
		}
		return nil, status.Errorf(codes.Internal, "failed to get person: %v", err)
	}


	// create a response with the Person data
	res := &api.GetPersonResponse{
		Id:    uint64(p.ID),
		Name:  p.Name,
		Email: p.Email,
		Phone: p.Phone,
	}

	return res, nil
}

func (s *personServer) UpdatePerson(context.Context, *api.UpdatePersonRequest) (*api.UpdatePersonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdatePerson not implemented")
}

func (s *personServer) DeletePerson(context.Context, *api.DeletePersonRequest) (*api.DeletePersonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeletePerson not implemented")
}

func (s *personServer) ListPeople(context.Context, *api.ListPeopleRequest) (*api.ListPeopleResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListPeople not implemented")
}
```
- This is a sample of the main function you need to implement after creating a database connection
```go
func main() {
	// create a new database connection
	db, err := database.NewDB()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer db.Close()

	// create a new gRPC server
	s := grpc.NewServer()

	// register the PersonService server
	api.RegisterPersonServiceServer(s, &personServer{db: db})
```
- Listen to TCP port 
```go
	// listen on TCP port 50051
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
```
- To start the grpc server
```go
	// start the gRPC server
	fmt.Println("listening on :50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```
In the above xample it is a good practice to add an unimplemented method for every RPC method in your service interface. This is because gRPC will generate code for the client that calls these methods, and if you don't provide an implementation for them, the client will not be able to communicate with the server.

let's continue building the gRPC service implementation.

We have already implemented the CreatePerson and GetPerson methods of the PersonService interface. Now, let's implement the ListPersons method.

The ListPersons method should return a list of all the persons in the database. Here's one way to implement it:
```go
func (s *personServer) ListPersons(ctx context.Context, req *api.ListPersonsRequest) (*api.ListPersonsResponse, error) {
	// query the database to get all the persons
	var persons []*database.Person
	err := s.db.Find(&persons).Error
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to list persons: %v", err)
	}

	// create a response with the list of persons
	res := &api.ListPersonsResponse{}
	for _, p := range persons {
		res.Persons = append(res.Persons, &api.Person{
			Id:    uint64(p.ID),
			Name:  p.Name,
			Email: p.Email,
			Phone: p.Phone,
		})
	}

	return res, nil
}
```
