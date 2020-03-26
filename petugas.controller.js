const {
    create,
    getPetugasByPetugasEmail,
    getPetugasByPetugasId,
    getPetugas,
    updatePetugas,
    deletePetugas
  } = require("./petugas.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createPetugas: (req, res) => {
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
      getPetugasByPetugasEmail(body.email, (err, results) => {
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
    getPetugasByPetugasId: (req, res) => {
      const id = req.params.id;
      getPetugasByPetugasId(id, (err, results) => {
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
    getPetugas: (req, res) => {
      getPetugas((err, results) => {
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
    updatePetugas: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updatePetugas(body, (err, results) => {
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
    deletePetugas: (req, res) => {
      const data = req.body;
      deletePetugas(data, (err,results) => {
       
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