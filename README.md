Linkage plugin of jquery
=====

Linkage plugin, load width [seajs](http://seajs.org/)

###json data format###

	var data = [{id: 1, pid: 0, name: '广东省'}, {id: 2, pid: 1, name: '广州市'}, {id: 3, pid: 2, name: '增城区'}]
	
###params

   new linkage('#linkage', data);// `#linkage` is the selector of the element to render, `data` is the json data

   `onChange` event, callback will get a object of the last one of the linkage data, for example `{id: 3, pid: 2, name: '增城区'}`

###usage###

	<div id="linkage"></div>
    <script src="./lib/sea-module/seajs/2.1.1/sea.js"></script>
    <script src="data.js"></script>
    <script>
        seajs.config({
            base:'./lib/sea-module',
            alias:{
                'jquery': 'jquery/jquery/1.10.1/jquery-debug.js',
                'linkage': 'linkage/linkage.js'
            },
            preload: ["jquery"]
        });

        seajs.use(['linkage'], function(linkage){
            var lk = new linkage('#linkage', data); // data in data.js, json format
            lk.init();
            lk.bind();
            lk.onChange = function(data){console.log(data.name);//增城区};
        });
    </script>

demo [http://jjfeng.org/demo/linkage/](http://jjfeng.org/demo/linkage/)
