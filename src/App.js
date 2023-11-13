import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import HompPage from "pages/HompPage";

function App() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<SignUpPage></SignUpPage>}></Route>
                    <Route
                        path="/sign-in"
                        element={<SignInPage></SignInPage>}></Route>
                    <Route path="/" element={<HompPage></HompPage>}></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
