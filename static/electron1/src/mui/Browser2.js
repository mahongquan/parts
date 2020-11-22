import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import ViewListIcon from '@material-ui/icons/ViewList';
import Client from './Client';
import DlgInput from './DlgInput'
import DlgOkCancel from './DlgOkCancel'
// window.icons=require("@material-ui/icons");
class File extends React.Component {
  renderList = () => {
    var dateString = new Date(this.props.time).toLocaleString(); //toGMTString()
    //var glyphClass = this.glyphClass();
    let style1;
    if (this.props.isdir) {
      console.log('isdir');
      style1 = { backgroundColor: '#cc0' };
    } else {
      style1 = {};
    }
    return (
      <tr id={this.props.id} ref={this.props.path}>
        <td>
          <button
            style={style1}
            onContextMenu={this.props.handleContextMenu}
            onClick={this.props.onClick}
          >
            {this.props.name}
          </button>
        </td>
        <td>{File.sizeString(this.props.size, this.props.isdir)}</td>
        <td>{dateString}</td>
      </tr>
    );
  };
  renderGrid = () => {
    //var glyphClass = this.glyphClass();
    let style1;
    if (this.props.isdir) {
      style1 = {
        display: 'inline-block',
        marginRight: '10px',
        marginLeft: '10px',
        backgroundColor: '#cc0',
      };
    } else {
      style1 = {
        display: 'inline-block',
        marginRight: '10px',
        marginLeft: '10px',
      };
    }
    return (
      <button
        style={style1}
        onContextMenu={this.props.handleContextMenu}
        onClick={this.props.onClick}
      >
        {this.props.name}
      </button>
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

  static sizeString = (sizeBytes, isdir) => {
    if (isdir) {
      return null;
    }
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
  channels_change = (event, value) => {
    console.log('auto_change');
    //this.setState({ yiqixinghao_value:value, auto_loading: false });
    this.channels_select(null, value);
  };
  channels_input = event => {
    console.log(event);
    //this.setState({ yiqixinghao_value:value, auto_loading: false });
    this.channels_select(null, event);
  };
  channels_select = (value, item) => {
    console.log('selected');
    this.setState({ channels: item });
  };
  matchStateToTerm = (state, value) => {
    return state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  };
  state = {
    channels: '',
    isroot: true,
    paths: ['.'],
    files: [],
    sort: File.pathSort,
    gridView: true,
    current_path: '.',
    displayUpload: false,
    // showcontext: false,
    // target: null,
    pathIdx: null,
    anchorEl: null,
    show_input:false,
    prompt:"enter new filename",
    input_value:"",
    show_ok_cancel:false,
  };
  handleContextMenu = event => {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    // this.setState({ target: event.target, showcontext: true });
    this.setState({ anchorEl: event.target });
    // setTimeout(() => {
    //   this.setState({ showcontext: false });
    // }, 5000);
  };
  loadFilesFromServer = path => {
    if (path === '.' || path === './') {
      this.setState({ isroot: true });
    } else {
      this.setState({ isroot: false });
    }
    Client.get(
      '/fs/children',
      { path: path },
      data => {
        var files = data.children.sort(this.state.sort);
        var paths = this.state.paths;
        if (paths[paths.length - 1] !== path) paths = paths.concat([path]);
        this.setState(
          {
            files: files,
            paths: paths,
            sort: this.state.sort,
            gridView: this.state.gridView,
            showcontext: false,
          },
          () => {
            this.updateNavbarPath(this.currentPath());
          }
        );
      },
      null
    );
  };
  updateNavbarPath = path => {
    // console.log("updateNavbarPath");
    // console.log(path);
    this.setState({ current_path: path });
  };
  reloadFilesFromServer = () => {
    this.loadFilesFromServer(this.currentPath());
  };

  currentPath = () => {
    if (this.state.paths.length > 0)
      return this.state.paths[this.state.paths.length - 1];
    else return '.';
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
    // console.log("onParent");
    var thepath = this.currentPath();
    if (thepath === '.') {
      alert('. 已经是根目录!');
    } else {
      var data = { path: thepath };
      // console.log(data);
      Client.get(
        '/fs/parent',
        data,
        res => {
          if (res.isroot) {
            alert('已经是根目录!');
          } else {
            var parentPath = res.path;
            this.updatePath(parentPath);
          }
        },
        null
      );
    }
  };

  alternateView = () => {
    var updatedView = !this.state.gridView;

    this.setState({
      gridView: updatedView,
      showcontext: false,
    });
  };
  uploadFile = evt => {
    console.log(evt);
    var path = this.currentPath();
    const file = evt.target.files[0];
    console.log(file);
    var data1 = new FormData();
    data1.append('path', path);
    data1.append('file', file);
    data1.append('name', file.name);
    //console.log(data1)
    Client.postForm('/fs/upload', data1, res => {
      console.log(res);
      this.setState({ displayUpload: false });
      this.reloadFilesFromServer();
    });

    // var stream = ss.createStream();
    // // upload a file to the server.
    // ss(socket).emit(
    //   'upload',
    //   stream,
    //   { path: path, name: file.name, size: file.size },
    //   res => {
    //     console.log(res);
    //     this.reloadFilesFromServer();
    //     this.setState({ displayUpload: 'none' });
    //   }
    // );
    // ss.createBlobReadStream(file).pipe(stream);
  };
  componentDidMount = () => {
    // socket.on("connect_error",()=>{
    //   this.setState({connect_error:true});
    // })
    // socket.on("connect",()=>{
    //   this.setState({connect_error:false});
    // })
    // console.log("mount======");
    // console.log(this.props.initpath);
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
    // console.log("content");
    // console.log(path);
    window.open('/static/' + path);
    // this.props.onFileClick(path);
  };
  mkdir = () => {
    var newFolderName = prompt('Enter new folder name');
    if (newFolderName == null) return;
    Client.get(
      '/fs/mkdir',
      { path: this.currentPath(), name: newFolderName },
      this.reloadFilesFromServer,
      null
    );
  };
  onClick = f => {
    // console.log("onClick");
    // console.log(f);
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
        handleContextMenu={this.handleContextMenu}
        path={f.path}
        name={f.name}
        isdir={f.isdir}
        size={f.size}
        time={f.time}
        browser={this}
      />
    );
  };
  onChange = newValue => {
    //console.log('change',newValue);
    this.setState({
      filecontent: newValue,
      filechange: true,
    });
  };
  genpath = path => {
    // console.log("genpath=============")
    // console.log(path);
    var paths = path.split('/');
    //if (paths.length==1) return null;
    // console.log(paths);
    var r = [];
    var i = 0;
    while (i < paths.length) {
      var s = '';
      for (var j = 0; j < i + 1; j++) {
        s += paths[j];
        if (j < i) s += '/';
      }
      //console.log(paths[i])
      //console.log(s)
      r.push([s, paths[i]]);
      i++;
    }
    r.pop();
    // if(r.length===0){
    //     this.isroot=true;
    // }
    // else{
    //     this.isroot=false;
    // }
    // console.log(r);
    var hs = r.map((item, idx) => {
      let style1;
      if (idx === this.state.pathIdx) {
        style1 = { marginLeft: '6px', backgroundColor: '#ccc' };
      } else {
        style1 = { marginLeft: '6px', backgroundColor: '#cc0' };
      }
      return (
        <span
          key={idx}
          onMouseEnter={() => this.onMouseEnter(idx)}
          onMouseLeave={() => this.onMouseLeave(idx)}
          style={style1}
          onClick={() => {
            this.linkclick(item[0]);
          }}
        >
          {item[1]}/
        </span>
      );
    });
    return hs;
  };
  onMouseLeave = idx => {
    this.setState({ pathIdx: null });
  };
  onMouseEnter = idx => {
    this.setState({ pathIdx: idx });
  };
  linkclick = e => {
    console.log(e);
    this.updatePath(e);
  };
  rootclick = () => {
    this.updatePath('.');
  };
  onRename = () => {
    //var type = this.props.isdir ? "folder" : "file";
    this.setState({show_input:true,input_value:this.state.anchorEl.innerText});
    // var path = this.state.current_path + '/' + this.state.anchorEl.innerText;
    // var updatedName = prompt('Enter new name for ' + this.state.anchorEl.innerText);
    // if (updatedName != null) {
    //   Client.get(
    //     '/fs/rename2',
    //     { path: path, name: updatedName },
    //     () => {
    //       this.reloadFilesFromServer();
    //       this.setState({ anchorEl: null });
    //     },
    //     null
    //   );
    // }
  };
  onRemove = () => {
    console.log('onRemove');
    //var type = this.props.isdir ? "folder" : "file";
    var path = this.state.current_path + '/' + this.state.anchorEl.innerText;
    this.setState({show_ok_cancel:true,prompt:"Remove  '" + path + "' ?"})
    

    // var remove = window.confirm("Remove  '" + path + "' ?");
    // if (remove) {
    //   Client.get(
    //     '/fs/remove',
    //     { path: path },
    //     () => {
    //       this.reloadFilesFromServer();
    //       this.setState({ anchorEl:null });
    //     },
    //     null
    //   );
    // }
  };
  // savefilecontent = () => {
  //   Client.get(
  //     'savefile',
  //     { path: this.state.openfilepath, content: this.state.filecontent },
  //     () => {
  //       this.reloadFilesFromServer();
  //       this.setState({
  //         showcontext: false,
  //         filechange: false,
  //       });
  //     },null
  //   );
  // };

  linkclick = e => {
    console.log(e);
    this.updatePath(e);
  };
  rootclick = () => {
    this.updatePath('.');
  };
  handleClose = value => {
    this.setState({ anchorEl: null });
    // this.props.click_menu(value);
  };
  render = () => {
    // console.log(this.state.paths);
    // const tooltipback = (
    //   <Tooltip id="tooltipback">
    //     <strong>back</strong>
    //   </Tooltip>
    // );
    // const tooltipparent = (
    //   <Tooltip id="tooltipparent">
    //     <strong>parent</strong>
    //   </Tooltip>
    // );
    // const tooltipupload = (
    //   <Tooltip id="tooltipparent">
    //     <strong>upload</strong>
    //   </Tooltip>
    // );
    const files = this.state.files.map(this.mapfunc);
    var pathshow = this.genpath(this.state.current_path);
    var viewIcon = this.state.gridView ? <ViewArrayIcon /> : <ViewListIcon />;
    var toolbar = (
      /*   <Overlay
          target={this.state.target}
          container={this}
          show={this.state.showcontext}
          placement="bottom"
        >
          <Tooltip id="tooltip1">
            <div onClick={this.onRename}>rename</div>
            <div onClick={this.onRemove}>remove</div>
          </Tooltip>
        </Overlay>*/
      <div
        style={{ display: 'flex', position: 'absolute', border: 'solid 1px' }}
      >
        <button onClick={this.onBack}>
          <ArrowLeftIcon />
        </button>
        <button onClick={this.onParent} disabled={this.state.isroot}>
          <ArrowUpwardIcon />
        </button>
        <button onClick={this.alternateView}>{viewIcon}</button>
        <button
          onClick={() => {
            this.setState({ displayUpload: true });
          }}
        >
          <CloudUploadIcon />
          <input
            type="file"
            id="uploadInput"
            onChange={this.uploadFile}
            style={{ display: this.state.displayUpload ? 'inline' : 'none' }}
          />
        </button>
        <button onClick={this.rootclick}>
          <ChevronRightIcon />
        </button>
        {pathshow}
      </div>
    );
    let dircontent;
    if (this.state.gridView) {
      dircontent = <div style={{ display: 'inline' }}>{files}</div>;
    } else {
      dircontent = (
        <table>
          <thead>
            <tr>
              <th>
                <button onClick={this.pathSort}>
                  <span className="glyphicon glyphicon-sort" />
                  名称
                </button>
              </th>
              <th>
                <button onClick={this.sizeSort}>
                  <span className="glyphicon glyphicon-sort" />
                  大小
                </button>
              </th>
              <th>
                <button onClick={this.timeSort}>
                  <span className="glyphicon glyphicon-sort" />
                  修改日期
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{files}</tbody>
        </table>
      );
    }
    return (
      <div
        style={{
          backgroundColor: '#888',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
      <DlgOkCancel prompt={this.state.prompt}
        open={this.state.show_ok_cancel}
        onClose={()=>{
          this.setState({show_ok_cancel:false});
        }}
        ok={()=>{
          var path = this.state.current_path + '/' + this.state.anchorEl.innerText;
          Client.get(
            '/fs/remove',
            { path: path },
            () => {
              this.reloadFilesFromServer();
              this.setState({ anchorEl:null });
            },
            null
          );
        }}
      />
      <DlgInput value={this.state.input_value}
        prompt={this.state.prompt}
        open={this.state.show_input} 
        onClose={()=>{
          this.setState({show_input:false});
        }} 
        ok={(updatedName)=>{
           console.log(updatedName);
           var path = this.state.current_path + '/' + this.state.anchorEl.innerText;
           if (updatedName != null) {
              Client.get(
                '/fs/rename2',
                { path: path, name: updatedName },
                () => {
                  this.reloadFilesFromServer();
                  this.setState({ anchorEl: null });
                },
                null
              );
            }
        }}/>
        {toolbar}
        <div style={{ marginTop: '35px' }}>{dircontent}</div>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.onRename}>rename</MenuItem>
          <MenuItem onClick={this.onRemove}>remove</MenuItem>
        </Menu>
      </div>
    );
  };
}

export default Browser;
