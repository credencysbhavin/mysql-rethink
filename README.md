# What is it #

A library which enables node application to perform CRUD operation from MySql &amp; Rethink(NoSql) database.
We can provide combination of data to be stored in MySql & Rethink(NoSql) database. There will be one fileds mapping file which will
be having definition of which keys needs to be stored in MySql database. All the data will be stored in  Rethink(NoSql) database
even if it is stored in MySql database. While saving to Rethink(NoSql) database we will use "LinkingEntity" key mentioned for every entity
as a mapping key for maintaining integrity of data stored in MySql & Rethink(NoSql).

Here there are also support for multiple environment so if you want to run this application on different server with different database and 
email server access then all you need to do is mention the required parameter in respective environment file. Then at the time of initialization the
node server you need to provide environment name to start server with respective configuration. 

<div><strong><h4>Note:</h4> This is an example application. It shows an example of how to integrate MySql and Rethink, you shouldn't assume it is free from bugs. Have the code audited carefully by an expert before you put anything modeled on it into production.</strong></div>


# Complete stack #

* [node.js](http://nodejs.org)
* [express](http://expressjs.com)
* [RethinkDB](http://www.rethinkdb.com/)
* [MySql](https://www.mysql.com/)

# Installation #

```
git clone https://github.com/credencysbhavin/mysql-rethink.git
cd appFolder && npm install
```

_Note_: If you don't have RethinkDB installed, you can follow [these instructions to get it up and running](http://www.rethinkdb.com/docs/install/). 


# Running the application #

Running the app is as simple as:

For starting application in local

```
node app.js -e=local
```

For starting application in staging

```
node app.js -e=stag
```

For starting application in production

```
node app.js -e=prod
```

Then open a browser: <http://localhost:8000>.

_Note_: If you want to override the default RethinkDB connection details & MySql connection details, you can
specify them as environment variables which you can found in files with prefix ".env.<env>":

*Rethink Details
* `RETHINK_HOST`: the RethinkDB host (default: `192.168.1.247`)
* `RETHINK_PORT`: the port (default `28015`)
* `RETHINK_DB_NAME`: the app database (default: `rethinkpoc`)

* MySql details
* `MYSQL_HOST`: the MySql host (default: `localhost`)
* `MYSQL_USER`: the user for accessing database
* `MYSQL_PASSWORD`: the password to access database
* `MYSQL_DATABASE`: database name of  MySql
* `MYSQL_DATABASE`: default MySql port

