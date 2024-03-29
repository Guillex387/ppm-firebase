# PPM (Paranoic password manager)

This is a private password manager for store my passwords and sensitive data.

The application is designed for private using, and self hosting.
But the person who host the app can manage multiple users to
create an account for his friends, coworkers, etc.

## Security

The app have different security features to prevent data filtering
or others security risks.

- Your data is encrypted and decrypted only in the client side,
  without http request with your raw data.
- The host only save an encrypted token which contain your data.
- The master key for decrypt your data, is managed for you
  and if you lost it, you lost your data.
- The algorithm for encrypt and decrypt the information is [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).
- The algorithm for verify the master key is [scrypt](https://en.wikipedia.org/wiki/Scrypt).

But because of the way it's designed, this one is vulnerable to any insecure browser
or in rare cases a computer infected with malware. My recommendation is search possible malware on your computer,
and use a good browser like Chrome, Edge, Safari, Brave and Firefox,
I recommend the last one because the app is developed with it.

## Development

> Node.js version: **v20.4.0**

> Npm version: **v9.8.1**

The application was developed using [typescript](https://www.typescriptlang.org/) as the programming language,
[react](https://react.dev/) and [chakra-ui](https://chakra-ui.com/) for the UI,
[vitejs](https://vitejs.dev/) for the project config and [firebase](https://firebase.google.com/) for the backend.

## Deploy in your firebase console

> **Note**: you need some firebase and programming experience to configure it.

- The first step is create a project in firebase console, and then enable Firebase Auth,
  Firestore and Hosting. Register a web app and put the credentials in the `.env` file in the root
  of the project with this format:

  ```env
  # .env file
  VITE_API_KEY=
  VITE_AUTH_DOMAIN=
  VITE_PROJECT_ID=
  VITE_STORAGE_BUCKET=
  VITE_MESSAGING_SENDER_ID=
  VITE_APP_ID=
  ```

- Create the `.firebaserc`:

  ```json
  {
    "projects": {
      "default": "your_firebase_project_name"
    }
  }
  ```

- Follow the steps in firebase docs for set up [firebase CLI](https://firebase.google.com/docs/cli) and login it.

- Then install the dependencies `npm i` and you can deploy the project `npm run deploy`.

## License

PPM Copyright (c) 2023 Guillex387. All rights reserved.

Licensed under the [GNU AGPLv3](/LICENSE) license.
