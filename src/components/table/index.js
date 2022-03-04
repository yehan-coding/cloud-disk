import './index.scss'
import { Spin } from 'antd'

const Table = (props) => {

  const { column, source, loading } = props

  return (
    <div className="table-wrap">
      <div className="table-header">
        {
          column.map(({ title, width }) => {
            return (
              <div
                className="table-header-cell"
                style={{ width: width }}
                key={ title }
              >
                { title }
              </div>
            )
          })
        }
      </div>
      <div className="table-body">
        {
          loading
            ? <Spin className='loading' size="middle" tip="数据加载中..." />
            : source.map((row) => {
              return (
                <div className="table-row" key={ row['id'] }>
                  {
                    column.map(({ dataIndex, width, render, click }) => {
                      return (
                        <div
                          key={ dataIndex }
                          className="table-body-cell"
                          style={{ width: width }}
                          onClick={
                            () => click && click(row[dataIndex], row)
                          }
                        >
                          { render
                            ? render(row[dataIndex], row)
                            : row[dataIndex] ? row[dataIndex]: '-' }
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default Table
