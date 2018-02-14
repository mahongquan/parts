var {Table,Modal,Navbar,Nav,NavItem,DropdownButton,MenuItem}=ReactBootstrap;
var update=newContext();
var DateTime=Datetime;
var host="";
//var socket=io();
var app = require('electron').remote; 
var dialog = app.dialog;

// Or with ECMAScript 6
var openDialog = function(defaultpath,callback){
    dialog.showOpenDialog({
        defaultPath :defaultpath,
        properties: [
            'openFile',
        ],
        filters: [
            { name: '*.xls', extensions: ['xls'] },
        ]
    },function(res){
        callback(res[0]) //我这个是打开单个文件的
    })
}
var isEqual=_.isEqual;// from 'lodash/isEqual';
var find=_.find;// import find from 'lodash/find';
//var {ContextMenuTrigger,ContextMenu}=ReactContextMenu;
//Browser///////////////////////////////////////////////////////
function buildUploadUrl(path, name) {
        return "/fs/upload?path="+path+"&name="+name;
}

function buildMkdirUrl(path, name) {
        return "/fs/mkdir?path="+path+"&name="+name;
}


function getParent(path, onSuccess) {
    socket.emit("/fs/parent",{path:path}, onSuccess);
}

class File extends React.Component {

    glyphClass=()=>{
            var className = "glyphicon ";
            className += this.props.isdir ? "glyphicon-folder-open" : "glyphicon-file";
            return className;
    }



    remove=()=> {
            socket.emit("/fs/remove",{path:path},
              ()=>{this.props.browser.reloadFilesFromServer();}
            );
    }

    rename=(updatedName)=> {
            socket.emit("/fs/rename2",
              {path:this.props.path,name:updatedName},
              ()=>{this.props.browser.reloadFilesFromServer();}
            );
    }

    onRemove=(e,data)=>{
            console.log("onRemove");
            var type = this.props.isdir ? "folder" : "file";
            var remove =window.confirm("Remove "+type +" '"+ this.props.path +"' ?");
            if (remove)
                    this.remove();
    }

    onRename=(e,data)=>{
            console.log("onRename");
            var type = this.props.isdir ? "folder" : "file";
            var updatedName = prompt("Enter new name for "+type +" "+this.props.name);
            if (updatedName != null)
                    this.rename(updatedName);
    }

    renderList=()=>{
            var dateString =  new Date(this.props.time*1000).toLocaleString();//toGMTString()
            var glyphClass = this.glyphClass();
            return (<tr id={this.props.id} ref={this.props.path}>
                            <td>
                            <ContextMenuTrigger id={""+this.props.id}>
                            <a onClick={this.props.onClick}><span style={{fontSize:"1.5em", paddingRight:"10px"}} className={glyphClass}/>{this.props.name}</a>
                            </ContextMenuTrigger>
                            <ContextMenu id={""+this.props.id}>
                                <MenuItem data={{a:1}} onClick={this.onRemove}>删除</MenuItem>
                                <MenuItem data={{a:2}} onClick={this.onRename}>重命名</MenuItem>
                              </ContextMenu>
                            </td>
                            <td>{File.sizeString(this.props.size)}</td>
                            <td>{dateString}</td>
                            </tr>);
    }
    renderGrid=()=>{
            var glyphClass = this.glyphClass();
            return (
                <div ref={this.props.path} >
                    <ContextMenuTrigger id={""+this.props.id}>
                        <a id={this.props.id} onClick={this.props.onClick}>
                        <span style={{fontSize:"3.5em"}} className={glyphClass}/>
                        </a>
                    </ContextMenuTrigger>
                                            <ContextMenu id={""+this.props.id}>
                        <MenuItem data={{a:1}} onClick={this.onRemove}>remove</MenuItem>
                        <MenuItem data={{a:2}} onClick={this.onRename}>rename</MenuItem>
                    </ContextMenu>

                    <h4 >{this.props.name}</h4>

                </div>);
    }

    render=()=>{
            return this.props.gridView ? this.renderGrid() : this.renderList();
    }
    static id = ()=>{return (Math.pow(2,31) * Math.random())|0; }

    static timeSort =(left, right)=>{return left.time - right.time;}

    static sizeSort = (left, right)=>{return left.size - right.size;}

    static pathSort = (left, right)=>{return left.path.localeCompare(right.path);}

    static sizes = [{count : 1, unit:"bytes"}, {count : 1024, unit: "kB"}, {count: 1048576 , unit : "MB"}, {count: 1073741824, unit:"GB" } ]

    static sizeString = (sizeBytes)=>{
        var iUnit=0;
        var count=0;
        for (iUnit=0; iUnit < File.sizes.length;iUnit++) {
                count = sizeBytes / File.sizes[iUnit].count;
                if (count < 1024)
                        break;
        }
        return "" + (count|0) +" "+ File.sizes[iUnit].unit;
    }
};
class  Browser extends React.Component {
    state= {
              paths : ["."],
              files: [],
              sort: File.pathSort,
              gridView: false,
              current_path:"",
              displayUpload:"none",
          }

    loadFilesFromServer=(path)=>{
        var self=this;
            socket.emit("/fs/children",{path:path},
              (data)=>{
                    var files = data.children.sort(self.state.sort);
                    var paths = self.state.paths;
                    if (paths[paths.length-1] !== path)
                    paths = paths.concat([path])
                    self.setState(
                            {files: files,
                                    paths: paths,
                            sort: self.state.sort,
                            gridView: self.state.gridView});
                    self.updateNavbarPath(self.currentPath());
              }
            );
    }
    updateNavbarPath=(path)=>{
         // var elem  = document.getElementById("pathSpan");
        // elem.innerHTML = '<span class="glyphicon glyphicon-chevron-right"/>' +path;
        this.setState({current_path:path});

    }
    reloadFilesFromServer=()=> {
        this.loadFilesFromServer(this.currentPath())
    }

    currentPath =()=>{
            return this.state.paths[this.state.paths.length-1]
    }

    onBack =()=>{
            if (this.state.paths.length <2) {
                    alert("Cannot go back from "+ this.currentPath());
                    return;
            }
            var paths2=this.state.paths.slice(0,-1);
            this.setState({paths:paths2});
            this.loadFilesFromServer(paths2[paths2.length-1])
    }

    onUpload=()=>{
            this.setState({displayUpload:""});
    }

    onParent=()=>{
            var onSuccess = function(data) {
                    var parentPath = data.path;
                    this.updatePath(parentPath);
            }.bind(this);
            getParent(this.currentPath(), onSuccess);
    }

    alternateView=()=>{
            var updatedView = !  this.state.gridView;

            this.setState(
              {
                    gridView: updatedView
              });
    }


    uploadFile=()=>{
        var path = this.currentPath();
        var readFile = evt.target.files[0];
        var name = readFile.name;
        console.log(readFile);
        socket.emit("/fs/upload",{},()=>{});
        // var formData = new FormData();
        // formData.append("file", readFile, name);

        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', buildUploadUrl(path, name) , true);
        // xhr.onreadystatechange=function()
        // {
        //         if (xhr.readyState !== 4)
        //                 return;

        //         if (xhr.status === 200){
        //                 alert("Successfully uploaded file "+ name +" to "+ path);
        //                 this.reloadFilesFromServer();
        //         }
        //         else
        //                ;// console.log(request.status);
        // }.bind(this);
        // xhr.send(formData);
    }


    componentDidMount=()=>{
        console.log("mount======");
        console.log(this.props.initpath);
        if (this.props.initpath)
            this.state.paths.push(this.props.initpath);
        var path = this.currentPath();
        this.loadFilesFromServer(path);
    }

    updateSort=(sort)=>{
            var files  = this.state.files
                    var lastSort = this.state.sort;
            if  (lastSort === sort)
                    files = files.reverse();
            else
                    files = files.sort(sort);

            this.setState({files: files, sort: sort,  paths: this.state.paths, gridView: this.state.gridView});
    }

    timeSort=()=>{
            this.updateSort(File.timeSort);
    }
    pathSort=()=>{
            this.updateSort(File.pathSort);
    }
    sizeSort=()=>{
            this.updateSort(File.sizeSort);
    }
    updatePath=(path)=>{
            this.loadFilesFromServer(path);
    }
    getContent=(path)=>{
        console.log("getContent");
        var url ="/media/"+path;
        console.log(url);
        window.open(url, url, 'height=800,width=800,resizable=yes,scrollbars=yes');
    }

