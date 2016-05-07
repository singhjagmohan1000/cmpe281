/**
 * Created by Jagmohan on 4/9/16.
 */
var http= require("http");

exports.checkOut=function(req,res){

    var email = req.session.data.email;
    console.log(email);
    var options = {
        host: 'ec2-52-72-113-55.compute-1.amazonaws.com',
        port: 7777,
        path: "/mongoserver/cart/"+email,
        method: 'DELETE'
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
            {
                res.status(200).send(data);}
            else
                res.status(404).send({"data":"Failed to Get Cart"});
        });
    }

    http.get(options, callback).end();

};
