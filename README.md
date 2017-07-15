# farmstand-api
Contains the back end intelligence for the farmstand-client, Under Construction.

Server will run on port `8899`

## Start up

`npm install`

`node server.js`

## End Points
**`GET /api`**

Authorization: `None`

Header: `authorization`

Value: `Bearer 3b48a662-8d39-43af-9770-db2d38b3d5a5`

**Success** Status Code: `200`

Response body: `{message: Welcome to Farmstand API}`

**Error** Status Code: `401`

Response body: `{message: Access Denied}`

---

**`GET /api/validate`**

Authorization: `Basic`

username: `farmer`, password: `potatohead`

**Success** Status Code: `200`

Response body: `{data: base64_encoded_token}`

**Error** Status Code: `401`
