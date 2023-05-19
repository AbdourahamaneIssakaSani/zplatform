
# ZPlatform

ZPlatform is an application that provides essential online services for tens of thousands of users. As it continues to grow, adding thousands of new users daily and serving millions of transactions monthly, we're employing various strategies to ensure scalability, security, and enhanced user experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js installed (version v16.17.0 or later)
* NPM (Node Package Manager) installed
* Access to the `.env` and `.env.development` files from the Google Drive link shared in the submission email.

## Running ZPlatform

To run ZPlatform, follow these steps:

1. Clone this repository to your local machine.

```sh
git clone https://github.com/AbdourahamaneIssakaSani/zplatform.git
```

2. Navigate to the project directory.

```sh
cd zplatform
```

3. Install the necessary packages.

```sh
npm install
```

4. Copy the `.env` and `.env.development` (check submission email) files into `/src/config/envs/` the project.

5. Start the server using one of the following scripts:

To run the server in development mode:

```sh
npm run start:dev
```

To run the server in staging mode:

```sh
npm run start:staging
```

To run the server in production mode:

```sh
npm run start
```

The server should start, and you can access the APIs at `http://localhost:<PORT>` where `<PORT>` is specified in the `.env` file.

## API Documentation

We have created a Postman collection that covers all the available endpoints in the application. You can access the collection and the documentation from the following link:

[Postman Collection and Documentation Link](https://documenter.getpostman.com/view/23125475/2s93m1a4jR)

This will give you a detailed understanding of the request and response structures for each endpoint, making it easier for you to interact with the application.

## Contact

If you have any questions about the project, feel free to reach out.