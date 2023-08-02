---
draft: false
title: "DevOps"
date: 2023-07-10
weight: 1
# description
description: "Step GOy step guide on how to sign Git commits with a valid OpenID Connect identity"
category: "Role based Mindmaps"
---

## Mindmap

```mermaid
mindmap
  root(Learn a programming language)
    Python
    Ruby
    Go
    Operating System
      VCS Hosting
      Version Control System
```

<hr/>

## Flowchart

```mermaid
flowchart TD
  A[Python] -->|Go| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
```

<hr/>

## C4Context

```mermaid
C4Deployment
  title Deployment Diagram for Internet Banking System - Live

  Deployment_Node(mob, "Customer's mobile device", "Apple IOS or Android"){
    Container(mobile, "Python", "Xamarin", "Provides a limited subset of the Internet Banking functionality to customers via their mobile device.")
  }

  Deployment_Node(comp, "Customer's computer", "Microsoft Windows or Apple macOS"){
    Deployment_Node(browser, "Web Browser", "Google Chrome, Mozilla Firefox,<br/> Apple Safari or Microsoft Edge"){
      Container(spa, "Go", "JavaScript and Angular", "Provides all of the Internet Banking functionality to customers via their web browser.")
    }
  }

  Deployment_Node(plc, "Big Bank plc", "Big Bank plc data center"){
    Deployment_Node(dn, "bigbank-api*** x8", "Ubuntu 16.04 LTS"){
      Deployment_Node(apache, "Apache Tomcat", "Apache Tomcat 8.x"){
        Container(api, "API Application", "Java and Spring MVC", "Provides Internet Banking functionality via a JSON/HTTPS API.")
      }
    }
    Deployment_Node(bb2, "bigbank-web*** x4", "Ubuntu 16.04 LTS"){
      Deployment_Node(apache2, "Apache Tomcat", "Apache Tomcat 8.x"){
        Container(web, "Web Application", "Java and Spring MVC", "Delivers the static content and the Internet Banking single page application.")
      }
    }
    Deployment_Node(bigbankdb01, "bigbank-db01", "Ubuntu 16.04 LTS"){
      Deployment_Node(oracle, "Oracle - Primary", "Oracle 12c"){
        ContainerDb(db, "Database", "Relational Database Schema", "Stores user registration information, hashed authentication credentials, access logs, etc.")
      }
    }
    Deployment_Node(bigbankdb02, "bigbank-db02", "Ubuntu 16.04 LTS") {
      Deployment_Node(oracle2, "Oracle - Secondary", "Oracle 12c") {
        ContainerDb(db2, "Database", "Relational Database Schema", "Stores user registration information, hashed authentication credentials, access logs, etc.")
      }
    }
  }

  Rel(mobile, api, "Makes API calls to", "json/HTTPS")
  Rel(spa, api, "Makes API calls to", "json/HTTPS")
  Rel_U(web, spa, "Delivers to the customer's web browser")
  Rel(api, db, "Reads from and writes to", "JDBC")
  Rel(api, db2, "Reads from and writes to", "JDBC")
  Rel_R(db, db2, "Replicates data to")

  UpdateRelStyle(spa, api, $offsetY="-40")
  UpdateRelStyle(web, spa, $offsetY="-40")
  UpdateRelStyle(api, db, $offsetY="-20", $offsetX="5")
  UpdateRelStyle(api, db2, $offsetX="-40", $offsetY="-20")
  UpdateRelStyle(db, db2, $offsetY="-10")
```

<hr/>

## ZenUML

```mermaid
zenuml
  title Reply message
  Python->A.method() {
    GO.method() {
      if(condition) {
        return Python
        // return early
        @return
        A->Python: x11
      }
    }
    return go
  }
```

```mermaid
zenuml
  BookLibService.Borrow(id) {
    User = Python.GetUser()
    if(User.isActive) {
      try {
        BookRepository.Update(id, onLoan, User)
        receipt = new Receipt(id, dueDate)
      } catch (BookNotFoundException) {
        ErrorService.onException(BookNotFoundException)
      } finally {
        Connection.close()
      }
    }
    return receipt
  }
```