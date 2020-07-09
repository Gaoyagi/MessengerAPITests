require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})


describe('Message API endpoints', () => {
    //run before eveyr test runs
    beforeEach((done) => {
        const sampleUser = new User({
            username: 'myuser',
            password: 'mypassword',
        })
        sampleUser.save()
        .then(() => {
            done()
        })
    })

    //run after each test is run
    afterEach((done) => {
        User.deleteMany({ username: ['myuser', 'anotheruser'] })
            .then(() => {   
                done()
            })
    })

    it('should load all messages, testing GET /', (done) => {
        // TODO: Complete this
        chai.request(app)
            .get('/')
            .end((err, res) => {
                //res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
        
    })

    it('should get one specific message, testing GET /:messageId', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                //res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should post a new message, testing POST /', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            //res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })

    it('should update a message, testing PUT /:messageId', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                //res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should delete a message, testing DELTE /:messageId', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                //res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })
})
