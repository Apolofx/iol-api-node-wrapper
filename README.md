![version](https://img.shields.io/github/package-json/v/apolofx/iol-api-node-wrapper)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/apolofx/iol-api-node-wrapper/CI%20PROD/main)

# IOL API NodeJS Wrapper [in development]

## Preqrequisites

1. Have a valid IOL account.
2. [Have access to IOL API](https://www.invertironline.com/api/documentacion-api).
3. NodeJS installed

## Initial Setup

1. Create `.env` with the following:
   ```
   IOL_USERNAME=<your IOL account username>
   IOL_PASSWORD=<your IOL account password>
   ```
   Optionally you can hardcode your `username` and `password` on IolClient's config method (only for testing purposes).

## Usage

1. Clone repo.
2. `cd` to repo dir.
3. run `yarn` or `npm install`
4. Initialize IolClient on `src/index` with `IolClient.config() using your usr and psw.
5. run `yarn dev`

## Ignore this

1. `gh repo create <name>`
2. Init Node project Typescript https://dev.to/rajat19/create-a-new-node-js-project-in-typescript-nao
3. Configure test env with jest:
   - yarn add -D jest @types/jest ts-jest
   - npx ts-jest config:init
