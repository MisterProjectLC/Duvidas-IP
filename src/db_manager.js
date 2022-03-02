const query = require("./db_query");

//Inserts a question on the database
function insertQuestion(values = {},callback){
    const idgen = require("./id_generator");
    var id = idgen({prefix:"ORI"});
    query("INSERT INTO tb_duvidas (id,ra,nome,contato,duvida,status,titulo,email) values ($1,$2,$3,$4,$5,$6,$7,$8);",
    [id,values.ra, values.nome, values.contato, values.duvida, 0, values.titulo, values.email]).then(data => {
        if(data==-1)
            callback (values.res, -1);
        else
            callback (values.res, id);
    })
}

//Retrieves questions based on the given RA
function retrieveQuestions(values = {},callback){
    query("SELECT id, status, date FROM tb_duvidas WHERE ra=$1",[values.ra]).then(data => {
        if(data==-1)
            callback(-1);
        else
            callback(data.rows);
    })
}

//Retrieves all the values from a certain question
function retrieveQuestionData(values = {}, callback){
    query("SELECT * FROM tb_duvidas WHERE id=$1",[values.protocol]).then(data=>{
        if(data==-1)
            callback(values.res, -1);
        else
            callback(values.res, data.rows[0])
    })
}

async function getUserByRA(values = {}){
    let data = await query('select nome,email from tb_users WHERE ra=$1',[values.ra])
        if(data==-1)
            return(-1);
        else{
            return(data.rows[0])
        }
}

//Function responsible for deciding which operation will take place
// 1 = insert Question;
// 2 = retrieve questions based on RA
// 3 = retrieve question data based on the protocol
// 4 = retrieve the lists and question quantity of each
module.exports =  async function opManager(values = {}, callback){
    switch(values.op){
        case 1:
            if(values.ra!="" && values.nome!="" && values.duvida!="")
                insertQuestion(values,callback);
            else return -1;
            break;
        case 2: 
            if(values.ra)
                retrieveQuestions(values,callback);
            else return -1;
            break;
        case 3:
            if(values.protocol)
                retrieveQuestionData(values,callback)
            else
                return -1;
            break;
        case 5:
            if(values.ra)
                return getUserByRA(values);
            else 
                return -1;
            break;
        default:
            return;
    }
}