/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './constants/routes.json';
import App from './modules/App';
// import HomePage from './modules/HomePage';
import KdsMakeTablePage from './modules/kds/make-table/KdsMakeTablePage';
import { KdsModule } from './modules/kds';

// Lazily load routes and code split with webpacck
const LazyCounterPage = React.lazy(() =>
    import(/* webpackChunkName: "CounterPage" */ './modules/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
    <React.Suspense fallback={<h1>Loading...</h1>}>
        <LazyCounterPage {...props} />
    </React.Suspense>
);

export const routeConfigs = [
    { path: routes.HOME, component: KdsMakeTablePage, exact: true, },
    { path: routes.COUNTER, component: CounterPage, exact: true, },
    ...KdsModule,
    { path: "/:id", component: KdsMakeTablePage, exact: false, isPrivate: false },
    { path: "*", component: KdsMakeTablePage, exact: false, isPrivate: false, },
];

export default function Routes(props) {
    return (
        <App history={props.history}>
            <Switch>
                {routeConfigs.map((route, index) => {
                    const { component: Component, ...rest } = route;

                    return (<Route key={index} component={Component} {...rest} />);
                })}
            </Switch>
        </App>
    );
}
