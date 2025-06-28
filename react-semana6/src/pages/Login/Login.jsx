import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { registerOrLogin } from "@/services/api";

export function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = values;

    const response = await registerOrLogin("login", { email, password });

    if (!response) return;

    toast.success("Bievenido!");
    navigate("/products");
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
              <p className="text-sm text-gray-600">
                Ingresa tu correo y password para iniciar sesión.
              </p>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                onChange={handleInputChange}
                type="password"
              />
            </div>
            <div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
            <p className="text-sm text-center text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
