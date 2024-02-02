import Regform from "./layout/regform"
import Logform from "./layout/Logform"
import AppRouter from "./routes/AppRouter"
import useAuth from "./Hooks/useAuth"

function App() {
const {loading} = useAuth()
if(loading) {
  return (
    <p className="text-4xl text-primary">Loading..</p>
  )
}
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
