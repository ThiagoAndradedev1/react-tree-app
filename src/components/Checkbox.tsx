import { ChangeEvent, useEffect, useRef } from "react";

type CheckboxProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  indeterminate: boolean;
};

const Checkbox = ({
  name,
  label,
  checked,
  onChange,
  indeterminate = false,
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [inputRef, indeterminate, label, checked]);

  return (
    <div className="checkbox-content">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          ref={inputRef}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
