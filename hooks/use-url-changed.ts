import { useState, useEffect } from "react";

export function useUrlChanged() {
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    const handlePopState = () => {
      setUrl(window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return url;
}
