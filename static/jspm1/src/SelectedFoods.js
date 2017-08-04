import React from 'react';

export default function SelectedFoods(props) {
  const { foods } = props;

  const foodRows = foods.map((food, idx) => (
    <tr
      key={idx}
      onClick={() => props.onFoodClick(idx)}
    >
      <td>{food.yiqibh}</td>
        <td className='right aligned'>{food.hetongbh}</td>
        <td className='right aligned'>{food.yonghu}</td>
        <td className='right aligned'>{food.addr}</td>
        <td className='right aligned'>{food.yiqixinghao}</td>
    </tr>
  ));

  return (
    <table className='ui selectable structured large table'>
      <thead>
        <tr>
          <th colSpan='5'>
            <h3>选择的仪器</h3>
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
      <tfoot>
        <tr>
          <th>Total</th>
          <th
            className='right aligned'
            id='total-kcal'
          >
            {foods.length}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

// function sum(foods, prop) {
//   return foods.reduce((memo, food) => (
//     parseInt(food[prop], 10) + memo
//   ), 0.0).toFixed(2);
// }
