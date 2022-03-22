[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
![version](https://img.shields.io/github/package-json/v/apolofx/iol-api-node-wrapper?color=blue)
[![npm version](https://badge.fury.io/js/iol-api-node-wrapper.svg)](https://badge.fury.io/js/iol-api-node-wrapper)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/apolofx/iol-api-node-wrapper/CI%20PROD/main)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)

# IOL API NodeJS Wrapper

## Prerequisites

1. Have a valid IOL account.
2. [Have access to IOL API](https://www.invertironline.com/api/documentacion-api). (Send an email to IOL Support requesting for the API access).
3. NodeJS installed

## Installation

**npm**

```shell
npm i iol-api-node-wrapper
```

**yarn**

```shell
yarn add iol-api-node-wrapper
```

## Usage example

```typescript
  const { IolClient } = require("iol-api-node-wrapper");

// Initialize client with config
const config = {
      url: "https://api.invertironline.com",
      password: <your IOL password>,
      username: <your IOL username>,
      }

const iol = new IolClient(config);
async function main() {
  const account = await iol.getAccountStatus();
  console.log(account);
}
main();

```

## Authentication

Once a new IolClient object has been instantiated with authentication data, authentication is managed internally by the library and there is no need to request a new `access-token` every time you call the API. IolClient uses IOL's `refresh-token` to request a new `access-token` if the current one has expired.

## Types

This project is written in typescript and we are trying to type not only the wrapper interface methods but also IOL's API responses models.
This makes it a lot easier to work with the wrapper response object as it has editor's (VSCode) intellisense features enhanced by typescript. If you don't use VSCode which has already typescript support, [you can easily install typescript in your project or globally in your system](https://www.typescriptlang.org/download).

## Wrapper Interface

```typescript
// GET /api/v2/portafolio/{pais}
await iol.getPortfolio("argentina");

// GET /api/v2/estadocuenta
await iol.getAccountStatus();

// GET /api/v2/operaciones/{numero}
await iol.getOperation(1234);

// GET /api/v2/operaciones
await iol.getOperations({
  estado: "pendientes",
  fechaDesde: new Date(new Date().setDate(10)).toString(),
  fechaHasta: new Date(new Date().setDate(15)).toString(),
  numero: 1234,
  pais: "argentina",
});

// DELETE /api/v2/operaciones/{numero}
await iol.deleteOperation(1234);

// POST /api/v2/operar/Comprar
await iol.buy({
  mercado: "bCBA",
  plazo: "t0",
  precio: 123,
  simbolo: "GGAL",
  validez: new Date(),
});

// POST /api/v2/operar/Vender
await iol.sell({
  mercado: "bCBA",
  plazo: "t0",
  precio: 123,
  cantidad: 1,
  simbolo: "GGAL",
  validez: new Date(new Date().setDate(20)),
});

// POST /api/v2/operar/suscripcion/fci
await iol.fciSubscription({ monto: 123, simbolo: "CRTAFAA" });

// POST /api/v2/operar/rescate/fci
await iol.fciRescue({ cantidad: 1, simbolo: "CRTAFAA" });

// GET /api/v2/{Mercado}/Titulos/{Simbolo}/Cotizacion
await iol.getPrice("rOFX", "DLR102021");

// GET /api/v2/{Mercado}/Titulos/{Simbolo}/Opciones
await iol.getOptions("bCBA", "GGAL");

// GET /api/v2/Titulos/FCI/{simbolo}
await iol.getFCI("CRTAFAA");

// GET /api/v2/Titulos/FCI
await iol.getAllFCI();

//GET /api/v2/Cotizaciones/{Instrumento}/{Panel}/{Pais}
await iol.getQuotes("opciones", "calls", "argentina");
```

## API Wrapper progress

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

✅ `GET /api/v2/Titulos/FCI/{simbolo}`

⬜️ `GET /api/v2/Titulos/FCI/TipoFondos`

⬜️ `GET /api/v2/Titulos/FCI/Administradoras`

⬜️ `GET /api/v2/{mercado}/Titulos/{simbolo}`

✅ `GET /api/v2/{mercado}/Titulos/{simbolo}/Opciones`

⬜️ `GET /api/v2/{pais}/Titulos/Cotizacion/Instrumentos`

✅ `GET /api/v2/Cotizaciones/{Instrumento}/{Panel}/{Pais}`

⬜️ `GET /api/v2/{pais}/Titulos/Cotizacion/Paneles/{instrumento}`

✅ `GET /api/v2/{Mercado}/Titulos/{Simbolo}/Cotizacion`

⬜️ `GET /api/v2/Titulos/FCI/Administradoras/{administradora}/TipoFondos`

⬜️ `GET /api/v2/Titulos/FCI/Administradoras/{administradora}/TipoFondos/{tipoFondo}`

⬜️ `GET /api/v2/{mercado}/Titulos/{simbolo}/Cotizacion/seriehistorica/{fechaDesde}/{fechaHasta}/{ajustada}`

## LICENCE

[MIT](LICENSE)
