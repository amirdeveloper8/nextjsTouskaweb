import { useState } from "react";
import { Form } from "react-bootstrap";
import classes from "./plans-front.module.css";

const BasicPlans = (props) => {
  const [value, setValue] = useState(false);
  const valSend = { name: props.value.name, price: props.value.price };
  const emptySend = { name: "", price: "" };

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    setValue(isChecked);
  };

  if (
    props.value.name === "صفحه اصلی (پایه)" ||
    props.value.name === "درباره ما" ||
    props.value.name === "تماس با ما"
  ) {
    props.valueBasics[props.number] = valSend;
  }

  const submitHandler = () => {
    if (
      props.value.name !== "صفحه اصلی (پایه)" &&
      props.value.name !== "درباره ما" &&
      props.value.name !== "تماس با ما"
    ) {
      if (value) {
        props.valueBasics[props.number] = valSend;
      }

      if (!value) {
        props.valueBasics[props.number] = emptySend;
      }
    }
  };

  return (
    <Form.Group
      className={classes.checkBox}
      controlId={`formBasicCheckbox${props.number}`}
      onBlur={submitHandler}
    >
      <Form.Check
        type="checkbox"
        label={props.value.name}
        onChange={(e) => handleChange(e)}
        value={
          props.value.name === "صفحه اصلی (پایه)" ||
          props.value.name === "درباره ما" ||
          props.value.name === "تماس با ما"
            ? true
            : value
        }
        checked={
          props.value.name === "صفحه اصلی (پایه)" ||
          props.value.name === "درباره ما" ||
          props.value.name === "تماس با ما"
            ? true
            : value
        }
      />
    </Form.Group>
  );
};

export default BasicPlans;
