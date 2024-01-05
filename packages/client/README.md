# Client - SIMPLE REACT Page

This project is a single page application that connects to an API to display git commits.

## Getting Started

To get started with this project, follow these steps:

2. Install the dependencies by running the following command:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

    ```plaintext
    REACT_APP_API_URL=<url>
    REACT_APP_API_ENDPOINT=<v>/api/commits/<owner>/<repo>
    ```

    Replace `<REACT_APP_API_URL>` with the URL of the API RestFul instance.

    Replace the place holders of `<owner>` and `<repo>` added in the `<REACT_APP_API_ENDPOINT>`

## Available Scripts

In the project directory, you can run the following commands:

```bash
npm run build
```

### Local Development

To start the application in development mode, run:

```bash
npm run start
```

