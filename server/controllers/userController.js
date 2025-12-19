import User from "../models/User.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "not found",
      });
    }
    res.json({
      success: true,
      message: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//update
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const {username, bio, location, full_name} = req.body

    const tempUser = await User.findById(userId);

    !username && (username = tempUser.username)

    if(tempUser.username !== username) {
        const user = User.findOne({username})
        if(user){
            username = tempUser.username
        }
    }

    const updatedData =  {
        username,
        bio,
        location,
        full_name
    }

    const profile = req.files.profile && req.files.profile[0]
    const cover = req.files.profile && req.files.cover[0]
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
