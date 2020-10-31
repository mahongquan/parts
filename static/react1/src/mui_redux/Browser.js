import React from 'react';
import './react-contextmenu.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from './contextmenu2';
import Client from './Client';
//var createReactClass = require('create-react-class');

function buildGetChildrenUrl(path) {
  return '/fs/children?path=' + path;
}

function buildGetParentUrl(path) {
  return '/fs/parent?path=' + path;
}

function buildRenameUrl(path, name) {
  return '/fs/rename2?path=' + path + '&name=' + name;
}

function buildRemoveUrl(path) {
  return '/fs/remove?path=' + path;
}
function buildGetContentUrl(path) {
  return '/media/' + path;
}

function buildUploadUrl(path, name) {
  return '/fs/upload?path=' + path + '&name=' + name;
}

function buildMkdirUrl(path, name) {
  return '/fs/mkdir?path=' + path + '&name=' + name;
}

function getParent(path, onSuccess) {
  Client.getRaw(buildGetParentUrl(path), onSuccess);
}

class File extends React.Component {
  glyphClass = () => {
    var className = 'glyphicon ';
    className += this.props.isdir ? 'glyphicon-folder-open' : 'glyphicon-file';
    return className;
  };

  remove = () => {
    Client.getRaw(buildRemoveUrl(this.props.path), () => {
      this.props.browser.reloadFilesFromServer();
    });
  };

  rename = updatedName => {
    Client.getRaw(buildRenameUrl(this.props.path, updatedName), () => {
      this.props.browser.reloadFilesFromServer();
    });
  };

  onRemove = (e, data) => {
    console.log('onRemove');
    var type = this.props.isdir ? 'folder' : 'file';
    var remove = window.confirm(
      'Remove ' + type + " '" + this.props.path + "' ?"
    );
    if (remove) this.remove();
  };

  onRename = (e, data) => {
    console.log('onRename');
    var type = this.props.isdir ? 'folder' : 'file';
    var updatedName = prompt(
      'Enter new name for ' + type + ' ' + this.props.name
    );
    if (updatedName != null) this.rename(updatedName);
  };

  renderList = () => {
    var dateString = new Date(this.props.time * 1000).toLocaleString(); //toGMTString()
    var glyphClass = this.glyphClass();
    return (
      <tr id={this.props.id} ref={this.props.path}>
        <td>
          <ContextMenuTrigger id={'' + this.props.id}>
            <button onClick={this.props.onClick}>
              <span
                style={{ fontSize: '1.5em', paddingRight: '10px' }}
                className={glyphClass}
              />
              {this.props.name}
            </button>
          </ContextMenuTrigger>
          <ContextMenu id={'' + this.props.id}>
            <MenuItem data={{ a: 1 }} onClick={this.onRemove}>
              删除
            </MenuItem>
            <MenuItem data={{ a: 2 }} onClick={this.onRename}>
              重命名
            </MenuItem>
          </ContextMenu>
        </td>
        <td>{File.sizeString(this.props.size)}</td>
        <td>{dateString}</td>
      </tr>
    );
  };
  renderGrid = () => {
    var glyphClass = this.glyphClass();
    return (
      <div ref={this.props.path}>
        <ContextMenuTrigger id={'' + this.props.id}>
          <button id={this.props.id} onClick={this.props.onClick}>
            <span style={{ fontSize: '3.5em' }} className={glyphClass} />
          </button>
        </ContextMenuTrigger>
        <ContextMenu id={'' + this.props.id}>
          <MenuItem data={{ a: 1 }} onClick={this.onRemove}>
            remove
          </MenuItem>
          <MenuItem data={{ a: 2 }} onClick={this.onRename}>
            rename
          </MenuItem>
        </ContextMenu>

        <h4>{this.props.name}</h4>
      </div>
    );
  };

  render = () => {
    return this.props.gridView ? this.renderGrid() : this.renderList();
  };
  static id = () => {
    return (Math.pow(2, 31) * Math.random()) | 0;
  };

