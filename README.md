# Appointment-Scheduling

## Deployed Site [Work In Progress | No Longer maintained]
[www.geeks-auto-service.com](https://automobile-frontend.herokuapp.com/)

## UML Diagram
![UML Diagram](https://github.com/saikz72/Appointment-Scheduling/blob/master/resources/Screen%20Shot%202021-12-24%20at%209.39.46%20PM.png)

## Database Schemas | ER Diagram
![ER Diagram](https://github.com/saikz72/Appointment-Scheduling/blob/master/resources/ER_Diagram.jpeg)


## Deployment
### Backend
``` git push heroku backend:master```
### Frontend
``` git push heroku frontend:master```

### Backend [Master]
```git subtree push --prefix backend heroku-server master```

### Frontend [Master]
```git subtree push --prefix frontend heroku-client master```

## Running Locally

## Option 1: [For developer]
Clone the repo: ```git clone https://github.com/saikz72/Appointment-Scheduling```

### To run the frontend
```
1. git checkout frontend
2. npm install
3. npm run start
```

### To run the backend
NOTE: If you wish to run the backend locally, then update value of [baseURL](https://github.com/saikz72/Appointment-Scheduling/blob/frontend/src/utility/constants.ts) to ```baseURL = 'http://localhost:3000/api/'``` 
```
1. git checkout backend
2. npm install
3. npm run dev
```

## Option 2: [For anyone]
Clone the repo: ```git clone https://github.com/saikz72/Appointment-Scheduling```

### To run the backend
```
1. cd backend
2. npm install
3. npm run dev
```

### To run the frontend
```
1. cd frontend
2. npm install
3. npm run start
```

----------------
### To Run the mobile application
```
1. npm install --global expo-cli
2. cd mobile
3. expo start
```

## Mobile
### Setup
1 ``` npm install --global expo-cli``` <br />
2 ``` cd mobile ``` <br />
3 ``` yarn install ``` <br />
4 ``` yarn start ``` <br />
