/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import electronSettings from "electron-settings";
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './constants/routes.json';
import App from './App';
import HomePage from './modules/home/home/HomePage';
import { HomeModule } from './modules/home';
import { AuthModule } from './modules/auth';
import { KdsModule } from './modules/kds';
import { LOCAL_STORAGE } from './utils/Constants';

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
    { path: routes.HOME, component: HomePage, exact: true, },
    { path: routes.COUNTER, component: CounterPage, exact: true, },
    ...HomeModule,
    ...AuthModule,
    ...KdsModule,
    { path: "/:id", component: HomePage, exact: false, isPrivate: false },
    { path: "*", component: HomePage, exact: false, isPrivate: false, },
];

const _renderPrivateRouter = (profile, route, index) => {
    const { component: Component, ...rest } = route;

    return (
        <Route
            {...rest}
            key={index}
            render={props => {
                if (!electronSettings.get(LOCAL_STORAGE.ACCESS_TOKEN)) {
                    return (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
                } else if (profile) {
                    return <Component {...props} />;
                } else {
                    return null; // keep location
                }
            }}
        />
    )
}

export default function Routes(props) {
    return (
        <App history={props.history}>
            {({ profile }) => (
                <Switch>
                    {routeConfigs.map((route: any, index) => {
                        const { component: Component, isPrivate, ...rest } = route;

                        if (isPrivate) {
                            return _renderPrivateRouter(profile, route, index);
                        } else {
                            return (<Route key={index} component={Component} {...rest} />);
                        }
                    })}
                </Switch>
            )}
        </App>
    );
}
