import { useState } from "react";

export function useToggle(initialValue) {
  const [current, setCurrent] = useState(initialValue);

  const handleToggle = () => setCurrent((prev) => !prev);

  return { current, handleToggle };
}
