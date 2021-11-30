import './index.scss'

const Table = (props) => {

  const { column, source } = props
  console.log(props)

  return (
    <div className="table-wrap">
      <div className="table-header">
        {
          column.map(({ title, width }) => {
            return (
              <div className="table-header-cell" style={{ width: width }}>{ title }</div>
            )
          })
        }
      </div>
      <div className="table-body">
        {
          source.map((row) => {
            return (
              <div className="table-row">
                {
                  column.map(({ dataIndex, width, render, click }) => {
                    return (
                      <div className="table-body-cell" style={{ width: width }}
                        onClick={ () => click(row[dataIndex], row) }
                      >{
                        render ? render(row[dataIndex], row) : row[dataIndex] ? row[dataIndex] : '-'
                      }</div>
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
