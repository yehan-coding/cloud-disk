import { useState, useEffect } from 'react'
import { Layout } from 'antd'
import './index.scss'
import { getFileList } from '@/api/index.js'
import IconFile from '@/assets/ic_file.png'
import IconOther from '@/assets/ic_other.png'
import Table from '@/components/table'
import { CloudDownloadOutlined } from '@ant-design/icons';

const host = 'https://minio.zhangtong.work/yehan/'


const { Header, Content } = Layout

const Index = () => {

  const [prefix, setPrefix] = useState('')
  const [tableSource, setTableSource] = useState([])

  const tableColumns = [
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

  const fetchFileList = async () => {
    const { data } = await getFileList({
      prefix
    })
    setTableSource(data.reverse().map(item => ({ ...item, size: item.size ? getFileSize(item.size) : '' })))
  }

  const showDir = (isDir, name) => {
    if (isDir) setPrefix(`${prefix + name}/`)
  }

  const downFile = (uri) => {
    window.open(host + uri)
  }

  const getFileSize = (filesize) => {
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

  useEffect(() => {
    fetchFileList()
  }, [prefix])

  return (
    <Layout className="index-layout">
      <Header className="index-header"></Header>
      <Layout className="index-content">
        <Content>
          <Table source={ tableSource } column={ tableColumns } size="small" />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
