import { ChangeEvent, SetStateAction, useState } from "react";

type TInputValues = {
  [name: string]: string;
};

type TUseFormHook = {
  values: TInputValues,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<SetStateAction<TInputValues>>;
};

export function useForm(inputValues: TInputValues): TUseFormHook  {
    const [values, setValues] = useState<TInputValues>(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}