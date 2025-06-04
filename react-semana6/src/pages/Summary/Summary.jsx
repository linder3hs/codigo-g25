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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { formatPrice } from "@/helpers/format";
import { useSelector } from "react-redux";

export function Summary() {
  const { products } = useSelector((state) => state.shoppingCart);

  const [currentStep, setCurrentStep] = useState("shipping");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

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

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setCurrentStep("confirmation");
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
                currentStep === "shipping" ||
                currentStep === "payment" ||
                currentStep === "confirmation"
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

          {/* Connector Line 1 */}
          <div className="flex-1 h-px bg-border mx-2 sm:mx-4 mb-6" />

          {/* Step 2 - Payment */}
          <div className="flex flex-col items-center flex-1">
            <div
              className={`rounded-full p-2 mb-2 ${
                currentStep === "payment" || currentStep === "confirmation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium text-center ${
                currentStep === "payment"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Pago
            </span>
          </div>

          {/* Connector Line 2 */}
          <div className="flex-1 h-px bg-border mx-2 sm:mx-4 mb-6" />

          {/* Step 3 - Confirmation */}
          <div className="flex flex-col items-center flex-1">
            <div
              className={`rounded-full p-2 mb-2 ${
                currentStep === "confirmation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium text-center ${
                currentStep === "confirmation"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Confirmación
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

                  <div className="mb-4">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      placeholder="Av. Principal 123"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Lima" required />
                    </div>
                    <div>
                      <Label htmlFor="state">Departamento</Label>
                      <Select defaultValue="lima">
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lima">Lima</SelectItem>
                          <SelectItem value="arequipa">Arequipa</SelectItem>
                          <SelectItem value="cusco">Cusco</SelectItem>
                          <SelectItem value="trujillo">La Libertad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Código Postal</Label>
                      <Input id="zipCode" placeholder="15001" required />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label>Método de Envío</Label>
                    <RadioGroup defaultValue="standard" className="mt-2">
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label
                          htmlFor="standard"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">Envío Estándar</div>
                          <div className="text-sm text-muted-foreground">
                            3-5 días hábiles
                          </div>
                        </Label>
                        <span className="font-medium">
                          {formatPrice(shipping)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="express" id="express" />
                        <Label
                          htmlFor="express"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">Envío Express</div>
                          <div className="text-sm text-muted-foreground">
                            1-2 días hábiles
                          </div>
                        </Label>
                        <span className="font-medium">
                          {formatPrice(shipping * 2)}
                        </span>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button type="submit" size="lg">
                      Continuar al Pago
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {currentStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Información de Pago
                </CardTitle>
                <CardDescription>
                  Ingrese los datos para realizar el pago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment}>
                  <div className="mb-6">
                    <Label>Método de Pago</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label
                          htmlFor="credit-card"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">
                            Tarjeta de Crédito/Débito
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label
                          htmlFor="paypal"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">PayPal</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem
                          value="bank-transfer"
                          id="bank-transfer"
                        />
                        <Label
                          htmlFor="bank-transfer"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">
                            Transferencia Bancaria
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <>
                      <div className="mb-4">
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input
                          id="cardName"
                          placeholder="Como aparece en la tarjeta"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="expiryDate">
                            Fecha de Expiración
                          </Label>
                          <Input id="expiryDate" placeholder="MM/AA" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="mb-4 p-4 bg-muted rounded-md text-center">
                      <p className="mb-2">
                        Serás redirigido a PayPal para completar el pago.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "bank-transfer" && (
                    <div className="mb-4 p-4 bg-muted rounded-md">
                      <p className="mb-2 font-medium">
                        Datos para transferencia:
                      </p>
                      <p>Banco: Banco Nacional</p>
                      <p>Cuenta: 123-456789-0</p>
                      <p>Titular: Mi Tienda Online</p>
                      <p className="mt-2 text-sm">
                        Una vez realizada la transferencia, envía el comprobante
                        a pagos@mitienda.com
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      Volver a Envío
                    </Button>
                    <Button type="submit" size="lg">
                      Confirmar Pedido
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {currentStep === "confirmation" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  ¡Pedido Confirmado!
                </CardTitle>
                <CardDescription>
                  Su pedido ha sido procesado correctamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <p className="text-green-800 font-medium">
                    Gracias por su compra. Hemos enviado un correo electrónico
                    con los detalles de su pedido.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Número de Pedido:</h3>
                  <p className="text-lg font-bold">
                    #ORD-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Información de Envío:</h3>
                  <div className="flex items-start gap-2">
                    <Truck className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p>Juan Pérez</p>
                      <p>Av. Principal 123</p>
                      <p>Lima, Lima 15001</p>
                      <p>Perú</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Método de Pago:</h3>
                  <p>
                    {paymentMethod === "credit-card" &&
                      "Tarjeta de Crédito/Débito"}
                    {paymentMethod === "paypal" && "PayPal"}
                    {paymentMethod === "bank-transfer" &&
                      "Transferencia Bancaria"}
                  </p>
                </div>

                <div className="flex justify-center mt-8">
                  <Button>Ver Detalles del Pedido</Button>
                </div>
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
