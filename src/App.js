import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import HompPage from "pages/HompPage";
import ErrorPage from "pages/ErrorPage";
import PostDetailsPage from "pages/PostDetailsPage";
import PostManage from "module/post/PostManage";
import DashboardPage from "pages/DashboardPage";
import DashboardLayout from "module/dashboard/DashboardLayout";
import PostAddNew from "module/post/PostAddNew";
import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";

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
                    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
                    <Route
                        path="/detail/:slug"
                        element={<PostDetailsPage></PostDetailsPage>}></Route>
                    <Route element={<DashboardLayout></DashboardLayout>}>
                        <Route
                            path="/manage/post"
                            element={<PostManage></PostManage>}></Route>
                        <Route
                            path="/manage/add-post"
                            element={<PostAddNew></PostAddNew>}></Route>
                        <Route
                            path="/dashboard"
                            element={<DashboardPage></DashboardPage>}></Route>
                        <Route
                            path="/manage/category"
                            element={<CategoryManage />}></Route>
                        <Route
                            path="/manage/add-category"
                            element={<CategoryAddNew />}></Route>
                        <Route
                            path="/manage/update-category"
                            element={<CategoryUpdate />}></Route>
                    </Route>
                    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
