import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import EChartsReact from "echarts-for-react";
import {listTopInvokeInterfaceInfoUsingGet} from "@/services/YuqiAPI-backEnd/analysisController";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  // 存储数据状态
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  // 存储加载状态的状态，默认加载中
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从远程获取数据
    try {
      listTopInvokeInterfaceInfoUsingGet().then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (e: any) {

    }
  }, []);

  const chartData = data.map(item => {
    return {
      value: item.invokeNum,
      name:  item.name,
    }
  })

  //ECharts图表的配置选项
  const option = {
    title: {
      text: '接口调用次数TOP3',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PageContainer>
      <EChartsReact option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
