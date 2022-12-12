import {Layout} from "./components/Layout/Layout";
// import {useRoutes} from "./routes";
// import {BrowserRouter, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {MainPage} from "./pages/MainPage/MainPage";
import {Test} from "./pages/Test";
import {EditModal} from "./pages/EditModal/EditModal";

function App() {

    // const routes = useRoutes()
    // const { pathname } = useLocation()

    return (
        <div className="App">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {/*<Router>*/}
            {/*    <div>*/}
            {/*        {routes}*/}
            {/*    </div>*/}
            {/*</Router>*/}
            {/*<EditModal />*/}
            <MainPage />
            {/*<EditModal />*/}
            {/*<Test />*/}
        </div>
    )
}

export default App
