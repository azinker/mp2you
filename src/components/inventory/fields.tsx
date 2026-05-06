import { HelpTooltip } from "@/components/inventory/help-tooltip";
import type { InventoryHelpKey } from "@/lib/inventory/help";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  help?: InventoryHelpKey;
  defaultValue?: string | number | null;
  min?: number;
  step?: string;
  placeholder?: string;
};

export function Field({ label, name, type = "text", required, help, defaultValue, min, step, placeholder }: FieldProps) {
  return (
    <label className="inventory-field">
      <span>
        {label}
        {required ? " *" : ""}
        <HelpTooltip k={help} />
      </span>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        step={step}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
      />
    </label>
  );
}

export function TextArea({ label, name, required, help, defaultValue }: Omit<FieldProps, "type" | "min" | "step" | "placeholder">) {
  return (
    <label className="inventory-field inventory-field-wide">
      <span>
        {label}
        {required ? " *" : ""}
        <HelpTooltip k={help} />
      </span>
      <textarea name={name} required={required} defaultValue={defaultValue ?? undefined} rows={4} />
    </label>
  );
}

export function Select({
  label,
  name,
  children,
  required,
  help,
  defaultValue,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
  help?: InventoryHelpKey;
  defaultValue?: string | null;
}) {
  return (
    <label className="inventory-field">
      <span>
        {label}
        {required ? " *" : ""}
        <HelpTooltip k={help} />
      </span>
      <select name={name} required={required} defaultValue={defaultValue ?? ""}>
        {children}
      </select>
    </label>
  );
}
