import {
  FormatIndentDecreaseOutlined,
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, deletePost } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);

  const palette = useTheme().palette;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    const resp = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const friends = await resp.json();
    dispatch(setFriends({ friends: friends }));
  };
  const deletePostNow = async () => {
    const resp = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
      method: "DELETE",
    });
    if (resp.ok) {
      dispatch(deletePost({ id: postId }));
    }
  };
  const justifyContent = _id === friendId ? "flex-start" : "space-between";
  return (
    <FlexBetween
      gap="1rem"
      sx={{ justifyContent: justifyContent, position: "relative" }}
    >
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ color: palette.primary.light, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
      {friendId === user._id && (
        <Typography
          sx={{
            position: "absolute",
            right: "4%",
            top: "3%",
            padding: "0.3rem",
            backgroundColor: "crimson",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={deletePostNow}
        >
          Delete
        </Typography>
      )}
    </FlexBetween>
  );
};

export default Friend;
