import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Layout, Spin } from 'antd'
import Table from '@/components/table'
import { CloudDownloadOutlined } from '@ant-design/icons'
import IconFile from '@/assets/ic_file.png'
import IconOther from '@/assets/ic_other.png'
import { getFileList } from '@/api/index.js'

const host = 'https://minio.zhangtong.work/yehan/'

const Main = (props, ref) => {

  const { prefix, updatePrefix } = props
  const [loading, setLoading] = useState(false) // loading 状态
  const [tableSource, setTableSource] = useState([]) // 表格数据源

  const tableColumns = [ // 表格表头
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
      render: (text, { isDir, name, uri }) => {
        return (
          <div className="file-name">
            <div className="name" onClick={ () => { showDir(isDir, name) } }>
              <img
                style={{ width: '40px' }}
                src={ isDir ? IconFile : IconOther }
                alt=""
              />
              <span>{ text }</span>
            </div>
            <div className={ `option ${!isDir ? 'show' : ''}` }>
              <CloudDownloadOutlined style={{ fontSize: '16px' }} onClick={ () => downFile(uri) } />
            </div>
          </div>
        )
      }
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: '16%',
    },
    {
      title: '修改时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
      width: '24%',
    }
  ]

  const showDir = (isDir, name) => { // 查看文件夹
    if (isDir) updatePrefix(`${prefix + name}/`)
  }

  const downFile = (uri) => { // 下载文件
    window.open(host + uri)
  }

  const fetchFileList = async () => { // 请求文件数据
    try {
      setLoading(true)
      const { data } = await getFileList({ prefix })
      setTableSource(data.reverse().map(item => ({ ...item, size: item.size ? getFileSize(item.size) : '' })))
    } catch (e) {
      console.log('请求失败')
      setTableSource([])
    } finally {
      setLoading(false)
    }
  }

  const getFileSize = (filesize) => { // 格式化文件大小
    if (filesize < 1024) {
      return filesize + 'B'
    } else if (filesize < (1024 * 1024)) {
      let temp = filesize / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    } else if (filesize < (1024 * 1024 * 1024)) {
      let temp = filesize / (1024 * 1024);
      temp = temp.toFixed(2)
      return temp + 'MB'
    } else {
      let temp = filesize / (1024 * 1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  }

  useEffect(() => { // 根据prefix的变化，触发生命周期hook
    fetchFileList()
  }, [prefix])

  useImperativeHandle(ref, () => ({ // 函数式组件无法直接获取到ref，需要通过 useImperativeHandle 跟 forwardRef 来实现ref
    updateFileList: () => { // 将更新列表的方法通过 ref 抛出给父组件
      fetchFileList()
    }
  }))

  return (
    <Layout className="index-content">
      <Layout.Content>
        {
          loading
            ? <Spin className='loading' size="middle" tip="数据加载中..." />
            : <Table source={ tableSource } column={ tableColumns } size="small" />
        }
      </Layout.Content>
    </Layout>
  )
}

export default forwardRef(Main)
