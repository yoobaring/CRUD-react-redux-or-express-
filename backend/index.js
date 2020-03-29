let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let router = express.Router();

app.use(cors());
app.use('/api',bodyParser.json(), router)   
app.use('/api',bodyParser.urlencoded({ extended: false}),router);

let students = [{
                 'no':0,'name':'suraiya','surname': 'baring','id': '5735512165','Major':'CoE','GPA':'2.10'},
                {'no':1,'name':'chalit','surname': 'suporntawee','id': '5735512168','Major':'CoE','GPA':'2.00'}
            ];
              
router.route('/students')     
        .get((req,res) => res.json(students))
        .post( (req, res)=> {
            let student = {};
            student.no =  students[students.length-1].no+1;
            student.name = req.body.name
            student.surname = req.body.surname
            student.id= req.body.id
            student.Major = req.body.Major
            student.GPA = req.body.GPA
            students.push(student);
            res.json( {message: 'students created!'} )
            })
router.route('/students/:student_id')
        .get((req,res)=>{
           let no = req.params.student_id
           let index = students.findIndex(student =>(student.no === +no))
           res.json(students[index])
           })
       
        .put((req,res)=>{
           let no = req.params.student_id
           let index = students.findIndex(student =>(student.no === +no))
           students[index].id = req.body.id;
           students[index].name = req.body.name;
           students[index].surname = req.body.surname;
           students[index].Major = req.body.Major;
           students[index].GPA = req.body.GPA;
           res.json({message: 'Student updated!'+ req.params.student_id});
          })
               
        .delete((req,res)=>{
           let no = req.params.student_id
           let index = students.findIndex(student =>(student.no === +no))
           students.splice(index,1)
           res.json({message: 'Student deleted!'+ req.params.student_id});
          })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, ()=>{console.log('Server is runing')})