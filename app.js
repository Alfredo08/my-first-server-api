const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const {PORT} = require( './config' );

const app = express();
const jsonParser = bodyParser.json();

let students = [{
    name : "Alex",
    id : 123
},
{
    name : "Martha",
    id : 456
},
{
    name : "Roger",
    id : 789
}];

app.get( '/api/getAllStudents', ( request, response ) => {

    return response.status( 200 ).json( students );

});

app.get( '/api/getStudentById', ( request, response ) => {

    console.log( "Params", request.query );
    console.log( "Headers", request.headers );

    let studentId = request.query.studentId;

    if( !studentId ){
        response.statusMessage = "You need to send the studentId as a parameter!";
        return response.status( 400 ).end();
    }

    let result = students.find( (student) => {
        if(student.id === Number(studentId) ){
            return student;
        }
    });

    if( !result ){
        response.statusMessage = "That student is not found in the list!";
        return response.status( 404 ).end();
    }

    return response.status( 200 ).json( result );

});

app.post( '/api/addStudent', jsonParser, ( request, response ) => {

    let newStudent = request.body;

    students.push( newStudent );

    return response.status( 201 ).json( students );
});



app.listen( PORT, () => {
    console.log( "This app is running in port 8080." );
});