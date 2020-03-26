const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(kd_anggota, nm_anggota, alamat, tlpn) 
                values(?,?,?,?)`,
      [
        data.kd_anggota,
        data.nm_anggota,
        data.alamat,
        data.tlpn
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null,results);
      }
    );
  },
  getAnggotaByAnggotaEmail: (email, callBack) => {
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
  getAnggotaByAnggotaId: (id, callBack) => {
    pool.query(
      `select kd_anggota, nm_anggota, alamat, tlpn from registration where id = ?`,
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
      `select kd_anggota, nm_anggota, alamat, tlpn from registration`,
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
      `update registration set kd_anggota=?, nm_anggota=?, alamat=?, tlpn=? where id = ?`,
      [
        data.kd_anggota,
        data.nm_anggota,
        data.alamat,
        data.tlpn
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteAnggota: (data, callBack) => {
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