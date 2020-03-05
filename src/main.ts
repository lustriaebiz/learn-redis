import axios     from 'axios';

require('dotenv').config();
const url = String(process.env.URL);

class Main {

    run() {

        axios(url).then(response => {
            

        }).catch(error => {
            console.log('Error: ', error);
            
        });
        
    }

}

let main = new Main;

main.run();



