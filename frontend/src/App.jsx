import { Outlet } from "react-router"
import NavBar from "./components/NavBar"
import SpotLight from "./components/SpotLight"


function App() {


  return (
    <>
    <NavBar />
    <SpotLight />

       <main className="py-3">
       <Outlet />
     </main>
    </>
  )
}

export default App
