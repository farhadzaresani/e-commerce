import { InputBase, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";

const VarifyInput = (props) => {
  const [data] = useState([1, 2, 3, 4]);
  const inputRefs = useRef([]);
  const [varifyCode, setVarifyCode] = useState<string>("");
  const keyPressed = (e: any, index: number) => {
    let nextIndex = index + 1;
    if (e.key == "Backspace") {
      if (index === 0) return;
      nextIndex = index - 1;
    }
    if (nextIndex === data.length)
      return props.SignUpStepTwo.mutate(varifyCode);
    inputRefs.current[nextIndex].focus();
  };
  const readInputValue = (e: any) => {
    if (e.target.value.length == 0) {
      setVarifyCode(varifyCode.slice(0, -1));
    } else {
      setVarifyCode(varifyCode + e.target.value);
    }
  };

  return (
    <>
      {data.map((item, i) => {
        return (
          <TextField
            key={item}
            hiddenLabel
            id="filled-hidden-label-small"
            size="small"
            className="w-10 m-2"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 1,
              // onKeyUp: handleKeyPress(i),
              onKeyUp: (e) => keyPressed(e, i),
            }}
            inputRef={(ref) => (inputRefs.current[i] = ref)}
            onChange={(e) => readInputValue(e)}
          />
        );
      })}
    </>
  );
};

export default VarifyInput;