    mkdir=()=>{

            var newFolderName = prompt("Enter new folder name");
            if (newFolderName == null)
                    return;
            socket.emit(
              buildMkdirUrl(this.currentPath(),newFolderName),
              this.reloadFilesFromServer
            );
    }
    onClick=(f)=>{
        console.log("onClick");
        console.log(f);
        if (f.isdir){
          this.updatePath(f.path);
        }
        else{
           this.getContent(f.path);
        }
    }
    mapfunc=(f, idx)=>{
      var id  =  File.id(f.name);
      return (<File key={idx}  id={id} gridView={this.state.gridView} onClick={()=>this.onClick(f)} 
      path={f.path} name={f.name} isdir={f.isdir} size={f.size} time={f.time} browser={this}
      />)
    }
    render=()=>{
        const files = this.state.files.map(this.mapfunc);

            var gridGlyph = "glyphicon glyphicon-th-large";
            var listGlyph = "glyphicon glyphicon-list";
            var className = this.state.gridView ? listGlyph : gridGlyph;
            var toolbar=(<div>
            <nav className="navbar navbar-inverse ">
                        <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                </button>
                        </div>
                        <div className="collapse navbar-collapse" id="example-navbar-collapse">
                                <ul className="nav navbar-nav">
                                        <li id="backButton"><a onClick={this.onBack}><span className="glyphicon glyphicon-arrow-left"/></a></li>
                                        <li id="parentButton"><a onClick={this.onParent} ><span className="glyphicon glyphicon-arrow-up"/></a></li>
                                        <li id="uploadButton"><a onClick={this.onUpload} ><span className="glyphicon glyphicon-upload"/></a></li>
                                        <li id="mkdirButton"><a onClick={this.mkdir} ><span className="glyphicon glyphicon-folder-open"/></a></li>
                                        <li id="alternateViewButton"><a onClick={this.alternateView}>
                                       <span ref="altViewSpan" className={className} />
                                        </a></li>
                                        <li><a id="pathSpan"><span className="glyphicon glyphicon-chevron-right"/>{this.state.current_path}</a></li>
                                </ul>
                        </div>
                </nav>
    <input type="file" id="uploadInput" onChange={this.uploadFile()} style={{display:this.state.displayUpload}} /></div>);
            if (this.state.gridView)
            {
                var files2=[];
                var row=[]
                var ncols=3
                for(var i in files){
                    if (i % ncols ===0)
                    {
                        if (row.length>0){
                            files2.push(row)
                            row=[]
                            row.push(files[i]);
                        }
                        else{
                            row.push(files[i]);   
                        }
                    }
                    else{
                        row.push(files[i]);
                    }
                }
                if(row.length>0){files2.push(row)}
                var files2_t=[]
                for(i in files2){
                    var cols=[]
                    for(var j in files2[i]){
                        cols.push((<td key={j} >{files2[i][j]}</td>))
                    }
                    row=(<tr key={i}>{cols}</tr>);
                    files2_t.push(row);
                }
                return (<div>
                {toolbar}
                <table>
                <tbody>{files2_t}
                </tbody>
                </table>
                </div>);

            }
            else{
              var sortGlyph = "glyphicon glyphicon-sort";
              return (<div>
                              {toolbar}
                              <table className="table table-responsive table-striped table-hover">
                              <thead><tr>
                              <th><button onClick={this.pathSort} className="btn btn-default"><span className={sortGlyph}/>名称</button></th>
                              <th><button onClick={this.sizeSort} className="btn btn-default"><span className={sortGlyph}/>大小</button></th>
                              <th><button onClick={this.timeSort} className="btn btn-default"><span className={sortGlyph}/>修改日期</button></th>
                              </tr></thead>
                              <tbody>
                              {files}
                              </tbody>
                              </table>

                </div>)
            }
    }
}
/////////////
class DlgFolder2 extends React.Component{
  state={ 
      showModal: false,
      hiddenPacks:true,
      error:"",
    }
  close=()=>{
    this.setState({ showModal: false });
  }

  open=()=>{
   this.setState({ showModal: true });
  }
  render=()=>{
    return (
        <button onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>文件浏览</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Browser initpath={this.props.initpath}/> 
          </Modal.Body>
        </Modal>
        </button>
    );
  }
}
//////////////react-Chart////////////////////////////
class ChartComponent extends React.Component {
  static getLabelAsKey = d => d.label;
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]).isRequired,
    getDatasetAtEvent: PropTypes.func,
    getElementAtEvent: PropTypes.func,
    getElementsAtEvent: PropTypes.func,
    height: PropTypes.number,
    legend: PropTypes.object,
    onElementsClick: PropTypes.func,
    options: PropTypes.object,
    plugins: PropTypes.arrayOf(PropTypes.object),
    redraw: PropTypes.bool,
    type: function(props, propName, componentName) {
      if(!Chart.controllers[props[propName]]) {
        return new Error(
          'Invalid chart type `' + props[propName] + '` supplied to' +
          ' `' + componentName + '`.'
        );
      }
    },
    width: PropTypes.number,
    datasetKeyProvider: PropTypes.func
  }

  static defaultProps = {
    legend: {
      display: true,
      position: 'bottom'
    },
    type: 'doughnut',
    height: 150,
    width: 300,
    redraw: false,
    options: {},
    datasetKeyProvider: ChartComponent.getLabelAsKey
  }

  componentWillMount() {
    this.chart_instance = undefined;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    if (this.props.redraw) {
      this.chart_instance.destroy();
      this.renderChart();
      return;
    }

    this.updateChart();
  }

  shouldComponentUpdate(nextProps) {
    const {
      redraw,
      type,
      options,
      plugins,
      legend,
      height,
      width
    } = this.props;

    if (nextProps.redraw === true) {
      return true;
    }

    if (height !== nextProps.height || width !== nextProps.width) {
      return true;
    }

    if (type !== nextProps.type) {
      return true;
    }

    if (!isEqual(legend, nextProps.legend)) {
      return true;
    }

    if (!isEqual(options, nextProps.options)) {
      return true;
    }

    const nextData = this.transformDataProp(nextProps);

    if( !isEqual(this.shadowDataProp, nextData)) {
      return true;
    }

    return !isEqual(plugins, nextProps.plugins);


  }

  componentWillUnmount() {
    this.chart_instance.destroy();
  }

  transformDataProp(props) {
    const { data } = props;
    if (typeof(data) == 'function') {
      const node = this.element;
      return data(node);
    } else {
      return data;
    }
  }

  // Chart.js directly mutates the data.dataset objects by adding _meta proprerty
  // this makes impossible to compare the current and next data changes
  // therefore we memoize the data prop while sending a fake to Chart.js for mutation.
  // see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617
  memoizeDataProps() {
    if (!this.props.data) {
      return;
    }

    const data = this.transformDataProp(this.props);

    this.shadowDataProp = {
      ...data,
      datasets: data.datasets && data.datasets.map(set => {
        return {
            ...set
        };
      })
    };

    return data;
  }

  updateChart() {
    const {options} = this.props;

    const data = this.memoizeDataProps(this.props);

    if (!this.chart_instance) return;

    if (options) {
      this.chart_instance.options = Chart.helpers.configMerge(this.chart_instance.options, options);
    }

    // Pipe datasets to chart instance datasets enabling
    // seamless transitions
    let currentDatasets = (this.chart_instance.config.data && this.chart_instance.config.data.datasets) || [];
    const nextDatasets = data.datasets || [];

    // use the key provider to work out which series have been added/removed/changed
    const currentDatasetKeys = currentDatasets.map(this.props.datasetKeyProvider);
    const nextDatasetKeys = nextDatasets.map(this.props.datasetKeyProvider);
    const newDatasets = nextDatasets.filter(d => currentDatasetKeys.indexOf(this.props.datasetKeyProvider(d)) === -1);

    // process the updates (via a reverse for loop so we can safely splice deleted datasets out of the array
    for (let idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
      const currentDatasetKey = this.props.datasetKeyProvider(currentDatasets[idx]);
      if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
        // deleted series
        currentDatasets.splice(idx, 1);
      } else {
        const retainedDataset = find(nextDatasets, d => this.props.datasetKeyProvider(d) === currentDatasetKey);
        if (retainedDataset) {
          // update it in place if it is a retained dataset
          currentDatasets[idx].data.splice(retainedDataset.data.length);
          retainedDataset.data.forEach((point, pid) => {
            currentDatasets[idx].data[pid] = retainedDataset.data[pid];
          });
          const {data, ...otherProps} = retainedDataset;
          currentDatasets[idx] = {
            data: currentDatasets[idx].data,
            ...currentDatasets[idx],
            ...otherProps
          };
        }
      }
    }
    // finally add any new series
    newDatasets.forEach(d => currentDatasets.push(d));
    const { datasets, ...rest } = data;

    this.chart_instance.config.data = {
      ...this.chart_instance.config.data,
      ...rest
    };

    this.chart_instance.update();
  }

  renderChart() {
    const {options, legend, type, redraw, plugins} = this.props;
    const node = this.element;
    const data = this.memoizeDataProps();

    if(typeof legend !== 'undefined' && !isEqual(ChartComponent.defaultProps.legend, legend)) {
      options.legend = legend;
    }

    this.chart_instance = new Chart(node, {
      type,
      data,
      options,
      plugins
    });
  }

  handleOnClick = (event) => {
    const instance = this.chart_instance;

    const {
      getDatasetAtEvent,
      getElementAtEvent,
      getElementsAtEvent,
      onElementsClick
    } = this.props;

    getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
    getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
    getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
    onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event); // Backward compatibility
  }

  ref = (element) => {
    this.element = element
  }

  render() {
    const {height, width, onElementsClick} = this.props;

    return (
      <canvas
        ref={this.ref}
        height={height}
        width={width}
        onClick={this.handleOnClick}
      />
    );
  }
}

