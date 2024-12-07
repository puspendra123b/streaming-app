import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import rikka from "/images/rikka.gif";

export function Header() {

    const navigate = useNavigate()
  return (
    <div>
      <div className="flex justify-between items-center h-14 mt-0">
        <div>
          <img onClick={()=>navigate('/')} className="h-11 cursor-pointer" src={logo} alt="aniwatch" />
        </div>
        <div>
          <button>🔍</button>
          <button onClick={()=>navigate('/admin-login')} className="bg-[#ffdd95] py-1 px-2 font-semibold rounded-2xl mx-3">
            Login
          </button>
        </div>
      </div>
      <div className="h-24 flex items-center bg-black">
        <img className="h-14 rounded-full ml-4" src={rikka} alt="" />
        <h4 className="text-[#ffdd95] text-xl font-semibold ml-4">
          Share AniWatch To Your Friends
        </h4>
      </div>
    </div>
  );
}
