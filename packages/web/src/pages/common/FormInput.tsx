//
//  FormInput.tsx
//  dino-league
//
//  Created by d-exclaimation on 02 Jan 2023
//

import { FC, useMemo } from "react";

type Props = {
  type: string;
  value: string;
  label?: string;
  bind: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

const FormInput: FC<Props> = ({ bind, label, type, value, children }) => {
  const labelName = useMemo(
    () =>
      label ??
      type
        .split("")
        .map((x, i) => (i === 0 ? x.toUpperCase() : x.toLowerCase()))
        .join(""),
    [label, type]
  );
  return (
    <div className="_text-field flex flex-col w-full relative border-b-2 border-black border-opacity-20 mt-8 mb-4 mx-auto">
      <input
        type={type}
        className="m-0 w-full text-sm py-1 px-0 outline-none border-none focus:border-transparent overflow-hidden _input z-10"
        value={value}
        placeholder=" "
        onChange={bind}
      />
      <label
        htmlFor={type}
        className="text-black text-opacity-50 text-sm absolute _form-label"
      >
        {labelName}
      </label>
      {children}
    </div>
  );
};

export default FormInput;