  static timeSort = (left, right) => {
    return left.time - right.time;
  };

  static sizeSort = (left, right) => {
    return left.size - right.size;
  };

  static pathSort = (left, right) => {
    return left.path.localeCompare(right.path);
  };

  static sizes = [
    { count: 1, unit: 'bytes' },
    { count: 1024, unit: 'kB' },
    { count: 1048576, unit: 'MB' },
    { count: 1073741824, unit: 'GB' },
  ];

  static sizeString = sizeBytes => {
    var iUnit = 0;
    var count = 0;
    for (iUnit = 0; iUnit < File.sizes.length; iUnit++) {
      count = sizeBytes / File.sizes[iUnit].count;
      if (count < 1024) break;
    }
    return '' + (count | 0) + ' ' + File.sizes[iUnit].unit;
  };
}
class Browser extends React.Component {
  state = {
    paths: ['.'],
    files: [],
    sort: File.pathSort,
    gridView: false,
    current_path: '',
    displayUpload: 'none',
  };

  loadFilesFromServer = path => {
    var self = this;
    Client.getRaw(buildGetChildrenUrl(path), data => {
      var files = data.children.sort(self.state.sort);
      var paths = self.state.paths;
      if (paths[paths.length - 1] !== path) paths = paths.concat([path]);
      self.setState({
        files: files,
        paths: paths,
        sort: self.state.sort,
        gridView: self.state.gridView,
      });
      self.updateNavbarPath(self.currentPath());
    });
  };
  updateNavbarPath = path => {
    // var elem  = document.getElementById("pathSpan");
    // elem.innerHTML = '<span class="glyphicon glyphicon-chevron-right"/>' +path;
    this.setState({ current_path: path });
  };
  reloadFilesFromServer = () => {
    this.loadFilesFromServer(this.currentPath());
  };

  currentPath = () => {
    return this.state.paths[this.state.paths.length - 1];
  };

  onBack = () => {
    if (this.state.paths.length < 2) {
      alert('Cannot go back from ' + this.currentPath());
      return;
    }
    var paths2 = this.state.paths.slice(0, -1);
    this.setState({ paths: paths2 });
    this.loadFilesFromServer(paths2[paths2.length - 1]);
  };

  onUpload = () => {
    this.setState({ displayUpload: '' });
  };

  onParent = () => {
    var onSuccess = function(data) {
      var parentPath = data.path;
      this.updatePath(parentPath);
    }.bind(this);
    getParent(this.currentPath(), onSuccess);
  };

  alternateView = () => {
    var updatedView = !this.state.gridView;

    this.setState({
      gridView: updatedView,
    });
  };

