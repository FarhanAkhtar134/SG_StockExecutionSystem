# SG_StockExecutionSystem

This application consists of three main components. 

Component 1 is the database design using NoSQL mongodb framework. 

Component 2 is the backend Web API built using Java Spring Boot framework. 

Component 3 is the front end Web UI built using ReactJs with Typescript. 


Project requirements: 

- JDK 11
- Nodejs v17.4.0



## **Component 1** 

**MongoDB database setup**

MongoDB database is used for storing stocks data. It provides efficient and flexible framework for storing data. Since there is no strict schema structure in mongodb, it simplifies querying data. 

### **Initializing component 1:**  

1. Install MongoDB database server and relevant mongoDB GUI tools. We can also use monogdb shell (mongosh). 
2. Run mongodb service. We can also use mongodb Compass to connect to mongodb database. 
3. Create a new database in mongodb. The name of the database must be **stocks**.
4. Create two collections in stocks database namely:
    - stockList (stockList collection contains all the stocks.)
    - orderList (orderList collection contains orders. )

5. Populate stockList collection with the dummy data provided in file stocks.json. 
6. E.g. run MongoDB Compass, connect to localhost and then select the stocks db. After this create and then select the stockList collection and  import the stocks.json file in the collection stockList. This will add the dummy data from stocks.json file into the collection stockList. 
7. The orderList collection will contain order documents. These will be provided from the web api. 
8. orderList collection will be populated through orders (Buy/Sell) initiated in web api. 

Keep this mongoDB server running as the backend web api will connect with the stocks database in mongodb to query/fetch stocks. 

## **Component 2** 

**Web API**

Web API is designed using Java Spring boot framework. Spring Boot provides a flexible way to create restful web services. In Spring Boot, everything is auto configured therefore, manual configuration is not required. Spring Boot provides a robust architecture that eases dependency management.  
  
### **Initializing component 2:**  

1. Clone the github repository  SG_StockExecutionSystem to a local folder.
2. Inside this repository there is a folder named as: sg-stockexecution-webapi. This folder contains the code for the Web API
3. Open this folder in an IDE e.g. Intellij. 
4. The IDE will resolve dependencies needed for the project. Alternatively, build the project with mvn package. 
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

- In this configuration file, the mongodb database IP is localhost i.e., the mongodb database is running on a local machine
- Port on which the mongodb database server is running is 27017
- The name of the mongodb database is: stocks   


## **Component 3** 

**Web UI**


### **Initializing component 3:**  

Web UI is designed using React js with typescript. React Js allows development of complex user interfaces. Typescript adds semantic correction to core javascript hence, allows writing robust javascript code. 

1. Clone the github repo SG_StockExecutionSystem to a local folder.
2. Inside the repository there is a folder named SG-StockExecutionSystem-WebUI. This contains the Web UI code. 
3. Open SG-StockExecutionSystem-WebUI folder using visual studio IDE.
4. Open terminal in the project folder or navigate in the project folder through the terminal.
5. Run **npm install** to install all the dependencies of the project. 
6. Run **npm start** to run the Web UI application. 
7. The Web UI application will run on port 3000. Type the following url in browser search bar http://localhost:3000/

Packages used for web UI: 
1. React admin

This is used to bootstrap the react project. React admin provides components and styles that are used to bootstrap a react application. 
React admin makes use of Material UI to provide styles for the react components. 

2. react redux 
3. redux toolkit

These are used for the flux architecture of the application. Redux toolkit allows efficient state management through store/action/disptach/reducer logic of the flux architecture. Redux toolkit also simplifies working with the redux framework.


The Web UI makes api calls to Web API using the fetch() method provided in client side javascript and is used in react router. React router and fetch() are built into the react admin package and are used for making HTTP requests to the web api. 

## **Summary** 

1. Install mongodb and create a database called stocks. Create collections stockList and orderList.
2. Import the dummy data file stocks.json into the collection stockList. keep the database running.
3. Clone repo SG-StockExecutionSystem. 
4. In the repo folder there are two sub folders: sg-stockexecution-webapi and SG-StockExecutionSystem-WebUI
5. Open sg-stockexecution-webapi in an IDE. Build the project and import maven dependencies. Then Configure a new datasource by initializing a mongodb datasource. 
6. run the web api through src/main/java/com/sgstockexecutionsys/webapi/WebapiApplication.java
7. Open SG-StockExecutionSystem-WebUI in visual studio IDE. 
8. Open terminal in project folder
9. run npm install and npm start to run the web UI.
10. The Web UI will start on port 3000. The url is http://localhost:3000/




**Implementation Images**

Stock List Fetching and Pagination 



![stockList](https://user-images.githubusercontent.com/72380768/155892369-c47d2a7f-c5f6-4828-b861-1d0b56b6c5c4.png)




Ready Stock, Stock Validation in Orders Basket 

![readyStock](https://user-images.githubusercontent.com/72380768/155892406-83c312dc-a75c-42a5-bfdd-86720a9a00db.png)

