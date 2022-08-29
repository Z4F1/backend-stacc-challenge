const parse = require("csv-parse").parse
const fs = require("fs")

const finished = require("stream/promises").finished

async function load(){
    const records = []
    const parser = fs.createReadStream(__dirname + "/data/pep.csv")
        .pipe(parse({delimiter: ",", columns: ["id","schema","name","aliases","birth_date","countries","addresses","identifiers","sanctions","phones","emails","dataset","last_seen","first_seen"]}))
        
    parser.on("readable", () => {
        let record
        while((record = parser.read()) !== null){
            records.push(record);
        }
    })
    
    await finished(parser)
    return records.slice(1)
}

async function findAll(from = 0, options = {maxAmount: 1000}){
    let data = await load()

    return data.slice(from, from + options.maxAmount)
}

async function find(query, options = {caseSensetive: true, maxAmount: 1000}){
    let data = await load()

    let records = []
    data.forEach(row => {
        for (const key in query) {
            if (!query.hasOwnProperty(key) || !row.hasOwnProperty(key)) break

            if(
                !options.caseSensetive
                && query[key].toString().toLowerCase() != row[key].toString().toLowerCase()
            ) continue

            if(
                options.caseSensetive
                && query[key] != row[key]
            ) continue

            records.push(row)
        }
    });

    return records.slice(0, options.maxAmount)
}

async function findOne(query, options = {caseSensetive: true, maxAmount: 1000}){
    let data = await load()

    let record = false
    data.forEach(row => {
        for (const key in query) {
            if (!query.hasOwnProperty(key) || !row.hasOwnProperty(key)) break

            if(
                !options.caseSensetive
                && query[key].toString().toLowerCase() != row[key].toString().toLowerCase()
            ) continue

            if(
                options.caseSensetive
                && query[key] != row[key]
            ) continue

            record = row
            break
        }
    });

    return record.slice(0, options.maxAmount)
}

module.exports = {
    findAll,
    find,
    findOne
}