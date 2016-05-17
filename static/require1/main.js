require.config({
    paths: {
        jquery: '/static/require1/jquery'
    }
});
 
require(['jquery'], function($) {
    alert($().jquery);
});