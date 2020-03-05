import express  from'express';
import request  from 'superagent';
import redis    from 'redis';

const client    = redis.createClient();
const app       = express();
const key       = 'data';

class Main {

    run(port:number) {

        app.get('/users', this.cache, function(req:any, res:any){

            request.get(`https://jsonplaceholder.typicode.com/todos`, function (err:any, response:any) {
                if (err) throw err;
    
                let data = response.body;

                client.setex(key, 3600, JSON.stringify(data));
    
                res.send(data);
            });
            
        });

        app.listen(port, function () {
            console.log(`listening on port ${port}`)
        });
        
    }

    cache(req:any, res:any, next:any) {
        client.get(key, function (err:any, data:any) {
            if (err) throw err;
    
            if (data != null) {
                res.send(data);
            } else {
                next();
            }
        });
    }
}

let main$ = new Main;
main$.run(3000);
