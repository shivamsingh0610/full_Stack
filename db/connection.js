const M=require('mongoose')

M.connect('mongodb+srv://indiansingh0610:KW1HnuDsyBk0xzEO@cluster0.jq7jwgh.mongodb.net/Db_jSCOE?retryWrites=true&w=majority&appName=Cluster0')
.then( ()=>
    console.log("Database Connected Successfully") 
)
.catch(()=>
console.log("Error connecting")
)