import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { ring } = await import("ldrs");
      ring.register();
    }
    getLoader();
  }, []);
  return <l-ring color="white" size={20} stroke={2}></l-ring>;
}
