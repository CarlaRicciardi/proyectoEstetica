const {signInStaff, findStaffByEmail, loginStaff} = require("../services/staff.js")

const signInControllerStaff = async(req, res)=>{
    const {email, password, name, phone, role, photo, service, bio} = req.body;
    const newStaff = {email, password, name, phone, role, photo, service, bio};
    const staffExists = await findStaffByEmail(email);
    if(staffExists){
        res.status(200).json({success:false, message:"A staff member with this email already exists"});
    }else{
        const result = await signInStaff(newStaff)
        if(result){
            res.status(200).json({success:true, message:"Staff created succesfully"})
        }else{
            res.status(500).json({success:false, message:"Could not save staff"})
        }
        
    }
    
    
}

const loginControllerStaff = async(req, res)=>{
    const {email, password} = req.body;
    let staff = await findStaffByEmail({email});
    if(!staff){
        res.status(404).json({succes:false, message:"Staff doesn't exist"})
    }else{
        let result = await loginStaff(email, password)
        if(result){
            res.status(200).json(result)
        }else{
            //este resultado también salta cuando la contraseña es incorrecta
            res.status(500).json({succes:false, message:"Failed to login"})
        }
    }

   
}

module.exports = {signInControllerStaff, loginControllerStaff}