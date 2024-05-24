import { useState, useRef } from "react";
import { Form } from "react-bootstrap";

export default function InputDate(props) {
  const {
    name = "start_date",
    placeholder = "Date",
    valueInput = "",
    onChangeDate = () => { },
  } = props;


  const inputRef = useRef(null);
  const [type, setType] = useState("text");

  function onChangeType(value) {
    setType(value);

    if (value === 'date') {
      const timeout = setTimeout(() => {
        inputRef.current.showPicker()

        clearTimeout(timeout)
      }, 100);
    }
  }

  function onChangeValue(event) {
    onChangeDate(event);
    // remove focus
    inputRef.current.blur();
    // set type input to text
    setType('text');
  }

  return (
    <Form.Control
      readOnly={type !== 'date'}
      ref={inputRef}
      type={type}
      name={name}
      value={valueInput}
      onChange={(e) => { onChangeValue(e) }}
      onFocus={() => { onChangeType('date') }}
      onBlur={() => { onChangeType('text') }}
      placeholder={placeholder}
      className="rounded-0 bg-light"
    />
  );
}
