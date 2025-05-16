import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function Login() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <section className="h-screen flex justify-center items-center border border-red-500">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Login</h2>
              <p>Ingresa tu correo y password para iniciar sesión.</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="example@gmail.com"
              />
              {/* <span className="text-xs text-red-500">Error</span> */}
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block">
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
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