class Doughnut extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='doughnut'
      />
    );
  }
}

class Pie extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='pie'
      />
    );
  }
}

class Line extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='line'
      />
    );
  }
}

class Bar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='bar'
      />
    );
  }
}

class HorizontalBar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='horizontalBar'
      />
    );
  }
}

class Radar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='radar'
      />
    );
  }
}

class Polar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='polarArea'
      />
    );
  }
}

class Bubble extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='bubble'
      />
    );
  }
}

class Scatter extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='scatter'
      />
    );
  }
}
//////////////
var {Button,Table,Modal,Navbar,Nav,NavItem,DropdownButton,MenuItem}=ReactBootstrap;
var update=newContext();
var DateTime=Datetime;
var host="";
///////
class PackItemEditNew extends React.Component{
  state={ 
      showModal: false,
      packitem:{},
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.items[nextProps.index];
  //   }
  //   this.setState({packitem:this.old});
  // }
  close=()=>{
    this.setState({ showModal: false });
  }

  open2=(idx)=>{
    this.setState({ showModal: true });
    this.index=idx;
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.items[this.index];
    }
    this.setState({packitem:this.old});
  }
  handleSave=(data)=>{
    socket.emit("/put/PackItem",this.state.packitem,(res) => {
      console.log("/put/PackItem");
      console.log(res);
        this.setState({contact:res.data});
        this.parent.handlePackItemChange(this.index,res.data);
        this.old=res.data;
        this.close();
    });
  }
  quehuoChange=(e)=>{
    var quehuo=this.state.packitem.quehuo;
    quehuo=!quehuo;
    if(this.old.quehuo===quehuo)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{quehuo: {$set:quehuo}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange_item=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{Item:{[e.target.name]: {$set:e.target.value}}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    console.log(this.old)
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  render=()=>{
    let item={};
    //if(this.state.packitem.Item){
      item=this.state.packitem;
    //}
    return (
        <Modal show={this.state.showModal}  onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr>
            <tr >
                <td >
                    ItemID:
                </td>
                <td >
                    <input type="text" id="itemid" name="item_id" readOnly="true"  disabled="disabled"    
                    defaultValue={item.id} />
                </td>
            </tr>
            <tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="name" value={item.name}
                     onChange={this.handleChange_item} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yiqixinghao}} type="text"  
                    name="guige" value={item.guige}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" 
                    id="baoxiang" name="bh" value={item.bh}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>单位:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" 
                    id="danwei" name="danwei" value={item.danwei}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>数量:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.ct}}
                    id="yujifahuo_date" name="ct"  value={this.state.packitem.ct} onChange={this.handleChange} />
                </td>
            </tr>  
            <tr>
                <td>
                    <label>缺货:</label>
                </td>
                <td>
                    <input type="checkbox" id="quehuo" name="quehuo" checked={this.state.packitem.quehuo}  onChange={this.quehuoChange} />
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       </div>
                </Modal.Body>
        </Modal>
    );
  }
}
//////////////
class PackItems extends React.Component {
  state = {
    items: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items:[],
    auto_loading: false,
    release:true,
  };
  componentDidMount=()=> {
      console.log(this.props.pack_id);
      socket.emit("/get/PackItem",{pack_id:this.props.pack_id}, (items) => {
        console.log("PackItems componentDidMount");
        console.log(items);
        this.setState({
          items: items.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  };
  auto_select=(event,data) => {
      console.log("selected");
      console.log(data)
      this.addrow(data.suggestion.id);
      //this.setState({auto_value:value, auto_items: [ item ] })
  }
  auto_change=(data)=>{
    var value=data.value;
    console.log("auto_change");
    if (value.length>1)
    {
      socket.emit("/get/Item",{search:value,limit:30} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
  };
  new_packitem= (id) => {
    var data={danwei:"",bh:"",guige:"",ct:0,img:"",name:this.state.newPackName,pack_id:this.props.pack_id};
    console.log(data);
    socket.emit("/post/PackItemEx",data,(res) => {
        var p=res.data;
        const newFoods = this.state.items.concat(p);
        this.setState({ items: newFoods });
    });
  };
  new_packitem2=()=> {
    var data={danwei:"",bh:"",guige:"",ct:0,img:"",name:this.state.auto_value,pack_id:this.props.pack_id};
    console.log(data);
    socket.emit("/post/PackItemEx",data,(res) => {
        var p=res.data;
        const newFoods = this.state.items.concat(p);
        this.setState({ items: newFoods });
    });
  };
  handlePackItemChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.items,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({items:contacts2});
  };
  addrow=(item_id)=>{
    var url="/PackItem";
    var data={pack_id:this.props.pack_id,item_id:item_id,ct:1,quehuo:false};
    socket.emit("/post/PackItem",data,(res) => {
        var p=res.data;
        const newFoods = this.state.items.concat(p);
        this.setState({ items: newFoods });
    });
  };
  newpackChange=(e)=>{
    this.setState({newPackName:e.target.value});
  };
  onEditClick = (id) => {
  };
  onDeleteClick = (itemIndex) => {
    var url="/PackItem";
    socket.emit("/delete/PackItem",{id:this.state.items[itemIndex].id},(res) => {
        const filteredFoods = this.state.items.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ items: filteredFoods });
    });
  };
  handleEdit=(idx)=>{
    this.refs.dlg.open2(idx);
  }
  onChange=(event, { newValue })=>{
    console.log(newValue);
    this.setState({auto_value:newValue});
  }
  render() {
    console.log("render");
    console.log(this.state);
    const { items } = this.state;
    const itemRows = items.map((item, idx) => (
      <tr key={idx}>
        <td >{item.id}</td>
        <td >{item.name}</td>
        <td>{item.guige}</td>
        <td>{item.ct}</td>
        <td>{item.bh}</td>
        <td  hidden={this.state.release}>{item.pack}</td>
        <td><input type="checkbox" disabled="disabled" name="quehuo" checked={item.quehuo}  /></td>
        <td>
        <a onClick={()=>this.handleEdit(idx)}>编辑</a>
        <a style={{marginLeft:"10px"}} onClick={() => this.onDeleteClick(idx)}>删除</a>
        </td>
      </tr>
    ));
    let button1;
    if (this.state.auto_value.length>1){
	    	button1=(
		    <Button onClick={this.new_packitem2}>
		        新备件
		        </Button>);	
    }
    else{
    	button1=(
		    <Button disabled onClick={this.new_packitem2}>
		        新备件
		        </Button>);
    }
    return (
    <div>
        <Table  responsive bordered condensed>
          <thead>
             <tr>
              <td>id</td>
              <td>名称</td>
              <td>规格</td>
              <td>数量</td>
              <td>编号</td>
              <td  hidden={this.state.release}>pack</td>
              <td>缺货</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {itemRows}
          </tbody>
        </Table>
        <table><tbody><tr>
        <td>输入备件</td><td><Autosuggest
        focusInputOnSuggestionClick={false}
          inputProps={{ id: 'states-autocomplete',value:this.state.auto_value,onChange:this.onChange}}
          onSuggestionSelected={this.auto_select}
          onSuggestionsFetchRequested={this.auto_change}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(item) => item.name}
          ref="autocomplete"
          suggestions={this.state.auto_items}
          renderSuggestion={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.id}
              id={item.id}
            >{item.bh+"_"+item.name+"_"+item.guige}</div>
          )}
        /></td><td>{button1}</td></tr></tbody></table>
      <PackItemEditNew ref="dlg" parent={this} />
      </div>
    );
  }
}/////////////////
class UsePackEditNew extends React.Component{
  state={ 
      showModal: false,
      usepack:{},
      bg:{},
  }

