import {lazy, Suspense} from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import SingleCharPage from '../../pages/singleCharPage/SingleCharPage';
import SingleInfoPage from '../singleInfoPage/SingleInfoPage';

const Page404 = lazy(() => import('../../pages/Page404'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const ComicsPage = lazy(() => import('../../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../../pages/singleComicPage/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path='/characters'>
                                <MainPage/>
                            </Route>
                            <Route path='/characters/:id'>
                                <SingleInfoPage Component={SingleCharPage} getData="character" />
                            </Route>
                            <Route exact path='/comics'>
                                <ComicsPage/>
                            </Route>
                            <Route path='/comics/:id'>
                                <SingleInfoPage Component={SingleComicPage} getData="comic" />
                            </Route>
                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;