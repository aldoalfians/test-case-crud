import { Form } from "antd";
import { PropsWithChildren } from "react";
import ButtonGroupActions from "../button/ButtonGroupActions";
import { FORM_LAYOUT, FORM_VALIDATE_MESSAGE } from "../utils/constant";

type Props = {
  goBackPathname: string;
  isSubmitting?: boolean;
  onFinish: any;
};

export default function FormGeneric({
  children,
  goBackPathname,
  isSubmitting,
  onFinish,
}: PropsWithChildren<Props>) {
  return (
    <Form
      {...FORM_LAYOUT}
      onFinish={onFinish}
      validateMessages={FORM_VALIDATE_MESSAGE}
    >
      {children}
      <ButtonGroupActions
        goBackPathname={goBackPathname}
        isSubmitting={isSubmitting}
      />
    </Form>
  );
}
