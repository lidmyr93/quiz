import { useState } from "react";

export default function MessageInput({
  send,
}: {
  send: (val: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <input
        type="text"
        placeholder="message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => send(value)}>send</button>
    </>
  );
}
