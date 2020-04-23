import { StatusModel } from "../model/StatusModel";
import moment from "moment";
import { StatusClassModel } from "../classModel/StatusClassModel";

export async function getAllUserStatus(req: any, res: any) {
  let paramId = req.user.id;
  // console.log("USER ID => ", paramId);
  try {
    const status = await StatusModel.find({});
    res.status(200).json({
      success: true,
      status: status,
    });
  } catch (error) {
    1;
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
}

export async function createUserStatus(req: any, res: any) {
  try {
    const body = req.body;
    if (!body) {
      return res.status(200).json({
        success: false,
        message: "Invalid Data",
      });
    }

    const statusModel = new StatusClassModel(body);
    console.log("STATUS Update  => ", JSON.stringify(statusModel));
    if (!statusModel) {
      return res.status(200).json({
        success: false,
        message: "Invalid Data",
      });
    }

    var statusItem = (await StatusModel.findOne({
      userId: statusModel.userId,
    })) as any;

    // If Already exists
    if (statusItem) {
      // const statusData = statusModel.status[0]
      //   statusItem.status[0].seenUsers.push(statusModel.status[0].seenUsers);
      // Add new status received to Array
      statusItem.lastStatusTime = moment().format();
      statusItem.status.push(statusModel.status[0]);
    } else {
      statusItem = statusModel;
      statusItem.lastStatusTime = moment().format();
    }

    console.log("Final STATUS  => ", JSON.stringify(statusItem));

    // Create/Update Status
    const insert = await StatusModel.updateOne(
      { userId: body.userId },
      statusItem,
      {
        upsert: true,
      }
    );
    console.log("Status Server Response : ", insert);
    return res.status(200).json({
      success: true,
      message: "Status created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
}

export async function setUserStatusViewed(req: any, res: any) {
  let body = req.body;
  console.log("Status  => ", body);
  try {
    const statusItem = (await StatusModel.findOne({
      userId: body.userId,
    })) as any;
    console.log("Status Found => ", statusItem);
    for (let i = 0; i < statusItem.status.length; i++) {
      if (statusItem.status[i]._id == body.statusId) {
        const row = statusItem.status[i].seenUsers.indexOf(body.loginId);
        console.log('INDEX ; ',row);
        if (row !== -1) {
          statusItem.status[i].seenUsers.splice(row, 1, body.loginId);
        } else {
          statusItem.status[i].seenUsers.push(body.loginId);
        }

        // var isMatch = false;
        // for (let m = 0; m < statusItem.status[i].seenUsers.length; m++) {
        //   const element = statusItem.status[i].seenUsers[m];
        //   if (element == body.userId) {
        //     statusItem.status[i].seenUsers.splice(1, m, body.userId);
        //     isMatch = true;
        //     break
        //   }
        // }

        // if (!isMatch) {
        //   statusItem.status[i].seenUsers.push(body.userId);
        // }
        break;
      }
    }
    // console.log("Status Viewed => ", statusItem);

    await StatusModel.updateOne({ userId: body.userId }, statusItem, {
      upsert: true,
    });
    res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    1;
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
}
