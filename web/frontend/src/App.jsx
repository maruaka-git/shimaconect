import React from 'react';
import './style.css'
import './App.css'
import ScrollToTop from './ScrollTop'
import StartScene from './pages/start-scene'
import RegistrationForUse from './pages/registration-for-use'
import SignUp from './pages/sign-up'
import Hand from './pages/hand'
import SignUpCompleted from './pages/sign-up-completed'
import LogIn from './pages/log-in'
import LogInCompleted from './pages/log-in-completed'
import MainScreen from './pages/main-screen'
import InternetForumPopu from './pages/internet-forum-popu'
import InternetForumNew from './pages/internet-forum-new'
import RefineSearch from './pages/refine-search'
import AddHandSign from './pages/add-hand-sign'
import AccountDelete from './pages/account-delete'
import LogOut from './pages/log-out'
import HandSignImage from './pages/hand-sign-image'
import HandSignVideo from './pages/hand-sign-video'
import { FormProvider } from './pages/formContext';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';
import HandSignList from './pages/hand-sign-list';
import Communication from './pages/communication';

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export const server = 'http://localhost:3000'
function App() {
  return (
    <FormProvider>
        <div className='App'>
          <ScrollToTop />
          <Routes>
            
              <Route exact path="/" element={<StartScene />}/>
              <Route exact path="/hand" element={<Hand />}/>
              <Route exact path="/registration-for-use" element={<RegistrationForUse />}/>
              <Route exact path="/sign-up" element={<SignUp />}/>
              <Route exact path="/sign-up-completed" element={<SignUpCompleted />}/>
              <Route exact path="/log-in" element={<LogIn />}/>
              <Route exact path="/log-in-completed" element={<LogInCompleted />}/>
              <Route exact path="/main-screen" element={<MainScreen />}/>
              <Route exact path="/internet-forum-popu" element={<InternetForumPopu />}/>
              <Route exact path="/internet-forum-new" element={<InternetForumNew />}/>
              <Route exact path="/refine-search" element={<RefineSearch />}/>
              <Route exact path="/add-hand-sign" element={<AddHandSign />}/>
              <Route exact path="/log-out" element={<LogOut />}/>
              <Route exact path="/account-delete" element={<AccountDelete />}/>
              <Route exact path="/hand-sign-image" element={<HandSignImage />}/>
              <Route exact path="/hand-sign-video" element={<HandSignVideo />}/>
              <Route exact path="/profile" element={<Profile />}/>
              <Route exact path="/hand-sign-list" element={<HandSignList />}/>
              <Route exact path="/communication" element={<Communication />}/>
            
          </Routes>
        </div>
    </FormProvider>
  );
}

export default App;