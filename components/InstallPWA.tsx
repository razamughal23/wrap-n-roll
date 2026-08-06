"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function InstallPWA() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!prompt) return;

    await prompt.prompt();
    await prompt.userChoice;

    setPrompt(null);
  };

  if (!prompt) return null;

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<DownloadRoundedIcon />}
      onClick={installApp}
      fullWidth
      sx={{
        mt: 2,
        borderRadius: 2,
        fontWeight: 700,
        py: 1.2,
      }}
    >
      Download App
    </Button>
  );
}
