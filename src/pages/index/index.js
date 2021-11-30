import { useState, useEffect } from 'react'
import { Layout } from 'antd'
import './index.scss'
import { getFileList } from '@/api/index.js'
import IconFile from '@/assets/ic_file.png'
import IconOther from '@/assets/ic_other.png'
import Table from '@/components/table'


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
      render: (text, { isDir }) => {
        return (
          <div className="file-name">
            <img
              style={{ width: '40px' }}
              src={ isDir ? IconFile : IconOther }
              alt=""
            />
            <span>{ text }</span>
          </div>
        )
      },
      click: (text, { isDir, uri }) => {
        isDir ? showDir(text) : downFile(uri)
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
    setTableSource(data.reverse())
  }

  const showDir = (dir) => {
    setPrefix(`${prefix + dir}/`)
  }

  const downFile = (uri) => {
    console.log(uri)
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
