const Users =  require('../../modal/Users')


module.exports = {
    register: (req, res, next) => {
        console.log('REQ::::::::', JSON.stringify(req.body))
        Users.register(JSON.stringify(req.body)).then(result => {
            console.log('result:::::::::::::',result.rows[0].output_json)
            res.status(200).json({
                status: 200,
                data: result.rows[0].output_json
            })
        })
    },

    Authenticate: async (req, res, next) => {
        let token = req.cookies.token;
        const {
          username,
          password
        } = req.body;
    
            console.log('OTP VERIFIED:::::::::::::>>>')
            Users.findOneForLogin(username).then(async data => {
              let result = data.rows[0];
          
    
              console.log('AFTER OTP CORRECT result::::::::::::::',result)
              let user = {};
              user.username = result.username;
              user.firstname = result.firstname;
              user.lastname = result.lastname;
              user.school_id = result.school_id;
              user.campus_id = result.campus_id;
              user.email = result.email;
              user.role = result.role;
              user.campus_name = result.campus_name;
              user.school_lid = result.school_lid;
              user.is_password_reseted = result.is_password_reseted;
              delete result.password;
              //res.locals.is_password_reseted = result.is_password_reseted
              user = JSON.stringify(user);
              // token = token + "." + result.username;
    
              redisClient.client.set(
                token,
                user,
                async function (err, response) {
                  if (err) {
                    console.log(err);
                    errorResponse(
                      req,
                      null,
                      "something went wrong...try again later"
                    );
                    successResponse(null, res, {
                      status: constants.ERROR,
                      data: "something went wrong...try again later",
                    });
                  } else {
                    let resp = await response;
                    console.log("resp redis write ==> ", resp);
                    redisClient.client.expire(token, process.env.REDIS_TTL);
                    console.log("role", result.role);
                    if (typeof result.role == "undefined") {
                      successResponse(null, res, {
                        status: constants.ERROR,
                        msg: "You are assigned any role yet",
                      });
                    } else {
                      let redirect = "";
    
                      if (result.role[0] == "role_exam_admin") {
                        redirect = "/exam-admin/dashboard";
                      } else if (result.role[0] == "role_dean") {
                        redirect = "/dean/dashboard";
                      } else if (result.role[0] == "role_template_creator") {
                        redirect = "/template-creator/dashboard";
                      } else if (result.role[0] == "role_template_author") {
                        redirect = "/template-author/dashboard";
                      } else if (result.role[0] == "role_template_reviewer") {
                        redirect = "/template-reviewer/dashboard";
                      } else if (result.role[0] == "role_super_admin") {
                        redirect = "/super-admin/dashboard";
                      } else if (result.role[0] == "role_common_subject_creator") {
                        redirect = "/common-subject-creator/dashboard";
                      } else if(result.role[0] == "role_printing"){
                        redirect = "/printing/dashboard";
                      }
                      insert_redis_session(token, result.username);
                      Common.deactivateOTP(otp_id)
                      successResponse(null, res, {
                        status: constants.SUCCESS,
                        redirect: redirect,
                      });
                    }
                  }
                }
              );
            })
      },

      logout: function (req, res) {
        if (typeof req.cookies.token == "undefined") {
          successRedirect(null, res, "/login");
        } else {
          redisClient.client.get(req.cookies.token, async function (err, obj) {
            if (err) {
              console.error(err);
              successRedirect(null, res, "/login");
            } else {
              res.clearCookie("token");
              redisClient.client.del(
                req.cookies.token,
                async function (err, result) {
                  if (err) {
                    console.error(err);
                    successRedirect(null, res, "/login");
                  } else {
                    let response = await result;
                    if (response == 1) {
                      successRedirect(null, res, "/login");
                    } else {
                      console.log("error in logout");
                    }
                  }
                }
              );
            }
          });
        }
      },
}