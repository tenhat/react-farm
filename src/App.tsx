import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { Auth } from './components/Auth';
import { Todo } from './components/Todo';
import { selectCsrfState } from './slices/appSlice';
import { CsrfToken } from './types/types';

function App() {
  const csrf = useAppSelector(selectCsrfState)
  useEffect(()=>{
    const getCsrfToken  = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrftoken`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
      console.log(res.data.csrf_token)
    }
    getCsrfToken()
  },[csrf])
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route exact path="/todo">
          <Todo />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
