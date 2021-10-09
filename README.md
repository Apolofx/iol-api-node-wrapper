![version](https://img.shields.io/github/package-json/v/apolofx/iol-api-node-wrapper?color=blue)
[![npm version](https://badge.fury.io/js/iol-api-node-wrapper.svg)](https://badge.fury.io/js/iol-api-node-wrapper)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/apolofx/iol-api-node-wrapper/CI%20PROD/main)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

# IOL API NodeJS Wrapper [work in progress]

## Prerequisites

1. Have a valid IOL account.
2. [Have access to IOL API](https://www.invertironline.com/api/documentacion-api).
3. NodeJS installed

## Installation

- npm: `npm i iol-api-node-wrapper@beta`
- yarn: `yarn add iol-api-node-wrapper@beta`

## Usage example

```typescript
const { IolClient } = require("iol-api-node-wrapper");
// Initialize client config
IolClient.config({
  url: "https://api.invertironline.com",
  password: <your IOL password>,
  username: <your IOL username>,
});
async function main(){
    const iol = await IolClient.getInstance()
    const account = await iol.getAccountStatus()
    console.log(account)
}

main()
```

## Api wrapper progress

[ IOL API VERSION: V2 ]

### AsesoresTestInversor

⬜️ `GET /api/v2/asesores/test-inversor`

⬜️ `POST /api/v2/asesores/test-inversor/{idClienteAsesorado}`

### MiCuenta

✅ `GET /api/v2/estadocuenta`

✅ `GET /api/v2/portafolio/{pais}`

✅ `DELETE /api/v2/operaciones/{numero}`

✅ `GET /api/v2/operaciones/{numero}`

✅ `GET /api/v2/operaciones`

### Operar

✅ `POST /api/v2/operar/Vender`

✅ `POST /api/v2/operar/Comprar`

✅ `POST /api/v2/operar/rescate/fci`

✅ `POST /api/v2/operar/suscripcion/fci`

### Titulos

✅ `GET /api/v2/Titulos/FCI`

⬜️ `GET /api/v2/Titulos/FCI/{simbolo}`

⬜️ `GET /api/v2/Titulos/FCI/TipoFondos`

⬜️ `GET /api/v2/Titulos/FCI/Administradoras`

⬜️ `GET /api/v2/{mercado}/Titulos/{simbolo}`

⬜️ `GET /api/v2/{mercado}/Titulos/{simbolo}/Opciones`

⬜️ `GET /api/v2/{pais}/Titulos/Cotizacion/Instrumentos`

⬜️ `GET /api/v2/Cotizaciones/{Instrumento}/{Panel}/{Pais}`

⬜️ `GET /api/v2/{pais}/Titulos/Cotizacion/Paneles/{instrumento}`

✅ `GET /api/v2/{Mercado}/Titulos/{Simbolo}/Cotizacion`

⬜️ `GET /api/v2/Titulos/FCI/Administradoras/{administradora}/TipoFondos`

⬜️ `GET /api/v2/Titulos/FCI/Administradoras/{administradora}/TipoFondos/{tipoFondo}`

⬜️ `GET /api/v2/{mercado}/Titulos/{simbolo}/Cotizacion/seriehistorica/{fechaDesde}/{fechaHasta}/{ajustada}`
