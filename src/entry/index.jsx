import { Outlet } from 'react-router-dom'
import Header from '@/components/header'
import './index.less'

function Entry() {
  return (
    <div className="M-entry">
      <Header />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Entry
