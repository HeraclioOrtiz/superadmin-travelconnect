import { Server, Response } from "miragejs";

export function handler(server: Server) {
  // 🔐 Simulación de login
  server.post("/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);

    console.log('📥 Mirage recibió login:', { email, password });

    if (email === "admin@test.com" && password === "123456") {
      return { token: "fake-jwt-token-123" }; // 👈 solo token
    }

    return new Response(401, {}, { error: "Credenciales inválidas" });
  });

  // 👤 Simulación de obtener datos del usuario (check sesión)
  server.get("/me", (schema, request) => {
    const authHeader = request.requestHeaders.Authorization;

    console.log('📥 Mirage recibió petición /me');

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

  // 🚪 Simulación de logout
  server.post("/logout", (schema, request) => {
    console.log('👋 Mirage recibió logout');
    return new Response(200, {}, { success: true });
  });

  // 🚦 Permitir que el resto de los endpoints pasen directo al servidor real
  server.passthrough('/api/**');
}