  close=()=>{
    this.setState({ showModal: false });
  }
  handleChange=()=>{
    
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.usepacks[nextProps.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  close=()=>{
    this.setState({ showModal: false });
  }
  open2=(idx)=>{
    this.index=idx;
    this.setState({ showModal: true });
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.usepacks[this.index];
    }
    this.setState({usepack:this.old});
    console.log(this.old);
  }
  // open=()=>{
  //   this.setState({ showModal: true });
  //   if (this.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=this.props.parent;
  //     this.old=this.parent.state.usepacks[this.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  render=()=>{
    let name;
    let id;
    id=this.state.usepack.pack_id
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>编辑包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={id} />
                </td>
                <td>
                    <label>名称:</label>
                </td>
                <td>
                    <label>{name}</label>
                </td>
            </tr></tbody>
            </table>
        <div id="id_useusepacks">
        <PackItems  pack_id={id}/>
        </div>
                </Modal.Body>
        </Modal>
    );
  }
}
/////
class DlgFolder extends React.Component{
  state={ 
      showModal: false,
      hiddenPacks:true,
      error:"",
  }

  close=()=>{
    this.setState({ showModal: false });
  }

  open=()=> {
    var self=this;
   this.setState({ showModal: true });
   socket.emit("/folder",{id:this.props.contact_id}, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.close();
       }
   })
  }
  render=()=> {
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
    );
  }
}
///////
class DlgCheck extends React.Component{
  state= { 
      showModal: false,
      error:"",
      packs:[],
      hideTable:true,
  }

  close=()=>{
    this.setState({ showModal: false });
  }
  upload=()=>{
    const file = this.fileUpload.files[0];
    console.log(file);
    var data1=new FormData();
    data1.append("file",file);
    data1.append("id",this.props.contact_id);
    //console.log(data1)
    var self=this;
    socket.emit("/check",data1,function(data){
      var showdata=[];
      var left=data.result[0];
      var notequal=data.result[1];
      var right=data.result[2];
      console.log(notequal);
      var n=left.length;
      if (n<right.length){
        n=right.length;
      }
      for(var i=0;i<n;i++){
        var tr={}
        if(i<left.length){
          for(var one in left[i]){
              tr["left"+one]=left[i][one];
          }
        }
        else{
            tr["left0"]="";
            tr["left1"]="";
            tr["left2"]="";
        }
        if(i<right.length){
          for(one in right[i]){
            tr["right"+one]=right[i][one];
          }
        }
        else{
          tr["right0"]="";
          tr["right1"]="";
          tr["right2"]="";
        }
        showdata.push(tr);
       }
      n=notequal.length;
      for(i=0;i<n/2;i++){
        tr={};
        var l=2*i+0;
          for(one in notequal[l]){
            tr["left"+one]=notequal[l][one];
          }
          var r=2*i+1;
          for(one in notequal[r]){
            tr["right"+one]=notequal[r][one];
          }
        showdata.push(tr);
      }
      console.log(showdata);
      self.setState({packs: showdata});
      self.setState({hideTable:false});
    });
  }
  open=()=>{
    this.setState({ showModal: true });
    this.setState({hideTable:true});
  }
  render=()=>{
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx} >
        <td style={{color:"blue"}}>{pack.left0}</td>
        <td style={{color:"blue"}}>{pack.left1}</td>
        <td style={{color:"blue"}}>{pack.left2}</td>
        <td style={{color:"green"}}>{pack.right0}</td>
        <td style={{color:"green"}}>{pack.right1}</td>
        <td style={{color:"green"}}>{pack.right2}</td>
      </tr>
    ));   
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>仪器编号{this.props.yiqibh}备料计划核对，请上传备料计划导出的Excel文件</p>
          <form  ref="form1" encType="multipart/form-data">
          <input style={{margin:"10px 10px 10px 10px"}} id="file"  accept="application/vnd.ms-excel" type="file" name="file" ref={(ref) => this.fileUpload = ref}/>
          <button  style={{margin:"10px 10px 10px 10px"}} className="btn btn-primary" onClick={this.upload} type="button">上传</button>
          </form>
          <div hidden={this.state.hideTable} style={{"minHeight":"200px"}}>
          <table className="table-bordered">
          <tbody>
          <tr>
          <td  style={{color:"blue"}} colSpan='3'>装箱单</td>
          <td  style={{color:"green"}} colSpan='3'>备料计划</td>
          </tr>
          {contactRows}
          </tbody>
          </table>
          </div>
          <div>
              {this.state.error}
          </div>
          </Modal.Body>
        </Modal>
    );
  }
}
///////
class DlgWait extends React.Component{
  state={ 
      showModal: false,
      hiddenPacks:true,
      error:"",
  }
  
  close=()=>{
    this.setState({ showModal: false });
  }

  open=()=> {
    var self=this;
   this.setState({ showModal: true });
   socket.emit("/allfile",{id:this.props.contact_id}, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.close();
       }
   })
  }
  render=()=> {
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
    );
  }
}
/////////////
class DlgUrl extends React.Component{
  state= { 
      showModal: false,
      error:"",
  }

  close=()=> {
    this.setState({ showModal: false });
  }

