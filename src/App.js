import { HashRouter, useRoutes } from 'react-router-dom'
import { Provider } from "react-redux";
import { GlobalStyle } from './style/reset'
import { IconStyle } from './style/iconfont'
import store from "./store";
import routes from "./routes";

const MyRoutes = () => useRoutes(routes) 

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {<MyRoutes />}
      </HashRouter>
    </Provider>
  );
}

export default App

