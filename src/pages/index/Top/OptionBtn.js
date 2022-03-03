import { Upload, Button } from 'antd'
import { FolderAddOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { uploadFile } from '@/api/index.js'
import { message, notification } from 'antd'

const OptionBtn = (props) => {

  const { prefix, updateTable } = props

  const uploadConfig = { // 文件上传组件配置项
    showUploadList: false,
    customRequest({ file }) {
      handleUploadFile(file)
    }
  }

  const handleUploadFile = async (file) => { // 文件上传
    const formData = new FormData()
    formData.append('prefix', prefix)
    formData.append('file', file)
    const res = await uploadFile(formData, handleUploadProcess)
    if (res.code === 200) {
      notification.success({
        key: 'uploadProcess',
        message: '文件上传完成',
        description: <div>100%</div>,
        placement: 'bottomRight',
        duration: 2
      })
      updateTable()
    }
  }

  const handleUploadProcess = ({ loaded, total }) => { // 文件上传事件回调
    showUploadProcess(Number(((loaded / total) * 100).toFixed(2)))
  }

  const showUploadProcess = (precent) => { // 文件上传进度消息框展示
    if (precent !== 100) {
      notification.info({
        key: 'uploadProcess',
        message: '文件上传中',
        description: <div>
          { precent + '%' }
        </div>,
        placement: 'bottomRight',
        duration: null
      })
    }
  }

  return (
    <div className='op-btns'>
      <Upload className='upload-btn' {...uploadConfig}>
        <Button type="primary" shape="round" icon={ <CloudUploadOutlined /> }>上传</Button>
      </Upload>,
      <Button className='new-folder-btn' type="primary" shape="round" icon={ <FolderAddOutlined /> }>新建文件夹</Button>
    </div>
  )
}

export default OptionBtn
