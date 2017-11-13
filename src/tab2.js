import React from 'react';
import { List, InputItem, WhiteSpace,  Radio, Badge, Picker, Toast, Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
import echarts from 'echarts';
//import $ from 'webpack-zepto'

let result2 = {
	  total: '', // 贷款总额
	  mounth: '', //还款月数
	  mounthMoney: '', // 月还款
	  rate: '', // 还款利息
	  allMoney: '', // 本息总额
	  mounthLess: '' //月减少
	};
let form2 = {
	  repayment: '0', // 还款方式-默认等额本息
	  total: '', // 贷款金额
	  year: '', // 贷款年限
	  yearRate: '3.25', // 年利率
	  fundRate: '3.25'
};
const payMethods2 = [
      { value: 0, label: '等额本息' },
      { value: 1, label: '等额本金' },
    ];
    
class tab2FormClass extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  };
  scrollBackTop = (e) =>{
  	//this.node.scrollIntoView();
  	//document.getElementById('pageBox2').scrollIntoView(true);
  	document.getElementById('pageBox2').scrollTop = 0;
  };
  handleClick = () => {
    this.customFocusInst.focus();
  };
  ChangeYearRate = (value) => {  	
  	this.setState({
	      value,
	      yearRate:value,
	      fundRate:value[0]
	  });
  };
  changepayMethods2 = (value) => {
    console.log('checkbox cheked:'+value);
    form2.repayment = value;
    this.setState({
      value,
    });
    if(value){
    	this.refs.p1.style.display = 'none'
    	this.refs.p2.style.display = 'block'
    }else{
    	this.refs.p1.style.display = 'block'
    	this.refs.p2.style.display = 'none'
    }
  };
  state = {
    InputItemType: 'money',
    value: 0,
    loanTerm: ['20'],
    yearRate:['3.43'],
    fundRate: '3.43'
  };
	
  // 第二页执行计算
  submit1 = (e) => {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
    form2.repayment = this.state.value;
    form2.total = values.loanAmount;
    form2.year = values.loanTerm;
    form2.yearRate = values.yearRate;
    form2.fundRate = (values.yearRate)[0];
    console.log(form2.repayment,'-----form2.repayment')
    console.log(values,'-------values')
    this.setState({
      form2,
      
    });
    if (!values.loanAmount) {
      Toast.info('请输入贷款金额', 1);
      return
    }
    if (!values.loanTerm) {
      Toast.info('请选择贷款年限', 1);
      return
    }
    if (!values.yearRate) {
      Toast.info('请选择年利率', 1);
      return
    }
    if (!values.fundRate) {
      Toast.info('请选输入商业年利率', 1);
      return
    }
    // 进行数据转换
    (form2.total) ? form2.total = Number(form2.total): form2.total = 0;
    (form2.year) ? form2.year = Number(form2.year) : form2.year = 0;
    (form2.yearRate) ? form2.yearRate = Number(form2.yearRate) : form2.yearRate = 0;
    let yearRate = form2.yearRate / 100
    if (form2.repayment === 1) {
      result2.total = (form2.total).toFixed(2);
      result2.mounth = (form2.year * 12);
      result2.rate = ((form2.year * 12 + 1) * form2.total * (yearRate / 12) / 2).toFixed(2);
      result2.mounthMoney = (form2.total*10000 * yearRate / 12 + form2.total*10000 / result2.mounth).toFixed(2);
      result2.mounthLess = ((form2.total*10000 * yearRate / 12 + form2.total*10000 / result2.mounth) -((form2.total*10000 / result2.mounth) + (form2.total*10000 - form2.total*10000 / result2.mounth) * (yearRate / 12))).toFixed(2);
      result2.allMoney = (Number(result2.rate) + form2.total).toFixed(2);
    } else {
      // 等额本息
      result2.mounthLess = ''
      result2.total = (form2.total).toFixed(2);
      result2.mounth = (form2.year * 12);
      result2.mounthMoney = ((form2.total * (yearRate / 12 ) * Math.pow((1 + yearRate / 12), (form2.year * 12)) / (Math.pow((1 + yearRate / 12), (form2.year * 12)) -1) * 10000)).toFixed(2);
      result2.rate = (Number(result2.mounthMoney / 10000) * form2.year * 12 - form2.total).toFixed(2);
      result2.allMoney = (Number(result2.mounthMoney / 10000) * form2.year * 12).toFixed(2);
    }
    this.refs.echartbox2.style.height = '120px'
    this.initEchar('main2',[Number(result2.total), Number(result2.rate)])
  	this.scrollBackTop()
  	});
  };
  initEchar(chartDom,newData) {
      var option = {
        series: [{
          name: '贷款金额',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          hoverAnimation: false, //关闭 hover 在扇区上的放大动画效果。
          cursor: 'default', //鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。
          silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          label: {
            normal: {
              show: false,
              position: 'default'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
              value: 0,
              name: '贷款金额'
            },
            {
              value: 0,
              name: '贷款利息'
            }
          ]
        }]
      };

      var mainDom = chartDom;
      var myChart = echarts.init(document.getElementById(mainDom));
      myChart.setOption(option);
      // 显示 tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0
      })

      if (newData) {

         console.log('1',newData)

        option.series[0].data = [{
            value: newData[0],
            name: '贷款金额'
          },
          {
            value: newData[1],
            name: '贷款利息'
          }
        ]
        myChart.clear()
        myChart.setOption(option)
    }
		
  };
  render() {
    const { getFieldProps } = this.props.form;
    let {InputItemType,value,loanTerm,yearRate,fundRate} = this.state;
    const RadioItem = Radio.RadioItem;
    const loanTermList = [
      {
        'label': '1(12期)',
        'value': '1'
      }, {
        'label': '5(60期)',
        'value': '5'
      }, {
        'label': '10(120期)',
        'value': '10'
      }, {
        'label': '15(180期)',
        'value': '15'
      }, {
        'label': '20(240期)',
        'value': '20'
      }, {
        'label': '25(300期)',
        'value': '356'
      }, {
        'label': '30(360期)',
        'value': '30'
      }
    ];
    const rateList = [
      {
        'label': '最新基准利率7折(3.43%)',
        'value': '3.43'
      }, {
        'label': '基准利率7.5折(3.675%)',
        'value': '3.675'
      }, {
        'label': '基准利率8折(3.92%)',
        'value': '3.92'
      }, {
        'label': '基准利率8.5折(4.165%)',
        'value': '4.165'
      }, {
        'label': '基准利率9折(4.41%)',
        'value': '4.41'
      }, {
        'label': '基准利率9.5折(4.655%)',
        'value': '4.655'
      }, {
        'label': '最新基准利率(4.90%)',
        'value': '4.9'
      }, {
        'label': '基准利率1.1倍(5.39%)',
        'value': '5.39'
      }, {
        'label': '基准利率1.2倍(5.88%)',
        'value': '5.88'
      }, {
        'label': '基准利率1.3倍(6.37%)',
        'value': '6.37'
      }
    ];
    return (
      <div ref={node => this.node = node} style={{paddingBottom:'20px',width:'100%'}} id="pageBox2">      
        <div style={{position:'relative',height:'0',marginTop:'15px',overflow:'hidden'}} ref="echartbox2">
          <div id="main2" style={{height:'100px', width:'100px'}}></div>          
          <div className="main-value">
            <span>{Math.round((result2.rate/result2.allMoney)*100) || 0} % </span> <br/>
            <span>{Math.round((result2.total/result2.allMoney)*100) || 0} % </span>
          </div>
          <div className="desc1">
            <p><span>贷款总额</span></p>
            <p><span>还贷月数</span></p>
            <p><span>月还款(元)</span></p>
            <p><span>支付利息</span></p>
            <p><span>本息总和</span></p>
          </div>
          <div className="desc2">
            <p><span>{result2.total || 0}万元</span></p>
            <p><span>{result2.mounth || 0}月</span></p>
            <p ref="p1" style={{display:'block'}}><span>{result2.mounthMoney || 0}</span></p>
            <p ref="p2" style={{display:'none'}}><span>首月{result2.mounthMoney || 0}，月减 {result2.mounthLess || 0}</span></p>
            <p><span>{result2.rate || 0}万元</span></p>
            <p><span>{result2.allMoney || 0}万元</span></p>
          </div>
      </div>
      <List.Item>
        <Badge text=" " style={{ marginLeft: 12, height:'14px', padding: '0 7px', backgroundColor: '#c23531', borderRadius: 0 }} /><span className="badgeTitle">贷款本金</span>
        <Badge text=" " style={{ marginLeft: 12, height:'14px', padding: '0 7px', backgroundColor: '#2f4554', borderRadius: 0 }} /><span className="badgeTitle">贷款利息</span>
      </List.Item>
      <WhiteSpace />
      <List renderHeader={() => '还款方式'} className="radiobox">
        {payMethods2.map(i => (
          <RadioItem key={i.value} checked={value === i.value} onChange={() => this.changepayMethods2(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>
      <WhiteSpace />
      <List>
        <InputItem
          {...getFieldProps('loanAmount', {
            normalize: (v, prev) => {
              if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                if (v === '.') {
                  return '0.';
                }
                return prev;
              }
              return v;
            },
          })}
          type={InputItemType}
          extra="万元"
          placeholder="请输入"
          ref={el => this.customFocusInst = el}
          clear
        >贷款金额</InputItem>
      </List>
      <List>
        <Picker data={loanTermList} cols={1} {...getFieldProps('loanTerm',{initialValue:loanTerm})}  className="forss">
            <List.Item arrow="horizontal">贷款年限</List.Item>
        </Picker>
      </List>
      <List>
        <Picker data={rateList} cols={1} {...getFieldProps('yearRate',{initialValue:yearRate})} className="forss" onChange={this.ChangeYearRate}>
            <List.Item arrow="horizontal">年利率</List.Item>
        </Picker>
      </List>
      <List>
        <InputItem
          {...getFieldProps('fundRate',{initialValue:fundRate}, {
            normalize: (v, prev) => {
              if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                if (v === '.') {
                  return '0.';
                }
                return prev;
              }
              return v;
            },
          })}
          type={InputItemType}
          extra="%"
          placeholder="请输入"
          ref={el => this.customFocusInst = el}
          clear
          disabled
        >商业年利率</InputItem>
      </List>
      <WhiteSpace />
      <List renderHeader={() => '计算商业贷款选择等额本金和等额本息的还款方式时，每月的月供、利息总额和还款总额。商业贷款可以用来买住宅、商住。'} style={{padding:'0 15px'}}>
          <Button type="primary" onClick={this.submit1}>开始计算</Button>
      </List>
      </div>
    );
  }
}
const Tab2Form = createForm()(tab2FormClass);
export {Tab2Form};
