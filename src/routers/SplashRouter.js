import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import SplashView from '../views/Splash'
import Axios from 'axios';

const SplashRouter = () => {
    return (
        <Scene
            key='splash'
            component={SplashView}
            hideNavBar
            on={async () => {
                const token = await AsyncStorage.getItem('Token');
                console.log(token);
                Axios.defaults.headers.common['Authorization'] = token;
                return token !== null;
            }}
            success={() => Actions.main()}
            failure={() => Actions.login()}
            />
    )
}

export default SplashRouter();
