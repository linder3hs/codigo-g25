import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/helpers/format";
import { useSelector } from "react-redux";

export function Summary() {
  const { products } = useSelector((state) => state.shoppingCart);

  const [currentStep, setCurrentStep] = useState("shipping");

  const subtotal = products.reduce(
    (sum, product) => sum + Number.parseFloat(product.price) * product.quantity,
    0
  );

  const shipping = 25;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        </div>
        <p className="text-muted-foreground">
          Complete sus datos para finalizar su pedido
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Step 1 - Shipping */}
          <div className="flex flex-col items-center flex-1">
            <div
              className={`rounded-full p-2 mb-2 ${
                currentStep === "shipping" || currentStep === "payment"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium text-center ${
                currentStep === "shipping"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Envío
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Información de Envío
                </CardTitle>
                <CardDescription>
                  Ingrese los datos para el envío de sus productos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitShipping}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">Nombres</Label>
                      <Input
                        id="firstName"
                        placeholder="Ingrese sus nombres"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input
                        id="lastName"
                        placeholder="Ingrese sus apellidos"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+51 999 999 999"
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
              <CardDescription>{products.length} productos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={`https://cwlruitlkwtajppfrzek.supabase.co/storage/v1/object/public/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <span className="font-medium">
                          {formatPrice(
                            Number.parseFloat(product.price) * product.quantity
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {formatPrice(Number.parseFloat(product.price))} x{" "}
                          {product.quantity}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {product.brand}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impuestos (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-xl">{formatPrice(total)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="flex gap-3 items-center bg-sky-500 mb-5">
                <CreditCard />
                Proceder al pago
              </Button>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Al completar esta compra, acepta nuestros{" "}
                <a href="#" className="text-primary hover:underline">
                  Términos y Condiciones
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
