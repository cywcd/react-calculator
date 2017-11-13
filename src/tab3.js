import React from 'react';
import { List, InputItem, WhiteSpace,  Radio, Badge, Picker, Toast, Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
import echarts from 'echarts';
//import $ from 'webpack-zepto'

let result3 = {
	  totalAll: '', // 贷款总额
	  mounth: '', //还款月数
	  mounthMoneyAll: '', // 月还款
	  rateAll: '', // 还款利息
	  allMoneyAll: '',// 本息总额
	  mounthLessAll: ''
	};
let form3 = {
	  repayment: '等额本息', // 还款方式
	  totalGjj: '', // 公基金贷款金额
	  totalSy: '', // 商业贷款
	  year: '20', // 贷款年限
	  yearRateGjj: '3.25', // 公基金年利率
	  yearRateSy: '4.9', // 商业年利率
	  fundRateGjj: '3.25',
	  fundRateSy: '4.9'
};
const payMethods2 = [
      { value: 0, label: '等额本息' },
      { value: 1, label: '等额本金' },
    ];
    
class tab3FormClass extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  };
  scrollBackTop = (e) =>{
  	//this.node.scrollIntoView();
  	//document.getElementById('pageBox3').scrollIntoView(true);
  	document.getElementById('pageBox3').scrollTop = 0;
  };
  handleClick = () => {
    this.customFocusInst.focus();
  };
  ChangeYearRateGjj = (value) => {  	
  	this.setState({
	      value,
	      yearRateGjj:value,
	      fundRateGjj:value[0]
	  });
  };
  ChangeYearRateSy = (value) => {  	
  	this.setState({
	      value,
	      yearRateSy:value,
	      fundRateSy:value[0]
	  });
  };
  changepayMethods2 = (value) => {
    console.log('checkbox cheked:'+value);
    form3.repayment = value;
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
    yearRateGjj:['3.25'],
    yearRateSy:['4.90'],
    fundRateGjj: '3.25',
    fundRateSy: '4.90'
  };
	
  // 第三页执行计算
  submit1 = (e) => {
	  	e.preventDefault();
	  	this.props.form.validateFields((err, values) => {
	    form3.repayment = this.state.value;
	    form3.totalGjj = values.totalGjj;
	    form3.totalSy = values.totalSy;
	    form3.year = values.loanTerm;
	    form3.yearRateGjj = values.yearRateGjj;
	    form3.fundRateGjj = (values.yearRateGjj)[0];
	    form3.fundRateSy = values.fundRateSy;
	    form3.fundRateSy = (values.fundRateSy)[0];
	    console.log(form3.repayment,'-----form3.repayment')
	    console.log(values,'-------values')
	    this.setState({
	      form3,
	      
	    });
	    if (!values.totalGjj) {
	      Toast.info('请输入公积金贷款金额', 1);
	      return
	    }
	    if (!values.totalSy) {
	      Toast.info('请输入公积金贷款金额', 1);
	      return
	    }
	    if (!values.loanTerm) {
	      Toast.info('请选择贷款年限', 1);
	      return
	    }
	    if (!values.yearRateGjj) {
	      Toast.info('请选择年利率', 1);
	      return
	    }
	    if (!values.fundRateGjj) {
	      Toast.info('请输入公积金利率', 1);
	      return
	    } 
	    
	    //  this.$indicator.open('计算中');
	    (form3.totalGjj) ? form3.totalGjj = Number(form3.totalGjj): form3.totalGjj = 0;
	    (form3.totalSy) ? form3.totalSy = Number(form3.totalSy): form3.totalSy = 0;
	    (form3.year) ? form3.year = Number(form3.year) : form3.year = 0;
	    (form3.yearRateGjj) ? form3.yearRateGjj = Number(form3.yearRateGjj) : form3.yearRateGjj = 0;
	    (form3.yearRateSy) ? form3.yearRateSy = Number(form3.yearRateSy) : form3.yearRateSy = 0;
	    let yearRateGjj = form3.yearRateGjj / 100
	    let yearRateSy = form3.yearRateSy / 100
	    if (form3.repayment === '等额本金') {
	      result3.totalAll = (form3.totalGjj + form3.totalSy).toFixed(2)
	      result3.mounth = (form3.year * 12);
	      let mounthMoeyGjj = (form3.totalGjj*10000 * yearRateGjj / 12 + form3.totalGjj*10000 / result3.mounth);
	      let mounthLessGjj = ((form3.totalGjj*10000 * yearRateGjj / 12 + form3.totalGjj*10000 / result3.mounth) -((form3.totalGjj*10000 / result3.mounth) + (form3.totalGjj*10000 - form3.totalGjj*10000 / result3.mounth) * (yearRateGjj / 12)));
	      let mounthMoeySy = (form3.totalSy*10000 * yearRateSy / 12 + form3.totalSy*10000 / result3.mounth);
	      let mounthLessSy = ((form3.totalSy*10000 * yearRateSy / 12 + form3.totalSy*10000 / result3.mounth) -((form3.totalSy*10000 / result3.mounth) + (form3.totalSy*10000 - form3.totalSy*10000 / result3.mounth) * (yearRateSy / 12)));
	      result3.mounthMoneyAll = (mounthMoeyGjj + mounthMoeySy).toFixed(2);
	      result3.mounthLessAll = (mounthLessGjj + mounthLessSy).toFixed(2);
	      let rateGjj = ((form3.year * 12 + 1) * form3.totalGjj * (yearRateGjj / 12) / 2)
	      let rateSy = ((form3.year * 12 + 1) * form3.totalSy * (yearRateSy / 12) / 2)
	      result3.rateAll = (rateGjj + rateSy).toFixed(2);
	      result3.allMoneyAll = (rateGjj + rateSy + form3.totalGjj + form3.totalSy).toFixed(2);
	    } else {
	      result3.mounthLessAll = ''
	      result3.totalAll = (form3.totalGjj + form3.totalSy).toFixed(2)
	      result3.mounth = (form3.year * 12);
	      let mounthMoeyGjj = ((Number(form3.totalGjj) * (yearRateGjj / 12 ) * Math.pow((1 + yearRateGjj / 12), (form3.year * 12)) / (Math.pow((1 + yearRateGjj / 12), (form3.year * 12)) -1) * 10000));
	      let mounthMoeySy = ((Number(form3.totalSy) * (yearRateSy / 12 ) * Math.pow((1 + yearRateSy / 12), (form3.year * 12)) / (Math.pow((1 + yearRateSy / 12), (form3.year * 12)) -1) * 10000));
	      result3.mounthMoneyAll = ((mounthMoeyGjj + mounthMoeySy)).toFixed(2);
	      result3.rateAll = ((Number(result3.mounthMoneyAll) * (form3.year * 12) - Number(result3.totalAll)*10000)/10000).toFixed(2);
	      result3.allMoneyAll = ((mounthMoeyGjj + mounthMoeySy) * (form3.year * 12)/10000).toFixed(2);
	    }
	    this.refs.echartbox3.style.height = '120px'
	    this.initEchar('main3',[Number(result3.totalAll), Number(result3.rateAll)])
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
    let {InputItemType,value,loanTerm,yearRateGjj,fundRateGjj,yearRateSy,fundRateSy} = this.state;
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
    const rateList1 = [
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
        'value': '4.90'
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
    const rateList2 = [
      {
        'label': '最新基准利率(3.25%)',
        'value': '3.25'
      }, {
        'label': '基准利率1.1倍(3.575%)',
        'value': '3.575'
      }, {
        'label': '基准利率1.2倍(3.90%)',
        'value': '3.9'
      }, {
        'label': '基准利率1.3倍(4.225%)',
        'value': '4.225'
      }
    ];
    return (
      <div ref={node => this.node = node} style={{paddingBottom:'20px',width:'100%'}} id="pageBox3">      
        <div style={{position:'relative',height:'0',marginTop:'15px',overflow:'hidden'}} ref="echartbox3">
          <div id="main3" style={{height:'100px', width:'100px'}}></div>          
          <div className="main-value">
            <span>{Math.round((result3.rateAll/result3.allMoneyAll)*100) || 0} % </span> <br/>
            <span>{Math.round((result3.totalAll/result3.allMoneyAll)*100) || 0} % </span>
          </div>
          <div className="desc1">
            <p><span>贷款总额</span></p>
            <p><span>还贷月数</span></p>
            <p><span>月还款(元)</span></p>
            <p><span>支付利息</span></p>
            <p><span>本息总和</span></p>
          </div>
          <div className="desc2">
          	<p><span>{result3.totalAll}万元</span></p>
            <p><span>{result3.mounth}月</span></p>
            <p><span ref="p1" style={{display:'block'}}>{result3.mounthMoneyAll}</span></p>
            <p><span ref="p2" style={{display:'none'}}> 首月{result3.mounthMoneyAll || 0}，月减 {result3.mounthLessAll}</span></p>            
            <p><span>{result3.rateAll}万元</span></p>
            <p><span>{result3.allMoneyAll}万元</span></p>
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
          {...getFieldProps('totalGjj', {
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
        >公积金贷款金额</InputItem>
      </List>
      <List>
        <InputItem
          {...getFieldProps('totalSy', {
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
        >商业贷款金额</InputItem>
      </List>
      <List>
        <Picker data={loanTermList} cols={1} {...getFieldProps('loanTerm',{initialValue:loanTerm})}  className="forss">
            <List.Item arrow="horizontal">贷款年限</List.Item>
        </Picker>
      </List>
      <List>
        <Picker data={rateList1} cols={1} {...getFieldProps('yearRateSy',{initialValue:yearRateSy})} className="forss" onChange={this.ChangeYearRateGjj}>
            <List.Item arrow="horizontal">商业年利率</List.Item>
        </Picker>
      </List>
      <List>
        <Picker data={rateList2} cols={1} {...getFieldProps('yearRateGjj',{initialValue:yearRateGjj})} className="forss" onChange={this.ChangeYearRateSy}>
            <List.Item arrow="horizontal">公积金年利率</List.Item>
        </Picker>
      </List>
      <List>
        <InputItem
          {...getFieldProps('fundRateGjj',{initialValue:fundRateSy}, {
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
      <List>
        <InputItem
          {...getFieldProps('fundRateSy',{initialValue:fundRateGjj}, {
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
        >公积金年利率</InputItem>
      </List>
      <WhiteSpace />
      <List renderHeader={() => '在组合贷款中，公积金贷款额度和商业贷款额度是分开计算的，公积金贷款政策计算出来的最高贷款额度，再加上银行商业贷款政策计算出来的最高贷款额度就为组合贷款的最高可贷额度。'} style={{padding:'0 15px'}}>
          <Button type="primary" onClick={this.submit1}>开始计算</Button>
      </List>
      </div>
    );
  }
}
const Tab3Form = createForm()(tab3FormClass);
export {Tab3Form};
