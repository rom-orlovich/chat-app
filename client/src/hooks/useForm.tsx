import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AnyFun, GenericRecord } from "../types/types";

interface FormState<D> {
  isLoading: boolean;
  data?: D;
  isSent: boolean;
  error?: Error;
}
/**
 *
 * @param {T} initialState The initialState of the form.
 * @returns The form's state, form's values and utilities functions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useForm<T extends GenericRecord<any>, D = any>(initialState: T) {
  const [formValues, setFormValues] = useState(initialState);

  const [formState, setFromState] = useState<FormState<D>>({
    isLoading: false,
    data: undefined,
    isSent: false,
  });
  // On change handler by input's id.
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    setFormValues((pre) => ({
      ...pre,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  // function handleSetValue<V>(id: keyof T) {
  //   return (value: V) => {
  //     setFormValues((pre) => ({
  //       ...pre,
  //       [id]: value,
  //     }));
  //   };
  // }

  /**
   * This function return the submit function that execute the callback function that provided to execute during the submit event.
   * During the submit event, the submit function handles the state of the submit event and return an appropriate response.
   */

  const onSubmit: (cb: AnyFun) => FormEventHandler<HTMLFormElement> =
    (cb) => async (e) => {
      e.preventDefault();
      try {
        // Initialize a new form submitting.
        setFromState((pre) => ({
          ...pre,
          data: undefined,
          isLoading: true,
          isSent: true,
        }));
        const result = await cb(formValues, e);

        // Set the result data.
        setFromState({
          data: result,
          isLoading: false,
          isSent: false,
        });
        return result;
      } catch (error) {
        const errorObj = error as Error;
        // Handle any error if it is exist.
        setFromState({
          data: undefined,
          isLoading: false,
          isSent: false,
          error: new Error(errorObj.message || "Something went wrong"),
        });
      }
      return formState.error;
    };

  return {
    setFormValues,
    // handleSetValue,
    onSubmit,
    onChange,
    // onChange: useDebouncedCallback(onChange, 500),
    formValues,
    formState,
  };
}

export default useForm;
