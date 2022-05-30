import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserLoginScreen from './screen/userLoginScreen';
import CounterLoginScreen from './screen/counterLoginScreen';
import CounterRegisterScreen from './screen/counterRegisterScreen';
import UserRegisterScreen from './screen/userRegisterScreen';
import IssueScreen from './screen/issueScreen';
import CounterScreen from './screen/counterScreen';
import QueueScreen from './screen/queueScreen';
import NotificationScreen from './screen/notificationScreen';
import CounterIssueScreen from './screen/counterIssueScreen';
import HomeScreen from './screen/homeScreen';
import UserNavbar from './screen/userNavbar';
import CounterNavbar from './screen/counterNavbar';

function App() {
  return (
    
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/'                   element={ <HomeScreen/>            }/>
          <Route path='/user/login'         element={ <UserLoginScreen/>       }/>
          <Route path='/user/register'      element={ <UserRegisterScreen/>    }/>
          <Route path='/user/issues'        element={ <IssueScreen/>           }/>
          <Route path='/user/queue'         element={ <QueueScreen/>           }/>
          <Route path='/user/notification'  element={ <NotificationScreen/>    }/>
          <Route path='/unav'               element={ <UserNavbar/>            }/>
          <Route path='/counter/login'      element={ <CounterLoginScreen/>    }/>
          <Route path='/counter/register'   element={ <CounterRegisterScreen/> }/>
          <Route path='/counter/getall'     element={ <CounterScreen/>         }/>
          <Route path='/counter/getone/:id' element={ <CounterIssueScreen/>    }/>
          <Route path='/cnav'               element={ <CounterNavbar/>         }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
