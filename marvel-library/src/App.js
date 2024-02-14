import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './Main_Content/main';
import { Marvel } from './Main_Content/characters_info';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<Marvel />} />
      </Routes>
    </Router>
  );
}
export default App;
