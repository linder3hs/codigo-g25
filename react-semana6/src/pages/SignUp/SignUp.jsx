import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { signUpWithEmail } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Elimina todo lo que no sea número
      if (numericValue.length <= 9) {
        setValues({ ...values, [name]: numericValue });
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, lastname, phone } = values;

    const response = await dispatch(
      signUpWithEmail(email, password, {
        name,
        lastname,
        phone,
      })
    );
    console.log(response);
    if (!response.success) {
      toast.error(String(response.error));
      return;
    }

    console.log({ response });
    navigate("/login");
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Crear cuenta</h2>
              <p className="text-sm text-gray-600">
                Regístrate para acceder a tu historial de compras y más
                beneficios.
              </p>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <Input
                id="lastname"
                type="text"
                name="lastname"
                onChange={handleInputChange}
                placeholder="Tu apellido"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Celular
              </label>
              <Input
                id="phone"
                name="phone"
                type="text"
                inputMode="numeric"
                onChange={handleInputChange}
                value={values.phone}
                placeholder="Ej. 987654321"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                placeholder="••••••••"
              />
            </div>

            <div>
              <Button className="w-full" type="submit">
                Registrarse
              </Button>
            </div>

            <p className="text-sm text-center text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
