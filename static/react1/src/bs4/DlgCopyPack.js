import React from 'react';
import { Modal, Button,Spinner } from 'react-bootstrap';
import Client from './Client';
import Autosuggest from 'react-autosuggest';
class DlgCopyPack extends React.Component {
  state = {
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    stopped: true,
  };
  newnameChange = event => {
    this.setState({ newname: event.target.value });
  };
  copy_pack = () => {
    console.log(this.src_id + ' ' + this.state.newname);
    var self = this;
    var data1 = new FormData();
    this.setState({ stopped: false });
    data1.append('oldid', this.src_id);
    data1.append('newname', this.state.newname);
    Client.postForm('/rest/copypack/', data1, result => {
      self.setState({ error: result.message });
      this.setState({ stopped: true });
    });
  };
  onSuggestionsClearRequested = () => {};
  auto_change = data => {
    var value = data.value;
    console.log('auto_change');
    if (value.length > 1) {
      Client.get('/rest/Pack', { search: value }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    }
  };
  auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    this.src_id = data.suggestion.id;
    //this.setState({ auto_items: [ item ] })
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({
      showModal: true,
      stopped: true,
      error: '',
      auto_value: '',
      newname: '',
    });
    this.src_id = null;
  };
  onChange = (event, { newValue }) => {
    console.log(newValue);
    this.setState({ auto_value: newValue });
  };
  render = () => {
    let showbutton,spin;
    if (this.state.stopped) {
      showbutton = 'block';
      spin=null;
    } else {
      spin=<Spinner animation="border" variant="primary"/>;
      showbutton = 'none';
    }
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>复制包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>包名称:</label>
                </td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'states-autocomplete',
                      value: this.state.auto_value,
                      onChange: this.onChange,
                    }}
                    onSuggestionSelected={this.auto_select}
                    onSuggestionsFetchRequested={this.auto_change}
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={item => item.name}
                    ref="autocomplete"
                    suggestions={this.state.auto_items}
                    renderSuggestion={item => <span>{item.name}</span>}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>新包名称:</label>
                </td>
                <td>
                  <input
                    id="nameto"
                    type="text"
                    onChange={this.newnameChange}
                    size="15"
                    value={this.state.newname}
                    maxLength="30"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Button
                      variant="secondary"
                      style={{ display: showbutton }}
                      onClick={this.copy_pack}
                    >
                      复制
                    </Button>
                    {spin}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p>{this.state.error}</p>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgCopyPack;
