# PPM (Paranoic password manager)

This is a private password manager for store my passwords and sensitive data.

The application is designed for private using, and self hosting.
But the person who host the app can manage multiple users, and
create an account for his friends, coworkers, etc.

## Security

The app have diferent security features to prevent data filtering
or others security risks.

- Your data is encrypted and decrypted only in the client side,
  without http request with your raw data.
- The host only save an encrypted token which contain your data.
- The master key for decrypt your data, is managed for you
  and if you lost it, you lost your data.
- The algorithm for encrypt and decrypt de information is [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).

But because of the way it's designed, this one is vulnerable to any insecure browser
or in rare cases a computer infected with malware. My recomendation is search possible malware on your computer,
and use a good browser like Chrome, Edge, Safari, Brave and Firefox,
I recomend the last one because the app is developed with it.

## Development

The application was developed using [typescript](https://www.typescriptlang.org/) as the programming language,
[react](https://react.dev/) and [chakra-ui](https://chakra-ui.com/) for the UI,
[vitejs](https://vitejs.dev/) for the project config and [firebase](https://firebase.google.com/) for the backend.

## License

PPM Copyright (c) 2023 Guillex387. All rights reserved.

Licensed under the [GNU AGPLv3](/LICENSE) license.
