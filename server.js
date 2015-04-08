var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path    = require('path'),
    dust = require("dustjs-linkedin"),
    dust_helpers = require("dustjs-helpers"),
    cons = require('consolidate'),
    events = require('events'),
    emitter = new events.EventEmitter(),
    Q = require('q'),
    mysql      = require('mysql'),
    authCredential = require('./auth-token'),
    Imap = require('imap');

var done = false;

var connection = mysql.createConnection({
  host     : authCredential['connection']['host'],
  user     : authCredential['connection']['user'],
  password : authCredential['connection']['password'],
  database : authCredential['connection']['database'],
  port : authCredential['connection']['port']
});
   

var app = express();
app.use(express.bodyParser({
    keepExtensions: true
}));
app.use(express.cookieParser('pdpcookie'));
app.use(express.session());

//app.use(express.statics(ckStaticsPath));

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/templates');

// For logging requests
// app.use(express.logger('dev'));

// this should always be above the wildcard route
app.get('/login', function (req, res) {
    var isError = req.query.error;
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'login'
        }]
    });
});

function auth(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

// dashboard
app.get('/', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'dashboard',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

    
});

// Create Questions page
app.get('/createquest', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'createquestion',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

    
});

// Create preview page
app.get('/prev', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'preview',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

    
});

// edit topic page
app.get('/edittopic', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'edittopic',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

});

