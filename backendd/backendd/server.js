
const express = require('express');
const nodemailer = require('nodemailer');
const {OAuth2Client} = require('google-auth-library');
const mysql = require('mysql2');
const fs = require('fs')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer  = require('multer');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {cors: {origin: "*"}});

app.use(bodyParser.json({ limit: '10mb' }));

const APP_PORT = 3000
const APP_HOST = 'localhost'
const GOOGLE_MAILER_CLIENT_ID = '519884953680-po7qcr17gtqqv4ossiv5qlin5agigjvh.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04SmLG6bf9t5FCgYIARAAGAQSNwF-L9IrJqP_fBqxDQ6TFsA2On6AJGokhYapQqkt9ggrmE8e1kgBSg40YFEKNV1uThPy6Plv0aw'
const ADMIN_EMAIL_ADDRESS = 'nhatthanh12092001@gmail.com'

app.use(cors(
    {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    }
));
app.use(express.static(__dirname + '/public/images'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "registerr"
})

// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})
// Tạo API /email/send với method POST
app.post('/email/send', async (req, res) => {
  try {
    // Lấy thông tin gửi lên từ client qua body
    const { email, subject, content } = req.body
    if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token
    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken
      }
    })
    // mailOption là những thông tin gửi từ phía client lên thông qua API
    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: subject, // Tiêu đề email
      html: `<h3>${content}</h3>` // Nội dung email
    }
    // Gọi hành động gửi email
    await transport.sendMail(mailOptions)
    // Không có lỗi gì thì trả về success
    res.status(200).json({ message: 'Email sent successfully.' })
  } catch (error) {
    // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
    console.log(error)
    res.status(500).json({ errors: error.message })
  }
})

const adminNamespace = io.of('/admin');
const clientNamespace = io.of('/client');

