import { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({
  name,
  label,
  value,
  type,
  onChange,
  ...rest
}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...{ name, label, value, type, onChange, ...rest }} />
    </div>
  );
};

export default Input;
