## Prerequisites
- NodeJS v15.5.0
- MySQL Workbench
- Postman
- nodemon

<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | controllers | dir | This holds the CRUD functions for existing tables |
| 2 | models | dir | This holds all the Table models to generate respective Tables  |
| 3 | README.md | file | This file |
| 4 | route.js | file | This defines all the Method, Endpoint and Functions for each route |

<br>

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 3306 |
| 2 | applicaiton | 3000 |

<br>

## Commands
All the commands listed should be ran in ./javascript directory.

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database.

### MySQL Workbench
In Query, paste the following lines:
```bash
DROP DATABASE IF EXISTS schooldb;
CREATE DATABASE schooldb;
```

<br>

### From Command Line
This will generate all Tables from models (make sure that your "username" and "password" matches in "development" from config.json)
```bash
npm run dev
```

<br>

### Running in watch mode
This will start the application in watch mode.
```bash
npm run start:dev
```

<br>

### Check local application is started
Your MySQL Workbench Tables should be populated after trying "Reconnect to DBMS"
You should be able to fetch an empty array the following endpoint

```
http://localhost:3000/api/all-teacher
```

<br>

### From Postman:
### Step 1
Populate your Tables from the following endpoint by filling up:

<b>Teachers</b>:

teacher_name

teacher_email
<br>
<b>Students</b>:

student_name

student_email
<br>
<b>Subjects</b>:

subject_code

subject_name
<br>
<b>Classes</b>:

class_code

class_name

```
http://localhost:3000/api/register
```
### Step 2
Assign Class and Subject to Teacher(s) (you can assign one class & subject to multiple teachers each time) from the following endpoint by filling up:

<b>Teachers</b>:
teacher_email
<br>
<b>Class</b>:
class_code
<br>
<b>Subject</b>:
subject_code

```
http://localhost:3000/api/create-tsc
```

### Step 3
View Teacher's Workload from the following endpoint:

```
http://localhost:3000/api/reports/workload/
```
