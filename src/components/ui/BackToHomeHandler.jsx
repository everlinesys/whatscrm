import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";

export default function BackToHomeHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true }); // always go home
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return null;
}
