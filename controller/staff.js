const {signInStaff, findStaffByEmail, loginStaff, getAllStaff, findStaffByService, getStaffByEmail, getStaffById} = require("../services/staff.js")


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

const getAllStaffController = async(req,res) =>{
    const allStaff = await getAllStaff();
    if(allStaff){
        res.status(200).json(allStaff)
    }
    res.status(404).json({success:false, message:'Failed to get all'})
}

const getStaffByServiceController = async (req, res)=>{
    const {service} = req.params;
    const staff = await findStaffByService(service)
    //falta que valide que el nombre del servicio que recibe por params existe como tal
    if(!staff.length){
        res.status(404).json({success:false, message:'Failed to get staff by service'})
    }else{
        return res.status(200).json(staff)
       
    }
    
}

const getStaffByEmailController = async(req, res)=>{
    const {email} = req.params;
    const staff = await getStaffByEmail({email});
    if(!staff){
        res.status(404).json({success:false, message:'Failed to get staff by email'})
    }else{
         res.status(200).json(staff);
    }
   
}

const getStaffByIdController = async(req, res)=>{
    const {id} = req.params;
    const staff = await getStaffById(id);
    if(!staff){
        res.status(404).json({success:false, message:'Failed to get staff by id'})
    }else{
         res.status(200).json(staff);
    }
   
}

module.exports = {signInControllerStaff, loginControllerStaff, getAllStaffController, getStaffByServiceController, getStaffByEmailController, getStaffByIdController}