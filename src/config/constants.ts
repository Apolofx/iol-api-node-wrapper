export const IOL_API_URL = "https://api.invertironline.com";
export const endpoints = {
  v2: {
    estadocuenta: "/api/v2/estadocuenta",
    portafolio: "/api/v2/portafolio",
    operaciones: "/api/v2/operaciones",
    operar: {
      comprar: "/api/v2/operar/Comprar",
      vender: "/api/v2/operar/Vender",
      rescateFci: "/api/v2/operar/rescate/fci",
      suscripcionFci: "/api/v2/operar/suscripcion/fci",
    },
    titulos: {
      fci: "/api/v2/Titulos/FCI",
      cotizacion: (mercado: string, simbolo: string) =>
        `/api/v2/${mercado}/Titulos/${simbolo}/Cotizacion`,
    },
  },
};
