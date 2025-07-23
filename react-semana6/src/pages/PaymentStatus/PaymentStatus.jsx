import { useState, useEffect } from "react";
import { getDataFromAPI } from "@/services/api";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InfoList, InfoListItem } from "./InfoList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Download,
  User,
  Package,
  ArrowLeft,
} from "lucide-react";
import { formatCurrency, formatDate, getPaymentMethodName } from "@/lib/utils";

const PaymentStatusSkeleton = () => (
  <div className="bg-background min-h-screen p-4 sm:p-6 lg:p-8 animate-pulse">
    <div className="max-w-5xl mx-auto">
      <div className="h-48 bg-muted rounded-lg"></div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-96 bg-muted rounded-lg"></div>
        <div className="space-y-8">
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-24 bg-muted rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

const StatusDisplay = ({ status }) => {
  const statusConfig = {
    approved: {
      icon: <CheckCircle className="h-16 w-16 text-green-500" />,
      title: "Payment Successful!",
      description:
        "Your purchase has been confirmed. Thank you for your trust.",
      cardClass:
        "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    },
    pending: {
      icon: <Clock className="h-16 w-16 text-yellow-500" />,
      title: "Payment Pending",
      description:
        "We are awaiting payment confirmation. We will notify you shortly.",
      cardClass:
        "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
    },
    rejected: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      title: "Payment Rejected",
      description:
        "Your payment could not be processed. Please try another method.",
      cardClass: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
    },
  };

  const config = statusConfig[status] || {
    icon: <Clock className="h-16 w-16 text-gray-500" />,
    title: "Unknown Status",
    description: "The status of your payment could not be determined.",
    cardClass:
      "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700",
  };

  return (
    <Card className={`text-center p-8 ${config.cardClass}`}>
      <div className="flex justify-center mb-4">{config.icon}</div>
      <h2 className="text-2xl font-bold text-card-foreground">
        {config.title}
      </h2>
      <p className="text-muted-foreground mt-2">{config.description}</p>
    </Card>
  );
};

export function PaymentStatus() {
  const [searchParams] = useSearchParams();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePaymentInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await getDataFromAPI(
        `/payments/info/${searchParams.get("payment_id")}`
      );

      if (error) {
        throw error;
      }

      setPayment(data);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar la información del pago");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePaymentInfo();
  }, []);

  if (loading) {
    return <PaymentStatusSkeleton />;
  }

  if (!payment) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Error</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Could not load payment information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <StatusDisplay status={payment.payment.status} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - Purchase Summary */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Purchase Summary
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Order #{payment.order.order_number}
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payment.order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.product_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(
                            item.unit_price,
                            payment.payment.currency_id
                          )}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(
                            item.total_price,
                            payment.payment.currency_id
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="bg-muted/50 p-6 flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                  <InfoListItem
                    label="Subtotal"
                    value={formatCurrency(
                      payment.order.total_amount,
                      payment.payment.currency_id
                    )}
                  />
                  <InfoListItem label="Shipping" value="Free" />
                  <Separator />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">
                      {formatCurrency(
                        payment.order.total_amount,
                        payment.payment.currency_id
                      )}
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar Column - Details */}
          <div className="space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CreditCard className="w-4 h-4" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoList>
                  <InfoListItem
                    label="Transaction ID"
                    value={
                      <Badge variant="secondary">{payment.payment.id}</Badge>
                    }
                  />
                  <InfoListItem
                    label="Method"
                    value={getPaymentMethodName(
                      payment.payment.payment_method_id
                    )}
                  />
                  <InfoListItem
                    label="Date"
                    value={formatDate(payment.payment.date_approved)}
                  />
                </InfoList>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-4 h-4" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoList>
                  <InfoListItem
                    label="Name"
                    value={payment.order.customer_name}
                  />
                  <InfoListItem
                    label="Email"
                    value={payment.order.customer_email}
                  />
                </InfoList>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