// add subject page
app.get('/edittopic/addnewtopic', auth, function (req, res) {
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'addtopic',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});
// edit level page
app.get('/editlev', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editlevel',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add level page
app.get('/editlevel/addnewlevel', auth, function (req, res) {
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'addlevel',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});
// add editonelevel page
app.get('/editonelevel', auth, function (req, res) {
       // console.log("here");
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editnewlevel',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add editonetopic page
app.get('/editonetopic', auth, function (req, res) {
       // console.log("here");
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editnewtopic',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add editoneapprover page
app.get('/editoneapprover', auth, function (req, res) {
       // console.log("here");
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editnewapprover',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add editonepermission page
app.get('/editonepermission', auth, function (req, res) {
       // console.log("here");
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editnewpermission',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// edit approver page
app.get('/editappvr', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editapprover',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add approver page
app.get('/addapprover', auth, function (req, res) {
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'addapprvr',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// edit question type page
app.get('/edittyp', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'edittype',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

});

// add type page
app.get('/edittopic/addnewtype', auth, function (req, res) {
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'addtype',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add editonetype page
app.get('/editonetype', auth, function (req, res) {
       // console.log("here");
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editnewtype',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// edit question state page
app.get('/editstate', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editstate',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

});


// add state page
app.get('/edittopic/addnewstate', auth, function (req, res) {
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'addstate',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// add editonestate page
app.get('/editonestate', auth, function (req, res) {
       // console.log("here");
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editnewstate',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

// edit permission page
app.get('/editpermissn', auth, function (req, res) {

    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'editpermission',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });

});


// add permission page
app.get('/editpermission/addnewpermission', auth, function (req, res) {
    //console.log(accountsJSON, talentpoolJSON, openpositionsJSON);
    res.render('MasterPageTemplate', {
        "Pages": [{
            'pagetype': 'addpermission',
            'username' : req.session.username,
            'userid' : authCredential['userid'],
            'approverid' : authCredential['approverid']
        }]
    });
    
});

app.post('/login', function (req, res) {
    var email = req.body.email,
        password = req.body.password;


    /*var imap = new Imap ({
        user: email,
        password: password,
        host: '192.168.1.2',
    });
    imap.connect();
    
    imap.once('ready', function() {
        console.log(imap);

    });

    imap.once('error', function(err) {
      console.log(err);
    });
     
    imap.once('end', function() {
      console.log('Connection ended');
    });
    */
     
    
        
    if(authCredential['login'][email] && authCredential['login'][email] == password){
        req.session.regenerate(function () {
            req.session.isAuthenticated = true;
            req.session.token = email+(new Date()).getTime();
            req.session.email = email;
            req.session.username = email.split('@')[0];
            res.redirect('/');
        });
    } else {
        res.redirect('/login?error');
    }
});

//Logout User session
app.get('/logout', function (req, res) {

    req.session.destroy();
    res.redirect('/login');
    
});

/*
*** Route Service to Provide Subjects from Database
*/
app.get('/qba/subjects', function (req, res) {
   
    //connection.query('SELECT SubjectId , SubjectName from Subjects', function(err, rows, fields) {   
        connection.query('SELECT * from Subjects', function(err, rows, fields) {
        //connection.end();
        if (!err){
            //console.log('The Subjects are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });

    
});

/*app.post('/EOL', function (req, res) {
    var editonelevel = req.body.QuestionLevelId;
        console.log(editonelevel);
            //console.log('The subTopics are: ', rows);
            res.redirect('/editonelevel');
            res.end(JSON.stringify(editonelevel));

    
});*/

/*
*** Route Service to Provide SubTopics from Database for Selected Subject
*/
app.post('/qba/subtopics', function (req, res) {
    var selectedSubject = req.body.subjectid;
    connection.query('SELECT SubTopicId , Title from SubTopics where SubjectId = "'+selectedSubject+'"', function(err, rows, fields) {

        if (!err){
            //console.log('The subTopics are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});
/**
Route service to add new topic to Database
**/
app.post('/addnewtopic', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    console.log(JSON.stringify( req.body));
    var subjectname = req.body.Subjectname; 
    var description= req.body.Description;        
        var lastRow = "";
    connection.query('SELECT SubjectId FROM Subjects ORDER BY SubjectId DESC LIMIT 1', function(err, rows, fields) {
        if (!err){
           lastRow = (rows.length > 0 )?rows[0].SubjectId : "";
           console.log("lastRow",rows[0].SubjectId);
            var subjectId = (lastRow != "") ? "sb-"+(Number(lastRow.split('-')[1]) + 1) : "sb-1";
            console.log(subjectId);
            Update(subjectId,subjectname,description);
        }  else {
            console.log('Error while performing Query.',err);
        }
        
    });


    function Update(subjectId,subname,des){
    var obj = {};

    obj['SubjectId'] = subjectId;
    obj['SubjectName'] = subname;
    obj['Description'] = des;
    

    console.log('obj+++++'+JSON.stringify(obj));
    connection.query('INSERT INTO Subjects SET ?', obj, function(err, rows , fields){
    //connection.query('INSERT INTO Subjects SET ? SELECT * FROM (SELECT'+"'"+SubjectId+"'","'"+SubjectName+"'", "'"+Description+"'"+') AS tmp WHERE NOT EXISTS (
    //SELECT SubjectName FROM Subjects WHERE SubjectName = '+"'"+SubjectName+"'"), obj, function(err, rows , fields){
 

        if (!err){
            console.log("success");
   //     console.log('The Answertypes are: ', rows);
            //res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log('data'+JSON.stringify(rows));

             //res.redirect('/edittopic');
            //res.end(JSON.stringify(rows));
            
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
}
});


/**
Route service to add new level to Database
**/
app.post('/addnewlevel', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['QuestionLevelId'] = parameters['levelid'];
    obj['LevelName'] = parameters['levelname'];
    obj['Description'] = parameters['leveldescription'];
    //obj['Flag'] = parameters['Flag'];

    console.log(obj);
    connection.query('INSERT INTO QuestionLevel SET ?', obj, function(err, rows , fields){


        if (!err){
            console.log("success");
           //console.log('The Answertypes are: ', rows);
             //res.redirect('/editlev');

            //res.writeHead(200, { 'Content-Type': 'application/json' });
            //res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});


/**
Route service to add new type to Database
**/
app.post('/addnewtype', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['QuestionLevelId'] = parameters['levelid'];
    obj['State'] = parameters['State'];
    obj['Description'] = parameters['Description'];
    //obj['Flag'] = parameters['Flag'];

    console.log(obj);
    connection.query('INSERT INTO QuestionType SET ?', obj, function(err, rows , fields){


        if (!err){
            console.log("success");
           
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});

/**
Route service to add new state to Database
**/
app.post('/addnewstate', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['QuestionLevelId'] = parameters['levelid'];
    obj['State'] = parameters['State'];
    obj['Description'] = parameters['Description'];
    //obj['Flag'] = parameters['Flag'];

    console.log(obj);
    connection.query('INSERT INTO QuestionState SET ?', obj, function(err, rows , fields){


        if (!err){
            console.log("success");
           
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});


/**
Route service to add new permission to Database
**/
app.post('/addnewpermission', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['QuestionLevelId'] = parameters['levelid'];
    obj['State'] = parameters['State'];
    obj['Description'] = parameters['Description'];
    //obj['Flag'] = parameters['Flag'];

    console.log(obj);
    connection.query('INSERT INTO Permissions SET ?', obj, function(err, rows , fields){


        if (!err){
            console.log("success");
           
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});



/**
Route service to change types to Database
**/
app.post('/addeditedtype', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['LevelName'] = parameters['levelname'];
    obj['Description'] = parameters['description'];
    obj['QuestionTypeId']=parameters['QuestionTypeId'];

    console.log(obj);
    console.log('UPDATE QuestionType SET Description='+"'"+parameters['description']+"'"+' WHERE QuestionTypeId='+parameters['QuestionTypeId']);
    connection.query('UPDATE QuestionType SET Description='+"'"+parameters['description']+"'"+' WHERE QuestionTypeId='+parameters['QuestionTypeId'], obj, function(err, rows , fields){


        if (!err){
            console.log("success");
            //res.redirect('/editappvr');

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});

/**
Route service to change state to Database
**/
app.post('/addeditedstate', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['LevelName'] = parameters['levelname'];
    obj['Description'] = parameters['description'];
    obj['QuestionStateId']=parameters['QuestionStateId'];

    console.log(obj);
    console.log('UPDATE QuestionState SET Description='+"'"+parameters['description']+"'"+' WHERE QuestionStateId='+parameters['QuestionStateId']);
    connection.query('UPDATE QuestionState SET Description='+"'"+parameters['description']+"'"+' WHERE QuestionStateId='+parameters['QuestionStateId'], obj, function(err, rows , fields){


        if (!err){
            console.log("success");
            //res.redirect('/editappvr');

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});

/**
Route service to change levels to Database
**/
app.post('/addeditedlevel', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['LevelName'] = parameters['levelname'];
    obj['Description'] = parameters['leveldescription'];
    obj['QuestionLevelId']=parameters['QuestionLevelId'];

    console.log(obj);
    console.log('UPDATE QuestionLevel SET Description='+"'"+parameters['leveldescription']+"'"+' WHERE QuestionLevelId='+parameters['QuestionLevelId']);
    connection.query('UPDATE QuestionLevel SET Description='+"'"+parameters['leveldescription']+"'"+' WHERE QuestionLevelId='+parameters['QuestionLevelId'], obj, function(err, rows , fields){


        if (!err){
            console.log("success");
            res.redirect('/editappvr');

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});


/**
Route service to change approver to Database
**/
app.post('/addeditedapprover', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['LevelName'] = parameters['levelname'];
    obj['SubjectName'] = parameters['subjectname'];
    obj['ApproverId']=parameters['ApproverId'];

    console.log(obj);
    console.log('UPDATE Approver SET SubjectName='+"'"+parameters['subjectname']+"'"+' WHERE ApproverId='+parameters['ApproverId']);
    connection.query('UPDATE Approver SET SubjectName='+"'"+parameters['subjectname']+"'"+' WHERE ApproverId='+parameters['ApproverId'], obj, function(err, rows , fields){


        if (!err){
            console.log("success");
            res.redirect('/editappvr');

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});



/**
Route service to change permission to Database
**/
app.post('/addeditedpermission', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['LevelName'] = parameters['levelname'];
     obj['Description'] = parameters['description'];
    obj['PermissionId']=parameters['PermissionId'];

    console.log(obj);
    console.log('UPDATE Permissions SET Description='+"'"+parameters['description']+"'"+' WHERE PermissionId='+parameters['PermissionId']);
    connection.query('UPDATE Permissions SET Description='+"'"+parameters['description']+"'"+' WHERE PermissionId='+parameters['PermissionId'], obj, function(err, rows , fields){


        if (!err){
            console.log("success");

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});

/**
Route service to change subject to Database
**/
app.post('/addeditedtopic', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    //obj['LevelName'] = parameters['levelname'];
    obj['Description'] = parameters['subjectdescription'];
    obj['SubjectId']=parameters['SubjectId'];

    console.log(obj);
    console.log('UPDATE Subjects SET Description='+"'"+parameters['subjectdescription']+"'"+' WHERE SubjectId='+"'"+parameters['SubjectId']+"'");
    connection.query('UPDATE Subjects SET Description='+"'"+parameters['subjectdescription']+"'"+' WHERE SubjectId='+"'"+parameters['SubjectId']+"'", obj, function(err, rows , fields){


        if (!err){
            console.log("success");
            res.redirect('/editappvr');

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});

/**
Route service to add new approver to Database
**/
app.post('/addnewapprover', function (req, res) {
    //var selectedSubject = req.body.subjectid;
   
    console.log( req.files);
    var parameters = req.body;         
    var obj = {};

    obj['ApproverName'] = parameters['approvername'];
    obj['SubjectName'] = parameters['subjectname'];

    console.log(obj);
    connection.query('INSERT INTO Approver SET ?', obj, function(err, rows , fields){


        if (!err){
            console.log("success");
            res.redirect('/editappvr');

         
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
});

/*
*** Route Service to Provide Question Type from Database
*/
app.get('/qba/questiontypes', function (req, res) {
    
    connection.query('SELECT QuestionTypeId , State from QuestionType', function(err, rows, fields) {

        if (!err){
//            console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

/*
*** Route Service to Provide Question Levels from Database
*/
app.get('/qba/questionlevels', function (req, res) {
    
    connection.query('SELECT QuestionLevelId , LevelName from QuestionLevel', function(err, rows, fields) {

        if (!err){
//            console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

/*
*** Route Service to  Edit Levels from Database
*/

app.get('/qba/editlevels', function (req, res) {
    //console.log('called');
    connection.query('SELECT  QuestionLevelId, LevelName , Description from QuestionLevel', function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});
/*
**** Route service to edit the exist level
*/
app.get('/qba/editonelevel', function (req, res) {
    console.log('called');
    connection.query('SELECT  QuestionLevelId, LevelName , Description from QuestionLevel', function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

/*
**** Route service to edit the approver
*/
app.get('/approver', function (req, res) {
    console.log('called');
    connection.query('SELECT  * from Approver', function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

/*
**** Route service to edit the exist approver
*/
app.get('/qba/editoneapprover', function (req, res) {
    console.log('called');
    connection.query('SELECT  QuestionLevelId, LevelName , Description from QuestionLevel', function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});
/*
*** Route Service to  Edit type from Database
*/

app.get('/qba/edittype', function (req, res) {
   // console.log('SELECT * from QuestionType');

    connection.query('SELECT * from QuestionType', function(err, rows, fields) {

        if (!err){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

/*
*** Route Service to  Edit state from Database
*/

app.get('/qba/editstate', function (req, res) {
   // console.log('SELECT * from QuestionType');

    connection.query('SELECT * from QuestionState', function(err, rows, fields) {

        if (!err){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

/*
*** Route Service to  Edit permission from Database
*/

app.get('/qba/editpermission', function (req, res) {
    //console.log('called');
    connection.query('SELECT  * from Permissions', function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});


/*
*** Route Service to remove Levels from Database
*/
app.post('/removelevel', function (req, res) {
    var questionId = req.body.QuestionLevelId;
    console.log(questionId);
    console.log('DELETE from QuestionLevel WHERE QuestionLevelId = '+"'"+questionId+"'");
    connection.query('DELETE from QuestionLevel WHERE QuestionLevelId = '+"'"+questionId+"'", function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});


/*app.get('/qba/subjectsRemove', function (req, res) {
    
    connection.query('DELETE FROM Subjects where Subject', function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});*/

/*
*** Route Service to remove subject from Database
*/
app.post('/removesubject', function (req, res) {
    var selectedSubject = req.body.subjectid;
   // console.log('DELETE from Subjects WHERE SubjectId = '+"'"+selectedSubject+"'");
    connection.query('DELETE from Subjects WHERE SubjectId = '+"'"+selectedSubject+"'", function(err, rows, fields) {
        
        //connection.end();
        if (!err){
            console.log('The Subjects are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }   
        
      });

    
});

/*
*** Route Service to remove questionstate from Database
*/
app.post('/removestate', function (req, res) {
    var selectedstate = req.body.questionstateid;
   // console.log('DELETE from Subjects WHERE SubjectId = '+"'"+selectedSubject+"'");
    connection.query('DELETE from QuestionState WHERE QuestionStateId = '+"'"+selectedstate+"'", function(err, rows, fields) {
        
        //connection.end();
        if (!err){
            console.log('The Subjects are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }   
        
      });

    
});


/*
*** Route Service to remove approver from Database
*/
app.post('/removeapprover', function (req, res) {
    var selectedapprover = req.body.approverid;
   // console.log('DELETE from Subjects WHERE SubjectId = '+"'"+selectedSubject+"'");
    connection.query('DELETE from Approver WHERE ApproverId = '+"'"+selectedapprover+"'", function(err, rows, fields) {
        
        //connection.end();
        if (!err){
//console.log('The Approver are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }   
        
      });

    
});


/*
*** Route Service to remove type from Database
*/
app.post('/removetype', function (req, res) {
    var selectedtype = req.body.questiontypeid;
   // console.log('DELETE from Subjects WHERE SubjectId = '+"'"+selectedSubject+"'");
    connection.query('DELETE from QuestionType WHERE QuestionTypeId = '+"'"+selectedtype+"'", function(err, rows, fields) {
        
        //connection.end();
        if (!err){
//console.log('The Approver are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }   
        
      });

    
});



/*
*** Route Service to remove permission from Database
*/
app.post('/removepermission', function (req, res) {
    var selectedpermission = req.body.permissionid;
    //console.log(permissionid);
    console.log('DELETE from Permissions WHERE PermissionId = '+"'"+selectedpermission+"'");
    connection.query('DELETE from Permissions WHERE PermissionId = '+"'"+selectedpermission+"'", function(err, rows, fields) {

        if (!err){
//          console.log('The Answertypes are: ', rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }  else {
            console.log('Error while performing Query.',err);
        }
        
      });
    
});

app.post('/api/photos', function (req, res) {
    //console.log(req.files);

    
     
    
});




/*
*** Route Service to Create Question in Questions Table in DB
*/
app.post('/createquestion', function (req, res) {
    console.log( req.files);
    var parameters = req.body;
    var obj = {};
    var uploadedImg = [];

    var lastRow = "", noOfImg = 0;
    connection.query('SELECT QuestionId FROM Questions ORDER BY QuestionId DESC LIMIT 1', function(err, rows, fields) {
        if (!err){
           lastRow = (rows.length > 0 )?rows[0].QuestionId : "";
           console.log("lastRow",rows[0].QuestionId);
            var questionId = (lastRow != "") ? "Qu-"+(Number(lastRow.split('-')[1]) + 1) : "Qu-1";
            //console.log(questionId);
            UpdateValuesToDB(questionId);
        }  else {
            console.log('Error while performing Query.',err);
        }
        
    });

  
    function UpdateValuesToDB(questionId){

        var timeNow = (new Date()).getTime();
        
        
        var obj = {};

        Q.all([
            CheckImage("question_image", questionId, timeNow++),
            CheckImage("optionA_image", questionId, timeNow++),
            CheckImage("optionB_image", questionId, timeNow++),
            CheckImage("optionC_image", questionId, timeNow++),
            CheckImage("optionD_image", questionId, timeNow++),

        ]).then(function(){

            obj['QuestionId'] = questionId;
            obj['SubTopicId'] = parameters['subtopic'];
            obj['Description'] = parameters['question_description'] + uploadedImg["question_image"];
            obj['OptionA'] = parameters['optionA_description'] + uploadedImg["optionA_image"];
            obj['OptionB'] = parameters['optionB_description'] + uploadedImg["optionB_image"];
            obj['OptionC'] = parameters['optionC_description'] + uploadedImg["optionC_image"];
            obj['OptionD'] = parameters['optionD_description'] + uploadedImg["optionD_image"];
            obj['QuestionTypeId'] = parameters['questiontype'];
            obj['Answer'] = ((parameters['answer']).constructor == Array) ? parameters['answer'].join() : parameters['answer'];
            obj['AuthorId'] = parameters['authorid'];
            obj['ApproverId'] = parameters['approverid'];
            obj['StatusId'] = 2;
            obj['Created'] = timeNow;
            obj['Updated'] = timeNow;
            obj['FrequancyCount'] = 0;
            obj['QuestionLevelId'] = parameters['questionlevel'];
            obj['Duration'] = parameters['time_estimate'];

            console.log(obj);
            connection.query('INSERT INTO Questions SET ?', obj, function(error){
                if(error){

                  console.log(error.message);
                  res.end("Error in Db updation");
                }else{
                  console.log('success');
                  res.end("Successfully created");

                }
              });
        });
    }

   function CheckImage(location, questionId, timeindex){

        var files = req.files,
            buckets = req.body.buckets ? req.body.buckets.split(',') : [],
            insObj = [],
            newArr = [],
            key = 0; 
            noOfImg++;
        var deferred = Q.defer();   
        var timeNow = (new Date()).getTime();
        var imgFile = files[location];
        var imgSize = imgFile.size;

        if(imgSize == 0) {
            uploadedImg[location] = "";
            deferred.resolve();

        } else {

            var fileType = imgFile.originalFilename.split('.').pop(),
                fileName = imgFile.originalFilename.split('.')[0];

            fs.readFile(imgFile.path, function (err, data) {
                var newName = fileName+timeindex+"."+fileType
                var newPath = __dirname + "/static/upload-images/"+questionId+"-"+newName;
              
              //console.log(newPath,data);

              fs.writeFile(newPath, data, function (err) {
                //console.log(err);
                //console.log("<img src='/upload-images/"+questionId+"-"+fileName+noOfImg+"."+fileType+"' width='100' height='100' alt='Question Image'></img>");
                if(!err){
                    uploadedImg[location] = "<img src='/upload-images/"+questionId+"-"+newName+"' width='100' height='100' alt='Question Image'></img>";
                } else {
                    uploadedImg[location] = "";
                }
                //noOfImg++;
                deferred.resolve();
              });
            });
        }

        return deferred.promise;

   }
   /* console.log(JSON.stringify(obj));
    connection.query('INSERT INTO Questions SET ?', obj, function(error){
        if(error){

          console.log(error.message);
        }else{
          console.log('succes');
          res.end("Successfully created");

        }
      });*/
    
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database :", err);  
}
});



app.use("/",express.static(__dirname + "/static"));

app.listen(3000);