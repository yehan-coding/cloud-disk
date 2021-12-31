import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Spin, Breadcrumb, Button, Upload, message, notification } from 'antd'
import './index.scss'
import { getFileList, uploadFile } from '@/api/index.js'
import IconFile from '@/assets/ic_file.png'
import IconOther from '@/assets/ic_other.png'
import Table from '@/components/table'
import { CloudDownloadOutlined, LogoutOutlined, CloudOutlined, FolderAddOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { localStore } from '@/utils/StoreUtils'

const host = 'https://minio.zhangtong.work/yehan/'


const { Header, Content } = Layout

const Index = () => {

  const [prefix, setPrefix] = useState('')
  const [tableSource, setTableSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [breadcrumb, setBreadcrumb] = useState(['全部文件'])
  const [precentStr, setPrecentStr] = useState('0%')

  const router = useHistory()

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
    setLoading(true)
    const { data } = await getFileList({
      prefix
    })
    setLoading(false)
    setBreadcrumb(['全部文件', ...prefix.split('/')])
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

  const logout = () => {
    localStore.removeItem('user')
    localStore.removeItem('token')
    router.replace('/login')
  }

  const handleBreadClick = (index) => {
    const prefixArr = breadcrumb.slice(1, index + 1)
    setPrefix(prefixArr && prefixArr.length > 0 ? `${prefixArr.join('/')}/` : '')
  }

  let notiBox = null
  const handleUploadFile = async (file) => {
    const formData = new FormData()
    formData.append('prefix', prefix)
    formData.append('file', file)
    showUploadProcess(0)
    const res = await uploadFile(formData, handleUploadProcess)
    if (res.code === 200) {
      message.success(res.message)
      fetchFileList()
      if (notiBox) {
        notification.close(notiBox)
        notiBox = null
      }
    }
  }

  const handleUploadProcess = ({ loaded, total }) => {
    setPrecentStr(parseFloat(loaded/total).toFixed(2) + '%')
    console.log(parseFloat(loaded/total).toFixed(2) + '%')
  }

  const showUploadProcess = () => {
    notiBox = notification.info({
      message: '文件上传中',
      description: <div>
        { precentStr }
      </div>,
      placement: 'bottomRight',
      duration: null
    })
  }

  const uploadConfig = {
    showUploadList: false,
    customRequest({ file }) {
      handleUploadFile(file)
    }
  }

  useEffect(() => {
    fetchFileList()
  }, [prefix])

  return (
    <Layout className="index-layout">
      <Header className="index-header">
        <div className='logo'>
          <CloudOutlined className='logo-icon' />
          <span className='website-name'>个人网盘</span>
        </div>
        <div className='breadcrumb-box'>
          <Breadcrumb>
            {
              breadcrumb.map((item, index) => <Breadcrumb.Item className='bread-item' onClick={ () => handleBreadClick(index) }>{ item }</Breadcrumb.Item>)
            }
          </Breadcrumb>
        </div>
        <div className='op-btns'>
          <Upload className='upload-btn' {...uploadConfig}>
            <Button type="primary" shape="round" icon={ <CloudUploadOutlined /> }>上传</Button>
          </Upload>,
          <Button className='new-folder-btn' type="primary" shape="round" icon={ <FolderAddOutlined /> }>新建文件夹</Button>
        </div>
        <div className='logout'>
          <LogoutOutlined onClick={ () => logout() } />
        </div>
      </Header>
      <Layout className="index-content">
        <Content>
          {
            loading ? <Spin className='loading' size="middle" tip="数据加载中..." /> : <Table source={ tableSource } column={ tableColumns } size="small" />
          }
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