  open=()=>{
   var self=this;
   this.setState({ showModal: true });
   socket.emit(this.props.url,this.props.data, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.props.parent.handleContactChange(self.props.index,result.data);
          self.close();
       }
   })
  }
  render=()=> {
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
    );
  }
}
//////////////
class UsePacks2 extends React.Component {
  state = {
    usepacks: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items:[],
    release:true,
  };
   componentWillReceiveProps(nextProps) {
    if(nextProps.contact_id){
      this.load_data(nextProps.contact_id);
    }
  }
  load_data=(contact_id)=>{
      socket.emit("/get/UsePack",{contact_id:contact_id}, (usepacks) => {
        console.log(usepacks)
        this.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  }
  componentDidMount=()=> {
    if(this.props.contact_id){
      this.load_data(this.props.contact_id);
    }
  };
  auto_change=(data)=>{
    var value=data.value;
    if (value.length>1)
    {
      socket.emit("/get/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data })
      });
    }
  };
  auto_select=(event,data) => {
      console.log("selected");
      console.log(data)
      this.addrow(data.suggestion.id);
      //this.setState({auto_value:value, auto_items: [ item ] })
  }
  bibei= (id) => {
    //this.setState({auto_value:"必备"});
    this.onChange(null,{newValue:"必备"});
    console.log(this.refs.autocomplete);

  };
  new_pack= (id) => {
    var url="/UsePackEx";
    var data={"name":this.state.auto_value,contact_id:this.props.contact_id};
    socket.emit("/post/UsePackEx",data,(res) => {
      console.log(res);
      var p=res.data;
      const newFoods = this.state.usepacks.concat(p);
      this.setState({ usepacks: newFoods });
    });
  };
  addrow=(pack_id)=>{
    var url="/UsePack";
    var data={contact_id:this.props.contact_id,pack_id:pack_id};
    socket.emit("/post/UsePack",data,(res) => {
        var p=res.data;
        const newFoods = this.state.usepacks.concat(p);
        this.setState({ usepacks: newFoods });
    });
  };
  newpackChange=(e)=>{
    this.setState({newPackName:e.target.value});
  };
  onEditClick = (id) => {
  };
  onDeleteClick = (itemIndex) => {
    socket.emit("/delete/UsePack",{id:this.state.usepacks[itemIndex].id},(res) => {
        const filteredFoods = this.state.usepacks.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ usepacks: filteredFoods });
    });
  };
   handleEdit=(idx)=>{
    //this.setState({currentIndex:idx,showModal:true});
    this.refs.edit1.open2(idx);
  }
  getUsers=(input)=> {
    console.log("getUsers");
    console.log(input)
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch("/Pack?limit=10&search="+input,{credentials: 'include'})
    .then((response) => response.json())
    .then((json) => {
      var r={ options: json.data};
      console.log(r);
      return r;
    });
  }
  onChange=(event, { newValue })=>{
    console.log("onChange======================");
    console.log(newValue)
    this.setState({
      auto_value: newValue,
    });
  }
  onValueClick=(value)=>{
    console.log(value);
  }
  render() {
    const { usepacks } = this.state;
    const usepackRows = usepacks.map((usepack, idx) => (
      <tr
        key={idx}
      >
        <td >{usepack.id}</td>
        <td >{usepack.name}</td>
        <td hidden={this.state.release}>{usepack.contact}</td>
        <td hidden={this.state.release} >{usepack.pack}</td>
        <td hidden={this.state.release} >{usepack.hetongbh}</td>
        <td>
        <a onClick={()=>this.handleEdit(idx)}>编辑</a>
        <a  onClick={() => this.onDeleteClick(idx)} style={{marginLeft:"10px"}}>删除</a>
        </td>
      </tr>
    ));
    //console.log("UsePacks2 render===================");
    //console.log(this.state);
    let button1;
    if (this.state.auto_value.length>1){
	    	button1=(
		    <Button onClick={this.new_pack}>
		        新包
		        </Button>);	
    }
    else{
    	button1=(
		    <Button disabled onClick={this.new_pack}>
		        新包
		        </Button>);
    }
    return (
    <div>
        <UsePackEditNew ref="edit1" parent={this} index={this.state.currentIndex} title="编辑"  />
        <Table  responsive bordered condensed>
          <thead>
             <tr>
              <td>id</td>
              <td>名称</td>
              <td hidden={this.state.release}>contact</td>
              <td hidden={this.state.release}>pack</td>
              <td hidden={this.state.release}>hetongbh</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {usepackRows}
          </tbody>
        </Table>
        <table><tbody><tr><td>输入包</td>
        <td><Autosuggest
        focusInputOnSuggestionClick={false}
          inputProps={{ id: 'states-autocomplete',value:this.state.auto_value,onChange:this.onChange}}
          onSuggestionSelected={this.auto_select}
          onSuggestionsFetchRequested={this.auto_change}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(item) => item.name}
          ref="autocomplete"
          suggestions={this.state.auto_items}
          renderSuggestion={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.id}
              id={item.id}
            >{item.name}</div>
          )}
        /></td><td>{button1}</td><td><button  className="btn" onClick={this.bibei}>必备</button></td>
       </tr></tbody></table>
      </div>
    );
  }
}
/////////////
class DlgImport extends React.Component{
  state={ 
      showModal: false,
      error:"",
      packs:[]
  }

  close=()=>{
    this.setState({ showModal: false });
  }
  upload=()=>{
    const file = this.fileUpload.files[0];
    var stream = ss.createStream();
    // upload a file to the server.
    var app=this;
    ss(socket).emit('file', stream, {name:file.name,size: file.size},(res)=>{
       console.log(app.state.packs)
       console.log(res);
       const newFoods = update(app.state.packs, {$push: res.result});
       app.setState({packs: newFoods });
    });
    ss.createBlobReadStream(file).pipe(stream);
    // console.log(file);
    // var data1=new FormData();
    // data1.append("file",file);
    // //console.log(data1)
    // var self=this;
    // Client.post("/standard",data1,function(res){
    //     const newFoods = update(self.state.packs, {$push: res.result});
    //     self.setState({packs: newFoods });
    // });
  }
  open=()=>{
    var self=this;
   this.setState({ showModal: true });
   var data= { limit:10,search:"xls"};
   socket.emit("/get/Pack",data, function(result){
       console.info(result);
       // if (!result.success){
       //    self.setState({error:result.message});
       // }
       // else
          self.setState({packs:result.data});
          console.log(result.data);
   })
  }
  openfile=()=>{
    openDialog(".",(res)=>{
        socket.importstandard(res);
    });
  }
  render=()=>{
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx} >
        <td>{pack.id}</td>
        <td>{pack.name}</td>
      </tr>
    ));   
    return (
        <Modal show={this.state.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title>导入标样</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form  style={{display:"none"}} ref="form1" encType="multipart/form-data">
          <input style={{margin:"10px 10px 10px 10px"}} id="file"  accept="application/vnd.ms-excel" type="file" name="file" ref={(ref) => this.fileUpload = ref}/>
          <button  style={{margin:"10px 10px 10px 10px"}} className="btn btn-primary" onClick={this.upload} type="button">上传</button>
          </form>
          <button  style={{margin:"10px 10px 10px 10px"}} className="btn btn-primary" onClick={this.openfile} type="button">打开文件</button>
          <div style={{"minHeight":"200px"}}>
          <table  className="table-bordered"><thead><tr><td>ID</td><td>名称</td></tr></thead><tbody>
          {contactRows}
          </tbody></table>
          </div>
          <div>
              {this.state.error}
          </div>
          </Modal.Body>
        </Modal>
    );
  }
}
///////////////////////
class DlgStat extends React.Component {
  state={
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      baoxiang:"%",
  }
  componentDidMount=()=> {
    console.log(this.myChart);
    return;
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata('%');
  }
  loaddata=(baoxiang)=>{
   var self=this;
   var data= {baoxiang:baoxiang};
   socket.emit("/get/month12",data, function(result){
      console.log("month12============================");
      console.log(result);
      console.log("===================");
          self.setState({lbls:result.lbls,values:result.values});
   })
  }
  onSelectBaoxiang=(baoxiang)=>{
    this.setState({baoxiang:baoxiang});
    this.loaddata(baoxiang);
  }
  logChange=(val)=> {
    console.log("Selected: " + JSON.stringify(val));
    if (val!=null){
        this.setState({baoxiang:val.value});
        this.loaddata(val.value);
    }
    else{
       this.setState({baoxiang:"%"});
        this.loaddata("%"); 
    }
  }
  render=()=>{
    var bg=[];//values.length);
    for(var i=0;i<this.state.values.length;i++){
      bg.push('rgba(95, 192, 99, 1)');
    }
    var data= {
          labels:this.state.lbls,
          datasets: [{
              label: '调试台数',
              data: this.state.values,
              backgroundColor:bg,
              borderWidth:2
          }]
      };
      console.log(data);
      var options= {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    return (
        <Modal ref="modal" show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header ref="header" closeButton>
            <Modal.Title>统计</Modal.Title>
          </Modal.Header>
          <Modal.Body ref="body">
         <DropdownButton ref="drop" title={this.state.baoxiang} id="id_dropdown2">
            <MenuItem onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
            <MenuItem onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
            <MenuItem onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
            <MenuItem onSelect={() => this.onSelectBaoxiang("%")}>*</MenuItem>
          </DropdownButton>
          {
          //<canvas ref={(input) => { this.myChart = input; }} id="myChart" width="400" height="400"></canvas>
          }
            <Bar data={data} options={options} width={600} height={300} />
          </Modal.Body>
        </Modal>
    );
  }
}
/////////////////////////////
class DlgCopyPack  extends React.Component{
  state= { 
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
  }
  newnameChange=(event)=>{
    this.setState({newname:event.target.value});
  }
  copy_pack=()=>{
    console.log(this.src_id+" "+this.state.newname);
    var self=this;
    var data1={};
    data1.oldid=this.src_id;
    data1.newname=this.state.newname;
    socket.emit("/copypack/",data1,(result) => {
          self.setState({ error:result.message})
    });
  }
  auto_change=(data)=>{
    var value=data.value;
    console.log("auto_change");
    if (value.length>1)
    {
      socket.emit("/get/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
  };
   auto_select=(event,data) => {
      console.log("selected");
      console.log(data)
      this.src_id=data.suggestion.id;
      //this.setState({ auto_items: [ item ] })
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.src_id=null;
  }
  onChange=(event, { newValue })=>{
    console.log(newValue);
    this.setState({auto_value:newValue});
  }
  render=()=>{
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
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
              <td><Autosuggest
          inputProps={{ id: 'states-autocomplete',value:this.state.auto_value,onChange:this.onChange}}
          onSuggestionSelected={this.auto_select}
          onSuggestionsFetchRequested={this.auto_change}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(item) => item.name}
          ref="autocomplete"
          suggestions={this.state.auto_items}
          renderSuggestion={(item, isHighlighted) => (
                    <div
                      style={isHighlighted ? styles.highlightedItem : styles.item}
                      key={item.id}
                      id={item.id}
                    >{item.name}</div>
                  )}
                />
              </td>
            </tr>
            <tr>
              <td><label >新包名称:</label></td>
              <td>
                <input id="nameto" type="text" onChange={this.newnameChange} size="15" value={this.state.newname} maxLength="30" />
              </td>
            </tr>
            </tbody>
            </table>
          <button onClick={this.copy_pack}>复制</button>
          <p>{this.state.error}</p>
          </Modal.Body>
        </Modal>
    );
  }
}
//DlgParts///////////////////////////
class PackEdit extends React.Component{
  state={ 
      showModal: false,
      pack_id:null,
    }

