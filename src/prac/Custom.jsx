import { useEffect, useRef, useState } from "react";

function useConfirm(message, callback) {
  if (typeof message !== "string" || typeof callback !== "function") return;

  const confirmAction = () => {
    // function confirmAction() {
    if (window.confirm(message)) {
      callback();
    }
  };
  return confirmAction;
}

function useFocus() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return ref;
}

function useAddEventListner(FUNCTION, trigger) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("click", FUNCTION);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", FUNCTION);
        console.log("useAddEventListner 언마운트!");
      }
    };
  }, [trigger]);

  return ref;
}

const Custom = () => {

  const executeDelete = () => {
    console.log("delete world..");
  };

  const onClickDeleteBtn = useConfirm("is sure delete world?", executeDelete);
  const focusRef = useFocus();

  const [trigger, setTrigger] = useState(false);
  const addEventRef = useAddEventListner(executeDelete, trigger);
  const onClickEventRef = () => {
    setTrigger((prev) => !prev);
  };

  return (
    <div>
      <button onClick={onClickDeleteBtn}>delete world</button>
      <input ref={focusRef} placeholder="자동으로 포커스됩니다" />
      <h1 ref={addEventRef} onClick={onClickEventRef}>
        클릭하면 커스텀훅을 통해 생명주기에 따라 이벤트가 붙습니다
      </h1>
    </div>
  );
}

export default Custom;