  uploadFile = () => {
    return function(evt) {
      var path = this.currentPath();
      var readFile = evt.target.files[0];
      var name = readFile.name;
      console.log(readFile);

      var formData = new FormData();
      formData.append('file', readFile, name);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', buildUploadUrl(path, name), true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status === 200) {
          alert('Successfully uploaded file ' + name + ' to ' + path);
          this.reloadFilesFromServer();
        } else; // console.log(request.status);
      }.bind(this);
      xhr.send(formData);
    }.bind(this);
  };

  componentDidMount = () => {
    console.log('mount======');
    console.log(this.props.initpath);
    if (this.props.initpath) this.state.paths.push(this.props.initpath);
    var path = this.currentPath();
    this.loadFilesFromServer(path);
  };

  updateSort = sort => {
    var files = this.state.files;
    var lastSort = this.state.sort;
    if (lastSort === sort) files = files.reverse();
    else files = files.sort(sort);

    this.setState({
      files: files,
      sort: sort,
      paths: this.state.paths,
      gridView: this.state.gridView,
    });
  };

  timeSort = () => {
    this.updateSort(File.timeSort);
  };
  pathSort = () => {
    this.updateSort(File.pathSort);
  };
  sizeSort = () => {
    this.updateSort(File.sizeSort);
  };
  updatePath = path => {
    this.loadFilesFromServer(path);
  };
  getContent = path => {
    console.log('getContent');
    var url = buildGetContentUrl(path);
    console.log(url);
    window.open(url, url, 'height=800,width=800,resizable=yes,scrollbars=yes');
  };

  mkdir = () => {
    var newFolderName = prompt('Enter new folder name');
    if (newFolderName == null) return;
    Client.getRaw(
      buildMkdirUrl(this.currentPath(), newFolderName),
      this.reloadFilesFromServer
    );
  };
  onClick = f => {
    console.log('onClick');
    console.log(f);
    if (f.isdir) {
      this.updatePath(f.path);
    } else {
      this.getContent(f.path);
    }
  };
  mapfunc = (f, idx) => {
    var id = File.id(f.name);
    return (
      <File
        key={idx}
        id={id}
        gridView={this.state.gridView}
        onClick={() => this.onClick(f)}
        path={f.path}
        name={f.name}
        isdir={f.isdir}
        size={f.size}
        time={f.time}
        browser={this}
      />
    );
  };
  render = () => {
    const files = this.state.files.map(this.mapfunc);

    var gridGlyph = 'glyphicon glyphicon-th-large';
    var listGlyph = 'glyphicon glyphicon-list';
    var className = this.state.gridView ? listGlyph : gridGlyph;
    var toolbar = (
      <div>
        <nav className="navbar navbar-inverse ">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#example-navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div
            className="collapse navbar-collapse"
            id="example-navbar-collapse"
          >
            <ul className="nav navbar-nav">
              <li id="backButton">
                <button onClick={this.onBack}>
                  <span className="glyphicon glyphicon-arrow-left" />
                </button>
              </li>
              <li id="parentButton">
                <button onClick={this.onParent}>
                  <span className="glyphicon glyphicon-arrow-up" />
                </button>
              </li>
              <li id="uploadButton">
                <button onClick={this.onUpload}>
                  <span className="glyphicon glyphicon-upload" />
                </button>
              </li>
              <li id="mkdirButton">
                <button onClick={this.mkdir}>
                  <span className="glyphicon glyphicon-folder-open" />
                </button>
              </li>
              <li id="alternateViewButton">
                <button onClick={this.alternateView}>
                  <span ref="altViewSpan" className={className} />
                </button>
              </li>
              <li>
                <button id="pathSpan">
                  <span className="glyphicon glyphicon-chevron-right" />
                  {this.state.current_path}
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <input
          type="file"
          id="uploadInput"
          onChange={this.uploadFile()}
          style={{ display: this.state.displayUpload }}
        />
      </div>
    );
    if (this.state.gridView) {
      var files2 = [];
      var row = [];
      var ncols = 3;
      for (var i in files) {
        if (i % ncols === 0) {
          if (row.length > 0) {
            files2.push(row);
            row = [];
            row.push(files[i]);
          } else {
            row.push(files[i]);
          }
        } else {
          row.push(files[i]);
        }
      }
      if (row.length > 0) {
        files2.push(row);
      }
      var files2_t = [];
      for (i in files2) {
        var cols = [];
        for (var j in files2[i]) {
          cols.push(<td key={j}>{files2[i][j]}</td>);
        }
        row = <tr key={i}>{cols}</tr>;
        files2_t.push(row);
      }
      return (
        <div>
          {toolbar}
          <table>
            <tbody>{files2_t}</tbody>
          </table>
        </div>
      );
    } else {
      var sortGlyph = 'glyphicon glyphicon-sort';
      return (
        <div>
          {toolbar}
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <button onClick={this.pathSort} className="btn btn-default">
                    <span className={sortGlyph} />
                    名称
                  </button>
                </th>
                <th>
                  <button onClick={this.sizeSort} className="btn btn-default">
                    <span className={sortGlyph} />
                    大小
                  </button>
                </th>
                <th>
                  <button onClick={this.timeSort} className="btn btn-default">
                    <span className={sortGlyph} />
                    修改日期
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>{files}</tbody>
          </table>
        </div>
      );
    }
  };
}

export default Browser;
