class Movie{
    constructor(title, actor="Not Specified", director="Not Specified"){
        this.title = title;
        this.actor = actor;
        this.director = director;
    }
    async create(movieCollection){
        console.log("Entering create within index.js");
        // code to save to database
        await movieCollection.insertOne(this);
    }
}
module.exports = Movie;