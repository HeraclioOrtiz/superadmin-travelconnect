import { Server, Response } from "miragejs";

export function handler(server: Server) {
  // 🔐 Simulación de login
  server.post("/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);

    console.log('📥 Mirage recibió login:', { email, password }); // 👈 Agregado para debug

    if (email === "admin@test.com" && password === "123456") {
      return {
        user: { id: 1, nombre: "Administrador", email },
        token: "fake-jwt-token-123"
      };
    }

    return new Response(401, {}, { error: "Credenciales inválidas" });
  });

  // 👤 Simulación de usuario (check sesión)
  server.get("/me", (schema, request) => {
    const authHeader = request.requestHeaders.Authorization;

    if (authHeader !== "Bearer fake-jwt-token-123") {
      return new Response(401, {}, { error: "Token inválido" });
    }

    return {
      id: 1,
      nombre: "Administrador",
      email: "admin@test.com",
      role: "superadmin",
    };
  });

  // 🏢 Simulación de agencias
  server.get("/agencias", () => {
    return [
      { id: 1, nombre: "Agencia Patagonia", color: "#00A86B" },
      { id: 2, nombre: "Agencia Norte", color: "#4682B4" }
    ];
  });

  // 🎒 Simulación de paquetes
  server.get("/paquetes", () => {
    return [
      { id: 101, titulo: "Cataratas", precio: 950, divisa: "ARS" },
      { id: 102, titulo: "Bariloche", precio: 1300, divisa: "USD" }
    ];
  });

  // 🧪 Simulación de envío de datos de agencia (como creación simulada)
  server.post("/agencia/simular", () => {
    return { success: true, mensaje: "Agencia simulada correctamente" };
  });

  // ⚙️ Simulación de servicios activos de agencia
  server.get("/agencia/servicios", () => {
    return {
      paquetes_propios: true,
      crm: true,
      asistencia_medica: false,
      mercado_pago: true,
      hoteles: false,
    };
  });
}
