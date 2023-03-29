import { ReactNode } from "react";
import {
  ButtonProps,
  InputProps,
  LabelProps,
  LabelTextProps,
  SpanProps,
  TextAreaProps,
} from "../../HTML.types";

export interface IconButtonProps {
  Icon: ReactNode;
  buttonProps: ButtonProps;
}
export interface InputLabelProps {
  inputProps?: InputProps & { inputContainer?: { className: string } };
  labelProps?: LabelProps;
  textProps?: LabelTextProps;
  textAreaProps?: TextAreaProps;
  IconButtonProps?: IconButtonProps;
  wrapperInputLabel?: SpanProps;
}
