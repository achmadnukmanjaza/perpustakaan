const {
    create,
    getAnggotaByAnggotaEmail,
    getAnggotaByAnggotaId,
    getAnggota,
    updateAnggota,
    deleteAnggota
  } = require("./anggota.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createAnggota: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    login: (req, res) => {
      const body = req.body;
      getAnggotaByAnggotaEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          results.number = undefined;
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "1h"
            // const jsontoken = sign({ result: results }, "qwe1234", {
            //     expiresIn: "1h"
          });
          return res.json({
            success: 1,
            results,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    },
    getAnggotaByAnggotaId: (req, res) => {
      const id = req.params.id;
      getAnggotaByAnggotaId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getAnggota: (req, res) => {
      getAnggota((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    updateAnggota: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateAnggota(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteAnggota: (req, res) => {
      const data = req.body;
      deleteAnggota(data, (err,results) => {
       
        if (err) {
         
            console.log(err)
          
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "not found"
          });
        }else{
          return res.json({
            success: 1,
            message: "deleted sucses"
          })
        }
     
      });
    },
  
  };