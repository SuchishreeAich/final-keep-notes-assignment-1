## Notes Service
Micro service using Node.js & MongoDB for CRUD operations on NOTE.

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t suchishreeaich/keep-note-auth .```
2. Run Docker image (docker port = 4004(1) - app port = (4004)) - ```docker run -p 4004:4004 suchishreeaich/keep-note-auth```
3. App will be accessible using - http://localhost:3004
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push suchishreeaich/keep-note-auth:latest```


### API Spec
Swagger UI - http://localhost:3001/api-docs
