import { LoginUserModel } from "../model/LoginUserModel";

export const syncAuthenticatedUser = async (req: any, res: any) => {
  const displayName =
    typeof req.body.displayName === "string" ? req.body.displayName.trim() : "";

  if (displayName.length > 40) {
    return res.status(400).json({
      success: false,
      message: "Display name must be 40 characters or fewer.",
    });
  }

  try {
    const user = await LoginUserModel.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          phoneNumber: req.user.phoneNumber,
          userName: displayName || req.user.phoneNumber,
          numberType: "MOBILE",
        },
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).select("userId userName phoneNumber");

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to sync authenticated user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not save your FRWhatsapp profile.",
    });
  }
};

export const getAuthenticatedUser = async (req: any, res: any) => {
  try {
    const user = await LoginUserModel.findOne({ userId: req.user.id }).select(
      "userId userName phoneNumber"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Complete account setup first.",
      });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to load authenticated user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not load your FRWhatsapp profile.",
    });
  }
};

export const searchUserByPhone = async (req: any, res: any) => {
  const phoneNumber =
    typeof req.query.phoneNumber === "string" ? req.query.phoneNumber : "";

  if (!/^\+[1-9]\d{6,14}$/.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Enter a phone number in international format.",
    });
  }

  try {
    const user = await LoginUserModel.findOne({
      phoneNumber,
      userId: { $ne: req.user.id },
    }).select("userId userName phoneNumber");

    return res.status(200).json({ success: true, data: user || null });
  } catch (error) {
    console.error("Failed to search FRWhatsapp user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not search for that FRWhatsapp account.",
    });
  }
};
