import { cn } from "@/lib/utils";

export function InfoList({ children, className }) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

export function InfoListItem({ label, value }) {
  return (
    <div className="flex justify-between items-start text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right break-words">{value}</span>
    </div>
  );
}
