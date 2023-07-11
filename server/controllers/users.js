import User from "../models/User";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        msg: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map(async (friendId) => {
        return User.findById(friendId);
      })
    );
    const formattedFriends = friends.map((friend) => {
      return {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      };
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((frId) => frId !== friendId);
      friend.friends = friend.friend.filter((frId) => frId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map(async (friendId) => {
        return User.findById(friendId);
      })
    );
    const formattedFriends = friends.map((friend) => {
      return {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
