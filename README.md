# test_bcm

Run : npm i && npm start

Routes :

POST /user/getToken for get jwtToken, body : {login : 'root', password : 'root'}
GET /api/flights need jwtToken with 'x-access-token' in header.
