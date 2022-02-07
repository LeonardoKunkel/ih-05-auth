const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        return console.log('Database online')

    } catch (error) {
        console.log(error);
        return process.exit(1)
    }
}

module.exports = connectdb;
