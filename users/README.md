## User Service

Micro service using Node.js & MongoDB for user login/register etc.

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t suchishreeaich/keep-note-users .```
2. Run Docker image (docker port = 4001(1) - app port = (4001)) - ```docker run -p 4001:4001 suchishreeaich/keep-note-users```
3. App will be accessible using - http://localhost:4001
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push suchishreeaich/keep-note-users:latest```

### API Spec
#Swagger UI - http://localhost:3000/api-docs