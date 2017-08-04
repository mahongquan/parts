
import React from 'react';
import Client from './Client';

//const MATCHING_ITEM_LIMIT = 25;

class Contacts extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: '',
  };
  componentDidMount=()=> {
      Client.contacts("", (foods) => {
        this.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        foods: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (foods) => {
        this.setState({
          foods: foods.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: 'hidden' };

    const foodRows = foods.map((food, idx) => (
      <tr
        key={idx}
        onClick={() => this.props.onFoodClick(food)}
      >
        <td>{food.yiqibh}</td>
        <td className='right aligned'>{food.hetongbh}</td>
        <td className='right aligned'>{food.yonghu}</td>
        <td className='right aligned'>{food.addr}</td>
        <td className='right aligned'>{food.yiqixinghao}</td>
      </tr>
    ));

    return (
      <div id='food-search'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='5'>
                <div className='ui fluid search'>
                  <div className='ui icon input'>
                    <input
                      className='prompt'
                      type='text'
                      placeholder='Search yiqi...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className='search icon' />
                  </div>
                  <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>仪器编号</th>
              <th>合同编号</th>
              <th>用户单位</th>
              <th>客户地址</th>
              <th>仪器型号</th>
            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contacts;
