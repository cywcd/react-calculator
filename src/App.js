import React, { Component } from 'react';
import './App.css';
import { Tabs, Badge } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Tab1Form } from './tab1.js';
import { Tab2Form } from './tab2.js';
import { Tab3Form } from './tab3.js';
const tabs = [
  { title: <Badge>公积金贷款</Badge> },
  { title: <Badge>商业贷款</Badge> },
  { title: <Badge>组合贷款</Badge> },
];

class App extends Component {
	constructor(props) {
	 super(props);
	 this.state = { 
      currentIndex : 0
    }
	 
	}
  render() {
    return (
      <div className="App">
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { 
          	console.log('onChange', index, tab);
          }}
          onTabClick={(tab, index) => { 
          	console.log('onTabClick', index, tab);          
          	this.setState({ currentIndex : index })
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
            <Tab1Form style={{display:'none'}} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
            <Tab2Form style={{display:'none'}} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
            <Tab3Form style={{display:'none'}} />
          </div>
        </Tabs>
      </div>
    );
  }
}


export default App;