  close=()=>{
    this.setState({ showModal: false });
  }
  handleChange(){
    
  }
  open(pack_id) {
    this.setState({ showModal: true ,pack_id:pack_id});
  }
  render() {
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>编辑包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <label>id:{this.state.pack_id}</label>
          <div id="id_useusepacks">
            <PackItems  pack_id={this.state.pack_id}/>
          </div>
          </Modal.Body>
        </Modal>
    );
  }
}
class DlgPacks extends React.Component {
  mystate = {
    start:0,
    limit:5,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
      contacts: [],
      user: "AnonymousUser",
      start:0,
      total:0,
      search:"",
      start_input:1,
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata();
  }
  loaddata=()=>{
   socket.emit("/get/Pack",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts2) => {
        var user=contacts2.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts2.total,
          start:this.mystate.start
        });
        this.mystate.total=contacts2.total;
    });
  }
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  };
  search = (e) => {
    this.mystate.start=0;
    this.loaddata();
  };
  handleEdit=(pack_id)=>{
    //this.setState({currentIndex:idx,showModal:true});
    this.refs.edit1.open(pack_id);
  }
  mapfunc=(contact, idx) => {
     if (contact.name)
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td><a onClick={()=>this.handleEdit(contact.id)}>{contact.name}</a></td>
        </tr>);
   else
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td><a onClick={()=>this.handleEdit(contact.id)}>[NONAME]</a></td>
        </tr>);
  }
  render=()=>{
    const contactRows = this.state.contacts.map(this.mapfunc);
    return (
        <Modal show={this.state.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title>备件</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <PackEdit ref="edit1" title="编辑"  />
          <input type="text" value={this.state.search}  placeholder="" onChange={this.handleSearchChange} />
          <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</button>
           <Table responsive bordered condensed><thead>
           <tr>
           <th>ID</th>
           <th>名称</th>
           </tr></thead><tbody id="contact-list">{contactRows}</tbody></Table>
      <a onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}../{this.state.total}</label>
      <a onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
          </Modal.Body>
        </Modal>
    );
  }
};

//DlgItems///////////////////////////
class ItemEdit extends React.Component{
  state={ 
      showModal: false,
      packitem:{},
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }
  close=()=>{
    this.setState({ showModal: false });
  }

  open2=(idx)=>{
    this.setState({ showModal: true,bg:{}});
    this.index=idx;
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.contacts[this.index];
    }
    this.setState({packitem:this.old});
  }
  handleSave=(data)=>{
    var url="/rest/Item";
    console.log(this.state.packitem);
    Client.postOrPut(url,this.state.packitem,(res) => {
      console.log(res);
        this.setState({contact:res.data});
        this.parent.handlePackItemChange(this.index,res.data);
        this.old=res.data;
        this.close();
    });
  }
  quehuoChange=(e)=>{
    var quehuo=this.state.packitem.quehuo;
    quehuo=!quehuo;
    if(this.old.quehuo===quehuo)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{quehuo: {$set:quehuo}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  render=()=>{
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr><tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.name}}  type="text" id="name" name="name" value={this.state.packitem.name} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.guige}} type="text"  name="guige" 
                    value={this.state.packitem.guige}  onChange={this.handleChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.bh}} type="text" id="bh" name="bh" value={this.state.packitem.bh}  onChange={this.handleChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>数量:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.ct}}
                    id="ct" name="ct"  value={this.state.packitem.ct} onChange={this.handleChange} />
                </td>
            </tr>  
            <tr>
                <td>
                    <label>单位:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.danwei}}
                    id="danwei" name="danwei"  value={this.state.packitem.danwei} onChange={this.handleChange} />
                </td>
            </tr> 
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       </div>
                </Modal.Body>
        </Modal>
    );
  }
}
class DlgItems extends React.Component {
  mystate = {
    start:0,
    limit:5,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
      contacts: [],
      user: "AnonymousUser",
      start:0,
      total:0,
      search:"",
      start_input:1,
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata();
  }
  loaddata=()=>{
   socket.emit("/get/Item",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts2) => {
        var user=contacts2.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts2.total,
          start:this.mystate.start
        });
        this.mystate.total=contacts2.total;
    });
  }
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  };
  search = (e) => {
    this.mystate.start=0;
    this.loaddata();
  };
  handleEdit=(idx)=>{
    this.refs.dlg.open2(idx);
  }
  mapfunc=(contact, idx) => {
      //console.log(contact);
     if (!contact.image || contact.image==="")
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td><a onClick={()=>this.handleEdit(idx)}>{contact.name}</a></td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td></td>
        </tr>);
      else
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td><a onClick={()=>this.handleEdit(idx)}>{contact.name}</a></td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td><img alt="no" src={"./media/"+contact.image} width="100" height="100"></img></td>
        </tr>);
  }
  render=()=>{
    const contactRows = this.state.contacts.map(this.mapfunc);
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>备件</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ItemEdit ref="dlg" parent={this} />
              <input type="text" value={this.state.search}  placeholder="" onChange={this.handleSearchChange} />
              <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</button>
           <Table responsive bordered condensed><thead>
           <tr>
           <th>ID</th>
           <th>编号</th>
           <th>名称</th>
           <th>规格</th>
           <th>单位</th>
           <th>图片</th>
           </tr></thead><tbody id="contact-list">{contactRows}</tbody></Table>
      <a onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}../{this.state.total}</label>
      <a onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
          </Modal.Body>
        </Modal>
    );
  }
};
//ContactEdit2New//////////////////////
let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}
class ContactEdit2New  extends React.Component{
  state={ 
      showModal: false,
      contact:{
        yujifahuo_date:moment(),
        tiaoshi_date:moment(),
          },
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }

