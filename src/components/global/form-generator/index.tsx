import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";
interface Props {
  type?: "text" | "email" | "password";
  inputType?: "select" | "input" | "textarea";
  options?: {
    label: string;
    value: string;
    id: string;
  }[];
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errors?: FieldErrors<FieldValues>;
  lines?: number;
}

const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  lines,
}: Props) => {
  switch (inputType) {
    case "input": {
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="bg-transparent border-themeGray text-themeTextGray"
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <p className="text-red-500">
                  {message === "Required" ? "" : message}
                </p>
              );
            }}
          />
        </Label>
      );
    }
    case "select": {
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <select
            id={`select-${label}`}
            {...register(name)}
            className="bg-transparent w-full  border-[1px] p-3 rounded-lg"
          >
            {options?.length &&
              options.map((option) => (
                <option
                  key={option.id}
                  className="dark:bg-muted"
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return <p className="text-red-500">{message}</p>;
            }}
          />
        </Label>
      );
    }
    case "textarea": {
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`textarea-${label}`}
        >
          {label && label}
          <Textarea
            id={`textarea-${label}`}
            {...register(name)}
            className="bg-transparent border-themeGray text-themeTextGray"
            rows={lines}
            placeholder={placeholder}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return <p className="text-red-500">{message}</p>;
            }}
          />
        </Label>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default FormGenerator;
