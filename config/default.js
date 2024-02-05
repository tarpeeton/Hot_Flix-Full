module.exports = {
    PORT: 5000,
    DATABASE_URL: "mongodb://127.0.0.1:27017/media",
    DATABASE_OPTION: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    SECRET_KEY: "b85fa29e835f302753ec2a2b84505f959f2e41b1",
    SECRET_TIME: 1000 * 60 * 60 * 2,
    COLLECTION: "session",
    SMS_EMAIL: "ithouseedu@gmail.com",
    SMS_TOKEN: "5t9rfCXmPzYG0BjEYVx33kjOiiDm1hBo7tlH8LnV"
}