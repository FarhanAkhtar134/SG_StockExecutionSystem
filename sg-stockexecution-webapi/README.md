# sg-stockexecution-webapi
Web API Stock Execution SYstem 


## **Component 2** 

Web API

Web API is designed using Java Spring boot framework. Spring Boot provides a flexible way to create restful web services. In Spring Boot, everything is auto configured therefore, manual configuration is not required. Spring Boot provides a robust architecture that eases dependency management.  
  
### **Initializing component 2:**  

1. Clone the github repository  SG_StockExecutionSystem to a local folder.
2. Inside this repository there is a folder named as: sg-stockexecution-webapi. This folder contains the code for the Web API
3. Open sg-stockexecution-webapi folder in an IDE e.g. Intellij. 
4. The IDE will resolve dependencies needed for the project. Alternatively, build the project with mvn package. This is a maven project hence, import all the maven dependencies.   
5. Configure datasource. The web api connects to the mongodb database initialized in component 1. Therefore, configure the datasource in the IDE by creating a new datasource which is a mongodb database.
    - E.g. if the project is opened in  intellij IDE, then navigate to View | Tool windows | Databases. 
    - Click the + icon and select datasource. Select the mongoDB data source. 
    - In window that opens, the IDE will show the IP of the local machine where the mongodb database is running. 
    - Simply click apply and ok. Then the application will create a new mongodb datasource and connect to it.     
6. After the dependencies resolve , navigate to src/main/java/com/sgstockexecutionsys/webapi/WebapiApplication.java. 
7. Run this java class by right clicking on class declaration and selecting Run 'WebapiApplication'. 
8. The web api application will run on port 8080. 

Make sure component 1 is initialized before running the web api. This is because the web api relies on mongodb connection to the database called stocks. 
The database configuration is present in src/main/resources/application.properties. 

```
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=stocks

```

- In this configuration file, the database IP is localhost i.e., the mongodb database is running on a local machine
- Port on which the mongodb database server is running is 27017
- The name of the mongodb database is: stocks   


**Setup MongoDB datasouce and connect to MongoDB local database in spring boot  **
![setupDB](https://user-images.githubusercontent.com/72380768/155892946-9bcdd221-206c-4c53-bf81-7b8cc603a31f.png)

![mongodb-connection](https://user-images.githubusercontent.com/72380768/155892952-7a068fae-b6e9-42f4-98cc-d0502d171275.png)

![webapi_connected_to_db](https://user-images.githubusercontent.com/72380768/155892947-118bbadb-5773-489b-9788-e62ec8cbabc3.png)

