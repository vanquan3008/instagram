import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes } from '~/Routes';
import { DefaultLayout } from '~/Components/Layout';
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {
                    publicRoutes.map((router, index) => {
                        let Layout = DefaultLayout;
                        if (router.Layout) {
                            Layout = router.Layout;
                        } else if (Layout == null) {
                            Layout = Fragment;
                        }
                        const Page = router.component;
                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
