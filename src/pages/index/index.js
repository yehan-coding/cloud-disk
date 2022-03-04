import './index.scss'
import { Layout } from 'antd'
import { useState, useRef } from 'react'

import Top from './Top'
import Main from './Main'

const Index = () => {

  const [prefix, setPrefix] = useState('') // 前缀
  const mainRef = useRef()

  const updatePrefix = (str) => { // 更新 prefix 
    setPrefix(str)
  }
  
  const updateTable = (row) => { // 更新 table 数据
    if (row && row.name) {
      mainRef.current.addRowToList(row)
    } else {
      mainRef.current.updateFileList()
    } 
  }

  return (
    <Layout className="index-layout">
      <Top
        prefix={ prefix }
        updatePrefix={ updatePrefix }
        updateTable={ updateTable }
      />
      <Main
        ref={ mainRef }
        prefix={ prefix }
        updatePrefix={ updatePrefix }
      />
    </Layout>
  )
}

export default Index
