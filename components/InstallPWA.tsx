"use client";

import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  const install = async () => {
    if (!prompt) return;

    prompt.prompt();

    await prompt.userChoice;

    setPrompt(null);
  };

  if (!prompt) return null;

  return <button onClick={install}>Download App</button>;
}
