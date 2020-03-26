const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(kd_petugas, nm_petugas, jabatan, tlpn_petugas) 
                values(?,?,?,?)`,
      [
        data.kd_petugas,
        data.nm_petugas,
        data.jabatan,
        data.tlpn_petugas
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null,results);
      }
    );
  },
  getPetugasByPetugasEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getPetugasByPetugasId: (id, callBack) => {
    pool.query(
      `select kd_petugas, nm_petugas, jabatan, tlpn_petugas from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAnggota: callBack => {
    pool.query(
      `select kd_petugas, nm_petugas, jabatan, tlpn_petugas from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateAnggota: (data, callBack) => {
    pool.query(
      `update registration set kd_petugas=?, nm_petugas=?, jabatan=?, tlpn_petugas=? where id = ?`,
      [
        data.kd_petugas,
        data.nm_petugas,
        data.jabatan,
        data.tlpn_petugas
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deletePetugas: (data, callBack) => {
    pool.query(
      `select  id from registration where id = ?`,
      [data.id],
      (error,results,fields)=>{
        
        if(error){
          return callBack(error)
        }
        else{
        pool.query(
          `delete from registration where id = ?`,
          [data.id]);
return callBack(null,results[0])
          }
        
      }
    )
  },
 
};