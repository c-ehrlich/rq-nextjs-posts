This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What is this?
This is an updated version of the React Query 2 sample app 'Posts' by Tanner Linsey, rebuilt by me from scratch in Next.js 12 / React 18 / React Query 4. It uses current React Query concepts to have basically no visible loading state after the initial page load.****

## Getting Started

* Install dependencies
```bash
yarn
```
* Set up a Postgresql database
* Invoke the Prisma CLI
```bash
npx prisma init
```
* Add the URI of your Postgres database to the `.env` file that was created by Prisma. There is a `.sample.env` file to show the format.
* Migrate your database
```bash
npx prisma migrate dev --name init 
```

* Run the development server
```bash
yarn dev
```
* Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## What did I learn?
I learned to build from scratch a full app that uses React Query to track backend state. Obviously this 'Posts' example is quite simple as it doesn't contain authentication, relational models, etc. But it includes all the main concepts of React Query and almost entirely removes visible loading state after the initial page load.