  close=()=>{
    this.setState({ showModal: false });
  }
 // componentWillReceiveProps(nextProps) {
 //    this.setState({ showModal: nextProps.showModal });
 //    this.setState({bg:{}});
 //    this.parent=nextProps.parent;
 //    if (nextProps.index==null){
 //      this.old={
 //        yujifahuo_date:moment().format("YYYY-MM-DD"),
 //        tiaoshi_date:moment().format("YYYY-MM-DD"),
 //        addr:"",
 //        channels:"",
 //        baoxiang:"",
 //        hetongbh:"",
 //        shenhe:"",
 //        yonghu:"",
 //        yiqibh:"",
 //        yiqixinghao:""
 //      };
 //    }
 //    else{
 //      this.old=this.parent.state.contacts[nextProps.index];
 //      this.setState({hiddenPacks:false});
 //    }
 //    this.setState({contact:this.old});
 //  }
 open2=(idx)=>{
    this.setState({ showModal: true });
    this.setState({bg:{}});
    this.parent=this.props.parent;
    this.index=idx;
    if (this.index==null){
      this.old={
        yujifahuo_date:moment().format("YYYY-MM-DD"),
        tiaoshi_date:moment().format("YYYY-MM-DD"),
        addr:"",
        channels:"",
        baoxiang:"",
        hetongbh:"",
        shenhe:"",
        yonghu:"",
        yiqibh:"",
        yiqixinghao:""
      };
      this.setState({hiddenPacks:true});
    }
    else{
      this.old=this.parent.state.contacts[this.index];
      if(!this.old.addr){this.old.addr=""}
      if(!this.old.channels){this.old.channels=""}
      if(!this.old.yiqixinghao){this.old.yiqixinghao=""}
      this.setState({hiddenPacks:false});
    }
    this.setState({contact:this.old});
  }
  // open=()=>{
  //   this.setState({ showModal: true });
  //   this.setState({bg:{}});
  //   this.parent=this.props.parent;
  //   if (this.index==null){
  //     this.old={
  //       yujifahuo_date:moment().format("YYYY-MM-DD"),
  //       tiaoshi_date:moment().format("YYYY-MM-DD"),
  //       addr:"",
  //       channels:"",
  //       baoxiang:"",
  //       hetongbh:"",
  //       shenhe:"",
  //       yonghu:"",
  //       yiqibh:"",
  //       yiqixinghao:""
  //     };
  //   }
  //   else{
  //     this.old=this.parent.state.contacts[this.index];
  //     this.setState({hiddenPacks:false});
  //   }
  //   this.setState({contact:this.old});
  // }
  // handleClear (data) {
  //   console.log("clear");
  //   var contact2={id:"",hetongbh:"",name:"",addr:""};
  //   console.log(contact2);
  //   this.setState({contact:contact2});
  // },
  handleCopy=(data)=> {
     console.log("copy");
     var contact2=update(this.state.contact,{id:{$set:""}});
     console.log(contact2);
     this.setState({contact:contact2});
     this.setState({hiddenPacks:true});
  }
  handleSave=(data)=>{

    let url;//="/Contact";
    if (this.state.contact.id){
      url="/put/Contact";
    }
    else{
      url="/post/Contact";
    }
    socket.emit(url,this.state.contact,(res) => {
      console.log(res);
      if(res.success){
        this.setState({contact:res.data});
        this.parent.handleContactChange(this.index,res.data);
        this.old=res.data;
        this.setState({bg:{}});
        this.setState({hiddenPacks:false});
      }
      else{
        alert(res.message);
      }
    });
  }
  tiaoshi_date_change=(value)=>{
    //this.state.yujifahuo_date=value;
    var e_target_name="tiaoshi_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
      //console.log("not equal")
      //this.state.bg[e_target_name]="#8888ff"; 
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
  }

