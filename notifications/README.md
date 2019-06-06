## Notes Service
Micro service using Node.js, MongoDB & socket.io for sending Notifications.

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t suchishreeaich/keep-note-notifications .```
2. Run Docker image (docker port = 4003(1) - app port = (4003)) - ```docker run -p 4003:4003 suchishreeaich/keep-note-notifications```
3. App will be accessible using - http://localhost:4003
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push suchishreeaich/keep-note-notifications:latest```

### API Spec
Swagger UI - http://localhost:4003/api-docs