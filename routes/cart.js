/**
 * Created by Jagmohan on 4/9/16.
 */
var http= require("http");
exports.addCart=function(req,res){
    var item = req.param('item_id');
    var email = req.session.data.email;
    var category=req.param('category');
    var quan=req.param('quantity');
    var count=0;
    var c=quan;
console.log(item);
    console.log(email);
    var options = {
        host: 'ec2-52-72-113-55.compute-1.amazonaws.com',
        port: 7777,
        path: "/mongoserver/cart/addItem/"+email+"/"+category+"/"+item,
        method: 'PUT'
    };

    callback = function(response) {
        var str = '';

        console.log(response.statusCode);
        response.on('error',function(){
            console.log("Error in response: "+"\n"+str);

        })
        response.on('data', function (chunk) {

            str += chunk;

        });


        response.on('end', function () {

            var data = JSON.parse(str);

            console.log(response.statusCode);
            count++;

            if(response.statusCode===200)
            {console.log(data.items);
                console.log(data.items.length);
                if(count===c)
                res.status(200).send(data);}
            else
                res.status(404).send({"data":"Failed to ad Cart"});
        });
    }
    while(quan!=0)
    {http.request(options, callback).end();
        console.log(options);
    quan--;
    }

};
exports.getCart=function(req,res){

    var email = req.session.data.email;
console.log(email);
    var options = {
        host: 'ec2-52-72-113-55.compute-1.amazonaws.com',
        port: 7777,
        path: "/mongoserver/cart/"+email,
        method: 'GET'
    };

    callback = function(response) {
        var str = '';

        console.log(response.statusCode);
        response.on('error',function(){
            console.log("Error in response: "+"\n"+str);

        })
        response.on('data', function (chunk) {
            str += chunk;
        });


        response.on('end', function () {
            var data = JSON.parse(str);

            console.log(response.statusCode);
            if(response.statusCode===200)
            { console.log(data.items);
            console.log(data.items.length);
                res.status(200).send(data);}
            else
                res.status(404).send({"data":"Failed to Get Cart"});
        });
    }

    http.get(options, callback).end();

};
exports.removeCart=function(req,res){
    var item = req.param('item_id');
    var email = req.session.data.email;
    var quan=req.param('quantity');
    var count=0;
    var c=quan;
    var options = {
        host: 'ec2-52-72-113-55.compute-1.amazonaws.com',
        port: 7777,
        path: "/mongoserver/cart/removeItem/"+email+"/"+item,
        method: 'PUT'
    };

    callback = function(response) {
        var str = '';

        console.log(response.statusCode);
        response.on('error',function(){
            console.log("Error in response: "+"\n"+str);

        })
        response.on('data', function (chunk) {
            str += chunk;
        });


        response.on('end', function () {

            var data = JSON.parse(str);

            console.log(response.statusCode);
            count++;

            if(response.statusCode===200)
            {console.log(data.items);
                console.log(count+"*********");
                if(count===c)
                    res.status(200).send(data);}
            else
                res.status(404).send({"data":"Failed to ad Cart"});
        });
    }

    while(quan!=0)
    {http.request(options, callback).end();
        console.log(options);
        quan--;
    }

};