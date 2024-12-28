import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface FormFieldProps {
  label: string;
  errorMessage?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  errorMessage,
  inputProps,
  ...props
}) => (
  <div {...props}>
    <Label>{label}</Label>
    <Input {...inputProps} />
    {errorMessage ? (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    ) : (
      <p></p>
    )}
  </div>
);
