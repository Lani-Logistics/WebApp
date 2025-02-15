import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  
  return (
    <>
      <div className="h-[100dvh] center bg-primary">
        <div>
          <div className="center px-4 py-2 bg-white rounded-xl">
            <img src="/logo-orange.png" alt="logo" width={40} />
            <h3 className="text-2xl font-sora font-bold">Lani</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Splash;
