## ![Logo](https://res.cloudinary.com/dfcaehp0b/image/upload/v1653424467/R_okg9gj.png)

# CINEPLEX CLONE USING MERN STACK

Create a Full-stack using the following technology

- MongoDB (Database to store records)
- Express JS (Web frame work for NodeJS)
- React (frontend library)
- Node JS (JavaScript Runtime)
- Chakra UI (UI component Library)

## Tech Stack

**Client:** React, Chakra UI, React Dropzone, Stripe, axios, framer-motion, React-Leaflet, React-icons, React-router-dom, React-time-picker, react-date-selector

**Server:** Node, Express, Mongoose, MongoDB, JsonWebToken, Bcrypt

## Key Features

- User Authentication and Authorization
- Recieve movie tickets via email
- Select from different seat type
- Payment integration with Stripe
- Responsive web design
- ADD / REMOVE / UPDATE Movies
- ADD / REMOVE / UPDATE Theatres
- many more

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`
`JWT_SECRET`
`JWT_EXPIRE_TIME`
`STRIPE_SECRET`
`PORT`

## Run Locally

Clone the project

```bash
  git clone https://github.com/vars7899/cineplex-clone
```

Go to the project directory

```bash
  cd cineplex-clone
```

Install Cineplex clone by first insalling all the dependencies for the server

```bash
  npm Install
  npm start
```

If you want to run the server under development phase use the following script command instead of npm start

```bash
  npm run dev
```

To run the frontend (client app) run the following commands to install the dependencies and start serving the app

```bash
  cd client
  npm Install
```

## API Reference

### Status code

Cineplex return the following status code in its API calls.

| Status code | Description           |
| :---------- | :-------------------- |
| 200         | OK                    |
| 201         | CREATED               |
| 400         | BAD REQUEST           |
| 401         | NOT AUTHORIZED        |
| 404         | NOT FOUND             |
| 500         | INTERNAL SERVER ERROR |

---

## Theatre Endpoint

#### Get all theatres

```http
  GET /api/theatre
```

#### Get Theatre by ID

```http
  GET /api/theatre/:theatreId
```

| Parameter   | Type     | Description                           |
| :---------- | :------- | :------------------------------------ |
| `theatreId` | `string` | **Required**. ID of requested Theatre |

#### Create New Theatre in DataBase

```http
  POST /api/theatre/create
```

| Body Fields  | Type                     | Description                                           |
| :----------- | :----------------------- | :---------------------------------------------------- |
| `name`       | `string`                 | **Required**. Name of the theatre                     |
| `adress`     | `string`                 | **Required**. Address of the theatre created          |
| `postalCode` | `string`                 | **Required**. Postal code associated with the theatre |
| `city`       | `string`                 | **Required**. City name associated with theatre       |
| `country`    | `string`                 | **Required**. Country name associated with theatre    |
| `timing`     | `array [string, string]` | Opeing and closing time of theatre                    |
| `lat`        | `string`                 | Latitude of the store location                        |
| `long`       | `string`                 | Longitude of the store location                       |

#### Delete Theatre Permanently

```http
  DELETE /api/theatre/delete/:theatreId
```

| Parameter   | Type     | Description                                     |
| :---------- | :------- | :---------------------------------------------- |
| `theatreId` | `string` | **Required**. ID of requested Theatre to delete |

#### Update Details of an existing theatre

```http
  PUT /api/theatre/:theatreId
```

| Parameter   | Type     | Description                                     |
| :---------- | :------- | :---------------------------------------------- |
| `theatreId` | `string` | **Required**. ID of requested Theatre to update |

| Body Fields  | Type                     | Description                             |
| :----------- | :----------------------- | :-------------------------------------- |
| `name`       | `string`                 | Name of the theatre                     |
| `adress`     | `string`                 | Address of the theatre created          |
| `postalCode` | `string`                 | Postal code associated with the theatre |
| `city`       | `string`                 | City name associated with theatre       |
| `country`    | `string`                 | Country name associated with theatre    |
| `timing`     | `array [string, string]` | Opeing and closing time of theatre      |
| `lat`        | `string`                 | Latitude of the store location          |
| `long`       | `string`                 | Longitude of the store location         |

#### Search Theatre by name

```http
  PUT /api/theatre/query?search
```

| Parameter      | Type     | Description                                 |
| :------------- | :------- | :------------------------------------------ |
| `query?search` | `string` | Some string value to match the theatre name |

## Movie Endpoint

#### Get all Movies

```http
  GET /api/movie
```

#### Create New Movie in DataBase

```http
  POST /api/movie/addmovie
```

| Body Fields | Type     | Description                                                      |
| :---------- | :------- | :--------------------------------------------------------------- |
| `name`      | `string` | **Required**. Name of the Movie                                  |
| `runtime`   | `string` | **Required**. Total length of the movie                          |
| `genre`     | `string` | **Required**. Genre enum of the movie                            |
| `trailer`   | `string` | **Required**. Link to the movie trailer                          |
| `image`     | `string` | **Required**. Link to the image that is stored in the cloudinary |
| `cast`      | `array`  | **Required** All the cast member of the movie in an array        |
| `director`  | `string` | **Required** Name of the movie director                          |
| `desc`      | `string` | **Required** Description or short summary of the movie story     |

#### Delete Movie Permanently

```http
  DELETE /api/movie/deletemovie/:movieId
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `movieId` | `string` | **Required**. ID of requested Movie to delete |

#### Update Details of an existing theatre

```http
  PUT /api/movie/editmovie/:movieId
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `movieId` | `string` | **Required**. ID of requested Theatre to update |

| Body Fields | Type     | Description                                        |
| :---------- | :------- | :------------------------------------------------- |
| `name`      | `string` | Name of the Movie                                  |
| `runtime`   | `string` | Total length of the movie                          |
| `genre`     | `string` | Genre enum of the movie                            |
| `trailer`   | `string` | Link to the movie trailer                          |
| `image`     | `string` | Link to the image that is stored in the cloudinary |
| `cast`      | `array`  | All the cast member of the movie in an array       |
| `director`  | `string` | Name of the movie director                         |
| `desc`      | `string` | Description or short summary of the movie story    |

## User Endpoint

#### Login user with credentials

```http
  POST /api/user/login
```

| Body Fields | Type     | Description          |
| :---------- | :------- | :------------------- |
| `email`     | `string` | Email of the User    |
| `password`  | `string` | Password of the User |

#### Register new User

```http
  POST /api/user
```

| Body Fields | Type     | Description            |
| :---------- | :------- | :--------------------- |
| `firstName` | `string` | first name of the User |
| `lastName`  | `string` | last name of the User  |
| `email`     | `string` | Email of the User      |
| `password`  | `string` | Password of the User   |

#### Update User Role (make Admin)

```http
  POST /api/user/status/:userId
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `userId`  | `string` | **Required**. ID of requested User to update |

## Authors

- [@Vaibhav Dhiman](https://github.com/vars7899)
