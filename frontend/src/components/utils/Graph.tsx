import { ArgumentAxis, Chart, SplineSeries, ValueAxis } from "@devexpress/dx-react-chart-material-ui"
import { ValueScale } from "@devexpress/dx-react-chart"
import Paper from "@material-ui/core/Paper"

export const Graph = (props: any) => {
  //受け取ったpropsをChartのデータに割り当てる
  const { weightsData } = props;

  return (
    <>
      <Paper>
        <Chart
          data={weightsData.map((weight: any) => {
            const container = {
              day: new Date(`${weight.date}`).getDate(),
              daykg: weight.kg
            }
            return container
          })}
        >
          <ValueScale name="daykg" modifyDomain={()=>[0,100]}/>
          <ArgumentAxis />
          <ValueAxis scaleName="daykg" showTicks/>
          <SplineSeries valueField="daykg" argumentField="day" scaleName="daykg" />
        </Chart>
      </Paper>
    </>
  )
}