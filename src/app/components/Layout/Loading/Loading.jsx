import {FadeLoader} from "react-spinners"
import { useTheme } from "../../../others/theme/themeContext"

function Loading() {
  const {darkMode}=useTheme()
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <FadeLoader color={darkMode === "light" ? "#8B5CF6" : "black"} />
    </div>
  )
}

export default Loading