adminNamespace.on('connection', (socket) => {
  console.log('Admin connected');

  socket.on('sendNotification', (data) => {
    // Lưu thông báo vào cơ sở dữ liệu
    const { title, message } = data;
    console.log(data.title)
 
    const insertQuery = 'INSERT INTO notification (`message`, `title`) VALUES (?, ?)';
    console.log(insertQuery)
    db.query(insertQuery, [message, title], (err, result) => {
      if (err) {
        console.error('Error inserting notification into database:', err);
      } else {
        clientNamespace.emit('notification', { title, message});
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Admin disconnected');
  });
});

clientNamespace.on('connection', (socket) => {
  console.log('Client connected');

  // Truy vấn thông báo từ cơ sở dữ liệu
  const selectQuery = 'SELECT * FROM notification';
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching notifications from database:', err);
    } else {
      // Gửi thông báo đã lưu trong cơ sở dữ liệu cho khách hàng
      results.forEach((notification) => {
        socket.emit('notification', { message: notification.message, title: notification.title});
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



app.post('/registerr', (req, res)=>{
    const sql = "INSERT INTO login (`username`,`phonenumber`,`email`,`password`) VALUES (?)";
    const salt = 10;
    bcrypt.hash(req.body.password.toString(), salt, (err, hash)=>{
      if(err) return res.json({Error: "Error for hassing password"});
    })
    console.log(bcrypt.hash(req.body.password.toString(), salt))
    const values = [
        req.body.username,
        req.body.phonenumber,
        req.body.email,
        hash
    ]
    db.query(sql, [values], (err, data)=>{
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM login WHERE email = ? ";
    
    db.query(sql, [req.body.email], (err, data)=>{
        if(err) {
            return res.json({Message:"Your Email or Password is not correct!!"});
        }
        if(data.length > 0){
            const Name = data[0].username;
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
              if (err) {
                return res.json({Status: "Success"})
              if(response) {
                return res.json({Error: "Password not match"})
              }
              }
            })
            console.log(data[0])
            const token = jwt.sign({Name}, "PrivateKey123@#", {expiresIn:'1d'});
            res.cookie('token', token);
            res.cookie('emailUser', req.body.email);
            res.cookie('usernameUser', data[0].username);
            res.cookie('phonenumberUser', data[0].phonenumber);
            res.cookie('Uid', data[0].id);
            return res.json({Status:"Success"})
        }else{
            return res.json({Message:"Faile"});
        }
    })
})

app.get('/verifyuser', (req, res, token) =>{
    const token1 = req.query.token1;
    if(!token1){
        return res.json({Message:"we need token pls"});
    }else{
        jwt.verify(token1, "PrivateKey123@#", (err, decoded)=>{
            if(err){
                return res.json({Message:"Auth Error"})
            }else{
                req.Name = decoded.Name;
                return res.json({Status: "Success"})
            }
        })
    }
    
})

app.get('/logout',(req, res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.get('/customer',(req, res)=>{
    const q = "SELECT * FROM login";
    db.query(q, (err, data)=>{
        if(err) {
            console.log(err)
        return res.json(err)
    }
        return res.json(data)
    })
});

app.post("/customer", (req, res)=>{
    const q = "INSERT INTO login(`username`,`phonenumber`,`email`) VALUES (?)";
    const values = [req.body.username, req.body.phonenumber, req.body.email];

    db.query(q, [values], (err, data)=>{
        if(err) return res.send(err)
        return res.json(data);
    })
})

const upload = multer({ dest: 'public/images/' })
console.log(__dirname + '/public/images')
app.get('/images/:imageName', (req, res) => {

    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res)
  })

app.post('/addproducts', upload.single('image','Brand','Price','Name','Description','quantity'), (req, res)=>{
    console.log(req.file)
    const imageName = req.file.filename
    const imgsrc = 'http://localhost:8081/' + imageName;
    console.log((`${__dirname}/public/images/`) + imageName)
    res.send({ imageName})
    
    if (!req.file.filename) {
        console.log("a")
        const error = new Error('Please upload a file');
        console.error(error);
        return res.status(400).json({ error: 'Please upload a file' });
        }else{
            console.log("b")
        const query = 'INSERT INTO product_management (`Name`,`Brand`,`Price`,`Description`,`image`,`quantity`) VALUES (?)';
        const product_values = [
            req.body.Name,
            req.body.Brand,
            req.body.Price,
            req.body.Description,
            imgsrc,
            req.body.quantity,

        ]
        console.log(product_values)
        db.query(query, [product_values], (err,  data) => {
          if (err) {
            console.error('Error uploading data to MySQL:', err);
            return res.status(500).json({ error: 'Error uploading data' });
          } else {
            console.log("Successfull" +data.affectedRows);
            return res.json({ insertID: data.insertID });
          }
        });
    }
})

app.get('/getData', (req, res) => {
    const query = 'SELECT * FROM product_management'; 
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Lỗi khi thực hiện truy vấn MySQL:', err);
        res.status(500).send('Lỗi khi truy vấn dữ liệu từ MySQL');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM product_management WHERE ID = '${req.params.id}'`;
    db.query(sql, [productId], (error, results) => {
      if (error) {
        console.error('Lỗi khi thực hiện truy vấn MySQL:', error);
        res.status(500).send('Lỗi khi truy vấn dữ liệu từ MySQL');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/updateProduct/:id', (req, res) => {
    const IdProduct = req.params.id;
    console.log( req.params.id)
    const updatedData = [
        req.body.name,
        req.body.brand,
        req.body.price,
        req.body.image,
        req.body.quantity,
        req.body.description,
        req.body.category,
    ]
    const query = `UPDATE product_management SET Name = '${req.body.name}', Brand = '${req.body.brand}', Price = '${req.body.price}', quantity = '${req.body.quantity}', Description = '${req.body.description}', Category = '${req.body.category}' WHERE ID = '${req.params.id}'`;
    console.log(query)
    db.query(query, [...updatedData, IdProduct], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Error updating data' });
      } else {
        res.json({ message: 'Data updated successfully' });
      }
    });
  });
 
  app.delete('/deleteProduct/:id', (req, res) => {
    const productId = req.params.id;
    
    const sql = `DELETE FROM product_management WHERE ID = '${req.params.id}'`;

    db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting:', err);
      res.status(500).json({ message: 'Error deleting ' });
    } else {
      console.log('Deleted successfully');
      res.status(200).json({ message: 'Deleted successfully' });
    }
  });
});

///////////////

app.post('/updateUser/:id', (req, res) => {
    const userid = req.params.id;
  console.log(userid)
    const updatedUser = [
        req.body.username,
        req.body.phonenumber,
        req.body.email,
    ]
    const query = `UPDATE login SET username = '${req.body.username}', phonenumber = '${req.body.phonenumber}', email = '${req.body.email}' WHERE id = '${req.params.id}'`;
    console.log(query)
    db.query(query, [...updatedUser, userid], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Error updating data' });
      } else {
        res.json({ message: 'Data updated successfully' });
      }
    });
  });

  app.get('/getUser', (req, res) => {
    const user_Id = req.body.id;
    console.log(req.body.id)
    const sql = `SELECT * FROM login WHERE id = '${req.body.id}'`;
    db.query(sql, [user_Id], (error, results) => {
      if (error) {
        console.error('Lỗi khi thực hiện truy vấn MySQL:', error);
        res.status(500).send('Lỗi khi truy vấn dữ liệu từ MySQL');
      } else {
        res.json(results);
      }
    });
  });
  //////////

  app.post('/addOrder', async (req, res) => {
    try {
      const { customerName, customerEmail, customerPhonenumber, customerAddress, customerIdNum, status, cartItems, Paymentmethod, totals } = req.body;
      console.log(req.body.totals)
      if (!Array.isArray(cartItems)) {
        return res.status(400).json({ error: 'Invalid cartItems format' });
      }
      if (!customerName || !customerEmail || !customerPhonenumber || !customerAddress || !customerIdNum || !Paymentmethod || totals === undefined) {
        return res.status(401).json({ error: 'Missing or invalid required fields in the request' });
      }
      
      const [orderId] = await db.promise().execute(
        'INSERT INTO orders (CustomerName, CustomerEmail, CustomerPhonenumber, CustomerAddress, CustomerIDNum, Paymentmethod, TotalPrice) VALUES (?, ?, ?, ? ,? ,?, ?)',
        [customerName, customerEmail, customerPhonenumber, customerAddress, customerIdNum, Paymentmethod , totals]
      );
      for (const item of cartItems) {
         await db.promise().execute(
          'INSERT INTO order_items (orders_ID, product_id, quantity, price, ProductName) VALUES (?,?,?,?,?)',
          [orderId.insertId.toString(), item.id, item.quantity, item.price, item.name]
        );
      }
  
      res.status(200).json({ message: 'Order added successfully' });
    } catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({ error: 'An error occurred while adding the order' });
    }
  });

  app.get('/getOrders', async (req, res) => {
    try {
      const [rows] = await db.promise().execute('SELECT * FROM orders');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
  });

  app.get('/getOrderDetails', async (req, res) => {
    try {
      const [rows] = await db.promise().execute('SELECT * FROM order_items');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
  });
  
  // app.get('/getOrders', (req, res) => {
  //   res.json(orders);
  // });
  
  app.post('/updateStatus', (req, res) => {
    const orderId = parseInt(req.query.orderId);
    const stt  = req.query.stt;
    const query = `UPDATE orders SET status = '${req.query.stt}' WHERE ordersID = '${parseInt(req.query.orderId)}'`;
    console.log(query)
    db.query(query, [...stt, orderId], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Error updating data' });
      } else {
        res.json({ message: 'Data updated successfully' });
      }
    });
  });

  app.post('/cancelOrder/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const newStatus = 'Cancelled'; // Đánh dấu đơn hàng đã bị hủy
  
    const sql = `UPDATE orders SET status = ? WHERE ordersID = ?`;
  
    db.query(sql, [newStatus, orderId], (err, result) => {
      if (err) {
        console.error('Error cancelling order:', err);
        res.status(500).json({ message: 'Error cancelling order' });
      } else {
        console.log('Order cancelled successfully');
        res.status(200).json({ message: 'Order cancelled successfully' });
      }
    });
  });
  

  app.get('/getOrdersByCustomerName/:customerName', async (req, res) => {
    const  customerName  = req.params.customerName;
  
    try {
      const [rows] = await db
        .promise()
        .execute('SELECT * FROM orders WHERE CustomerName = ?', [customerName]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'No orders found for this customer' });
      } else {
        res.json(rows);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
  });

  app.get('/getOrderDetail/:orderId', async (req, res) => {
    const orderId  = req.params.orderId;
    console.log(orderId)
    try {
      const [rows] = await db
        .promise()
        .execute('SELECT * FROM order_items WHERE orders_ID = ?', [orderId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json(rows);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'An error occurred while fetching order details' });
    }
  });

  app.delete('/cancelProduct/:productId', (req, res) => {
    const productId = req.params.productId;
    const sql = `DELETE FROM order_items WHERE ID = '${req.params.productId}'`;
  
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error('Lỗi khi huỷ sản phẩm:', err);
        res.status(500).json({ message: 'Lỗi khi huỷ sản phẩm' });
      } else {
        console.log('Đã huỷ sản phẩm thành công');
        res.status(200).json({ message: 'Đã huỷ sản phẩm thành công' });
      }
    });
  });

  ////////////////////////////////////////////////////////
  
app.get('/getData/:category', async(req, res) => {
  const category = req.params.category;
  console.log(req.params.category)
 try {
      const [rows] = await db
        .promise()
        .execute('SELECT * FROM product_management WHERE Category = ?', [category]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'No orders found for this customer' });
      } else {
        res.json(rows);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
    }
});

// app.listen(8081, ()=>{
//     console.log("listening");
// }) 
server.listen(8081, () => {
  console.log('Server is running on port 8081');
});

