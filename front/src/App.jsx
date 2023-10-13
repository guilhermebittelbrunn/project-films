import {ConfigProvider} from 'antd'
import { BrowserRouter } from 'react-router-dom'
import pt_BR from 'antd/locale/pt_BR'
import UserProvider from './context/UserContext'
import Router from './Router'

export default function App(){
    return(
      <>
        <BrowserRouter>
          <ConfigProvider locale={pt_BR}>
            <UserProvider>
              <Router/>
            </UserProvider>
          </ConfigProvider>
        </BrowserRouter>
      </>
    )
}