  yujifahuo_date_change=(value)=>{
    //this.state.yujifahuo_date=value;
    var e_target_name="yujifahuo_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
     const bg2=update(this.state.bg,{[e_target_name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  channels_change=(event, { newValue })=>{
    this.change1(newValue);
  }
  channels_change_fetch=()=>{}
  channels_select=(event,data)=>{
    this.change1(data.suggestion);
  }
  change1=(item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.channels===item)
      {
       const bg2=update(this.state.bg,{channels:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{channels:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      const contact2=update(this.state.contact,{channels: {$set:item}});
      console.log(contact2);
      this.setState({contact:contact2});
  }
  yiqixinghao_change=(event, { newValue })=>{
    this.change2(newValue);
  }
  yiqixinghao_select=(event,data)=>{
    this.change2(data.suggestion);
  }
  change2=(item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.yiqixinghao===item)
      {
       const bg2=update(this.state.bg,{yiqixinghao:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{yiqixinghao:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      const contact2=update(this.state.contact,{yiqixinghao: {$set:item}});
      console.log(contact2);
      this.setState({contact:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
     const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  matchStateToTerm=(state, value)=>{
     return      state.toLowerCase().indexOf(value.toLowerCase()) !== -1 ;
  }
  render=()=>{
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>编辑仪器信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" disabled="disabled"    value={this.state.contact.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yonghu}}  type="text" id="yonghu" name="yonghu" value={this.state.contact.yonghu} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="addr" value={this.state.contact.addr} onChange={this.handleChange} />
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                  <Autosuggest
                      inputProps={
                        { 
                          id: 'channels-autocomplete',
                          style:{backgroundColor:this.state.bg.channels},
                          value:this.state.contact.channels,
                          onChange:this.channels_change
                        }
                      }
                      suggestions={[
                        "1O(低氧)",
                        "1O(高氧)",
                        "1O(低氧)+2N",
                        "1C(低碳)+2S",
                        "1C(高碳)+2S",
                        "2C+1S(低硫)",
                        "2C+1S(高硫)",
                        "2C+2S",
                        "2O+2N",
                        "2O",
                      ]}
                      getSuggestionValue={(item) => item}
                      onSuggestionSelected={this.channels_select}
                      onSuggestionsFetchRequested={()=>{}}
                      renderSuggestion={(item, isHighlighted) => (
                        <div
                          style={isHighlighted ? styles.highlightedItem : styles.item}
                          key={item}
                        >{item}</div>
                      )}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                {
                    <Autosuggest
                       inputProps={
                        { 
                          id: 'yiqixinghao-autocomplete',
                          style:{backgroundColor:this.state.bg.yiqixinghao},
                          value:this.state.contact.yiqixinghao,
                          onChange:this.yiqixinghao_change
                        }
                      }
                      suggestions={[
                        "CS-1011C",
                        "CS-2800",
                        "CS-3000",
                        "CS-3000G",
                        "HD-5",
                        "N-3000",
                        "O-3000",
                        "OH-3000",
                        "ON-3000",
                        "ON-4000",
                        "ONH-3000"
                      ]}
                      getSuggestionValue={(item) => item}
                      onSuggestionsFetchRequested={()=>{}}
                      onSuggestionSelected={this.yiqixinghao_select}
                      renderSuggestion={(item, isHighlighted) => (
                        <div
                          style={isHighlighted ? styles.highlightedItem : styles.item}
                          key={item}
                        >{item}</div>
                      )}
                    />
                }
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.yiqibh}}  type="text" id="yiqibh" name="yiqibh" value={this.state.contact.yiqibh}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" id="baoxiang" name="baoxiang" value={this.state.contact.baoxiang}  onChange={this.handleChange} />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.shenhe}} type="text" id="shenhe" name="shenhe" value={this.state.contact.shenhe}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <DateTime  ref="datetime1" timeFormat={false} 
                    inputProps={
                      {"style":
                        {"backgroundColor":this.state.bg.yujifahuo_date}
                      }
                    } 
                    id="yujifahuo_date" name="yujifahuo_date"  value={this.state.contact.yujifahuo_date} onChange={this.yujifahuo_date_change} />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                <DateTime  ref="datetime2" timeFormat={false} 
                    inputProps={
                      {"style":
                        {"backgroundColor":this.state.bg.tiaoshi_date}
                      }
                    } 
                    name="tiaoshi_date"  value={this.state.contact.tiaoshi_date} onChange={this.tiaoshi_date_change} />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.hetongbh}}  type="text" id="hetongbh" name="hetongbh" value={this.state.contact.hetongbh}  onChange={this.handleChange} />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <input  style={{"backgroundColor":this.state.bg.method}}  type="text" id="method" name="method" disabled="true" defaultValue={this.state.contact.method} />
                {
                //<button className="btn" id="bt_file"><Glyphicon glyph="pencil" />
                //</button>
                //<button className="btn" id="bt_removefile"><Glyphicon glyph="remove" /></button>
                }
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       <button className="btn" style={{margin:"20px 20px 20px 20px"}} id="bt_clearid" onClick={this.handleCopy}>复制</button>
       </div>
        <div id="id_usepacks" hidden={this.state.hiddenPacks}>
        <UsePacks2  contact_id={this.state.contact.id}/>
        </div>
                </Modal.Body>
        </Modal>
    );
  }
};
//App//////////////////////
class App extends React.Component {
  mystate = {
    start:0,
    limit:10,
    total:0,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
    contacts: [],
    user: "AnonymousUser",
    start:0,
    total:0,
    search:"",
    baoxiang:"",
    start_input:1,
    currentIndex:null,
    connect_error:false,
  }
  componentDidMount=() => {
    // socket.on("connect_error",()=>{
    //   this.setState({connect_error:true});
    // })
    // socket.on("connect",()=>{
    //   this.setState({connect_error:false});
    // })
    this.load_data();
  }
  load_data=()=>{
    socket.emit("/get/Contact",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts) => {
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.mystate.total=contacts.total;//because async ,mystate set must before state;
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts.total,
          start:this.mystate.start
        });
    });
  };
  handleContactChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({contacts:contacts2});
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.load_data();
  };
  handleLogout = () => {
    console.log("logout");
    // Client.logout((data) => {
    //   console.log("logout" + data);
    //   this.setState({
    //     logined: false,
    //     user: "AnonymousUser",
    //     total:0,
    //     start:0,
    //   });
    //   this.handleUserChange(this.state.user);
    // });
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  };
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    this.load_data();
  };
  search = (e) => {
    this.mystate.start=0;
    this.load_data();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.load_data();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };


  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.load_data();
  };
  onSelectBaoxiang=(e) => {
    this.mystate.baoxiang=e;
    this.setState({baoxiang:e});
    this.load_data();
  }
  auto_change=(event, value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      socket.emit("/get/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  }
  onLoginSubmit= (data) => {
    console.log(data);
    // Client.login(data.username, data.password, (res) => {
    //   if (res.success) {
    //     this.setState({
    //       logined: true,
    //     });
    //     this.setState({
    //       user: data.username
    //     });
    //     this.handleUserChange(this.state.user);
    //   }
    // });
  };
  handleEdit=(idx)=>{
    //this.setState({currentIndex:idx});
    this.refs.contactedit.open2(idx);
  }
  opendlgurl=(url,parent,idx,data)=>{
    this.currentIndex=idx;
    this.refs.dlgurl.open(url,data,this.handleContactChange2); 
  }
  openDlgItems=()=>{
    this.refs.dlgitems.open();
  }
  opendlgfolder=(contactid)=>{
     //this.refs.dlgfolder.open(contactid); 
     socket.emit("/folder",{yiqibh:contactid},()=>{});
  }
  opendlgcheck=(contactid,yiqibh)=>{
   this.refs.dlgcheck.open(contactid,yiqibh); 
  }
  openDlgPacks=()=>{
    this.refs.dlgpacks.open();
  }
  openDlgCopyPack=()=>{
    this.refs.dlgcopypack.open();
  }
  openDlgStat=()=>{
    this.refs.dlgstat.open();
  }
  openDlgImport=()=>{
    this.refs.dlgimport.open();
  }
  openDlgImportHT=()=>{
    this.refs.dlgimportHT.open();
  }
  onDetailClick=(contactid)=>{
        const BrowserWindow = require('electron').remote.BrowserWindow
        const path = require('path')
        const modalPath = path.join('file://', __dirname, '../t_装箱单.htm')
        let win = new BrowserWindow({ width: 800, height: 600 })
        win.on('close', function () { win = null })
        console.log(modalPath);
        win.loadURL(modalPath)
        win.show()
  }
//   const BrowserWindow = require('electron').remote.BrowserWindow
// const path = require('path')

// const newWindowBtn = document.getElementById('new-window')

// newWindowBtn.addEventListener('click', function (event) {
//   const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
//   let win = new BrowserWindow({ width: 400, height: 320 })
//   win.on('close', function () { win = null })
//   win.loadURL(modalPath)
//   win.show()
// })
  render() {
    console.log("render=========================");
    const contactRows = this.state.contacts.map((contact, idx) => (
      <tr key={idx} >
        <td>{contact.id}</td>
        <td>{contact.yonghu}</td>
        <td>{contact.addr}</td>
        <td>{contact.channels}</td>
        <td>{contact.yiqixinghao}</td>
        <td>
          <a onClick={()=>this.handleEdit(idx)}>{contact.yiqibh}</a>
           <DropdownButton title="" id="id_dropdown3">
            <MenuItem onSelect={() => this.onDetailClick(contact.id)}>详细</MenuItem>
            <MenuItem onSelect={()=>this.opendlgurl("/rest/updateMethod",this,idx,{id:contact.id})}>更新方法</MenuItem>
            <MenuItem onSelect={()=>this.opendlgwait(contact.id)}>全部文件</MenuItem>
            <MenuItem onSelect={()=>this.opendlgcheck(contact.id,contact.yiqibh)}>核对备料计划</MenuItem>
            <MenuItem onSelect={()=>this.opendlgfolder(contact.yiqibh)}>资料文件夹</MenuItem>
            
          </DropdownButton>
        </td>
        <td>{contact.baoxiang}</td>
        <td>{contact.shenhe}</td>
        <td>{contact.yujifahuo_date}</td>
        <td>{contact.tiaoshi_date}</td>
        <td>{contact.hetongbh}</td>
        <td>{contact.method}</td>
      </tr>
    ));
    var hasprev=true;
    var hasnext=true;
    let prev;
    let next;
    console.log(this.mystate);
    console.log(this.state);
    if(this.state.start===0){
      hasprev=false;
    }
    if(this.state.start+this.state.limit>=this.state.total){
      hasnext=false;
    }
    if (hasprev){
      prev=(<a onClick={this.handlePrev}>前一页</a>);
    }
    else{
      prev=null;
    }
    if(hasnext){
      next=(<a onClick={this.handleNext}>后一页</a>);
    }
    else{
      next=null;
    }
    return (
    <div id="todoapp" className="table-responsive">
    <div align="center" style={{display:this.state.connect_error?"":"none",textAlign: "center",color:"red"}} >!!!!!!!!!!连接错误!!!!!!!</div>
    <ContactEdit2New ref="contactedit" parent={this}   index={this.state.currentIndex} title="编辑"  />
    <DlgItems ref="dlgitems" />
    <DlgPacks ref="dlgpacks" />
    <DlgCopyPack ref="dlgcopypack" />
    <DlgStat ref="dlgstat" />
    <DlgImport ref="dlgimport" />
    <DlgCheck ref="dlgcheck" />
    <DlgFolder ref="dlgfolder" />
    <DlgWait ref="dlgwait" />
    <DlgUrl ref="dlgurl" />
    <Navbar className="navbar-inverse">
      <Navbar.Header>
        <Navbar.Brand>
          <a>装箱单</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">合同</NavItem>
        <NavItem eventKey={2} href="#" onClick={this.openDlgPacks}>包</NavItem>
        <NavItem eventKey={3} href="#" onClick={this.openDlgItems}>备件</NavItem>
        <NavItem eventKey={4} href="#" onClick={this.openDlgCopyPack}>复制包</NavItem>
        <NavItem eventKey={5} href="#" onClick={this.openDlgStat}>统计</NavItem>
      </Nav>
    </Navbar>
    <table>
    <tbody>
    <tr>
       <td>
       {
         // <DropdownButton title={this.state.user} id="id_dropdown1">
         //    <li hidden={this.state.user!=="AnonymousUser"}>
         //      <ExampleModal onLoginSubmit={this.onLoginSubmit} title="登录" />
         //    </li>
         //    <li  hidden={this.state.user==="AnonymousUser"} >
         //      <a onClick={this.handleLogout}>注销</a>
         //    </li>
         // </DropdownButton>
       }
      </td>
    <td>
          <input type="text" value={this.state.search}  placeholder="合同 or 仪器编号" onChange={this.handleSearchChange} />
          <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
    </td>
    <td>
         <button className="btn btn-primary" onClick={()=>this.handleEdit(null)}>新仪器</button>
    </td>
     <td>
   <button className="btn btn-info" onClick={this.openDlgImport}>导入标样</button>
  </td>
    <td>过滤:
    <DropdownButton title={this.state.baoxiang} id="id_dropdown2">
      <MenuItem onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("")}>*</MenuItem>
    </DropdownButton>
  </td>
  </tr>
  </tbody>
  </table>
  <table className="table-bordered"><thead><tr><th>ID</th><th>用户单位</th><th>客户地址</th><th>通道配置</th><th>仪器型号</th><th>仪器编号</th><th>包箱</th><th>审核</th>
  <th>入库时间</th><th>调试时间</th><th>合同编号</th><th>方法</th></tr></thead><tbody id="contact-list">{contactRows}</tbody>
  </table>{prev}
  <label id="page">{this.state.start+1}../{this.state.total}</label>{next}
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
      <div style={{minHeight:"200px"}}></div>
  </div>
    );
  }
}
//db.serialize(function() {
  ReactDOM.render(<App />, document.getElementById('app'));
//});

