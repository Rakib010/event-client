import { FieldDescription } from "../ui/field";

//
interface IInputErrorState {
  success: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}
const getInputFieldError = (fieldName: string, state: IInputErrorState) => {
  if (state && state.errors) {
    const error = state.errors.find((err) => err.field === fieldName);
    return error ? error.message : null;
  } else {
    return null;
  }
};

interface InputFieldErrorProps {
  field: string;
  state: IInputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (getInputFieldError(field, state)) {
    return (
      <FieldDescription className="text-red-600">
        {getInputFieldError(field, state)}
      </FieldDescription>
    );
  }

  return null;
};

export default InputFieldError;
