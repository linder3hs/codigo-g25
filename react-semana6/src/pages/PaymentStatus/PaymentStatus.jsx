import { useParams } from "react-router";

export function PaymentStatus() {
  const params = useParams();

  console.log(params);

  return (
    <section className="container">
      <h1 className="text-6xl">Status {params.status}</h1>
    </section>
  );
}
