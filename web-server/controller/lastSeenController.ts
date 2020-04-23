import { LastSeenModel } from "../model/LastSeenModel";

export async function saveUserLastSeen(body: any) {
    // Update last seen details against User Id
    let item = await LastSeenModel.updateOne({ userId: body.userId }, body, {
      upsert: true,
    });
  }
  
  export async function getUserLastSeen(req: any, res: any) {
    let paramId = req.body.id;
    // console.log("USER ID => ", paramId);
  
    // Query for the user's last seen
    try {
      const lastSeen = await LastSeenModel.find({ userId: paramId });
      console.log("USER LAST SEEN ==> ", lastSeen);
  
      res.status(200).json({
        success: true,
        lastSeen: lastSeen,
      });
    } catch (error) {
      1;
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  } 