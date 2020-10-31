import React, { useState } from "react";
// pick a date util library
import MomentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
var locale = require('moment/locale/zh-cn');
function App() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} 
        format="YYYY-MM-DD" />
    </MuiPickersUtilsProvider>
  );
}
export default App