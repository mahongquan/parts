// load jquery and jquery-ui if needed
// into window.jQuery
if (typeof window.jQuery === 'undefined') {
  document.write('<script type="text/javascript"  src="/static/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"><\/script><script type="text/javascript"  src="/static/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"><\/script><link type="text/css" rel="stylesheet" href="/static/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.min.css" />');
} else if(typeof window.jQuery.ui === 'undefined' || typeof window.jQuery.ui.autocomplete === 'undefined') {
  document.write('<script type="text/javascript"  src="/static/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"><\/script><link type="text/css" rel="stylesheet" href="static/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.min.css" />');
}
