export namespace Paneles {
  type Opciones =
    | "todas"
    | "de-acciones"
    | "de-bonos"
    | "de-cedears"
    | "in-the-money"
    | "out-the-money"
    | "calls"
    | "puts";
  type Acciones = "panel-lideres" | "panel-general" | "subastas";
  type Todos = Opciones | Acciones;
}
