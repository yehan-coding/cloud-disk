import { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'

const BreadPath = (props) => {

  const { prefix, updatePrefix } = props
  const [breadcrumb, setBreadcrumb] = useState(['全部文件']) // 路径导航

  const handleBreadClick = (index) => {
    const prefixArr = breadcrumb.slice(1, index + 1)
    updatePrefix(prefixArr && prefixArr.length > 0 ? `${prefixArr.join('/')}/` : '')
  }

  useEffect(() => {
    setBreadcrumb(['全部文件', ...prefix.split('/')])
  }, [prefix])

  return (
    <div className='breadcrumb-box'>
      <Breadcrumb>
        {
          breadcrumb.map((item, index) => <Breadcrumb.Item className='bread-item' onClick={ () => handleBreadClick(index) }>{ item }</Breadcrumb.Item>)
        }
      </Breadcrumb>
    </div>
  )
}

export default BreadPath
