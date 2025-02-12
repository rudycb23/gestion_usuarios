let usuarios = ["Rudy Campos", "Juan Santamaria", "Ratón Perez"];
export async function GET() {
  return new Response(JSON.stringify(usuarios), { status: 200 });
}

export async function POST(request) {
  const { name } = await request.json();
  if (name) {
    usuarios.push(name);
    return new Response(JSON.stringify({ message: "Usuario agregado" }), {
      status: 201,
    });
  } else {
    return new Response(JSON.stringify({ message: "Nombre es requerido" }), {
      status: 400,
    });
  }
}
