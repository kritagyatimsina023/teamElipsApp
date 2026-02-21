import User from "../models/User.js";

export const getPendingUsers = async (req, res) => {
  const users = await User.find({
    isApproved: false,
    role: { $ne: "admin" },
  }).select("-password");
  res.json(users);
};
export const approveUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true },
  );

  res.json(
    { message: "User approved" },
    { _id: user._id, fullName: user.fullName, email: user.email },
  );
};
