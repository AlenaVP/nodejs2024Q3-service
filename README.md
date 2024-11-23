# Home Library Service

### Task 2: Docker for REST API with Prisma ORM & PostgreSQL database with Live-Reload support for files in `src/` folder

`Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library.


## Prerequisites

- Node.js - Use Node.js LTS version (22.11.0 at the time of code creating)

## Downloading

1. Clone this repository:
```
git clone {repository URL}
```
2. To get this task result switch to `docker-db` branch:
```
git switch feature/docker-orm
```

## Installing NPM modules

```
npm install
```

## Environment

Create `.env` config using `.env.example` as reference.

## Docker

1. Start _Docker Desktop_ (only if you are MS Windows user, otherwise skip this step)

2. Run the following command and wait for the images to be built and the containers to start.
```
docker compose up -d
```
3. Check

You can check status of containers with
```
docker ps
```
You can check final size of application image with
```
docker images
```

## Prisma ORM migrations
```
npx prisma migrate dev --name init
```

## Running application

```
npm run start
```
Everything should be ready and now you can run tests with
```
npm test
```

## Available .env settings

- `PORT` - port number on which Home Library Service API will run in container and will be accessible outside
- `POSTGRES_USER` - login of superuser which will be created when you start PostgreSQL container the first time
- `POSTGRES_PASSWORD` - password of superuser specified by `POSTGRES_USER` environment variable
- `POSTGRES_DB` - default database that is created when the image is first started
- `POSTGRES_PORT` - port number on which PostgreSQL will run in container and will be accessible outside

## Prisma ORM

To generate assets like `Prisma Client` based on the generator and data model blocks defined in your `prisma/schema.prisma` file

```
npx prisma generate
```

To apply all pending migrations, and create the database if it does not exist. Primarily used in non-development environments

```
npx prisma migrate dev --name init
```

## API Endpoints

After starting the app on port (4000 as default) you can open
in your browser Swagger OpenAPI documentation by typing http://localhost:4000/api/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```
