import { ThemeToggle } from "../UI"
import { Goback } from "../UI"

const Header = () => {
  return (
    <>
    <header className="sticky top-0 z-50 backdrop-blur-sm">

    <nav className="layout h-[60px] flex items-center justify-between line">
       <Goback/>
       <ThemeToggle/>
    </nav>
    </header>
    </>
  )
}

export default Header