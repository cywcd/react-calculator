import React from 'react';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
class inputNumberClass extends React.Component {
  state = {
    type: 'money',
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('money2', {
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
            type={type}
            placeholder="money format"
            ref={el => this.customFocusInst = el}
            clear
          >数字键盘</InputItem>
        </List>
      </div>
    );
  }
}

export const InputNumber = createForm()(inputNumberClass);
