# CodingCatDev Next.js Tailwind Firebase Starter

## Firebase
Make sure to setup a new project with a Firestore database.

### Install dependencies
`cd backend/firebase && npm install`

### Deploy Backend Dependencies

> Make sure you are first in the firebase directory

`firebase deploy`

## Next.js

The video will cover how the different page types work for firebase.
### Install dependencies

To get started make sure to

`cd frontent/nextjs-tailwind && npm install`

### Run locally

Make sure to change the `.env.local.template` to `.env.local` and update the parameters from firebase.

To run the dev server (staying in the same directory)

`npm run dev`

### Deploy to production

> See [Framework Awareness](https://github.com/FirebaseExtended/firebase-framework-tools/)

`firebase --open-sesame frameworkawareness`

```json
{
  "hosting": {
    "source": "."
  }
}
```

