import parse from './decode.js';
import encode from './encode.js'
var out={}
out.parse = parse;
out.stringify = encode;
export default out;
