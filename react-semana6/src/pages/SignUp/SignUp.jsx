import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SignUp() {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    emai: "",
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
  };

  return (
    <section className="h-screen flex justify-center items-center border border-red-500">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <p>Registrate para poder acceder a tus compras!</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="name" className="block">
                Nombre
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Name"
              />
              {/* <span className="text-xs text-red-500">Error</span> */}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastname" className="block">
                Apellido
              </label>
              <Input
                id="lastname"
                type="text"
                name="lastname"
                onChange={handleInputChange}
                placeholder="Lastname"
              />
              {/* <span className="text-xs text-red-500">Error</span> */}
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
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
