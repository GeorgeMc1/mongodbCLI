const yargs = require("yargs");
const {client, connect} = require("./db/connection");
const Movie = require("./utils/index");

async function app(yargsinput){
    const movieCollection = await connect();
    if(yargsinput.create){
        console.log("Entering Create");
        // code to add movie goes here
        const newMovie = new Movie(yargsinput.title, yargsinput.actor, yargsinput.director);
        await newMovie.create(movieCollection);
    } else if (yargsinput.read){
        console.log("Entering Read");
        // code to list movies goes here
        const results = await movieCollection.find().toArray();
        console.table(results);
    } else if (yargsinput.update){
        console.log("Entering Update");
        // code to update movie goes here
        switch(yargsinput.update){
            case "title":
                await movieCollection.updateOne({title: yargsinput.query},{$set: {title: yargsinput.new}});
                break;
            case "actor":
                await movieCollection.updateOne({title: yargsinput.query},{$set: {actor: yargsinput.new}});
                break;
            case "director":
                await movieCollection.updateOne({title: yargsinput.query},{$set: {director: yargsinput.new}});
                break;
        }
        // await movieCollection.updateOne({title: yargsinput.query},{$set:{title: yargsinput.title, actor: yargsinput.actor, director: yargsinput.director}});
    } else if (yargsinput.delete){
        console.log("Entering Delete");
        // code to delete movie goes here
        const deleteMovie = await movieCollection.deleteOne({title: yargsinput.title});
        console.log(deleteMovie.deletedCount);
    } else {
        console.log("Command not recognised");
    };
    await client.close();
};
app(yargs.argv);