import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getAllMyPost, getAllPost } from "../redux/actions/actions";

const MyPost: React.FC = () => {
  const post = useSelector((state: RootState) => {
    return state.myPost;
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllMyPost());
  });

  return <></>;
};

export default MyPost;
