import React from 'react';
import apps from "./data/apps.js";
import Animation from './modules/animation.jsx';
import {Main,Footer} from './modules/main.jsx';



function App() {
return <><div id="animation"><Animation/></div><main><Main object = {apps}/></main><footer><Footer/></footer></>
}

export default App;
