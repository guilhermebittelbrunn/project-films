import {ConfigProvider} from 'antd'
import { BrowserRouter } from 'react-router-dom'
import pt_BR from 'antd/locale/pt_BR'
import UserProvider from './context/UserContext'
import Router from './Router'

export default function App(){
    return(
      <div className="text-font">
        <BrowserRouter>
          <ConfigProvider locale={pt_BR} theme={{components:{Select: {selectorBg: '#171717', optionSelectedBg: '#09B54E'}},token: {colorPrimary: '#09B54E', colorText: '#FAFAFA',}}}>
            <UserProvider>
              <Router/>
            </UserProvider>
          </ConfigProvider>
        </BrowserRouter>
      </div>
    )
}
