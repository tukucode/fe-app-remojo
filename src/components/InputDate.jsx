/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

export default function InputDate(props) {
  const {
    name = "start_date",
    placeholder = "Date",
    minDate = null,
    maxDate = null,
    valueInput = "",
    isInvalid = null,
    onChangeDate = () => {},
    children,
  } = props;


  function onChangeValue(event) {
    onChangeDate(event);
  }

  return (
    <>
      <Form.Control
        type="date"
        name={name}
        min={minDate}
        max={maxDate}
        isInvalid={isInvalid}
        value={valueInput}
        onChange={(e) => {
          onChangeValue(e);
        }}
        placeholder={placeholder}
        className="rounded-0 bg-light"
      />
      {children}
    </>
  );
}
