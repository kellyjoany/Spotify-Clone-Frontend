import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Browse from '../pages/browse/browse'
import Playlist from '../pages/playlist/playlist'
import Createalbum from '../pages/addAlbum/addAlbum'
import Createmusics from '../pages/addMusic/addMusic'

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Browse} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route path="/addAlbum" render={() => <Createalbum id={props.userInSession._id} /> }/>
            <Route path="/addMusic" render={() => <Createmusics id={props.userInSession._id} /> }/>
        </Switch>
    );
}

export default Routes;