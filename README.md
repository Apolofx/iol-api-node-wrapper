# IOL API NodeJS Wrapper

## Preqrequisites
1. Have a valid IOL account.
2. Have access to IOL API.
3. NodeJS installed

## Initial Setup
1. Create `.env` with the following:
    ```
    IOL_API_URL=<IOL api url>
    IOL_USERNAME=<your IOL account username>
    IOL_PASSWORD=<your IOL account password>
    ```

## Usage
1. Clone repo.
2. `cd` to repo dir.
3. run `yarn` or `npm install`
4. run `yarn build` or `npm run build`
5. run `node dist/index.js`


## Ignore this
1. `gh repo create <name>`
2. Init Node project Typescript https://dev.to/rajat19/create-a-new-node-js-project-in-typescript-nao
3. Configure test env with jest: 
    - yarn add -D jest @types/jest ts-jest
    - npx ts-jest config:init

