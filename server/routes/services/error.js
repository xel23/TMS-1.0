const error = (err, res) => {
    console.error(err);
    res.status(500).json({
        message: 'Что-то пошло не так...'
    });
};

module.exports = error;
