var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://ferry:ferry@ds155218.mlab.com:55218/kolabr');

router.get('/persons', (req, res) => {
    db.persons.find((err, persons) => {
        if (err) {
            res.send(err);
        }
        res.json(persons);
    });
});

router.get('/person/:id', (req, res) => {
    db.persons.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, person) => {
        if (err) {
            res.send(err);
        }
        res.json(person);
    });
});

router.post('/person', (req, res) => {
    var person = req.body;
    if (!person.name || (!person.phone && !person.email)) {
        res.status(400);
        res.json({
            "error": "Bad data."
        });
    } else {
        db.persons.save(person, (err) => {
            if (err) {
                res.send(err);
            }
            res.json(person);
        });
    }
});

router.delete('/person/:id', (req, res) => {
    db.persons.remove({_id: mongojs.ObjectId(req.params.id)}, (err, person) => {
        if (err) {
            res.send(err);
        }
        res.json(person);
    });
});

router.put('/person/:id', (req, res) => {
    var person = req.body;

    var uptPerson = {};

    if (person.name) {
        uptPerson.name = person.name;
    }

    if (person.phone) {
        uptPerson.phone = person.phone;
    }

    if (person.email) {
        uptPerson.email = person.email;
    }

    if (!uptPerson) {
        res.status(400);
        res.json({
            "error": "Bad data."
        })
    } else {
        db.persons.update({_id: mongojs.ObjectId(req.params.id)}, uptPerson, (err, person) => {
            if (err) {
                res.send(err);
            }
            res.json(person);
        });
    }
});


module.exports = router;