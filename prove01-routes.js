const fs = require('fs');


const requestHandler = (req,res) => {

    const url =req.url;
    const method = req.method;
    
    if (url === '/') {
    
        res.write('<html>');
        res.write('<title>Prove Assignment 01</title>');
        res.write('<body>');
        res.write('<h1> Hello and Welcome!</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name= "username">');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/users') {
        res.write('<html>');
        res.write('<title>Users</title>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li> User01 </li>');
        res.write('<li> User02 </li>');
        res.write('<li> User03 </li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/create-user' && method ==='POST') {
        const data = [];
        req.on('data', (chunk) => {
            data.push(chunk);
        });

        return req.on('end', () => {

            const parsedData = Buffer.concat(data).toString();
            const message = parsedData.split('=')[1];
            console.log(message);
        
        });


    
        
    }
    
    
    
    };

    exports.handler = requestHandler;