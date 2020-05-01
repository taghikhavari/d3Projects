import React from "react";
import * as d3 from "d3";
import { IData } from "./model";

interface IProps {
	data: IData[];
}

interface ISlice {
  x: number;
  y: number;
  height: number;
  fill: string;
}

const Chart = ({ data }: IProps) => {
  const [slices, setSlices] = React.useState<ISlice[]>([]);
  const width = 650;
  const height = 400;
  const margin = { top: 20, right: 5, bottom: 20, left: 35 };

  const xAxis = React.useRef(null)
  const yAxis = React.useRef(null)

  React.useEffect(() => {
    if(data?.length){
			const timeDomain = d3.extent(data, (d) => new Date(d.date));
      const xScale = d3.scaleTime().range([margin.left, width - margin.right]);
			const yScale = d3.scaleLinear().range([height - margin.top, margin.bottom]);
			const colorScale = d3.scaleSequential(d3.interpolateSpectral);

			const tempMax = d3.max(data, (d) => d.high);
      const [minAvg, maxAvg] = d3.extent(data, (d) => d.avg);
      // @ts-ignore
			xScale.domain(timeDomain);
      // @ts-ignore
			yScale.domain([0, tempMax]);
      // @ts-ignore
			colorScale.domain([maxAvg, minAvg]);

      const axisBottom = d3.axisBottom(xScale);
      const axisLeft = d3.axisLeft(yScale);
      // @ts-ignore
      d3.select(xAxis?.current).call(axisBottom);
      // @ts-ignore
      d3.select(yAxis?.current).call(axisLeft);

			// calculate x and y for each rectangle
			const newSlices = data.map((d) => {
				const y1 = yScale(d.high);
				const y2 = yScale(d.low);
				return {
					x: xScale(new Date(d.date)),
					y: y1,
					height: y2 - y1,
					fill: colorScale(d.avg),
				};
      });
      setSlices(newSlices);
    }
  }, [data])

  return (
		<svg width={width} height={height}>
			{slices?.map((slice, index) => (
				<rect key={index} x={slice.x} y={slice.y} width={2} height={slice.height} fill={slice.fill} />
			))}
      <g ref={xAxis} transform={`translate(0, ${height - margin.bottom})`}/>
      <g ref={yAxis} transform={`translate(${margin.left}, 0)`}/>
		</svg>
	);
}

export default Chart;
